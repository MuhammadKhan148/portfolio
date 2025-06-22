"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Shield } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    // Check if already authenticated on mount
    useEffect(() => {
        const stored = localStorage.getItem('admin-auth')
        if (stored === 'authenticated') {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simple password protection - in production you'd want proper authentication
        if (password === 'admin123' || password === 'portfolio2024') {
            setIsAuthenticated(true)
            localStorage.setItem('admin-auth', 'authenticated')
        } else {
            alert('Incorrect password')
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('admin-auth')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-emerald-600" />
                        </div>
                        <CardTitle className="text-2xl">Admin Access</CardTitle>
                        <p className="text-slate-600">Enter password to access the admin panel</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
                                <Lock className="mr-2 h-4 w-4" />
                                Access Admin Panel
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm text-slate-500">
                            💡 <strong>Demo passwords:</strong> admin123 or portfolio2024
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div>
            {/* Logout button */}
            <div className="absolute top-4 right-4 z-50">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="bg-white/80 backdrop-blur-sm"
                >
                    Logout
                </Button>
            </div>
            {children}
        </div>
    )
} 