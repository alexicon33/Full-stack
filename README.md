# Описание проекта (frontend-части)
### Общие вещи
Это небольшой проект для работы со спортивными прогнозами. У каждого пользователя есть личный кабинет (вкладка "Статистика"), где есть график, отображающий полную историю прогнозов данного пользователя, а также небольшая табличка с кое-какими статистическими данными. Прогнозы можно добавлять в общую табличку (вкладка "Прогнозы") и удалять их оттуда. Кроме того, там есть возможность поиска прогнозов за чьим-либо авторством. Наконец, в качестве приятного бонуса, присутствует возможность кастомизировать сайт: изменить цветовую схему или вид отображения ставок.
### Технические детали
Проект реализован c помощью `React`, `Create React App`, `Redux` и `React Bootstrap`. Существенно помог также пакет `Google Charts`, позволяющий рисовать графики. Для имитации backend-a используется `json-server`, запущенный на `4000`-м порту, а также `db.json` с маленьким набором тестовых данных. Чтобы запустить его на другом порту, нужно изменить значение константы `PORT` в файле `index.js` на желаемое число. 
### Запуск
Склонируйте репозиторий и запустите `json-server` в получившейся папке (во внешней, там, где лежит `db.json`:
```shell
npm install -g json-server
json-server --watch db.json --port 4000
```

Теперь в основной папке `frontend` запустите React-приложение:
```shell
npm install
npm start
```