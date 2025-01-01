# DiscordAuthAPI
This project serves as the backend authentication service for integrating Discord OAuth2 into applications. It enables seamless user authentication and provides API endpoints tailored for managing Discord user data.

<br>

## 🛠️ Tools and Technologies
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br>

## 📜 License
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)<br>
By [Patryk Piotrowski](https://github.com/Xdellta)

<br>

## 🚀 Getting Started

**1.** Clone the repository:
```sh
git clone https://github.com/Xdellta/DiscordAuthAPI.git
cd DiscordAuthAPI
```

**2.** Install dependencies:
```sh
npm install
```

**3** Configure the environment<br>
Create a .env file in the project root by renaming the .env.example file:
```env
NODE_ENV=development

PROTOCOL=http
DOMAIN=localhost
PORT=3000
```

**4.** Start the server in:<br>
- Production mode
```sh
npm run start
```
- Development mode
```sh
npm run dev
```