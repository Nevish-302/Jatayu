const express=require("express")
const dbConnect=require("./config/dbConnect");
const app=express();
const dotenv=require("dotenv").config()
dbConnect();
const PORT = process.env.PORT || 4000;

app.use("/",(req,res)=>{
    res.send("Server side");
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
  });