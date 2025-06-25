"use client"

import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
  Zap,
  Rocket,
  Moon,
  Sun,
  Menu,
  X,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Portfolio Data from portfolio.md
const portfolioData = {
  name: "Muhammad Abdullah Khan",
  title: "AI-Focused Software Engineer & Full-Stack Developer",
  bio: "AI-Focused Software Engineer & Full-Stack Developer specializing in emotion-aware systems, conversational AI, and scalable web applications. Creator of 24+ open-source projects with 100% ★5 freelance record.",
  email: "muhammad.mak252@gmail.com",
  github: "https://github.com/MuhammadKhan148",
  linkedin: "https://linkedin.com/in/muhammad-abdullah-khan-01271a263/",
  stats: {
    projects: "24+",
    rating: "100%",
    clients: "60+",
    experience: "6+ Years"
  }
}

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      { threshold: 0.1, ...options },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasIntersected])

  return [ref, isIntersecting, hasIntersected] as const
}

// Loading Screen Component
const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Experience</h2>
          <p className="text-slate-400">Preparing something amazing...</p>
        </div>

        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-slate-400 mt-2 text-sm">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}

export default function UltimatePortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isDark, setIsDark] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [gitHubProjects, setGitHubProjects] = useState<any[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)

  const cursorRef = useRef<HTMLDivElement>(null)
  const magneticRefs = useRef<HTMLElement[]>([])

  // Intersection observer refs
  const [heroRef, heroInView, heroHasIntersected] = useIntersectionObserver()
  const [aboutRef, aboutInView, aboutHasIntersected] = useIntersectionObserver()
  const [skillsRef, skillsInView, skillsHasIntersected] = useIntersectionObserver()
  const [projectsRef, projectsInView, projectsHasIntersected] = useIntersectionObserver()
  const [contactRef, contactInView, contactHasIntersected] = useIntersectionObserver()

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // GitHub Projects Loading
  useEffect(() => {
    loadGitHubProjects()
  }, [])

  const loadGitHubProjects = async () => {
    setIsLoadingProjects(true)
    try {
      const cachedProjectsResponse = await fetch("/content/github-projects.json").catch(() => null)
      if (cachedProjectsResponse?.ok) {
        const projects = await cachedProjectsResponse.json()
        setGitHubProjects(projects)
        setIsLoadingProjects(false)
        return
      }

      const projects = await fetchGitHubProjects()
      setGitHubProjects(projects)
    } catch (error) {
      console.error("Error loading GitHub projects:", error)
      setGitHubProjects([])
    } finally {
      setIsLoadingProjects(false)
    }
  }

  const fetchGitHubProjects = async () => {
    try {
      const response = await fetch("https://api.github.com/users/MuhammadKhan148/repos?sort=updated&per_page=50", {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })

      if (!response.ok) throw new Error("Failed to fetch GitHub repos")

      const repos = await response.json()

      const portfolioProjects = repos
        .filter((repo: any) => {
          return (
            !repo.fork &&
            !repo.private &&
            repo.description &&
            !repo.name.includes(".github") &&
            !repo.name.includes("config") &&
            repo.stargazers_count >= 0 &&
            (repo.topics?.includes("portfolio") ||
              repo.topics?.includes("project") ||
              repo.language ||
              repo.description.toLowerCase().includes("project") ||
              repo.description.toLowerCase().includes("app") ||
              repo.description.toLowerCase().includes("website"))
          )
        })
        .slice(0, 6)
        .map((repo: any) => ({
          id: repo.id.toString(),
          title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
          description: repo.description,
          image: `/placeholder.svg?height=400&width=600`,
          tech: [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 4),
          github: repo.html_url,
          demo: repo.homepage || repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        }))

      return portfolioProjects
    } catch (error) {
      console.error("Error fetching GitHub projects:", error)
      return []
    }
  }

  // Mouse tracking with performance optimization
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    setMousePosition({ x, y })

    // Magnetic effect for buttons
    magneticRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = x - centerX
        const deltaY = y - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance < 100) {
          const strength = (100 - distance) / 100
          el.style.transform = `translate(${deltaX * strength * 0.3}px, ${deltaY * strength * 0.3}px)`
        } else {
          el.style.transform = "translate(0px, 0px)"
        }
      }
    })
  }, [])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setScrollY(currentScrollY)
    setShowScrollTop(currentScrollY > 500)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("scroll", handleScroll)

      // Add magnetic effect to buttons
      const buttons = document.querySelectorAll(".magnetic")
      magneticRefs.current = Array.from(buttons) as HTMLElement[]

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isLoading, handleMouseMove, handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}
    >


      {/* Enhanced Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated mesh gradient */}
        <div
          className={`absolute inset-0 opacity-30 transition-opacity duration-500 ${isDark
            ? "bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
            : "bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40"
            }`}
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        {/* Floating particles with better performance */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-optimized opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          >
            <div
              className={`w-32 h-32 rounded-full blur-xl ${isDark
                ? i % 3 === 0
                  ? "bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                  : i % 3 === 1
                    ? "bg-gradient-to-r from-purple-400/30 to-pink-400/30"
                    : "bg-gradient-to-r from-pink-400/30 to-orange-400/30"
                : i % 3 === 0
                  ? "bg-gradient-to-r from-blue-200/50 to-purple-200/50"
                  : i % 3 === 1
                    ? "bg-gradient-to-r from-purple-200/50 to-pink-200/50"
                    : "bg-gradient-to-r from-pink-200/50 to-orange-200/50"
                }`}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-xl border-b z-40 transition-all duration-500 ${isDark ? "bg-slate-950/80 border-slate-800/50" : "bg-white/80 border-slate-200/50"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className={`text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow`}
            >
              {portfolioData.name}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Skills", "Work", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative transition-all duration-300 group magnetic ${isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 ease-out" />
                </Link>
              ))}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="magnetic rounded-full"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden border-t ${isDark ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200"
              } backdrop-blur-xl`}
          >
            <div className="px-6 py-4 space-y-4">
              {["Home", "About", "Skills", "Work", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 transition-colors ${isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start">
                {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section with Scroll Animations */}
      <section
        ref={heroRef}
        id="home"
        className="pt-24 pb-16 px-6 lg:px-8 min-h-screen flex items-center relative"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1500 ${heroHasIntersected ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                }`}
            >
              {/* Status Badge with Better Animation */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-green-500/20 rounded-full mb-8 animate-fade-in-up group hover:scale-105 transition-all duration-300 magnetic">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"
                    }`}
                >
                  Available for projects
                </span>
                <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
              </div>

              {/* Enhanced Typography */}
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                <span
                  className={`inline-block animate-slide-up opacity-0 ${isDark ? "text-white" : "text-slate-900"}`}
                  style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
                >
                  AI-Focused
                </span>
                <br />
                <span
                  className="inline-block animate-slide-up opacity-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                >
                  Software Engineer
                </span>
                <br />
                <span
                  className={`inline-block animate-slide-up opacity-0 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
                >
                  & Full-Stack Developer
                </span>
              </h1>

              <p
                className={`text-xl mb-10 leading-relaxed max-w-3xl animate-fade-in-up opacity-0 ${isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
              >
                {portfolioData.bio}
              </p>

              {/* Enhanced CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 magnetic transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className={`group magnetic transform hover:scale-105 transition-all duration-300 hover:shadow-xl ${isDark
                    ? "border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white bg-slate-900/50"
                    : "border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 bg-white/50"
                    } backdrop-blur-sm`}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Download Resume
                </Button>
              </div>

              {/* Social Links */}
              <div
                className="flex items-center gap-4 mt-12 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
              >
                <span className={`text-sm mr-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Follow me:</span>
                {[
                  { icon: Github, href: portfolioData.github, color: isDark ? "hover:text-white" : "hover:text-slate-900" },
                  { icon: Linkedin, href: portfolioData.linkedin, color: "hover:text-blue-600" },
                  { icon: Mail, href: `mailto:${portfolioData.email}`, color: "hover:text-purple-600" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`p-2 transition-all duration-300 hover:scale-125 hover:-translate-y-1 magnetic group ${isDark ? "text-slate-400" : "text-slate-500"
                      } ${social.color}`}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <social.icon className="w-5 h-5 group-hover:animate-pulse" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced Hero Image */}
            <div
              className={`relative transition-all duration-1500 delay-500 ${heroHasIntersected ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
            >
              <div className="relative group magnetic">
                <div
                  className={`relative w-full h-[600px] rounded-3xl overflow-hidden transform group-hover:scale-105 transition-all duration-700 hover:shadow-2xl ${isDark
                    ? "bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50 hover:shadow-purple-500/20"
                    : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 hover:shadow-purple-500/10"
                    }`}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=500"
                    alt={portfolioData.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Interactive Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Status Cards */}
                  <div
                    className={`absolute top-6 left-6 backdrop-blur-xl rounded-2xl p-4 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ${isDark ? "bg-slate-900/80 border border-slate-700/50" : "bg-white/80 border border-slate-200/50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                      </div>
                      <span className={`text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}>Online</span>
                    </div>
                  </div>

                  <div
                    className={`absolute bottom-6 right-6 backdrop-blur-xl rounded-2xl p-4 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100 ${isDark ? "bg-slate-900/80 border border-slate-700/50" : "bg-white/80 border border-slate-200/50"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className={`text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}>
                        5.0 Rating
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse-glow opacity-80" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section with Scroll Animations */}
      <section
        ref={skillsRef}
        id="skills"
        className={`py-20 px-6 lg:px-8 relative ${isDark ? "bg-slate-900/50" : "bg-slate-50/50"} backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${skillsHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
              Skills & Expertise
            </h2>
            <p className={`text-xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "React",
                level: 95,
                icon: "⚛️",
                color: "from-blue-500 to-cyan-500",
                description: "Frontend Framework",
              },
              {
                name: "TypeScript",
                level: 92,
                icon: "📘",
                color: "from-blue-600 to-blue-800",
                description: "Type Safety",
              },
              {
                name: "Node.js",
                level: 88,
                icon: "🟢",
                color: "from-green-500 to-green-700",
                description: "Backend Runtime",
              },
              {
                name: "Design",
                level: 94,
                icon: "🎨",
                color: "from-purple-500 to-pink-500",
                description: "UI/UX Design",
              },
            ].map((skill, index) => (
              <Card
                key={skill.name}
                className={`group relative backdrop-blur-sm border transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl magnetic overflow-hidden ${skillsHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  } ${isDark
                    ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                    : "bg-white/80 border-slate-200/50 hover:border-slate-300/50"
                  }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <CardContent className="p-6 relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-2xl mb-4 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mx-auto shadow-lg group-hover:shadow-xl`}
                  >
                    {skill.icon}
                  </div>

                  <h3
                    className={`font-bold mb-2 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 ${isDark ? "text-white" : "text-slate-900"
                      }`}
                  >
                    {skill.name}
                  </h3>

                  <p
                    className={`text-sm mb-4 text-center transition-colors ${isDark ? "text-slate-400 group-hover:text-slate-300" : "text-slate-500 group-hover:text-slate-600"
                      }`}
                  >
                    {skill.description}
                  </p>

                  <div
                    className={`relative h-2 rounded-full overflow-hidden mb-2 ${isDark ? "bg-slate-700" : "bg-slate-200"
                      }`}
                  >
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative group-hover:animate-pulse`}
                      style={{ width: skillsInView ? `${skill.level}%` : "0%" }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer" />
                    </div>
                  </div>

                  <div
                    className={`text-center text-sm font-medium transition-colors ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"
                      }`}
                  >
                    {skill.level}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section ref={projectsRef} id="work" className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${projectsHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h2 className={`text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Featured Projects</h2>
            <p className={`text-xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {isLoadingProjects ? (
              // Loading state
              Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={index}
                  className={`backdrop-blur-sm border animate-pulse ${isDark
                    ? "bg-slate-800/50 border-slate-700/50"
                    : "bg-white/80 border-slate-200/50"
                    }`}
                >
                  <div className="h-64 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600" />
                  <CardHeader>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              gitHubProjects.slice(0, 4).map((project, index) => (
                <Card
                  key={project.title}
                  className={`group relative backdrop-blur-sm border transition-all duration-700 hover:shadow-2xl magnetic overflow-hidden ${projectsHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    } ${isDark
                      ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                      : "bg-white/80 border-slate-200/50 hover:border-slate-300/50"
                    }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-80 transition-all duration-500`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex gap-4">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100 hover:rotate-12 magnetic"
                          >
                            <Github className="h-4 w-4 text-white" />
                          </Button>
                        </Link>
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-200 hover:-rotate-12 magnetic"
                          >
                            <ExternalLink className="h-4 w-4 text-white" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle
                      className={`group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 text-2xl ${isDark ? "text-white" : "text-slate-900"
                        }`}
                    >
                      {project.title}
                    </CardTitle>
                    <CardDescription
                      className={`transition-colors leading-relaxed ${isDark ? "text-slate-300 group-hover:text-slate-200" : "text-slate-600 group-hover:text-slate-700"
                        }`}
                    >
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech?.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={`hover:scale-110 transition-all duration-200 magnetic ${isDark
                            ? "border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10"
                            : "border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* GitHub Stats */}
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Github className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className={`py-20 px-6 lg:px-8 relative ${isDark
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"
          : "bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100"
          }`}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${contactHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h2
              className={`text-5xl font-bold mb-4 bg-gradient-to-r ${isDark ? "from-white via-blue-200 to-purple-200" : "from-slate-900 via-blue-700 to-purple-700"
                } bg-clip-text text-transparent`}
            >
              Let's Create Something Amazing
            </h2>
            <p className={`text-xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Ready to bring your vision to life? Let's discuss your next project.
            </p>
          </div>

          <Card
            className={`backdrop-blur-xl border relative overflow-hidden transform hover:scale-105 transition-all duration-500 ${contactHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${isDark ? "bg-slate-900/30 border-slate-800/50" : "bg-white/80 border-slate-200/50"}`}
          >
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-slate-900"}`}>
                    Get In Touch
                  </h3>
                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: "Email", value: portfolioData.email, color: "from-blue-400 to-blue-600" },
                      { icon: Github, label: "GitHub", value: "MuhammadKhan148", color: "from-green-400 to-green-600" },
                      {
                        icon: Linkedin,
                        label: "LinkedIn",
                        value: "Muhammad Abdullah Khan",
                        color: "from-purple-400 to-purple-600",
                      },
                    ].map((contact, index) => (
                      <div
                        key={contact.label}
                        className="flex items-center gap-4 group magnetic hover:translate-x-2 transition-transform duration-300"
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                        >
                          <contact.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                            {contact.label}
                          </p>
                          <p
                            className={`transition-colors ${isDark
                              ? "text-slate-300 group-hover:text-white"
                              : "text-slate-600 group-hover:text-slate-900"
                              }`}
                          >
                            {contact.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-300" : "text-slate-700"}`}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 focus:scale-105 magnetic backdrop-blur-sm ${isDark
                          ? "bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400"
                          : "bg-white/70 border border-slate-300/50 text-slate-900 placeholder-slate-500"
                          }`}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 focus:scale-105 magnetic backdrop-blur-sm ${isDark
                          ? "bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400"
                          : "bg-white/70 border border-slate-300/50 text-slate-900 placeholder-slate-500"
                          }`}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 focus:scale-105 magnetic backdrop-blur-sm ${isDark
                        ? "bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400"
                        : "bg-white/70 border border-slate-300/50 text-slate-900 placeholder-slate-500"
                        }`}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 focus:scale-105 magnetic backdrop-blur-sm resize-none ${isDark
                        ? "bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400"
                        : "bg-white/70 border border-slate-300/50 text-slate-900 placeholder-slate-500"
                        }`}
                      placeholder="Tell me about your project vision..."
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 magnetic transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 group py-3 text-lg font-medium"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span className="flex items-center justify-center">
                      Send Message
                      <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-40 rounded-full w-12 h-12 magnetic transform hover:scale-110 transition-all duration-300 ${isDark
            ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
            : "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200"
            } shadow-lg hover:shadow-xl`}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}

      {/* Footer */}
      <footer
        className={`py-12 px-6 lg:px-8 border-t ${isDark ? "bg-slate-900 text-white border-slate-800" : "bg-slate-50 text-slate-900 border-slate-200"
          }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            © 2024 Alex Rivera. Crafted with passion and precision. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-optimized {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
          66% { transform: translateY(10px) translateX(-10px) rotate(240deg); }
        }
        
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.3); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float-optimized { animation: float-optimized 20s ease-in-out infinite; }
        .animate-gradient-flow { 
          background-size: 200% 200%;
          animation: gradient-flow 3s ease infinite;
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out both; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  )
}
