const mongoose=require("mongoose");

const gmailSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    time:{
      type:String,
      required:true  
    }
})


const gmailModel=mongoose.model('gmail',gmailSchema)

module.exports=gmailModel