#!/bin/bash
# Upload public/ folder to production via FTP (Plesk).
# Usage:
#   FTP_HOST=217.26.150.25 FTP_USER=your_user FTP_PASS='your_pass' FTP_DIR=/httpdocs ./deploy/upload-public.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${FTP_HOST:-217.26.150.25}"
USER="${FTP_USER:?Set FTP_USER}"
PASS="${FTP_PASS:?Set FTP_PASS}"
REMOTE_DIR="${FTP_DIR:-/httpdocs}"

echo "Building frontend..."
(cd "$ROOT" && npm run build)

echo "Uploading public/ to ${HOST}:${REMOTE_DIR} ..."
lftp -u "$USER","$PASS" "$HOST" <<EOF
set ssl:verify-certificate no
set ftp:ssl-allow no
cd $REMOTE_DIR
mirror -R --verbose --parallel=4 "$ROOT/public" .
bye
EOF

echo "Done. Check: https://avtopolirovka.md/images/AutoPolish.jpg"
