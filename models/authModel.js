const mongoose=require("mongoose");

const authSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
       type:String,
       required:true
    }
})

const authModel=mongoose.model("user",authSchema)

module.exports=authModel;