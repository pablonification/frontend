# Mixed Content Fix - HTTPS Frontend → HTTP Backend

## Problem Solved

Your frontend is deployed on **HTTPS** (`https://labkidasitb.vercel.app`) but your backend is on **HTTP** (`http://128.199.70.237`). Browsers block mixed content (HTTPS pages making HTTP requests) for security reasons.

## Solution Implemented

I've created a **Next.js API proxy** that:
1. Detects when the frontend is on HTTPS
2. Automatically routes API requests through a proxy at `/api/proxy/...`
3. The proxy (server-side) makes the HTTP request to the backend
4. Returns the response to the frontend over HTTPS

This avoids the mixed content issue because:
- Frontend → Proxy: HTTPS (same origin)
- Proxy → Backend: HTTP (server-to-server, no browser restrictions)

## Files Changed

1. **`src/lib/api.ts`**: Updated to automatically use proxy when on HTTPS
2. **`src/app/api/proxy/[...path]/route.ts`**: New proxy endpoint

## How It Works

### In Development (localhost:3000 - HTTP):
- Direct connection to backend: `http://128.199.70.237/api/...`

### In Production (Vercel - HTTPS):
- Automatic proxy: `/api/proxy/api/...` → backend `http://128.199.70.237/api/...`

## Environment Variables

### For Vercel Deployment:

Set this environment variable in Vercel Dashboard → Settings → Environment Variables:

```
BACKEND_API_URL=http://128.199.70.237
```

Or use the existing:
```
NEXT_PUBLIC_API_URL=http://128.199.70.237
```

The proxy will use `BACKEND_API_URL` first, then fall back to `NEXT_PUBLIC_API_URL`, then default to `http://128.199.70.237`.

## Testing

After deployment:

1. Go to `https://labkidasitb.vercel.app/admin/login`
2. Try logging in
3. Check browser console - requests should go to `/api/proxy/api/auth/login` instead of directly to `http://128.199.70.237`

## Notes

- The proxy is automatic - no code changes needed in your components
- Development still uses direct connection (faster, easier to debug)
- Production automatically uses proxy (solves mixed content issue)
- All API endpoints are proxied transparently

## Alternative Solutions (if needed)

If you want to avoid the proxy:

1. **Set up HTTPS on backend** (recommended long-term)
   - Use Let's Encrypt or Cloudflare
   - Update backend CORS to allow HTTPS origin
   - Update `NEXT_PUBLIC_API_URL` to `https://128.199.70.237`

2. **Use Cloudflare or nginx reverse proxy** with SSL
   - Point `api.yourdomain.com` to backend with SSL

But for now, the proxy solution works perfectly and requires no backend changes!




