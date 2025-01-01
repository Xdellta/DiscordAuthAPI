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

## 📌 Endpoint Specification
```sh
/auth/login
```
- **Method:** GET
- **Description:** Redirects the user to Discord's OAuth2 authorization page.
- **Request Parameters:** None.
- **Response:** Redirects to Discord's OAuth2 login page with the appropriate query parameters.
<br>

```sh
/auth/login-callback
```
- **Method:** GET
- **Description:** Handles the OAuth2 callback from Discord. Exchanges the authorization code for an access token and retrieves the authenticated user's data.
- **Request Parameters:**
  - **Query:**
    - `code` (string): Authorization code from Discord.
- **Response:**
  - **Success (200):** JSON object with the user's Discord data.
  - **Error (400):** If no `code` is provided.
  - **Error (500):** If the authentication process fails.
<br>

## 🚀 Getting Started
**1.** Clone the repository:
```sh
git clone https://github.com/Xdellta/DiscordAuthAPI.git
cd DiscordAuthAPI
```
<br>

**2.** Install dependencies:
```sh
npm install
```
<br>

**3** Configure the environment<br>
Create a .env file in the project root by renaming the .env.example file:
```env
NODE_ENV=development

PROTOCOL=http
DOMAIN=localhost
PORT=3000
```
<br>

**4.** Start the server in:<br>
- Production mode
```sh
npm run start
```
- Development mode
```sh
npm run dev
```