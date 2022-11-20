import { Router } from 'express'
import { deleteMovie, getMovie, postMovie, putMovie } from '../controllers/movie.controllers'

const router = Router()

// router.get('/movies').get()
router.get('/movie').get('', getMovie).post('', postMovie).put('', putMovie).delete('', deleteMovie)

// const authCheck= require('../middlewares/checkToken')

// router.get('/getConversations/:id',authCheck.checkToken ,messagesController.getConversations)
// router.put('/sendMessage',authCheck.checkToken ,upload.single('messageImg'), messagesMiddlewares.checkBeforeSendMessage, messagesController.sendMessage);
// router.put('/messageRead',authCheck.checkToken ,messagesMiddlewares.checkIdMessage, messagesController.updateRead)

// module.exports = router;
