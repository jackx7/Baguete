const whatsappButton = `<a class="whatsapp-float" href="https://wa.me/553432611770?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido." target="_blank" rel="noopener noreferrer" aria-label="Falar com a Baguete pelo WhatsApp" title="Faça seu pedido pelo WhatsApp">
  <span class="whatsapp-float__label">Faça seu pedido</span>
  <span class="whatsapp-float__icon" aria-hidden="true">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" role="img"><path fill="currentColor" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607Zm-5.607 12.2a6.574 6.574 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.25a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.558 6.558 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.1-1.17-.578-1.353-.644-.182-.067-.315-.1-.445.1-.133.197-.514.644-.63.778-.116.133-.232.15-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.986-1.174-1.103-1.37-.116-.198-.012-.305.088-.404.09-.088.197-.23.296-.345.1-.116.133-.198.198-.33.066-.134.033-.25-.017-.35-.05-.099-.445-1.075-.61-1.47-.16-.389-.323-.335-.445-.34a8.08 8.08 0 0 0-.38-.008.729.729 0 0 0-.53.25c-.182.197-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.38 2.992.47.205.84.326 1.126.417.473.15.904.129 1.245.079.38-.058 1.171-.48 1.337-.943.165-.464.165-.86.116-.943-.05-.084-.182-.133-.38-.232Z"/></svg>
  </span>
</a>`;

export function applyWhatsappButton(html) {
  if (html.includes('class="whatsapp-float"')) {
    return html.replace(/<a class="whatsapp-float"[\s\S]*?<\/a>/, whatsappButton);
  }
  return html.replace('</body>', `${whatsappButton}</body>`);
}
