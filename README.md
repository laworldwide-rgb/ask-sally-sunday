# Ask Sally Sunday

A warm, gentle theology conversation app for children ages 6–13. Powered by the Anthropic API.

---

## Deploy to Vercel

### 1. Push to GitHub
Create a new GitHub repository called `ask-sally-sunday` and push all these files to it.

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**
2. Import your `ask-sally-sunday` GitHub repository
3. Vercel will auto-detect it as a Vite project — no build settings to change
4. Click **Deploy**

### 3. Add the API Key
1. In your Vercel project, go to **Settings → Environment Variables**
2. Add a new variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key
3. Click **Save** then **Redeploy**

### 4. Custom Domain (optional)
In Vercel → **Settings → Domains**, add your custom domain (e.g. `asksallysunday.com`).

---

## Local Development

```bash
npm install
npm run dev
```

Create a `.env.local` file in the root with:
```
ANTHROPIC_API_KEY=your_key_here
```

---

## PWA Icons
Place your icon files in the `/public` folder:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px

These are used for the home screen install icon on iOS and Android.

---

## Project Structure

```
ask-sally-sunday/
├── api/
│   └── chat.js          # Vercel serverless function — Anthropic API proxy
├── public/
│   └── manifest.json    # PWA manifest
├── src/
│   ├── App.jsx          # Sally Sunday main component
│   └── main.jsx         # React entry point
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```
