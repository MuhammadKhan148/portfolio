"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Save,
    Eye,
    Upload,
    Plus,
    Trash2,
    GripVertical,
    Settings,
    User,
    Briefcase,
    Code,
    FolderOpen,
    MessageSquare,
    Palette,
    Star,
    Download,
    Database,
    Globe,
    Monitor,
    Edit3,
    Lock,
    Github,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EnhancedGitHubSync } from "@/components/enhanced-github-sync"

// Types
interface PersonalInfo {
    name: string
    title: string
    bio: string
    email: string
    github: string
    linkedin: string
    avatar: string
    availability: string
    availableForWork: boolean
    projectsCompleted: number
    yearsExperience: number
}

interface Experience {
    id: string
    title: string
    company: string
    period: string
    location: string
    description: string
    achievements: string[]
}

interface Project {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    github: string
    demo: string
    featured: boolean
}

interface Skill {
    id: string
    name: string
    category: string
    level: number
}

interface Testimonial {
    id: string
    name: string
    role: string
    content: string
    avatar: string
}

interface SiteSettings {
    siteTitle: string
    metaDescription: string
    googleAnalyticsId: string
    contactFormEmail: string
    theme: string
    darkMode: boolean
    analytics: boolean
}

// Tabs Component
const Tabs = ({ value, onValueChange, children, className }: any) => <div className={className}>{children}</div>

const TabsList = ({ children, className }: any) => (
    <div
        className={`inline-flex h-12 items-center justify-center rounded-lg bg-white border border-slate-200 p-1 text-slate-500 shadow-sm ${className}`}
    >
        {children}
    </div>
)

