// Servește site/ local și face screenshot full-page la 3 viewport-uri + verificări de bază.
// Output: shots/{desktop,tablet,mobile}.png și shots/report.md
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve('site');
const OUT = path.resolve('shots');
const PORT = 4173;
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const rel = urlPath.endsWith('/') ? urlPath + 'index.html' : urlPath;
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end();
      return;
    }
    const data = await fs.readFile(file);
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((resolve) => server.listen(PORT, resolve));
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const lines = ['| Viewport | Overflow orizontal | Erori consolă |', '|---|---|---|'];
let failed = false;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(String(err)));
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  await page.screenshot({ path: path.join(OUT, `${vp.name}.png`), fullPage: true });
  lines.push(`| ${vp.name} (${vp.width}px) | ${overflow ? 'DA' : 'nu'} | ${errors.length} |`);
  if (overflow || errors.length) failed = true;
  await page.close();
}

await browser.close();
server.close();
await fs.writeFile(path.join(OUT, 'report.md'), lines.join('\n') + '\n');
console.log(lines.join('\n'));
process.exit(failed ? 1 : 0);
