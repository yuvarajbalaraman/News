//jshint esversion:6
const express = require("express");
const bodyParser=require("body-parser");
const request = require("request");
const app =express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.post("/",function(req,res){

var f=req.body.first;
var l=req.body.last;
var e=req.body.em;

var data = {
  members: [
    {
      email_address:e,
      status:"subscribed",
      merge_fields: {
        FNAME:f,
        LNAME:l
      }
    }
  ]
};
var jsonData=JSON.stringify(data);
var options={
  url : "https://us4.api.mailchimp.com/3.0/lists/c3a0c5164e",
  method:"POST",
  headers: {
    "Authorization":"yuvarajb31 54094355b5277fb3b15f54f7f9ed97c1-us4"
  },
  body:jsonData

};

request(options,function(error,response,body){
if(error){
  res.sendFile(__dirname+"/failure.html");
}else{
  if(response.statusCode == 200){
    res.sendFile(__dirname+"/success.html");
  }else{
      res.sendFile(__dirname+"/failure.html");
  }

}
});

});

app.listen(process.env.PORT || 3000,function(){
  console.log("server running...");
});

//
// list
//
// c96b7b470f
//
//
// api
//
//
// 1f18d637c327e7fb9323cf9de310569e-us4
