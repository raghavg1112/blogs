const mongoose=require('mongoose');
const Db=process.env.DATABASE
mongoose.set('strictQuery',true);
mongoose.connect(Db).then(()=>{
    console.log("connection successfull");
}).catch((err)=>{
    console.log(`err occured is ${err}`);
})