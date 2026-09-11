export function applyFooterLogoAttention(html) {
  const footerStart = html.indexOf('<footer class="footer">');
  if (footerStart === -1) return html;

  const beforeFooter = html.slice(0, footerStart);
  let footer = html.slice(footerStart);
  const illustrationPattern = /<img[^>]*class="illustration footer-logo-illu"[^>]*\/?\s*>/;
  const illustration = footer.match(illustrationPattern)?.[0];
  if (!illustration) return html;

  footer = footer.replace(illustrationPattern, '');
  footer = footer.replace(
    /(<a[^>]*class="logo w-inline-block[^"]*"[^>]*>)([\s\S]*?)(<\/a>)/,
    `$1$2${illustration}$3`,
  );

  return beforeFooter + footer;
}
