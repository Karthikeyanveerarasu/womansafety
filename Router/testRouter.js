const router = require("express").Router();


router.post("/mobile",(req,res)=>{
    const number=req.body.number;
    console.log(number);

//     client.verify.v2
//   .services(verifySid)
//   .verifications.create({ , channel: "sms" })
//   .then((verification) => console.log(verification.status))
})
router.post("/otp",(req,res)=>{
   
})

module.exports = router

const express = require("express");
const app = express();

app.listen(8080, function () {
  console.log("server running on 8080");
}); //the server object listens on port 8080



