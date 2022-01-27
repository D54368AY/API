const empmodal=require('../db/employeeSchema');
const getData = async() =>{
   await empmodal.find({},(err,data)=>{
        if(err) throw err;

    })
}

const postData = async(data) =>{
    let ename=data.ename;
    let salary=data.salary;
    let add=data.add;
  
    //insert data
    let ins=new empmodal({ename:ename,salary:salary,add:add});
   await ins.save((err)=>{
        if(err) throw err;
        else{
            console.log("data added")
        }
    })
}

const putData = async(id,data) =>{
 
    
  await  empmodal.updateOne({_id:id},{$set:data},(err)=>{
        if(err) throw err;
        else {
            console.log('updated')
        }
    })
    
}

const deleteData = async(id) =>{
   await empmodal.deleteOne({_id:id},(err)=>{
        if(err) throw err 
        
       else{
        console.log('deleted')
       }
    })
        
    
}
module.exports={
    getData,
    putData,
    postData,
    deleteData
}