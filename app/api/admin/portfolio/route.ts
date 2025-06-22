import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const portfolioPath = path.join(process.cwd(), 'content', 'portfolio.md')

export async function GET() {
    try {
        if (!fs.existsSync(portfolioPath)) {
            return NextResponse.json({ error: 'Portfolio file not found' }, { status: 404 })
        }

        const fileContent = fs.readFileSync(portfolioPath, 'utf8')
        const { data } = matter(fileContent)

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error reading portfolio:', error)
        return NextResponse.json({ error: 'Failed to load portfolio' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const portfolioData = await request.json()

        // Read current file to preserve body content
        let bodyContent = ''
        if (fs.existsSync(portfolioPath)) {
            const fileContent = fs.readFileSync(portfolioPath, 'utf8')
            const { content } = matter(fileContent)
            bodyContent = content
        }

        // Create updated frontmatter
        const updatedFrontmatter = matter.stringify(bodyContent, portfolioData)

        // Write back to file
        fs.writeFileSync(portfolioPath, updatedFrontmatter)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving portfolio:', error)
        return NextResponse.json({ error: 'Failed to save portfolio' }, { status: 500 })
    }
} 