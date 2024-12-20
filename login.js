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
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/adminlogin.html");
});
app.post("/submit",encoder,function(req,res){
  var pname=req.body.pname;
  var pemail=req.body.pemail;
  var pass=req.body.pass;
  var cpass=req.body.cpass;
  connection.query("INSERT INTO loginuser(name,user_email,user_pass,confirm_password) VALUES(?,?,?,?)",[pname,pemail,pass,cpass],function(error,result){
      if(error){
        console.log(error);
      }
      else{
        res.redirect('http://localhost:2000/')
      }
    })
  
})
app.listen(3100);
