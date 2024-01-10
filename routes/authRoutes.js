const { getLogin, postLogin,  } = require("../controllers/authController");

const router=require("express").Router();

router.get("/login",getLogin)

router.post('/login',postLogin)

// router.get('/signup',getSignup)

// router.post('/signup',postSignup)


module.exports=router;