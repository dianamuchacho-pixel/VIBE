# VIBES

## Overview

VIBES is an Eventbrite-style web application for discovering events and activities in Madrid. Users can filter plans using a "blender" style interface where they combine multiple preferences (social context, time of day, style, district) to find their ideal experience. The app features a React frontend with a modern UI, an Express backend API, and PostgreSQL database for storing event data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for filter interactions and transitions
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript (tsx for development)
- **Framework**: Express 5 for REST API
- **API Structure**: Type-safe API contracts defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM for type-safe database queries
- **Database**: PostgreSQL with connection pooling via pg

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared types and contracts
  schema.ts       # Drizzle database schema
  routes.ts       # API contract definitions
```

### Data Flow
1. Frontend uses React Query hooks (`use-events.ts`) to fetch data
2. API requests go to Express routes defined in `server/routes.ts`
3. Storage layer (`server/storage.ts`) handles database operations with Drizzle
4. Schema and types are shared between frontend and backend via `shared/` directory

### Key Design Decisions
- **Monorepo structure**: Client and server code colocated for easier development
- **Shared types**: TypeScript types and Zod schemas shared between frontend/backend
- **Filter system**: Multi-select filters converted to comma-separated strings for API queries
- **Seed data**: Database auto-seeds with sample Madrid events on first run

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations and schema management (`npm run db:push`)

### UI Framework
- **Radix UI**: Accessible, unstyled component primitives
- **shadcn/ui**: Pre-built component configurations in `components/ui/`
- **Tailwind CSS**: Utility-first styling with custom theme configuration

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `drizzle-orm` / `drizzle-zod`: Database ORM with Zod schema generation
- `framer-motion`: Animation library for filter interactions
- `date-fns`: Date formatting utilities
- `wouter`: Lightweight React router
- `zod`: Runtime type validation for API contracts