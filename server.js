var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var routes = require("./controllers/snippet_controller.js");
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main", extname: ".handlebars"}));
app.set("view engine", "handlebars");

var session = require('express-session');
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 500000 }}))
 

app.use("/", routes);

app.listen(port, function() {
	console.log("listening on port: " + port);
});