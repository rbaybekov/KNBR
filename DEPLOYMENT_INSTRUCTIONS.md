# Инструкции по загрузке проекта на GitHub

## Ваш репозиторий создан: https://github.com/rbaybekov/KNBR.git

### Вариант 1: Через GitHub Desktop (рекомендуется)

1. **Откройте GitHub Desktop**
2. **Добавьте существующий репозиторий**
   - File → Add Local Repository
   - Выберите папку: `/Users/rguest/Попытки прогерства/KNBR`
   - Нажмите "Add Repository"

3. **Опубликуйте репозиторий**
   - Нажмите "Publish repository"
   - Название: `KNBR`
   - Описание: `KNBR Marketing Agency Website`
   - Выберите "Public"
   - Снимите галочки с "Keep this code private" и "Add a README file"
   - Нажмите "Publish Repository"

### Вариант 2: Через командную строку с токеном

1. **Создайте Personal Access Token**
   - Перейдите на https://github.com/settings/tokens
   - Нажмите "Generate new token (classic)"
   - Выберите scopes: `repo`, `workflow`
   - Скопируйте токен

2. **Используйте токен для push**
   ```bash
   git push -u origin main
   # При запросе username: введите rbaybekov
   # При запросе password: введите ваш токен (не пароль!)
   ```

### Вариант 3: Через SSH ключи

1. **Создайте SSH ключ**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Добавьте ключ в GitHub**
   - Скопируйте содержимое ~/.ssh/id_ed25519.pub
   - Перейдите в https://github.com/settings/keys
   - Нажмите "New SSH key" и вставьте ключ

3. **Измените remote на SSH**
   ```bash
   git remote set-url origin git@github.com:rbaybekov/KNBR.git
   git push -u origin main
   ```

## После загрузки кода

1. **Настройте GitHub Pages**
   - Перейдите в Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main", Folder: "/ (root)"
   - Custom domain: `mores-moscow.ru`

2. **Настройте DNS для домена mores-moscow.ru**
   ```
   CNAME: www → rbaybekov.github.io
   A: @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   ```

## Проверка

После выполнения всех шагов сайт будет доступен по адресу:
- https://mores-moscow.ru (после настройки DNS)
- https://rbaybekov.github.io/KNBR (GitHub Pages URL)
