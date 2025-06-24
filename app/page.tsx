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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [gitHubProjects, setGitHubProjects] = useState<any[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    loadGitHubProjects()
  }, [])

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
    <div className="min-h-screen cyber-bg overflow-x-hidden">
      {/* Matrix Rain Effect */}
      <div className="matrix-rain fixed inset-0 z-0"></div>

      {/* Cyberpunk Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "cyber-card backdrop-blur-xl border-b border-cyber-blue/20" : "bg-transparent"
          }`}
      >
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="#" className="mr-6 flex items-center space-x-2 group">
              <div className="relative">
                <Terminal className="h-7 w-7 text-cyber-blue group-hover:text-cyber-green transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-cyber-blue/20 rounded-full blur-xl group-hover:bg-cyber-green/30 transition-all duration-300" />
              </div>
              <span className="font-cyber font-bold text-xl cyber-title">MAK.DEV</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-8 text-sm font-medium font-tech">
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative transition-all duration-300 hover:text-cyber-blue group text-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-blue to-cyber-green group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </nav>

      {/* Enhanced Cyberpunk Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-20 min-h-screen flex items-center">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Floating Particles */}
        <div className="particles absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Holographic Orbs */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-cyber-blue/20 rounded-full blur-3xl animate-cyber-float"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl animate-cyber-float"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyber-green/20 rounded-full blur-3xl animate-cyber-float"
            style={{
              transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
              animationDelay: "4s",
            }}
          />
        </div>

        <div className="container relative px-4 py-32 md:py-40 z-10">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full cyber-card border border-cyber-green/50 px-6 py-3 text-sm text-cyber-green backdrop-blur-sm animate-cyber-glow">
                <Activity className="mr-2 h-4 w-4 animate-cyber-pulse" />
                <span className="font-tech animate-neon-flicker">SYSTEM ONLINE • AVAILABLE FOR HIRE</span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-cyber">
                <span className="block text-white mb-4">INITIALIZING...</span>
                <span className="relative">
                  <span className="cyber-title glitch" data-text="MUHAMMAD ABDULLAH KHAN">
                    MUHAMMAD ABDULLAH KHAN
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20 blur-2xl -z-10 animate-holographic-shift" />
                </span>
              </h1>

              <div className="space-y-4">
                <p className="mx-auto max-w-3xl text-xl text-cyber-blue md:text-2xl leading-relaxed font-tech font-medium">
                  <span className="text-cyber-green font-bold">&gt; AI/ML ENGINEER</span> &
                  <span className="text-cyber-purple font-bold"> FULL-STACK DEVELOPER</span>
                </p>
                <p className="mx-auto max-w-3xl text-lg text-gray-300 leading-relaxed font-tech">
                  Specializing in <span className="text-cyber-blue font-semibold">emotion-aware systems</span>,
                  conversational AI, and scalable web applications. Creator of
                  <span className="text-cyber-green font-semibold"> 24+ open-source projects</span> with
                  <span className="text-cyber-purple font-semibold"> 100% ★5 freelance record</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="cyber-btn px-8 py-4 text-lg font-cyber" asChild>
                <Link href="#projects">
                  <Rocket className="mr-2 h-5 w-5" />
                  EXPLORE PROJECTS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="holographic border-2 border-cyber-blue/50 hover:border-cyber-blue text-white px-8 py-4 text-lg font-tech"
                asChild
              >
                <Link href="/files/Muhammad_Abdullah_Khan_Resume.pdf" target="_blank">
                  <Download className="mr-2 h-5 w-5" />
                  DOWNLOAD RESUME
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-8">
              {[
                {
                  icon: Github,
                  href: "https://github.com/MuhammadKhan148",
                  label: "GitHub",
                  color: "hover:text-cyber-blue",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/",
                  label: "LinkedIn",
                  color: "hover:text-cyber-green",
                },
                {
                  icon: Mail,
                  href: "mailto:muhammad.mak252@gmail.com",
                  label: "Email",
                  color: "hover:text-cyber-purple",
                },
              ].map(({ icon: Icon, href, label, color }, index) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className={`h-12 w-12 rounded-full cyber-card border border-cyber-blue/20 ${color} transition-all duration-300 hover:scale-110 hover:animate-cyber-glow`}
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

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-blue/20 rounded-full blur-3xl animate-cyber-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl animate-cyber-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container px-4 relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className={`${visibleSections.has("contact") ? "animate-cyber-float" : "opacity-0"}`}>
              <h2 className="text-4xl font-bold tracking-tight mb-4 cyber-title font-cyber">CONTACT.INIT</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto rounded-full mb-8 animate-cyber-glow" />
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-tech">
                Ready to collaborate on cutting-edge AI projects? Let's build the future together with innovative
                technology solutions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {[
                {
                  icon: Mail,
                  title: "Email Protocol",
                  description: "muhammad.mak252@gmail.com",
                  action: "Send Message",
                  href: "mailto:muhammad.mak252@gmail.com",
                },
                {
                  icon: Linkedin,
                  title: "Network Connect",
                  description: "Professional networking hub",
                  action: "Connect Now",
                  href: "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/",
                },
                {
                  icon: Github,
                  title: "Code Repository",
                  description: "Open source contributions",
                  action: "Explore Code",
                  href: "https://github.com/MuhammadKhan148",
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cyber-card border border-cyber-blue/20 hover:border-cyber-blue/50 group ${visibleSections.has("contact") ? "animate-cyber-float" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-cyber-blue/20 to-cyber-green/20 w-fit group-hover:scale-110 transition-transform duration-300 border border-cyber-blue/30">
                      <contact.icon className="h-6 w-6 text-cyber-blue" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 font-cyber">{contact.title}</h3>
                    <p className="text-sm text-gray-300 mb-4 font-tech">{contact.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="holographic border border-cyber-blue/50 hover:border-cyber-blue text-white font-tech"
                      asChild
                    >
                      <Link href={contact.href} target="_blank">
                        {contact.action}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${visibleSections.has("contact") ? "animate-cyber-float" : "opacity-0"}`}
            >
              <Button size="lg" className="cyber-btn px-8 py-4 text-lg font-cyber" asChild>
                <Link href="mailto:muhammad.mak252@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  INITIATE CONTACT
                  <Target className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="holographic border-2 border-cyber-blue/50 hover:border-cyber-blue text-white px-8 py-4 text-lg font-tech"
                asChild
              >
                <Link href="/files/Muhammad_Abdullah_Khan_Resume.pdf" target="_blank">
                  <Download className="mr-2 h-5 w-5" />
                  DOWNLOAD RESUME
                </Link>
              </Button>
            </div>
          </div>
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
    </div>
  )
}
