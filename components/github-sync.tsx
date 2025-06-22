"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Github, ExternalLink, Star, GitFork, Eye } from "lucide-react"
import { useState, useEffect } from "react"

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

interface GitHubSyncProps {
    username: string
    onProjectsUpdate?: (projects: any[]) => void
}

export function GitHubSync({ username, onProjectsUpdate }: GitHubSyncProps) {
    const [repos, setRepos] = useState<GitHubRepo[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [lastSync, setLastSync] = useState<Date | null>(null)
    const [autoSyncEnabled, setAutoSyncEnabled] = useState(true)

    // Fetch repositories from GitHub API
    const fetchRepositories = async (showToast = true) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`)
            }

            const allRepos: GitHubRepo[] = await response.json()

            // Filter repositories for portfolio display
            const portfolioRepos = allRepos.filter(repo => {
                return !repo.fork && // Not a fork
                    !repo.private && // Public repos only
                    repo.description && // Has description
                    !repo.name.includes('.github') && // Not meta repos
                    !repo.name.includes('config') && // Not config repos
                    (repo.topics?.includes('portfolio') ||
                        repo.topics?.includes('project') ||
                        repo.language ||
                        repo.stargazers_count > 0 ||
                        repo.description.toLowerCase().includes('project') ||
                        repo.description.toLowerCase().includes('app') ||
                        repo.description.toLowerCase().includes('website'))
            })

            setRepos(portfolioRepos)
            setLastSync(new Date())

            // Transform for portfolio display
            const portfolioProjects = portfolioRepos
                .slice(0, 6) // Show top 6 projects
                .map(repo => ({
                    id: repo.id.toString(),
                    title: repo.name
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    description: repo.description || 'A GitHub project',
                    image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
                    tags: [
                        ...(repo.language ? [repo.language] : []),
                        ...repo.topics.slice(0, 4),
                    ].filter(Boolean),
                    github: repo.html_url,
                    demo: repo.homepage || repo.html_url,
                    featured: repo.stargazers_count > 2 || repo.topics?.includes('featured'),
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language,
                    updated: repo.updated_at,
                }))

            onProjectsUpdate?.(portfolioProjects)

            if (showToast) {
                alert(`✅ Synced ${portfolioRepos.length} repositories from GitHub!`)
            }

        } catch (error) {
            console.error('Error fetching GitHub repositories:', error)
            if (showToast) {
                alert('❌ Failed to sync with GitHub. Using cached data.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Auto-sync on component mount
    useEffect(() => {
        fetchRepositories(false)
    }, [username])

    // Set up auto-sync interval (every 5 minutes)
    useEffect(() => {
        if (!autoSyncEnabled) return

        const interval = setInterval(() => {
            fetchRepositories(false)
        }, 5 * 60 * 1000) // 5 minutes

        return () => clearInterval(interval)
    }, [autoSyncEnabled, username])

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Github className="h-5 w-5 text-emerald-600" />
                            GitHub Integration
                        </CardTitle>
                        <CardDescription>
                            Automatically syncs your latest repositories
                            {lastSync && (
                                <span className="block text-xs mt-1">
                                    Last sync: {lastSync.toLocaleTimeString()}
                                </span>
                            )}
                        </CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchRepositories(true)}
                        disabled={isLoading}
                        className="gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? 'Syncing...' : 'Refresh'}
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {/* Sync Status */}
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-emerald-700">
                                Auto-sync enabled - {repos.length} repositories found
                            </span>
                        </div>
                        <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                            Live
                        </Badge>
                    </div>

                    {/* Repository Stats */}
                    {repos.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <div className="text-2xl font-bold text-slate-900">
                                    {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
                                </div>
                                <div className="text-sm text-slate-600">Total Stars</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <div className="text-2xl font-bold text-slate-900">
                                    {repos.reduce((sum, repo) => sum + repo.forks_count, 0)}
                                </div>
                                <div className="text-sm text-slate-600">Total Forks</div>
                            </div>
                        </div>
                    )}

                    {/* Featured Repositories */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-slate-900">Recent Projects</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {repos.slice(0, 5).map(repo => (
                                <div key={repo.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm truncate">{repo.name}</span>
                                            {repo.language && (
                                                <Badge variant="outline" className="text-xs">
                                                    {repo.language}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-600 truncate">{repo.description}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <Star className="h-3 w-3" />
                                        {repo.stargazers_count}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Webhook Setup Instructions */}
                    <div className="border-t pt-4">
                        <details className="group">
                            <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 hover:text-emerald-600">
                                <span>⚡ Set up auto-deployment</span>
                                <span className="group-open:rotate-90 transition-transform">›</span>
                            </summary>
                            <div className="mt-3 p-3 bg-slate-50 rounded text-xs space-y-2">
                                <p>To auto-deploy when you push to GitHub:</p>
                                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                                    <li>Go to your Netlify site dashboard</li>
                                    <li>Settings → Build & deploy → Build hooks</li>
                                    <li>Create a new build hook</li>
                                    <li>Add webhook URL to your GitHub repository settings</li>
                                </ol>
                                <Badge variant="outline" className="text-xs">
                                    Webhook URL: https://api.netlify.com/build_hooks/[your-hook-id]
                                </Badge>
                            </div>
                        </details>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 