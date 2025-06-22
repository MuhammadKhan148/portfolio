"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
} from "lucide-react"
import Image from "next/image"

// Types for our portfolio data
interface PersonalInfo {
    name: string
    title: string
    bio: string
    email: string
    github: string
    linkedin: string
    profile_image: string
    availability_status: string
    resume: string
}

interface Experience {
    title: string
    company: string
    duration: string
    location: string
    description: string
    achievements: string[]
}

interface Project {
    title: string
    description: string
    image: string
    tags: string[]
    github: string
    demo: string
    featured: boolean
    status?: string
    year?: string
    body?: string
}

interface Skills {
    ai_ml: string[]
    frontend: string[]
    backend: string[]
    devops: string[]
}

interface Stats {
    projects: string
    rating: string
    specialty: string
    type: string
    approach: string
    quality: string
    role: string
}

interface Achievements {
    open_source: string
    competitions: string
    innovation: string
}

interface PortfolioData {
    personal: PersonalInfo
    experience: Experience[]
    skills: Skills
    stats: Stats
    achievements: Achievements
}

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("personal")
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    // Portfolio data state
    const [portfolioData, setPortfolioData] = useState<PortfolioData>({
        personal: {
            name: "",
            title: "",
            bio: "",
            email: "",
            github: "",
            linkedin: "",
            profile_image: "",
            availability_status: "",
            resume: "",
        },
        experience: [],
        skills: {
            ai_ml: [],
            frontend: [],
            backend: [],
            devops: [],
        },
        stats: {
            projects: "",
            rating: "",
            specialty: "",
            type: "",
            approach: "",
            quality: "",
            role: "",
        },
        achievements: {
            open_source: "",
            competitions: "",
            innovation: "",
        },
    })

    const [projects, setProjects] = useState<Project[]>([])

    // Load data on component mount
    useEffect(() => {
        loadPortfolioData()
        loadProjects()
    }, [])

    const loadPortfolioData = async () => {
        try {
            // Load sample data for demo (in a real implementation, you'd need a different approach for static sites)
            const sampleData: PortfolioData = {
                personal: {
                    name: "Muhammad Abdullah Khan",
                    title: "AI-Focused Software Engineer & Full-Stack Developer",
                    bio: "Passionate about building emotion-aware systems and conversational AI. 24+ open-source projects, 100% ★5 freelance record.",
                    email: "contact@example.com",
                    github: "https://github.com/MuhammadKhan148",
                    linkedin: "https://linkedin.com/in/muhammad-abdullah-khan",
                    profile_image: "/placeholder-user.jpg",
                    availability_status: "Available for projects",
                    resume: "/files/resume.pdf",
                },
                experience: [
                    {
                        title: "Freelance Software Developer",
                        company: "Fiverr",
                        duration: "2018 - Present",
                        location: "Remote",
                        description: "Full-stack development with perfect client satisfaction rate",
                        achievements: ["100% ★5 Rating", "50+ Projects Completed", "Expert-level Seller"]
                    },
                    {
                        title: "Lab Demonstrator",
                        company: "FAST-NUCES",
                        duration: "2024 - Present",
                        location: "Karachi, Pakistan",
                        description: "Teaching assistant for computer science courses",
                        achievements: ["Student Mentoring", "Lab Supervision", "Course Material Development"]
                    }
                ],
                skills: {
                    ai_ml: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NLP", "Machine Learning"],
                    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
                    backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
                    devops: ["Docker", "Git", "Linux", "CI/CD", "AWS"]
                },
                stats: {
                    projects: "24+",
                    rating: "100% ★5",
                    specialty: "AI & Full-Stack",
                    type: "Emotion-Aware Systems",
                    approach: "User-Centric Design",
                    quality: "Production-Ready",
                    role: "Technical Lead"
                },
                achievements: {
                    open_source: "24+ GitHub repositories",
                    competitions: "Multiple hackathon wins",
                    innovation: "Emotion-aware AI systems"
                }
            }

            setPortfolioData(sampleData)
        } catch (error) {
            console.error('Error loading portfolio data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const loadProjects = async () => {
        try {
            // Load sample projects for demo
            const sampleProjects: Project[] = [
                {
                    title: "AI Movie Recommender",
                    description: "Intelligent movie recommendation system using machine learning algorithms to suggest personalized content based on user preferences and viewing history.",
                    image: "/projects/ai-movie-recommender.jpg",
                    tags: ["Python", "Machine Learning", "Flask", "React", "TensorFlow"],
                    github: "https://github.com/MuhammadKhan148/ai-movie-recommender",
                    demo: "https://ai-movie-recommender.netlify.app",
                    featured: true,
                    status: "Completed",
                    year: "2024"
                },
                {
                    title: "Emotion-Aware Conversational AI",
                    description: "Advanced chatbot that recognizes and responds to human emotions, providing empathetic and contextually appropriate interactions.",
                    image: "/projects/emotion-ai.jpg",
                    tags: ["Python", "NLP", "OpenAI", "Emotion Recognition", "Flask"],
                    github: "https://github.com/MuhammadKhan148/emotion-aware-ai",
                    demo: "https://emotion-ai-chat.netlify.app",
                    featured: true,
                    status: "Completed",
                    year: "2024"
                },
                {
                    title: "Python Chess Engine",
                    description: "High-performance chess engine with AI opponent, move validation, and advanced game analysis features.",
                    image: "/projects/chess-engine.jpg",
                    tags: ["Python", "AI", "Game Development", "Algorithms"],
                    github: "https://github.com/MuhammadKhan148/python-chess-engine",
                    demo: "https://python-chess-demo.netlify.app",
                    featured: false,
                    status: "Completed",
                    year: "2023"
                }
            ]

            setProjects(sampleProjects)
        } catch (error) {
            console.error('Error loading projects:', error)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Simulate save operation for demo
            await new Promise(resolve => setTimeout(resolve, 1000))

            // In a real implementation, you would need to:
            // 1. Use a backend API to save data
            // 2. Or implement a file-based CMS solution
            // 3. Or integrate with a headless CMS like Strapi/Contentful

            const dataToExport = {
                personal: portfolioData.personal,
                experience: portfolioData.experience,
                skills: portfolioData.skills,
                stats: portfolioData.stats,
                achievements: portfolioData.achievements,
                projects: projects
            }

            // Save to localStorage for demo purposes
            localStorage.setItem('portfolio-data', JSON.stringify(dataToExport))

            setHasUnsavedChanges(false)
            alert('✅ Portfolio saved to local storage (demo mode)!\n\n📋 To implement real saving:\n- Set up a backend API\n- Use a headless CMS\n- Or modify the static files directly')
        } catch (error) {
            console.error('Error saving:', error)
            alert('❌ Error saving portfolio')
        } finally {
            setIsSaving(false)
        }
    }

    const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
        setPortfolioData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }))
        setHasUnsavedChanges(true)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-lg text-slate-600">Loading admin panel...</p>
                </div>
            </div>
        )
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
                        <Button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges || isSaving}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? 'Saving...' : 'Save Changes'}
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
                    <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 shadow-sm">
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
                                                value={portfolioData.personal.name}
                                                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="title">Professional Title</Label>
                                            <Input
                                                id="title"
                                                value={portfolioData.personal.title}
                                                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={portfolioData.personal.email}
                                                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="availability">Availability Status</Label>
                                            <Input
                                                id="availability"
                                                value={portfolioData.personal.availability_status}
                                                onChange={(e) => updatePersonalInfo('availability_status', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={portfolioData.personal.bio}
                                                onChange={(e) => updatePersonalInfo('bio', e.target.value)}
                                                className="mt-1 min-h-[120px]"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="github">GitHub URL</Label>
                                            <Input
                                                id="github"
                                                value={portfolioData.personal.github}
                                                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="linkedin">LinkedIn URL</Label>
                                            <Input
                                                id="linkedin"
                                                value={portfolioData.personal.linkedin}
                                                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                                                className="mt-1"
                                            />
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
                                <p className="text-slate-600">Manage your professional experience. Edit and reorder as needed.</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newExp: Experience = {
                                        title: "New Position",
                                        company: "Company Name",
                                        duration: "2024 - Present",
                                        location: "Location",
                                        description: "Job description...",
                                        achievements: ["Achievement 1"],
                                    }
                                    setPortfolioData(prev => ({
                                        ...prev,
                                        experience: [newExp, ...prev.experience]
                                    }))
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Experience
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {portfolioData.experience.map((exp, index) => (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="text-sm text-slate-500">#{index + 1}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setPortfolioData(prev => ({
                                                        ...prev,
                                                        experience: prev.experience.filter((_, i) => i !== index)
                                                    }))
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
                                                        setPortfolioData(prev => ({
                                                            ...prev,
                                                            experience: prev.experience.map((item, i) =>
                                                                i === index ? { ...item, title: e.target.value } : item
                                                            )
                                                        }))
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
                                                        setPortfolioData(prev => ({
                                                            ...prev,
                                                            experience: prev.experience.map((item, i) =>
                                                                i === index ? { ...item, company: e.target.value } : item
                                                            )
                                                        }))
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Duration</Label>
                                                <Input
                                                    value={exp.duration}
                                                    onChange={(e) => {
                                                        setPortfolioData(prev => ({
                                                            ...prev,
                                                            experience: prev.experience.map((item, i) =>
                                                                i === index ? { ...item, duration: e.target.value } : item
                                                            )
                                                        }))
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
                                                        setPortfolioData(prev => ({
                                                            ...prev,
                                                            experience: prev.experience.map((item, i) =>
                                                                i === index ? { ...item, location: e.target.value } : item
                                                            )
                                                        }))
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
                                                    setPortfolioData(prev => ({
                                                        ...prev,
                                                        experience: prev.experience.map((item, i) =>
                                                            i === index ? { ...item, description: e.target.value } : item
                                                        )
                                                    }))
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

                    {/* Projects Tab */}
                    <TabsContent value="projects" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Projects</CardTitle>
                                <CardDescription>Coming soon - project management</CardDescription>
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
} 