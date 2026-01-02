import { NextResponse } from 'next/server';
import { generateViralContent } from '@/lib/contentGenerator';
import { saveContent } from '@/lib/storage';

export async function POST() {
  try {
    const content = await generateViralContent();

    const saved = saveContent(
      content.title,
      content.content,
      content.hashtags,
      content.type,
      content.platforms
    );

    return NextResponse.json({
      success: true,
      content: saved,
    });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate content',
      },
      { status: 500 }
    );
  }
}
