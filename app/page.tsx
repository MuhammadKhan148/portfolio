"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Database,
  Globe,
  Star,
  Calendar,
  MapPin,
  Award,
  Zap,
  Brain,
  ArrowRight,
  Sparkles,
  Rocket,
  Target,
  Activity,
  Terminal,
  Moon,
  Sun,
  Menu,
  X,
  ChevronUp,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"

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

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [gitHubProjects, setGitHubProjects] = useState<any[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDark, setIsDark] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const magneticRefs = useRef<HTMLElement[]>([])

  // Intersection observer refs
  const [heroSectionRef, heroInView, heroHasIntersected] = useIntersectionObserver()
  const [aboutSectionRef, aboutInView, aboutHasIntersected] = useIntersectionObserver()
  const [skillsSectionRef, skillsInView, skillsHasIntersected] = useIntersectionObserver()
  const [projectsSectionRef, projectsInView, projectsHasIntersected] = useIntersectionObserver()
  const [contactSectionRef, contactInView, contactHasIntersected] = useIntersectionObserver()

  // Initialize component
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    loadGitHubProjects()
  }, [])

  // Enhanced mouse tracking with magnetic effects
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
          el.style.transform = `translate(${deltaX * strength * 0.15}px, ${deltaY * strength * 0.15}px)`
        } else {
          el.style.transform = "translate(0px, 0px)"
        }
      }
    })
  }, [])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setIsScrolled(currentScrollY > 50)
    setScrollY(currentScrollY)
    setShowScrollTop(currentScrollY > 500)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll(".magnetic")
    magneticRefs.current = Array.from(buttons) as HTMLElement[]

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleMouseMove, handleScroll])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Matrix rain effect
  useEffect(() => {
    const createMatrixRain = () => {
      const container = document.querySelector(".matrix-rain")
      if (!container) return

      const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

      for (let i = 0; i < 50; i++) {
        const char = document.createElement("div")
        char.className = "matrix-char"
        char.textContent = chars[Math.floor(Math.random() * chars.length)]
        char.style.left = Math.random() * 100 + "%"
        char.style.animationDelay = Math.random() * 3 + "s"
        char.style.animationDuration = Math.random() * 3 + 2 + "s"
        container.appendChild(char)
      }
    }

    const timer = setTimeout(createMatrixRain, 1000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

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
          title: repo.name
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          description: repo.description || "A GitHub project",
          image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
          tags: [...(repo.language ? [repo.language] : []), ...(repo.topics?.slice(0, 4) || [])].filter(Boolean),
          github: repo.html_url,
          demo: repo.homepage || repo.html_url,
          featured: repo.stargazers_count > 2 || repo.topics?.includes("featured"),
          stars: repo.stargazers_count,
          language: repo.language,
          updated: repo.updated_at,
        }))

      return portfolioProjects
    } catch (error) {
      console.error("Error fetching GitHub projects:", error)
      return [
        {
          id: "1",
          title: "AI Movie Recommender",
          description: "Intelligent movie recommendation system using machine learning algorithms",
          image: "/projects/ai-movie-recommender.jpg",
          tags: ["Python", "Machine Learning", "Flask", "React"],
          github: "https://github.com/MuhammadKhan148/ai-movie-recommender",
          demo: "https://ai-movie-recommender.netlify.app",
          featured: true,
        },
        {
          id: "2",
          title: "Emotion-Aware Conversational AI",
          description: "Advanced chatbot that recognizes and responds to human emotions",
          image: "/projects/emotion-ai.jpg",
          tags: ["Python", "NLP", "OpenAI", "Emotion Recognition"],
          github: "https://github.com/MuhammadKhan148/emotion-aware-ai",
          demo: "https://emotion-ai-chat.netlify.app",
          featured: true,
        },
      ]
    }
  }

  const skillsData = [
    {
      icon: Brain,
      title: "AI/ML",
      color: "cyber-purple",
      skills: [
        { name: "Python", level: 95 },
        { name: "TensorFlow", level: 90 },
        { name: "PyTorch", level: 88 },
        { name: "Sentiment Analysis", level: 92 },
        { name: "Recommender Systems", level: 94 },
        { name: "Machine Learning", level: 93 },
      ],
    },
    {
      icon: Code,
      title: "Frontend",
      color: "cyber-blue",
      skills: [
        { name: "React", level: 96 },
        { name: "Next.js", level: 94 },
        { name: "TypeScript", level: 91 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Flutter", level: 87 },
        { name: "PWA", level: 89 },
      ],
    },
    {
      icon: Database,
      title: "Backend & Data",
      color: "cyber-green",
      skills: [
        { name: "Node.js", level: 93 },
        { name: "MongoDB", level: 90 },
        { name: "PostgreSQL", level: 88 },
        { name: "Firebase", level: 92 },
        { name: "REST APIs", level: 95 },
        { name: "GraphQL", level: 85 },
      ],
    },
    {
      icon: Globe,
      title: "DevOps & Tools",
      color: "cyber-orange",
      skills: [
        { name: "Docker", level: 87 },
        { name: "Kubernetes", level: 82 },
        { name: "GitHub Actions", level: 91 },
        { name: "AWS", level: 86 },
        { name: "CI/CD", level: 89 },
        { name: "Git", level: 97 },
      ],
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
        }`}
    >
      {/* Enhanced Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 opacity-30 transition-opacity duration-500 ${isDark
            ? "bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
            : "bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40"
            }`}
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        {/* Matrix Rain Effect */}
        <div className="matrix-rain absolute inset-0 z-0 opacity-20" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <div
              className={`w-24 h-24 rounded-full blur-xl ${isDark
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
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MAK.DEV
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative transition-all duration-300 group magnetic ${isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 ease-out" />
                </Link>
              ))}

              <Button variant="ghost" size="icon" onClick={toggleTheme} className="magnetic rounded-full">
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
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
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
              <Button variant="outline" onClick={toggleTheme} className="w-full">
                {isDark ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section
        ref={heroSectionRef}
        className="pt-24 pb-16 px-6 lg:px-8 min-h-screen flex items-center relative"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Holographic Orbs */}
        <div className="absolute inset-0">
          <div
            className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-cyber-float ${isDark ? "bg-blue-400/20" : "bg-blue-200/30"
              }`}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
          <div
            className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-cyber-float ${isDark ? "bg-purple-400/20" : "bg-purple-200/30"
              }`}
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              animationDelay: "2s",
            }}
          />
          <div
            className={`absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl animate-cyber-float ${isDark ? "bg-pink-400/20" : "bg-pink-200/30"
              }`}
            style={{
              transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
              animationDelay: "4s",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-2000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              {/* Status Badge */}
              <div className={`inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl border rounded-full mb-8 group hover:scale-105 transition-all duration-300 ${isDark
                ? "bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-700/50"
                : "bg-gradient-to-r from-white/50 to-slate-100/50 border-slate-300/50"
                }`}>
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className={`text-sm font-medium transition-colors ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"
                  }`}>Available for hire</span>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
              </div>

              {/* Main Heading with Advanced Typography */}
              <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="inline-block animate-text-reveal-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                  <span className={`bg-gradient-to-r bg-clip-text text-transparent ${isDark ? "from-white to-slate-300" : "from-slate-900 to-slate-600"
                    }`}>MUHAMMAD</span>
                </span>
                <br />
                <span className="inline-block animate-text-reveal-up opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow">ABDULLAH</span>
                </span>
                <br />
                <span className="inline-block animate-text-reveal-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                  <span className={isDark ? "text-slate-400" : "text-slate-500"}>KHAN</span>
                </span>
              </h1>

              {/* Enhanced Description */}
              <div className="space-y-4">
                <p className={`text-xl md:text-2xl font-medium animate-fade-in-up opacity-0 ${isDark ? "text-slate-300" : "text-slate-600"
                  }`} style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                  <span className="text-blue-400 font-bold">&gt; AI/ML ENGINEER</span> &
                  <span className="text-purple-400 font-bold"> FULL-STACK DEVELOPER</span>
                </p>
                <p className={`text-lg leading-relaxed max-w-2xl animate-fade-in-up opacity-0 ${isDark ? "text-slate-400" : "text-slate-600"
                  }`} style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
                  Specializing in <span className="text-blue-400 font-semibold">emotion-aware systems</span>,
                  conversational AI, and scalable web applications. Creator of
                  <span className="text-green-400 font-semibold"> 24+ open-source projects</span> with
                  <span className="text-purple-400 font-semibold"> 100% ★5 freelance record</span>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                <Button
                  size="lg"
                  className="magnetic bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link href="#projects">
                    <Rocket className="mr-2 h-5 w-5" />
                    EXPLORE PROJECTS
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={`magnetic px-8 py-4 text-lg font-semibold ${isDark
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  asChild
                >
                  <Link href="/files/Muhammad_Abdullah_Khan_Resume.pdf" target="_blank">
                    <Download className="mr-2 h-5 w-5" />
                    DOWNLOAD RESUME
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-6 mt-8 animate-fade-in-up opacity-0" style={{ animationDelay: '1.7s', animationFillMode: 'forwards' }}>
                {[
                  {
                    icon: Github,
                    href: "https://github.com/MuhammadKhan148",
                    label: "GitHub",
                    color: "hover:text-blue-400",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/",
                    label: "LinkedIn",
                    color: "hover:text-purple-400",
                  },
                  {
                    icon: Mail,
                    href: "mailto:muhammad.mak252@gmail.com",
                    label: "Email",
                    color: "hover:text-pink-400",
                  },
                ].map(({ icon: Icon, href, label, color }, index) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    className={`h-12 w-12 rounded-full magnetic transition-all duration-300 hover:scale-110 ${isDark
                      ? "border border-slate-700 hover:bg-slate-800"
                      : "border border-slate-300 hover:bg-slate-100"
                      } ${color}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    asChild
                  >
                    <Link href={href} target="_blank">
                      <Icon className="h-6 w-6" />
                      <span className="sr-only">{label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Profile Image with Modern Design */}
            <div className={`relative transition-all duration-2000 delay-700 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="relative">
                {/* Floating Rings */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className={`w-full h-full rounded-full border-2 border-dashed ${isDark ? "border-blue-400/30" : "border-blue-400/50"
                    }`}></div>
                </div>
                <div className="absolute inset-4 animate-spin-slow" style={{ animationDirection: 'reverse' }}>
                  <div className={`w-full h-full rounded-full border border-dashed ${isDark ? "border-purple-400/30" : "border-purple-400/50"
                    }`}></div>
                </div>

                {/* Profile Image */}
                <div className="relative z-10 p-8">
                  <div className="relative group">
                    <Image
                      src="/images/muhammad-profile.jpg"
                      alt="Muhammad Abdullah Khan"
                      width={400}
                      height={400}
                      className="rounded-3xl w-full h-auto shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 left-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="container px-4 py-24 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className={`text-center mb-16 ${visibleSections.has("about") ? "animate-cyber-float" : "opacity-0"}`}>
            <h2 className="text-4xl font-bold tracking-tight mb-4 cyber-title font-cyber">ABOUT.EXE</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto rounded-full animate-cyber-glow" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className={`space-y-6 ${visibleSections.has("about") ? "animate-cyber-float" : "opacity-0"}`}>
              <div className="prose prose-lg text-gray-300 font-tech">
                <p className="text-xl leading-relaxed">
                  I'm a Software Engineering undergraduate at <strong className="text-cyber-blue">FAST-NUCES</strong>{" "}
                  specializing in AI/ML and full-stack development. With a passion for research-oriented problem
                  solving, I've created <strong className="text-cyber-green"> 24+ open-source projects</strong> spanning
                  emotion-aware recommenders, conversational agents, and scalable web applications.
                </p>
                <p className="leading-relaxed">
                  As a Lab Demonstrator and experienced freelancer with a 100% ★5 rating on Fiverr, I champion clean
                  code, research rigor, and measurable impact. My work focuses on innovative AI solutions that enhance
                  user experiences and drive engagement.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-xl cyber-card border border-cyber-blue/30 hover:animate-cyber-glow">
                  <div className="text-3xl font-bold cyber-title font-cyber">24+</div>
                  <div className="text-sm text-gray-400 font-tech">Open Source Projects</div>
                </div>
                <div className="text-center p-6 rounded-xl cyber-card border border-cyber-purple/30 hover:animate-cyber-glow">
                  <div className="text-3xl font-bold cyber-title font-cyber">100%</div>
                  <div className="text-sm text-gray-400 font-tech">★5 Fiverr Rating</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "AI/ML Specialist",
                  "Full-Stack Developer",
                  "Research-Oriented",
                  "Clean Code",
                  "Lab Demonstrator",
                ].map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cyber-card border border-cyber-green/30 text-cyber-green hover:animate-electric-spark font-tech"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div
              className={`flex justify-center lg:justify-end ${visibleSections.has("about") ? "animate-cyber-float" : "opacity-0"}`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500 animate-cyber-glow" />
                <div className="relative">
                  <Image
                    src="/images/muhammad-profile.jpg"
                    alt="Muhammad Abdullah Khan - AI-Focused Software Engineer"
                    width={400}
                    height={400}
                    className="rounded-2xl border-4 border-cyber-blue shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyber-dark/60 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="py-24 relative z-10">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div
              className={`text-center mb-16 ${visibleSections.has("experience") ? "animate-cyber-float" : "opacity-0"}`}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-4 cyber-title font-cyber">EXPERIENCE.LOG</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto rounded-full animate-cyber-glow" />
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Freelance Full-Stack & AI Developer",
                  company: "Fiverr",
                  period: "Jan 2018 – Present",
                  location: "Remote",
                  description:
                    "Built production-grade web & mobile apps (MERN, Flutter/Firebase) for global clients. Integrated sentiment-analysis pipelines and custom recommenders, boosting engagement ≈35%.",
                  achievements: [
                    "Completed 60+ contracts with zero revisions on 80% of orders",
                    "Applied research-style A/B testing and model benchmarks",
                    "Built emotion-aware systems adopted by two client startups",
                  ],
                },
                {
                  title: "Lab Demonstrator",
                  company: "Programming Fundamentals (PF), FAST-NUCES",
                  period: "Feb 2024 – Present",
                  location: "Islamabad, Pakistan",
                  description:
                    "Lead weekly C/C++ lab sessions (~120 first-year students); design and grade assignments & quizzes.",
                  achievements: [
                    "Built automated grading script cutting marking time by 40%",
                    "Improved feedback consistency across all students",
                    "Mentored students in coding fundamentals and best practices",
                  ],
                },
              ].map((job, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cyber-card border border-cyber-blue/20 hover:border-cyber-blue/50 ${visibleSections.has("experience") ? "animate-cyber-float" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 font-cyber">{job.title}</h3>
                        <p className="text-lg text-cyber-blue font-semibold mb-2 font-tech">{job.company}</p>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-gray-400 font-tech">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-1 text-cyber-green" />
                          {job.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-cyber-purple" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed font-tech">{job.description}</p>
                    <div className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-300 font-tech">
                          <Zap className="h-4 w-4 mr-2 text-cyber-green flex-shrink-0" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Interactive Skills Section */}
      <section id="skills" className="container px-4 py-24 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className={`text-center mb-16 ${visibleSections.has("skills") ? "animate-cyber-float" : "opacity-0"}`}>
            <h2 className="text-4xl font-bold tracking-tight mb-4 cyber-title font-cyber">SKILLS.DB</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto rounded-full animate-cyber-glow" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {skillsData.map((category, index) => (
              <Card
                key={index}
                className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cyber-card border border-cyber-blue/20 hover:border-cyber-blue/50 ${visibleSections.has("skills") ? "animate-cyber-float" : "opacity-0"
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 group-hover:scale-110 transition-transform duration-300 border border-cyber-blue/30">
                    <category.icon className="h-8 w-8 text-cyber-blue" />
                  </div>
                  <CardTitle className="text-xl font-cyber text-white">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {category.skills.map((skill, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-300 font-tech">{skill.name}</span>
                          <span className="text-xs text-cyber-green font-tech">{skill.level}%</span>
                        </div>
                        <div className="electric-progress">
                          <div
                            className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: visibleSections.has("skills") ? `${skill.level}%` : "0%",
                              transitionDelay: `${i * 0.1}s`,
                              boxShadow: "0 0 20px currentColor",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced 3D Projects Section */}
      <section id="projects" className="py-24 relative z-10">
        <div className="container px-4">
          <div className="mx-auto max-w-7xl">
            <div
              className={`text-center mb-16 ${visibleSections.has("projects") ? "animate-cyber-float" : "opacity-0"}`}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-4 cyber-title font-cyber">PROJECTS.ARRAY</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto rounded-full animate-cyber-glow" />
              <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto font-tech">
                A showcase of my AI-focused projects, from emotion-aware systems to scalable web applications
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {isLoadingProjects
                ? Array.from({ length: 6 }).map((_, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 shadow-lg cyber-card border border-cyber-blue/20"
                  >
                    <div className="relative aspect-video bg-cyber-surface animate-cyber-pulse" />
                    <CardHeader className="pb-3">
                      <div className="h-6 bg-cyber-surface rounded animate-cyber-pulse mb-2" />
                      <div className="h-4 bg-cyber-surface rounded animate-cyber-pulse w-3/4" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <div className="h-5 w-16 bg-cyber-surface rounded animate-cyber-pulse" />
                        <div className="h-5 w-20 bg-cyber-surface rounded animate-cyber-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))
                : gitHubProjects.map((project: any, index: number) => (
                  <Card
                    key={index}
                    className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cyber-card border border-cyber-blue/20 hover:border-cyber-blue/50 ${project.featured ? "lg:col-span-2 xl:col-span-1" : ""
                      } ${visibleSections.has("projects") ? "animate-cyber-float" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="cyber-card border border-cyber-blue/30 hover:border-cyber-blue text-white cyber-btn"
                            asChild
                          >
                            <Link href={project.github} target="_blank">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                          <Button size="sm" className="cyber-btn" asChild>
                            <Link href={project.demo} target="_blank">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </Link>
                          </Button>
                        </div>
                      </div>
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-cyber-blue to-cyber-green text-white border-0 animate-cyber-glow">
                            <Star className="mr-1 h-3 w-3 fill-current" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl group-hover:text-cyber-blue transition-colors duration-300 font-cyber text-white">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 leading-relaxed font-tech">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, i: number) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs cyber-card border border-cyber-green/30 text-cyber-green hover:animate-electric-spark font-tech"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section className="container px-4 py-24 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div
            className={`text-center mb-16 ${visibleSections.has("achievements") ? "animate-cyber-float" : "opacity-0"}`}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4 cyber-title font-cyber">ACHIEVEMENTS.JSON</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto rounded-full animate-cyber-glow" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Open Source Impact",
                description: "24 public repositories with flagship AIMovieRecommender ⭐150+",
                icon: Github,
                color: "cyber-blue",
              },
              {
                title: "Competition Wins",
                description:
                  "1st Place – FAST Marathon; Winner – Twin-City Swimming; Finalist – National Critical-Thinking Tournament",
                icon: Award,
                color: "cyber-purple",
              },
              {
                title: "Innovation Recognition",
                description: "Emotion-aware UX adopted by two client startups",
                icon: Zap,
                color: "cyber-green",
              },
            ].map((achievement, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cyber-card border border-cyber-blue/20 hover:border-cyber-blue/50 ${visibleSections.has("achievements") ? "animate-cyber-float" : "opacity-0"
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 w-fit group-hover:scale-110 transition-transform duration-300 border border-cyber-blue/30">
                    <achievement.icon className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <h4 className="font-semibold text-white mb-2 font-cyber">{achievement.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-tech">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra Premium Contact Section with v0 Design */}
      <section
        ref={contactSectionRef}
        id="contact"
        className={`py-24 px-6 lg:px-8 relative overflow-hidden ${isDark
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"
          : "bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100"
          }`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.3),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${contactHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Let's Build the Future
            </h2>
            <p className="text-xl text-slate-300">
              Ready to create something extraordinary together?
            </p>
          </div>

          <Card className={`backdrop-blur-2xl relative overflow-hidden transform hover:scale-105 transition-all duration-500 ${contactHasIntersected ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            } ${isDark ? "bg-slate-900/30 border-slate-800/50" : "bg-white/80 border-slate-200/50"}`}>
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] rounded-lg">
              <div className={`w-full h-full rounded-lg ${isDark ? "bg-slate-900/90" : "bg-white/90"}`} />
            </div>

            <CardContent className="p-12 relative z-10">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info with Enhanced Design */}
                <div>
                  <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-slate-900"}`}>Get In Touch</h3>
                  <div className="space-y-8">
                    {[
                      {
                        icon: Mail,
                        label: 'Email',
                        value: 'muhammad.mak252@gmail.com',
                        color: 'from-blue-400 to-blue-600',
                        href: 'mailto:muhammad.mak252@gmail.com'
                      },
                      {
                        icon: Github,
                        label: 'GitHub',
                        value: '@MuhammadKhan148',
                        color: 'from-slate-400 to-slate-600',
                        href: 'https://github.com/MuhammadKhan148'
                      },
                      {
                        icon: Linkedin,
                        label: 'LinkedIn',
                        value: '/in/muhammad-abdullah-khan',
                        color: 'from-blue-500 to-blue-700',
                        href: 'https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/'
                      },
                      {
                        icon: Phone,
                        label: 'Available',
                        value: 'Mon-Fri 9AM-6PM PST',
                        color: 'from-green-500 to-green-700',
                        href: '#'
                      },
                    ].map((contact, index) => (
                      <Link
                        key={contact.label}
                        href={contact.href}
                        target="_blank"
                        className="flex items-center gap-6 group cursor-pointer hover:translate-x-4 transition-transform duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-2xl group-hover:shadow-xl`}>
                          <contact.icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <p className={`font-bold text-xl ${isDark ? "text-white" : "text-slate-900"}`}>{contact.label}</p>
                          <p className={`group-hover:text-blue-400 transition-colors text-lg ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"
                            }`}>{contact.value}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Form with Premium Styling */}
                <div>
                  <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-slate-900"}`}>Send a Message</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-200" : "text-slate-700"}`}>First Name</label>
                        <input
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-slate-400 transition-all duration-300 focus:scale-105 backdrop-blur-sm border ${isDark ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                            }`}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-200" : "text-slate-700"}`}>Last Name</label>
                        <input
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-slate-400 transition-all duration-300 focus:scale-105 backdrop-blur-sm border ${isDark ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                            }`}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-200" : "text-slate-700"}`}>Email</label>
                      <input
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-slate-400 transition-all duration-300 focus:scale-105 backdrop-blur-sm border ${isDark ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                          }`}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className={`text-sm font-medium mb-2 block ${isDark ? "text-slate-200" : "text-slate-700"}`}>Project Details</label>
                      <textarea
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-slate-400 transition-all duration-300 focus:scale-105 backdrop-blur-sm resize-none border ${isDark ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                          }`}
                        placeholder="Tell me about your project vision..."
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 group py-3 text-lg font-medium magnetic">
                      <span className="flex items-center justify-center">
                        Send Message
                        <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-cyber-blue/20 cyber-card backdrop-blur-sm relative z-10">
        <div className="container px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <div className="flex items-center space-x-2">
                <Terminal className="h-6 w-6 text-cyber-blue" />
                <span className="font-bold text-xl cyber-title font-cyber">MUHAMMAD ABDULLAH KHAN</span>
              </div>
              <p className="text-center text-sm text-gray-400 md:text-left font-tech">
                © 2024 Muhammad Abdullah Khan. AI-Focused Software Engineer. Built with Next.js, Tailwind CSS, and
                deployed on Netlify.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {[
                { icon: Github, href: "https://github.com/MuhammadKhan148", label: "GitHub" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/",
                  label: "LinkedIn",
                },
                { icon: Mail, href: "mailto:muhammad.mak252@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full cyber-card border border-cyber-blue/20 hover:text-cyber-blue transition-all duration-300 hover:animate-cyber-glow"
                  asChild
                >
                  <Link href={href} target="_blank">
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 magnetic transition-all duration-300 hover:scale-110 ${isDark
            ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
            : "bg-white hover:bg-slate-100 text-slate-900 border border-slate-300"
            }`}
          size="icon"
        >
          <ChevronUp className="w-5 h-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      )}
    </div>
  )
}
