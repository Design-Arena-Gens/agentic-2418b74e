import { NextResponse } from 'next/server';
import { startScheduler } from '@/lib/scheduler';

export async function POST() {
  try {
    startScheduler();

    return NextResponse.json({
      success: true,
      message: 'Scheduler started successfully',
    });
  } catch (error) {
    console.error('Error starting scheduler:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to start scheduler',
      },
      { status: 500 }
    );
  }
}
