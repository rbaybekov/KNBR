# Настройка GitHub и домена mores-moscow.ru

## Шаги для выгрузки проекта на GitHub

### 1. Создание репозитория на GitHub

1. Перейдите на https://github.com
2. Нажмите "New repository"
3. Название: `KNBR` или `mores-moscow-website`
4. Описание: `KNBR Marketing Agency Website`
5. Выберите "Public"
6. НЕ добавляйте README, .gitignore или лицензию (они уже есть)
7. Нажмите "Create repository"

### 2. Подключение локального репозитория к GitHub

```bash
# Добавьте remote origin (замените username на ваш GitHub username)
git remote add origin https://github.com/USERNAME/KNBR.git

# Отправьте код на GitHub
git push -u origin main
```

### 3. Настройка GitHub Pages

1. Перейдите в Settings репозитория
2. Найдите раздел "Pages" в левом меню
3. В "Source" выберите "Deploy from a branch"
4. Выберите branch "main" и folder "/ (root)"
5. Нажмите "Save"

### 4. Настройка кастомного домена

1. В разделе "Pages" найдите "Custom domain"
2. Введите: `mores-moscow.ru`
3. Нажмите "Save"
4. GitHub создаст файл CNAME автоматически (уже добавлен в проект)

### 5. Настройка DNS для домена

В панели управления доменом mores-moscow.ru добавьте записи:

```
Тип: CNAME
Имя: www
Значение: USERNAME.github.io

Тип: A
Имя: @
Значение: 185.199.108.153
Значение: 185.199.109.153
Значение: 185.199.110.153
Значение: 185.199.111.153
```

### 6. Верификация домена

GitHub может потребовать верификацию домена. Добавьте TXT запись:

```
Тип: TXT
Имя: @
Значение: [код верификации от GitHub]
```

## Автоматический деплой

После настройки каждый push в main ветку будет автоматически деплоить сайт на mores-moscow.ru.

## Проверка

1. Подождите 5-10 минут после настройки DNS
2. Откройте https://mores-moscow.ru
3. Сайт должен загрузиться с домена

## Troubleshooting

- Если сайт не загружается, проверьте DNS записи
- Убедитесь, что CNAME файл содержит правильный домен
- Проверьте статус деплоя в разделе "Actions" репозитория
