const express = require('express');
const mongoose  = require('mongoose');
const app = express()
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const cors = require('cors')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comments')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
//database
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connection established successfully");
    }
    catch(err){
        console.log(err);
    }
}
//middleware
dotenv.config()
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

// image upload using multer its logic for it
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        // fn(null,"me.jpg")
        fn(null,req.body.img)
    }

})
const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Images has been uploaded successfully")
})
app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app listening on port",process.env.PORT);
})