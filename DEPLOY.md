# Deployment Guide for GitHub Pages

This guide explains how to deploy the Peruvian Payment System Supervision Dashboard to GitHub Pages.

## Prerequisites

1. **GitHub Account**: Ensure you have a GitHub account.
2. **GitHub Repository**: Create a new repository named `sbs-dashboard` on GitHub.

## Step 1: Configure Repository Settings

1. Go to your GitHub repository: `https://github.com/diego-llontop/sbs-dashboard`
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, select **Source**: Deploy from a branch.
4. Select **Branch**: `main` and **Folder**: `/ (root)`.
5. Click **Save**.

## Step 2: Authenticate and Push

Since the repository is already configured, you need to authenticate with GitHub to push.

### Option A: HTTPS with Personal Access Token (PAT)

1. Generate a PAT: GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic) > Generate new token.
2. Grant `repo` scope.
3. Run in terminal:
   ```bash
   git push https://<TOKEN>@github.com/diego-llontop/sbs-dashboard.git main
   ```

### Option B: SSH Key

1. Ensure you have an SSH key added to your GitHub account.
2. Update remote to SSH:
   ```bash
   git remote set-url origin git@github.com:diego-llontop/sbs-dashboard.git
   ```
3. Push:
   ```bash
   git push -u origin main
   ```

## Step 3: Verify Deployment

1. After pushing, GitHub Actions will automatically build and deploy the site.
2. Navigate to **Settings** > **Pages** to see the deployment status.
3. Once deployed, visit: `https://diego-llontop.github.io/sbs-dashboard/`

## Troubleshooting

### "fatal: could not read Username"
- This means git is not authenticated. Use a PAT or SSH key as described above.

### "404 Not Found" on GitHub Pages
- Ensure `vite.config.ts` has `base: '/sbs-dashboard/'` configured.
- Check that the `dist` folder is being generated correctly with `npm run build`.

### Build Fails
- Ensure Node.js version >= 18.
- Run `npm install` before building.
- Check for TypeScript errors with `npx tsc -b`.

## Current Status

- ✅ Repository configured
- ✅ Base path set in `vite.config.ts`
- ✅ All changes committed to `main` branch
- ⏳ Awaiting authentication to push