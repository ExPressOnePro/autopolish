#!/bin/bash
# Prepare production build — removes Vite dev marker that breaks mobile.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

rm -f public/hot

npm run build

echo "OK: public/hot removed, build ready."
echo "Deploy public/build/ and ensure public/hot does NOT exist on the server."
