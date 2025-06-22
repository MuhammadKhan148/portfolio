import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const { personalInfo, experiences, skills } = data

        // Generate portfolio.md content
        const portfolioContent = `---
name: "${personalInfo.name}"
title: "${personalInfo.title}"
bio: "${personalInfo.bio}"
availability_status: "${personalInfo.availability}"
profile_image: "${personalInfo.avatar}"
resume: "/files/resume.pdf"
github: "${personalInfo.github}"
linkedin: "${personalInfo.linkedin}"
email: "${personalInfo.email}"
experience:
${experiences.map((exp: any) => `  - title: "${exp.title}"
    company: "${exp.company}"
    duration: "${exp.period}"
    location: "${exp.location}"
    description: "${exp.description}"
    achievements:
${exp.achievements.map((ach: string) => `      - "${ach}"`).join('\n')}`).join('\n')}
skills:
  ai_ml:
${skills.filter((s: any) => s.category === 'AI/ML').map((s: any) => `    - "${s.name}"`).join('\n')}
  frontend:
${skills.filter((s: any) => s.category === 'Frontend').map((s: any) => `    - "${s.name}"`).join('\n')}
  backend:
${skills.filter((s: any) => s.category === 'Backend').map((s: any) => `    - "${s.name}"`).join('\n')}
  devops:
${skills.filter((s: any) => s.category === 'DevOps').map((s: any) => `    - "${s.name}"`).join('\n')}
stats:
  projects: "${personalInfo.projectsCompleted}+"
  rating: "100%"
  specialty: "AI/ML Specialist"
  type: "Full-Stack Developer"
  approach: "Research-Oriented"
  quality: "Clean Code"
  role: "Lab Demonstrator"
achievements:
  open_source: "24 public repositories with flagship AIMovieRecommender ⭐150+"
  competitions: "1st Place – FAST Marathon; Winner – Twin-City Swimming; Finalist – National Critical-Thinking Tournament"
  innovation: "Emotion-aware UX adopted by two client startups"
---`

        // Write to file
        const filePath = join(process.cwd(), 'content', 'portfolio.md')
        writeFileSync(filePath, portfolioContent, 'utf8')

        return NextResponse.json({ success: true, message: 'Portfolio saved successfully!' })
    } catch (error) {
        console.error('Error saving portfolio:', error)
        return NextResponse.json({ error: 'Failed to save portfolio' }, { status: 500 })
    }
} 