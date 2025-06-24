"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    User,
    Briefcase,
    Code,
    FolderOpen,
    Github,
    MessageSquare,
    Settings,
    Save,
    Upload,
    Download,
    Trash2,
    Plus,
    Star,
    GitBranch,
    Activity,
    Zap,
    Database,
    RefreshCw,
    CheckCircle,
    XCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { EnhancedGitHubSync } from "@/components/enhanced-github-sync"

interface ProfileData {
    name: string
    title: string
    bio: string
    email: string
    location: string
    website: string
    avatar: string
    social: {
        github: string
        linkedin: string
        twitter: string
    }
}

interface WorkExperience {
    id: string
    company: string
    position: string
    duration: string
    description: string
    technologies: string[]
    featured: boolean
}

interface Skill {
    id: string
    name: string
    level: number
    category: string
    featured: boolean
}

interface Project {
    id: string
    title: string
    description: string
    technologies: string[]
    githubUrl: string
    liveUrl: string
    image: string
    featured: boolean
    status: "completed" | "in-progress" | "planned"
}

interface Testimonial {
    id: string
    name: string
    company: string
    role: string
    content: string
    avatar: string
    rating: number
}

interface SiteConfig {
    theme: "light" | "dark" | "cyberpunk"
    primaryColor: string
    showGitHubStats: boolean
    showTestimonials: boolean
    contactFormEnabled: boolean
    analyticsEnabled: boolean
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("profile")
    const [isLoading, setIsLoading] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    // Data states
    const [profile, setProfile] = useState<ProfileData>({
        name: "Muhammad Khan",
        title: "AI/ML Engineer & Full-Stack Developer",
        bio: "Passionate about creating intelligent solutions that bridge the gap between human needs and technological possibilities.",
        email: "muhammad@example.com",
        location: "San Francisco, CA",
        website: "https://muhammad-portfolio.dev",
        avatar: "/PIC.jpeg",
        social: {
            github: "muhammad-khan",
            linkedin: "muhammad-khan-dev",
            twitter: "muhammad_dev",
        },
    })

