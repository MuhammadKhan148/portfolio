"use client"

import { ArrowRight, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AnimatedPortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "Creative Developer & Designer"

  useEffect(() => {
    setIsLoaded(true)

    // Typing animation
    let i = 0
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeTimer)
      }
    }, 100)

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(typeTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: "10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-float-delayed"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            top: "60%",
            right: "10%",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            bottom: "20%",
            left: "20%",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-slate-900 animate-slide-in-left">Alex Chen</div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Projects", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-110 animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="inline-block animate-bounce-in">Creative</span>
                <br />
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  {typedText}
                  <span className="animate-blink">|</span>
                </span>
              </h1>
              <p
                className="text-xl text-slate-600 mb-8 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "1s" }}
              >
                I craft beautiful digital experiences with modern technologies. Passionate about creating user-centered
                solutions that make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-slate-900 border-slate-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Download CV
                </Button>
              </div>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <Image src="/placeholder.svg?height=500&width=400" alt="Alex Chen" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full animate-pulse-glow"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-600 rounded-full animate-spin-slow"></div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-pink-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Floating Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
              { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-800" },
              { name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
              { name: "Design", level: 88, color: "from-purple-500 to-pink-500" },
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="group relative p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-white font-bold text-sm">{skill.name.slice(0, 2)}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{skill.name}</h3>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div
                    className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ease-out animate-progress-bar`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-sm text-slate-600">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section with Advanced Animations */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 animate-fade-in-up">Featured Projects</h2>
            <p className="text-xl text-slate-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Some of my recent work that I'm proud of
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration",
                image: "/placeholder.svg?height=200&width=400",
                tags: ["React", "Node.js", "MongoDB", "Stripe"],
                color: "from-blue-500 to-purple-500",
              },
              {
                title: "Task Management App",
                description: "Collaborative project management tool with real-time updates and team features",
                image: "/placeholder.svg?height=200&width=400",
                tags: ["Next.js", "Socket.io", "PostgreSQL", "Prisma"],
                color: "from-green-500 to-teal-500",
              },
              {
                title: "Weather Dashboard",
                description: "Beautiful weather app with location-based forecasts and interactive charts",
                image: "/placeholder.svg?height=200&width=400",
                tags: ["Vue.js", "Chart.js", "OpenWeather API", "PWA"],
                color: "from-orange-500 to-red-500",
              },
            ].map((project, index) => (
              <Card
                key={project.title}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-4 animate-fade-in-up overflow-hidden relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center`}
                  >
                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="transform hover:scale-110 transition-transform duration-200 animate-fade-in"
                        style={{ animationDelay: `${index * 0.2 + tagIndex * 0.1}s` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Floating stars animation */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className="absolute w-4 h-4 text-yellow-400 animate-twinkle"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        transform: `translate(${i * 8}px, ${i * 8}px)`,
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Morphing Background */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">Let's Work Together</h2>
            <p className="text-xl text-white/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Have a project in mind? I'd love to hear about it and discuss how we can bring it to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "alex.chen@example.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                ].map((contact, index) => (
                  <div
                    key={contact.label}
                    className="flex items-center gap-4 group animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{contact.label}</p>
                      <p className="text-white/80">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {[Github, Linkedin].map((Icon, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-slate-900 transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-md animate-fade-in-right">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
                <CardDescription className="text-white/80">I'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
                    <label className="text-sm font-medium text-white/90 mb-2 block">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all duration-300 focus:scale-105"
                      placeholder="John"
                    />
                  </div>
                  <div className="animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
                    <label className="text-sm font-medium text-white/90 mb-2 block">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all duration-300 focus:scale-105"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="animate-slide-in-up" style={{ animationDelay: "0.5s" }}>
                  <label className="text-sm font-medium text-white/90 mb-2 block">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all duration-300 focus:scale-105"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
                  <label className="text-sm font-medium text-white/90 mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all duration-300 focus:scale-105 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  className="w-full bg-white text-slate-900 hover:bg-white/90 transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: "0.7s" }}
                >
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 animate-fade-in">
            © 2024 Alex Chen. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(-100px) translateX(50px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(5deg); }
          70% { transform: scale(0.9) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.3); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes progress-bar {
          from { width: 0%; }
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
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-gradient { 
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-bounce-in { animation: bounce-in 1s ease-out; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-twinkle { animation: twinkle 1.5s ease-in-out infinite; }
        .animate-progress-bar { animation: progress-bar 2s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out both; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out both; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out both; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out both; }
        .animate-slide-in-up { animation: slide-in-up 0.6s ease-out both; }
        .animate-fade-in { animation: fade-in 0.6s ease-out both; }
      `}</style>
    </div>
  )
}
