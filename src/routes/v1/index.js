const express = require('express')
const router = express.Router()
const  {Authentication} =require('../../middlewares')
const {UserController} = require('../../controller')
router.post('/auth',UserController.createUser)
router.post('/signin',Authentication.authValidation,UserController.signIn)
router.get('/isauthenticated',UserController.isAuthenticated)
router.get('/isadmin',UserController.isAdmin)
module.exports = router