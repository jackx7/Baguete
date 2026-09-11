(() => {
  const descriptions = {
    'Clear glass filled with iced green matcha tea, condensation on glass surface.': 'Copo transparente de bebida gelada especial, com gotas de condensação.',
    'Layered strawberry matcha drink with ice and sliced strawberries in a ribbed glass.': 'Bebida de morango em camadas com gelo e morangos fatiados em um copo canelado.',
    'Iced chocolate drink with foam, ice cubes, grated chocolate, and a cherry in a ribbed glass on beige surface.': 'Chocolate gelado com espuma, gelo, raspas de chocolate e uma cereja em um copo canelado.',
    'Bright coffee shop interior with wooden stools, green tile counter, pastries, and barista at espresso machine.': 'Cafeteria iluminada com bancos de madeira, balcão elegante e barista preparando café.',
    'Glass of iced chocolate drink topped with pink whipped cream and a cherry, beside a chocolate croissant on a green plate.': 'Chocolate gelado com creme rosa e cereja ao lado de um croissant de chocolate.',
    'People enjoying coffee and pastries inside a cozy café with green tiled counters and wooden stools.': 'Pessoas saboreando café e doces em uma cafeteria aconchegante.',
    'Iced green matcha drink with strawberries, espresso in green cup, and cinnamon roll with icing on green shapes.': 'Bebida gelada com morangos, espresso em xícara especial e rolinho de canela com cobertura.',
  };
  document.querySelectorAll('img[alt]').forEach(image => {
    if (descriptions[image.alt]) image.alt = descriptions[image.alt];
  });
  const localizeControls = () => {
    document.querySelectorAll('[aria-label]').forEach(element => {
      const label = element.getAttribute('aria-label');
      if (label === 'previous slide') element.setAttribute('aria-label', 'Depoimento anterior');
      if (label === 'next slide') element.setAttribute('aria-label', 'Próximo depoimento');
      if (/^\d+ of \d+$/.test(label)) element.setAttribute('aria-label', label.replace(' of ', ' de '));
      if (label === 'carousel') element.setAttribute('aria-label', 'Depoimentos');
    });
  };
  localizeControls();
  window.Webflow = window.Webflow || [];
  window.Webflow.push(localizeControls);

  // Short, one-shot entrances on phones; no hidden content or load-event wait.
  if (window.gsap && 'IntersectionObserver' in window) {
    const mobileMotion = window.gsap.matchMedia();
    mobileMotion.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const animations = [];
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          animations.push(window.gsap.fromTo(entry.target,
            { '--mobile-reveal-y': '18px' },
            { '--mobile-reveal-y': '0px', duration: 0.4, ease: 'power2.out', overwrite: 'auto' }));
        });
      }, { rootMargin: '0px 0px 40px 0px', threshold: 0.01 });
      document.querySelectorAll('section[data-wf-target]').forEach(section => observer.observe(section));
      return () => {
        observer.disconnect();
        animations.forEach(animation => animation.kill());
        document.querySelectorAll('section[data-wf-target]').forEach(section => section.style.removeProperty('--mobile-reveal-y'));
      };
    });
  }
})();
