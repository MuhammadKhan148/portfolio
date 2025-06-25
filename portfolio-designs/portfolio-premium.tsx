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
  Code,
  Palette,
  Rocket,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PremiumPortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [cursorVariant, setCursorVariant] = useState("default")
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      setMousePosition({ x, y })

      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`
        cursorRef.current.style.top = `${y}px`
      }
    }

    const handleMouseEnter = () => setCursorVariant("hover")
    const handleMouseLeave = () => setCursorVariant("default")

    // Add cursor effects to interactive elements
    const interactiveElements = document.querySelectorAll("button, a, .cursor-hover")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference transition-all duration-300 ${
          cursorVariant === "hover" ? "scale-150 bg-white rounded-full" : "scale-100 bg-slate-900 rounded-full"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(180deg,#000_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move" />
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-orb opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <div
              className={`w-32 h-32 rounded-full blur-xl ${
                i % 4 === 0
                  ? "bg-gradient-to-r from-blue-400 to-purple-400"
                  : i % 4 === 1
                    ? "bg-gradient-to-r from-purple-400 to-pink-400"
                    : i % 4 === 2
                      ? "bg-gradient-to-r from-pink-400 to-orange-400"
                      : "bg-gradient-to-r from-orange-400 to-yellow-400"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 z-40 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-text">
              Elena Vasquez
            </div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Work", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-slate-600 hover:text-slate-900 transition-all duration-300 group cursor-hover animate-slide-down"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-out" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 ease-out delay-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} id="home" className="pt-20 pb-16 px-6 lg:px-8 min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1500 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full mb-8 animate-fade-in-up cursor-hover group hover:scale-105 transition-all duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                  Available for new projects
                </span>
                <Zap className="w-4 h-4 text-yellow-500 animate-bounce" />
              </div>

              {/* Main Heading with Staggered Animation */}
              <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span
                  className="inline-block animate-slide-up opacity-0"
                  style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
                >
                  Creative
                </span>
                <br />
                <span
                  className="inline-block animate-slide-up opacity-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                >
                  Developer
                </span>
                <br />
                <span
                  className="inline-block animate-slide-up opacity-0 text-slate-700"
                  style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
                >
                  & Designer
                </span>
              </h1>

              {/* Animated Description */}
              <p
                className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg animate-fade-in-up opacity-0"
                style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
              >
                I craft exceptional digital experiences that blend beautiful design with cutting-edge technology.
                Passionate about creating solutions that make a real impact.
              </p>

              {/* CTA Buttons with Advanced Hover Effects */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 cursor-hover transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-white/20 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-500" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden border-2 border-slate-300 text-slate-700 hover:border-slate-400 cursor-hover transform hover:scale-105 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center">
                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    Download Resume
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>

              {/* Social Links with Hover Effects */}
              <div
                className="flex items-center gap-4 mt-12 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
              >
                <span className="text-sm text-slate-500 mr-2">Follow me:</span>
                {[
                  { icon: Github, href: "#", color: "hover:text-slate-900" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                  { icon: Mail, href: "#", color: "hover:text-purple-600" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`p-2 text-slate-400 ${social.color} transition-all duration-300 hover:scale-125 hover:-translate-y-1 cursor-hover group`}
                  >
                    <social.icon className="w-5 h-5 group-hover:animate-pulse" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero Image with Advanced Effects */}
            <div
              className={`relative transition-all duration-1500 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
              <div className="relative group cursor-hover">
                {/* Main Image Container */}
                <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 transform group-hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20">
                  <Image
                    src="/placeholder.svg?height=600&width=500"
                    alt="Elena Vasquez"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Elements */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-slate-700">Available</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-slate-700">5.0 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse-glow opacity-80" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow" />
                <div className="absolute top-1/3 -right-8 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce-gentle" />

                {/* Skill Icons Floating */}
                <div className="absolute -left-12 top-1/4 animate-float-skill">
                  <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="absolute -right-12 top-2/3 animate-float-skill-delayed">
                  <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="py-20 px-6 lg:px-8 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 animate-fade-in-up">Expertise & Skills</h2>
            <p className="text-xl text-slate-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
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
                className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-slate-300/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-hover animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <CardContent className="p-6 relative z-10">
                  {/* Icon with Advanced Hover */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-2xl mb-4 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mx-auto shadow-lg group-hover:shadow-xl`}
                  >
                    {skill.icon}
                  </div>

                  <h3 className="font-bold text-slate-900 mb-2 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {skill.name}
                  </h3>

                  <p className="text-sm text-slate-500 mb-4 text-center group-hover:text-slate-600 transition-colors">
                    {skill.description}
                  </p>

                  {/* Enhanced Progress Bar */}
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative group-hover:animate-pulse`}
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer" />
                    </div>
                  </div>

                  <div className="text-center text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {skill.level}%
                  </div>
                </CardContent>

                {/* Floating Particles on Hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-particle-burst"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Projects Section */}
      <section id="work" className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4 animate-fade-in-up">Featured Projects</h2>
            <p className="text-xl text-slate-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "A modern e-commerce solution with advanced features including real-time inventory, AI-powered recommendations, and seamless checkout experience.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "Node.js", "MongoDB", "Stripe", "AI"],
                gradient: "from-blue-500 via-purple-500 to-pink-500",
                stats: { users: "50K+", rating: "4.9", performance: "98%" },
              },
              {
                title: "SaaS Dashboard",
                description:
                  "Comprehensive analytics dashboard for SaaS businesses with real-time data visualization, custom reporting, and team collaboration features.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "TypeScript", "PostgreSQL", "D3.js"],
                gradient: "from-green-500 via-teal-500 to-blue-500",
                stats: { clients: "200+", uptime: "99.9%", speed: "1.2s" },
              },
            ].map((project, index) => (
              <Card
                key={project.title}
                className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-slate-300/50 transition-all duration-700 hover:shadow-2xl cursor-hover overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image with Advanced Hover */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-80 transition-all duration-500`}
                  />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100 hover:rotate-12 cursor-hover"
                      >
                        <Github className="h-4 w-4 text-white" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-200 hover:-rotate-12 cursor-hover"
                      >
                        <ExternalLink className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                    {Object.entries(project.stats).map(([key, value], i) => (
                      <div
                        key={key}
                        className="bg-white/90 backdrop-blur-md rounded-lg px-3 py-1 text-xs font-medium text-slate-700 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        {value} {key}
                      </div>
                    ))}
                  </div>
                </div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 text-2xl">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 group-hover:text-slate-700 transition-colors leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transform hover:scale-110 transition-all duration-200 cursor-hover animate-fade-in"
                        style={{ animationDelay: `${index * 0.2 + tagIndex * 0.1}s` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="group/btn text-slate-600 hover:text-blue-600 p-0 h-auto font-medium cursor-hover"
                  >
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${project.gradient} animate-border-flow p-[1px]`}
                  >
                    <div className="w-full h-full bg-white rounded-lg" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 cursor-hover transform hover:scale-105 transition-all duration-300 hover:shadow-lg bg-white/50 backdrop-blur-sm"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse-slow" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.3),transparent_50%)] animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-slate-300 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Ready to bring your vision to life? Let's discuss your next project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "elena@example.com", color: "from-blue-400 to-blue-600" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", color: "from-green-400 to-green-600" },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "San Francisco, CA",
                    color: "from-purple-400 to-purple-600",
                  },
                ].map((contact, index) => (
                  <div
                    key={contact.label}
                    className="flex items-center gap-4 group cursor-hover animate-slide-in-left hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">{contact.label}</p>
                      <p className="text-slate-300 group-hover:text-white transition-colors">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 animate-fade-in-right">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Send a Message</CardTitle>
                <CardDescription className="text-slate-300">I'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-200 mb-2 block">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 focus:scale-105 cursor-hover backdrop-blur-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-200 mb-2 block">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 focus:scale-105 cursor-hover backdrop-blur-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200 mb-2 block">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 focus:scale-105 cursor-hover backdrop-blur-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-200 mb-2 block">Project Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 focus:scale-105 cursor-hover backdrop-blur-sm resize-none"
                    placeholder="Tell me about your project vision..."
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 cursor-hover transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 group py-3 text-lg font-medium">
                  <span className="flex items-center justify-center">
                    Send Message
                    <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 animate-fade-in">
            © 2024 Elena Vasquez. Crafted with passion and precision. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-orb {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(120deg); }
          66% { transform: translateY(10px) translateX(-20px) rotate(240deg); }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.3); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-skill {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes float-skill-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes particle-burst {
          0% { opacity: 0; transform: scale(0) translateY(0px); }
          50% { opacity: 1; transform: scale(1) translateY(-20px); }
          100% { opacity: 0; transform: scale(0) translateY(-40px); }
        }
        
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-float-orb { animation: float-orb linear infinite; }
        .animate-gradient-text { 
          background-size: 200% 200%;
          animation: gradient-text 3s ease infinite;
        }
        .animate-slide-down { animation: slide-down 0.6s ease-out both; }
        .animate-slide-up { animation: slide-up 0.8s ease-out both; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out both; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out both; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out both; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-float-skill { animation: float-skill 4s ease-in-out infinite; }
        .animate-float-skill-delayed { animation: float-skill-delayed 5s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-particle-burst { animation: particle-burst 1.5s ease-out infinite; }
        .animate-border-flow { 
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
          background-size: 400% 400%;
          animation: border-flow 3s ease infinite;
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        
        .cursor-hover { cursor: none; }
      `}</style>
    </div>
  )
}
