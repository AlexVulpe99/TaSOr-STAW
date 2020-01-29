// server.js

const express = require("express");
const server = express();

const body_parser = require("body-parser");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// parse JSON (application/json content-type)
server.use(body_parser.json());
server.use(body_parser.urlencoded({
    extended: true
}));

server.use(cors());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}

const swaggerDefinition = {
    info: {
        title: 'Tasor Swagger API',
        version: '1.0.0',
        description: 'Endpoints to routes',
    },
    host: 'https://tasorapi.herokuapp.com',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./swaggers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

server.get("/swagger.json", (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(swaggerSpec);
});

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// << services >>
const authService = require("./services/auth-service");
server.use("/auth", authService.router);

const taskService = require("./services/task-service");
server.use("/tasks", taskService.router);

const statisticsService = require("./services/statistics-service");
server.use("/statistics", statisticsService.router);

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});