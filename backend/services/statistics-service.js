// << db setup >>
const db = require("../db");
const collectionName = "tasks";

let jwt = require("jsonwebtoken");
const config = require("../helpers/config");

const express = require("express");
const router = express.Router();

const helperFunctions = require("../helpers/helper-functions");


db.initialize(collectionName, function(dbCollection) {
        router.get("/tasks", (request, response) => { //statistics/tasks
            //verify jwt
            let token = request.headers['x-access-token'] || request.headers['authorization']; // Express headers are auto converted to lowercase
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            if (token) {
                jwt.verify(token, config.secret, function(err, decoded) {
                    if (err) {
                        response.status(403).json({
                            success: false,
                            message: 'User is not authentificated'
                        });
                    } else {
                        const emailUser = decoded.email;

                        dbCollection.find({ createdBy: emailUser, _finalized: { $in: ["true", false] }, _rejected: { $in: ["true", false] } }).toArray((error, result) => {
                            if (error) {
                                response.status(400).json({
                                    success: false,
                                    message: 'Getting tasks failed! Please check the request'
                                });
                            } else {
                                response.status(200).json({
                                    success: true,
                                    data: result
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    function(err) {
        throw err;
    });

module.exports = { router }