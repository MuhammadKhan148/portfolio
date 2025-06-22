# Admin Panel Setup Instructions

## For Manually Invited Users

### How to Invite Users (Netlify Dashboard):

1. **Go to your Netlify Dashboard**
2. **Select your site** → **Identity** → **Invite Users**
3. **Enter the user's email address**
4. **Click "Invite"**

### What Happens After Invitation:

1. **User receives email** with direct admin link
2. **User clicks the link** → Goes to `/admin`
3. **User enters their email** and sets password
4. **User gets immediate access** to edit content

### Direct Admin Access:

- **Admin URL:** `https://soft-kleicha-9c1587.netlify.app/admin`
- **No confirmation required** for invited users
- **Direct password setup** on first login

### Troubleshooting:

If someone can't access admin:
1. Check they're using the correct email address
2. Try the "Forgot Password" link at `/admin`
3. Re-invite them from Netlify Dashboard if needed

### What Users Can Edit:

- ✅ Personal information (name, bio, title)
- ✅ Social links (GitHub, LinkedIn, Email)
- ✅ Profile picture and resume
- ✅ Projects (add, edit, delete)
- ✅ Project images and descriptions
- ✅ Featured project settings

### Content Files Location:

- Portfolio info: `content/portfolio.md`
- Projects: `content/projects/*.md`
- Uploads: `public/uploads/`

---

**Note:** This setup bypasses email confirmation for a smoother user experience. Users invited through Netlify Identity can access admin directly. 