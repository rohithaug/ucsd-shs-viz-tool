'use strict';

// REQUIRE PACKAGES
const express = require("express");
const cors = require("cors");
const methodOverride = require('method-override');
const helmet = require('helmet');
const http = require('http');
const httpStatus = require('http-status');

// CONFIG
const { config } = require("./index");

module.exports = () => {
    // INITIALIZE EXPRESS APP
    const app = express();

    // SETTING APPLICATION LOCAL VARIABLES
    app.locals.title = config.app.title;
    app.locals.version = config.app.version;
    app.locals.description = config.app.description;
    app.use((req, res, next) => {
        if (config.app.url) {
            app.locals.url = config.app.url + ':' + config.port;
        }
        else {
            res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        }
        next();
    });

    // CORS
    app.use(cors());

    // BODY PARSING
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // METHOD OVERRIDE - FOR CLIENTS THAT DOESN'T SUPPORT PUT AND DELETE
    app.use(methodOverride());

    // SECURE EXPRESS HEADERS USING HELMET
    app.use(helmet({ frameguard: false }));
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');

    // SET HTTP HEADERS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });

    // REQUIRE ALL SERVER ROUTES
    require("../app/routes/v1")(app);

    // REQUIRE APP CLIENT
    // TODO

    // ERROR HANDLING
    app.use((err, req, res, next) => {
        if (err.name === "UnauthorizedError") {
            res.status(401).send("UnauthorizedError");
        }

        console.log(err);

        if (err.statusCode) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
    });

    // INITIALIZE SERVER
    let server;
    server = http.createServer(app);
    app.set('server', server);

    return app;
};