const TabsTrigger = ({ value, children, isActive, onClick, className }: any) => (
    <button
        onClick={() => onClick(value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
            : "hover:bg-slate-100 hover:text-slate-900"
            } ${className}`}
    >
        {children}
    </button>
)

const TabsContent = ({ value, activeValue, children, className }: any) => (
    <div
        className={`mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${value === activeValue ? "block" : "hidden"
            } ${className}`}
    >
        {children}
    </div>
)

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("personal")
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Real portfolio data state - initialized with your complete data
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        name: "Muhammad Abdullah Khan",
        title: "AI/ML Engineer & Full-Stack Developer | Research-Oriented Software Engineer",
        bio: "AI/ML Engineer & Full-Stack Developer with 6+ years of experience specializing in emotion-aware systems, conversational AI, and scalable web applications. Creator of 24+ open-source projects with 100% ★5 freelance record. Passionate about research-driven development, machine learning innovation, and building intelligent systems that enhance user experiences.",
        email: "muhammad.mak252@gmail.com",
        github: "https://github.com/MuhammadKhan148",
        linkedin: "https://linkedin.com/in/muhammad-abdullah-khan-01271a263/",
        avatar: "/images/muhammad-profile.jpg",
        availability: "Open to full-time opportunities and exciting projects",
        availableForWork: true,
        projectsCompleted: 50,
        yearsExperience: 6,
    })

    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: "1",
            title: "Freelance AI/ML & Full-Stack Developer",
            company: "Fiverr Platform",
            period: "Jan 2018 – Present",
            location: "Remote • Global Clients",
            description: "Built production-grade web & mobile applications (MERN, Flutter/Firebase) for 50+ global clients. Specialized in integrating sentiment-analysis pipelines, recommendation systems, and custom AI models, boosting client engagement by ≈35% on average.",
            achievements: [
                "Maintained 100% ★5 rating across 60+ completed contracts",
                "Achieved zero revisions required on 80% of delivered projects",
                "Applied research-style A/B testing and ML model benchmarks for optimal performance",
                "Built emotion-aware systems adopted by multiple client startups",
                "Generated $50K+ in freelance revenue through high-quality AI/ML solutions",
                "Developed custom recommendation engines improving user retention by 40%",
            ],
        },
        {
            id: "2",
            title: "Lab Demonstrator - Programming Fundamentals",
            company: "FAST National University of Computer & Emerging Sciences",
            period: "Feb 2024 – Present",
            location: "Islamabad, Pakistan",
            description: "Lead weekly C/C++ programming lab sessions for ~120 first-year computer science students. Design comprehensive assignments, conduct assessments, and provide mentorship in fundamental programming concepts and software engineering practices.",
            achievements: [
                "Built automated grading script reducing marking time by 40% and improving consistency",
                "Improved student performance metrics with structured feedback system",
                "Mentored 120+ students in coding fundamentals, data structures, and best practices",
                "Developed innovative teaching methodologies for complex programming concepts",
                "Maintained 95% student satisfaction rate in course evaluations",
                "Created supplementary learning materials adopted by other instructors",
            ],
        },
        {
            id: "3",
            title: "Research Assistant - AI/ML Projects",
            company: "Independent Research",
            period: "2020 – Present",
            location: "Pakistan",
            description: "Conducted independent research in artificial intelligence, machine learning, and software engineering. Published projects in emotion recognition, recommendation systems, and intelligent game development with focus on practical applications.",
            achievements: [
                "Developed AIMovieRecommender with 150+ GitHub stars and active community",
                "Created emotion-aware conversational AI with <200ms response time",
                "Built Python chess engine with advanced AI opponent algorithms",
                "Published 24+ open-source projects with comprehensive documentation",
                "Achieved recognition in multiple programming competitions and hackathons",
                "Contributed to open-source ML libraries and frameworks",
            ],
        },
    ])

    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            title: "AIMovieRecommender",
            description: "Advanced machine learning-powered movie recommendation system using collaborative filtering, content-based algorithms, and hybrid approaches. Features real-time recommendations, user preference learning, and comprehensive movie database integration with 150+ GitHub stars.",
            image: "/projects/ai-movie-recommender.jpg",
            tags: ["Python", "Machine Learning", "Collaborative Filtering", "Pandas", "Scikit-learn", "Flask", "React", "MongoDB"],
            github: "https://github.com/MuhammadKhan148/AIMovieRecommender",
            demo: "https://ai-movie-recommender.demo.com",
            featured: true,
        },
        {
            id: "2",
            title: "Emotion-Aware Conversational AI",
            description: "Real-time chatbot system that performs sentiment analysis and adapts responses based on user emotional state. Serves tailored content with <200ms latency for 500+ concurrent users using advanced NLP and emotion recognition algorithms.",
            image: "/projects/conversational-ai.jpg",
            tags: ["Python", "PyTorch", "NLTK", "Socket.IO", "Real-time", "Sentiment Analysis", "NLP", "WebSockets"],
            github: "https://github.com/MuhammadKhan148/emotion-aware-ai",
            demo: "https://conversational-ai.demo.com",
            featured: true,
        },
        {
            id: "3",
            title: "Python Chess Engine",
            description: "Sophisticated chess engine featuring advanced AI opponent with minimax algorithm, alpha-beta pruning, move validation, interactive GUI, and comprehensive game analysis. Supports multiple difficulty levels and learning modes.",
            image: "/projects/chess-engine.jpg",
            tags: ["Python", "AI Algorithms", "Minimax", "Game Development", "Pygame", "Object-Oriented Design"],
            github: "https://github.com/MuhammadKhan148/python-chess-engine",
            demo: "https://chess-engine.demo.com",
            featured: true,
        },
        {
            id: "4",
            title: "E-Commerce Platform with AI Recommendations",
            description: "Full-stack e-commerce solution with integrated AI-powered product recommendations, real-time inventory management, payment processing, and advanced analytics dashboard. Serves 10K+ monthly active users.",
            image: "/projects/ecommerce-ai.jpg",
            tags: ["MERN Stack", "AI Recommendations", "Stripe", "Redux", "MongoDB", "AWS", "Docker"],
            github: "https://github.com/MuhammadKhan148/ecommerce-ai",
            demo: "https://ecommerce-ai.demo.com",
            featured: true,
        },
        {
            id: "5",
            title: "Real-Time Collaboration Platform",
            description: "Slack-inspired collaboration platform with real-time messaging, file sharing, video calls, screen sharing, and team management. Built for distributed teams with end-to-end encryption and scalable architecture.",
            image: "/projects/collaboration-platform.jpg",
            tags: ["React", "Node.js", "Socket.IO", "WebRTC", "MongoDB", "Redis", "JWT"],
            github: "https://github.com/MuhammadKhan148/collaboration-platform",
            demo: "https://collaboration.demo.com",
            featured: false,
        },
        {
            id: "6",
            title: "Smart IoT Home Automation",
            description: "IoT-based home automation system with mobile app control, voice commands, automated scheduling, energy monitoring, and machine learning-powered usage optimization.",
            image: "/projects/iot-home.jpg",
            tags: ["IoT", "React Native", "Python", "MQTT", "Raspberry Pi", "TensorFlow", "Firebase"],
            github: "https://github.com/MuhammadKhan148/iot-home-automation",
            demo: "https://iot-home.demo.com",
            featured: false,
        },
    ])

    const [skills, setSkills] = useState<Skill[]>([
        // Programming Languages (Maxed Out)
        { id: "1", name: "Python", category: "Programming Languages", level: 5 },
        { id: "2", name: "JavaScript", category: "Programming Languages", level: 5 },
        { id: "3", name: "TypeScript", category: "Programming Languages", level: 5 },
        { id: "4", name: "Java", category: "Programming Languages", level: 4 },
        { id: "5", name: "C++", category: "Programming Languages", level: 5 },
        { id: "6", name: "C", category: "Programming Languages", level: 5 },
        { id: "7", name: "C#", category: "Programming Languages", level: 4 },
        { id: "8", name: "PHP", category: "Programming Languages", level: 4 },
        { id: "9", name: "Go", category: "Programming Languages", level: 3 },
        { id: "10", name: "Rust", category: "Programming Languages", level: 3 },
        { id: "11", name: "Kotlin", category: "Programming Languages", level: 3 },
        { id: "12", name: "Swift", category: "Programming Languages", level: 3 },
        { id: "13", name: "Dart", category: "Programming Languages", level: 4 },
        { id: "14", name: "SQL", category: "Programming Languages", level: 5 },
        { id: "15", name: "R", category: "Programming Languages", level: 3 },

        // AI/ML & Data Science (Expert Level)
        { id: "16", name: "Machine Learning", category: "AI/ML", level: 5 },
        { id: "17", name: "Deep Learning", category: "AI/ML", level: 5 },
        { id: "18", name: "Neural Networks", category: "AI/ML", level: 5 },
        { id: "19", name: "TensorFlow", category: "AI/ML", level: 5 },
        { id: "20", name: "PyTorch", category: "AI/ML", level: 5 },
        { id: "21", name: "Scikit-learn", category: "AI/ML", level: 5 },
        { id: "22", name: "Keras", category: "AI/ML", level: 5 },
        { id: "23", name: "OpenCV", category: "AI/ML", level: 4 },
        { id: "24", name: "Pandas", category: "AI/ML", level: 5 },
        { id: "25", name: "NumPy", category: "AI/ML", level: 5 },
        { id: "26", name: "Matplotlib", category: "AI/ML", level: 5 },
        { id: "27", name: "Seaborn", category: "AI/ML", level: 4 },
        { id: "28", name: "Plotly", category: "AI/ML", level: 4 },
        { id: "29", name: "NLTK", category: "AI/ML", level: 5 },
        { id: "30", name: "spaCy", category: "AI/ML", level: 4 },
        { id: "31", name: "Hugging Face", category: "AI/ML", level: 4 },
        { id: "32", name: "Computer Vision", category: "AI/ML", level: 4 },
        { id: "33", name: "NLP", category: "AI/ML", level: 5 },
        { id: "34", name: "Sentiment Analysis", category: "AI/ML", level: 5 },
        { id: "35", name: "Recommender Systems", category: "AI/ML", level: 5 },
        { id: "36", name: "Time Series Analysis", category: "AI/ML", level: 4 },
        { id: "37", name: "Statistical Analysis", category: "AI/ML", level: 4 },
        { id: "38", name: "Data Mining", category: "AI/ML", level: 4 },
        { id: "39", name: "Feature Engineering", category: "AI/ML", level: 5 },
        { id: "40", name: "Model Deployment", category: "AI/ML", level: 4 },

        // Frontend Technologies (Complete Stack)
        { id: "41", name: "React", category: "Frontend", level: 5 },
        { id: "42", name: "Next.js", category: "Frontend", level: 5 },
        { id: "43", name: "Vue.js", category: "Frontend", level: 4 },
        { id: "44", name: "Angular", category: "Frontend", level: 4 },
        { id: "45", name: "Svelte", category: "Frontend", level: 3 },
        { id: "46", name: "HTML5", category: "Frontend", level: 5 },
        { id: "47", name: "CSS3", category: "Frontend", level: 5 },
        { id: "48", name: "SCSS/Sass", category: "Frontend", level: 5 },
        { id: "49", name: "Less", category: "Frontend", level: 4 },
        { id: "50", name: "Tailwind CSS", category: "Frontend", level: 5 },
        { id: "51", name: "Bootstrap", category: "Frontend", level: 5 },
        { id: "52", name: "Material-UI", category: "Frontend", level: 5 },
        { id: "53", name: "Ant Design", category: "Frontend", level: 4 },
        { id: "54", name: "Chakra UI", category: "Frontend", level: 4 },
        { id: "55", name: "Redux", category: "Frontend", level: 5 },
        { id: "56", name: "Zustand", category: "Frontend", level: 4 },
        { id: "57", name: "Context API", category: "Frontend", level: 5 },
        { id: "58", name: "React Query", category: "Frontend", level: 4 },
        { id: "59", name: "SWR", category: "Frontend", level: 4 },
        { id: "60", name: "Webpack", category: "Frontend", level: 4 },
        { id: "61", name: "Vite", category: "Frontend", level: 4 },
        { id: "62", name: "Parcel", category: "Frontend", level: 3 },
        { id: "63", name: "ESLint", category: "Frontend", level: 5 },
        { id: "64", name: "Prettier", category: "Frontend", level: 5 },
        { id: "65", name: "Jest", category: "Frontend", level: 4 },
        { id: "66", name: "React Testing Library", category: "Frontend", level: 4 },
        { id: "67", name: "Cypress", category: "Frontend", level: 3 },
        { id: "68", name: "Storybook", category: "Frontend", level: 3 },

        // Mobile Development
        { id: "69", name: "React Native", category: "Mobile", level: 5 },
        { id: "70", name: "Flutter", category: "Mobile", level: 5 },
        { id: "71", name: "Expo", category: "Mobile", level: 4 },
        { id: "72", name: "Ionic", category: "Mobile", level: 3 },
        { id: "73", name: "Xamarin", category: "Mobile", level: 3 },
        { id: "74", name: "Android Studio", category: "Mobile", level: 4 },
        { id: "75", name: "Xcode", category: "Mobile", level: 3 },
        { id: "76", name: "Firebase SDK", category: "Mobile", level: 5 },
        { id: "77", name: "App Store Deployment", category: "Mobile", level: 4 },
        { id: "78", name: "Google Play Deployment", category: "Mobile", level: 4 },

        // Backend Technologies (Server-Side Mastery)
        { id: "79", name: "Node.js", category: "Backend", level: 5 },
        { id: "80", name: "Express.js", category: "Backend", level: 5 },
        { id: "81", name: "Fastify", category: "Backend", level: 4 },
        { id: "82", name: "Koa.js", category: "Backend", level: 3 },
        { id: "83", name: "Django", category: "Backend", level: 4 },
        { id: "84", name: "Flask", category: "Backend", level: 5 },
        { id: "85", name: "FastAPI", category: "Backend", level: 4 },
        { id: "86", name: "Spring Boot", category: "Backend", level: 3 },
        { id: "87", name: "Laravel", category: "Backend", level: 4 },
        { id: "88", name: "ASP.NET Core", category: "Backend", level: 3 },
        { id: "89", name: "Ruby on Rails", category: "Backend", level: 3 },
        { id: "90", name: "GraphQL", category: "Backend", level: 4 },
        { id: "91", name: "REST APIs", category: "Backend", level: 5 },
        { id: "92", name: "gRPC", category: "Backend", level: 3 },
        { id: "93", name: "WebSockets", category: "Backend", level: 5 },
        { id: "94", name: "Socket.IO", category: "Backend", level: 5 },
        { id: "95", name: "Server-Sent Events", category: "Backend", level: 4 },
        { id: "96", name: "Microservices", category: "Backend", level: 4 },
        { id: "97", name: "API Gateway", category: "Backend", level: 3 },
        { id: "98", name: "Event-Driven Architecture", category: "Backend", level: 4 },

        // Databases (All Types)
        { id: "99", name: "MongoDB", category: "Database", level: 5 },
        { id: "100", name: "PostgreSQL", category: "Database", level: 5 },
        { id: "101", name: "MySQL", category: "Database", level: 5 },
        { id: "102", name: "SQLite", category: "Database", level: 5 },
        { id: "103", name: "Redis", category: "Database", level: 5 },
        { id: "104", name: "Elasticsearch", category: "Database", level: 4 },
        { id: "105", name: "Firebase Firestore", category: "Database", level: 5 },
        { id: "106", name: "DynamoDB", category: "Database", level: 3 },
        { id: "107", name: "Cassandra", category: "Database", level: 3 },
        { id: "108", name: "Neo4j", category: "Database", level: 3 },
        { id: "109", name: "InfluxDB", category: "Database", level: 3 },
        { id: "110", name: "Database Design", category: "Database", level: 5 },
        { id: "111", name: "Query Optimization", category: "Database", level: 4 },
        { id: "112", name: "Database Administration", category: "Database", level: 4 },

        // Cloud & DevOps (Infrastructure Mastery)
        { id: "113", name: "AWS", category: "Cloud/DevOps", level: 5 },
        { id: "114", name: "Google Cloud", category: "Cloud/DevOps", level: 4 },
        { id: "115", name: "Azure", category: "Cloud/DevOps", level: 4 },
        { id: "116", name: "Digital Ocean", category: "Cloud/DevOps", level: 4 },
        { id: "117", name: "Heroku", category: "Cloud/DevOps", level: 5 },
        { id: "118", name: "Netlify", category: "Cloud/DevOps", level: 5 },
        { id: "119", name: "Vercel", category: "Cloud/DevOps", level: 5 },
        { id: "120", name: "Docker", category: "Cloud/DevOps", level: 5 },
        { id: "121", name: "Kubernetes", category: "Cloud/DevOps", level: 4 },
        { id: "122", name: "Docker Compose", category: "Cloud/DevOps", level: 5 },
        { id: "123", name: "GitHub Actions", category: "Cloud/DevOps", level: 5 },
        { id: "124", name: "GitLab CI/CD", category: "Cloud/DevOps", level: 4 },
        { id: "125", name: "Jenkins", category: "Cloud/DevOps", level: 4 },
        { id: "126", name: "CircleCI", category: "Cloud/DevOps", level: 3 },
        { id: "127", name: "Terraform", category: "Cloud/DevOps", level: 3 },
        { id: "128", name: "Ansible", category: "Cloud/DevOps", level: 3 },
        { id: "129", name: "Nginx", category: "Cloud/DevOps", level: 4 },
        { id: "130", name: "Apache", category: "Cloud/DevOps", level: 4 },
        { id: "131", name: "Load Balancing", category: "Cloud/DevOps", level: 4 },
        { id: "132", name: "CDN", category: "Cloud/DevOps", level: 4 },
        { id: "133", name: "Monitoring", category: "Cloud/DevOps", level: 4 },
        { id: "134", name: "Logging", category: "Cloud/DevOps", level: 4 },

        // Version Control & Tools
        { id: "135", name: "Git", category: "Tools", level: 5 },
        { id: "136", name: "GitHub", category: "Tools", level: 5 },
        { id: "137", name: "GitLab", category: "Tools", level: 4 },
        { id: "138", name: "Bitbucket", category: "Tools", level: 4 },
        { id: "139", name: "VS Code", category: "Tools", level: 5 },
        { id: "140", name: "WebStorm", category: "Tools", level: 4 },
        { id: "141", name: "PyCharm", category: "Tools", level: 5 },
        { id: "142", name: "IntelliJ IDEA", category: "Tools", level: 4 },
        { id: "143", name: "Postman", category: "Tools", level: 5 },
        { id: "144", name: "Insomnia", category: "Tools", level: 4 },
        { id: "145", name: "Figma", category: "Tools", level: 4 },
        { id: "146", name: "Adobe XD", category: "Tools", level: 3 },
        { id: "147", name: "Sketch", category: "Tools", level: 3 },
        { id: "148", name: "Notion", category: "Tools", level: 5 },
        { id: "149", name: "Jira", category: "Tools", level: 4 },
        { id: "150", name: "Trello", category: "Tools", level: 4 },

        // Operating Systems & System Administration
        { id: "151", name: "Linux", category: "System Admin", level: 5 },
        { id: "152", name: "Ubuntu", category: "System Admin", level: 5 },
        { id: "153", name: "CentOS", category: "System Admin", level: 4 },
        { id: "154", name: "Windows Server", category: "System Admin", level: 4 },
        { id: "155", name: "macOS", category: "System Admin", level: 4 },
        { id: "156", name: "Shell Scripting", category: "System Admin", level: 5 },
        { id: "157", name: "Bash", category: "System Admin", level: 5 },
        { id: "158", name: "PowerShell", category: "System Admin", level: 4 },
        { id: "159", name: "System Monitoring", category: "System Admin", level: 4 },
        { id: "160", name: "Performance Tuning", category: "System Admin", level: 4 },

        // Security & Authentication
        { id: "161", name: "JWT", category: "Security", level: 5 },
        { id: "162", name: "OAuth", category: "Security", level: 5 },
        { id: "163", name: "Auth0", category: "Security", level: 4 },
        { id: "164", name: "Firebase Auth", category: "Security", level: 5 },
        { id: "165", name: "HTTPS/SSL", category: "Security", level: 5 },
        { id: "166", name: "Security Best Practices", category: "Security", level: 5 },
        { id: "167", name: "API Security", category: "Security", level: 4 },
        { id: "168", name: "Input Validation", category: "Security", level: 5 },
        { id: "169", name: "CORS", category: "Security", level: 5 },
        { id: "170", name: "XSS Prevention", category: "Security", level: 4 },

        // Testing & Quality Assurance
        { id: "171", name: "Unit Testing", category: "Testing", level: 5 },
        { id: "172", name: "Integration Testing", category: "Testing", level: 4 },
        { id: "173", name: "E2E Testing", category: "Testing", level: 4 },
        { id: "174", name: "Test-Driven Development", category: "Testing", level: 4 },
        { id: "175", name: "Behavior-Driven Development", category: "Testing", level: 3 },
        { id: "176", name: "Performance Testing", category: "Testing", level: 4 },
        { id: "177", name: "Load Testing", category: "Testing", level: 3 },
        { id: "178", name: "Security Testing", category: "Testing", level: 3 },

        // Soft Skills & Methodologies
        { id: "179", name: "Agile/Scrum", category: "Methodologies", level: 5 },
        { id: "180", name: "Kanban", category: "Methodologies", level: 4 },
        { id: "181", name: "DevOps Culture", category: "Methodologies", level: 4 },
        { id: "182", name: "Code Review", category: "Methodologies", level: 5 },
        { id: "183", name: "Pair Programming", category: "Methodologies", level: 4 },
        { id: "184", name: "Technical Documentation", category: "Methodologies", level: 5 },
        { id: "185", name: "Project Management", category: "Methodologies", level: 4 },
        { id: "186", name: "Team Leadership", category: "Methodologies", level: 4 },
        { id: "187", name: "Mentoring", category: "Methodologies", level: 5 },
        { id: "188", name: "Problem Solving", category: "Methodologies", level: 5 },
        { id: "189", name: "Critical Thinking", category: "Methodologies", level: 5 },
        { id: "190", name: "Communication", category: "Methodologies", level: 5 },
    ])

    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: "1",
            name: "Sarah Johnson",
            role: "Startup Founder & CEO",
            content: "Muhammad delivered an exceptional emotion-aware chatbot that completely transformed our customer engagement metrics. His deep technical expertise in AI, attention to detail, and ability to deliver complex solutions on time are remarkable. The system he built increased our user satisfaction by 40%. 100% recommend for any AI/ML project!",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            id: "2",
            name: "Michael Chen",
            role: "Product Manager at TechCorp",
            content: "Working with Muhammad was seamless and professional. He delivered a complex recommendation system ahead of schedule with impressive performance metrics. His code quality, documentation, and communication skills are top-notch. The recommendation engine he built improved our platform's user engagement by 35% within the first month.",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            id: "3",
            name: "Dr. Emily Rodriguez",
            role: "Faculty - FAST-NUCES",
            content: "Muhammad is an exceptional lab demonstrator who goes above and beyond for his students. His automated grading system and innovative teaching approach have significantly improved our programming fundamentals course. Students consistently rate him 5/5 for his clear explanations and helpful mentoring.",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            id: "4",
            name: "Alex Kumar",
            role: "CTO at DataFlow Solutions",
            content: "Muhammad's AI/ML expertise is outstanding. He built us a real-time analytics dashboard with machine learning predictions that gave us a competitive edge. His ability to translate complex requirements into elegant technical solutions is impressive. Highly recommended for enterprise-level projects.",
            avatar: "/placeholder.svg?height=60&width=60",
        },
        {
            id: "5",
            name: "Lisa Wang",
            role: "Mobile App Entrepreneur",
            content: "Hired Muhammad for a complex Flutter app with AI features. He delivered beyond expectations with clean code, beautiful UI, and powerful ML integration. The app now has 50K+ downloads with 4.8/5 rating. His expertise in both mobile development and AI made all the difference.",
            avatar: "/placeholder.svg?height=60&width=60",
        },
    ])

    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        siteTitle: "Muhammad Abdullah Khan - AI/ML Engineer & Full-Stack Developer",
        metaDescription: "AI/ML Engineer & Full-Stack Developer with 6+ years experience. Specializing in emotion-aware systems, conversational AI, and scalable applications. 100% ★5 freelance record with 50+ completed projects.",
        googleAnalyticsId: "",
        contactFormEmail: "muhammad.mak252@gmail.com",
        theme: "emerald",
        darkMode: false,
        analytics: true,
    })

    // Load saved data from localStorage on mount
    useEffect(() => {
        // Load saved data from localStorage if exists
        const savedData = localStorage.getItem("portfolioAdminData")
        if (savedData) {
            try {
                const data = JSON.parse(savedData)
                if (data.personalInfo) setPersonalInfo(data.personalInfo)
                if (data.experiences) setExperiences(data.experiences)
                if (data.projects) setProjects(data.projects)
                if (data.skills) setSkills(data.skills)
                if (data.testimonials) setTestimonials(data.testimonials)
                if (data.siteSettings) setSiteSettings(data.siteSettings)
            } catch (error) {
                console.log("No saved data found, using defaults")
            }
        }

        setIsLoading(false)
    }, [])

    // Auto-save to localStorage when data changes
    useEffect(() => {
        if (!isLoading) {
            const data = {
                personalInfo,
                experiences,
                projects,
                skills,
                testimonials,
                siteSettings,
                lastUpdated: new Date().toISOString()
            }
            localStorage.setItem("portfolioAdminData", JSON.stringify(data))
        }
    }, [personalInfo, experiences, projects, skills, testimonials, siteSettings, isLoading])



    // Drag and drop functionality
    const handleDragStart = (e: React.DragEvent, id: string, type: string) => {
        setDraggedItem(`${type}-${id}`)
        e.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (e: React.DragEvent, targetId: string, type: string) => {
        e.preventDefault()
        if (!draggedItem) return

        const [draggedType, draggedId] = draggedItem.split("-")
        if (draggedType !== type || draggedId === targetId) return

        if (type === "experience") {
            const items = [...experiences]
            const draggedIndex = items.findIndex((item) => item.id === draggedId)
            const targetIndex = items.findIndex((item) => item.id === targetId)

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const [draggedExperience] = items.splice(draggedIndex, 1)
                items.splice(targetIndex, 0, draggedExperience)
                setExperiences(items)
                setHasUnsavedChanges(true)
            }
        } else if (type === "project") {
            const items = [...projects]
            const draggedIndex = items.findIndex((item) => item.id === draggedId)
            const targetIndex = items.findIndex((item) => item.id === targetId)

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const [draggedProject] = items.splice(draggedIndex, 1)
                items.splice(targetIndex, 0, draggedProject)
                setProjects(items)
                setHasUnsavedChanges(true)
            }
        }

        setDraggedItem(null)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // GitHub API configuration
            const GITHUB_TOKEN = localStorage.getItem('githubToken')
            const REPO_OWNER = 'MuhammadKhan148'
            const REPO_NAME = 'portfolio'
            const BRANCH = 'main'

            if (!GITHUB_TOKEN) {
                const token = prompt(`To save directly to GitHub, please enter your GitHub Personal Access Token (PAT):\n\n1. Go to: https://github.com/settings/tokens\n2. Click "Generate new token (classic)"\n3. Select "repo" scope\n4. Copy and paste the token here:\n\nNote: Token will be saved locally for future use.`)
                if (!token) {
                    alert('❌ GitHub token required for direct saving. Using localStorage only.')
                    setIsSaving(false)
                    return
                }
                localStorage.setItem('githubToken', token)
            }

            const token = localStorage.getItem('githubToken')

            // Generate portfolio.md content
            const portfolioContent = `---
name: "${personalInfo.name}"
title: "${personalInfo.title}"
bio: "${personalInfo.bio}"
availability_status: "${personalInfo.availability}"
profile_image: "${personalInfo.avatar}"
resume: "/files/resume.pdf"
github: "${personalInfo.github}"
linkedin: "${personalInfo.linkedin}"
email: "${personalInfo.email}"
experience:
${experiences.map(exp => `  - title: "${exp.title}"
    company: "${exp.company}"
    duration: "${exp.period}"
    location: "${exp.location}"
    description: "${exp.description}"
    achievements:
${exp.achievements.map(ach => `      - "${ach}"`).join('\n')}`).join('\n')}
skills:
  ai_ml:
${skills.filter(s => s.category === 'AI/ML').map(s => `    - "${s.name}"`).join('\n')}
  frontend:
${skills.filter(s => s.category === 'Frontend').map(s => `    - "${s.name}"`).join('\n')}
  backend:
${skills.filter(s => s.category === 'Backend').map(s => `    - "${s.name}"`).join('\n')}
  devops:
${skills.filter(s => s.category === 'DevOps').map(s => `    - "${s.name}"`).join('\n')}
stats:
  projects: "${personalInfo.projectsCompleted}+"
  rating: "100%"
  specialty: "AI/ML Specialist"
  type: "Full-Stack Developer"
  approach: "Research-Oriented"
  quality: "Clean Code"
  role: "Lab Demonstrator"
achievements:
  open_source: "24 public repositories with flagship AIMovieRecommender ⭐150+"
  competitions: "1st Place – FAST Marathon; Winner – Twin-City Swimming; Finalist – National Critical-Thinking Tournament"
  innovation: "Emotion-aware UX adopted by two client startups"
---`

            // Get current file SHA for portfolio.md
            const portfolioFileResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/portfolio.md`, {
                headers: { 'Authorization': `token ${token}` }
            })

            let portfolioSha = ''
            if (portfolioFileResponse.ok) {
                const portfolioFileData = await portfolioFileResponse.json()
                portfolioSha = portfolioFileData.sha
            }

            // Update portfolio.md
            const updatePortfolioResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/portfolio.md`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update portfolio data via admin panel',
                    content: btoa(unescape(encodeURIComponent(portfolioContent))),
                    sha: portfolioSha,
                    branch: BRANCH
                })
            })

            if (!updatePortfolioResponse.ok) {
                throw new Error('Failed to update portfolio.md')
            }

            // Update project files
            for (const project of projects) {
                const fileName = project.title.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '') + '.md'

                const projectContent = `---
title: "${project.title}"
description: "${project.description}"
image: "${project.image}"
tags: 
${project.tags.map(tag => `  - "${tag}"`).join('\n')}
github: "${project.github}"
demo: "${project.demo}"
featured: ${project.featured}
status: "Completed"
year: "2024"
---

# ${project.title}

${project.description}

## Key Features

- Advanced functionality and performance optimization
- Modern architecture and best practices
- Comprehensive testing and documentation
- Production-ready deployment

## Technical Stack

${project.tags.map(tag => `- **${tag}**: Core technology component`).join('\n')}

## Links

- [GitHub Repository](${project.github})
- [Live Demo](${project.demo})
`

                // Get current file SHA
                const projectFileResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/projects/${fileName}`, {
                    headers: { 'Authorization': `token ${token}` }
                })

                let projectSha = ''
                if (projectFileResponse.ok) {
                    const projectFileData = await projectFileResponse.json()
                    projectSha = projectFileData.sha
                }

                // Update project file
                await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/projects/${fileName}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: `Update ${project.title} project via admin panel`,
                        content: btoa(unescape(encodeURIComponent(projectContent))),
                        sha: projectSha,
                        branch: BRANCH
                    })
                })
            }

            const data = {
                personalInfo,
                experiences,
                projects,
                skills,
                testimonials,
                siteSettings,
                lastUpdated: new Date().toISOString()
            }

            // Also save to localStorage as backup
            localStorage.setItem("portfolioAdminData", JSON.stringify(data))
            setHasUnsavedChanges(false)

            alert("✅ Portfolio saved successfully to GitHub! Netlify will auto-deploy in 2-3 minutes.")
        } catch (error: any) {
            console.error('Save error:', error)
            if (error.message?.includes('Bad credentials')) {
                localStorage.removeItem('githubToken')
                alert("❌ Invalid GitHub token. Please try again with a valid token.")
            } else {
                alert("❌ Failed to save portfolio. Please check your GitHub token and try again.")
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handlePublish = async () => {
        await handleSave()
        alert("🚀 Portfolio published! Changes are now live and will be deployed automatically.")
    }

    const handleExportMarkdown = () => {
        // Generate portfolio.md content
        const portfolioContent = `---
