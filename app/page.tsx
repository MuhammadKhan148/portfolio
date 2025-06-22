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
  Palette,
  Database,
  Globe,
  Star,
  Calendar,
  MapPin,
  Award,
  Zap,
  Brain,
  Smartphone,
  Gamepad2,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [gitHubProjects, setGitHubProjects] = useState<any[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Load GitHub projects on component mount
    loadGitHubProjects()
  }, [])

  const loadGitHubProjects = async () => {
    setIsLoadingProjects(true)
    const projects = await fetchGitHubProjects()
    setGitHubProjects(projects)
    setIsLoadingProjects(false)
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Abdullah Khan",
    "jobTitle": "AI-Focused Software Engineer",
    "description": "AI-Focused Software Engineer & Full-Stack Developer specializing in emotion-aware systems, conversational AI, and scalable web applications",
    "url": "https://muhammad-abdullah-khan.netlify.app",
    "email": "muhammad.mak252@gmail.com",
    "image": "https://muhammad-abdullah-khan.netlify.app/profile-image.jpg",
    "sameAs": [
      "https://github.com/MuhammadKhan148",
      "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "FAST-NUCES"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "FAST-NUCES Islamabad"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Development",
      "React",
      "Node.js",
      "Python",
      "TensorFlow",
      "Flutter"
    ]
  }

  // Add GitHub integration
  const fetchGitHubProjects = async () => {
    try {
      // Fetch repositories from GitHub API
      const response = await fetch('https://api.github.com/users/MuhammadKhan148/repos?sort=updated&per_page=50', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      if (!response.ok) throw new Error('Failed to fetch GitHub repos')

      const repos = await response.json()

      // Filter and transform repositories
      const portfolioProjects = repos
        .filter((repo: any) => {
          // Only show repos that should be in portfolio
          return !repo.fork && // Not a fork
            !repo.private && // Public repos only
            repo.description && // Has description
            !repo.name.includes('.github') && // Not meta repos
            !repo.name.includes('config') && // Not config repos
            repo.stargazers_count >= 0 && // Any stars (including 0)
            (repo.topics?.includes('portfolio') ||
              repo.topics?.includes('project') ||
              repo.language ||
              repo.description.toLowerCase().includes('project') ||
              repo.description.toLowerCase().includes('app') ||
              repo.description.toLowerCase().includes('website'))
        })
        .slice(0, 6) // Show top 6 projects
        .map((repo: any) => ({
          id: repo.id.toString(),
          title: repo.name
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          description: repo.description || 'A GitHub project',
          image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
          tags: [
            ...(repo.language ? [repo.language] : []),
            ...(repo.topics?.slice(0, 4) || []),
          ].filter(Boolean),
          github: repo.html_url,
          demo: repo.homepage || repo.html_url,
          featured: repo.stargazers_count > 2 || repo.topics?.includes('featured'),
          stars: repo.stargazers_count,
          language: repo.language,
          updated: repo.updated_at,
        }))

      return portfolioProjects
    } catch (error) {
      console.error('Error fetching GitHub projects:', error)
      // Return fallback projects if GitHub API fails
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
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="#" className="mr-6 flex items-center space-x-2 group">
              <div className="relative">
                <Brain className="h-7 w-7 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                <div className="absolute inset-0 bg-emerald-600/20 rounded-full blur-xl group-hover:bg-emerald-700/30 transition-all" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                MAK
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-8 text-sm font-medium">
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative transition-colors hover:text-emerald-600 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-purple-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container relative px-4 py-32 md:py-40">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/50 px-4 py-2 text-sm text-emerald-700 backdrop-blur-sm">
                <Zap className="mr-2 h-4 w-4" />
                Available for new opportunities
              </div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Hi, I'm{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
                    Muhammad Abdullah Khan
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-purple-600/20 blur-2xl -z-10" />
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-slate-600 md:text-2xl leading-relaxed">
                AI-Focused Software Engineer & Full-Stack Developer specializing in emotion-aware systems,
                conversational AI, and scalable web applications. Creator of 24+ open-source projects with 100% ★5 freelance record.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="#projects">
                  <Star className="mr-2 h-5 w-5" />
                  View My Work
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                asChild
              >
                <Link href="#contact">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-8">
              {[
                { icon: Github, href: "https://github.com/MuhammadKhan148", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:muhammad.mak252@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-300 hover:scale-110"
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

      {/* About Section */}
      <section id="about" className="container px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg text-slate-600">
                <p className="text-xl leading-relaxed">
                  I'm a Software Engineering undergraduate at <strong className="text-emerald-600">FAST-NUCES</strong> specializing in
                  AI/ML and full-stack development. With a passion for research-oriented problem solving, I've created
                  <strong className="text-emerald-600"> 24+ open-source projects</strong> spanning emotion-aware recommenders,
                  conversational agents, and scalable web applications.
                </p>
                <p className="leading-relaxed">
                  As a Lab Demonstrator and experienced freelancer with a 100% ★5 rating on Fiverr, I champion clean code,
                  research rigor, and measurable impact. My work focuses on innovative AI solutions that enhance user experiences
                  and drive engagement.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-600">24+</div>
                  <div className="text-sm text-slate-600">Open Source Projects</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-slate-600">★5 Fiverr Rating</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["AI/ML Specialist", "Full-Stack Developer", "Research-Oriented", "Clean Code", "Lab Demonstrator"].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200 hover:from-emerald-200 hover:to-teal-200 transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative">
                  <Image
                    src="/profile-image.jpg"
                    alt="Muhammad Abdullah Khan - AI-Focused Software Engineer"
                    width={400}
                    height={400}
                    className="rounded-2xl border-4 border-white shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
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
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                        <p className="text-lg text-emerald-600 font-semibold mb-2">{job.company}</p>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-slate-500">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {job.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed">{job.description}</p>
                    <div className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center text-sm text-slate-600">
                          <Award className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
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

      {/* Skills Section */}
      <section id="skills" className="container px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Brain,
                title: "AI/ML",
                color: "emerald",
                skills: ["Python", "TensorFlow", "PyTorch", "Sentiment Analysis", "Recommender Systems", "Machine Learning"],
              },
              {
                icon: Code,
                title: "Frontend",
                color: "teal",
                skills: ["React", "Next.js", "JavaScript/TypeScript", "HTML/CSS", "Flutter", "PWA"],
              },
              {
                icon: Database,
                title: "Backend & Data",
                color: "purple",
                skills: ["Node.js", "MongoDB", "PostgreSQL", "Firebase", "REST APIs", "GraphQL"],
              },
              {
                icon: Globe,
                title: "DevOps & Tools",
                color: "pink",
                skills: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "CI/CD", "Git"],
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-slate-50/50 hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`relative mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${category.color === "emerald"
                      ? "from-emerald-100 to-emerald-200"
                      : category.color === "teal"
                        ? "from-teal-100 to-teal-200"
                        : category.color === "purple"
                          ? "from-purple-100 to-purple-200"
                          : "from-pink-100 to-pink-200"
                      } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon
                      className={`h-8 w-8 ${category.color === "emerald"
                        ? "text-emerald-600"
                        : category.color === "teal"
                          ? "text-teal-600"
                          : category.color === "purple"
                            ? "text-purple-600"
                            : "text-pink-600"
                        }`}
                    />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {category.skills.map((skill, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{skill}</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              className={`h-3 w-3 ${starIndex < ((i % 3) + 3)
                                ? `fill-${category.color}-400 text-${category.color}-400`
                                : "text-slate-300"
                                }`}
                            />
                          ))}
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

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="container px-4">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
              <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
                A showcase of my AI-focused projects, from emotion-aware systems to scalable web applications
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {isLoadingProjects ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                    <div className="relative aspect-video bg-slate-200 animate-pulse" />
                    <CardHeader className="pb-3">
                      <div className="h-6 bg-slate-200 rounded animate-pulse mb-2" />
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
                        <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                gitHubProjects.map((project: any, index: number) => (
                  <Card
                    key={index}
                    className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm hover:scale-105 ${project.featured ? "lg:col-span-2 xl:col-span-1" : ""
                      }`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white text-slate-900"
                            asChild
                          >
                            <Link href={project.github} target="_blank">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                            <Link href={project.demo} target="_blank">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                          {project.title}
                        </CardTitle>
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-slate-600 leading-relaxed">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, i: number) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="container px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Achievements & Recognition</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Open Source Impact",
                description: "24 public repositories with flagship AIMovieRecommender ⭐150+",
                icon: Github,
                color: "emerald",
              },
              {
                title: "Competition Wins",
                description: "1st Place – FAST Marathon; Winner – Twin-City Swimming; Finalist – National Critical-Thinking Tournament",
                icon: Award,
                color: "purple",
              },
              {
                title: "Innovation Recognition",
                description: "Emotion-aware UX adopted by two client startups",
                icon: Zap,
                color: "teal",
              },
            ].map((achievement, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50"
              >
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-${achievement.color}-100 to-${achievement.color}-200 w-fit`}>
                    <achievement.icon className={`h-6 w-6 text-${achievement.color}-600`} />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-purple-50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 relative">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Let's Work Together</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full mb-8" />
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm always excited to take on new challenges and collaborate on innovative AI projects. Let's discuss how we
              can bring your ideas to life with cutting-edge technology.
            </p>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {[
                {
                  icon: Mail,
                  title: "Email Me",
                  description: "muhammad.mak252@gmail.com",
                  action: "Send Email",
                  href: "mailto:muhammad.mak252@gmail.com",
                },
                {
                  icon: Linkedin,
                  title: "Connect",
                  description: "Let's connect professionally",
                  action: "View LinkedIn",
                  href: "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/",
                },
                {
                  icon: Github,
                  title: "Collaborate",
                  description: "Check out my repositories",
                  action: "View GitHub",
                  href: "https://github.com/MuhammadKhan148",
                },
              ].map((contact, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 w-fit group-hover:scale-110 transition-transform duration-300">
                      <contact.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{contact.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{contact.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="mailto:muhammad.mak252@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                asChild
              >
                <Link href="#" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-emerald-600" />
                <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Muhammad Abdullah Khan
                </span>
              </div>
              <p className="text-center text-sm text-slate-600 md:text-left">
                © 2024 Muhammad Abdullah Khan. AI-Focused Software Engineer. Built with Next.js, Tailwind CSS, and deployed on Netlify.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {[
                { icon: Github, href: "https://github.com/MuhammadKhan148", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:muhammad.mak252@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-300"
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
