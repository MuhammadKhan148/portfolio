"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Github, ExternalLink, Star, GitFork, Eye, Settings, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface GitHubProject {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    github: string
    demo: string
    featured: boolean
    stars: number
    forks: number
    language: string | null
    updated: string
    created: string
    pushed: string
}

interface GitHubStats {
    totalRepos: number
    totalStars: number
    totalForks: number
    languages: string[]
    lastUpdated: string
}

interface EnhancedGitHubSyncProps {
    username: string
    onProjectsUpdate?: (projects: GitHubProject[]) => void
}

export function EnhancedGitHubSync({ username, onProjectsUpdate }: EnhancedGitHubSyncProps) {
    const [projects, setProjects] = useState<GitHubProject[]>([])
    const [stats, setStats] = useState<GitHubStats | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [lastSync, setLastSync] = useState<Date | null>(null)
    const [autoSyncEnabled, setAutoSyncEnabled] = useState(true)
    const [webhookConfigured, setWebhookConfigured] = useState(false)

    // Load cached data on component mount
    useEffect(() => {
        loadCachedData()
        checkWebhookStatus()
    }, [])

    // Auto-sync interval (every 10 minutes)
    useEffect(() => {
        if (!autoSyncEnabled) return

        const interval = setInterval(() => {
            syncWithGitHub(false)
        }, 10 * 60 * 1000) // 10 minutes

        return () => clearInterval(interval)
    }, [autoSyncEnabled])

    const loadCachedData = async () => {
        try {
            // Try to load cached GitHub data
            const [projectsRes, statsRes] = await Promise.all([
                fetch('/content/github-projects.json').catch(() => null),
                fetch('/content/github-stats.json').catch(() => null)
            ])

            if (projectsRes?.ok) {
                const cachedProjects = await projectsRes.json()
                setProjects(cachedProjects)
                onProjectsUpdate?.(cachedProjects)
            }

            if (statsRes?.ok) {
                const cachedStats = await statsRes.json()
                setStats(cachedStats)
                setLastSync(new Date(cachedStats.lastUpdated))
            }

            // If no cached data, perform initial sync
            if (!projectsRes?.ok && !statsRes?.ok) {
                syncWithGitHub(false)
            }
        } catch (error) {
            console.error('Error loading cached data:', error)
            syncWithGitHub(false)
        }
    }

    const checkWebhookStatus = async () => {
        try {
            // Simple check - if we have recent data, assume webhook is working
            if (stats?.lastUpdated) {
                const lastUpdate = new Date(stats.lastUpdated)
                const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60)
                setWebhookConfigured(hoursSinceUpdate < 24) // Consider configured if updated in last 24 hours
            }
        } catch (error) {
            console.error('Error checking webhook status:', error)
        }
    }

    const syncWithGitHub = async (showToast = true) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/sync-github', {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error(`Sync failed: ${response.status}`)
            }

            const data = await response.json()

            // The API returns projects and stats
            if (data.projects) {
                setProjects(data.projects)
                onProjectsUpdate?.(data.projects)
            }

            if (data.stats) {
                setStats(data.stats)
            }

            setLastSync(new Date())

            if (showToast) {
                toast.success(`✅ Synced ${data.projectsCount || 0} repositories from GitHub!`)
            }

        } catch (error) {
            console.error('Error syncing with GitHub:', error)
            if (showToast) {
                toast.error('❌ Failed to sync with GitHub. Using cached data.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const setupWebhook = async () => {
        try {
            alert('🔗 To setup automatic updates:\n\n1. Go to your GitHub repository settings\n2. Click "Webhooks" → "Add webhook"\n3. Set Payload URL to: ' + window.location.origin + '/api/github-webhook\n4. Select "Just the push event"\n5. Set Content type to "application/json"\n6. Click "Add webhook"')
            setWebhookConfigured(true)
        } catch (error) {
            console.error('Error setting up webhook:', error)
            toast.error('Failed to setup webhook')
        }
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Github className="h-5 w-5 text-emerald-600" />
                            Enhanced GitHub Integration
                        </CardTitle>
                        <CardDescription>
                            Automatically syncs all your repositories
                            {lastSync && (
                                <span className="block text-xs mt-1">
                                    Last sync: {lastSync.toLocaleTimeString()}
                                </span>
                            )}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => syncWithGitHub(true)}
                            disabled={isLoading}
                            className="gap-2"
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            {isLoading ? 'Syncing...' : 'Refresh'}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {/* Auto-sync Controls */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={autoSyncEnabled}
                                onCheckedChange={setAutoSyncEnabled}
                            />
                            <span className="text-sm font-medium">Auto-sync enabled</span>
                        </div>
                        <Badge variant={autoSyncEnabled ? "default" : "secondary"}>
                            {autoSyncEnabled ? "Active" : "Disabled"}
                        </Badge>
                    </div>

                    {/* Webhook Status */}
                    <div className={`flex items-center justify-between p-3 rounded-lg ${webhookConfigured ? 'bg-emerald-50' : 'bg-orange-50'
                        }`}>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${webhookConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'
                                }`} />
                            <span className={`text-sm font-medium ${webhookConfigured ? 'text-emerald-700' : 'text-orange-700'
                                }`}>
                                {webhookConfigured ? 'Auto-deploy on push configured' : 'Webhook not configured'}
                            </span>
                        </div>
                        {!webhookConfigured && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={setupWebhook}
                                className="gap-2"
                            >
                                <Zap className="h-4 w-4" />
                                Setup
                            </Button>
                        )}
                    </div>

                    {/* GitHub Stats */}
                    {stats && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <div className="text-2xl font-bold text-slate-900">
                                    {stats.totalRepos}
                                </div>
                                <div className="text-sm text-slate-600">Repositories</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <div className="text-2xl font-bold text-slate-900">
                                    {stats.totalStars}
                                </div>
                                <div className="text-sm text-slate-600">Total Stars</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <div className="text-2xl font-bold text-slate-900">
                                    {stats.totalForks}
                                </div>
                                <div className="text-sm text-slate-600">Total Forks</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <div className="text-2xl font-bold text-slate-900">
                                    {stats.languages.length}
                                </div>
                                <div className="text-sm text-slate-600">Languages</div>
                            </div>
                        </div>
                    )}

                    {/* Top Languages */}
                    {stats?.languages && stats.languages.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-slate-900">Top Languages</h4>
                            <div className="flex flex-wrap gap-2">
                                {stats.languages.slice(0, 8).map((language) => (
                                    <Badge key={language} variant="outline" className="text-xs">
                                        {language}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Projects Preview */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-slate-900">Recent Projects ({projects.length})</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {projects.slice(0, 5).map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-2 bg-white border rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-medium text-sm text-slate-900 truncate">
                                                {project.title}
                                            </h5>
                                            {project.featured && (
                                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-600 truncate">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {project.language && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {project.language}
                                                </Badge>
                                            )}
                                            <span className="flex items-center gap-1 text-xs text-slate-500">
                                                <Star className="h-3 w-3" />
                                                {project.stars}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sync Instructions */}
                    <div className="text-xs text-slate-500 space-y-1">
                        <p>• Repositories are automatically filtered for portfolio display</p>
                        <p>• Add topics like 'portfolio', 'project', or 'featured' for better categorization</p>
                        <p>• Webhook URL: <code className="bg-slate-100 px-1 rounded">/api/github-webhook</code></p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 