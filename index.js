//jshint esversion:6
const bodyParser = require("body-parser"),
      express = require("express"),
      request = require("request"),
      app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
  let crypto = req.body.crypto,
      fiat = req.body.fiat,
      amount = req.body.amount,
      options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
          from: crypto,
          to: fiat,
          amount: amount
        }
      };
  request(options, function(error, response, body){
    let data = JSON.parse(body),
        price = data.price,
        currentDate = data.time;
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>" + amount + " " + crypto + " is currently worth " + price + " " + fiat + "</h1>");
    res.send();
  });
});

app.listen(3000, function(){
  console.log("WE UP!");
});
