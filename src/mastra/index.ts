
import { Mastra } from '@mastra/core/mastra';
import { MCPServer } from '@mastra/mcp';
import { createServer } from 'http';
import { wikipediaSummaryTool } from './tools/wikipedia-summary';
import { wikipediaSearchTool } from './tools/wikipedia-search';

export const mastra = new Mastra({
  
});

// Create the MCP Server with Wikipedia tools
const mcpServer = new MCPServer({
  name: 'Wikipedia MCP Server',
  version: '1.0.0',
  description: 'A Model Context Protocol server providing Wikipedia search and summary tools',
  tools: {
    wikipediaSummary: wikipediaSummaryTool,
    wikipediaSearch: wikipediaSearchTool,
  },
});

// HTTP server for MCP
const PORT = process.env.PORT || 3000;

const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url || '', `http://localhost:${PORT}`);
  
  // Handle CORS for browser clients
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    await mcpServer.startHTTP({
      url,
      httpPath: '/mcp',
      req,
      res,
    });
  } catch (error) {
    console.error('MCP Server error:', error);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Wikipedia MCP Server running on http://localhost:${PORT}`);
  console.log(`📚 MCP endpoint: http://localhost:${PORT}/mcp`);
  console.log(`🔧 Available tools: wikipediaSummary, wikipediaSearch`);
  console.log(`📝 For Cursor integration, use: http://localhost:${PORT}/mcp`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down Wikipedia MCP Server...');
  await mcpServer.close();
  httpServer.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
});

export { mcpServer };
