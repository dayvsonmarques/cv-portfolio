#!/usr/bin/env bash
# Starts the dev server, first freeing the port if a previous instance
# is still holding it. Safer than pkill -f "next dev", which can match
# and kill unrelated processes (including the shell that ran it).
set -euo pipefail

PORT="${PORT:-3000}"

# lsof can't see sockets from other processes in some sandboxed
# environments; ss (via /proc/net/tcp) is the reliable source here.
# `|| true` on each stage: grep/head finding nothing is not an error here,
# just "port is free" — but set -e would otherwise abort the script.
PID=$(ss -ltnp 2>/dev/null | { grep ":$PORT " || true; } | { grep -oP 'pid=\K[0-9]+' || true; } | head -1)
if [ -z "$PID" ]; then
  PID=$(lsof -ti:"$PORT" -sTCP:LISTEN 2>/dev/null || true)
fi

if [ -n "$PID" ]; then
  echo "Porta $PORT em uso pelo PID $PID, encerrando..."
  kill "$PID"
  for i in $(seq 1 10); do
    ss -ltn 2>/dev/null | grep -q ":$PORT " || break
    sleep 0.5
  done
fi

exec npm run dev
