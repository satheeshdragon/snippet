// Import the ORM to create functions that will interact with the database.
// var orm = require("../config/orm.js");
// require("../config/connection.js");

var firebase = require("firebase-admin");

var serviceAccount = require("../config/my-firebase-node.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://my-firebase-node-nov.firebaseio.com"
});

var db = firebase.firestore();


var snippet = {
  all: function(cb) {
    // orm.all("hotdogs", function(res) {
    //   cb(res);
    // });


   let user_data = [];
   // let user_id= [];
  
   let citiesRef = db.collection('snippet');
   let allCities = citiesRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      // temp_data
      var my_data =  doc.data();
      var datas = {
        "Master_id" : doc.id,
        "Snippet_name" : my_data.Snippet_name,
        "Snippet_description" : my_data.Snippet_description,
        "User_id" : my_data.User_id,
      };

      user_data.push(datas);  // Id With_Data

    });
    cb(user_data);   
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  },
  // The variables cols and vals are arrays.
  create: function(req,count) {
    // console.log(count);

  var Snippet_name = req.body.Snippet_name;
  var Snippet_description  = req.body.Snippet_description;
  // var Born       = req.body.Born;

     let data = {
        User_id: count,
        Snippet_name: Snippet_name,
        Snippet_description: Snippet_description,
      };

  let setDoc = db.collection('snippet').doc().set(data);


  },
  update: function(objColVals, condition, cb) {
    orm.update("hotdogs", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("hotdogs", condition, function(res) {
      cb(res);
    });
  },
  increment_id: function(cb) {
    let increment_id = db.collection('snippet').get().then(function(querySnapshot) {      
      cb(querySnapshot.size);
    });
  },
  delete_user_data: function(req) {
    var Master_id = req.body.Master_id;
    console.log(Master_id);

    db.collection("snippet").doc(Master_id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

  },
  edit_user_data: function(req,cb) {
    var Master_id = req.body.Master_id;
    // console.log(Master_id);

    let cityRef = db.collection('snippet').doc(Master_id);
    let getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          // console.log('Document data:', doc.data());
          cb(doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    
  },
  update_user_data: function(req,cb) {
    var Master_id = req.body.Master_id;
    // console.log(Master_id);

      var Snippet_name_update = req.body.Snippet_name_update;
      var Snippet_description_update  = req.body.Snippet_description_update;
      // var Born       = req.body.Born;

         let data = {
            User_id: Master_id,
            Snippet_name: Snippet_name_update,
            Snippet_description: Snippet_description_update,
          };
      // console.log(data);
    let setDoc = db.collection('snippet').doc(Master_id.toString()).set(data);
      cb();
    
  },

};

// Export the database functions for the controller (hotdogsController.js).
module.exports = snippet;
