# PowerShell Deployment Script for Vercel

Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Deploy Backend
Write-Host ""
Write-Host "🔧 Deploying Backend..." -ForegroundColor Cyan
Set-Location backend
vercel --prod
Write-Host "✅ Backend deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Copy the backend URL from above" -ForegroundColor Yellow
Write-Host "    Example: https://carpooling-backend-xyz.vercel.app" -ForegroundColor Yellow
Write-Host ""
$backendURL = Read-Host "Paste your backend URL here"

# Update frontend environment
Write-Host ""
Write-Host "📝 Updating frontend configuration..." -ForegroundColor Cyan
Set-Location ../frontend
$envContent = "VITE_API_URL=$backendURL/api"
$envContent | Out-File -FilePath .env.production -Encoding UTF8
Write-Host "✅ Frontend .env.production created!" -ForegroundColor Green

# Deploy Frontend
Write-Host ""
Write-Host "🎨 Deploying Frontend..." -ForegroundColor Cyan
vercel --prod
Write-Host "✅ Frontend deployed!" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to Vercel Dashboard → Backend Project → Settings → Environment Variables"
Write-Host "2. Update CLIENT_URL with your frontend URL"
Write-Host "3. Redeploy backend: cd backend && vercel --prod"
Write-Host "4. Test your application!"
Write-Host ""
Write-Host "🔗 Access your dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan

Set-Location ..
