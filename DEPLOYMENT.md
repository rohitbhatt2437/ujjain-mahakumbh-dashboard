# Deployment Checklist

## Vercel Environment Variables

**Critical**: These must be set in Vercel Dashboard → Project Settings → Environment Variables

| Variable | Value | Example |
|----------|-------|---------|
| `MONGO_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority` |
| `JWT_SECRET` | Strong random secret (32+ chars) | `your-super-secret-jwt-key-here` |
| `VITE_API_URL` | API base path | `/api` |
| `NODE_ENV` | Environment | `production` |

## Pre-Deploy Checklist

- [ ] All environment variables set in Vercel
- [ ] MongoDB Atlas allows connections from `0.0.0.0/0` (all IPs)
- [ ] JWT_SECRET is strong and unique
- [ ] No sensitive data in code/git history
- [ ] `vercel.json` routes API correctly to `/index.js`

## Debugging Deployed Issues

### 1. Check Function Logs
```bash
# Install Vercel CLI
npm i -g vercel

# Login and view logs
vercel login
vercel logs [deployment-url]
```

### 2. Test Health Endpoint
```bash
curl https://your-app.vercel.app/api/health
# Should return: {"status":"ok","uptime":123,"timestamp":1234567890}
```

### 3. Test Registration (First Time)
```bash
curl -X POST https://your-app.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### 4. Common Issues

**500 Error on Login/Register:**
- ❌ Missing `MONGO_URI` or `JWT_SECRET` in Vercel env vars
- ❌ MongoDB connection string incorrect
- ❌ MongoDB Atlas IP whitelist doesn't include `0.0.0.0/0`

**404 on API Routes:**
- ❌ `vercel.json` routing misconfigured
- ❌ Function deployment failed

**Module Import Errors:**
- ❌ ES module vs CommonJS mismatch
- ❌ Missing dependencies in `package.json`

## Local vs Production Differences

| Aspect | Local | Production (Vercel) |
|--------|-------|-------------------|
| Runtime | Node.js persistent | Serverless functions |
| Environment | `.env` file | Vercel dashboard |
| Logs | Terminal console | Vercel function logs |
| Database | Direct connection | Serverless connection pooling |

## Quick Fixes

### Reset User (if login fails)
1. Delete user from MongoDB Atlas dashboard
2. Use "Create Admin User" button on login page
3. Try login again

### Re-deploy with Debug Logs
1. Push changes to GitHub
2. Vercel auto-deploys
3. Check logs: `vercel logs`

### MongoDB Atlas Setup
1. Go to Security → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
3. Go to Database → Connect → Choose connection method
4. Copy connection string to Vercel `MONGO_URI`

## Success Indicators

✅ Health endpoint returns 200 OK
✅ Registration creates user in MongoDB
✅ Login returns JWT token
✅ Frontend redirects to dashboard after login
