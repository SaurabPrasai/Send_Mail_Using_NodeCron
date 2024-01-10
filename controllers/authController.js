const User=require("../models/authModel")
const bcrypt=require("bcrypt")

const getLogin=async(req,res)=>{
res.render("login")
}

const postLogin=async(req,res)=>{
 const {email,password}=req.body;
 try {
    let user;
    user=await User.findOne({email});
    if(!user){
        return res.redirect('/login');
    }
    //checking password
    const isMatch=await bcrypt.compare(password,user.password);
    if(isMatch){
        req.session.user=true;
        res.redirect("/");
    }else{
        res.redirect('/')
    }
 } catch (error) {
    console.log(error);
 }
}

// const getSignup=async(req,res)=>{

//     res.render("signup")

// }

// const postSignup=async(req,res)=>{
//     const {username,email,password}=req.body;
//     try {
//         let user;
//         user=await User.findOne({email})
//         if(user){
//             return res.json({msg:"User already exist"})
//         }
//         const salt=await bcrypt.genSalt();
//         const hashPassoword=await bcrypt.hash(password,salt);
//         user=await User.create({username,email,password:hashPassoword});
//         if(user){
//             return res.redirect("/")
//         }else{
//             res.redirect('/login')
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports={
    getLogin,postLogin
}