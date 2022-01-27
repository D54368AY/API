const express=require('express')
const router=express.Router()
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const {getData,postData,putData,deleteData}= require('../controller/empcontroller')
const {check,validationResult}=require('express-validator')

//jwt token function 
function autenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
      res.json("You haven't generated token yet");
    } else {
      jwt.verify(token, jwtSecret, (err, data) => {
        if (err) {
          res.json("Token Not Matched");
        } else {
          console.log("Match Token");
          next();
        }
      });
    }
  }
  let payload = {
    uid: "saurabh",
  };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 120000 });
  console.log(token)
router.get("/",autenticateToken,(req,res)=>{
    res.send("get Data ")
    getData();
})

router.post("/addnew",[autenticateToken,
    check('ename','Name must be 5+ characters')
    .exists()
    .isString()
    .isLength({min:5}),
    check('salary','Salary of must be 5 digit')
    .exists()
    .isNumeric()
    .isLength({min:5}),
    check('add','Add must be of atleast 5 character')
    .isString()
    .isLength({min:5})
    .exists()
],(req,res)=>{
    
    const errors=validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        let alert=errors.array()
        res.json({alert})
       
    }
else{
    res.send("post data ")
    postData(req.body);
}
})

router.put("/update/:id",[autenticateToken,
    check('ename','Name must be 5+ characters')
    .exists()
    .isString()
    .isLength({min:5}),
    check('salary','Salary of must be 5 digit')
    .exists()
    .isNumeric()
    .isLength({min:5}),
    check('add','Add must be of atleast 5 character')
    .isString()
    .isLength({min:5})
    .exists()
],(req,res)=>{

    const errors=validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        let alert=errors.array()
        res.json({alert})
    }
    else{
    const id=req.params.id
    res.send("updated data ")
    putData(id,req.body)
    }
})

router.delete("/delete/:id",autenticateToken,(req,res)=>{
    const errors=validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        let alert=errors.array()
        res.json({alert})
    }
    else{
    const id=req.params.id
    res.send("deleted data ")
    deleteData(id)
    }
})
module.exports=router;