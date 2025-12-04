# Railway Deployment Guide

## Environment Variables

Railway dashboard da quyidagi environment variables qo'shing:

```
DB_HOST=ep-red-snow-ahwigrqe-pooler.c-3.us-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_aoWTyZCh78iM
PORT=3000
NODE_ENV=production
```

## Important Notes

1. **Neon Pooler URL ishlatilmoqda** - bu Railway bilan yaxshi ishlaydi
2. **SSL automatically enabled** - dialectOptions da sozlangan
3. **Connection pooling** - max 5 connections
4. **Timeout sozlamalari** - 60 seconds connect timeout

## Deploy Steps

1. Railway da GitHub repository ulang
2. Environment variables qo'shing (yuqoridagi)
3. Build command: `npm run build`
4. Start command: `npm start`
5. Deploy!

## Troubleshooting

Agar database connection error bo'lsa:

1. Neon dashboard da IP whitelist tekshiring (Railway IP qo'shish kerak bo'lishi mumkin)
2. Pooler URL ishlatilganligini tasdiqlang (`.neon.tech` bilan tugashi kerak)
3. SSL sozlamalari to'g'riligini tekshiring

## Test After Deploy

```bash
curl https://your-app.railway.app/foods/all
curl https://your-app.railway.app/users/all
```

## Health Check Endpoint

```bash
curl https://your-app.railway.app/
```
