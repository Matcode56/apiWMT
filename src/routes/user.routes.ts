import express from 'express'

const userRoutes = express()

// router.get('/movies').get()
userRoutes.route('/user').get((req, res) => {
  res.send('hey')
})

// movieRouter.use('/movie').get('/:id', getMovie).post('', postMovie).put('', putMovie).delete('', deleteMovie)

// const authCheck= require('../middlewares/checkToken')

// router.get('/getConversations/:id',authCheck.checkToken ,messagesController.getConversations)
// router.put('/sendMessage',authCheck.checkToken ,upload.single('messageImg'), messagesMiddlewares.checkBeforeSendMessage, messagesController.sendMessage);
// router.put('/messageRead',authCheck.checkToken ,messagesMiddlewares.checkIdMessage, messagesController.updateRead)

export default userRoutes
