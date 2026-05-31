import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Vite plugin to handle saving JSON locally
function localCMS() {
  return {
    name: 'local-cms',
    configureServer(server) {
      server.middlewares.use('/api/save', (req, res) => {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const filePath = path.resolve(__dirname, 'src/data/invitationData.json');
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            console.error('Failed to save JSON', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localCMS()],
})
