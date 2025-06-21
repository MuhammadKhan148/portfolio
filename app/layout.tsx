import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muhammad Abdullah Khan - AI-Focused Software Engineer',
  description: 'Portfolio of Muhammad Abdullah Khan - AI-Focused Software Engineer & Full-Stack Developer specializing in emotion-aware systems, conversational AI, and scalable web applications. 24+ open-source projects.',
  keywords: ['Muhammad Abdullah Khan', 'AI Engineer', 'Software Engineer', 'Full Stack Developer', 'Machine Learning', 'React', 'Node.js', 'Python', 'TensorFlow', 'Portfolio'],
  authors: [{ name: 'Muhammad Abdullah Khan', url: 'https://github.com/MuhammadKhan148' }],
  creator: 'Muhammad Abdullah Khan',
  openGraph: {
    title: 'Muhammad Abdullah Khan - AI-Focused Software Engineer',
    description: 'AI-Focused Software Engineer & Full-Stack Developer with 24+ open-source projects',
    url: 'https://muhammad-abdullah-khan.netlify.app',
    siteName: 'Muhammad Abdullah Khan Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Abdullah Khan - AI-Focused Software Engineer',
    description: 'AI-Focused Software Engineer & Full-Stack Developer with 24+ open-source projects',
    creator: '@MuhammadKhan148',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
