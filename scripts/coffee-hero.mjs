// Preserve the existing hero element and its Webflow animation hooks.
export function applyCoffeeHero(html) {
  let count = 0;
  const result = html.replace(/<img\b[^>]*class="[^"]*\bhero-image\b[^"]*"[^>]*>/g, tag => {
    count++;
    return tag.replace(/\bsrc="[^"]*"/, 'src="/assets/baguete-coffee-hero.png"')
      .replace(/loading="lazy"/, 'loading="eager" fetchpriority="high"')
      .replace(/\balt="[^"]*"/, 'alt="Xícara de porcelana com café fresco, fotografada em estúdio."');
  });
  if (count !== 1) throw new Error(`Expected one hero image; found ${count}`);
  return result;
}
