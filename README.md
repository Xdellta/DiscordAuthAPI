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

## 📌 Middleware Specification
### authMiddleware - isLoged()
- **Description:** Verification of logged in user and return of user data.
- **Request.cookies:**
  - `access_token` (string): Verification token.
- **Response:**
  - `user`:
    ```sh
    {
      "id": "123456789012345678",
      "username": "example_user",
      "avatar": "sample_avatar_hash",
      "discriminator": "1234",
      "public_flags": 0,
      "flags": 0,
      "banner": null,
      "accent_color": 16711680,
      "global_name": "ExampleGlobalName",
      "avatar_decoration_data": null,
      "banner_color": "#ff5733",
      "clan": null,
      "primary_guild": null,
      "mfa_enabled": true,
      "locale": "en",
      "premium_type": 1
    }
    ```
  - `accessToken` (string): Verification token.
<br>

### authMiddleware - requireRoles()
- **Description:** Verification of required roles.
- **Request:**
  - `user`: Data retrieved [authentication middleware](#authmiddleware---isloged).
    ```sh
    {
      "id": "123456789012345678",
      "username": "example_user",
      "avatar": "sample_avatar_hash",
      "discriminator": "1234",
      "public_flags": 0,
      "flags": 0,
      "banner": null,
      "accent_color": 16711680,
      "global_name": "ExampleGlobalName",
      "avatar_decoration_data": null,
      "banner_color": "#ff5733",
      "clan": null,
      "primary_guild": null,
      "mfa_enabled": true,
      "locale": "en",
      "premium_type": 1
    }
    ```
- **Response:** None

<br><br>

## 📌 Endpoint Specification
```sh
/api/auth/login
```
- **Method:** `GET`
- **Description:** Redirects user to Discord's OAuth2 login page.
- **Request:** None
- **Response:**
  - **Success (200):** Redirect to Discord login with `client_id`, `redirect_uri`, and `scope` parameters.
  - **Error (400):** Missing Discord Client ID.
<br>

```sh
/api/auth/login-callback
```
- **Method:** `GET`
- **Description:** Handles OAuth2 callback, exchanges code for access token.
- **Request.query:**
  - `code` (string): Authorization code.
- **Response:** 
  - **Success (200):** Returns `access_token`, `refresh_token` in cookie http only.
  - **Error (400):** Missing authorization `code`.
  - **Error (500):** Failed to retrieve access or refresh tokens from Discord.
<br>

```sh
/api/auth/logout
```
- **Method:** `GET`
- **Description:** Logs out the user by clearing authentication cookies.
- **Request:**
  - `accessToken` (string): Verification token, received from [authentication middleware](#authmiddleware---isloged).
  - `refreshToken` (string): Refresh token, received from [authentication middleware](#authmiddleware---isloged).
- **Response:** 
  - **Success (200):** Successfully logged out.
  - **Error (400):** Access token or refresh token missing.
<br>

```sh
/api/users/me
```
- **Method:** `GET`
- **Description:** Gets details of currently authenticated user from [authentication middleware](#authmiddleware---isloged).
- **Request:**
  - `user`: Data retrieved [authentication middleware](#authmiddleware---isloged).
    ```sh
    {
      "id": "123456789012345678",
      "username": "example_user",
      "avatar": "sample_avatar_hash",
      "discriminator": "1234",
      "public_flags": 0,
      "flags": 0,
      "banner": null,
      "accent_color": 16711680,
      "global_name": "ExampleGlobalName",
      "avatar_decoration_data": null,
      "banner_color": "#ff5733",
      "clan": null,
      "primary_guild": null,
      "mfa_enabled": true,
      "locale": "en",
      "premium_type": 1
    }
    ```
- **Response:** 
  - **Success (200):**
    ```sh
    "user": {
      "id": "123456789012345678",
      "username": "example_user",
      "avatar": "sample_avatar_hash",
      "discriminator": "1234",
      "public_flags": 0,
      "flags": 0,
      "banner": null,
      "accent_color": 16711680,
      "global_name": "ExampleGlobalName",
      "avatar_decoration_data": null,
      "banner_color": "#ff5733",
      "clan": null,
      "primary_guild": null,
      "mfa_enabled": true,
      "locale": "en",
      "premium_type": 1
    }
    ```
  - **Error (404):** User not found.
<br>

```sh
/api/users/meRoles
```
- **Method:** `GET`
- **Description:** Return of user roles in guild
- **Request:**
  - `user`: Data retrieved [authentication middleware](#authmiddleware---isloged).
    ```sh
    {
      "id": "123456789012345678",
      "username": "example_user",
      "avatar": "sample_avatar_hash",
      "discriminator": "1234",
      "public_flags": 0,
      "flags": 0,
      "banner": null,
      "accent_color": 16711680,
      "global_name": "ExampleGlobalName",
      "avatar_decoration_data": null,
      "banner_color": "#ff5733",
      "clan": null,
      "primary_guild": null,
      "mfa_enabled": true,
      "locale": "en",
      "premium_type": 1
    }
    ```
- **Response:**
  - **Success (200):**
    ```sh
    "roles": [
      "123456789012345678",
      "987654321098765432"
    ]
    ```
  - **Error (404):** User not found.
  - **Error (404):** Roles not found.

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