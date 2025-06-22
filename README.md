# Institute of Wise Innovation: SEED Foundry

A sophisticated decision matrix tool for structuring mission-driven startups, built with Next.js, Supabase, and TypeScript.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, SCSS Modules
- **State Management**: React Context, Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Payment Processing**: Stripe

## Prerequisites

- Node.js 18.17 or later
- npm 9.x or later
- Git

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase - IMPORTANT: Use Session Pooler URL for IPv4 compatibility
# Go to your Supabase project > Settings > Database
# Copy the "Session Pooler" connection string (not the direct connection)
# It should look like: https://your-project.pooler.supabase.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_session_pooler_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (Optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/seed-foundry.git
cd seed-foundry
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Click "Connect to Supabase" in the top right of the project
   - **IMPORTANT**: In your Supabase project settings, go to Database section
   - Copy the **Session Pooler** URL (not the direct connection URL)
   - This is required for IPv4 compatibility with Vercel and other platforms
   - Follow the setup instructions to initialize your database
   - Copy the environment variables to `.env.local`

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

The project uses Supabase as the database with the following features:
- Row Level Security (RLS) for data protection
- Real-time subscriptions
- Built-in authentication
- TypeScript type generation

**IPv4 Compatibility**: This project is configured to use Supabase's Session Pooler for compatibility with IPv4-only platforms like Vercel, GitHub Actions, and Render.

Database migrations are located in `/supabase/migrations/`. When connecting to Supabase, these migrations will automatically set up:
- User authentication tables
- Entity types, business models, and funding options tables
- Goals and relationships tables
- Subscription management tables

## Development

```bash
# Run development server
npm run dev

# Run linting
npm run lint

# Run linting with auto-fix
npm run lint:fix

# Format code
npm run format

# Update browserslist database
npm run update-browserslist
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. **IMPORTANT**: Make sure to use the Supabase Session Pooler URL in your environment variables
5. Deploy!

### Supabase Deployment

1. Install Supabase CLI (if needed)
2. Link your project:
```bash
supabase link --project-ref your-project-ref
```
3. Deploy database changes:
```bash
supabase db push
```

## Troubleshooting

### IPv4 Connection Issues
If you encounter connection errors with Supabase:
1. Go to your Supabase project > Settings > Database
2. Use the **Session Pooler** connection string instead of the direct connection
3. Update your `NEXT_PUBLIC_SUPABASE_URL` environment variable
4. Redeploy your application

This is required for platforms like Vercel, GitHub Actions, and Render that are IPv4-only.

## Features

- 🏢 Entity Type Library
- 💰 Funding Options Explorer
- 💼 Business Model Catalog
- 🎯 Goal-based Recommendations
- 🔒 Secure Authentication
- 💳 Stripe Integration
- 📱 Responsive Design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support, email support@wiseinnovation.org or join our community Discord server.