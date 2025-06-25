"use client"

import { ArrowRight, Download, ExternalLink, Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DarkPortfolio() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-md border-b z-50 ${isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold">Sarah Johnson</div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex space-x-8">
                <Link
                  href="#home"
                  className={`hover:text-purple-400 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className={`hover:text-purple-400 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  About
                </Link>
                <Link
                  href="#projects"
                  className={`hover:text-purple-400 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  Projects
                </Link>
                <Link
                  href="#contact"
                  className={`hover:text-purple-400 transition-colors ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  Contact
                </Link>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="rounded-full">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Sarah Johnson"
                fill
                className="rounded-full object-cover border-4 border-purple-500"
              />
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                UI/UX Designer
              </span>
            </h1>

            <p
              className={`text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              I create intuitive and beautiful digital experiences that users love. Specializing in user research,
              interface design, and design systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`${isDark ? "border-slate-700 text-white hover:bg-slate-800" : "border-slate-300 text-slate-900 hover:bg-slate-50"}`}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              className={`${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"} hover:scale-105 transition-transform duration-300`}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <CardTitle>UI Design</CardTitle>
                <CardDescription className={isDark ? "text-slate-400" : "text-slate-600"}>
                  Creating beautiful and functional user interfaces
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={`${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"} hover:scale-105 transition-transform duration-300`}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <CardTitle>UX Research</CardTitle>
                <CardDescription className={isDark ? "text-slate-400" : "text-slate-600"}>
                  Understanding user needs through research and testing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={`${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"} hover:scale-105 transition-transform duration-300`}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Prototyping</CardTitle>
                <CardDescription className={isDark ? "text-slate-400" : "text-slate-600"}>
                  Bringing ideas to life with interactive prototypes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
            <p className={`text-xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              A selection of projects I'm most proud of
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=320&width=500"
                  alt="Mobile Banking App"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Mobile Banking App</h3>
                <p className={`text-lg mb-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Complete redesign of a mobile banking application focusing on user experience and accessibility.
                  Increased user satisfaction by 40% and reduced support tickets by 60%.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">User Research</Badge>
                  <Badge variant="secondary">Prototyping</Badge>
                  <Badge variant="secondary">Design System</Badge>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className={
                      isDark
                        ? "border-slate-700 text-white hover:bg-slate-800"
                        : "border-slate-300 text-slate-900 hover:bg-slate-50"
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Case Study
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold mb-4">E-learning Platform</h3>
                <p className={`text-lg mb-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Designed an intuitive learning management system for online education. Created a design system that
                  improved development speed by 50%.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">Sketch</Badge>
                  <Badge variant="secondary">InVision</Badge>
                  <Badge variant="secondary">User Testing</Badge>
                  <Badge variant="secondary">Wireframing</Badge>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className={
                      isDark
                        ? "border-slate-700 text-white hover:bg-slate-800"
                        : "border-slate-300 text-slate-900 hover:bg-slate-50"
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Case Study
                  </Button>
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden order-1 lg:order-2">
                <Image
                  src="/placeholder.svg?height=320&width=500"
                  alt="E-learning Platform"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Create Something Amazing</h2>
          <p className={`text-xl mb-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            I'm always interested in new opportunities and collaborations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={
                isDark
                  ? "border-slate-700 text-white hover:bg-slate-700"
                  : "border-slate-300 text-slate-900 hover:bg-slate-50"
              }
            >
              <Github className="mr-2 h-4 w-4" />
              View Portfolio
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 sm:px-6 lg:px-8 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            © 2024 Sarah Johnson. Designed with ❤️ and lots of coffee.
          </p>
        </div>
      </footer>
    </div>
  )
}
