# Mello em português

Versão em português brasileiro de https://mello-coffee.webflow.io/, conforme a referência solicitada. Preserva a estrutura, as fotos, as ilustrações, as fontes, o CSS e as animações Webflow/GSAP originais. Marca, preços, unidades, endereço e contatos foram mantidos.

## Development

Execute `node server.mjs` e abra `http://127.0.0.1:3000`. Requer Node.js 22 ou superior, sem instalação de dependências e sem compilação.

## Structure

- `dist/index.html`: página localizada e configurações de interação originais.
- `dist/assets/`: 67 recursos da referência, incluindo fontes, fotos, ilustrações e scripts.
- `dist/styles.css`: ajustes locais mínimos de acessibilidade.
- `dist/portuguese.js`: tradução dos rótulos acessíveis.
- `scripts/translate-mello.json`: dicionário de tradução dos textos, incluindo painéis ocultos.
- `scripts/localize-mello.mjs`: importação e localização reproduzíveis.
- `scripts/mello-assets.json`: relação entre URLs originais e arquivos locais.
- `mello-reference.html`: HTML original usado como fonte da tradução.

Para reaplicar alterações no dicionário, execute `node scripts/localize-mello.mjs`. O processo reutiliza os recursos locais, baixa apenas os ausentes e regenera `dist/index.html`; não sobrescreve `styles.css` ou `portuguese.js`. Os arquivos de `dist/` são a entrega estática e devem permanecer no Git.

As abas de horários e ambiente, o seletor de clima, as faixas contínuas, os efeitos de entrada, os botões e os depoimentos usam os scripts originais. Links de mapas, redes sociais, licenças e guia de estilo mantêm os destinos da referência. Não há formulário nem processamento de pagamentos.

Verificação: `node --check server.mjs`, `node --check dist/portuguese.js` e conferência no navegador em desktop/celular. Não há framework de testes instalado. Créditos e avisos dos recursos de terceiros permanecem nos arquivos e no rodapé.
