# weChat

## _Universal Chat App_

weChat is a universal chat app. The frontend is built using basic html/css and pure javascript
while the backend is built in NodeJS using ExpressJS as the framework and mongoDB as the
database.

The main focus of this app was to implement socket.io so I decided to create a chat app.

## Features

- Register a new user
  ![Register Page Screenshot](https://media.discordapp.net/attachments/1208004170867539988/1208005347722395698/Screenshot_2024-02-16_160146.png?ex=65e1b5a6&is=65cf40a6&hm=ca44ab863b96b1e8bb49504483917b9c147a9d22bd2c3e960ebf82dc048fa5b9&=&format=webp&quality=lossless&width=1232&height=593)
- User Login
  ![Login Page Screenshot](https://media.discordapp.net/attachments/1208004170867539988/1208004338937630790/Screenshot_2024-02-16_155740.png?ex=65e1b4b6&is=65cf3fb6&hm=42520fa00c4294308c28c9257ee940d861beef3bedbf4d0b5965eeb4e79b3c14&=&format=webp&quality=lossless&width=1237&height=593)
- Universal Chat Room
  ![Chat Room Page Screenshot](https://media.discordapp.net/attachments/1208004170867539988/1208006263292825660/Screenshot_2024-02-16_160521.png?ex=65e1b680&is=65cf4180&hm=6175597391fa830fb3ec5d53b724bf409f3bf47d7eb1d796539ad007b99858cb&=&format=webp&quality=lossless&width=1257&height=593)
- Logout
  ![Logout Button Screenshot](https://media.discordapp.net/attachments/1208004170867539988/1208008884938080286/Screenshot_2024-02-16_161552.png?ex=65e1b8f1&is=65cf43f1&hm=1c60e292964f046ceef48a423e21acf86375e7830992b866aed520d82da12aaf&=&format=webp&quality=lossless&width=1250&height=593)

## Installation

weChat requires the latest [Node.js](https://nodejs.org/) version to run.
My version at the time of developing this app is v20.11.0.

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```

**NOTE**: You need to rename the example.env file to .env and populate it with your own personal information.
Only the `JWT_SECRET` and `MONGO_URI` need to be populated.

## Making sure it works

**Step1**: In order to make sure it works, open two seperate chrome tabs, one regular and the other incognito.
**Step2**:Create two different accounts with any email, for example: **example1@gmail.com** and **example2@gmail.com**.
**Step3**:Chat away!

This is how it should look!
![App Working Screenshot](https://media.discordapp.net/attachments/1208004170867539988/1208013484131098704/image.png?ex=65e1bd3a&is=65cf483a&hm=a02f27cc15d6b8534cb6a59bf8814788b6a62d3bd2ae0a46328be98bae6ccf66&=&format=webp&quality=lossless&width=1117&height=593)

## Deployment

Do keep in mind that this app only works on a developement environment. If you want to deploy it then you can
use any free hosting services like [Cyclic](https://www.cyclic.sh/) or [Railway](https://railway.app/). But you do need to replace every http://localhost:5000
throughout the code with the deployed app URL. Just search http://localhost:5000 in VS Code and replace it.

## License

NONE

**Free Software, Hell Yeah!**
