"use client"

import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MinimalPortfolio() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="#" className="text-xl font-medium">
              David Kim
            </Link>
            <div className="flex space-x-8 text-sm">
              <Link href="#work" className="hover:text-slate-600 transition-colors">
                Work
              </Link>
              <Link href="#about" className="hover:text-slate-600 transition-colors">
                About
              </Link>
              <Link href="#contact" className="hover:text-slate-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl lg:text-8xl font-light mb-8 leading-tight">
            Product Designer
            <br />
            <span className="text-slate-400">& Developer</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
            I design and build digital products that are both beautiful and functional. Currently working at Stripe,
            previously at Airbnb and Google.
          </p>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 hover:border-slate-300">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 hover:border-slate-300">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 hover:border-slate-300">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 hover:border-slate-300">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-16">Selected Work</h2>

          <div className="space-y-24">
            <div className="group">
              <div className="relative h-96 mb-8 overflow-hidden rounded-lg bg-slate-50">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Stripe Dashboard Redesign"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-light mb-2">Stripe Dashboard Redesign</h3>
                  <p className="text-slate-600 mb-4 max-w-lg">
                    Complete overhaul of the merchant dashboard focusing on data visualization and user workflow
                    optimization.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="font-light">
                      Product Design
                    </Badge>
                    <Badge variant="outline" className="font-light">
                      Data Visualization
                    </Badge>
                    <Badge variant="outline" className="font-light">
                      User Research
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="group">
              <div className="relative h-96 mb-8 overflow-hidden rounded-lg bg-slate-50">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Mobile Investment App"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-light mb-2">Mobile Investment App</h3>
                  <p className="text-slate-600 mb-4 max-w-lg">
                    Designed a simplified investment platform for first-time investors, making complex financial data
                    accessible and actionable.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="font-light">
                      Mobile Design
                    </Badge>
                    <Badge variant="outline" className="font-light">
                      FinTech
                    </Badge>
                    <Badge variant="outline" className="font-light">
                      Prototyping
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="group">
              <div className="relative h-96 mb-8 overflow-hidden rounded-lg bg-slate-50">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Design System"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-light mb-2">Enterprise Design System</h3>
                  <p className="text-slate-600 mb-4 max-w-lg">
                    Built a comprehensive design system for a Fortune 500 company, improving design consistency across
                    50+ products.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="font-light">
                      Design Systems
                    </Badge>
                    <Badge variant="outline" className="font-light">
                      Component Library
                    </Badge>
                    <Badge variant="outline" className="font-light">
                      Documentation
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light mb-8">About Me</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  I'm a product designer and developer with over 8 years of experience creating digital experiences for
                  companies ranging from startups to Fortune 500s.
                </p>
                <p>
                  My approach combines user-centered design principles with technical feasibility, ensuring that
                  beautiful designs can actually be built and maintained.
                </p>
                <p>
                  When I'm not designing, you can find me contributing to open source projects, writing about design and
                  development, or exploring the mountains of California.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden bg-slate-100">
              <Image src="/placeholder.svg?height=400&width=400" alt="David Kim" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8">Let's Work Together</h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a conversation about
            design and technology.
          </p>
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-light px-8">
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <p className="text-slate-500 text-sm">© 2024 David Kim</p>
          <p className="text-slate-500 text-sm">Made with care in San Francisco</p>
        </div>
      </footer>
    </div>
  )
}
