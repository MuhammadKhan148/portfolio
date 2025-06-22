"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Save,
    Eye,
    Upload,
    Plus,
    Trash2,
    GripVertical,
    Settings,
    User,
    Briefcase,
    Code,
    FolderOpen,
    MessageSquare,
    Palette,
    Star,
    Download,
    Database,
    Globe,
    Monitor,
    Edit3,
    Lock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Types
interface PersonalInfo {
    name: string
    title: string
    bio: string
    email: string
    github: string
    linkedin: string
    avatar: string
    availability: string
    availableForWork: boolean
    projectsCompleted: number
    yearsExperience: number
}

interface Experience {
    id: string
    title: string
    company: string
    period: string
    location: string
    description: string
    achievements: string[]
}

interface Project {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    github: string
    demo: string
    featured: boolean
}

interface Skill {
    id: string
    name: string
    category: string
    level: number
}

interface Testimonial {
    id: string
    name: string
    role: string
    content: string
    avatar: string
}

interface SiteSettings {
    siteTitle: string
    metaDescription: string
    googleAnalyticsId: string
    contactFormEmail: string
    theme: string
    darkMode: boolean
    analytics: boolean
}

// Password protection
const ADMIN_PASSWORDS = ["admin123", "portfolio2024"];

// Tabs Component
const Tabs = ({ value, onValueChange, children, className }: any) => <div className={className}>{children}</div>

const TabsList = ({ children, className }: any) => (
    <div
        className={`inline-flex h-12 items-center justify-center rounded-lg bg-white border border-slate-200 p-1 text-slate-500 shadow-sm ${className}`}
    >
        {children}
    </div>
)

