"use client"

import type React from "react"

import { useState } from "react"
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
} from "lucide-react"
import Image from "next/image"
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

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("personal")
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    // Portfolio data state
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        name: "Muhammad Abdullah Khan",
        title: "AI-Focused Software Engineer & Full-Stack Developer",
        bio: "Passionate about building emotion-aware systems and conversational AI. 24+ open-source projects, 100% ★5 freelance record.",
        email: "contact@example.com",
        github: "https://github.com/MuhammadKhan148",
        linkedin: "https://linkedin.com/in/muhammad-abdullah-khan",
        avatar: "/placeholder-user.jpg",
        availability: "Available for projects",
    })

    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: "1",
            title: "Freelance Software Developer",
            company: "Fiverr",
            period: "2018 - Present",
            location: "Remote",
            description: "Full-stack development with perfect client satisfaction rate",
            achievements: ["100% ★5 Rating", "50+ Projects Completed", "Expert-level Seller"]
        },
        {
            id: "2",
            title: "Lab Demonstrator",
            company: "FAST-NUCES",
            period: "2024 - Present",
            location: "Karachi, Pakistan",
            description: "Teaching assistant for computer science courses",
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
            image: "/projects/emotion-ai.jpg",
            tags: ["Python", "NLP", "OpenAI", "Emotion Recognition", "Flask"],
            github: "https://github.com/MuhammadKhan148/emotion-aware-ai",
            demo: "https://emotion-ai-chat.netlify.app",
            featured: true,
        },
    ])

    const [skills, setSkills] = useState<Skill[]>([
        { id: "1", name: "Python", category: "Backend", level: 5 },
        { id: "2", name: "React", category: "Frontend", level: 5 },
        { id: "3", name: "TypeScript", category: "Frontend", level: 4 },
        { id: "4", name: "TensorFlow", category: "AI/ML", level: 4 },
    ])

    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: "1",
            name: "Sarah Johnson",
            role: "CTO at TechCorp",
            content: "Muhammad is an exceptional engineer who consistently delivers high-quality solutions. His technical expertise and AI knowledge make him invaluable to any team.",
            avatar: "/placeholder.svg?height=60&width=60",
        },
    ])

    // Drag and drop functionality
    const [draggedItem, setDraggedItem] = useState<string | null>(null)

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedItem(id)
        e.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (e: React.DragEvent, targetId: string, type: "experience" | "project") => {
        e.preventDefault()
        if (!draggedItem) return

        if (type === "experience") {
            const items = [...experiences]
            const draggedIndex = items.findIndex((item) => item.id === draggedItem)
            const targetIndex = items.findIndex((item) => item.id === targetId)

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const [draggedExperience] = items.splice(draggedIndex, 1)
                items.splice(targetIndex, 0, draggedExperience)
                setExperiences(items)
                setHasUnsavedChanges(true)
            }
        } else if (type === "project") {
            const items = [...projects]
            const draggedIndex = items.findIndex((item) => item.id === draggedItem)
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
        // Here you would save to your backend/CMS
        console.log("Saving portfolio data...")
        setHasUnsavedChanges(false)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert('✅ Portfolio saved successfully! (Demo Mode)')
    }

    const handleImageUpload = (file: File, type: string, id?: string) => {
        // Handle image upload logic here
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            if (type === "avatar") {
                setPersonalInfo((prev) => ({ ...prev, avatar: result }))
            } else if (type === "project" && id) {
                setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, image: result } : p)))
            }
            setHasUnsavedChanges(true)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Admin Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Settings className="h-6 w-6 text-emerald-600" />
                            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Portfolio Admin
                            </h1>
                        </div>
                        {hasUnsavedChanges && (
                            <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                                Unsaved Changes
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="preview-mode" className="text-sm font-medium">
                                Preview Mode
                            </Label>
                            <Switch id="preview-mode" checked={isPreviewMode} onCheckedChange={setIsPreviewMode} />
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/" target="_blank" rel="noreferrer">
                                <Eye className="mr-2 h-4 w-4" />
                                View Live Site
                            </a>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-7 bg-white border border-slate-200 shadow-sm">
                        <TabsTrigger value="personal" className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Personal</span>
                        </TabsTrigger>
                        <TabsTrigger value="experience" className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4" />
                            <span className="hidden sm:inline">Experience</span>
                        </TabsTrigger>
                        <TabsTrigger value="skills" className="flex items-center space-x-2">
                            <Code className="h-4 w-4" />
                            <span className="hidden sm:inline">Skills</span>
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="flex items-center space-x-2">
                            <FolderOpen className="h-4 w-4" />
                            <span className="hidden sm:inline">Projects</span>
                        </TabsTrigger>
                        <TabsTrigger value="github" className="flex items-center space-x-2">
                            <Github className="h-4 w-4" />
                            <span className="hidden sm:inline">GitHub</span>
                        </TabsTrigger>
                        <TabsTrigger value="testimonials" className="flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4" />
                            <span className="hidden sm:inline">Testimonials</span>
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center space-x-2">
                            <Palette className="h-4 w-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Personal Information Tab */}
                    <TabsContent value="personal" className="space-y-6">
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
                    <TabsContent value="experience" className="space-y-6">
                        <div className="flex items-center justify-between">
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
                                    onDragStart={(e) => handleDragStart(e, exp.id)}
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
                    <TabsContent value="skills" className="space-y-6">
                        <div className="flex items-center justify-between">
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

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill) => (
                                <Card key={skill.id} className="border-0 shadow-lg">
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Input
                                                value={skill.name}
                                                onChange={(e) => {
                                                    setSkills((prev) => prev.map((s) => (s.id === skill.id ? { ...s, name: e.target.value } : s)))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="font-medium"
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

                                        <div>
                                            <Label>Category</Label>
                                            <select
                                                value={skill.category}
                                                onChange={(e) => {
                                                    setSkills((prev) =>
                                                        prev.map((s) => (s.id === skill.id ? { ...s, category: e.target.value } : s)),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md"
                                            >
                                                <option value="Frontend">Frontend</option>
                                                <option value="Backend">Backend</option>
                                                <option value="AI/ML">AI/ML</option>
                                                <option value="Cloud">Cloud & DevOps</option>
                                                <option value="Design">Design & Tools</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label>Skill Level: {skill.level}/5</Label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="5"
                                                value={skill.level}
                                                onChange={(e) => {
                                                    setSkills((prev) =>
                                                        prev.map((s) => (s.id === skill.id ? { ...s, level: Number.parseInt(e.target.value) } : s)),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="w-full mt-2"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Projects Tab */}
                    <TabsContent value="projects" className="space-y-6">
                        <div className="flex items-center justify-between">
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

                        <div className="grid gap-6 md:grid-cols-2">
                            {projects.map((project, index) => (
                                <Card
                                    key={project.id}
                                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, project.id)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, project.id, "project")}
                                >
                                    <div className="relative aspect-video">
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover rounded-t-lg"
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
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor={`featured-${project.id}`} className="text-sm">
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
                                                                ? { ...p, tags: e.target.value.split(",").map((tag) => tag.trim()) }
                                                                : p,
                                                        ),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* GitHub Integration Tab */}
                    <TabsContent value="github" className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* GitHub Sync Component */}
                            <GitHubSync
                                username="MuhammadKhan148"
                                onProjectsUpdate={(updatedProjects) => {
                                    // Update projects when GitHub sync completes
                                    setProjects(updatedProjects)
                                    setHasUnsavedChanges(true)
                                }}
                            />

                            {/* Webhook Setup Instructions */}
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Settings className="h-5 w-5 text-emerald-600" />
                                        <span>Auto-Deploy Setup</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Set up automatic deployment when you push to GitHub
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Create Netlify Build Hook</h4>
                                                <p className="text-sm text-slate-600">
                                                    Go to your Netlify dashboard → Site settings → Build & deploy → Build hooks
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                2
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Add GitHub Webhook</h4>
                                                <p className="text-sm text-slate-600">
                                                    Repository Settings → Webhooks → Add webhook
                                                </p>
                                                <div className="mt-2 p-2 bg-slate-50 rounded text-xs font-mono">
                                                    Payload URL: https://api.netlify.com/build_hooks/[your-hook-id]
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                3
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Configure Events</h4>
                                                <p className="text-sm text-slate-600">
                                                    Select "Push" events to trigger rebuilds
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h4 className="font-medium mb-2">Repository Topics for Portfolio</h4>
                                        <p className="text-sm text-slate-600 mb-3">
                                            Add these topics to your GitHub repositories to automatically include them:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {["portfolio", "project", "featured", "webapp", "website"].map(topic => (
                                                <Badge key={topic} variant="outline" className="text-xs">
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 p-3 rounded-lg">
                                        <h4 className="font-medium text-emerald-800 mb-1">🚀 Result</h4>
                                        <p className="text-sm text-emerald-700">
                                            Your portfolio will automatically update within 2-3 minutes of pushing code to GitHub!
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Testimonials Tab */}
                    <TabsContent value="testimonials" className="space-y-6">
                        <div className="flex items-center justify-between">
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

                        <div className="grid gap-6 md:grid-cols-2">
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
                                                    className="rounded-full"
                                                />
                                                <div className="space-y-1">
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
                                                    if (file) {
                                                        const reader = new FileReader()
                                                        reader.onload = (e) => {
                                                            const result = e.target?.result as string
                                                            setTestimonials((prev) =>
                                                                prev.map((t) => (t.id === testimonial.id ? { ...t, avatar: result } : t)),
                                                            )
                                                            setHasUnsavedChanges(true)
                                                        }
                                                        reader.readAsDataURL(file)
                                                    }
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
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6">
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
                                        <Input defaultValue="Muhammad Abdullah Khan - Portfolio" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label>Meta Description</Label>
                                        <Input defaultValue="AI-Focused Software Engineer Portfolio" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label>Google Analytics ID</Label>
                                        <Input placeholder="GA-XXXXXXXXX" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label>Contact Form Email</Label>
                                        <Input defaultValue="contact@example.com" className="mt-1" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Theme Settings</h3>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="p-4 border rounded-lg cursor-pointer hover:border-emerald-300 border-emerald-500">
                                            <div className="w-full h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded mb-2"></div>
                                            <p className="text-sm font-medium">Emerald (Current)</p>
                                        </div>
                                        <div className="p-4 border rounded-lg cursor-pointer hover:border-blue-300">
                                            <div className="w-full h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-2"></div>
                                            <p className="text-sm font-medium">Blue</p>
                                        </div>
                                        <div className="p-4 border rounded-lg cursor-pointer hover:border-pink-300">
                                            <div className="w-full h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded mb-2"></div>
                                            <p className="text-sm font-medium">Pink</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Dark Mode</h4>
                                        <p className="text-sm text-slate-600">Enable dark mode for your portfolio</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Analytics</h4>
                                        <p className="text-sm text-slate-600">Enable visitor analytics</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
} 