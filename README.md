# 🚗 CoGo - Smart Carpooling Platform

A modern, secure, and user-friendly carpooling platform built with React and Node.js.

## ✨ Features

- 🔐 **Secure Authentication** - JWT tokens, Google OAuth, password hashing
- 🎨 **Modern UI/UX** - Responsive design with Tailwind CSS and Framer Motion
- ♿ **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- 🚀 **Performance Optimized** - Code splitting, lazy loading, and optimized bundles
- 🔍 **SEO Ready** - Meta tags, OpenGraph, and structured data
- 📱 **Mobile First** - Fully responsive design for all devices
- 🛡️ **Security First** - Rate limiting, input validation, and XSS protection
- 🌐 **PWA Ready** - Service worker and offline capabilities

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Hook Form** - Form validation and handling
- **Axios** - HTTP client with interceptors
- **Sonner** - Toast notifications
- **Zod** - Schema validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 4.4+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/cogo-carpooling.git
cd cogo-carpooling
```

2. **Install root dependencies**
```bash
npm install
```

3. **Set up Backend**
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and other settings
```

4. **Set up Frontend**
```bash
cd ../frontend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your API URL and other settings
```

5. **Start Development Servers**

Backend (Terminal 1):
```bash
cd backend
npm run dev
```

Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
cogo-carpooling/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   └── routes/         # API routes
│   ├── server.js          # Server entry point
│   └── package.json
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Images, icons, etc.
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/cogo
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:5173
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=CoGo
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🏗️ Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Build and start backend
cd backend
npm run build
npm start
```

## 🚀 Deployment

### Docker Deployment

1. **Build Docker images**
```bash
# Backend
cd backend
docker build -t cogo-backend .

# Frontend
cd frontend
docker build -t cogo-frontend .
```

2. **Run with Docker Compose**
```bash
docker-compose up -d
```

### Manual Deployment

1. **Deploy Backend** (e.g., on Heroku, Railway, or DigitalOcean)
2. **Deploy Frontend** (e.g., on Vercel, Netlify, or Cloudflare Pages)
3. **Set up MongoDB** (MongoDB Atlas recommended)
4. **Configure environment variables** on your hosting platform

## 📊 Performance Optimizations

- **Code Splitting** - Dynamic imports for route-based splitting
- **Lazy Loading** - Images and components loaded on demand
- **Bundle Optimization** - Tree shaking and minification
- **Caching** - Browser caching with proper headers
- **CDN Ready** - Static assets optimized for CDN delivery

## 🔒 Security Features

- **Input Validation** - Server-side validation with express-validator
- **Rate Limiting** - API rate limiting to prevent abuse
- **CORS Configuration** - Proper cross-origin resource sharing
- **Security Headers** - Helmet.js for security headers
- **Data Sanitization** - Protection against NoSQL injection
- **Password Security** - Bcrypt hashing with salt rounds

## ♿ Accessibility Features

- **ARIA Labels** - Proper labeling for screen readers
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus indication and trapping
- **Color Contrast** - WCAG AA compliant color ratios
- **Screen Reader Support** - Semantic HTML and proper structure

## 📱 Progressive Web App

- **Service Worker** - Offline functionality and caching
- **Web App Manifest** - App-like experience on mobile
- **Push Notifications** - Real-time updates (coming soon)
- **Install Prompt** - Add to home screen functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/cogo-carpooling/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] Real-time chat between riders and drivers
- [ ] Push notifications for ride updates
- [ ] Payment integration
- [ ] Route optimization
- [ ] Admin dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

**Built with ❤️ by the CoGo Team**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