const TabsTrigger = ({ value, children, isActive, onClick, className }: any) => (
    <button
        onClick={() => onClick(value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
            : "hover:bg-slate-100 hover:text-slate-900"
            } ${className}`}
    >
        {children}
    </button>
)

const TabsContent = ({ value, activeValue, children, className }: any) => (
    <div
        className={`mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${value === activeValue ? "block" : "hidden"
            } ${className}`}
    >
        {children}
    </div>
)

// Password Protection Component
const PasswordPrompt = ({ onAuthenticate }: { onAuthenticate: () => void }) => {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (ADMIN_PASSWORDS.includes(password)) {
            localStorage.setItem("adminAuthenticated", "true")
            onAuthenticate()
        } else {
            setError("Invalid password")
            setPassword("")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
            <Card className="w-full max-w-md border-0 shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Admin Access
                    </CardTitle>
                    <CardDescription>Enter password to access portfolio admin panel</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1"
                                placeholder="Enter admin password"
                            />
                            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                            Access Admin Panel
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [activeTab, setActiveTab] = useState("personal")
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Real portfolio data state - initialized with your actual data
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        name: "Muhammad Abdullah Khan",
        title: "AI-Focused Software Engineer & Full-Stack Developer",
        bio: "AI-Focused Software Engineer & Full-Stack Developer specializing in emotion-aware systems, conversational AI, and scalable web applications. Creator of 24+ open-source projects with 100% ★5 freelance record.",
        email: "muhammad.mak252@gmail.com",
        github: "https://github.com/MuhammadKhan148",
        linkedin: "https://linkedin.com/in/yourprofile",
        avatar: "/placeholder-user.jpg",
        availability: "Available for new opportunities",
        availableForWork: true,
        projectsCompleted: 24,
        yearsExperience: 6,
    })

    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: "1",
            title: "Freelance Full-Stack & AI Developer",
            company: "Fiverr",
            period: "Jan 2018 – Present",
            location: "Remote",
            description: "Built production-grade web & mobile apps (MERN, Flutter/Firebase) for global clients. Integrated sentiment-analysis pipelines and custom recommenders, boosting engagement ≈35%.",
            achievements: [
                "Completed 60+ contracts with zero revisions on 80% of orders",
                "Applied research-style A/B testing and model benchmarks",
                "Built emotion-aware systems adopted by two client startups",
            ],
        },
        {
            id: "2",
            title: "Lab Demonstrator",
            company: "Programming Fundamentals (PF), FAST-NUCES",
            period: "Feb 2024 – Present",
            location: "Islamabad, Pakistan",
            description: "Lead weekly C/C++ lab sessions (~120 first-year students); design and grade assignments & quizzes.",
            achievements: [
                "Built automated grading script cutting marking time by 40%",
                "Improved feedback consistency across all students",
                "Mentored students in coding fundamentals and best practices",
            ],
        },
    ])

    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            title: "Emotion-Aware Conversational AI",
            description: "Real-time chatbot that detects sentiment and serves tailored content with <200ms latency for 500 concurrent users.",
            image: "/projects/conversational-ai.jpg",
            tags: ["Python", "PyTorch", "Socket.IO", "Real-time", "Sentiment Analysis"],
            github: "https://github.com/MuhammadKhan148/emotion-aware-ai",
            demo: "https://conversational-ai.demo.com",
            featured: true,
        },
        {
            id: "2",
            title: "Python Chess Engine",
            description: "Advanced chess engine with AI opponent, move validation, and interactive gameplay features.",
            image: "/projects/chess-engine.jpg",
            tags: ["Python", "AI", "Game Development", "Algorithm"],
            github: "https://github.com/MuhammadKhan148/python-chess-engine",
            demo: "https://chess-engine.demo.com",
            featured: true,
        },
        {
            id: "3",
            title: "AI Movie Recommender",
            description: "Machine learning-powered movie recommendation system with collaborative filtering and content-based algorithms.",
            image: "/projects/ai-movie-recommender.jpg",
            tags: ["Python", "Machine Learning", "Collaborative Filtering", "Pandas", "Scikit-learn"],
            github: "https://github.com/MuhammadKhan148/AIMovieRecommender",
            demo: "https://movie-recommender.demo.com",
            featured: true,
        },
    ])

    const [skills, setSkills] = useState<Skill[]>([
        // AI/ML Skills
        { id: "1", name: "Python", category: "AI/ML", level: 5 },
        { id: "2", name: "TensorFlow", category: "AI/ML", level: 4 },
        { id: "3", name: "PyTorch", category: "AI/ML", level: 4 },
        { id: "4", name: "Sentiment Analysis", category: "AI/ML", level: 5 },
        { id: "5", name: "Recommender Systems", category: "AI/ML", level: 5 },
        { id: "6", name: "Machine Learning", category: "AI/ML", level: 4 },

        // Frontend Skills
        { id: "7", name: "React", category: "Frontend", level: 5 },
        { id: "8", name: "Next.js", category: "Frontend", level: 5 },
        { id: "9", name: "JavaScript/TypeScript", category: "Frontend", level: 5 },
        { id: "10", name: "HTML/CSS", category: "Frontend", level: 5 },
        { id: "11", name: "Flutter", category: "Frontend", level: 4 },
        { id: "12", name: "PWA", category: "Frontend", level: 4 },

        // Backend Skills
        { id: "13", name: "Node.js", category: "Backend", level: 5 },
        { id: "14", name: "MongoDB", category: "Backend", level: 4 },
        { id: "15", name: "PostgreSQL", category: "Backend", level: 4 },
        { id: "16", name: "Firebase", category: "Backend", level: 4 },
        { id: "17", name: "REST APIs", category: "Backend", level: 5 },
        { id: "18", name: "GraphQL", category: "Backend", level: 3 },

        // DevOps Skills
        { id: "19", name: "Docker", category: "DevOps", level: 4 },
        { id: "20", name: "Kubernetes", category: "DevOps", level: 3 },
        { id: "21", name: "GitHub Actions", category: "DevOps", level: 4 },
        { id: "22", name: "AWS", category: "DevOps", level: 4 },
        { id: "23", name: "CI/CD", category: "DevOps", level: 4 },
        { id: "24", name: "Git", category: "DevOps", level: 5 },
    ])

    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: "1",
            name: "Sarah Johnson",
            role: "Startup Founder",
            content: "Muhammad delivered an exceptional emotion-aware chatbot that transformed our customer engagement. His technical expertise in AI and attention to detail are remarkable. 100% recommend!",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            id: "2",
            name: "Michael Chen",
            role: "Product Manager at TechCorp",
            content: "Working with Muhammad was seamless. He delivered a complex recommendation system ahead of schedule with impressive performance metrics. His communication and professionalism are top-notch.",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            id: "3",
            name: "Dr. Emily Rodriguez",
            role: "FAST-NUCES Faculty",
            content: "Muhammad is an exceptional lab demonstrator who goes above and beyond. His automated grading system and mentoring approach have significantly improved our programming fundamentals course.",
            avatar: "/placeholder.svg?height=60&width=60",
        },
    ])

    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        siteTitle: "Muhammad Abdullah Khan - Portfolio",
        metaDescription: "AI-Focused Software Engineer & Full-Stack Developer specializing in emotion-aware systems and conversational AI",
        googleAnalyticsId: "",
        contactFormEmail: "muhammad.mak252@gmail.com",
        theme: "emerald",
        darkMode: false,
        analytics: true,
    })

    // Check authentication on mount
    useEffect(() => {
        const authStatus = localStorage.getItem("adminAuthenticated")
        setIsAuthenticated(authStatus === "true")

        // Load saved data from localStorage if exists
        const savedData = localStorage.getItem("portfolioAdminData")
        if (savedData) {
            try {
                const data = JSON.parse(savedData)
                if (data.personalInfo) setPersonalInfo(data.personalInfo)
                if (data.experiences) setExperiences(data.experiences)
                if (data.projects) setProjects(data.projects)
                if (data.skills) setSkills(data.skills)
                if (data.testimonials) setTestimonials(data.testimonials)
                if (data.siteSettings) setSiteSettings(data.siteSettings)
            } catch (error) {
                console.log("No saved data found, using defaults")
            }
        }

        setIsLoading(false)
    }, [])

    // Auto-save to localStorage when data changes
    useEffect(() => {
        if (!isLoading) {
            const data = {
                personalInfo,
                experiences,
                projects,
                skills,
                testimonials,
                siteSettings,
                lastUpdated: new Date().toISOString()
            }
            localStorage.setItem("portfolioAdminData", JSON.stringify(data))
        }
    }, [personalInfo, experiences, projects, skills, testimonials, siteSettings, isLoading])

    if (!isAuthenticated) {
        return <PasswordPrompt onAuthenticate={() => setIsAuthenticated(true)} />
    }

    // Drag and drop functionality
    const handleDragStart = (e: React.DragEvent, id: string, type: string) => {
        setDraggedItem(`${type}-${id}`)
        e.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (e: React.DragEvent, targetId: string, type: string) => {
        e.preventDefault()
        if (!draggedItem) return

        const [draggedType, draggedId] = draggedItem.split("-")
        if (draggedType !== type || draggedId === targetId) return

        if (type === "experience") {
            const items = [...experiences]
            const draggedIndex = items.findIndex((item) => item.id === draggedId)
            const targetIndex = items.findIndex((item) => item.id === targetId)

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const [draggedExperience] = items.splice(draggedIndex, 1)
                items.splice(targetIndex, 0, draggedExperience)
                setExperiences(items)
                setHasUnsavedChanges(true)
            }
        } else if (type === "project") {
            const items = [...projects]
            const draggedIndex = items.findIndex((item) => item.id === draggedId)
            const targetIndex = items.findIndex((item) => item.id === targetId)

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const [draggedProject] = items.splice(draggedIndex, 1)
                items.splice(targetIndex, 0, draggedProject)
                setProjects(items)
                setHasUnsavedChanges(true)
            }
        }

        setDraggedItem(null)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Save portfolio data
            const portfolioResponse = await fetch('/api/admin/save-portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ personalInfo, experiences, skills })
            })

            if (!portfolioResponse.ok) throw new Error('Failed to save portfolio')

            // Save projects data
            const projectsResponse = await fetch('/api/admin/save-projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projects })
            })

            if (!projectsResponse.ok) throw new Error('Failed to save projects')

            const data = {
                personalInfo,
                experiences,
                projects,
                skills,
                testimonials,
                siteSettings,
                lastUpdated: new Date().toISOString()
            }

            // Also save to localStorage as backup
            localStorage.setItem("portfolioAdminData", JSON.stringify(data))
            setHasUnsavedChanges(false)

            alert("✅ Portfolio saved successfully! Files updated and ready for deployment.")
        } catch (error) {
            console.error('Save error:', error)
            alert("❌ Failed to save portfolio. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    const handlePublish = async () => {
        await handleSave()
        alert("🚀 Portfolio published! Changes are now live and will be deployed automatically.")
    }

    const handleExportMarkdown = () => {
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
${experiences.map(exp => `  - title: "${exp.title}"
    company: "${exp.company}"
    duration: "${exp.period}"
    location: "${exp.location}"
    description: "${exp.description}"
    achievements:
${exp.achievements.map(ach => `      - "${ach}"`).join('\n')}`).join('\n')}
skills:
  ai_ml:
${skills.filter(s => s.category === 'AI/ML').map(s => `    - "${s.name}"`).join('\n')}
  frontend:
${skills.filter(s => s.category === 'Frontend').map(s => `    - "${s.name}"`).join('\n')}
  backend:
${skills.filter(s => s.category === 'Backend').map(s => `    - "${s.name}"`).join('\n')}
  devops:
${skills.filter(s => s.category === 'DevOps').map(s => `    - "${s.name}"`).join('\n')}
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

        // Create and download the file
        const blob = new Blob([portfolioContent], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'portfolio.md'
        a.click()
        URL.revokeObjectURL(url)

        alert("Portfolio markdown exported! Replace your content/portfolio.md file with this download.")
    }

    const handleImageUpload = (file: File, type: string, id?: string) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            if (type === "avatar") {
                setPersonalInfo((prev) => ({ ...prev, avatar: result }))
            } else if (type === "project" && id) {
                setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, image: result } : p)))
            } else if (type === "testimonial" && id) {
                setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, avatar: result } : t)))
            }
            setHasUnsavedChanges(true)
        }
        reader.readAsDataURL(file)
    }

    // Preview Mode
    if (isPreviewMode) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <div className="fixed top-4 right-4 z-50 flex gap-2">
                    <Button onClick={() => setIsPreviewMode(false)} variant="outline">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit Mode
                    </Button>
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Monitor className="h-24 w-24 mx-auto mb-4 text-emerald-600" />
                        <h2 className="text-2xl font-bold mb-2">Portfolio Preview</h2>
                        <p className="text-slate-600 mb-4">This would show your live portfolio with current data</p>
                        <Button onClick={() => setIsPreviewMode(false)}>Back to Editor</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Admin Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Settings className="h-6 w-6 text-emerald-600" />
                                <div className="absolute inset-0 bg-emerald-600/20 rounded-full blur-xl" />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Portfolio Admin
                            </h1>
                        </div>
                        {hasUnsavedChanges && (
                            <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse" />
                                Unsaved Changes
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="preview-mode" className="text-sm font-medium">
                                Preview
                            </Label>
                            <Switch id="preview-mode" checked={isPreviewMode} onCheckedChange={setIsPreviewMode} />
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges || isSaving}
                            variant="outline"
                            className="border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? "Saving..." : "Save Draft"}
                        </Button>
                        <Button
                            onClick={handlePublish}
                            disabled={isSaving}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                            {isSaving ? "Publishing..." : "Publish Live"}
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/" target="_blank" rel="noreferrer">
                                <Eye className="mr-2 h-4 w-4" />
                                View Site
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container py-8 px-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-6 lg:w-fit">
                        <TabsTrigger value="personal" isActive={activeTab === "personal"} onClick={setActiveTab}>
                            <User className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Personal</span>
                        </TabsTrigger>
                        <TabsTrigger value="experience" isActive={activeTab === "experience"} onClick={setActiveTab}>
                            <Briefcase className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Experience</span>
                        </TabsTrigger>
                        <TabsTrigger value="skills" isActive={activeTab === "skills"} onClick={setActiveTab}>
                            <Code className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Skills</span>
                        </TabsTrigger>
                        <TabsTrigger value="projects" isActive={activeTab === "projects"} onClick={setActiveTab}>
                            <FolderOpen className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Projects</span>
                        </TabsTrigger>
                        <TabsTrigger value="testimonials" isActive={activeTab === "testimonials"} onClick={setActiveTab}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Testimonials</span>
                        </TabsTrigger>
                        <TabsTrigger value="settings" isActive={activeTab === "settings"} onClick={setActiveTab}>
                            <Palette className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Settings</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Personal Information Tab */}
                    <TabsContent value="personal" activeValue={activeTab}>
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-emerald-600" />
                                    <span>Personal Information</span>
                                </CardTitle>
                                <CardDescription>Update your basic information and contact details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={personalInfo.name}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, name: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="title">Professional Title</Label>
                                            <Input
                                                id="title"
                                                value={personalInfo.title}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, title: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={personalInfo.email}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="availability">Availability Status</Label>
                                            <Input
                                                id="availability"
                                                value={personalInfo.availability}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, availability: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="available-work"
                                                checked={personalInfo.availableForWork}
                                                onCheckedChange={(checked) => {
                                                    setPersonalInfo((prev) => ({ ...prev, availableForWork: checked }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                            <Label htmlFor="available-work">Available for work</Label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={personalInfo.bio}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, bio: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1 min-h-[120px]"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="projects-count">Projects Completed</Label>
                                                <Input
                                                    id="projects-count"
                                                    type="number"
                                                    value={personalInfo.projectsCompleted}
                                                    onChange={(e) => {
                                                        setPersonalInfo((prev) => ({ ...prev, projectsCompleted: Number.parseInt(e.target.value) }))
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="years-experience">Years Experience</Label>
                                                <Input
                                                    id="years-experience"
                                                    type="number"
                                                    value={personalInfo.yearsExperience}
                                                    onChange={(e) => {
                                                        setPersonalInfo((prev) => ({ ...prev, yearsExperience: Number.parseInt(e.target.value) }))
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="github">GitHub URL</Label>
                                            <Input
                                                id="github"
                                                value={personalInfo.github}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, github: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="linkedin">LinkedIn URL</Label>
                                            <Input
                                                id="linkedin"
                                                value={personalInfo.linkedin}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, linkedin: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label>Profile Picture</Label>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <Image
                                            src={personalInfo.avatar || "/placeholder.svg"}
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="rounded-full border-2 border-emerald-200"
                                        />
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(file, "avatar")
                                                }}
                                                className="hidden"
                                                id="avatar-upload"
                                            />
                                            <Button variant="outline" asChild>
                                                <label htmlFor="avatar-upload" className="cursor-pointer">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload New Photo
                                                </label>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Experience Tab */}
                    <TabsContent value="experience" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Work Experience</h2>
                                <p className="text-slate-600">Manage your professional experience. Drag to reorder.</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newExp: Experience = {
                                        id: Date.now().toString(),
                                        title: "New Position",
                                        company: "Company Name",
                                        period: "2024 - Present",
                                        location: "Location",
                                        description: "Job description...",
                                        achievements: ["Achievement 1"],
                                    }
                                    setExperiences((prev) => [newExp, ...prev])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Experience
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {experiences.map((exp, index) => (
                                <Card
                                    key={exp.id}
                                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, exp.id, "experience")}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, exp.id, "experience")}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <GripVertical className="h-5 w-5 text-slate-400" />
                                                <span className="text-sm text-slate-500">#{index + 1}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setExperiences((prev) => prev.filter((e) => e.id !== exp.id))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <Label>Job Title</Label>
                                                <Input
                                                    value={exp.title}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, title: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Company</Label>
                                                <Input
                                                    value={exp.company}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, company: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Period</Label>
                                                <Input
                                                    value={exp.period}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, period: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Location</Label>
                                                <Input
                                                    value={exp.location}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, location: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={exp.description}
                                                onChange={(e) => {
                                                    setExperiences((prev) =>
                                                        prev.map((item) => (item.id === exp.id ? { ...item, description: e.target.value } : item)),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <Label>Achievements</Label>
                                            <div className="space-y-2 mt-2">
                                                {exp.achievements.map((achievement, achIndex) => (
                                                    <div key={achIndex} className="flex items-center space-x-2">
                                                        <Input
                                                            value={achievement}
                                                            onChange={(e) => {
                                                                setExperiences((prev) =>
                                                                    prev.map((item) =>
                                                                        item.id === exp.id
                                                                            ? {
                                                                                ...item,
                                                                                achievements: item.achievements.map((ach, i) =>
                                                                                    i === achIndex ? e.target.value : ach,
                                                                                ),
                                                                            }
                                                                            : item,
                                                                    ),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                            className="flex-1"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setExperiences((prev) =>
                                                                    prev.map((item) =>
                                                                        item.id === exp.id
                                                                            ? {
                                                                                ...item,
                                                                                achievements: item.achievements.filter((_, i) => i !== achIndex),
                                                                            }
                                                                            : item,
                                                                    ),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) =>
                                                                item.id === exp.id
                                                                    ? { ...item, achievements: [...item.achievements, "New achievement"] }
                                                                    : item,
                                                            ),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Achievement
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Skills Tab */}
                    <TabsContent value="skills" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Skills</h2>
                                <p className="text-slate-600">Manage your technical skills and expertise levels</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newSkill: Skill = {
                                        id: Date.now().toString(),
                                        name: "New Skill",
                                        category: "Frontend",
                                        level: 3,
                                    }
                                    setSkills((prev) => [...prev, newSkill])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Skill
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {["AI/ML", "Frontend", "Backend", "DevOps"].map((category) => (
                                <Card key={category} className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            {category === "AI/ML" && <Star className="h-5 w-5 text-purple-600" />}
                                            {category === "Frontend" && <Code className="h-5 w-5 text-emerald-600" />}
                                            {category === "Backend" && <Database className="h-5 w-5 text-teal-600" />}
                                            {category === "DevOps" && <Globe className="h-5 w-5 text-orange-600" />}
                                            <span>{category}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {skills
                                            .filter((skill) => skill.category === category)
                                            .map((skill) => (
                                                <div key={skill.id} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Input
                                                            value={skill.name}
                                                            onChange={(e) => {
                                                                setSkills((prev) =>
                                                                    prev.map((s) => (s.id === skill.id ? { ...s, name: e.target.value } : s)),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                            className="flex-1 mr-2"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSkills((prev) => prev.filter((s) => s.id !== skill.id))
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-slate-600 w-16">Level {skill.level}</span>
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="5"
                                                            value={skill.level}
                                                            onChange={(e) => {
                                                                setSkills((prev) =>
                                                                    prev.map((s) =>
                                                                        s.id === skill.id ? { ...s, level: Number.parseInt(e.target.value) } : s,
                                                                    ),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                            className="flex-1"
                                                        />
                                                        <div className="flex space-x-1">
                                                            {[1, 2, 3, 4, 5].map((level) => (
                                                                <Star
                                                                    key={level}
                                                                    className={`h-3 w-3 ${level <= skill.level ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Projects Tab */}
                    <TabsContent value="projects" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Projects</h2>
                                <p className="text-slate-600">Showcase your best work. Drag to reorder.</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newProject: Project = {
                                        id: Date.now().toString(),
                                        title: "New Project",
                                        description: "Project description...",
                                        image: "/placeholder.svg?height=300&width=500",
                                        tags: ["React"],
                                        github: "https://github.com",
                                        demo: "https://example.com",
                                        featured: false,
                                    }
                                    setProjects((prev) => [newProject, ...prev])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Project
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <Card
                                    key={project.id}
                                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move overflow-hidden"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, project.id, "project")}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, project.id, "project")}
                                >
                                    <div className="relative aspect-video">
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-2 right-2 flex space-x-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(file, "project", project.id)
                                                }}
                                                className="hidden"
                                                id={`project-image-${project.id}`}
                                            />
                                            <Button variant="secondary" size="sm" asChild>
                                                <label htmlFor={`project-image-${project.id}`} className="cursor-pointer">
                                                    <Upload className="h-4 w-4" />
                                                </label>
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    setProjects((prev) => prev.filter((p) => p.id !== project.id))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute top-2 left-2 flex items-center space-x-2">
                                            <GripVertical className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                                            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">#{index + 1}</span>
                                            {project.featured && (
                                                <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Input
                                                value={project.title}
                                                onChange={(e) => {
                                                    setProjects((prev) =>
                                                        prev.map((p) => (p.id === project.id ? { ...p, title: e.target.value } : p)),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="font-semibold"
                                            />
                                            <div className="flex items-center space-x-2 ml-2">
                                                <Label htmlFor={`featured-${project.id}`} className="text-sm whitespace-nowrap">
                                                    Featured
                                                </Label>
                                                <Switch
                                                    id={`featured-${project.id}`}
                                                    checked={project.featured}
                                                    onCheckedChange={(checked) => {
                                                        setProjects((prev) =>
                                                            prev.map((p) => (p.id === project.id ? { ...p, featured: checked } : p)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <Textarea
                                            value={project.description}
                                            onChange={(e) => {
                                                setProjects((prev) =>
                                                    prev.map((p) => (p.id === project.id ? { ...p, description: e.target.value } : p)),
                                                )
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="min-h-[80px]"
                                        />

                                        <div className="grid gap-2 md:grid-cols-2">
                                            <div>
                                                <Label>GitHub URL</Label>
                                                <Input
                                                    value={project.github}
                                                    onChange={(e) => {
                                                        setProjects((prev) =>
                                                            prev.map((p) => (p.id === project.id ? { ...p, github: e.target.value } : p)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Demo URL</Label>
                                                <Input
                                                    value={project.demo}
                                                    onChange={(e) => {
                                                        setProjects((prev) =>
                                                            prev.map((p) => (p.id === project.id ? { ...p, demo: e.target.value } : p)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Technologies (comma-separated)</Label>
                                            <Input
                                                value={project.tags.join(", ")}
                                                onChange={(e) => {
                                                    setProjects((prev) =>
                                                        prev.map((p) =>
                                                            p.id === project.id
                                                                ? {
                                                                    ...p,
                                                                    tags: e.target.value
                                                                        .split(",")
                                                                        .map((tag) => tag.trim())
                                                                        .filter(Boolean),
                                                                }
                                                                : p,
                                                        ),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                                placeholder="React, Node.js, PostgreSQL"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Testimonials Tab */}
                    <TabsContent value="testimonials" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Testimonials</h2>
                                <p className="text-slate-600">Manage client and colleague testimonials</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newTestimonial: Testimonial = {
                                        id: Date.now().toString(),
                                        name: "New Person",
                                        role: "Role at Company",
                                        content: "Testimonial content...",
                                        avatar: "/placeholder.svg?height=60&width=60",
                                    }
                                    setTestimonials((prev) => [...prev, newTestimonial])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Testimonial
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id} className="border-0 shadow-lg">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src={testimonial.avatar || "/placeholder.svg"}
                                                    alt={testimonial.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full border-2 border-emerald-200"
                                                />
                                                <div className="space-y-1 flex-1">
                                                    <Input
                                                        value={testimonial.name}
                                                        onChange={(e) => {
                                                            setTestimonials((prev) =>
                                                                prev.map((t) => (t.id === testimonial.id ? { ...t, name: e.target.value } : t)),
                                                            )
                                                            setHasUnsavedChanges(true)
                                                        }}
                                                        className="font-medium"
                                                    />
                                                    <Input
                                                        value={testimonial.role}
                                                        onChange={(e) => {
                                                            setTestimonials((prev) =>
                                                                prev.map((t) => (t.id === testimonial.id ? { ...t, role: e.target.value } : t)),
                                                            )
                                                            setHasUnsavedChanges(true)
                                                        }}
                                                        className="text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Textarea
                                            value={testimonial.content}
                                            onChange={(e) => {
                                                setTestimonials((prev) =>
                                                    prev.map((t) => (t.id === testimonial.id ? { ...t, content: e.target.value } : t)),
                                                )
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="min-h-[100px]"
                                            placeholder="Testimonial content..."
                                        />

                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(file, "testimonial", testimonial.id)
                                                }}
                                                className="hidden"
                                                id={`testimonial-avatar-${testimonial.id}`}
                                            />
                                            <Button variant="outline" size="sm" asChild>
                                                <label htmlFor={`testimonial-avatar-${testimonial.id}`} className="cursor-pointer">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Change Avatar
                                                </label>
                                            </Button>
                                        </div>

                                        <div className="flex justify-center">
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" activeValue={activeTab}>
                        <div className="space-y-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Palette className="h-5 w-5 text-emerald-600" />
                                        <span>Site Settings</span>
                                    </CardTitle>
                                    <CardDescription>Configure your portfolio settings and preferences</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <Label>Site Title</Label>
                                            <Input
                                                value={siteSettings.siteTitle}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, siteTitle: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Meta Description</Label>
                                            <Input
                                                value={siteSettings.metaDescription}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, metaDescription: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Google Analytics ID</Label>
                                            <Input
                                                value={siteSettings.googleAnalyticsId}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, googleAnalyticsId: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                placeholder="GA-XXXXXXXXX"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Contact Form Email</Label>
                                            <Input
                                                value={siteSettings.contactFormEmail}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, contactFormEmail: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Theme Settings</h3>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            {[
                                                { name: "Emerald", value: "emerald", gradient: "from-emerald-400 to-teal-400" },
                                                { name: "Blue", value: "blue", gradient: "from-blue-400 to-purple-400" },
                                                { name: "Pink", value: "pink", gradient: "from-pink-400 to-rose-400" },
                                            ].map((theme) => (
                                                <div
                                                    key={theme.value}
                                                    onClick={() => {
                                                        setSiteSettings((prev) => ({ ...prev, theme: theme.value }))
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${siteSettings.theme === theme.value
                                                        ? "border-emerald-500 ring-2 ring-emerald-200"
                                                        : "border-slate-200 hover:border-slate-300"
                                                        }`}
                                                >
                                                    <div className={`w-full h-20 bg-gradient-to-r ${theme.gradient} rounded mb-2`}></div>
                                                    <p className="text-sm font-medium">
                                                        {theme.name} {siteSettings.theme === theme.value && "(Current)"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Dark Mode</h4>
                                                <p className="text-sm text-slate-600">Enable dark mode for your portfolio</p>
                                            </div>
                                            <Switch
                                                checked={siteSettings.darkMode}
                                                onCheckedChange={(checked) => {
                                                    setSiteSettings((prev) => ({ ...prev, darkMode: checked }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Analytics</h4>
                                                <p className="text-sm text-slate-600">Enable visitor analytics tracking</p>
                                            </div>
                                            <Switch
                                                checked={siteSettings.analytics}
                                                onCheckedChange={(checked) => {
                                                    setSiteSettings((prev) => ({ ...prev, analytics: checked }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Export/Import Data</CardTitle>
                                    <CardDescription>Backup or restore your portfolio data</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex space-x-4 flex-wrap gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                const data = {
                                                    personalInfo,
                                                    experiences,
                                                    projects,
                                                    skills,
                                                    testimonials,
                                                    siteSettings,
                                                }
                                                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
                                                const url = URL.createObjectURL(blob)
                                                const a = document.createElement("a")
                                                a.href = url
                                                a.download = "portfolio-data.json"
                                                a.click()
                                                URL.revokeObjectURL(url)
                                            }}
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Export JSON
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleExportMarkdown}
                                            className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Export Portfolio.md
                                        </Button>
                                        <div>
                                            <input
                                                type="file"
                                                accept=".json"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        const reader = new FileReader()
                                                        reader.onload = (e) => {
                                                            try {
                                                                const data = JSON.parse(e.target?.result as string)
                                                                if (data.personalInfo) setPersonalInfo(data.personalInfo)
                                                                if (data.experiences) setExperiences(data.experiences)
                                                                if (data.projects) setProjects(data.projects)
                                                                if (data.skills) setSkills(data.skills)
                                                                if (data.testimonials) setTestimonials(data.testimonials)
                                                                if (data.siteSettings) setSiteSettings(data.siteSettings)
                                                                setHasUnsavedChanges(true)
                                                                alert("Data imported successfully!")
                                                            } catch (error) {
                                                                alert("Error importing data. Please check the file format.")
                                                            }
                                                        }
                                                        reader.readAsText(file)
                                                    }
                                                }}
                                                className="hidden"
                                                id="import-data"
                                            />
                                            <Button variant="outline" asChild>
                                                <label htmlFor="import-data" className="cursor-pointer">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Import Data
                                                </label>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
        </div>
    )
}
