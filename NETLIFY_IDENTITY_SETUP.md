# Netlify Identity Setup Guide

This guide will help you set up Netlify Identity to secure your admin panel so only invited users can access it.

## Step 1: Enable Netlify Identity

1. Go to your Netlify dashboard
2. Select your site (portfolio)
3. Go to **Site Settings** > **Identity**
4. Click **Enable Identity**

## Step 2: Configure Identity Settings

### Registration Preferences
1. In the Identity settings, set **Registration** to **Invite only**
2. This ensures only users you invite can register

### External Providers (Optional)
You can enable external providers like:
- Google
- GitHub
- GitLab
- Bitbucket

### Email Templates
Customize the invitation and welcome emails if desired.

## Step 3: Set Up Admin Role

1. Go to **Site Settings** > **Identity** > **Settings and usage**
2. Scroll down to **Roles** section
3. Add a new role called `admin`

## Step 4: Invite Admin Users

1. Go to **Site Settings** > **Identity** > **Users**
2. Click **Invite user**
3. Enter the email address of the user you want to invite
4. After they sign up, edit their user profile and assign the `admin` role

## Step 5: Update Site Configuration (Already Done)

The following has been configured in your `netlify.toml`:
- Protected admin routes
- Security headers for Netlify Identity

## Step 6: Deploy Your Changes

1. Commit and push your changes to your repository
2. Your site will automatically deploy with the new authentication system

## How It Works

1. When someone tries to access `/admin/*`, they'll be prompted to sign in
2. Only users with accounts (invited users) can sign in
3. Only users with the `admin` role can access the admin panel
4. Users without admin role will see an "Access Denied" message

## Managing Users

### To invite a new admin:
1. Go to Netlify Dashboard > Site Settings > Identity > Users
2. Click "Invite user"
3. Enter their email
4. After they register, edit their profile and add the `admin` role

### To remove admin access:
1. Go to Netlify Dashboard > Site Settings > Identity > Users
2. Find the user and edit their profile
3. Remove the `admin` role or delete the user entirely

## Testing

After deployment:
1. Try accessing `/admin` - you should be prompted to sign in
2. Sign in with an invited account
3. If you don't have the admin role, you should see "Access Denied"
4. If you have the admin role, you should access the admin panel

## Troubleshooting

### "Access Denied" for admin user:
- Make sure the user has been assigned the `admin` role in Netlify Identity

### Sign-in popup doesn't appear:
- Check that Netlify Identity is enabled for your site
- Ensure the site has been deployed with the latest changes

### Users can't register:
- This is expected! Registration is set to "Invite only"
- You must invite users through the Netlify dashboard

## Security Notes

- Users must be explicitly invited by you
- Only users with the `admin` role can access the admin panel
- All authentication is handled securely by Netlify
- No passwords are stored in your code
- Session management is handled automatically 