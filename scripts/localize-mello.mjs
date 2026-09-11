import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { applyCoffeeHero } from './coffee-hero.mjs';
import { applyFeaturedImages } from './featured-images.mjs';
import { applyWhatsappButton } from './whatsapp-button.mjs';

// Reproducible localization of the supplied reference; never executes downloaded code.
const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'dist');
const assets = path.join(output, 'assets');
await mkdir(assets, { recursive: true });
const translations = JSON.parse(await readFile(path.join(root, 'scripts/translate-mello.json'), 'utf8'));
let html = await readFile(path.join(root, 'mello-reference.html'), 'utf8');
const resources = new Map();
const hosts = new Set(['cdn.prod.website-files.com', 'd3e54v103j8qbb.cloudfront.net']);
function collect(text) {
  for (const match of text.matchAll(/https:\/\/[^\s"'<>\)\\]+/g)) {
    const url = match[0].replace(/&amp;/g, '&');
    const parsed = new URL(url);
    if (!hosts.has(parsed.hostname) || !path.extname(parsed.pathname)) continue;
    if (!resources.has(url)) {
      const name = createHash('sha256').update(url).digest('hex').slice(0, 12) + '-' + decodeURIComponent(path.basename(parsed.pathname)).replace(/[^a-zA-Z0-9._-]/g, '-');
      resources.set(url, { local: 'assets/' + name, done: false });
    }
  }
}
collect(html);
const manifestPath = path.join(root, 'scripts/mello-assets.json');
if (existsSync(manifestPath)) {
  for (const [url, local] of Object.entries(JSON.parse(await readFile(manifestPath, 'utf8')))) {
    if (!resources.has(url)) resources.set(url, { local, done: false });
  }
}
while ([...resources.values()].some(r => !r.done)) {
  const batch = [...resources.entries()].filter(([, r]) => !r.done).slice(0, 6);
  await Promise.all(batch.map(async ([url, resource]) => {
    const cachedPath = path.join(output, resource.local);
    if (existsSync(cachedPath)) {
      resource.done = true;
      if (/\.css(?:\?|$)/.test(url)) collect(await readFile(cachedPath, 'utf8'));
      return;
    }
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Asset ${response.status}: ${url}`);
    const data = Buffer.from(await response.arrayBuffer());
    await writeFile(path.join(output, resource.local), data);
    resource.done = true;
    if (/\.css(?:\?|$)/.test(url)) collect(data.toString('utf8'));
  }));
  console.log(`Downloaded ${[...resources.values()].filter(r => r.done).length}/${resources.size} assets`);
}
for (const [url, resource] of resources) {
  if (!/\.css(?:\?|$)/.test(url)) continue;
  let css = await readFile(path.join(output, resource.local), 'utf8');
  for (const [remote, target] of resources) css = css.split(remote).join(path.basename(target.local));
  await writeFile(path.join(output, resource.local), css);
}
for (const [url, resource] of resources) {
  html = html.split(url).join('/' + resource.local);
  html = html.split(url.replace(/&/g, '&amp;')).join('/' + resource.local);
}
// Translate text nodes only, preserving scripts, selectors and Webflow interaction IDs.
const protectedBlocks = [];
html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, block => {
  protectedBlocks.push(block);
  return `<!--MELLO_BLOCK_${protectedBlocks.length - 1}-->`;
});
let translated = 0;
html = html.replace(/>([^<>]+)</g, (full, text) => {
  const key = text.trim();
  if (!Object.hasOwn(translations, key)) return full;
  translated++;
  return '>' + text.replace(key, translations[key]) + '<';
});
html = html.replace(/<!--MELLO_BLOCK_(\d+)-->/g, (_, index) => protectedBlocks[Number(index)]);
html = html.replace('<html ', '<html lang="pt-BR" ')
  .replace('data-wf-domain="mello-coffee.webflow.io"', 'data-wf-domain=""')
  .replaceAll('https://mello-coffee.webflow.io/#', '/#')
  .replaceAll('href="/info/', 'href="https://mello-coffee.webflow.io/info/')
  .replaceAll('subject=Support', 'subject=Contato')
  .replaceAll('hi@mello.com', 'contato@baguetepadaria.com.br')
  .replaceAll('https://google.com/maps', 'https://www.google.com/maps/search/?api=1&query=Av.+Sete,+942+-+Centro,+Ituiutaba+-+MG,+38300-152')
  .replace(/ integrity="[^"]*"/g, '')
  .replaceAll('Mello - Webflow HTML website template', 'Baguete Padaria e Confeitaria — Há mais de 40 anos reunindo famílias')
  .replaceAll('Visit Mello in Brooklyn, NY for a brighter coffee break. Enjoy our specialty espresso, refreshing cold matcha, and freshly baked pastries. Open daily 7AM-6PM.', 'Conheça a Baguete Padaria e Confeitaria em Ituiutaba, MG. Pães quentinhos, bolos recheados, salgados e café fresquinho. Todos os dias, das 05h30 às 22h30.')
  .replaceAll('<div class="logo-font">Mello</div>', '<div class="logo-font" style="display: inline-flex; align-items: center; justify-content: center;"><img src="/assets/baguete-logo-2k-transparent.png" alt="Baguete Padaria e Confeitaria" class="site-logo-img" style="height: 120px; width: auto; max-height: 140px; object-fit: contain; vertical-align: middle; display: inline-block;" /></div>')
  .replaceAll('>Mello<', '>Baguete<')
  .replace('<div class="product"><div class="product-text-wrapper"><div class="display-s">Pão de Queijo</div><div class="details"><div class="body-m">Matcha</div><div class="divider"></div><div class="body-m">Queijo Canastra</div></div></div><div class="details"><div class="emphasis-m">$6.00</div><div data-wf--volume--variant="black" class="volume"><div class="body-s">16 oz</div></div></div></div>', '<div class="product"><div class="product-text-wrapper"><div class="display-s">O melhor<br/>Café de Ituiutaba</div></div></div>')
  .replaceAll('<a href="https://webflow.com" target="_blank" class="link w-inline-block"><div class="emphasis-m">Powered by Webflow</div></a>', '')
  .replaceAll('<a href="https://webflow.com" target="_blank" class="link w-inline-block"><div class="emphasis-m">Feito com Webflow</div></a>', '')
  .replace(/>\$(\d+\.\d{2})</g, '>R$ $1<')
  .replace('</head>', '<link rel="stylesheet" href="/styles.css"/></head>')
  .replace('</body>', '<script src="/portuguese.js"></script></body>');
html = applyCoffeeHero(html);
html = applyFeaturedImages(html);
html = applyWhatsappButton(html);
await writeFile(path.join(output, 'index.html'), html);
await writeFile(path.join(root, 'scripts/mello-assets.json'), JSON.stringify(Object.fromEntries([...resources].map(([url, r]) => [url, r.local])), null, 2) + '\n');
console.log(`Localized ${translated} text nodes; preserved original markup, styling and animation scripts.`);
