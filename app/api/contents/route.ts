import { NextResponse } from 'next/server';
import { getAllContents } from '@/lib/storage';

export async function GET() {
  try {
    const contents = getAllContents();

    return NextResponse.json({
      success: true,
      contents,
    });
  } catch (error) {
    console.error('Error fetching contents:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch contents',
      },
      { status: 500 }
    );
  }
}
