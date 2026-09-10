import http from 'node:http';
import { readFile } from 'node:fs/promises';

const routes = new Map([
  ['/', ['dist/index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['dist/index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['dist/styles.css', 'text/css; charset=utf-8']],
]);
http.createServer(async (request, response) => {
  const route = routes.get(new URL(request.url, 'http://localhost').pathname);
  if (!route) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const content = await readFile(new URL(route[0], import.meta.url));
    response.writeHead(200, { 'Content-Type': route[1] });
    response.end(content);
  } catch {
    response.writeHead(500); response.end('Unable to load page');
  }
}).listen(3000, '127.0.0.1', () => console.log('http://127.0.0.1:3000'));
