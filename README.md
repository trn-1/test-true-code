# Тестовое задание на должность Fullstack-разработчика в компанию true.code

Для запуска проекта в терминале необходимо выполнить следующие команды:

- Backend: 
```bash
docker-compose up --build
```

- Frontend:
  
```bash
cd frontend
```
```bash
npm i
```
```bash
npm run build
```
```bash
npm start
```

# В рамках задания выполнено:

# Backend:

1. CRUD операции
Все основные операции созданы и протестированы:
- Создание товара: Реализован метод для добавления нового товара с необходимыми полями.
- Чтение товара: Реализован метод для получения информации о товаре по артикулу.
- Обновление товара: Реализован метод для изменения данных о товаре.
- Удаление товара: Реализован метод для удаления товара по артикулу.

2. Загрузка и удаление фотографии
Реализована возможность:
- Загружать фотографии товаров через API.
- Удалять загруженные фотографии товаров.

3. Получение списка всех товаров
Разработан метод для получения списка всех товаров с поддержкой:
- Пагинации: Реализована пагинация для удобства просмотра списка товаров.
- Фильтрации: Возможность фильтровать товары по различным параметрам (например, по стоимости или названию).
- Сортировки: Реализована сортировка товаров по различным критериям (например, по цене или названию).

## Технологический стек
- **Nest.js**
- **SQLite**
- **Prisma**
- **Docker**

# Frontend:

1. Интерфейс управления товарами.
Создан интерфейс, включающий следующие функции:
- Добавление товара: Реализована форма для ввода информации о товаре с валидацией полей.
- Редактирование товара: Реализована возможность редактирования данных о товаре.
- Удаление товара: Добавлена функции для удаления.

2. Каталог товаров
Разработана страница с каталогом товаров (с учетом query-параметров), включающая:
- Пагинацию: Реализована пагинация для удобного просмотра большого количества товаров.
- Сортировку: Добавлены опции для сортировки товаров по различным критериям (по цене или скидке).
- Фильтрация: Реализованы фильтры для поиска товаров по тексту.

3. Страница товара
Создана отдельная страница для отображения информации о товаре, включая:
- Описание товара
- Фотографии
- Цены

## Технологический стек
- **Next.js (App Router)**: Использован для создания клиентской части с поддержкой SSR.
- **Tanstack Query**: Использованы для управления состоянием данных и выполнения запросов к API.
- **Zod**: Использован для валидации форм.
- **TypeScript**.

**Meta (OpenGraph)**
Настроены мета-теги для страниц каталога и товара с использованием OpenGraph.
