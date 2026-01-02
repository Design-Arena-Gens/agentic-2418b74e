import { CronJob } from 'cron';
import { generateViralContent } from './contentGenerator';
import { publishToAllPlatforms } from './socialMedia';
import { saveContent, updateContentStatus } from './storage';

let schedulerJob: CronJob | null = null;
let isRunning = false;

export async function executeScheduledPost() {
  console.log('🚀 Executing scheduled post at', new Date().toISOString());

  try {
    // Generate content
    const generatedContent = await generateViralContent();
    console.log('✅ Content generated:', generatedContent.title);

    // Save to storage
    const savedContent = saveContent(
      generatedContent.title,
      generatedContent.content,
      generatedContent.hashtags,
      generatedContent.type,
      generatedContent.platforms
    );

    // Publish to all platforms
    const results = await publishToAllPlatforms(
      generatedContent.title,
      generatedContent.content
    );

    const postIds: { [platform: string]: string } = {};
    results.forEach(result => {
      if (result.success && result.postId) {
        postIds[result.platform] = result.postId;
      }
    });

    // Update status
    updateContentStatus(savedContent.id, 'published', postIds);

    console.log('✅ Content published successfully:', results);
  } catch (error) {
    console.error('❌ Error in scheduled post:', error);
  }
}

export function startScheduler() {
  if (isRunning) {
    console.log('⚠️ Scheduler is already running');
    return;
  }

  // Default: every day at 9 AM
  // Format: second minute hour day month weekday
  const cronSchedule = process.env.CRON_SCHEDULE || '0 9 * * *';

  schedulerJob = new CronJob(
    cronSchedule,
    executeScheduledPost,
    null,
    false,
    'Asia/Jakarta'
  );

  schedulerJob.start();
  isRunning = true;

  console.log('✅ Scheduler started with schedule:', cronSchedule);
}

export function stopScheduler() {
  if (schedulerJob) {
    schedulerJob.stop();
    schedulerJob = null;
  }
  isRunning = false;
  console.log('⏹️ Scheduler stopped');
}

export function getSchedulerStatus() {
  return {
    running: isRunning,
    schedule: process.env.CRON_SCHEDULE || '0 9 * * *',
  };
}

export function isSchedulerRunning() {
  return isRunning;
}
