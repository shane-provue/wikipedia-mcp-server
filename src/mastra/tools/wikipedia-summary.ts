import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import wikipedia from 'wikipedia';

export const wikipediaSummaryTool = createTool({
  id: 'Wikipedia Summary',
  description: 'Get a summary of a Wikipedia article by page title',
  inputSchema: z.object({
    title: z.string().describe('The title of the Wikipedia page to get a summary for'),
  }),
  execute: async ({ context }) => {
    try {
      console.log(`Fetching Wikipedia summary for: ${context.title}`);
      
      // Get the summary for the given title
      const summary = await wikipedia.summary(context.title);
      
      return {
        title: summary.title,
        summary: summary.extract,
        url: summary.content_urls?.desktop?.page || '',
        pageId: summary.pageid,
      };
    } catch (error) {
      console.error('Wikipedia summary error:', error);
      return {
        error: `Failed to fetch Wikipedia summary for "${context.title}": ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  },
}); 