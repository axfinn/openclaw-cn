#!/bin/bash
# Docker CLI wrapper: automatically adds --url and --token for container networking

set -e

GATEWAY_URL="${OPENCLAW_CLI_GATEWAY_URL:-ws://openclaw-gateway:18789}"
GATEWAY_TOKEN="${OPENCLAW_CLI_GATEWAY_TOKEN:-${OPENCLAW_GATEWAY_TOKEN}}"

# Commands that need gateway connection
GATEWAY_COMMANDS="devices|health|gateway|channels|agents|message|pairing|nodes"

# Check if this command needs gateway params
NEEDS_GATEWAY=false
for arg in "$@"; do
  if echo "$arg" | grep -qE "^($GATEWAY_COMMANDS)$"; then
    NEEDS_GATEWAY=true
    break
  fi
done

# Add --url and --token if needed and not already provided
if [ "$NEEDS_GATEWAY" = true ]; then
  HAS_URL=false
  HAS_TOKEN=false
  for arg in "$@"; do
    [ "$arg" = "--url" ] && HAS_URL=true
    [ "$arg" = "--token" ] && HAS_TOKEN=true
  done

  EXTRA_ARGS=()
  [ "$HAS_URL" = false ] && [ -n "$GATEWAY_URL" ] && EXTRA_ARGS+=(--url "$GATEWAY_URL")
  [ "$HAS_TOKEN" = false ] && [ -n "$GATEWAY_TOKEN" ] && EXTRA_ARGS+=(--token "$GATEWAY_TOKEN")

  exec node dist/index.js "$@" "${EXTRA_ARGS[@]}"
else
  exec node dist/index.js "$@"
fi
