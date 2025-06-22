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
            const response = await fetch('/api/admin/portfolio')
            if (response.ok) {
                const data = await response.json()
                // Restructure data to match our interface
                const restructuredData: PortfolioData = {
                    personal: {
                        name: data.name || "",
                        title: data.title || "",
                        bio: data.bio || "",
                        email: data.email || "",
                        github: data.github || "",
                        linkedin: data.linkedin || "",
                        profile_image: data.profile_image || "",
                        availability_status: data.availability_status || "",
                        resume: data.resume || "",
                    },
                    experience: data.experience || [],
                    skills: data.skills || { ai_ml: [], frontend: [], backend: [], devops: [] },
                    stats: data.stats || { projects: "", rating: "", specialty: "", type: "", approach: "", quality: "", role: "" },
                    achievements: data.achievements || { open_source: "", competitions: "", innovation: "" },
                }
                setPortfolioData(restructuredData)
            }
        } catch (error) {
            console.error('Error loading portfolio data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const loadProjects = async () => {
        try {
            const response = await fetch('/api/admin/projects')
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
            }
        } catch (error) {
            console.error('Error loading projects:', error)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Flatten personal data for saving
            const flattenedData = {
                ...portfolioData.personal,
                experience: portfolioData.experience,
                skills: portfolioData.skills,
                stats: portfolioData.stats,
                achievements: portfolioData.achievements,
            }

            // Save portfolio data
            const portfolioResponse = await fetch('/api/admin/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(flattenedData),
            })

            // Save projects data
            const projectsResponse = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects),
            })

            if (portfolioResponse.ok && projectsResponse.ok) {
                setHasUnsavedChanges(false)
                alert('✅ Portfolio saved successfully!')
            } else {
                alert('❌ Error saving portfolio')
            }
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
                    <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 shadow-sm">
                        <TabsTrigger value="personal" className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Personal</span>
                        </TabsTrigger>
                        <TabsTrigger value="experience" className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4" />
                            <span className="hidden sm:inline">Experience</span>
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
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Work Experience</CardTitle>
                                <CardDescription>Coming soon - experience management</CardDescription>
                            </CardHeader>
                        </Card>
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