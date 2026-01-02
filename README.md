# 🚀 Viral Content Generator

Automated viral content generator and scheduler for YouTube, TikTok, and Facebook.

## 🌐 Live Demo

**Production URL:** https://agentic-2418b74e.vercel.app

## ✨ Features

- 🤖 **AI-Powered Content Generation** - Uses Claude AI to generate engaging viral content
- 📅 **Auto-Scheduler** - Automatically posts content daily at scheduled times
- 🎯 **Multi-Platform Support** - YouTube Shorts, TikTok, and Facebook
- 🇮🇩 **Indonesian Language** - Content optimized for Indonesian audience
- 📊 **Dashboard** - View all generated content and publishing status
- ⚡ **Real-time Updates** - Instant feedback on content generation and publishing

## 🛠️ Technology Stack

- **Framework:** Next.js 15.5.9 (React 19)
- **AI:** Anthropic Claude API
- **Styling:** Tailwind CSS
- **Scheduling:** Node-cron
- **Deployment:** Vercel

## 📋 Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd agentic-2418b74e
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Required for content generation
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# YouTube API (optional for automated posting)
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
YOUTUBE_REFRESH_TOKEN=your_youtube_refresh_token

# TikTok API (optional for automated posting)
TIKTOK_ACCESS_TOKEN=your_tiktok_access_token
TIKTOK_OPEN_ID=your_tiktok_open_id

# Facebook API (optional for automated posting)
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
FACEBOOK_PAGE_ID=your_facebook_page_id

# Cron Schedule (default: daily at 9 AM)
CRON_SCHEDULE=0 9 * * *
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 🎯 How to Use

### Manual Content Generation

1. Click **"✨ Generate Content Now"** button
2. Wait for AI to generate viral content
3. Review generated content in the dashboard
4. Click **"📤 Publish Now"** to post to social media

### Automated Scheduling

1. Configure your API keys in `.env` file
2. Click **"▶️ Start Auto-Post"** button
3. Content will be generated and posted automatically at scheduled time (default: 9 AM daily)
4. Click **"⏸️ Stop Auto-Post"** to pause automation

### Content Types

The AI generates various types of viral content:
- 📱 Trending tech news
- 💡 Life hacks
- 🎯 Motivational quotes
- 🤯 Fun facts
- ⚡ Productivity tips
- 🏃 Health tips
- 🍳 Cooking recipes
- ✈️ Travel destinations
- 😄 Funny observations
- 💼 Business insights

## 🔧 API Endpoints

### Content Generation
- `POST /api/generate` - Generate new viral content

### Publishing
- `POST /api/publish` - Publish content to social media
- `GET /api/contents` - Get all generated content

### Scheduler
- `POST /api/scheduler/start` - Start automated posting
- `POST /api/scheduler/stop` - Stop automated posting
- `GET /api/scheduler/status` - Check scheduler status

## 🔐 Getting API Keys

### Anthropic API Key (Required)
1. Visit https://console.anthropic.com/
2. Create an account
3. Generate API key from settings

### YouTube API (Optional)
1. Visit https://console.cloud.google.com/
2. Create a project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials

### TikTok API (Optional)
1. Visit https://developers.tiktok.com/
2. Create an app
3. Get access token for posting

### Facebook API (Optional)
1. Visit https://developers.facebook.com/
2. Create an app
3. Get Page Access Token

## 📅 Cron Schedule Format

The `CRON_SCHEDULE` uses standard cron format:
```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7, 0 and 7 = Sunday)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

Examples:
- `0 9 * * *` - Every day at 9:00 AM
- `0 12,18 * * *` - Twice daily at 12 PM and 6 PM
- `0 */6 * * *` - Every 6 hours
- `30 8 * * 1-5` - 8:30 AM on weekdays

## 🌟 Features Coming Soon

- 📸 Automatic image generation for posts
- 🎬 Video creation from text
- 📈 Analytics and engagement tracking
- 🎨 Customizable content templates
- 🔄 Multi-account support
- 📱 Mobile app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This tool is for educational purposes. Make sure to comply with each platform's terms of service when using automated posting features.

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Visit: https://agentic-2418b74e.vercel.app

---

Built with ❤️ using Next.js and Claude AI
