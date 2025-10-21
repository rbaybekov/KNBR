#!/bin/bash

# Скрипт для автоматического деплоя на сервер
# Использование: ./deploy.sh [server-ip] [username] [path]

set -e

# Параметры по умолчанию
SERVER_IP=${1:-"your-server-ip"}
USERNAME=${2:-"your-username"}
DEPLOY_PATH=${3:-"/var/www/html"}

echo "🚀 Начинаем деплой на сервер..."

# Проверяем, что все файлы закоммичены
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Есть незакоммиченные изменения. Сначала закоммитьте их:"
    git status
    exit 1
fi

# Получаем последний коммит
COMMIT_HASH=$(git rev-parse HEAD)
echo "📦 Деплоим коммит: $COMMIT_HASH"

# Создаем временную папку для деплоя
TEMP_DIR=$(mktemp -d)
echo "📁 Создана временная папка: $TEMP_DIR"

# Копируем файлы сайта
cp -r index.html styles.css script.js README.md "$TEMP_DIR/"

# Создаем архив для передачи
ARCHIVE_NAME="knbr-deploy-$(date +%Y%m%d-%H%M%S).tar.gz"
cd "$TEMP_DIR"
tar -czf "../$ARCHIVE_NAME" .
cd - > /dev/null

echo "📦 Создан архив: $ARCHIVE_NAME"

# Передаем файлы на сервер
echo "⬆️  Загружаем файлы на сервер..."
scp "$TEMP_DIR/../$ARCHIVE_NAME" "$USERNAME@$SERVER_IP:/tmp/"

# Выполняем команды на сервере
echo "🔧 Устанавливаем файлы на сервере..."
ssh "$USERNAME@$SERVER_IP" << EOF
    # Создаем бэкап текущей версии
    if [ -d "$DEPLOY_PATH" ]; then
        sudo cp -r "$DEPLOY_PATH" "$DEPLOY_PATH.backup.\$(date +%Y%m%d-%H%M%S)"
    fi
    
    # Распаковываем новую версию
    sudo mkdir -p "$DEPLOY_PATH"
    sudo tar -xzf "/tmp/$ARCHIVE_NAME" -C "$DEPLOY_PATH"
    
    # Устанавливаем правильные права доступа
    sudo chown -R www-data:www-data "$DEPLOY_PATH"
    sudo chmod -R 755 "$DEPLOY_PATH"
    
    # Очищаем временные файлы
    rm "/tmp/$ARCHIVE_NAME"
    
    echo "✅ Деплой завершен успешно!"
    echo "🌐 Сайт доступен по адресу: http://$SERVER_IP"
EOF

# Очищаем локальные временные файлы
rm -rf "$TEMP_DIR"
rm "$TEMP_DIR/../$ARCHIVE_NAME"

echo "🎉 Деплой завершен успешно!"
echo "🌐 Сайт должен быть доступен по адресу: http://$SERVER_IP"
