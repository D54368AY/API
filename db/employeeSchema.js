const mongoose=require('mongoose');
const empSchema=new mongoose.Schema({
  ename:{
      type:String,
      required:true,
      unique:true
  },
  salary:{
      type:Number,
      required:true
  },
  add:{
    type:String,
    required:true
  }
})
module.exports=mongoose.model("employee",empSchema);