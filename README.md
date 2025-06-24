# Muhammad Abdullah Khan - Portfolio

A modern, AI-focused portfolio website built with Next.js, featuring automatic GitHub repository synchronization and real-time updates.

## 🚀 Features

- **Automatic GitHub Sync**: All your repositories are automatically synced to your portfolio
- **Real-time Updates**: Portfolio updates automatically when you push to any repository
- **AI/ML Focused**: Specialized sections for showcasing AI and machine learning projects
- **Admin Panel**: Full-featured admin interface for content management
- **Modern Design**: Built with Next.js, TypeScript, and Tailwind CSS
- **Responsive**: Optimized for all devices and screen sizes
- **SEO Optimized**: Built-in SEO optimization and structured data

## 🔧 Setup Instructions

### 1. Basic Setup

```bash
# Clone the repository
git clone https://github.com/MuhammadKhan148/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### 2. GitHub Auto-Sync Setup

#### Step 1: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
GITHUB_WEBHOOK_SECRET=your-secret-here
NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/your-build-hook-id
```

#### Step 2: Set up GitHub Webhook

1. Go to your GitHub repository settings
2. Navigate to "Webhooks" section
3. Click "Add webhook"
4. Set Payload URL to: `https://your-domain.com/api/github-webhook`
5. Select "Just the push event"
6. Set Content type to "application/json"
7. Add a secret (same as GITHUB_WEBHOOK_SECRET)
8. Click "Add webhook"

#### Step 3: Optimize Repository Display

To make your repositories appear in the portfolio:

- ✅ Keep repositories public
- ✅ Add clear descriptions to your projects
- ✅ Add topics like "portfolio", "project", or "featured"
- ✅ Set homepage URLs for demo links
- ✅ Use descriptive repository names

#### Step 4: Repository Filtering

The system automatically filters repositories to show only relevant projects:

- **Included**: Repositories with descriptions, specific topics, or significant stars
- **Excluded**: Forks, private repos, config repos, dotfiles
- **Featured**: Repositories with 3+ stars or "featured" topic

### 3. Skills Configuration

The portfolio includes an extensive skills section covering:

#### AI/ML Skills
- Python, TensorFlow, PyTorch, Scikit-learn
- Natural Language Processing, Computer Vision
- Deep Learning, Neural Networks
- GPT Integration, LangChain

#### Frontend Skills
- React, Next.js, Vue.js, TypeScript
- Tailwind CSS, Material-UI, Bootstrap
- React Native, Flutter, PWA

#### Backend Skills
- Node.js, Express.js, Python Flask/Django
- MongoDB, PostgreSQL, Redis, Firebase
- REST APIs, GraphQL, Socket.io

#### DevOps & Cloud
- Docker, Kubernetes, GitHub Actions
- AWS, Google Cloud Platform, Netlify
- CI/CD, Linux, Nginx

### 4. Content Management

#### Using the Admin Panel

1. Navigate to `/admin` 
2. Use Netlify Identity for authentication
3. Manage all content through the intuitive interface:
   - Personal information
   - Work experience
   - Skills and technologies
   - Projects (manual + auto-synced)
   - GitHub integration
   - Testimonials
   - Site settings

#### Manual Content Updates

Edit the markdown files in `/content/`:
- `portfolio.md` - Main portfolio data
- `projects/` - Individual project files

### 5. Deployment

#### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `out`
4. Add environment variables in Netlify dashboard
5. Enable Netlify Identity for admin access

#### Environment Variables

Required for production:
```env
GITHUB_WEBHOOK_SECRET=your-webhook-secret
NETLIFY_BUILD_HOOK=your-netlify-build-hook-url
```

## 🔄 How Auto-Sync Works

1. **Push Detection**: GitHub webhook triggers when you push to any repository
2. **Filtering**: System filters repositories based on relevance criteria
3. **Data Processing**: Repository data is transformed into portfolio format
4. **Cache Update**: Local JSON files are updated with new data
5. **Deployment**: Netlify automatically rebuilds and deploys the site

## 📊 Portfolio Data Structure

```javascript
{
  "name": "Muhammad Abdullah Khan",
  "title": "AI/ML Engineer & Full-Stack Developer",
  "skills": {
    "ai_ml": [...],
    "frontend": [...],
    "backend": [...],
    "devops_cloud": [...],
    "tools_other": [...]
  },
  "projects": [...], // Auto-synced from GitHub
  "experience": [...],
  "achievements": [...]
}
```

## 🛠️ Customization

### Adding New Skills

Edit `content/portfolio.md`:

```yaml
skills:
  ai_ml:
    - "New AI Technology"
  frontend:
    - "New Frontend Framework"
```

### Custom Project Filtering

Modify `app/api/sync-github/route.ts` to change how repositories are filtered:

```javascript
const portfolioRepos = allRepos.filter(repo => {
  // Your custom filtering logic
  return repo.topics?.includes('your-custom-topic')
})
```

### Styling

- Main styles: `styles/globals.css`
- Component styles: Tailwind CSS classes
- Color scheme: Emerald/Teal gradient theme

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/MuhammadKhan148/portfolio/issues).

---

**Portfolio URL**: [https://muhammad-abdullah-khan.netlify.app](https://muhammad-abdullah-khan.netlify.app)
**GitHub**: [https://github.com/MuhammadKhan148](https://github.com/MuhammadKhan148)
**LinkedIn**: [https://linkedin.com/in/muhammad-abdullah-khan-01271a263/](https://linkedin.com/in/muhammad-abdullah-khan-01271a263/) 