name: "${personalInfo.name}"
title: "${personalInfo.title}"
bio: "${personalInfo.bio}"
availability_status: "${personalInfo.availability}"
profile_image: "${personalInfo.avatar}"
resume: "/files/resume.pdf"
github: "${personalInfo.github}"
linkedin: "${personalInfo.linkedin}"
email: "${personalInfo.email}"
experience:
${experiences.map(exp => `  - title: "${exp.title}"
    company: "${exp.company}"
    duration: "${exp.period}"
    location: "${exp.location}"
    description: "${exp.description}"
    achievements:
${exp.achievements.map(ach => `      - "${ach}"`).join('\n')}`).join('\n')}
skills:
  ai_ml:
${skills.filter(s => s.category === 'AI/ML').map(s => `    - "${s.name}"`).join('\n')}
  frontend:
${skills.filter(s => s.category === 'Frontend').map(s => `    - "${s.name}"`).join('\n')}
  backend:
${skills.filter(s => s.category === 'Backend').map(s => `    - "${s.name}"`).join('\n')}
  devops:
${skills.filter(s => s.category === 'DevOps').map(s => `    - "${s.name}"`).join('\n')}
stats:
  projects: "${personalInfo.projectsCompleted}+"
  rating: "100%"
  specialty: "AI/ML Specialist"
  type: "Full-Stack Developer"
  approach: "Research-Oriented"
  quality: "Clean Code"
  role: "Lab Demonstrator"
