const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
const encoder=bodyParser.urlencoded();
const path = require('path');
const app=express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/myfiles')));
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"nodejs"
});
connection.connect(function(error,data){
    if(error){
        console.log(error);
    } 
    else
    {
    console.log("connocted");
    }
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html");
});
app.post("/submit",encoder,function(req,res){
  var cname=req.body.cname;
  var city=req.body.city;
   var email=req.body.email;
   var contact=req.body.contact;
   var message=req.body.message;
  connection.query("INSERT INTO customer(c_name,c_city,c_email,c_contact,massege) VALUES(?,?,?,?,?)",[cname,city,email,contact,message],function(error,result){
      if(error){
        console.log(error);
      }
      else{
        res.redirect('http://localhost:2000/')
      }
    })
})

app.listen(2000);