const sendMail = require("../controllers/mailController");
const isAuth = require("../middleware/auth");

const router=require("express").Router();


router.get("/",isAuth,(req,res)=>{
    res.render("home")
})

router.post('/maildata',sendMail)


module.exports=router
