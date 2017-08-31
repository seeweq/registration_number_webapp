const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose')
const app = express()
var models = require('./model')


app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.static('public'));

  app.get('/', function(req, res) {
  models.Registration.find({}, function(err, numberPlates) {
    numberPlates
  })
  res.render('index');
});



var emptyString = [];
var plateObj = {};
app.post('/', function(req, res) {
  var enteredRegNumber = req.body.addRegNumber;
  var message = 'This registration number already exists'
  models.Registration.findOne({
    regNum: enteredRegNumber
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else if (data) {
      emptyString.push(enteredRegNumber);
      plateObj[enteredRegNumber] = 1;
      res.render('index', {
        message: message
      })
    } else {

      if (!data) {
        models.Registration.create({
          regNum: enteredRegNumber
        }, function(err, plate) {
          if (err) {
            console.log(err);
          } else {

            res.render('index',{
            numberPlates : plate
            });

          }
        })
      }
    }
  })
});






app.post('/filter', function(req, res) {
  var areas = req.body.plateNumber;
  //  console.log(areas);
  models.Registration.find({
    regNum: {
      '$regex': '.*' + areas
    }
  }, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      //    console.log(results);
      res.render('index', {
        regPlate: results
      })
    }
  })
});


var port = 3001;
app.listen(process.env.PORT || port, function() {});
