'use client';

import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: string;
  platforms: string[];
  createdAt: string;
  status: string;
}

export default function Home() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [schedulerStatus, setSchedulerStatus] = useState('unknown');
  const [apiKeys, setApiKeys] = useState({
    anthropic: '',
    youtube: '',
    tiktok: '',
    facebook: ''
  });

  useEffect(() => {
    fetchContents();
    checkSchedulerStatus();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/contents');
      const data = await response.json();
      setContents(data.contents || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  const checkSchedulerStatus = async () => {
    try {
      const response = await fetch('/api/scheduler/status');
      const data = await response.json();
      setSchedulerStatus(data.status);
    } catch (error) {
      console.error('Error checking scheduler:', error);
    }
  };

  const generateContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        alert('Content generated successfully!');
        fetchContents();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error generating content: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const publishContent = async (id: string) => {
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentId: id }),
      });
      const data = await response.json();

      if (data.success) {
        alert('Content published successfully!');
        fetchContents();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error publishing content: ' + error);
    }
  };

  const startScheduler = async () => {
    try {
      const response = await fetch('/api/scheduler/start', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        alert('Scheduler started!');
        checkSchedulerStatus();
      }
    } catch (error) {
      alert('Error starting scheduler: ' + error);
    }
  };

  const stopScheduler = async () => {
    try {
      const response = await fetch('/api/scheduler/stop', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        alert('Scheduler stopped!');
        checkSchedulerStatus();
      }
    } catch (error) {
      alert('Error stopping scheduler: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🚀 Viral Content Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate and schedule viral content for YouTube, TikTok, and Facebook automatically
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button
                onClick={generateContent}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : '✨ Generate Content Now'}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={startScheduler}
                  className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  ▶️ Start Auto-Post
                </button>
                <button
                  onClick={stopScheduler}
                  className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  ⏸️ Stop Auto-Post
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Scheduler Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  schedulerStatus === 'running'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {schedulerStatus === 'running' ? '🟢 Active' : '⚪ Inactive'}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Schedule: Daily at 9:00 AM
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Contents: {contents.length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Generated Content
          </h2>

          {contents.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">No content yet</p>
              <p className="text-sm">Click "Generate Content Now" to create your first viral content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contents.map((content) => (
                <div key={content.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {content.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      content.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {content.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                    {content.content}
                  </p>

                  <div className="flex gap-1 mb-3 flex-wrap">
                    {content.platforms.map((platform) => (
                      <span key={platform} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        {platform}
                      </span>
                    ))}
                  </div>

                  {content.status === 'draft' && (
                    <button
                      onClick={() => publishContent(content.id)}
                      className="w-full bg-purple-500 text-white py-2 px-4 rounded text-sm font-semibold hover:bg-purple-600 transition-all"
                    >
                      📤 Publish Now
                    </button>
                  )}

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(content.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            📋 Setup Instructions
          </h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>To enable automatic posting, you need to configure API keys:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Set <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ANTHROPIC_API_KEY</code> for content generation</li>
              <li>Configure YouTube API credentials (API Key, Client ID, Client Secret, Refresh Token)</li>
              <li>Set TikTok Access Token and Open ID</li>
              <li>Set Facebook Access Token and Page ID</li>
              <li>Adjust <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">CRON_SCHEDULE</code> for posting time (default: 9 AM daily)</li>
            </ol>
            <p className="mt-4">
              Check <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">.env.example</code> for all required environment variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
