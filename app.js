const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

var items = [];

let example = "working";

app.get("/", function(req, res) {
  res.render("list", { ejes: items });
});

app.post("/", function(req, res) {
  var item = req.body.ele1;
  items.push(item);
  res.redirect("/");
});

app.listen(4000, function() {
  console.log("Server started");
});
