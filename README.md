# 我的餐廳清單

一個使用 Express 和 Node.js 製作的美食清單網站，提供了瀏覽一個固定來源的美食清單，並且能夠查看餐廳詳細資訊，也提供了查詢指定餐廳的功能。

## 專案畫面

![image](/public/screenshots/index.jpg)
![image](/public/screenshots/search-page.jpg)
![image](/public/screenshots/show.jpg)
![image](/public/screenshots/login.jpg)

## Features - 產品功能

1. 提供使用者瀏覽清單自己儲存的餐廳簡易資料。
2. 提供使用者搜尋指定的餐廳名稱。
3. 提供使用者搜尋特定的餐廳類型。
4. 提供使用者瀏覽一間餐廳的詳細資訊。
5. 提供使用者新增一間餐廳的資訊。
6. 提供使用者修改一間餐廳的資訊。
7. 提供使用者刪除一間餐廳的資訊。
8. 提供使用者依照喜好做排序。
9. 提供使用者註冊功能。

## Environment SetUp - 環境建置

1. [Node.js@16.14.2](https://nodejs.org/)
2. [Express@4.17.1](https://expressjs.com/)

## Installing - 專案安裝流程

1. 開啟 terminal ，將專案複製到本機。

```
git clone https://github.com/rennll/restaurant_list_CRUD_2.git
```

2. 使用 terminal 切換至下載的資料夾。

```
cd restaurant_list_CRUD_2
```

3. 用 npm 下載在 package.json 提到的套件。

```
npm install
```

4. 請設定 .env.example 內的空白環境變數設定，並將檔案名稱改為 .env
```
FACEBOOK_ID=
FACEBOOK_SECRET=
MONGODB_URI=
```

5. 等待下載完成後，執行 seeder

```
npm run seed
```

6. 等待 seeder 執行結束，執行 app.js 使用餐廳列表功能

```
npm run start
```

7. 等待伺服器啟動，並且出現以下字樣即代表成功運行。

```
This website is running on http://localhost:3000
```

8. 使用者即可在[http://localhost:3000](http://localhost:3000)瀏覽我的餐廳清單。
目前提供兩組測試用帳號給使用者，可以登入並看到預設的餐廳資訊。
```
email: user1@example.com
password: 12345678
```
```
email: user2@example.com
password: 12345678
```

## Contributor - 專案開發人員

[Rennll](https://github.com/Rennll)
