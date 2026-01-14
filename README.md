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
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de dados (Postgres)
# Necessário no deploy (Vercel) e para rodar admin/conteúdo dinâmico.
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require

# NextAuth (se usar rotas de auth/admin)
NEXTAUTH_SECRET=sua_secret_aqui
NEXTAUTH_URL=http://localhost:3000

# GitHub Token (para API de projetos)
GITHUB_TOKEN=seu_token_aqui
```

Para referência, veja também o arquivo `.env.example`.

### Analytics (GoatCounter)
O rastreamento é feito via GoatCounter e já está configurado no `src/app/layout.tsx` usando o script:
`data-goatcounter="https://dayvsonmarques.goatcounter.com/count"`.

## Scripts úteis
- `npm run dev` – ambiente de desenvolvimento
- `npm run build` – build de produção
- `npm run start` – servidor após build
- `npm run lint` – checagem de lint
- `npm run db:push` – aplica o schema no banco (Prisma db push)
- `npm run seed` – popula dados iniciais

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
