import { NextResponse } from 'next/server';
import { stopScheduler } from '@/lib/scheduler';

export async function POST() {
  try {
    stopScheduler();

    return NextResponse.json({
      success: true,
      message: 'Scheduler stopped successfully',
    });
  } catch (error) {
    console.error('Error stopping scheduler:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to stop scheduler',
      },
      { status: 500 }
    );
  }
}
