import { NextResponse } from 'next/server';
import { getContentById, updateContentStatus } from '@/lib/storage';
import { publishToAllPlatforms } from '@/lib/socialMedia';

export async function POST(request: Request) {
  try {
    const { contentId } = await request.json();

    if (!contentId) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const content = getContentById(contentId);
    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      );
    }

    const results = await publishToAllPlatforms(content.title, content.content);

    const postIds: { [platform: string]: string } = {};
    results.forEach(result => {
      if (result.success && result.postId) {
        postIds[result.platform] = result.postId;
      }
    });

    updateContentStatus(contentId, 'published', postIds);

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Error publishing content:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to publish content',
      },
      { status: 500 }
    );
  }
}
