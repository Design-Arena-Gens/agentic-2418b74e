import { NextResponse } from 'next/server';
import { getSchedulerStatus } from '@/lib/scheduler';

export async function GET() {
  try {
    const status = getSchedulerStatus();

    return NextResponse.json({
      success: true,
      status: status.running ? 'running' : 'stopped',
      schedule: status.schedule,
    });
  } catch (error) {
    console.error('Error getting scheduler status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get status',
      },
      { status: 500 }
    );
  }
}
