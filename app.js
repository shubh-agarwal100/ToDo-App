const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");

const trySchema = new mongoose.Schema({
  name: String
});

const item = mongoose.model("task", trySchema);

const todo = new item({
  name: "Create some videos"
});

const todo2 = new item({
  name: "Learn DSA"
});

const todo3 = new item({
  name: "Learn React"
});

const todo4 = new item({
  name: "Take some rest "
});

//todo2.save();
//todo3.save();
//todo4.save();

// Converted callback to async/await
app.get("/", async function(req, res) {
  try {
    const foundItems = await item.find({});
    res.render("list", { dayej: foundItems });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/",function(req,res){

  const itemName = req.body.ele1;
  const todo4 = new item({
    name:itemName
  });
  todo4.save();
  res.redirect("/");
});

app.post("/delete", async function(req, res) {
  const checked = req.body.checkbox1;

  try {
    await item.findByIdAndDelete(checked);
    console.log("deleted");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting item");
  }
});


app.listen(3000, () => {
  console.log("Server running");
});