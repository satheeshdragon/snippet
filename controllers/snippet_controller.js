var express = require("express");
// var session = require('express-session');

var router = express.Router();

var hotdog = require("../models/hotdog_mod.js");

router.get("/snippet_base", function(req, res) {
  if (req.session.login_status == 1) {
    hotdog.all(function(data) {
      var hbsObject = {
        hotdogs: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  }
  if (req.session.login_status == 2){
     hotdog.all(function(data) {
      var hbsObject = {
        hotdogs: data
      };
      console.log(hbsObject);
      res.render("index_view", hbsObject);
    });
  }
  if (req.session.login_status == 0){
     res.render("partials/login_form/login");
  }
});

router.post("/insert_data", function(req, res) {
  
  hotdog.increment_id(function(data) {
    var hbsObject = {
      hotdogs: data
    };
    hotdog.create(req,data+1);
  });
  res.status(200).end();
  
});

router.post("/delete", function(req, res) {
  
  hotdog.delete_user_data(req);
  res.status(200).end();


});

router.post("/edit_data", function(req, res) {  
  hotdog.edit_user_data(req,function(data) {
    var hbsObject = {
      hotdogs: data
    };
      res.end(JSON.stringify(data));
  });
});

router.post("/update_data", function(req, res) {  
  hotdog.update_user_data(req,function(data) {
    var hbsObject = {
      hotdogs: data
    };
      res.status(200).end(JSON.stringify(data));

      // res.end();
  });
});

router.put("/api/hotdogs/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  hotdog.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/hotdogs/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  hotdog.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


router.get("/", function(req, res) {
    res.render("partials/login_form/login");
});

router.post("/login_check", function(req, res) {
  
  var pasword_login = req.body.pasword_login;

  if(pasword_login == 'myadmin'){
    req.session.login_status = 1;
    res.status(200).end(JSON.stringify('1'));
  }
  if(pasword_login != 'myadmin' && pasword_login != 'apple'){
    req.session.login_status = 0;
    res.status(200).end(JSON.stringify('0'));
  }
  if(pasword_login == 'apple'){
    req.session.login_status = 2;
    res.status(200).end(JSON.stringify('1'));
  }

});

router.get("/login_status", function(req, res) {
    res.write('<p>Login Status: ' + req.session.login_status + '</p>');
    res.status(200).end();
});


router.get("/login_session", function(req, res) {

      if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>im in controller data views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }

});

router.get("/login_out", function(req, res) {

     req.session.destroy(function(err) {
      res.render("partials/login_form/login");
    });

});




module.exports = router;