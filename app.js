const { log } = require("console");
const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apkey = "5d916f2afba072ca455d16a56e9e5fea";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apkey+"&units="+unit
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const feelslike = weatherData.main.feels_like
            const temp_max = weatherData.main.temp_max
            const temp_min = weatherData.main.temp_min
            const humidity = weatherData.main.humidity
            const descr = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<style>h3{text-align: center;}</style>")
            res.write("<style>h4{text-align: center;}</style>")
            res.write("<style>body{margin:100px;}</style>")
            res.write("<h3>The weather in "+query+" is "+temp+" degree celsius.</h3>")
            res.write("<h4> The weather description is "+descr+".</h4>")
            res.write("<h4>Maximum temperature: "+temp_max+".</h4>")
            res.write("<h4>Minimum temperature: "+temp_min+".</h4>")
            res.write("<h4>Feels like: "+feelslike+" degree celsius.</h4>")
            res.write("<h4>Humidity: "+humidity+".</h4>")
            res.write("<h4><img src="+imageURL+"></h4>")
            res.write("<body style=background-color:Lavender Blue;>")
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})

