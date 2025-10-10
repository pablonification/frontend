# Lab Kimia Dasar - Frontend

This is the frontend application for the Lab Kimia Dasar website, built with Next.js, TailwindCSS, and TypeScript.

## Features

- **Public Pages**: Homepage, About, Praktikum Info, Announcements, FAQ, Contact, Search
- **Admin Dashboard**: Manage sliders, announcements, files, modules, and grades
- **File Management**: Password-protected file downloads
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Accessibility**: ARIA labels, keyboard navigation, focus management

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: TailwindCSS v4 with custom theme
- **Font**: Manrope (Google Fonts)
- **State Management**: React Context + SWR for data fetching
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Authentication**: Supabase Auth (client-side)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env.local
```

3. Fill in your environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── pengumuman/        # Announcements pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── shared/           # Shared components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utilities and configurations
└── services/             # API services
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Deployment

This project is designed to be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new files
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

This project is part of the Lab Kimia Dasar website system.
