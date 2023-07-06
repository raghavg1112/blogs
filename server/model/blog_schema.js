const mongoose=require('mongoose');
const blog_schema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    blog:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const blog=mongoose.model("Blog",blog_schema);
module.exports=blog;