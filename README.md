
# MERN Authorization

Includes two part:
-  frontend(WIP)
-  backend. 


## Run Locally

Clone the project

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Run Test

To run tests, run the following command

```bash
  npm run test:e2e
```
or
```bash
  npm run test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`JWT_SECRET`
`DB_URL`
`SALT`


## API Reference

#### login user

```http
  POST /login/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{email, passord}` | `object` |  if ok return JWT |

#### register user

```http
  POST /register/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{email, passord, name}`      | `object` | if data valid, return created user |




