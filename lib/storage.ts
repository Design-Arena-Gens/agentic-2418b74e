import { v4 as uuidv4 } from 'uuid';

export interface Content {
  id: string;
  title: string;
  content: string;
  hashtags: string[];
  type: string;
  platforms: string[];
  createdAt: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  postIds?: { [platform: string]: string };
}

// In-memory storage (in production, use a database)
let contents: Content[] = [];

export function saveContent(
  title: string,
  content: string,
  hashtags: string[],
  type: string,
  platforms: string[]
): Content {
  const newContent: Content = {
    id: uuidv4(),
    title,
    content,
    hashtags,
    type,
    platforms,
    createdAt: new Date().toISOString(),
    status: 'draft',
  };

  contents.push(newContent);
  return newContent;
}

export function getAllContents(): Content[] {
  return contents.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getContentById(id: string): Content | undefined {
  return contents.find(c => c.id === id);
}

export function updateContentStatus(
  id: string,
  status: 'draft' | 'published',
  postIds?: { [platform: string]: string }
): void {
  const content = contents.find(c => c.id === id);
  if (content) {
    content.status = status;
    if (status === 'published') {
      content.publishedAt = new Date().toISOString();
      content.postIds = postIds;
    }
  }
}

export function getDraftContents(): Content[] {
  return contents.filter(c => c.status === 'draft');
}

export function getPublishedContents(): Content[] {
  return contents.filter(c => c.status === 'published');
}

export function deleteContent(id: string): void {
  contents = contents.filter(c => c.id !== id);
}

export function clearAllContents(): void {
  contents = [];
}