    const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
        {
            id: "1",
            company: "TechCorp AI",
            position: "Senior AI/ML Engineer",
            duration: "2022 - Present",
            description: "Leading development of conversational AI systems and machine learning pipelines.",
            technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker"],
            featured: true,
        },
        {
            id: "2",
            company: "DataFlow Solutions",
            position: "Full-Stack Developer",
            duration: "2020 - 2022",
            description: "Built scalable web applications and data visualization platforms.",
            technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Kubernetes"],
            featured: true,
        },
    ])

    const [skills, setSkills] = useState<Skill[]>([
        { id: "1", name: "Python", level: 95, category: "Programming", featured: true },
        { id: "2", name: "Machine Learning", level: 90, category: "AI/ML", featured: true },
        { id: "3", name: "React", level: 88, category: "Frontend", featured: true },
        { id: "4", name: "Node.js", level: 85, category: "Backend", featured: true },
        { id: "5", name: "TensorFlow", level: 82, category: "AI/ML", featured: false },
        { id: "6", name: "AWS", level: 80, category: "Cloud", featured: false },
    ])

    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            title: "Emotion-Aware Conversational AI",
            description: "Advanced chatbot that detects and responds to user emotions using NLP and sentiment analysis.",
            technologies: ["Python", "TensorFlow", "FastAPI", "React", "WebSocket"],
            githubUrl: "https://github.com/muhammad/emotion-ai",
            liveUrl: "https://emotion-ai.demo.com",
            image: "/placeholder.svg?height=200&width=300",
            featured: true,
            status: "completed",
        },
        {
            id: "2",
            title: "AI Movie Recommender",
            description: "Intelligent movie recommendation system using collaborative filtering and deep learning.",
            technologies: ["Python", "Scikit-learn", "Flask", "Vue.js", "MongoDB"],
            githubUrl: "https://github.com/muhammad/movie-ai",
            liveUrl: "https://movie-ai.demo.com",
            image: "/placeholder.svg?height=200&width=300",
            featured: true,
            status: "completed",
        },
    ])

    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: "1",
            name: "Sarah Johnson",
            company: "TechCorp AI",
            role: "CTO",
            content: "Muhammad is an exceptional AI engineer who consistently delivers innovative solutions.",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
        },
    ])

    const [siteConfig, setSiteConfig] = useState<SiteConfig>({
        theme: "cyberpunk",
        primaryColor: "#00D4FF",
        showGitHubStats: true,
        showTestimonials: true,
        contactFormEnabled: true,
        analyticsEnabled: true,
    })

    // GitHub sync status
    const [githubSyncStatus, setGitHubSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")
    const [lastGitHubSync, setLastGitHubSync] = useState<Date | null>(null)

    // Auto-save functionality
    useEffect(() => {
        const autoSave = setTimeout(() => {
            if (hasUnsavedChanges) {
                handleSaveDraft()
            }
        }, 30000) // Auto-save every 30 seconds

        return () => clearTimeout(autoSave)
    }, [hasUnsavedChanges])

    const handleSaveDraft = async () => {
        setIsLoading(true)
        try {
            const draftData = {
                profile,
                workExperience,
                skills,
                projects,
                testimonials,
                siteConfig,
                lastModified: new Date().toISOString(),
            }

            localStorage.setItem("portfolio-draft", JSON.stringify(draftData))
            setLastSaved(new Date())
            setHasUnsavedChanges(false)
            toast({
                title: "Draft Saved",
                description: "Your changes have been saved locally.",
            })
        } catch (error) {
            toast({
                title: "Save Failed",
                description: "Failed to save draft. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handlePublish = async () => {
        setIsLoading(true)
        try {
            // Save to GitHub via the sync component
            setGitHubSyncStatus("syncing")

            const portfolioData = {
                profile,
                workExperience,
                skills,
                projects,
                testimonials,
                siteConfig,
                publishedAt: new Date().toISOString(),
            }

            // This would trigger the GitHub sync
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

            setGitHubSyncStatus("success")
            setLastGitHubSync(new Date())
            setHasUnsavedChanges(false)

            toast({
                title: "Published Successfully",
                description: "Your portfolio has been published and synced to GitHub.",
            })
        } catch (error) {
            setGitHubSyncStatus("error")
            toast({
                title: "Publish Failed",
                description: "Failed to publish portfolio. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleExportData = () => {
        const exportData = {
            profile,
            workExperience,
            skills,
            projects,
            testimonials,
            siteConfig,
            exportedAt: new Date().toISOString(),
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
            title: "Data Exported",
            description: "Portfolio data has been exported successfully.",
        })
    }

    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target?.result as string)

                if (importedData.profile) setProfile(importedData.profile)
                if (importedData.workExperience) setWorkExperience(importedData.workExperience)
                if (importedData.skills) setSkills(importedData.skills)
                if (importedData.projects) setProjects(importedData.projects)
                if (importedData.testimonials) setTestimonials(importedData.testimonials)
                if (importedData.siteConfig) setSiteConfig(importedData.siteConfig)

                setHasUnsavedChanges(true)
                toast({
                    title: "Data Imported",
                    description: "Portfolio data has been imported successfully.",
                })
            } catch (error) {
                toast({
                    title: "Import Failed",
                    description: "Failed to import data. Please check the file format.",
                    variant: "destructive",
                })
            }
        }
        reader.readAsText(file)
    }

    const addWorkExperience = () => {
        const newWork: WorkExperience = {
            id: Date.now().toString(),
            company: "",
            position: "",
            duration: "",
            description: "",
            technologies: [],
            featured: false,
        }
        setWorkExperience([...workExperience, newWork])
        setHasUnsavedChanges(true)
    }

    const updateWorkExperience = (id: string, updates: Partial<WorkExperience>) => {
        setWorkExperience(workExperience.map((work) => (work.id === id ? { ...work, ...updates } : work)))
        setHasUnsavedChanges(true)
    }

    const deleteWorkExperience = (id: string) => {
        setWorkExperience(workExperience.filter((work) => work.id !== id))
        setHasUnsavedChanges(true)
    }

    const addSkill = () => {
        const newSkill: Skill = {
            id: Date.now().toString(),
            name: "",
            level: 50,
            category: "Programming",
            featured: false,
        }
        setSkills([...skills, newSkill])
        setHasUnsavedChanges(true)
    }

    const updateSkill = (id: string, updates: Partial<Skill>) => {
        setSkills(skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)))
        setHasUnsavedChanges(true)
    }

    const deleteSkill = (id: string) => {
        setSkills(skills.filter((skill) => skill.id !== id))
        setHasUnsavedChanges(true)
    }

    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: "",
            description: "",
            technologies: [],
            githubUrl: "",
            liveUrl: "",
            image: "/placeholder.svg?height=200&width=300",
            featured: false,
            status: "planned",
        }
        setProjects([...projects, newProject])
        setHasUnsavedChanges(true)
    }

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(projects.map((project) => (project.id === id ? { ...project, ...updates } : project)))
        setHasUnsavedChanges(true)
    }

    const deleteProject = (id: string) => {
        setProjects(projects.filter((project) => project.id !== id))
        setHasUnsavedChanges(true)
    }

    const addTestimonial = () => {
        const newTestimonial: Testimonial = {
            id: Date.now().toString(),
            name: "",
            company: "",
            role: "",
            content: "",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
        }
        setTestimonials([...testimonials, newTestimonial])
        setHasUnsavedChanges(true)
    }

    const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
        setTestimonials(
            testimonials.map((testimonial) => (testimonial.id === id ? { ...testimonial, ...updates } : testimonial)),
        )
        setHasUnsavedChanges(true)
    }

    const deleteTestimonial = (id: string) => {
        setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id))
        setHasUnsavedChanges(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Cyberpunk Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_50%)]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Portfolio Admin
                            </h1>
                            <p className="text-slate-400 mt-2">Manage your cyberpunk portfolio</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Status Indicators */}
                            <div className="flex items-center gap-2">
                                {githubSyncStatus === "syncing" && (
                                    <div className="flex items-center gap-2 text-cyan-400">
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        <span className="text-sm">Syncing...</span>
                                    </div>
                                )}
                                {githubSyncStatus === "success" && (
                                    <div className="flex items-center gap-2 text-green-400">
                                        <CheckCircle className="h-4 w-4" />
                                        <span className="text-sm">Synced</span>
                                    </div>
                                )}
                                {githubSyncStatus === "error" && (
                                    <div className="flex items-center gap-2 text-red-400">
                                        <XCircle className="h-4 w-4" />
                                        <span className="text-sm">Sync Failed</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSaveDraft}
                                    disabled={isLoading}
                                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Draft
                                </Button>

                                <Button
                                    onClick={handlePublish}
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                                >
                                    <Zap className="h-4 w-4 mr-2" />
                                    Publish Live
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-2 h-2 rounded-full ${hasUnsavedChanges ? "bg-yellow-400 animate-pulse" : "bg-green-400"}`}
                                    />
                                    <span className="text-sm text-slate-300">
                                        {hasUnsavedChanges ? "Unsaved Changes" : "All Changes Saved"}
                                    </span>
                                </div>

                                {lastSaved && (
                                    <div className="text-sm text-slate-400">Last saved: {lastSaved.toLocaleTimeString()}</div>
                                )}

                                {lastGitHubSync && (
                                    <div className="text-sm text-slate-400">Last sync: {lastGitHubSync.toLocaleTimeString()}</div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleExportData}
                                    className="text-slate-400 hover:text-cyan-400"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => document.getElementById("import-file")?.click()}
                                    className="text-slate-400 hover:text-cyan-400"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Import
                                </Button>
                                <input id="import-file" type="file" accept=".json" onChange={handleImportData} className="hidden" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                        <TabsTrigger
                            value="profile"
                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                        >
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="experience"
                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                        >
                            <Briefcase className="h-4 w-4 mr-2" />
                            Experience
                        </TabsTrigger>
                        <TabsTrigger
                            value="skills"
                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                        >
                            <Code className="h-4 w-4 mr-2" />
                            Skills
                        </TabsTrigger>
                        <TabsTrigger
                            value="projects"
                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                        >
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Projects
                        </TabsTrigger>
                        <TabsTrigger
                            value="testimonials"
                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Testimonials
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                        >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-cyan-400">Profile Information</CardTitle>
                                <CardDescription className="text-slate-400">
                                    Update your personal information and social links
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24 border-2 border-cyan-500/50">
                                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                                        <AvatarFallback className="bg-slate-700 text-cyan-400">
                                            {profile.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Avatar
                                        </Button>
                                        <p className="text-sm text-slate-400">JPG, PNG or GIF (max 2MB)</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-slate-300">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={profile.name}
                                            onChange={(e) => {
                                                setProfile({ ...profile, name: e.target.value })
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-slate-300">
                                            Professional Title
                                        </Label>
                                        <Input
                                            id="title"
                                            value={profile.title}
                                            onChange={(e) => {
                                                setProfile({ ...profile, title: e.target.value })
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-300">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => {
                                                setProfile({ ...profile, email: e.target.value })
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-slate-300">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            value={profile.location}
                                            onChange={(e) => {
                                                setProfile({ ...profile, location: e.target.value })
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="website" className="text-slate-300">
                                            Website
                                        </Label>
                                        <Input
                                            id="website"
                                            type="url"
                                            value={profile.website}
                                            onChange={(e) => {
                                                setProfile({ ...profile, website: e.target.value })
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-slate-300">
                                        Bio
                                    </Label>
                                    <Textarea
                                        id="bio"
                                        value={profile.bio}
                                        onChange={(e) => {
                                            setProfile({ ...profile, bio: e.target.value })
                                            setHasUnsavedChanges(true)
                                        }}
                                        rows={4}
                                        className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                    />
                                </div>

                                <Separator className="bg-slate-700" />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-cyan-400">Social Links</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="github" className="text-slate-300">
                                                GitHub
                                            </Label>
                                            <Input
                                                id="github"
                                                value={profile.social.github}
                                                onChange={(e) => {
                                                    setProfile({
                                                        ...profile,
                                                        social: { ...profile.social, github: e.target.value },
                                                    })
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                placeholder="username"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="linkedin" className="text-slate-300">
                                                LinkedIn
                                            </Label>
                                            <Input
                                                id="linkedin"
                                                value={profile.social.linkedin}
                                                onChange={(e) => {
                                                    setProfile({
                                                        ...profile,
                                                        social: { ...profile.social, linkedin: e.target.value },
                                                    })
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                placeholder="username"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="twitter" className="text-slate-300">
                                                Twitter
                                            </Label>
                                            <Input
                                                id="twitter"
                                                value={profile.social.twitter}
                                                onChange={(e) => {
                                                    setProfile({
                                                        ...profile,
                                                        social: { ...profile.social, twitter: e.target.value },
                                                    })
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                placeholder="@username"
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
                                <h2 className="text-2xl font-bold text-cyan-400">Work Experience</h2>
                                <p className="text-slate-400">Manage your professional experience</p>
                            </div>
                            <Button onClick={addWorkExperience} className="bg-gradient-to-r from-cyan-500 to-purple-500">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Experience
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {workExperience.map((work, index) => (
                                <Card key={work.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-cyan-400">Experience #{index + 1}</CardTitle>
                                                {work.featured && (
                                                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={work.featured}
                                                    onCheckedChange={(checked) => updateWorkExperience(work.id, { featured: checked })}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteWorkExperience(work.id)}
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Company</Label>
                                                <Input
                                                    value={work.company}
                                                    onChange={(e) => updateWorkExperience(work.id, { company: e.target.value })}
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Position</Label>
                                                <Input
                                                    value={work.position}
                                                    onChange={(e) => updateWorkExperience(work.id, { position: e.target.value })}
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Duration</Label>
                                            <Input
                                                value={work.duration}
                                                onChange={(e) => updateWorkExperience(work.id, { duration: e.target.value })}
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                placeholder="e.g., 2022 - Present"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Description</Label>
                                            <Textarea
                                                value={work.description}
                                                onChange={(e) => updateWorkExperience(work.id, { description: e.target.value })}
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Technologies</Label>
                                            <Input
                                                value={work.technologies.join(", ")}
                                                onChange={(e) =>
                                                    updateWorkExperience(work.id, {
                                                        technologies: e.target.value
                                                            .split(",")
                                                            .map((t) => t.trim())
                                                            .filter(Boolean),
                                                    })
                                                }
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                placeholder="React, Node.js, Python, etc."
                                            />
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {work.technologies.map((tech, techIndex) => (
                                                    <Badge key={techIndex} variant="secondary" className="bg-slate-700 text-slate-300">
                                                        {tech}
                                                    </Badge>
                                                ))}
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
                                <h2 className="text-2xl font-bold text-cyan-400">Skills & Technologies</h2>
                                <p className="text-slate-400">Manage your technical skills and proficiency levels</p>
                            </div>
                            <Button onClick={addSkill} className="bg-gradient-to-r from-cyan-500 to-purple-500">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Skill
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <Card key={skill.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                {skill.featured && (
                                                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={skill.featured}
                                                    onCheckedChange={(checked) => updateSkill(skill.id, { featured: checked })}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteSkill(skill.id)}
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-slate-300">Skill Name</Label>
                                                    <Input
                                                        value={skill.name}
                                                        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                                                        className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-slate-300">Category</Label>
                                                    <Select
                                                        value={skill.category}
                                                        onValueChange={(value) => updateSkill(skill.id, { category: value })}
                                                    >
                                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-slate-800 border-slate-700">
                                                            <SelectItem value="Programming">Programming</SelectItem>
                                                            <SelectItem value="Frontend">Frontend</SelectItem>
                                                            <SelectItem value="Backend">Backend</SelectItem>
                                                            <SelectItem value="AI/ML">AI/ML</SelectItem>
                                                            <SelectItem value="Cloud">Cloud</SelectItem>
                                                            <SelectItem value="Database">Database</SelectItem>
                                                            <SelectItem value="DevOps">DevOps</SelectItem>
                                                            <SelectItem value="Mobile">Mobile</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-slate-300">Proficiency Level</Label>
                                                    <span className="text-cyan-400 font-mono">{skill.level}%</span>
                                                </div>
                                                <div className="relative">
                                                    <Progress value={skill.level} className="h-3 bg-slate-700" />
                                                    <div
                                                        className="absolute top-0 left-0 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
                                                        style={{ width: `${skill.level}%` }}
                                                    />
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={skill.level}
                                                    onChange={(e) => updateSkill(skill.id, { level: Number.parseInt(e.target.value) })}
                                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                                                />
                                            </div>
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
                                <h2 className="text-2xl font-bold text-cyan-400">Projects Portfolio</h2>
                                <p className="text-slate-400">Showcase your best work and projects</p>
                            </div>
                            <Button onClick={addProject} className="bg-gradient-to-r from-cyan-500 to-purple-500">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Project
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {projects.map((project) => (
                                <Card key={project.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-cyan-400">{project.title || "New Project"}</CardTitle>
                                                {project.featured && (
                                                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Featured
                                                    </Badge>
                                                )}
                                                <Badge
                                                    className={`${project.status === "completed"
                                                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                                                            : project.status === "in-progress"
                                                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                                                : "bg-slate-500/20 text-slate-400 border-slate-500/50"
                                                        }`}
                                                >
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={project.featured}
                                                    onCheckedChange={(checked) => updateProject(project.id, { featured: checked })}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteProject(project.id)}
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="aspect-video bg-slate-700/50 rounded-lg overflow-hidden">
                                            <img
                                                src={project.image || "/placeholder.svg"}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Project Title</Label>
                                                <Input
                                                    value={project.title}
                                                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Description</Label>
                                                <Textarea
                                                    value={project.description}
                                                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-slate-300">GitHub URL</Label>
                                                    <Input
                                                        value={project.githubUrl}
                                                        onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                                                        className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                        placeholder="https://github.com/..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-slate-300">Live URL</Label>
                                                    <Input
                                                        value={project.liveUrl}
                                                        onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                                                        className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Status</Label>
                                                <Select
                                                    value={project.status}
                                                    onValueChange={(value: "completed" | "in-progress" | "planned") =>
                                                        updateProject(project.id, { status: value })
                                                    }
                                                >
                                                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-800 border-slate-700">
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                                        <SelectItem value="planned">Planned</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Technologies</Label>
                                                <Input
                                                    value={project.technologies.join(", ")}
                                                    onChange={(e) =>
                                                        updateProject(project.id, {
                                                            technologies: e.target.value
                                                                .split(",")
                                                                .map((t) => t.trim())
                                                                .filter(Boolean),
                                                        })
                                                    }
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                    placeholder="React, Node.js, Python, etc."
                                                />
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <Badge key={techIndex} variant="secondary" className="bg-slate-700 text-slate-300">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Testimonials Tab */}
                    <TabsContent value="testimonials" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-cyan-400">Client Testimonials</h2>
                                <p className="text-slate-400">Manage client feedback and recommendations</p>
                            </div>
                            <Button onClick={addTestimonial} className="bg-gradient-to-r from-cyan-500 to-purple-500">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Testimonial
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-cyan-500/50">
                                                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                                                    <AvatarFallback className="bg-slate-700 text-cyan-400">
                                                        {testimonial.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-cyan-400 text-lg">
                                                        {testimonial.name || "New Testimonial"}
                                                    </CardTitle>
                                                    <p className="text-slate-400 text-sm">
                                                        {testimonial.role} at {testimonial.company}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteTestimonial(testimonial.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Name</Label>
                                                <Input
                                                    value={testimonial.name}
                                                    onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-slate-300">Company</Label>
                                                <Input
                                                    value={testimonial.company}
                                                    onChange={(e) => updateTestimonial(testimonial.id, { company: e.target.value })}
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Role</Label>
                                            <Input
                                                value={testimonial.role}
                                                onChange={(e) => updateTestimonial(testimonial.id, { role: e.target.value })}
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Testimonial</Label>
                                            <Textarea
                                                value={testimonial.content}
                                                onChange={(e) => updateTestimonial(testimonial.id, { content: e.target.value })}
                                                className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                rows={4}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Rating</Label>
                                            <div className="flex items-center gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        onClick={() => updateTestimonial(testimonial.id, { rating: star })}
                                                        className={`text-2xl ${star <= testimonial.rating ? "text-yellow-400" : "text-slate-600"
                                                            } hover:text-yellow-300 transition-colors`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                                <span className="text-slate-400 ml-2">{testimonial.rating}/5</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Site Configuration */}
                            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                                <CardHeader>
                                    <CardTitle className="text-cyan-400 flex items-center gap-2">
                                        <Settings className="h-5 w-5" />
                                        Site Configuration
                                    </CardTitle>
                                    <CardDescription className="text-slate-400">
                                        Configure your portfolio appearance and features
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-slate-300">Theme</Label>
                                                <p className="text-sm text-slate-400">Choose your portfolio theme</p>
                                            </div>
                                            <Select
                                                value={siteConfig.theme}
                                                onValueChange={(value: "light" | "dark" | "cyberpunk") => {
                                                    setSiteConfig({ ...siteConfig, theme: value })
                                                    setHasUnsavedChanges(true)
                                                }}
                                            >
                                                <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-800 border-slate-700">
                                                    <SelectItem value="light">Light</SelectItem>
                                                    <SelectItem value="dark">Dark</SelectItem>
                                                    <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Primary Color</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="color"
                                                    value={siteConfig.primaryColor}
                                                    onChange={(e) => {
                                                        setSiteConfig({ ...siteConfig, primaryColor: e.target.value })
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="w-16 h-10 bg-slate-700/50 border-slate-600"
                                                />
                                                <Input
                                                    value={siteConfig.primaryColor}
                                                    onChange={(e) => {
                                                        setSiteConfig({ ...siteConfig, primaryColor: e.target.value })
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="bg-slate-700" />

                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-cyan-400">Features</h4>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-slate-300">Show GitHub Stats</Label>
                                                <p className="text-sm text-slate-400">Display GitHub statistics on homepage</p>
                                            </div>
                                            <Switch
                                                checked={siteConfig.showGitHubStats}
                                                onCheckedChange={(checked) => {
                                                    setSiteConfig({ ...siteConfig, showGitHubStats: checked })
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-slate-300">Show Testimonials</Label>
                                                <p className="text-sm text-slate-400">Display client testimonials section</p>
                                            </div>
                                            <Switch
                                                checked={siteConfig.showTestimonials}
                                                onCheckedChange={(checked) => {
                                                    setSiteConfig({ ...siteConfig, showTestimonials: checked })
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-slate-300">Contact Form</Label>
                                                <p className="text-sm text-slate-400">Enable contact form functionality</p>
                                            </div>
                                            <Switch
                                                checked={siteConfig.contactFormEnabled}
                                                onCheckedChange={(checked) => {
                                                    setSiteConfig({ ...siteConfig, contactFormEnabled: checked })
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-slate-300">Analytics</Label>
                                                <p className="text-sm text-slate-400">Enable visitor analytics tracking</p>
                                            </div>
                                            <Switch
                                                checked={siteConfig.analyticsEnabled}
                                                onCheckedChange={(checked) => {
                                                    setSiteConfig({ ...siteConfig, analyticsEnabled: checked })
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* GitHub Integration */}
                            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                                <CardHeader>
                                    <CardTitle className="text-cyan-400 flex items-center gap-2">
                                        <Github className="h-5 w-5" />
                                        GitHub Integration
                                    </CardTitle>
                                    <CardDescription className="text-slate-400">
                                        Manage GitHub synchronization and automation
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <EnhancedGitHubSync />
                                </CardContent>
                            </Card>
                        </div>

                        {/* System Status */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-cyan-400 flex items-center gap-2">
                                    <Activity className="h-5 w-5" />
                                    System Status
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Monitor your portfolio's performance and health
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            <span className="text-slate-300 font-medium">Portfolio Status</span>
                                        </div>
                                        <p className="text-2xl font-bold text-green-400">Online</p>
                                        <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleTimeString()}</p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <GitBranch className="h-4 w-4 text-cyan-400" />
                                            <span className="text-slate-300 font-medium">GitHub Sync</span>
                                        </div>
                                        <p className="text-2xl font-bold text-cyan-400">
                                            {githubSyncStatus === "success"
                                                ? "Synced"
                                                : githubSyncStatus === "syncing"
                                                    ? "Syncing..."
                                                    : githubSyncStatus === "error"
                                                        ? "Error"
                                                        : "Ready"}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            {lastGitHubSync ? `Last sync: ${lastGitHubSync.toLocaleTimeString()}` : "Never synced"}
                                        </p>
                                    </div>

                                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Database className="h-4 w-4 text-purple-400" />
                                            <span className="text-slate-300 font-medium">Data Status</span>
                                        </div>
                                        <p className="text-2xl font-bold text-purple-400">{hasUnsavedChanges ? "Modified" : "Saved"}</p>
                                        <p className="text-sm text-slate-400">
                                            {lastSaved ? `Saved: ${lastSaved.toLocaleTimeString()}` : "No changes"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
