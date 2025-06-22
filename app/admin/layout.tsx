"use client"

import { AuthProvider, LoginRequired, AdminHeader } from "@/components/netlify-identity"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <LoginRequired>
                <div>
                    <AdminHeader />
                    {children}
                </div>
            </LoginRequired>
        </AuthProvider>
    )
} 