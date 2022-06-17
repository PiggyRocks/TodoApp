const express = require("express");
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });
const itemSchema = {
  name: String
}
const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
  name: "welcome to Todo App",
})

const item2 = new Item({
  name: "one app for all your need",
})

const item3 = new Item({
  name: "Enjoy",
})
const d = [item1, item2, item3];
// Item.insertMany(d,function(err){
// if(err){
//   console.log("ERROR!!");
//   console.log(err);
// } else{
//   console.log("Successfully saved to DB")
// }
// })
//var i1=[];
app.get("/", function (req, res) {
  //  res.send("<h1>Welcome!!</h1>");
  console.log(req.header)
  Item.find({}, function (err, f) {
    //console.log(f);
    if (f.length === 0) {
      Item.insertMany(d, function (err) {
        if (err) {
          console.log("ERROR!!");
          //  console.log(err);
        } else {
          console.log("Successfully saved to DB")
        }
      });
      // res.redirect("/");
      res.send("Happy");
    } else {
      res.render("list", { newListItems: f });
    }

  })



  // res.render("list",{newListItems:i1});
})
app.post("/", function (req, res) {
  console.log(req.header)
  const itemName = req.body.n;
  // var i=req.body.n;
  //i=req.body.n;
  // console.log(i);
  //res.render("list",{newListItem:i});
  //i1.push(i);
  //res.redirect("/");
  const item = new Item({
    name: itemName
  });
  item.save(() => {
    console.log("Successfully saved to DB");
    res.redirect('/');
  });

})
app.post("/delete", function (req, res) {
  const check = req.body.checkbox;
  console.log(check)
  Item.findByIdAndRemove(check, (err) => {
    if (!err) {
      console.log("Successfully Deleted");

    }
    else {
      console.log(err);
    }
    res.redirect("/")
  })
})
app.listen(3000, function () {
  console.log("Listening on port 3000");

})