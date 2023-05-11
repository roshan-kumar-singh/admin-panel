const router = require('express').Router();
const adminController = require('../controller/admin.controller');


//Admin Register
router.post("/admin-register",adminController.adminRegister );

 //get all admin data
 router.get('/admin-details',adminController.adminDetails)

 //Admin login 
 router.post('/admin-login', adminController.adminSignIn);
 
module.exports = router