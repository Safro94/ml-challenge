# MELI coding Challenge

## Description

This project was built for a coding challenge. The client is a React application with Server Side Rendering using Razzle(https://github.com/jaredpalmer/razzle). The server was built using Node js and Express. This project uses Sass modules for the styling.

## Folder structure

    root
      ├── server
      │   └── src
      │       ├── api
      │       │    ├── controllers
      │       │    ├── routes
      │       │    └── index.js
      │       ├── integration
      │       ├── middlewares
      │       ├── service
      │       ├── testUtils
      │       └── utils
      │
      ├── client
      │   ├── public
      │   └── src
      │       ├── components
      │       ├── containers
      │       ├── hooks
      │       ├── pages
      │       ├── routes
      │       ├── server
      │       ├── services
      │       ├── styles
      │       ├── utils
      │       ├── client.js
      │       └── index.js
      │
      └── README.md

## Stack

### Server

    - Node JS
    - Express
    - Jest

### Frontend

    - React
    - Razzle
    - Sass Modules
    - Jest + React testing library

## How to start

### Clone

You can clone the repo using this url: https://github.com/Safro94/ml-challenge.git

```
git clone https://github.com/Safro94/ml-challenge.git
```

### Install dependencies

Go to the client folder

```
cd ml-challenge/client
```

Run

```
npm install
```

Go to the server folder

```
cd ml-challenge/server
```

Run

```
npm install
```

To run both projects at the same time, go to the server folder and run
```
npm run dev
```

the server should be running on http://localhost:8000 and the client http://localhost:3000

## Server endpoints

To see the docs, go to http://localhost:8000/docs

- GET http://localhost:8000/api/items?q=query
- GET http://localhost:8000/api/items/:id

## Test

Both projects uses Jest for testing, and the client uses Jest + React testing library. You can run this command on each project

```
npm test
```

to run the tests and

```
npm run coverage
```

to see the coverage.
