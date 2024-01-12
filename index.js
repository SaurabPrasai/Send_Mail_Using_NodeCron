const express=require("express");
require("dotenv").config();
const PORT=process.env.PORT||3000;
const app=express();
const mailRouter=require("./routes/mailRouter");
const authRouter=require("./routes/authRoutes")
const { default: mongoose } = require("mongoose");
const schedule = require('node-schedule');
const Gmail=require("./models/gmailSchema");
const { transporter, mailOptions } = require("./config/mailConfig");
const session=require("express-session");
const mongoDbSession=require("connect-mongodb-session")(session);
const moment = require('moment-timezone');




//database connection
mongoose.set('strictQuery',false);
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("MongoDB Connected!");
// }).catch((err)=>{
//     console.log(err);
// })
const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//connect mongo session
const store=new mongoDbSession({
    uri:process.env.MONGO_URI,
    collection:'mySessions'
})


//view engine
app.set('view engine','ejs')

//middleware
app.use(express.urlencoded({extended:false}))

//session

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge:1000*60*3
    }
}))

app.use(authRouter)
app.use(mailRouter)





// cron.schedule
const job = schedule.scheduleJob('* * * * *', async function(){
    const serverTime=moment.tz('Asia/Kathmandu')
    try {
        //finding task with near time
        const data=await Gmail.find({}).sort({time:1})
        let taskTime
        if(data.length>0){
          taskTime=data[0].time; 
          //converting the given time into local time
        taskTime=moment(taskTime).tz('Asia/Kathmandu').format('YYYY-MM-DD HH:mm');
        }
       //checking if the current time=tasktime
         if(taskTime==serverTime.format('YYYY-MM-DD HH:mm')){
            mailOptions.subject=data[0].subject,
            mailOptions.text=data[0].message
           const isSend=await transporter.sendMail(mailOptions)
           if(isSend){
            await Gmail.findOneAndDelete(data[0])
           }
           
         }
    } catch (error) {
        console.log(error);
    }
  });
  

 connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Listening on port 3000");
    })
 }) 
