# Money Management Frontend

A modern Next.js frontend application for the Money Management System with beautiful UI, animations, and admin dashboard interface.

## Features

- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth animations using Framer Motion
- 📱 Responsive design
- 🔐 Authentication (Login, Register, Logout)
- 📊 Dashboard with statistics
- 💰 Transaction management
- 🏷️ Category management
- 💳 Account management
- 🎯 Protected routes
- 🚀 Fast and optimized

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see `../money-management/README.md`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update `NEXT_PUBLIC_API_URL` to match your backend API URL (default: `http://localhost:3000/api`)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home/landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── layout/           # Layout components
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utilities and API
│   └── api.ts            # API service layer
└── public/               # Static assets
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Pages

- `/` - Landing page with animations
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard with statistics
- `/dashboard/transactions` - Transaction management
- `/dashboard/categories` - Category management
- `/dashboard/accounts` - Account management

## API Integration

The frontend communicates with the backend API through the service layer in `lib/api.ts`. All API calls include automatic token injection and error handling.

## Building for Production

```bash
npm run build
npm start
```

## License

ISC
