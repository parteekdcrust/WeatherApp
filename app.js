require('dotenv').config();
const express = require("express");
const https= require("https");
const PORT = process.env.PORT || 3000 ;
const app =express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" ,function(req,res){
    const query=req.body.CityName;
    const appKey= process.env.appkey ;
    const unit ="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?appid=" + appKey + "&q=" + query + "&units=" + unit;

    https.get(url,function(response){   
    console.log(response.statusCode);
    response.on("data",function (data){
        try {
            const weatherData=JSON.parse(data);
            const temp =weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const ImageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"        
            res.write("<p>Weather discription is :" + description  + " </p>");
            res.write("<h1>Tempearture of " + query + " is "+ temp +" degree celcius</h1>");
            res.write("<img src=" + ImageUrl + ">");
            // res.json(weatherData);
            res.send();
        } catch (error) {
            console.log(error);
        }
        
    })
});
});


app.listen(3000,function(){ 
    console.log(`server is running on port ${PORT}`);

});