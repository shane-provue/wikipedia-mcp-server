import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import wikipedia from 'wikipedia';

export const wikipediaSearchTool = createTool({
  id: 'Wikipedia Search',
  description: 'Search Wikipedia for articles related to a query term',
  inputSchema: z.object({
    query: z.string().describe('The search query to find Wikipedia articles'),
    limit: z.number().optional().default(10).describe('Maximum number of results to return (default: 10)'),
  }),
  execute: async ({ context }) => {
    try {
      console.log(`Searching Wikipedia for: ${context.query}`);
      
      // Search Wikipedia for the given query
      const searchResults = await wikipedia.search(context.query);
      
      // Limit the results to the requested number
      const limitedResults = searchResults.results.slice(0, context.limit || 10);
      
      return {
        query: context.query,
        results: limitedResults.map(result => ({
          title: result,
          // Note: The search API only returns titles, not summaries
          // Users can use the summary tool to get details for specific articles
        })),
        totalResults: limitedResults.length,
        totalAvailable: searchResults.results.length,
      };
    } catch (error) {
      console.error('Wikipedia search error:', error);
      return {
        error: `Failed to search Wikipedia for "${context.query}": ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  },
}); 