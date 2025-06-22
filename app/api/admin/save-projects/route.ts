import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
    try {
        const { projects } = await request.json()

        // Ensure projects directory exists
        const projectsDir = join(process.cwd(), 'content', 'projects')
        if (!existsSync(projectsDir)) {
            mkdirSync(projectsDir, { recursive: true })
        }

        // Save each project as a separate markdown file
        for (const project of projects) {
            const fileName = project.title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '') + '.md'

            const projectContent = `---
title: "${project.title}"
description: "${project.description}"
image: "${project.image}"
tags: 
${project.tags.map((tag: string) => `  - "${tag}"`).join('\n')}
github: "${project.github}"
demo: "${project.demo}"
featured: ${project.featured}
status: "Completed"
year: "2024"
---

# ${project.title}

${project.description}

## Key Features

- Advanced functionality and performance optimization
- Modern architecture and best practices
- Comprehensive testing and documentation
- Production-ready deployment

## Technical Stack

${project.tags.map((tag: string) => `- **${tag}**: Core technology component`).join('\n')}

## Links

- [GitHub Repository](${project.github})
- [Live Demo](${project.demo})
`

            const filePath = join(projectsDir, fileName)
            writeFileSync(filePath, projectContent, 'utf8')
        }

        return NextResponse.json({
            success: true,
            message: `Successfully saved ${projects.length} projects!`
        })
    } catch (error) {
        console.error('Error saving projects:', error)
        return NextResponse.json({ error: 'Failed to save projects' }, { status: 500 })
    }
} 