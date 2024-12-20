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
    res.sendFile(__dirname+"/register.html");
});
app.post("/submit",encoder,function(req,res){
  var pname=req.body.pname;
  var page=req.body.page;
   var pemail=req.body.pemail;
   var pphone=req.body.pphone;
   var pass=req.body.pass;
   var pcity=req.body.pcity;
  connection.query("INSERT INTO registration(name,age,email,contact,password,city) VALUES(?,?,?,?,?,?)",[pname,page,pemail,pphone,pass,pcity],function(error,result){
      if(error){
        console.log(error);
      }
      else{
        res.redirect('http://localhost:4600/')
      }
    })
})

app.listen(4600);