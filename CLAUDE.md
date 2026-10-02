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

## Comandos úteis

- `npm run dev:restart` — reinicia o dev server limpando a porta 3000 primeiro.
- `npx eslint <arquivo>` — lint rápido de um arquivo específico depois de editar.
- `npx tsc --noEmit -p tsconfig.json` — typecheck completo do projeto.
