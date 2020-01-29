// << db setup >>
const db = require("../db");
const collectionName = "tasks";

let jwt = require("jsonwebtoken");
const config = require("../helpers/config");

const express = require("express");
const router = express.Router();

const helperFunctions = require("../helpers/helper-functions");
const notificationService = require("./notifications-service");

db.initialize(collectionName, function(dbCollection) {
        router.post("/", (request, response) => {
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
                        let item = request.body;
                        item._id = helperFunctions.generateRandomId();
                        item.createdBy = decoded.email;
                        item._finalized = false;
                        item._rejected = false;

                        item.assignedTo.forEach(element => {
                            const text = `You are receiving this because ${decoded.email} just assigned a task to you!\n
                                          Please check the dashboard in our Task Organizer app.`;
                            notificationService.sendMail(text, element);
                        });

                        dbCollection.insertOne(item, (error, result) => {
                            if (error) {
                                response.status(400).json({
                                    success: false,
                                    message: 'Creating task failed! Please check the request'
                                });
                            } else {
                                response.status(200).json({
                                    success: true,
                                    message: 'Task created'
                                });
                            }
                        });
                    }
                });
            }
        });


        router.get("/", (request, response) => {
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

                        dbCollection.find({ assignedTo: emailUser, _finalized: false, _rejected: false }).toArray((error, result) => {
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

        router.put("/:idTask", (request, response) => {
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
                        const idTask = request.params.idTask;
                        const item = request.body;

                        dbCollection.updateOne({ _id: idTask }, { $set: item }, (error, result) => {
                            if (error) {
                                response.status(400).json({
                                    success: false,
                                    message: 'Update failed! Please check the request'
                                });
                            } else {
                                response.status(200).json({
                                    success: true,
                                    message: 'Succes'
                                });
                            }
                        });
                    }
                });
            }
        });

        router.delete("/:idTask", (request, response) => {
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
                        const idTask = request.params.idTask;

                        dbCollection.deleteOne({ _id: idTask }, function(error, result) {
                            if (error) {
                                response.status(400).json({
                                    success: false,
                                    message: 'Delete failed! Please check the request'
                                });
                            } else {
                                response.status(200).json({
                                    success: true
                                });
                            }
                        });
                    }
                });
            }
        });

        router.get("task/:idTask", (request, response) => {
            //verify jwt
            const idTask = request.params.idTask;

            dbCollection.findOne({ _id: idTask }, (error, result) => {
                if (error) {
                    response.status(400).json({
                        success: false,
                        message: 'Error! Please check the request'
                    });
                } else {
                    response.status(200).json({
                        success: true,
                        data: result
                    });
                }
            });
        });

    },
    function(err) {
        throw err;
    });


module.exports = {
    router
};