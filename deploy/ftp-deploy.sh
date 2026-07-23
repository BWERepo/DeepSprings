#!/usr/bin/env bash
# DEPRECATED as of 2026-07-23: this project now deploys to Cloudflare Workers
# (custom domain deepsprings.businesswebexpress.com) via `npm run deploy`
# (wrangler), not Hostinger/FTP. This script is kept only for reference/
# rollback — it still works against the Hostinger account if ever needed
# again, but is not part of the normal deploy flow anymore.
#
# Uploads the static export in out/ (run `npm run build` first, with
# next.config.ts's output:"export" this produces plain HTML/CSS/JS) to
# Hostinger over FTPS. The FTP account's home directory is already scoped to
# public_html/deepsprings.businesswebexpress.com, so files land at the site
# root — same credential pattern as ../CarShow/App/deploy/ftp-deploy.sh.
#
# Credentials: either set FTP_HOST/FTP_USER/FTP_PASS as env vars, or create
# deploy/.ftp-credentials (gitignored — copy .ftp-credentials.example and
# fill in the real password). Env vars, if set, take precedence.
#
# FTP_HOST must be the server IP/hostname (hPanel > Hosting > Overview), not
# the domain — the domain's DNS may point at a different Hostinger account's
# server than the one this FTP account actually lives on.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$DIR/../out"

CRED_FILE="$DIR/.ftp-credentials"
if [ -z "${FTP_HOST:-}" ] && [ -f "$CRED_FILE" ]; then
  while IFS='=' read -r key value || [ -n "$key" ]; do
    key="${key%$'\r'}"
    value="${value%$'\r'}"
    case "$key" in
      FTP_HOST) FTP_HOST="$value" ;;
      FTP_USER) FTP_USER="$value" ;;
      FTP_PASS) FTP_PASS="$value" ;;
    esac
  done < "$CRED_FILE"
fi

: "${FTP_HOST:?Set FTP_HOST (env var, or create deploy/.ftp-credentials from the .example file)}"
: "${FTP_USER:?Set FTP_USER (env var, or create deploy/.ftp-credentials from the .example file)}"
: "${FTP_PASS:?Set FTP_PASS (env var, or create deploy/.ftp-credentials from the .example file)}"
BASE="ftp://${FTP_HOST}"
NETRC="$(mktemp)"
trap 'rm -f "$NETRC"' EXIT

cat > "$NETRC" <<EOF
machine ${FTP_HOST}
login ${FTP_USER}
password ${FTP_PASS}
EOF

if [ ! -d "$OUT_DIR" ]; then
  echo "out/ not found — run 'npm run build' first." >&2
  exit 1
fi

upload() {
  local localPath="$1" remotePath="$2"
  local attempt rc
  for attempt in 1 2 3; do
    echo "--- Uploading $remotePath (attempt $attempt) ---"
    rc=0
    curl -sS --netrc-file "$NETRC" --ftp-ssl -k --ftp-pasv --ftp-create-dirs -T "$localPath" "$BASE/$remotePath" -m 120 || rc=$?
    if [ $rc -eq 0 ]; then return 0; fi
    echo "    upload failed (curl exit $rc)" >&2
    if [ $attempt -lt 3 ]; then sleep 5; fi
  done
  echo "    giving up on $remotePath after 3 attempts" >&2
  return $rc
}

cd "$OUT_DIR"
while IFS= read -r -d '' file; do
  relPath="${file#./}"
  upload "$OUT_DIR/$relPath" "$relPath"
done < <(find . -type f -print0)

echo "--- Final listing ---"
curl -sS --netrc-file "$NETRC" --ftp-ssl -k --ftp-pasv "$BASE/" -m 20