achievements:
  open_source: "24 public repositories with flagship AIMovieRecommender ⭐150+"
  competitions: "1st Place – FAST Marathon; Winner – Twin-City Swimming; Finalist – National Critical-Thinking Tournament"
  innovation: "Emotion-aware UX adopted by two client startups"
---`

        // Create and download the file
        const blob = new Blob([portfolioContent], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'portfolio.md'
        a.click()
        URL.revokeObjectURL(url)

        alert("Portfolio markdown exported! Replace your content/portfolio.md file with this download.")
    }

    const handleImageUpload = (file: File, type: string, id?: string) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            if (type === "avatar") {
                setPersonalInfo((prev) => ({ ...prev, avatar: result }))
            } else if (type === "project" && id) {
                setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, image: result } : p)))
            } else if (type === "testimonial" && id) {
                setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, avatar: result } : t)))
            }
            setHasUnsavedChanges(true)
        }
        reader.readAsDataURL(file)
    }

    // Preview Mode
    if (isPreviewMode) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <div className="fixed top-4 right-4 z-50 flex gap-2">
                    <Button onClick={() => setIsPreviewMode(false)} variant="outline">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit Mode
                    </Button>
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Monitor className="h-24 w-24 mx-auto mb-4 text-emerald-600" />
                        <h2 className="text-2xl font-bold mb-2">Portfolio Preview</h2>
                        <p className="text-slate-600 mb-4">This would show your live portfolio with current data</p>
                        <Button onClick={() => setIsPreviewMode(false)}>Back to Editor</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Admin Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Settings className="h-6 w-6 text-emerald-600" />
                                <div className="absolute inset-0 bg-emerald-600/20 rounded-full blur-xl" />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Portfolio Admin
                            </h1>
                        </div>
                        {hasUnsavedChanges && (
                            <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse" />
                                Unsaved Changes
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="preview-mode" className="text-sm font-medium">
                                Preview
                            </Label>
                            <Switch id="preview-mode" checked={isPreviewMode} onCheckedChange={setIsPreviewMode} />
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges || isSaving}
                            variant="outline"
                            className="border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? "Saving..." : "Save Draft"}
                        </Button>
                        <Button
                            onClick={handlePublish}
                            disabled={isSaving}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                            {isSaving ? "Publishing..." : "Publish Live"}
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/" target="_blank" rel="noreferrer">
                                <Eye className="mr-2 h-4 w-4" />
                                View Site
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container py-8 px-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-6 lg:grid-cols-7 lg:w-fit">
                        <TabsTrigger value="personal" isActive={activeTab === "personal"} onClick={setActiveTab}>
                            <User className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Personal</span>
                        </TabsTrigger>
                        <TabsTrigger value="experience" isActive={activeTab === "experience"} onClick={setActiveTab}>
                            <Briefcase className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Experience</span>
                        </TabsTrigger>
                        <TabsTrigger value="skills" isActive={activeTab === "skills"} onClick={setActiveTab}>
                            <Code className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Skills</span>
                        </TabsTrigger>
                        <TabsTrigger value="projects" isActive={activeTab === "projects"} onClick={setActiveTab}>
                            <FolderOpen className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Projects</span>
                        </TabsTrigger>
                        <TabsTrigger value="github" isActive={activeTab === "github"} onClick={setActiveTab}>
                            <Github className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">GitHub</span>
                        </TabsTrigger>
                        <TabsTrigger value="testimonials" isActive={activeTab === "testimonials"} onClick={setActiveTab}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Testimonials</span>
                        </TabsTrigger>
                        <TabsTrigger value="settings" isActive={activeTab === "settings"} onClick={setActiveTab}>
                            <Palette className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Settings</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Personal Information Tab */}
                    <TabsContent value="personal" activeValue={activeTab}>
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-emerald-600" />
                                    <span>Personal Information</span>
                                </CardTitle>
                                <CardDescription>Update your basic information and contact details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={personalInfo.name}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, name: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="title">Professional Title</Label>
                                            <Input
                                                id="title"
                                                value={personalInfo.title}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, title: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={personalInfo.email}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="availability">Availability Status</Label>
                                            <Input
                                                id="availability"
                                                value={personalInfo.availability}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, availability: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="available-work"
                                                checked={personalInfo.availableForWork}
                                                onCheckedChange={(checked) => {
                                                    setPersonalInfo((prev) => ({ ...prev, availableForWork: checked }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                            <Label htmlFor="available-work">Available for work</Label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={personalInfo.bio}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, bio: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1 min-h-[120px]"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="projects-count">Projects Completed</Label>
                                                <Input
                                                    id="projects-count"
                                                    type="number"
                                                    value={personalInfo.projectsCompleted}
                                                    onChange={(e) => {
                                                        setPersonalInfo((prev) => ({ ...prev, projectsCompleted: Number.parseInt(e.target.value) }))
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="years-experience">Years Experience</Label>
                                                <Input
                                                    id="years-experience"
                                                    type="number"
                                                    value={personalInfo.yearsExperience}
                                                    onChange={(e) => {
                                                        setPersonalInfo((prev) => ({ ...prev, yearsExperience: Number.parseInt(e.target.value) }))
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="github">GitHub URL</Label>
                                            <Input
                                                id="github"
                                                value={personalInfo.github}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, github: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="linkedin">LinkedIn URL</Label>
                                            <Input
                                                id="linkedin"
                                                value={personalInfo.linkedin}
                                                onChange={(e) => {
                                                    setPersonalInfo((prev) => ({ ...prev, linkedin: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label>Profile Picture</Label>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <Image
                                            src={personalInfo.avatar || "/placeholder.svg"}
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="rounded-full border-2 border-emerald-200"
                                        />
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(file, "avatar")
                                                }}
                                                className="hidden"
                                                id="avatar-upload"
                                            />
                                            <Button variant="outline" asChild>
                                                <label htmlFor="avatar-upload" className="cursor-pointer">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload New Photo
                                                </label>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Experience Tab */}
                    <TabsContent value="experience" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Work Experience</h2>
                                <p className="text-slate-600">Manage your professional experience. Drag to reorder.</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newExp: Experience = {
                                        id: Date.now().toString(),
                                        title: "New Position",
                                        company: "Company Name",
                                        period: "2024 - Present",
                                        location: "Location",
                                        description: "Job description...",
                                        achievements: ["Achievement 1"],
                                    }
                                    setExperiences((prev) => [newExp, ...prev])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Experience
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {experiences.map((exp, index) => (
                                <Card
                                    key={exp.id}
                                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, exp.id, "experience")}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, exp.id, "experience")}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <GripVertical className="h-5 w-5 text-slate-400" />
                                                <span className="text-sm text-slate-500">#{index + 1}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setExperiences((prev) => prev.filter((e) => e.id !== exp.id))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <Label>Job Title</Label>
                                                <Input
                                                    value={exp.title}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, title: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Company</Label>
                                                <Input
                                                    value={exp.company}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, company: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Period</Label>
                                                <Input
                                                    value={exp.period}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, period: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Location</Label>
                                                <Input
                                                    value={exp.location}
                                                    onChange={(e) => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) => (item.id === exp.id ? { ...item, location: e.target.value } : item)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={exp.description}
                                                onChange={(e) => {
                                                    setExperiences((prev) =>
                                                        prev.map((item) => (item.id === exp.id ? { ...item, description: e.target.value } : item)),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <Label>Achievements</Label>
                                            <div className="space-y-2 mt-2">
                                                {exp.achievements.map((achievement, achIndex) => (
                                                    <div key={achIndex} className="flex items-center space-x-2">
                                                        <Input
                                                            value={achievement}
                                                            onChange={(e) => {
                                                                setExperiences((prev) =>
                                                                    prev.map((item) =>
                                                                        item.id === exp.id
                                                                            ? {
                                                                                ...item,
                                                                                achievements: item.achievements.map((ach, i) =>
                                                                                    i === achIndex ? e.target.value : ach,
                                                                                ),
                                                                            }
                                                                            : item,
                                                                    ),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                            className="flex-1"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setExperiences((prev) =>
                                                                    prev.map((item) =>
                                                                        item.id === exp.id
                                                                            ? {
                                                                                ...item,
                                                                                achievements: item.achievements.filter((_, i) => i !== achIndex),
                                                                            }
                                                                            : item,
                                                                    ),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setExperiences((prev) =>
                                                            prev.map((item) =>
                                                                item.id === exp.id
                                                                    ? { ...item, achievements: [...item.achievements, "New achievement"] }
                                                                    : item,
                                                            ),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Achievement
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Skills Tab */}
                    <TabsContent value="skills" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Skills</h2>
                                <p className="text-slate-600">Manage your technical skills and expertise levels</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newSkill: Skill = {
                                        id: Date.now().toString(),
                                        name: "New Skill",
                                        category: "Frontend",
                                        level: 3,
                                    }
                                    setSkills((prev) => [...prev, newSkill])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Skill
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {["AI/ML", "Frontend", "Backend", "DevOps"].map((category) => (
                                <Card key={category} className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            {category === "AI/ML" && <Star className="h-5 w-5 text-purple-600" />}
                                            {category === "Frontend" && <Code className="h-5 w-5 text-emerald-600" />}
                                            {category === "Backend" && <Database className="h-5 w-5 text-teal-600" />}
                                            {category === "DevOps" && <Globe className="h-5 w-5 text-orange-600" />}
                                            <span>{category}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {skills
                                            .filter((skill) => skill.category === category)
                                            .map((skill) => (
                                                <div key={skill.id} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Input
                                                            value={skill.name}
                                                            onChange={(e) => {
                                                                setSkills((prev) =>
                                                                    prev.map((s) => (s.id === skill.id ? { ...s, name: e.target.value } : s)),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                            className="flex-1 mr-2"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSkills((prev) => prev.filter((s) => s.id !== skill.id))
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-slate-600 w-16">Level {skill.level}</span>
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="5"
                                                            value={skill.level}
                                                            onChange={(e) => {
                                                                setSkills((prev) =>
                                                                    prev.map((s) =>
                                                                        s.id === skill.id ? { ...s, level: Number.parseInt(e.target.value) } : s,
                                                                    ),
                                                                )
                                                                setHasUnsavedChanges(true)
                                                            }}
                                                            className="flex-1"
                                                        />
                                                        <div className="flex space-x-1">
                                                            {[1, 2, 3, 4, 5].map((level) => (
                                                                <Star
                                                                    key={level}
                                                                    className={`h-3 w-3 ${level <= skill.level ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Projects Tab */}
                    <TabsContent value="projects" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Projects</h2>
                                <p className="text-slate-600">Showcase your best work. Drag to reorder.</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newProject: Project = {
                                        id: Date.now().toString(),
                                        title: "New Project",
                                        description: "Project description...",
                                        image: "/placeholder.svg?height=300&width=500",
                                        tags: ["React"],
                                        github: "https://github.com",
                                        demo: "https://example.com",
                                        featured: false,
                                    }
                                    setProjects((prev) => [newProject, ...prev])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Project
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <Card
                                    key={project.id}
                                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move overflow-hidden"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, project.id, "project")}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, project.id, "project")}
                                >
                                    <div className="relative aspect-video">
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-2 right-2 flex space-x-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(file, "project", project.id)
                                                }}
                                                className="hidden"
                                                id={`project-image-${project.id}`}
                                            />
                                            <Button variant="secondary" size="sm" asChild>
                                                <label htmlFor={`project-image-${project.id}`} className="cursor-pointer">
                                                    <Upload className="h-4 w-4" />
                                                </label>
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    setProjects((prev) => prev.filter((p) => p.id !== project.id))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute top-2 left-2 flex items-center space-x-2">
                                            <GripVertical className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                                            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">#{index + 1}</span>
                                            {project.featured && (
                                                <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Input
                                                value={project.title}
                                                onChange={(e) => {
                                                    setProjects((prev) =>
                                                        prev.map((p) => (p.id === project.id ? { ...p, title: e.target.value } : p)),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="font-semibold"
                                            />
                                            <div className="flex items-center space-x-2 ml-2">
                                                <Label htmlFor={`featured-${project.id}`} className="text-sm whitespace-nowrap">
                                                    Featured
                                                </Label>
                                                <Switch
                                                    id={`featured-${project.id}`}
                                                    checked={project.featured}
                                                    onCheckedChange={(checked) => {
                                                        setProjects((prev) =>
                                                            prev.map((p) => (p.id === project.id ? { ...p, featured: checked } : p)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <Textarea
                                            value={project.description}
                                            onChange={(e) => {
                                                setProjects((prev) =>
                                                    prev.map((p) => (p.id === project.id ? { ...p, description: e.target.value } : p)),
                                                )
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="min-h-[80px]"
                                        />

                                        <div className="grid gap-2 md:grid-cols-2">
                                            <div>
                                                <Label>GitHub URL</Label>
                                                <Input
                                                    value={project.github}
                                                    onChange={(e) => {
                                                        setProjects((prev) =>
                                                            prev.map((p) => (p.id === project.id ? { ...p, github: e.target.value } : p)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Demo URL</Label>
                                                <Input
                                                    value={project.demo}
                                                    onChange={(e) => {
                                                        setProjects((prev) =>
                                                            prev.map((p) => (p.id === project.id ? { ...p, demo: e.target.value } : p)),
                                                        )
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Technologies (comma-separated)</Label>
                                            <Input
                                                value={project.tags.join(", ")}
                                                onChange={(e) => {
                                                    setProjects((prev) =>
                                                        prev.map((p) =>
                                                            p.id === project.id
                                                                ? {
                                                                    ...p,
                                                                    tags: e.target.value
                                                                        .split(",")
                                                                        .map((tag) => tag.trim())
                                                                        .filter(Boolean),
                                                                }
                                                                : p,
                                                        ),
                                                    )
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                                placeholder="React, Node.js, PostgreSQL"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* GitHub Sync Tab */}
                    <TabsContent value="github" activeValue={activeTab}>
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">GitHub Integration</h2>
                                <p className="text-slate-600">
                                    Automatically sync all your repositories to your portfolio. Set up webhooks for real-time updates.
                                </p>
                            </div>

                            <EnhancedGitHubSync
                                username="MuhammadKhan148"
                                onProjectsUpdate={(projects) => {
                                    console.log('GitHub projects updated:', projects.length)
                                }}
                            />

                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Setup Instructions</CardTitle>
                                    <CardDescription>
                                        Follow these steps to enable automatic portfolio updates
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium">1. Configure GitHub Webhook</h4>
                                        <ul className="text-sm text-slate-600 space-y-1 ml-4">
                                            <li>• Go to your GitHub repository settings</li>
                                            <li>• Navigate to "Webhooks" section</li>
                                            <li>• Click "Add webhook"</li>
                                            <li>• Set Payload URL to: <code className="bg-slate-100 px-1 rounded">/api/github-webhook</code></li>
                                            <li>• Select "Just the push event"</li>
                                            <li>• Set Content type to "application/json"</li>
                                            <li>• Click "Add webhook"</li>
                                        </ul>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium">2. Optimize Repository Display</h4>
                                        <ul className="text-sm text-slate-600 space-y-1 ml-4">
                                            <li>• Add topics like "portfolio", "project", or "featured" to your repositories</li>
                                            <li>• Write clear descriptions for your projects</li>
                                            <li>• Set homepage URLs for demo links</li>
                                            <li>• Keep repositories public for portfolio display</li>
                                        </ul>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium">3. Automatic Updates</h4>
                                        <p className="text-sm text-slate-600">
                                            Once configured, your portfolio will automatically update whenever you push to any of your repositories.
                                            The system filters repositories to show only relevant projects.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Testimonials Tab */}
                    <TabsContent value="testimonials" activeValue={activeTab}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Testimonials</h2>
                                <p className="text-slate-600">Manage client and colleague testimonials</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newTestimonial: Testimonial = {
                                        id: Date.now().toString(),
                                        name: "New Person",
                                        role: "Role at Company",
                                        content: "Testimonial content...",
                                        avatar: "/placeholder.svg?height=60&width=60",
                                    }
                                    setTestimonials((prev) => [...prev, newTestimonial])
                                    setHasUnsavedChanges(true)
                                }}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Testimonial
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id} className="border-0 shadow-lg">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    src={testimonial.avatar || "/placeholder.svg"}
                                                    alt={testimonial.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full border-2 border-emerald-200"
                                                />
                                                <div className="space-y-1 flex-1">
                                                    <Input
                                                        value={testimonial.name}
                                                        onChange={(e) => {
                                                            setTestimonials((prev) =>
                                                                prev.map((t) => (t.id === testimonial.id ? { ...t, name: e.target.value } : t)),
                                                            )
                                                            setHasUnsavedChanges(true)
                                                        }}
                                                        className="font-medium"
                                                    />
                                                    <Input
                                                        value={testimonial.role}
                                                        onChange={(e) => {
                                                            setTestimonials((prev) =>
                                                                prev.map((t) => (t.id === testimonial.id ? { ...t, role: e.target.value } : t)),
                                                            )
                                                            setHasUnsavedChanges(true)
                                                        }}
                                                        className="text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Textarea
                                            value={testimonial.content}
                                            onChange={(e) => {
                                                setTestimonials((prev) =>
                                                    prev.map((t) => (t.id === testimonial.id ? { ...t, content: e.target.value } : t)),
                                                )
                                                setHasUnsavedChanges(true)
                                            }}
                                            className="min-h-[100px]"
                                            placeholder="Testimonial content..."
                                        />

                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleImageUpload(file, "testimonial", testimonial.id)
                                                }}
                                                className="hidden"
                                                id={`testimonial-avatar-${testimonial.id}`}
                                            />
                                            <Button variant="outline" size="sm" asChild>
                                                <label htmlFor={`testimonial-avatar-${testimonial.id}`} className="cursor-pointer">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Change Avatar
                                                </label>
                                            </Button>
                                        </div>

                                        <div className="flex justify-center">
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" activeValue={activeTab}>
                        <div className="space-y-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Palette className="h-5 w-5 text-emerald-600" />
                                        <span>Site Settings</span>
                                    </CardTitle>
                                    <CardDescription>Configure your portfolio settings and preferences</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <Label>Site Title</Label>
                                            <Input
                                                value={siteSettings.siteTitle}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, siteTitle: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Meta Description</Label>
                                            <Input
                                                value={siteSettings.metaDescription}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, metaDescription: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Google Analytics ID</Label>
                                            <Input
                                                value={siteSettings.googleAnalyticsId}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, googleAnalyticsId: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                placeholder="GA-XXXXXXXXX"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Contact Form Email</Label>
                                            <Input
                                                value={siteSettings.contactFormEmail}
                                                onChange={(e) => {
                                                    setSiteSettings((prev) => ({ ...prev, contactFormEmail: e.target.value }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Theme Settings</h3>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            {[
                                                { name: "Emerald", value: "emerald", gradient: "from-emerald-400 to-teal-400" },
                                                { name: "Blue", value: "blue", gradient: "from-blue-400 to-purple-400" },
                                                { name: "Pink", value: "pink", gradient: "from-pink-400 to-rose-400" },
                                            ].map((theme) => (
                                                <div
                                                    key={theme.value}
                                                    onClick={() => {
                                                        setSiteSettings((prev) => ({ ...prev, theme: theme.value }))
                                                        setHasUnsavedChanges(true)
                                                    }}
                                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${siteSettings.theme === theme.value
                                                        ? "border-emerald-500 ring-2 ring-emerald-200"
                                                        : "border-slate-200 hover:border-slate-300"
                                                        }`}
                                                >
                                                    <div className={`w-full h-20 bg-gradient-to-r ${theme.gradient} rounded mb-2`}></div>
                                                    <p className="text-sm font-medium">
                                                        {theme.name} {siteSettings.theme === theme.value && "(Current)"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Dark Mode</h4>
                                                <p className="text-sm text-slate-600">Enable dark mode for your portfolio</p>
                                            </div>
                                            <Switch
                                                checked={siteSettings.darkMode}
                                                onCheckedChange={(checked) => {
                                                    setSiteSettings((prev) => ({ ...prev, darkMode: checked }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Analytics</h4>
                                                <p className="text-sm text-slate-600">Enable visitor analytics tracking</p>
                                            </div>
                                            <Switch
                                                checked={siteSettings.analytics}
                                                onCheckedChange={(checked) => {
                                                    setSiteSettings((prev) => ({ ...prev, analytics: checked }))
                                                    setHasUnsavedChanges(true)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>Export/Import Data</CardTitle>
                                    <CardDescription>Backup or restore your portfolio data</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex space-x-4 flex-wrap gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                const data = {
                                                    personalInfo,
                                                    experiences,
                                                    projects,
                                                    skills,
                                                    testimonials,
                                                    siteSettings,
                                                }
                                                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
                                                const url = URL.createObjectURL(blob)
                                                const a = document.createElement("a")
                                                a.href = url
                                                a.download = "portfolio-data.json"
                                                a.click()
                                                URL.revokeObjectURL(url)
                                            }}
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Export JSON
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleExportMarkdown}
                                            className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Export Portfolio.md
                                        </Button>
                                        <div>
                                            <input
                                                type="file"
                                                accept=".json"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        const reader = new FileReader()
                                                        reader.onload = (e) => {
                                                            try {
                                                                const data = JSON.parse(e.target?.result as string)
                                                                if (data.personalInfo) setPersonalInfo(data.personalInfo)
                                                                if (data.experiences) setExperiences(data.experiences)
                                                                if (data.projects) setProjects(data.projects)
                                                                if (data.skills) setSkills(data.skills)
                                                                if (data.testimonials) setTestimonials(data.testimonials)
                                                                if (data.siteSettings) setSiteSettings(data.siteSettings)
                                                                setHasUnsavedChanges(true)
                                                                alert("Data imported successfully!")
                                                            } catch (error) {
                                                                alert("Error importing data. Please check the file format.")
                                                            }
                                                        }
                                                        reader.readAsText(file)
                                                    }
                                                }}
                                                className="hidden"
                                                id="import-data"
                                            />
                                            <Button variant="outline" asChild>
                                                <label htmlFor="import-data" className="cursor-pointer">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Import Data
                                                </label>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
        </div>
    )
}
