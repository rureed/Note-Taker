var express = require("express");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./routes/routes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });