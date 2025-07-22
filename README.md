# Wikipedia MCP Server

A Model Context Protocol (MCP) server built with Mastra that provides Wikipedia search and summary tools. This server allows AI assistants like Cursor to access Wikipedia content seamlessly.

## 🚀 Features

- **Wikipedia Search**: Search for Wikipedia articles by query term
- **Wikipedia Summary**: Get detailed summaries of Wikipedia pages
- **HTTP Mode**: Easy integration with Cursor and other MCP clients
- **Simple & Clean**: Minimal setup with robust functionality

## 📦 Prerequisites

- Node.js >= 20.9.0
- npm or yarn

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the MCP server:**
   ```bash
   npm run start:mcp
   ```

   The server will start on `http://localhost:3000` with the MCP endpoint at `http://localhost:3000/mcp`.

## 🔧 Available Tools

### 1. Wikipedia Summary Tool
- **ID**: `wikipediaSummary`
- **Description**: Get a summary of a Wikipedia article by page title
- **Input**: `{ title: string }` - The title of the Wikipedia page
- **Output**: Returns title, summary, URL, and page ID

### 2. Wikipedia Search Tool  
- **ID**: `wikipediaSearch`
- **Description**: Search Wikipedia for articles related to a query term
- **Input**: `{ query: string, limit?: number }` - Search query and optional result limit
- **Output**: Returns list of matching article titles

## 🎯 Using with Cursor

### Step 1: Start the MCP Server
```bash
npm run start:mcp
```

You should see output like:
```
🚀 Wikipedia MCP Server running on http://localhost:3000
📚 MCP endpoint: http://localhost:3000/mcp
🔧 Available tools: wikipediaSummary, wikipediaSearch
📝 For Cursor integration, use: http://localhost:3000/mcp
```

### Step 2: Configure Cursor

1. **Open Cursor Settings:**
   - Press `Cmd/Ctrl + Shift + P`
   - Type "Preferences: Open Settings (JSON)"
   - Or go to File → Preferences → Settings → Extensions → Cursor

2. **Add MCP Configuration:**
   Add the following to your Cursor settings JSON:

   ```json
   {
     "mcp": {
       "mcpServers": {
         "wikipedia": {
           "command": "curl",
           "args": [
             "-X", "POST",
             "-H", "Content-Type: application/json",
             "-d", "@-",
             "http://localhost:3000/mcp"
           ]
         }
       }
     }
   }
   ```

   **Alternative HTTP Configuration:**
   ```json
   {
     "mcp": {
       "mcpServers": {
         "wikipedia": {
           "url": "http://localhost:3000/mcp"
         }
       }
     }
   }
   ```

### Step 3: Restart Cursor
Restart Cursor for the changes to take effect.

### Step 4: Test the Integration

Try asking Cursor questions like:
- "Search Wikipedia for 'machine learning'"
- "Get me a summary of the Wikipedia page for 'Artificial Intelligence'"
- "What can you tell me about quantum computing using Wikipedia?"

## 📝 Example Usage

Once configured, you can interact with the Wikipedia tools through Cursor:

```
User: "Search Wikipedia for recent articles about space exploration"

Cursor: I'll search Wikipedia for space exploration articles for you.
[Uses wikipediaSearch tool]

User: "Get me a summary of the SpaceX article"

Cursor: I'll get the Wikipedia summary for SpaceX.
[Uses wikipediaSummary tool]
```

## 🐛 Troubleshooting

### Server Won't Start
- Ensure Node.js version >= 20.9.0
- Check if port 3000 is available: `lsof -i :3000`
- Try a different port: `PORT=3001 npm run start:mcp`

### Cursor Not Connecting
- Verify the server is running: `curl http://localhost:3000/mcp`
- Check Cursor settings JSON syntax
- Restart Cursor after configuration changes
- Check Cursor's developer console for error messages

### Tools Not Working
- Ensure Wikipedia package is installed: `npm list wikipedia`
- Check network connectivity
- Review server logs for error messages

## 🔍 Development

### Project Structure
```
src/
├── mastra/
│   ├── index.ts          # MCP server setup and HTTP server
│   └── tools/
│       ├── wikipedia-search.ts    # Wikipedia search tool
│       └── wikipedia-summary.ts   # Wikipedia summary tool
```

### Running in Development
```bash
# Start with auto-reload
npx tsx watch src/mastra/index.ts

# Or use the npm script
npm run start:mcp
```

## 📚 Technologies Used

- **[Mastra](https://mastra.ai)**: AI framework for building agents and tools
- **[Wikipedia API](https://www.npmjs.com/package/wikipedia)**: Node.js Wikipedia API wrapper
- **[Model Context Protocol](https://modelcontextprotocol.io)**: Open standard for AI tool integration
- **TypeScript**: Type-safe development
- **Zod**: Schema validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Cursor
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Happy coding! 🎉** If you encounter any issues, please feel free to open an issue or contribute to the project. 