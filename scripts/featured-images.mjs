const replacements = [
  {
    original: '/assets/fd0512c6eec7-6a75afba3d5084e083fba4bc_Strawberry-Matcha.avif',
    image: '/assets/card-featured-1.jpg',
    alt: 'Bolos folhados de morango preparados pela Baguete Padaria e Confeitaria.'
  },
  {
    original: '/assets/c6276af07c45-6a75afbac32121ab710a7d78_Cherry-Cloud-Mocha.avif',
    image: '/assets/card-featured-2.jpg',
    alt: 'Torta de morango artesanal apresentada sobre uma tábua de madeira.'
  }
];

export function applyFeaturedImages(html) {
  for (const item of replacements) {
    const escaped = item.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`<img\\b([^>]*?)src="${escaped}"([^>]*?)>`, 'g');
    let count = 0;
    html = html.replace(pattern, (_, before, after) => {
      count++;
      const tag = `<img${before}src="${item.image}"${after}>`;
      return tag.replace(/alt="[^"]*"/, `alt="${item.alt}"`);
    });
    if (count !== 1) throw new Error(`Expected one featured image for ${item.image}; found ${count}`);
  }
  return html;
}
