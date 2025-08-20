# Blockbase Deployment Guide

## Vercel Configuration

Since this is a monorepo with the Next.js app in the `frontend/` directory, configure Vercel as follows:

### In Vercel Dashboard Settings:

1. **Root Directory**: `frontend`
2. **Build Command**: `npm run build`
3. **Output Directory**: `.next`
4. **Install Command**: `npm install`

### Environment Variables:
- `ALCHEMY_API_KEY`: Your Alchemy API key for NFT data
- `NEXT_PUBLIC_API_URL`: Should be set to your Vercel domain (e.g., https://blockbase-phi.vercel.app)

### API Routes:
The following serverless functions are available in `frontend/pages/api/`:
- `/api/coins` - CoinGecko cryptocurrency data
- `/api/coins/[id]` - Individual coin details
- `/api/nfts-for-contract` - NFT collection data via Alchemy
- `/api/nfts-for-owner` - NFT portfolio data via Alchemy

## Local Development:
1. Set environment variables in `backend/.env`
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm run dev`

## Production:
Use the serverless functions deployed with the frontend for the best performance.
