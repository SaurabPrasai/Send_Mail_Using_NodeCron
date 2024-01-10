const Gmail=require("../models/gmailSchema");




  const sendMail=async(req,res)=>{
    const {subject,message,time}=req.body;
      try {

        const gmail=await Gmail.create({subject,message,time:new Date(time)});
        if(gmail){
          return res.status(200).json({msg:"task created"})
        }
        return res.status(200).json({msg:"Task is not created"})

   
    
      } catch (error) {
        console.log(error);
      }
  }



module.exports=sendMail