import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDir = path.join(process.cwd(), 'content', 'projects')

export async function GET() {
    try {
        if (!fs.existsSync(projectsDir)) {
            return NextResponse.json([])
        }

        const projectFiles = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'))
        const projects = []

        for (const file of projectFiles) {
            const filePath = path.join(projectsDir, file)
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const { data, content } = matter(fileContent)

            projects.push({
                ...data,
                body: content,
                filename: file
            })
        }

        return NextResponse.json(projects)
    } catch (error) {
        console.error('Error reading projects:', error)
        return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const projects = await request.json()

        // Ensure projects directory exists
        if (!fs.existsSync(projectsDir)) {
            fs.mkdirSync(projectsDir, { recursive: true })
        }

        // Clear existing project files
        const existingFiles = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'))
        for (const file of existingFiles) {
            fs.unlinkSync(path.join(projectsDir, file))
        }

        // Write new project files
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i]
            const { body, filename, ...frontmatter } = project

            const projectContent = matter.stringify(body || '', frontmatter)
            const projectFilename = filename || `${project.title?.toLowerCase().replace(/\s+/g, '-')}.md`

            fs.writeFileSync(path.join(projectsDir, projectFilename), projectContent)
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving projects:', error)
        return NextResponse.json({ error: 'Failed to save projects' }, { status: 500 })
    }
} 