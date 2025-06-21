# Muhammad Abdullah Khan - Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/muhammad-abdullah-khan/deploys)

## 🚀 Live Demo
[https://muhammad-abdullah-khan.netlify.app](https://muhammad-abdullah-khan.netlify.app)

## 📋 About
This is the personal portfolio website of Muhammad Abdullah Khan, an AI-Focused Software Engineer and Full-Stack Developer specializing in:
- Emotion-aware AI systems
- Conversational AI and chatbots
- Full-stack web applications (MERN Stack)
- Machine Learning and Deep Learning
- Mobile app development (Flutter)

## 🛠️ Tech Stack
- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Deployment:** Netlify
- **Analytics:** Google Analytics (optional)

## ✨ Features
- 🎨 Modern, responsive design
- 🌙 Smooth animations and transitions
- 📱 Mobile-first approach
- 🔍 SEO optimized
- ⚡ Performance optimized
- 🎯 Accessibility compliant
- 📊 Project showcase with live demos
- 💼 Professional experience timeline
- 🛠️ Skills and expertise display
- 📬 Contact information and social links

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone https://github.com/MuhammadKhan148/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the portfolio.

## 📁 Project Structure
```
portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main portfolio page
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Additional stylesheets
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Customization

### Personal Information
Update the following in `app/page.tsx`:
- Name and title
- Bio and description
- Contact information
- Social media links
- Professional experience
- Projects and achievements

### Styling
- Colors: Modify Tailwind config in `tailwind.config.ts`
- Components: Update component styles in respective files
- Global styles: Edit `app/globals.css`

### Adding Projects
Add new projects to the projects array in `app/page.tsx`:
```javascript
{
  title: "Your Project Name",
  description: "Project description...",
  image: "/project-image.jpg",
  tags: ["React", "Node.js", "MongoDB"],
  github: "https://github.com/username/repo",
  demo: "https://your-demo-url.com",
  featured: true, // or false
}
```

## 🚀 Deployment

### Netlify (Recommended)
1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `pnpm build`
   - Set publish directory: `out`
   - Deploy!

3. **Environment Variables (if needed):**
   ```
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   ```

### Alternative Deployment Options
- **Vercel:** Perfect for Next.js projects
- **GitHub Pages:** Static deployment option
- **Firebase Hosting:** Google's hosting solution

## 📊 Performance
- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals: All green
- Bundle size: Optimized with Next.js automatic code splitting

## 🤝 Contributing
Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact
- **Email:** muhammad.mak252@gmail.com
- **LinkedIn:** [muhammad-abdullah-khan-01271a263](https://www.linkedin.com/in/muhammad-abdullah-khan-01271a263/)
- **GitHub:** [MuhammadKhan148](https://github.com/MuhammadKhan148)

---

⭐ If you found this portfolio helpful, please give it a star on GitHub! 