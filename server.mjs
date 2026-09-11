import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve(import.meta.dirname, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.ico': 'image/x-icon' };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(directory, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(directory + path.sep)) { response.writeHead(403); response.end('Forbidden'); return; }
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    response.end(content);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500); response.end('Unable to load page');
  }
}).listen(3000, '127.0.0.1', () => console.log('http://127.0.0.1:3000'));
