"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controllers_1 = require("../controllers/movie.controllers");
const router = (0, express_1.Router)();
// router.get('/movies').get()
router.get('/movie').get('/:id', movie_controllers_1.getMovie).post('', movie_controllers_1.postMovie).put('', movie_controllers_1.putMovie).delete('', movie_controllers_1.deleteMovie);
// const authCheck= require('../middlewares/checkToken')
// router.get('/getConversations/:id',authCheck.checkToken ,messagesController.getConversations)
// router.put('/sendMessage',authCheck.checkToken ,upload.single('messageImg'), messagesMiddlewares.checkBeforeSendMessage, messagesController.sendMessage);
// router.put('/messageRead',authCheck.checkToken ,messagesMiddlewares.checkIdMessage, messagesController.updateRead)
// module.exports = router;
