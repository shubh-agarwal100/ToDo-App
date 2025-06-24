const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://agarwalshubh055:5mCk56TZj5EAp9yX@todo-app-shubh.z4vg2h6.mongodb.net/?retryWrites=true&w=majority&appName=ToDo-app-shubh");

const User = require('./models/userModels.js');

const trySchema = new mongoose.Schema({
  name: String
});

const item = mongoose.model("task", trySchema);

// GET: display list
app.get("/", async function(req, res) {
  try {
    const foundItems = await item.find({});
    res.render("list", { dayej: foundItems });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// POST: add new item
app.post("/", function(req, res) {
  const itemName = req.body.ele1;
  const newItem = new item({ name: itemName });
  newItem.save();
  res.redirect("/");
});

// PUT: update existing item
app.put("/update/:id", async function(req, res) {
  try {
    await item.findByIdAndUpdate(req.params.id, { name: req.body.updatedName });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating item");
  }
});

// DELETE: delete item
app.delete("/delete/:id", async function(req, res) {
  try {
    await item.findByIdAndDelete(req.params.id);
    console.log("deleted");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting item");
  }
});

// Listen
app.listen(3000, () => {
  console.log("Server running nicely brother");
});
