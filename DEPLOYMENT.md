# 🚀 Vercel Deployment Guide for Blockbase

## 🎯 Current Issue
Getting 404 errors on deployed Vercel app, likely due to missing static generation for dynamic routes.

## 📋 Step-by-Step Manual Deployment

### 1. 🔧 Vercel Dashboard Configuration

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Find your `blockbase` project**
3. **Click on Settings**
4. **Go to "Build and Deployment"**
5. **Set these EXACT settings:**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build (leave default)
   Output Directory: (leave empty - auto-detected)
   Install Command: npm install (leave default)
   Development Command: npm run dev (leave default)
   ```

### 2. 🔐 Environment Variables (Already Set ✅)
Your environment variables are correctly configured:
- `ALCHEMY_API_KEY`: oj91IAOuftP9RBIDaQSFySQVq-VihXcW
- `NEXT_PUBLIC_API_URL`: https://blockbase-phi.vercel.app
- `FRONTEND_URL`: https://blockbase-phi.vercel.app

### 3. 🚀 Force Redeploy

**Option A: Via Dashboard**
1. Go to **Deployments** tab
2. Click the **3 dots** on latest deployment
3. Click **Redeploy**
4. Check **"Use existing Build Cache"** = OFF
5. Click **Redeploy**

**Option B: Via Git Push**
```bash
# Make a small change to trigger redeploy
echo "# Deployment $(date)" >> README.md
git add README.md
git commit -m "Trigger redeploy - $(date)"
git push origin main
```

### 4. 🔍 Troubleshooting 404 Issues

The 404 likely occurs because:
1. **Missing index page generation**
2. **API routes not properly configured**
3. **Build cache issues**

**Quick Fix:**
1. **Clear all build cache** in Vercel
2. **Ensure Root Directory = "frontend"**
3. **Redeploy from scratch**

### 5. 🧪 Testing Deployment

Once deployed, test these URLs:
- ✅ **Homepage**: https://blockbase-phi.vercel.app/
- ✅ **Cryptocurrencies**: https://blockbase-phi.vercel.app/cryptocurrencies/all-coins
- ✅ **NFT Collections**: https://blockbase-phi.vercel.app/nfts/collections
- ✅ **NFT Portfolio**: https://blockbase-phi.vercel.app/nfts/portfolio
- ✅ **API Routes**: 
  - https://blockbase-phi.vercel.app/api/coins
  - https://blockbase-phi.vercel.app/api/nfts-for-owner

### 6. 🆘 If Still 404

**Last Resort - Redeploy from Scratch:**
1. **Delete the Vercel project** entirely
2. **Import fresh from GitHub**
3. **Set Root Directory = "frontend"** during setup
4. **Add environment variables**
5. **Deploy**

## 🏗️ Project Structure (For Reference)
```
Blockbase/
├── frontend/          ← This is your Next.js app (Root Directory)
│   ├── package.json   ← Contains Next.js
│   ├── pages/         ← Your routes
│   └── src/
└── backend/           ← Not used in Vercel (API routes in frontend/pages/api/)
```

## 🎯 For Your Alchemy Product Engineer Application

This project demonstrates:
- ✅ **Alchemy NFT API Integration** (portfolio, collections)
- ✅ **Modern React/Next.js** architecture  
- ✅ **Redux state management**
- ✅ **Responsive UI** with Tailwind CSS
- ✅ **TypeScript** implementation
- ✅ **API route serverless functions**
- ✅ **Error handling** and loading states
- ✅ **Image optimization** and fallbacks

Perfect showcase of full-stack development skills! 🚀

---

## 🔄 Quick Commands

**Test locally:**
```bash
cd frontend && npm run dev
```

**Force redeploy:**
```bash
git commit --allow-empty -m "Force redeploy"
git push origin main
```

**Check build:**
```bash
cd frontend && npm run build
```