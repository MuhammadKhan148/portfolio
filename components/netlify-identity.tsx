"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, LogOut, UserCheck, Mail } from "lucide-react"

// Extend the Window interface to include netlifyIdentity
declare global {
    interface Window {
        netlifyIdentity: any
    }
}

interface User {
    id: string
    email: string
    user_metadata: any
    app_metadata: any
    role?: string
}

interface AuthContextType {
    user: User | null
    login: () => void
    logout: () => void
    isLoading: boolean
    isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Load Netlify Identity script
        const script = document.createElement('script')
        script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
        script.async = true
        document.head.appendChild(script)

        script.onload = () => {
            if (window.netlifyIdentity) {
                window.netlifyIdentity.on('init', (user: User) => {
                    setUser(user)
                    setIsLoading(false)
                })

                window.netlifyIdentity.on('login', (user: User) => {
                    setUser(user)
                    window.netlifyIdentity.close()
                })

                window.netlifyIdentity.on('logout', () => {
                    setUser(null)
                })

                // Initialize Netlify Identity
                window.netlifyIdentity.init({
                    container: '#netlify-modal'
                })
            }
        }

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script)
            }
        }
    }, [])

    const login = () => {
        if (window.netlifyIdentity) {
            window.netlifyIdentity.open()
        }
    }

    const logout = () => {
        if (window.netlifyIdentity) {
            window.netlifyIdentity.logout()
        }
    }

    // Check if user has admin role
    const isAdmin = user?.app_metadata?.roles?.includes('admin') || false

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAdmin }}>
            {children}
            <div id="netlify-modal"></div>
        </AuthContext.Provider>
    )
}

export const LoginRequired = ({ children }: { children: React.ReactNode }) => {
    const { user, login, isLoading, isAdmin } = useAuth()

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-emerald-600" />
                        </div>
                        <CardTitle className="text-2xl">Admin Access Required</CardTitle>
                        <p className="text-slate-600">Please sign in with your invited account to access the admin panel</p>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={login} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Sign In with Netlify Identity
                        </Button>
                        <div className="mt-4 text-center text-sm text-slate-500">
                            <Mail className="inline mr-1 h-3 w-3" />
                            Only invited users can access this area
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-red-600" />
                        </div>
                        <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
                        <p className="text-slate-600">You don't have admin permissions. Please contact the site administrator.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center text-sm text-slate-500 mb-4">
                            Signed in as: {user.email}
                        </div>
                        <Button onClick={logout} variant="outline" className="w-full">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return <>{children}</>
}

export const AdminHeader = () => {
    const { user, logout } = useAuth()

    if (!user) return null

    return (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <div className="text-sm text-slate-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md">
                {user.email}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="bg-white/80 backdrop-blur-sm"
            >
                <LogOut className="mr-1 h-3 w-3" />
                Sign Out
            </Button>
        </div>
    )
} 