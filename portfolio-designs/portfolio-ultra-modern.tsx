"use client"

import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Palette,
  Rocket,
  Star,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UltraModernPortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      setMousePosition({ x, y })

      // Custom cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`
        cursorRef.current.style.top = `${y}px`
      }

      // Cursor trail effect
      trailRef.current.forEach((trail, index) => {
        if (trail) {
          setTimeout(() => {
            trail.style.left = `${x}px`
            trail.style.top = `${y}px`
          }, index * 50)
        }
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Custom Cursor with Trail */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Cursor Trail */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailRef.current[i] = el }}
          className="fixed w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-40 opacity-50"
          style={{
            transform: 'translate(-50%, -50%)',
            transition: `all ${(i + 1) * 100}ms ease-out`
          }}
        />
      ))}

      {/* Animated Mesh Background */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-drift" />
      </div>

      {/* Floating Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-complex opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          >
            <div
              className={`w-6 h-6 rounded-full blur-sm ${i % 4 === 0 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                  i % 4 === 1 ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                    i % 4 === 2 ? 'bg-gradient-to-r from-pink-400 to-red-400' :
                      'bg-gradient-to-r from-yellow-400 to-orange-400'
                }`}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/50 z-40 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow">
              Jordan Blake
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Work', 'Contact'].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-slate-300 hover:text-white transition-all duration-500 group animate-slide-down"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 ease-out" />
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-700 ease-out delay-100" />

                  {/* Hover glow effect */}
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/10 to-purple-400/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Ultra Modern Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="pt-24 pb-16 px-6 lg:px-8 min-h-screen flex items-center relative"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-2000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              {/* Status Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-700/50 rounded-full mb-8 animate-fade-in-up group hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Available for hire</span>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
              </div>

              {/* Main Heading with Advanced Typography */}
              <h1 className="text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="inline-block animate-text-reveal-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                  <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Digital</span>
                </span>
                <br />
                <span className="inline-block animate-text-reveal-up opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow">Architect</span>
                </span>
                <br />
                <span className="inline-block animate-text-reveal-up opacity-0 text-slate-400" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                  & Innovator
                </span>
              </h1>

              {/* Enhanced Description */}
              <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl animate-fade-in-up opacity-0" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                I design and develop cutting-edge digital experiences that push the boundaries of what's possible.
                Specializing in immersive interfaces, AI integration, and next-generation web technologies.
              </p>

              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up opacity-0" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 px-8 py-4 text-lg font-semibold"
                >
                  <span className="relative z-10 flex items-center">
                    Explore My Universe
                    <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-particle-explosion"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden border-2 border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transform hover:scale-105 transition-all duration-500 hover:shadow-xl bg-slate-900/50 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
                >
                  <span className="relative z-10 flex items-center">
                    <Download className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                    Download Portfolio
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>

              {/* Enhanced Social Links */}
              <div className="flex items-center gap-6 mt-16 animate-fade-in-up opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                <span className="text-sm text-slate-500 mr-4">Connect with me:</span>
                {[
                  { icon: Github, href: "#", color: "hover:text-white", bg: "hover:bg-slate-800" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-400", bg: "hover:bg-blue-900/20" },
                  { icon: Mail, href: "#", color: "hover:text-purple-400", bg: "hover:bg-purple-900/20" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`p-3 text-slate-400 ${social.color} ${social.bg} rounded-xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 group border border-slate-700/50 hover:border-slate-600`}
                  >
                    <social.icon className="w-5 h-5 group-hover:animate-pulse" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Ultra Modern Hero Visual */}
            <div className={`relative transition-all duration-2000 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="relative group">
                {/* Main Image Container with Advanced Effects */}
                <div
                  className="relative w-full h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 transform group-hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01}deg) rotateX(${mousePosition.y * 0.01}deg)`,
                  }}
                >
                  <Image
                    src="/placeholder.svg?height=700&width=500"
                    alt="Jordan Blake"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-overlay"
                  />

                  {/* Dynamic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Interactive UI Elements */}
                  <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-sm font-medium text-white">Online</span>
                      <Code2 className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-yellow-400 animate-spin-slow" />
                      <span className="text-sm font-medium text-white">5.0 Rating</span>
                      <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Floating Tech Icons */}
                  <div className="absolute top-1/4 -left-8 animate-orbit">
                    <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-700/50">
                      <Code2 className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="absolute bottom-1/3 -right-8 animate-orbit-reverse">
                    <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-700/50">
                      <Palette className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements with Physics */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse-glow opacity-60 blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow opacity-80" />
                <div className="absolute top-1/2 -right-12 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce-3d" />

                {/* Interactive Cursor Follower */}
                <div
                  className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50 pointer-events-none transition-all duration-100"
                  style={{
                    left: `${mousePosition.x * 0.1}px`,
                    top: `${mousePosition.y * 0.1}px`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Skills Showcase */}
      <section className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up">
              Technical Mastery
            </h2>
            <p className="text-xl text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Cutting-edge technologies and frameworks I use to build the future
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React', level: 98, icon: '⚛️', color: 'from-blue-500 to-cyan-500', description: 'Frontend Mastery', projects: '50+' },
              { name: 'AI/ML', level: 94, icon: '🤖', color: 'from-purple-500 to-pink-500', description: 'Machine Learning', projects: '25+' },
              { name: 'WebGL', level: 91, icon: '🎮', color: 'from-green-500 to-emerald-500', description: '3D Graphics', projects: '15+' },
              { name: 'Blockchain', level: 87, icon: '⛓️', color: 'from-orange-500 to-red-500', description: 'Web3 Development', projects: '10+' },
            ].map((skill, index) => (
              <Card
                key={skill.name}
                className="group relative bg-slate-900/50 border border-slate-800/50 hover:border-slate-700/50 backdrop-blur-xl transition-all duration-700 hover:-translate-y-6 hover:shadow-2xl cursor-pointer animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${skill.color} animate-border-glow p-[1px]`}>
                    <div className="w-full h-full bg-slate-900 rounded-lg" />
                  </div>
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon with Advanced Animation */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${skill.color} rounded-3xl mb-6 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mx-auto shadow-2xl group-hover:shadow-xl relative overflow-hidden`}>
                    <span className="relative z-10">{skill.icon}</span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h3 className="font-bold text-white mb-2 text-xl text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {skill.name}
                  </h3>

                  <p className="text-sm text-slate-400 mb-2 text-center group-hover:text-slate-300 transition-colors">
                    {skill.description}
                  </p>

                  <p className="text-xs text-slate-500 mb-6 text-center">
                    {skill.projects} projects
                  </p>

                  {/* Advanced Progress Visualization */}
                  <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 ease-out relative`}
                      style={{ width: activeCard === index ? `${skill.level}%` : '0%' }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer-fast" />
                      <div className="absolute right-0 top-0 w-2 h-full bg-white/50 animate-pulse" />
                    </div>
                  </div>

                  <div className="text-center text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {skill.level}%
                  </div>
                </CardContent>

                {/* Particle Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-particle-float"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra Premium Projects */}
      <section id="work" className="py-24 px-6 lg:px-8 bg-slate-900/30 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up">
              Featured Creations
            </h2>
            <p className="text-xl text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Innovative projects that showcase the future of digital experiences
            </p>
          </div>

          <div className="space-y-24">
            {[
              {
                title: 'AI-Powered Design System',
                description: 'Revolutionary design system that uses machine learning to generate consistent UI components and automatically adapt to brand guidelines. Features real-time collaboration, version control, and intelligent suggestions.',
                image: '/placeholder.svg?height=500&width=800',
                tags: ['AI/ML', 'React', 'TypeScript', 'Figma API', 'WebGL'],
                gradient: 'from-blue-500 via-purple-500 to-pink-500',
                stats: { users: '100K+', accuracy: '99.2%', speed: '10x faster' },
                featured: true
              },
              {
                title: 'Immersive 3D Portfolio Platform',
                description: 'Next-generation portfolio platform with immersive 3D environments, real-time physics, and interactive storytelling. Built with cutting-edge web technologies for maximum performance.',
                image: '/placeholder.svg?height=500&width=800',
                tags: ['Three.js', 'WebXR', 'GLSL', 'React', 'WebAssembly'],
                gradient: 'from-green-500 via-teal-500 to-blue-500',
                stats: { performance: '60fps', loading: '2.1s', engagement: '+340%' },
                featured: false
              },
            ].map((project, index) => (
              <div
                key={project.title}
                className={`grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative group">
                    {/* Project Image with Ultra Effects */}
                    <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 transform group-hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Dynamic Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-70 transition-all duration-500`} />

                      {/* Interactive Elements */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex gap-6">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100 hover:rotate-12"
                          >
                            <Github className="h-6 w-6 text-white" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-200 hover:-rotate-12"
                          >
                            <ExternalLink className="h-6 w-6 text-white" />
                          </Button>
                        </div>
                      </div>

                      {/* Stats Overlay */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        {Object.entries(project.stats).map(([key, value], i) => (
                          <div key={key} className="bg-slate-900/90 backdrop-blur-xl rounded-xl px-4 py-2 text-sm font-medium text-white transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-slate-700/50" style={{ transitionDelay: `${i * 100}ms` }}>
                            <span className="text-slate-400">{key}:</span> <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold animate-pulse-glow">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="space-y-6">
                    <h3 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {project.title}
                    </h3>

                    <p className="text-lg text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10 transform hover:scale-110 transition-all duration-200 px-4 py-2 text-sm font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      className="group/btn text-slate-300 hover:text-white p-0 h-auto font-medium text-lg mt-6"
                    >
                      Explore Project
                      <ArrowRight className="ml-3 h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra Modern Contact */}
      <section id="contact" className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.3),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up">
              Let's Build the Future
            </h2>
            <p className="text-xl text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Ready to create something extraordinary together?
            </p>
          </div>

          <Card className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-2xl relative overflow-hidden transform hover:scale-105 transition-all duration-500 animate-fade-in-up">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-border-flow p-[1px] rounded-lg">
              <div className="w-full h-full bg-slate-900/90 rounded-lg" />
            </div>

            <CardContent className="p-12 relative z-10">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8">Get In Touch</h3>
                  <div className="space-y-8">
                    {[
                      { icon: Mail, label: 'Email', value: 'jordan@example.com', color: 'from-blue-400 to-blue-600' },
                      { icon: Github, label: 'GitHub', value: '@jordanblake', color: 'from-slate-400 to-slate-600' },
                      { icon: Linkedin, label: 'LinkedIn', value: '/in/jordanblake', color: 'from-blue-500 to-blue-700' },
                    ].map((contact, index) => (
                      <div
                        key={contact.label}
                        className="flex items-center gap-6 group cursor-pointer animate-slide-in-left hover:translate-x-4 transition-transform duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-2xl group-hover:shadow-xl`}>
                          <contact.icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xl">{contact.label}</p>
                          <p className="text-slate-300 group-hover:text-white transition-colors text-lg">{contact.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">Name</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 focus:scale-105 backdrop-blur-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">Email</label>
                      <input
                        type="email"
                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 focus:scale-105 backdrop-blur-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-3 block">Project Vision</label>
                    <textarea
                      rows={5}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 focus:scale-105 backdrop-blur-sm resize-none"
                      placeholder="Describe your vision and how we can bring it to life..."
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 group py-4 text-lg font-semibold">
                    <span className="flex items-center justify-center">
                      Launch Project
                      <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <style jsx>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes float-complex {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg) scale(1.1); }
          50% { transform: translateY(-10px) translateX(-15px) rotate(180deg) scale(0.9); }
          75% { transform: translateY(-30px) translateX(5px) rotate(270deg) scale(1.05); }
        }
        
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes text-reveal-up {
          from { opacity: 0; transform: translateY(50px) rotateX(-90deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4); }
        }
        
        @keyframes bounce-3d {
          0%, 100% { transform: translateY(0px) translateZ(0px) rotateY(0deg); }
          50% { transform: translateY(-25px) translateZ(20px) rotateY(180deg); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(-80px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(-80px) rotate(360deg); }
        }
        
        @keyframes particle-explosion {
          0% { opacity: 0; transform: scale(0) translateY(0px); }
          50% { opacity: 1; transform: scale(1) translateY(-20px); }
          100% { opacity: 0; transform: scale(0) translateY(-40px); }
        }
        
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes particle-float {
          0% { opacity: 0; transform: translateY(0px) scale(0); }
          50% { opacity: 1; transform: translateY(-30px) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(0); }
        }
        
        @keyframes border-glow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        
        .animate-drift { animation: drift 25s linear infinite; }
        .animate-float-complex { animation: float-complex linear infinite; }
        .animate-gradient-flow { 
          background-size: 200% 200%;
          animation: gradient-flow 3s ease infinite;
        }
        .animate-slide-down { animation: slide-down 0.6s ease-out both; }
        .animate-text-reveal-up { animation: text-reveal-up 1s ease-out both; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out both; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bounce-3d { animation: bounce-3d 3s ease-in-out infinite; }
        .animate-orbit { animation: orbit 15s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 12s linear infinite; }
        .animate-particle-explosion { animation: particle-explosion 1.5s ease-out infinite; }
        .animate-shimmer-fast { animation: shimmer-fast 1.5s infinite; }
        .animate-particle-float { animation: particle-float 2s ease-out infinite; }
        .animate-border-glow { 
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
          background-size: 400% 400%;
          animation: border-glow 2s ease infinite;
        }
        .animate-border-flow { 
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
          background-size: 400% 400%;
          animation: border-flow 3s ease infinite;
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
