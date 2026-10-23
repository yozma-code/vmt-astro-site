#!/bin/bash
INBOX="$HOME/vmt-inbox"
TARGET="$HOME/vmt-base/content/blogs"

echo "🤖 Hermes 已启动，正在持续监控 $INBOX 目录..."

while true; do
  for file in "$INBOX"/*.md; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      echo "📥 发现新文章: $filename，正在搬运..."
      mv "$file" "$TARGET/$filename"
      echo "✅ 搬运完成！已上线: $filename"
    fi
  done
  sleep 3
done
