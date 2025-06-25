import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

// GitHub webhook secret (set this in your environment variables)
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'your-webhook-secret'

interface GitHubRepo {
    id: number
    name: string
    full_name: string
    description: string | null
    html_url: string
    homepage: string | null
    stargazers_count: number
    forks_count: number
    watchers_count: number
    language: string | null
    topics: string[]
    created_at: string
    updated_at: string
    pushed_at: string
    private: boolean
    fork: boolean
}

export async function POST(request: NextRequest) {
    try {
        // Verify webhook signature (optional but recommended for production)
        const signature = request.headers.get('x-hub-signature-256')
        const payload = await request.text()

        // Parse webhook payload
        const webhookData = JSON.parse(payload)

        // Only handle push events and repository events
        const eventType = request.headers.get('x-github-event')
        if (eventType !== 'push' && eventType !== 'repository') {
            return NextResponse.json({ message: 'Event type not handled' }, { status: 200 })
        }

        // Fetch all repositories from GitHub
        const username = 'MuhammadKhan148' // Your GitHub username
        const githubResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Portfolio-Sync/1.0',
                },
            }
        )

        if (!githubResponse.ok) {
            throw new Error(`GitHub API error: ${githubResponse.status}`)
        }

        const allRepos: GitHubRepo[] = await githubResponse.json()

        // Filter repositories for portfolio display (more inclusive)
        const portfolioRepos = allRepos.filter(repo => {
            // Exclude these types of repos
            if (repo.fork) return false // Not a fork
            if (repo.private) return false // Public repos only
            if (repo.name.includes('.github')) return false // Not meta repos
            if (repo.name.toLowerCase().includes('dotfiles')) return false // Not dotfiles
            if (repo.name.toLowerCase() === 'muhammadkhan148') return false // Not profile repo

            // Include most repositories with these conditions:
            return (
                repo.language || // Has a programming language
                repo.description || // Has any description
                repo.stargazers_count > 0 || // Has stars
                repo.forks_count > 0 || // Has forks
                repo.topics?.length > 0 || // Has topics
                repo.pushed_at // Recently active (all repos should have this)
            )
        })

        // Transform repositories to project format
        const projects = portfolioRepos.map(repo => ({
            id: repo.id.toString(),
            title: repo.name
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
            description: repo.description || 'A GitHub project',
            image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
            tags: [
                ...(repo.language ? [repo.language] : []),
                ...repo.topics.slice(0, 5),
            ].filter(Boolean),
            github: repo.html_url,
            demo: repo.homepage || repo.html_url,
            featured: repo.stargazers_count > 2 || repo.topics?.includes('featured'),
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            updated: repo.updated_at,
            created: repo.created_at,
            pushed: repo.pushed_at,
        }))

        // Save projects to a JSON file that can be read by the frontend
        const projectsPath = join(process.cwd(), 'content', 'github-projects.json')
        writeFileSync(projectsPath, JSON.stringify(projects, null, 2))

        // Update portfolio stats
        const stats = {
            totalRepos: portfolioRepos.length,
            totalStars: portfolioRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            totalForks: portfolioRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
            languages: [...new Set(portfolioRepos.map(repo => repo.language).filter(Boolean))],
            lastUpdated: new Date().toISOString(),
        }

        const statsPath = join(process.cwd(), 'content', 'github-stats.json')
        writeFileSync(statsPath, JSON.stringify(stats, null, 2))

        // Revalidate the homepage to show updated content
        revalidatePath('/')
        revalidatePath('/admin')

        return NextResponse.json({
            message: 'Portfolio updated successfully',
            projectsCount: projects.length,
            stats
        }, { status: 200 })

    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json(
            { error: 'Failed to process webhook' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    // Manual sync endpoint for testing
    return POST(request)
} 