# Инструкции по настройке синхронизации Cursor ↔ GitHub ↔ Сервер

## 🎯 Обзор системы

Данная настройка обеспечивает автоматическую синхронизацию между:
- **Cursor** (локальная разработка)
- **GitHub** (хранение кода и автоматический деплой)
- **Сервер** (продакшн среда)

## 📋 Пошаговая настройка

### 1. Настройка GitHub репозитория

1. Создайте новый репозиторий на GitHub:
   - Перейдите на https://github.com/new
   - Название: `knbr-website`
   - Описание: `KNBR company website`
   - Сделайте репозиторий публичным (для GitHub Pages)

2. Подключите локальный репозиторий к GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/knbr-website.git
git branch -M main
git push -u origin main
```

3. Настройте GitHub Pages:
   - Перейдите в Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Сохраните настройки

### 2. Настройка автоматического деплоя на сервер

#### Вариант A: Через GitHub Actions (рекомендуется)

1. Создайте секреты в GitHub:
   - Settings → Secrets and variables → Actions
   - Добавьте секреты:
     - `SERVER_HOST`: IP адрес вашего сервера
     - `SERVER_USER`: имя пользователя на сервере
     - `SERVER_KEY`: приватный SSH ключ

2. Обновите `.github/workflows/deploy.yml`:
```yaml
- name: Deploy to server
  uses: appleboy/ssh-action@v1.0.0
  with:
    host: ${{ secrets.SERVER_HOST }}
    username: ${{ secrets.SERVER_USER }}
    key: ${{ secrets.SERVER_KEY }}
    script: |
      cd /var/www/html
      git pull origin main
      sudo systemctl reload nginx
```

#### Вариант B: Через локальный скрипт

1. Настройте SSH ключи для доступа к серверу:
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
ssh-copy-id username@your-server-ip
```

2. Используйте скрипт деплоя:
```bash
./deploy.sh your-server-ip username /var/www/html
```

### 3. Настройка сервера

1. Установите необходимые пакеты:
```bash
sudo apt update
sudo apt install nginx git
```

2. Настройте Nginx:
```bash
sudo nano /etc/nginx/sites-available/knbr
```

Конфигурация Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

3. Активируйте сайт:
```bash
sudo ln -s /etc/nginx/sites-available/knbr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Настройка SSL (опционально)

1. Установите Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
```

2. Получите SSL сертификат:
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔄 Рабочий процесс

### Ежедневная работа:

1. **Разработка в Cursor:**
   - Открывайте проект в Cursor
   - Вносите изменения в код
   - Тестируйте локально: `npm run dev`

2. **Коммит и пуш:**
```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

3. **Автоматический деплой:**
   - GitHub Actions автоматически развернет на GitHub Pages
   - При необходимости запустите деплой на сервер: `./deploy.sh`

### Мониторинг:

- **GitHub Pages:** https://YOUR_USERNAME.github.io/knbr-website
- **Сервер:** http://your-server-ip или https://your-domain.com
- **GitHub Actions:** Проверяйте статус в разделе Actions

## 🛠️ Полезные команды

```bash
# Локальная разработка
npm run dev          # Запуск локального сервера
npm run start        # Альтернативный способ запуска

# Git операции
git status           # Проверить статус
git log --oneline    # История коммитов
git pull origin main # Получить изменения

# Деплой
./deploy.sh          # Деплой на сервер
npm run deploy       # Деплой на GitHub Pages

# Проверка сайта
curl -I http://your-server-ip  # Проверить доступность
```

## 🚨 Устранение проблем

### Проблема: GitHub Actions не работает
- Проверьте права доступа к репозиторию
- Убедитесь, что все секреты настроены
- Проверьте логи в разделе Actions

### Проблема: Деплой на сервер не работает
- Проверьте SSH подключение: `ssh username@server-ip`
- Убедитесь, что права доступа настроены правильно
- Проверьте логи Nginx: `sudo tail -f /var/log/nginx/error.log`

### Проблема: Сайт не обновляется
- Очистите кэш браузера (Ctrl+F5)
- Проверьте, что файлы действительно обновились на сервере
- Убедитесь, что Nginx перезагружен: `sudo systemctl reload nginx`

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи GitHub Actions
2. Проверьте логи сервера
3. Обратитесь к документации GitHub и Nginx
4. Создайте issue в репозитории для отслеживания проблем
