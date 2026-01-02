import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface GeneratedContent {
  title: string;
  content: string;
  hashtags: string[];
  type: 'short' | 'long';
  platforms: string[];
}

export async function generateViralContent(): Promise<GeneratedContent> {
  const contentTypes = [
    'trending tech news',
    'life hacks',
    'motivational quotes',
    'fun facts',
    'productivity tips',
    'health tips',
    'cooking recipes',
    'travel destinations',
    'funny observations',
    'business insights'
  ];

  const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];

  const prompt = `Generate a viral social media post about ${randomType}.

Requirements:
- Make it engaging and shareable
- Include emotional hooks
- Keep it concise (max 200 words for content)
- Include 5-7 relevant hashtags
- Make it suitable for YouTube Shorts, TikTok, and Facebook
- Use Indonesian language (Bahasa Indonesia)
- Make it trending and attention-grabbing

Return ONLY a JSON object with this exact structure:
{
  "title": "catchy title here",
  "content": "main content here",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
}`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      title: parsed.title,
      content: parsed.content,
      hashtags: parsed.hashtags || [],
      type: 'short',
      platforms: ['youtube', 'tiktok', 'facebook'],
    };
  } catch (error) {
    console.error('Error generating content:', error);

    // Fallback content
    return {
      title: '✨ Konten Viral Hari Ini!',
      content: `🔥 Tips Viral Hari Ini!\n\nJangan lewatkan informasi menarik ini yang lagi trending! Share ke teman-teman kalian ya! 💯\n\n#viral #trending #tipsharini`,
      hashtags: ['#viral', '#trending', '#tipsharini', '#kontenkreator', '#fyp'],
      type: 'short',
      platforms: ['youtube', 'tiktok', 'facebook'],
    };
  }
}

export async function generateVideoScript(title: string, content: string): Promise<string> {
  return `
=== VIDEO SCRIPT ===
Title: ${title}

[INTRO - 2 seconds]
🎵 Upbeat music starts
📱 Eye-catching text animation: "${title}"

[MAIN CONTENT - 15 seconds]
${content}

[OUTRO - 3 seconds]
👍 Like & Follow untuk konten viral lainnya!
💬 Comment pendapat kalian!
🔄 Share ke teman-teman!

Total Duration: ~20 seconds (perfect for Shorts/TikTok)
`;
}
