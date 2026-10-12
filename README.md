# Átrio · Landing de Sites (sites.atriomarketing.site)

Landing page de venda de sites com SEO profissional. Next.js 15 + React.

## Rodar local
```
npm install
npm run dev
```

## Deploy (Vercel)
1. Suba este repositório no GitHub
2. Importe na Vercel (New Project)
3. Configure o domínio: sites.atriomarketing.site
4. Deploy automático a cada push

## Estrutura
- app/layout.js — metadata, SEO, fontes
- app/page.js — a landing (hero, prova social, diferenciais, vídeo, CTA)
- app/globals.css — design system prata premium

## Editar depois
- WhatsApp: constante WHATSAPP no topo de app/page.js
- Números da prova: componente Proof em app/page.js
- Vídeo: componente VideoBlock (ID do YouTube Shorts)
