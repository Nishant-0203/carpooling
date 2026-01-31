# Carpooling App - Vercel Deployment Guide

## 🚀 Deployment Steps

### Step 1: Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy Backend First

Navigate to backend directory and deploy:
```bash
cd backend
vercel
```

When prompted:
- Set up and deploy: **Y**
- Which scope: Select your account
- Link to existing project: **N**
- Project name: `carpooling-backend` (or your preferred name)
- Directory: **./backend** (confirm)
- Override settings: **N**

**Important**: After deployment, copy the backend URL (e.g., `https://carpooling-backend.vercel.app`)

### Step 4: Configure Backend Environment Variables

In Vercel Dashboard for your backend:
1. Go to Settings → Environment Variables
2. Add these variables:

```
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
CLIENT_URL=https://your-frontend-url.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Step 5: Deploy Frontend

Navigate to frontend directory and deploy:
```bash
cd ../frontend
vercel
```

When prompted:
- Set up and deploy: **Y**
- Which scope: Select your account
- Link to existing project: **N**
- Project name: `carpooling-frontend` (or your preferred name)
- Directory: **./frontend** (confirm)
- Override settings: **N**

### Step 6: Update Frontend API URL

Update your frontend API calls to use the backend URL from Step 3.

In `frontend/src/services/api.js`, change:
```javascript
const API_URL = 'https://your-backend-url.vercel.app/api';
```

### Step 7: Redeploy Frontend
```bash
vercel --prod
```

### Step 8: Update Backend CLIENT_URL

Go back to backend environment variables in Vercel Dashboard and update:
```
CLIENT_URL=https://your-actual-frontend-url.vercel.app
```

Then redeploy backend:
```bash
cd ../backend
vercel --prod
```

## 📝 Important Notes

### MongoDB Atlas Setup
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow from anywhere)
3. This is required for Vercel's serverless functions

### CORS Configuration
Your backend is already configured with CORS. Just make sure `CLIENT_URL` environment variable is set correctly.

### Domain Names
- Backend: `https://carpooling-backend.vercel.app`
- Frontend: `https://carpooling-frontend.vercel.app`

You can add custom domains in Vercel Dashboard.

## 🔄 Redeployment

To redeploy after changes:
```bash
# For backend
cd backend
vercel --prod

# For frontend
cd frontend
vercel --prod
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure `0.0.0.0/0` is in MongoDB Atlas whitelist
- Check MONGO_URI in environment variables
- Verify username/password don't contain special characters (URL encode them)

### API Not Working
- Check backend logs in Vercel Dashboard → Deployments → View Function Logs
- Verify CLIENT_URL is set correctly in backend
- Ensure API_URL in frontend points to backend URL

### Build Failures
- Check Node.js version compatibility
- Clear Vercel cache: `vercel --prod --force`
- Check build logs in Vercel Dashboard

## 🔗 Useful Links
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas](https://cloud.mongodb.com/)
- [Vercel Documentation](https://vercel.com/docs)
