# Instruções para o Claude neste projeto

## Sempre reiniciar o dev server após qualquer alteração de código

Depois de editar qualquer arquivo em `src/`, `prisma/` ou configs do projeto, antes de
considerar a tarefa concluída:

1. Garanta que o Postgres local está de pé: `docker compose up -d`
2. Reinicie o dev server de forma segura: `npm run dev:restart`
   - Esse script (`scripts/dev.sh`) mata o processo que estiver preso na porta 3000
     via `ss` (não use `pkill -f "next dev"` — nesse ambiente o `lsof` não enxerga
     os sockets de outros processos, e `pkill` por nome pode matar a sessão errada).
3. Confira o log de saída até aparecer `Ready in` e **sem** linhas de erro.
4. Só depois disso, valide a mudança (visualmente, com Playwright, ou via `curl`).

Não pule esse passo achando que "só mudei uma linha" — o servidor fica preso em
lock/porta com frequência nesse ambiente, e mudanças só aparecem corretas se o
server estiver realmente rodando com o código novo.

## Cache de dados (`unstable_cache`) sobrevive a restarts — cuidado ao reseedar

`src/lib/homeContent.ts` usa `unstable_cache` (tag `home-content`, revalidate 1h) para
ler o conteúdo da home (hero/about/skills/experience/blog) do Postgres. Esse cache é
persistido em disco e **sobrevive a `npm run dev:restart`** — reiniciar o processo
NÃO limpa esse cache.

Se você rodar `SEED_HOME_CONTENT=1 npx prisma db seed` (ex: depois de editar
`src/data/experiences.ts`) e o site continuar mostrando dados antigos mesmo após
reiniciar o dev server:

1. Pare o servidor por completo primeiro (mate o PID da porta 3000 e confirme que
   sumiu, via `ss -ltnp | grep ':3000 '`) — só depois disso limpe o cache. Limpar o
   cache com o servidor ainda vivo não funciona: o processo antigo pode regravar o
   valor obsoleto no disco.
2. Apague o cache **no diretório certo**: no modo dev com Turbopack, o Data Cache
   fica em `.next/dev/cache/`, **não** em `.next/cache/` (que existe mas não é o
   usado pelo `next dev --turbopack`). Rode `rm -rf .next/dev/cache .next/cache`.
3. Só então rode `npm run dev:restart` de novo e valide com `curl` direto
   (`curl -s http://localhost:3000/ | grep -o "algumTexto.\{0,100\}"`) antes de
   abrir no navegador, pra não gastar tempo com cache do próprio browser também.

Isso só afeta o Postgres **local**. Em produção, o cache é invalidado automaticamente
via `revalidateTag` sempre que o conteúdo é editado por `/admin/content` — só vira
problema quando os dados mudam "por fora" (seed/SQL direto) sem passar pela API admin.

## Comandos úteis

- `npm run dev:restart` — reinicia o dev server limpando a porta 3000 primeiro.
- `npx eslint <arquivo>` — lint rápido de um arquivo específico depois de editar.
- `npx tsc --noEmit -p tsconfig.json` — typecheck completo do projeto.
