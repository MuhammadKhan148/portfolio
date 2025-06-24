# Test GitHub Sync Functionality

This guide helps you test the GitHub auto-sync feature to ensure everything is working correctly.

## ✅ Pre-Testing Checklist

Before testing, ensure you have:

- [x] Portfolio running locally (`pnpm dev`)
- [x] GitHub account with public repositories
- [x] Admin access to the portfolio (`/admin`)
- [x] Internet connection for GitHub API calls

## 🧪 Test Scenarios

### Test 1: Manual Repository Sync

1. **Navigate to Admin Panel**
   ```
   http://localhost:3000/admin
   ```

2. **Go to GitHub Tab**
   - Click the "GitHub" tab in the admin panel
   - You should see the Enhanced GitHub Integration component

3. **Trigger Manual Sync**
   - Click the "Refresh" button
   - Wait for the sync to complete
   - Check for success message

4. **Verify Results**
   - Check "Recent Projects" section shows your repositories
   - Verify repository count is accurate
   - Confirm stars/forks statistics are correct

### Test 2: API Endpoint Testing

1. **Test Sync API**
   ```bash
   curl -X POST http://localhost:3000/api/sync-github
   ```

2. **Expected Response**
   ```json
   {
     "message": "GitHub sync completed successfully",
     "projectsCount": 10,
     "projects": [...],
     "stats": {...}
   }
   ```

3. **Check Generated Files**
   - `portfolio/content/github-projects.json` should be created/updated
   - `portfolio/content/github-stats.json` should be created/updated

### Test 3: Repository Filtering

1. **Check Included Repositories**
   - Public repositories with descriptions ✅
   - Repositories with topics like "portfolio", "project" ✅
   - Repositories with programming languages ✅
   - Repositories with stars ✅

2. **Check Excluded Repositories**
   - Private repositories ❌
   - Forked repositories ❌
   - Repositories without descriptions ❌
   - Meta repositories (`.github`, `config`, `dotfiles`) ❌

### Test 4: Skills Section

1. **Navigate to Main Portfolio**
   ```
   http://localhost:3000
   ```

2. **Scroll to Skills Section**
   - Verify AI/ML skills are displayed
   - Check Frontend skills
   - Confirm Backend skills
   - Review DevOps/Cloud skills
   - Validate Tools/Other skills

3. **Check Skill Categories**
   - **AI/ML**: Python, TensorFlow, PyTorch, NLP, Computer Vision
   - **Frontend**: React, Next.js, Vue.js, TypeScript, Tailwind CSS
   - **Backend**: Node.js, Express, Django, PostgreSQL, MongoDB
   - **DevOps**: Docker, Kubernetes, AWS, GitHub Actions
   - **Tools**: VS Code, Git, Figma, Jest, Cypress

### Test 5: Enhanced GitHub Component

1. **Auto-sync Toggle**
   - Switch auto-sync on/off
   - Verify status changes correctly

2. **Repository Statistics**
   - Total repositories count
   - Total stars across all repos
   - Total forks across all repos
   - Unique languages count

3. **Recent Projects Preview**
   - Shows top 5 recent repositories
   - Displays repository titles, descriptions
   - Shows programming languages and star counts
   - Provides links to GitHub repositories

## 🔍 Debugging Common Issues

### Issue: No Repositories Showing

**Possible Causes:**
- GitHub API rate limiting
- All repositories are private
- No repositories have descriptions
- Network connectivity issues

**Solutions:**
1. Check GitHub API rate limits
2. Add descriptions to your repositories
3. Make some repositories public
4. Add topics like "portfolio" or "project"

### Issue: Sync Button Not Working

**Possible Causes:**
- Network connectivity
- API endpoint not responding
- GitHub API unavailable

**Solutions:**
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check network tab in browser dev tools

### Issue: Build Errors

**Possible Causes:**
- Next.js configuration issues
- Missing dependencies
- TypeScript errors

**Solutions:**
1. Ensure `output: 'export'` is commented out in `next.config.mjs`
2. Run `pnpm install` to ensure all dependencies are installed
3. Check console for specific error messages

## 📊 Expected Behavior

### Normal Operation

1. **Initial Load**
   - Admin panel loads GitHub sync component
   - Attempts to load cached data first
   - Falls back to API call if no cache

2. **Manual Sync**
   - Shows loading spinner
   - Fetches repositories from GitHub
   - Filters based on criteria
   - Updates cache files
   - Shows success/error message

3. **Auto-sync (when enabled)**
   - Runs every 10 minutes
   - Silent operation (no notifications)
   - Updates cache in background

### Repository Processing

1. **Data Transformation**
   - Repository name → Title (formatted)
   - Description → Project description
   - Topics + Language → Tags
   - Stars/Forks → Statistics
   - Homepage → Demo link

2. **Filtering Logic**
   ```
   Include if:
   - Public AND has description
   - AND (has topics OR has language OR has stars OR description contains keywords)
   - AND NOT (fork OR private OR meta repo)
   ```

## ✨ Success Criteria

Your GitHub sync is working correctly if:

- [x] Manual sync button triggers repository fetch
- [x] Repository count matches your public repos (filtered)
- [x] Repository data is accurately displayed
- [x] Statistics (stars, forks, languages) are correct
- [x] Cache files are created and updated
- [x] Auto-sync toggle controls background syncing
- [x] Skills section displays comprehensive skill categories
- [x] No console errors during sync operation

## 🚀 Next Steps

Once testing is complete:

1. **Deploy to Production**
   - Push changes to GitHub
   - Deploy to Netlify
   - Test webhook functionality

2. **Set Up Webhooks**
   - Configure GitHub webhooks
   - Test automatic updates
   - Monitor webhook delivery

3. **Optimize Repository Display**
   - Add topics to important repositories
   - Write clear descriptions
   - Set homepage URLs for demos

---

**Note**: This functionality requires an active internet connection to access the GitHub API. 