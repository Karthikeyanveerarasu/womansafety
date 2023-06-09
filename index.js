const express =require('express');
const app = express();
const mysql = require('mysql')
const cors=require('cors')
const bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const saltRounds = 10;
const accountSid = "AC8df45fa595976e7264be49e1ed60369b";
const authToken = "b0cd2ae57ddecf36df6e01e17c44f6ee";
const client = require("twilio")(accountSid, authToken);
app.use(express.json());
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET","POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
  key:"userid",
  secret:"Vsvivvva",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires : 60* 60 *24,
  },
}))
const db = mysql.createConnection({
  host: 'localhost',
  user: 'karthi',
  password: 'karthi',
  database: 'page'
})
app.post('/mobile',(req,res)=>{
  const number=req.body.number;
    const email=req.body.email;
    console.log(email);     
    var otp = Math.floor(100000 + Math.random() * 900000);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "20bcs4037@mkce.ac.in",
        pass: "20BCS4037@MKCE"
      }
    });
    
    var mailOptions = {
      from: "fakeidbro88@gmail.com",
      to: email,
      subject: "Woman Safty",
      text: "Your one time password was " + otp
    };
    db.query("SELECT * FROM login WHERE email=?",[email],(err,name)=>{
      console.log(name);
      if(err){
        console.log(err);
        return;
      }
      if(name.length>0){
       return res.send({already : "email already exist !"})
      }
    })
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
        return res.send({otp : otp})
      }
    });

})

app.post('/register',(req,res)=>{
  const username=req.body.name;
  const password =req.body.password;
  const email=req.body.email;
  const number=req.body.number;
  console.log(number);
        bcrypt.hash(password,saltRounds,(err,hash)=>{
             if(err){
                console.log(err);
              }
              db.query("INSERT INTO login (username, password, email,phone) VALUES (?,?,?,?)",[username,hash,email,number],(err,result)=>{
                console.log(err);
                if(!err){
                return  res.send({success:"Register Successfully !"})
                }
              })
            }) 
})
app.get('/login',(req,res)=>{
  if(req.session.user){
    res.send({Loggedin : true})
  }
  else{
    res.send({Loggedin : false})
  }
})
app.post('/login',(req,res)=>{
  const email=req.body.email;
  const password =req.body.password;
  console.log(email)
db.query("SELECT * FROM login WHERE email = ?",[email],(err,result)=>{
  if(err){
    console.log(err)
  }  
  if(result.length >0){
    bcrypt.compare(password,result[0].password,(err,response)=>{
      if(response){
        req.session.user = result;
        console.log(req.session.user);
         return res.send({success : "validated"});
      }
      else{
         return res.send({mismatch : "Wrong Credentials"});
      }
    })
  }
  else{
    return res.send({mismatch : "Wrong Credentials"})
  }
})
})
app.post('/details',(req,res)=>{
  const email=req.body.email;
  const firstnumber=req.body.firstnumber;
  const Secondnumber=req.body.Secondnumber;
  const thirdnumber = req.body.thirdnumber;
  console.log(email)
  db.query("INSERT INTO userdata (email,firstnumber,secondnumber,thirdnumber) VALUES(?,?,?,?)",[email,firstnumber,Secondnumber,thirdnumber],(err,result)=>{
    console.log(err);
    if(!err){
    return  res.send({success:"Register Successfully !"})
    }
  })
})
app.post('/getnumber',(req,res)=>{
  db.query("SELECT * from userdata",(err,result)=>{
    if(err){
      console.log(err)
      return
    }
    console.log(result);
    return res.send(result);
  })
})
app.post('/data',(req,res)=>{
  const email=req.body.email;
  console.log("checking...");
  db.query("SELECT * from userdata where email=?",[email],(err,result)=>{
    if(err){
      console.log(err);
    }
    if(result.length > 0){
      return res.send({already : "home"});
    }
  })
})
app.post("/location", (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const firstnumber=req.body.firstnumber;
  const Secondnumber=req.body.Secondnumber;
  console.log(Secondnumber);
  const thirdnumber = req.body.thirdnumber;

  const numbersToMessage = [`+91${firstnumber}`,`+91${Secondnumber}`,`+91${thirdnumber}`];

  numbersToMessage.forEach(async number => {
    const message = await client.messages.create({
      body: `Check out the location of your friend : https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      from: "+16076526685",
      to: number
    });
    console.log(message.status)
  });
});

app.post("/call", (req, res) => {
  console.log("calling..")
  const firstnumber=req.body.firstnumber;
  const Secondnumber=req.body.Secondnumber;
  console.log(Secondnumber);
  const thirdnumber = req.body.thirdnumber;
  console.log(thirdnumber);
  const twilio = require("twilio");
  const twilioClient = twilio(
    "AC8df45fa595976e7264be49e1ed60369b",
    "b0cd2ae57ddecf36df6e01e17c44f6ee"
  );
  const numbersToCall = [`+91${firstnumber}`,`+91${Secondnumber}`,`+91${thirdnumber}`];
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say(
    "Hello, this is a emergency call. Your friend is in trouble and needs help. Please go and assist her as soon as possible we send their location to you go and help her !",
    {
      voice: "man",
      language: "en-GB"
    }
  );
  numbersToCall.forEach(async number =>{
    twilioClient.calls
    .create({
      twiml: twiml.toString(),
      to: number,
      from: "+16076526685"
    })
      .then((call) => {
        console.log(`Initiated call with sid: ${call.sid}`);
      //  res.status(200).send("Call initiated.");
      })
      .catch((err) => {
        console.error(`Error initiating call: ${err}`);
      //  res.status(500).send("Error initiating call.");
      });
  })
  
});
////logout function ///
app.post('/logout', function(req, res) {
  console.log("Logging out ....")
  req.session.destroy(function(err,result) {
    if (err) {
      console.log(err);
    } else {
      res.send({Loggedin:false})
    }
  });
});

// app.post('/home',(req,res)=>{
//   const userdata=req.body.udata;
//   db.query("SELECT * FROM userdata WHERE username= ?",[userdata],(err,user)=>{
//           if(err){
//             console.log(err);
//           }
//           if(user.length >0){
//             res.send(user);
//           }
//   })
// })
// app.post('/data',(req,res)=>{
//   const userdata=req.body.udata; 
//   const name=req.body.name;
//   const email=req.body.email;
//   const phone=req.body.phone;
//   const age=req.body.age;
//   const gender = req.body.gender;
//   const city=req.body.city;
//   db.query("INSERT INTO userdata(username,name,email,phone,age,gender,city) VALUES(?,?,?,?,?,?,?)",[userdata,name,email,phone,age,gender,city],(err,data)=>{
//     console.log(err);
//   })
// })
// app.post('/update',(req,res)=>{
//   const userdata=req.body.udata; 
//   const name=req.body.name;
//   const email=req.body.email;
//   const phone=req.body.phone;
//   const age=req.body.age;
//   const gender = req.body.gender;
//   const city=req.body.city;
//   db.query("UPDATE userdata SET name=?,email=?,phone=?,age=?,gender=?,city=? WHERE username=?",[name,email,phone,age,gender,city,userdata],(err,data)=>{
//     console.log(err);
//   })
// })
app.listen(3002,()=>{
    console.log("running server");
})