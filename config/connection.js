// var mysql = require("mysql");

// var connection;
// if(process.env.JAWSDB_URL) {
//   //Heroku deployment
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   //local host
//     connection = mysql.createConnection({
//         root: 3000,
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "hotdogs_db",
//     });
// };


var firebase = require("firebase-admin");

var serviceAccount = require("../config/my-firebase-node.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://my-firebase-node-nov.firebaseio.com"
});

var db = firebase.database();

module.exports = db;



