# Mercadolibre coding Challenge

## Descripción

Este proyecto se hizo para el coding challenge de Mercado Libre. El cliente es una aplicación de React usando Razzle(https://github.com/jaredpalmer/razzle) para tener SSR. El server esta hecho con Node y Express. Para los estilos se usó Sass modules.

## Estructura de carpetas

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

## Como empezar

### Clonar

Podés clonar el repositorio desde esta url: https://github.com/Safro94/ml-challenge.git
Para clonarlo

```
git clone https://github.com/Safro94/ml-challenge.git
```

### Instalar dependencias

Ir al directorio del cliente

```
cd ml-challenge/client
```

Ejecutar

```
npm install
```

Ir al directorio del server

```
cd ml-challenge/server
```

Ejecutar

```
npm install
```

Para correr los dos proyectos al mismo tiempo, sobre la carpeta del server ejecutar

```
npm run dev
```

el servidor debería estar corriendo en http://localhost:8000 y el cliente en http://localhost:3000

## Server endpoints

Para ver la documentación de los endpoints ir a http://localhost:8000/docs

- GET http://localhost:8000/api/items?q=query
- GET http://localhost:8000/api/items/:id

## Test

Los dos proyectos están testeados con Jest, y el cliente con Jest + React testing library. En cada proyecto se puede ejecutar el comando

```
npm test
```

para correr los tests y

```
npm run coverage
```

para ver el coverage de cada proyecto.
