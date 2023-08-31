export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;

  // strip HTML tags
  const strippedContent = content.replace(/<[^>]+>/g, '');

  // count whitespace-separated words, rather than just words
  const wordCount = strippedContent.match(/\S+/g)?.length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} min read`;
}
