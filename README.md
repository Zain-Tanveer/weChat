# weChat

## _Universal Chat App_

weChat is a universal chat app. The frontend is built using basic html/css and pure javascript
while the backend is built in NodeJS using ExpressJS as the framework and mongoDB as the
database.

The main focus of this app was to implement socket.io so I decided to create a chat app.

## Features

- Register a new user

  ![Register Page Screenshot][register]

- User Login

  ![Login Page Screenshot][login]

- Universal Chat Room

  ![Chat Room Page Screenshot][chatroom]

- Logout

  ![Logout Button Screenshot][logout]

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
![App Working Screenshot][working]

## Deployment

Do keep in mind that this app only works on a developement environment. If you want to deploy it then you can
use any free hosting services like [Cyclic](https://www.cyclic.sh/) or [Railway](https://railway.app/). But you do need to replace every http://localhost:5000
throughout the code with the deployed app URL. Just search http://localhost:5000 in VS Code and replace it.

## License

NONE

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job."
[register]: /public/uploads/Register.png
[login]: /public/uploads/Login.png
[chatroom]: /public/uploads/Chat-Room.png
[logout]: /public/uploads/Logout.png
[working]: /public/uploads/Working.png
