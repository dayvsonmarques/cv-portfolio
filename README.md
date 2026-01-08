# Portfolio Dayvson Marques

Portfólio Desenvolvedor Web full stack construído com Javascript e Github Copilot para apresentar meus projetos, habilidades e experiências, disponíveis em três idiomas.

## Destaques
- Menu fullscreen com dark mode e seletor de idioma
- Hero animado com CTA, redes sociais e descrição otimizada para SEO
- Seções: Sobre, Habilidades, Experiência, Projetos, Blog e Contato
- Blog com página individual, datas formatadas por idioma e rich snippets
- Integração com NextAuth para área administrativa (grupos, permissões e conteúdo)

## Stack
- Next.js 15 · React 19
- TypeScript · ESLint
- Tailwind CSS
- Context API para tema e i18n

## Como rodar
```bash
git clone <repo>
cd webapp-copilot
npm install
npm run dev
```
Acesse http://localhost:3000.

## Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# GitHub Token (para API de projetos)
GITHUB_TOKEN=seu_token_aqui
```

### Analytics (GoatCounter)
O rastreamento é feito via GoatCounter e já está configurado no `src/app/layout.tsx` usando o script:
`data-goatcounter="https://dayvsonmarques.goatcounter.com/count"`.

## Scripts úteis
- `npm run dev` – ambiente de desenvolvimento
- `npm run build` – build de produção
- `npm run start` – servidor após build
- `npm run lint` – checagem de lint

## Estrutura rápida
```
src/
├─ app/           rotas, layout, APIs e admin
├─ components/    UI compartilhada
├─ contexts/      tema e linguagem
├─ data/          conteúdo mockado
└─ lib/           utilitários e config
```

---

Feito com ❤️ por Dayvson Marques usando Next.js e Tailwind CSS.
# indicativa
