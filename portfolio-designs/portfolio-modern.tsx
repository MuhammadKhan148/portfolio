"use client"

import { ArrowRight, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ModernPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-slate-900">Alex Chen</div>
            <div className="hidden md:flex space-x-8">
              <Link href="#home" className="text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-slate-600 hover:text-slate-900 transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Creative
                <span className="text-blue-600"> Developer</span>
                <br />& Designer
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                I craft beautiful digital experiences with modern technologies. Passionate about creating user-centered
                solutions that make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="bg-white text-slate-900 border-slate-300">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                <Image src="/placeholder.svg?height=500&width=400" alt="Alex Chen" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              I'm a full-stack developer with 5+ years of experience building scalable web applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">My Journey</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Started as a curious computer science student, I've evolved into a passionate developer who loves
                solving complex problems with elegant solutions. I specialize in React, Node.js, and modern web
                technologies.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing
                knowledge through technical writing and mentoring.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Tailwind</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                    <Badge variant="secondary">AWS</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Senior Frontend Developer</h4>
                      <p className="text-sm text-slate-600">TechCorp • 2022 - Present</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Full Stack Developer</h4>
                      <p className="text-sm text-slate-600">StartupXYZ • 2020 - 2022</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold">B.S. Computer Science</h4>
                    <p className="text-sm text-slate-600">University of Technology • 2016 - 2020</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600">Some of my recent work that I'm proud of</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="E-commerce Platform"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  E-commerce Platform
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  A full-stack e-commerce solution with React, Node.js, and Stripe integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                  <Badge variant="outline">Stripe</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Task Management App"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Task Management App
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Collaborative project management tool with real-time updates and team features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Socket.io</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Prisma</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Weather Dashboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Weather Dashboard
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Beautiful weather app with location-based forecasts and interactive charts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Vue.js</Badge>
                  <Badge variant="outline">Chart.js</Badge>
                  <Badge variant="outline">OpenWeather API</Badge>
                  <Badge variant="outline">PWA</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="bg-white text-slate-900 border-slate-300">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Let's Work Together</h2>
            <p className="text-xl text-slate-600">
              Have a project in mind? I'd love to hear about it and discuss how we can bring it to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <p className="text-slate-600">alex.chen@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Location</p>
                    <p className="text-slate-600">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-slate-900 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="bg-white text-slate-900 border-slate-300">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white text-slate-900 border-slate-300">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>I'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2024 Alex Chen. All rights reserved. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
