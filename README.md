# Vaza - Your Immigration Assistant
- **Live Project: [vaza.ai](https://hb-02-2025-vaza.vercel.app)**

## Problem Statement
Immigration processes are often complex, confusing, and overwhelming. People struggle to understand visa requirements, gather the right documentation, and follow the correct procedures for their specific situation. Vaza solves this by providing personalized immigration guidance and planning through AI-powered assistance.

## Tech Stack
- **Frontend:**
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - Google Maps API

- **Backend:**
  - Supabase (Database & Authentication)
  - Anthropic Claude AI (Chat & Plan Generation)
  - Next.js API Routes

- **AI Features:**
  - Claude-3-Haiku for chat interactions
  - Claude-Sonnet-4 for immigration plan generation

## Key Features
1. **Interactive Country Selection**
   - Visual country selection through Google Maps integration
   - Country-specific chat and planning interfaces

2. **AI Travel Assistants**
   - Travel Wizard: For general travel planning and advice
   - Visa Expert: Specialized in visa requirements and documentation
   - Local Guide: Provides authentic local insights and recommendations

3. **Personalized Immigration Planning**
   - Custom immigration plans based on user profile
   - Step-by-step guidance with detailed explanations
   - Real-time cost and timeline estimates
   - Progress tracking for each step

4. **Smart Chat System**
   - Context-aware conversations
   - Personalized responses based on user profile
   - Chat history preservation for each country

## Local Setup

1. **Prerequisites**
   ```bash
   - Node.js (v18 or higher)
   - npm or yarn
   - A Supabase account
   - An Anthropic API key
   - A Google Maps API key
   ```

2. **Environment Setup**
   - Clone the repository
   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables:
     - Supabase credentials
     - Anthropic API key
     - Google Maps API key

3. **Installation**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Database Setup**
   - Setup the Supabase database based on /types/db.ts

5. **Start the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

## Team Credits

- **Arthur Duarte:** Full-stack
- **Eduardo Zago:** Backend
- **Luiz Renan:** Frontend