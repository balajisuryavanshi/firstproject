const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
const encoder=bodyParser.urlencoded();
const app=express();
app.use(bodyParser.json());
app.use(express.static('public'));
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
    res.sendFile(__dirname+"/emergency.html");
});
app.post("/submit",encoder,function(req,res){
    var pname=req.body.pname;
    var phone=req.body.phone;
    connection.query("INSERT INTO emergency(sname,contact) VALUES(?,?)",[pname,phone],function(error,result){
      if(error){
        console.log(error);
      }
      else{
        res.redirect('http://localhost:2000/');
      }
    })
})


app.listen(1600);