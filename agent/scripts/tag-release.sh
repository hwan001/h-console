#!/bin/bash
set -e

SERVICE="agent"
DATE=$(date +'%Y-%m-%d')

# 최근 태그 검색
LATEST=$(git tag | grep "^${SERVICE}-${DATE}" | sort | tail -n1)

if [ -z "$LATEST" ]; then
  NEXT_NUM=01
else
  LAST_NUM=$(echo "$LATEST" | awk -F'-' '{print $4}')
  NEXT_NUM=$(printf "%02d" $((10#$LAST_NUM + 1)))
fi

TAG="${SERVICE}-${DATE}-${NEXT_NUM}"

echo "Creating tag: $TAG"
git tag "$TAG"
git push origin "$TAG"
echo "Triggered GitHub Actions for $TAG"