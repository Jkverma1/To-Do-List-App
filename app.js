//jshint version:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
let items = ["buy food", "cook food", "eat food"];
let workItems = [];
app.use(express.static("public"));

app.set("view engine", 'ejs');

app.get('/', (req,res)=>{

  let day = date.getDate();
  res.render('list', {listTitle: day, newListItems: items});
})

app.post('/', (req,res)=>{

  item = req.body.newItem;

  if(req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect('/work');
  }
  else {
    item = req.body.newItem;
    items.push(item);
    res.redirect('/');
  }

})

app.get('/work', (req,res)=>{
  res.render('list', {listTitle: "Work", newListItems: workItems});
})



app.listen(3000, (req,res)=>{
  console.log("server started!")
})
