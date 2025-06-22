"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    Github,
    Star,
    Download,
    Database,
    Globe,
    Monitor,
    Edit3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { GitHubSync } from "@/components/github-sync"

// Types for our portfolio data
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

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("personal")
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Portfolio data state
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        name: "Muhammad Abdullah Khan",
        title: "AI-Focused Software Engineer & Full-Stack Developer",
        bio: "AI-focused Software Engineer with expertise in full-stack development, machine learning, and conversational AI. I specialize in building emotion-aware systems and have contributed to 24+ open-source projects with a 100% ★5 freelance record.",
        email: "abdullahkhan148@gmail.com",
        github: "https://github.com/MuhammadKhan148",
        linkedin: "https://linkedin.com/in/muhammad-abdullah-khan-b17a2b1b8/",
        avatar: "/placeholder-user.jpg",
        availability: "Available for new opportunities",
        availableForWork: true,
        projectsCompleted: 24,
        yearsExperience: 6,
    })

    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: "1",
            title: "Freelance Full-Stack Developer",
            company: "Fiverr",
            period: "2018 - Present",
            location: "Remote",
            description: "Providing comprehensive web development services with a focus on AI integration and user experience optimization.",
            achievements: ["100% ★5 Rating", "50+ Projects Completed", "Expert-level Seller"]
        },
        {
            id: "2",
            title: "Lab Demonstrator",
            company: "FAST-NUCES",
            period: "2024 - Present",
            location: "Karachi, Pakistan",
            description: "Teaching assistant for computer science courses, mentoring students in programming and AI concepts.",
            achievements: ["Student Mentoring", "Lab Supervision", "Course Material Development"]
        }
    ])

    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            title: "AI Movie Recommender",
            description: "Intelligent movie recommendation system using machine learning algorithms to suggest personalized content based on user preferences and viewing history.",
            image: "/projects/ai-movie-recommender.jpg",
            tags: ["Python", "Machine Learning", "Flask", "React", "TensorFlow"],
            github: "https://github.com/MuhammadKhan148/ai-movie-recommender",
            demo: "https://ai-movie-recommender.netlify.app",
            featured: true,
        },
        {
            id: "2",
            title: "Emotion-Aware Conversational AI",
            description: "Advanced chatbot that recognizes and responds to human emotions, providing empathetic and contextually appropriate interactions.",
            image: "/placeholder.jpg",
            tags: ["Python", "NLP", "OpenAI", "Emotion Recognition", "Flask"],
            github: "https://github.com/MuhammadKhan148/emotion-aware-ai",
            demo: "https://emotion-ai-chat.netlify.app",
            featured: true,
        },
        {
            id: "3",
            title: "Python Chess Engine",
            description: "Complete chess engine implementation with AI opponent, move validation, and game state management using minimax algorithm.",
            image: "/placeholder.jpg",
            tags: ["Python", "Pygame", "Minimax", "Alpha-Beta Pruning", "Game AI"],
            github: "https://github.com/MuhammadKhan148/python-chess-engine",
            demo: "https://python-chess-engine.netlify.app",
            featured: false,
        },
    ])

    const [skills, setSkills] = useState<Skill[]>([
        { id: "1", name: "React", category: "Frontend", level: 5 },
        { id: "2", name: "Next.js", category: "Frontend", level: 5 },
        { id: "3", name: "TypeScript", category: "Frontend", level: 4 },
        { id: "4", name: "Tailwind CSS", category: "Frontend", level: 5 },
        { id: "5", name: "Node.js", category: "Backend", level: 5 },
        { id: "6", name: "Python", category: "Backend", level: 5 },
        { id: "7", name: "PostgreSQL", category: "Backend", level: 4 },
        { id: "8", name: "MongoDB", category: "Backend", level: 4 },
        { id: "9", name: "TensorFlow", category: "AI/ML", level: 4 },
        { id: "10", name: "PyTorch", category: "AI/ML", level: 4 },
        { id: "11", name: "Scikit-learn", category: "AI/ML", level: 5 },
        { id: "12", name: "OpenCV", category: "AI/ML", level: 4 },
    ])

    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: "1",
            name: "Sarah Johnson",
            role: "CTO at TechCorp",
            content: "Muhammad is an exceptional engineer who consistently delivers high-quality solutions. His expertise in AI and full-stack development makes him invaluable to any team.",
            avatar: "/placeholder-user.jpg",
        },
        {
            id: "2",
            name: "Michael Chen",
            role: "Product Manager",
            content: "Working with Muhammad has been a game-changer. He not only writes excellent code but also brings innovative AI solutions that drive product success.",
            avatar: "/placeholder-user.jpg",
        },
    ])

    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        siteTitle: "Muhammad Abdullah Khan - Portfolio",
        metaDescription: "AI-Focused Software Engineer & Full-Stack Developer Portfolio",
        googleAnalyticsId: "",
        contactFormEmail: "abdullahkhan148@gmail.com",
        theme: "emerald",
        darkMode: false,
        analytics: true,
    })

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
        console.log("Saving portfolio data...")
        console.log({
            personalInfo,
            experiences,
            projects,
            skills,
            testimonials,
            siteSettings,
        })

        // Save to localStorage for demo purposes
        localStorage.setItem('portfolio-admin-data', JSON.stringify({
            personalInfo,
            experiences,
            projects,
            skills,
            testimonials,
            siteSettings,
        }))

        setHasUnsavedChanges(false)
        alert("Portfolio saved successfully! (Demo mode - data saved to localStorage)")
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
                            disabled={!hasUnsavedChanges}
                            variant="outline"
                            className="border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save Draft
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
                        <TabsTrigger value="personal" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Personal</span>
                        </TabsTrigger>
                        <TabsTrigger value="experience" className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span className="hidden sm:inline">Experience</span>
                        </TabsTrigger>
                        <TabsTrigger value="skills" className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            <span className="hidden sm:inline">Skills</span>
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4" />
                            <span className="hidden sm:inline">Projects</span>
                        </TabsTrigger>
                        <TabsTrigger value="testimonials" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span className="hidden sm:inline">Testimonials</span>
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Personal Information Tab */}
                    <TabsContent value="personal" className="mt-6">
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
                                            src={personalInfo.avatar || "/placeholder-user.jpg"}
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

                    {/* More tabs will continue... */}
                </Tabs>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
        </div>
    )
}
