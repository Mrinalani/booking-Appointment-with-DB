const path = require('path')

const express = require('express')

const UserController = require('../controllers/usercontroller')

const router = express.Router();

router.post('/user/add-user', UserController.postUserDetails)

router.get('/getdata/fromDB',UserController.getUserDetails)

router.delete('/deleteElement/fromDB/:userId',UserController.deleteUserDetails)

module.exports = router;

