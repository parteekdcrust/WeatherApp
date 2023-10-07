const express = require("express");
const https= require("https");
const bodyParser = require("body-parser");

const app =express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" ,function(req,res){
        

    const query=req.body.CityName;
    const appKey="95891af06f6709e1eff2ecf6903ce279";
    const unit ="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?appid=" + appKey + "&q=" + query + "&units=" + unit;

    https.get(url,function(response){   
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp =weatherData.main.temp;
        const disription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const ImageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"        
        res.write("<p>weather discription is " + disription  + " </p>");
        res.write("<h1>tempearture of " + query + " is "+ temp +" degree celcius</h1>");
        res.write("<img src=" + ImageUrl + ">");
        res.send();
    });
});
});


app.listen(3000,function(){ 
    console.log("srever is running on port 3000");

});

//to start type command <<nodemon app.js>>