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

#### Вариант A: Через GitHub Desktop (рекомендуется)

1. **Откройте GitHub Desktop**
   - Запустите приложение GitHub Desktop
   - Войдите в свой аккаунт GitHub, если еще не вошли

2. **Добавьте существующий репозиторий**
   - Нажмите "File" → "Add Local Repository"
   - Или нажмите "+" в левом верхнем углу и выберите "Add Existing Repository"

3. **Выберите папку проекта**
   - В поле "Local Path" нажмите "Choose..."
   - Найдите и выберите папку `/Users/rguest/Попытки прогерства/KNBR`
   - Нажмите "Add Repository"

4. **Опубликуйте репозиторий на GitHub**
   - GitHub Desktop покажет кнопку "Publish repository"
   - Нажмите на неё
   - Введите название репозитория: `KNBR` или `mores-moscow-website`
   - Добавьте описание: `KNBR Marketing Agency Website`
   - Убедитесь, что выбран "Public"
   - Снимите галочки с "Keep this code private" и "Add a README file"
   - Нажмите "Publish Repository"

5. **Проверьте результат**
   - Репозиторий будет создан на GitHub
   - Все файлы будут загружены
   - Вы увидите репозиторий в списке в GitHub Desktop

6. **Дальнейшая работа с GitHub Desktop**
   - Все изменения в файлах будут отображаться в разделе "Changes"
   - Для коммита изменений: добавьте описание коммита и нажмите "Commit to main"
   - Для отправки на GitHub: нажмите "Push origin"
   - Для получения обновлений: нажмите "Pull origin"

#### Вариант B: Через командную строку

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

### Проблемы с GitHub Desktop

1. **"Repository not found"**
   - Убедитесь, что вы вошли в правильный аккаунт GitHub
   - Проверьте, что репозиторий существует на GitHub

2. **"Authentication failed"**
   - Выйдите из GitHub Desktop и войдите заново
   - Проверьте настройки аутентификации в Preferences

3. **"Push failed"**
   - Проверьте интернет-соединение
   - Убедитесь, что у вас есть права на запись в репозиторий

4. **"Repository already exists"**
   - Выберите другое название репозитория
   - Или удалите существующий репозиторий на GitHub

5. **"No changes to commit"**
   - Убедитесь, что вы сохранили изменения в файлах
   - Проверьте, что файлы не игнорируются в .gitignore

### Проблемы с сайтом

- Если сайт не загружается, проверьте DNS записи
- Убедитесь, что CNAME файл содержит правильный домен
- Проверьте статус деплоя в разделе "Actions" репозитория
