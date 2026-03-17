# CityBuddy

CityBuddy is a travel web app for discovering hotels, cafes, restaurants, and attractions with reviews, favorites, and map-based browsing.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Media: Cloudinary

## Local Setup

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Install backend dependencies:
   ```bash
   cd ../Backend
   npm install
   ```
3. Create env files:
   - Copy `frontend/.env.example` to `frontend/.env`
   - Copy `Backend/.env.example` to `Backend/.env`

## Deployment

### Frontend on Vercel

- Import this repository in Vercel.
- Set the root directory to `frontend`.
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Add env var: `VITE_API_BASE_URL=https://your-render-service.onrender.com`

`frontend/vercel.json` is included so direct visits to app routes keep working.

### Backend on Render

- Create a Render Web Service from this repository, or deploy with `render.yaml`.
- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`

Add these environment variables in Render:

- `MongoDBURI`
- `JWT_SECRET`
- `ADMIN_CODE`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CORS_ORIGIN=https://your-vercel-domain.vercel.app`

## Important

- `Backend/.env` currently contains real secrets. Rotate them before pushing or deploying if those values have been exposed.
- After Vercel gives you the final frontend URL, update Render's `CORS_ORIGIN` to that exact origin.
