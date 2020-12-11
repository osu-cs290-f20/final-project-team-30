var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var postData = require("./postData.json");
var postDataLength = postData.length;
// console.log(" == People Data: ", postData);

//regestering template engine
app.engine('handlebars', exphbs({defaultLayout: null}));
 //telling express to use handlebars as default template engine
 app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('Public'));


app.get('/', function(req, res, next){
  //console.log(" -- postData Length:", postData.length);
  if(postData == undefined){
    next();
  }
  res.status(200).render('pageTemplate', {posts: postData, show:true});
});

app.post('/addHike', function(req, res, next){
  console.log("  ==  req.body: ",req.body);
  if(req.body && req.body.difficulty && req.body.type && req.body.title && req.body.length && req.body.photoURL){
    postData.push({
      length: req.body.length,
      type: req.body.type,
      difficulty: req.body.difficulty,
      title: req.body.title,
      photoURL: req.body.photoURL
    });
    //console.log("  ==  Data for ", req.body.title, ":", postData);
    console.log(" == Beginning File Write  ==  ");
    fs.writeFileSync("PostData.json", JSON.stringify(postData, null, 2), function(err, data){
      if(err){
        console.log("  ==  REACHED ERROR!!!  ==  ");
        console.log("  ==  err:", err);
        res.status(200).send("Error saving photo in database");
      }
      console.log(" == No Error :)  ==  ");
    });
    console.log(" == Ending File Write  ==  ");

    res.status(200).send("Data successfully sent");

  }
  else{
    res.status(400).send(" == request body missing required fields");
  }


});

app.get('/posts/:postName/', function(req, res, next){
  console.log("  ==  PostData[0]:", postData);
  var name = req.params.postName;
  var num;
  for(i =0; i < postDataLength;i++){
    if (postData[i].name == name){
      num = i;
    }
    var singlepost = postData[num];
    res.status(200).render('pageTemplate', {posts:[singlepost], show:false});
  }
})

app.get('/:PostNum', function(req, res, next){
  var num = req.params.PostNum.slice(1);
  //console.log(" == num is of type:", typeof(num))
  number = parseInt(num, 10);
  singlepost = postData[number];
  //console.log(" == number is of type:", typeof(number))
  //console.log("  ==  singlepost length:", postData[number].length);
  //console.log("  ==  Variable number:", singlepost);
  //console.log("  ==  Json passes:", singlepost);
  if(postData[num] != undefined){
    //console.log("  ==  Reached POST if  ==  ");
    res.status(200).render('pageTemplate', {posts:[singlepost], show:false});
  }else{
    //console.log("  ==  Reached POST else  ==  ");
    next();
  }
})


app.get('*', function (req, res) {
  res.status(404).render('404Template');
});

app.get('/posts/*', function (req, res) {
  res.status(404).render('404Template');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
