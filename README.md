# DiscordAuthAPI
This project serves as the backend authentication service for integrating Discord OAuth2 into applications. It enables seamless user authentication and provides API endpoints tailored for managing Discord user data.

<br><br>

## 🛠️ Tools and Technologies
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br><br>

## 📜 License
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)<br>
By [Patryk Piotrowski](https://github.com/Xdellta)

<br><br>

## 📌 Endpoint Specification
```sh
/api/auth/login
```
- **Method:** `GET`
- **Description:** Redirects user to Discord's OAuth2 login page.
- **Request:** None
- **Response:** Redirect to Discord login with `client_id`, `redirect_uri`, and `scope` parameters.
<br>

```sh
/api/auth/login-callback
```
- **Method:** `GET`
- **Description:** Handles OAuth2 callback, exchanges code for access token.
- **Request:**
  - `code` (string): Authorization code.
- **Response:** 
  - **Success (200):** Returns `access_token`, `refresh_token`, and user data.
  - **Error (400):** If `code` is missing.
  - **Error (500):** On authentication failure.
<br>

```sh
/api/auth/logout
```
- **Method:** `GET`
- **Description:** Logs out the user by clearing authentication cookies.
- **Request:** None
- **Response:** 
  - **Success (200):** JSON response confirming successful logout.
  - **Error (400):** If access_token or refresh_token cookies are missing.
<br>

```sh
/api/user/getUser
```
- **Method:** `GET`
- **Description:** Retrieves user data using the access token.
- **Cookie:** The `access_token` cookie is used for authentication.
- **Request:** None
- **Response:** User data (username, discriminator, ID).
<br>

```sh
/api/user/getUserRoles
```
- **Method:** `GET`
- **Description:** Retrieves user roles on a specific guild using the access token from cookies.
- **Cookie:** The `access_token` cookie is used for authentication.
- **Request:** None
- **Response:** User roles in the guild.

<br><br>

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