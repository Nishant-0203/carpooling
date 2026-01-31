#!/bin/bash

# Deployment script for Vercel

echo "🚀 Starting deployment process..."

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy Backend
echo ""
echo "🔧 Deploying Backend..."
cd backend
vercel --prod
echo "✅ Backend deployed!"
echo ""
echo "⚠️  IMPORTANT: Copy the backend URL and update VITE_API_URL in frontend"
echo ""
read -p "Press Enter after you've copied the backend URL..."

# Deploy Frontend
echo ""
echo "🎨 Deploying Frontend..."
cd ../frontend
vercel --prod
echo "✅ Frontend deployed!"

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update CLIENT_URL in backend Vercel environment variables"
echo "2. Redeploy backend with: cd backend && vercel --prod"
echo "3. Test your application!"
