# README для запуска

## Предварительные требования

- Node.js версии 18.17.1
- npm (Node Package Manager)
- Docker compose или PostgreSql

## Настройка приложения

1. **Установка зависимостей**

   Перейдите в корневую директорию приложения и выполните следующую команду для установки необходимых пакетов npm:

   ```bash
   npm install
   ```

2. **Конфигурация .env**

   Создайте файл .env и установите нужные переменные(см. пример .env.example):

   ```bash
   nano .env
   ```

3. **Запуск миграции**

   Убедитесь что подняли базу данных на PostgreSQL. Можно использовать docker-compose сервис "db" из docker-compose.yaml

   ```bash
   npm run migration:run
   ```

4. **Запуск тестов (опционально)**

   ```bash
   npm run test
   ```

5. **Запуск приложения**

    В dev режиме
   ```bash
   npm run start:dev
   ```
    В prod режиме
    ```bash
    npm run build
    npm run start:prod
    ```
   


## Эндпоинты API

Приложение предоставляет следующие конечные точки REST API:
- `GET /core/getAddressWithLargestBalanceChange`: Получает адрес с наибольшим изменением баланса(если правильно понял ТЗ, то он что вам нужен).

- `GET /core/getActiveAddress`: Возвращает активный адреса из БД.

- `GET /core/getAllTransactions`: Извлекает все транзакции из БД.

- `GET /core/getAllBlocks`: Возвращает все блоки из БД.
