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
    //numberPlates
    res.render('index', {
      numberPlates
    });
  })
});
//controls what registration enters





var emptyString = [];
var plateObj = {};
app.post('/', function(req, res) {
  var areas = req.body.plateNumber;
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
        if (enteredRegNumber.startsWith('ca') ||
          enteredRegNumber.startsWith('cl') ||
          enteredRegNumber.startsWith('cy')) {
          models.Registration.create({
            regNum: enteredRegNumber
          }, function(err, plate) {
            if (err) {
              console.log(err);
            } else {

              res.redirect("/")


            }
          })
        } else {
          res.render('index', {
            message: "registration not supported"
          })
        }
      }
    }
  })
  // }
});






app.post('/filter', function(req, res) {
  var areas = req.body.plateNumber;

  if(!areas){
    res.render('index',{
      message : "please select on the choice buttons"
    });
  }else{
    if (areas === 'all') {
      areas = "";
    }
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
  }

});
app.post('/reset', function(req, res) {
  models.Registration.remove({}, function(err, remove) {
    if (err) {
      return err;
    }
    res.redirect('/')

  });
});

var port = 3001;
app.listen(process.env.PORT || port, function() {});
