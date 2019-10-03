var firebase = require("firebase");
var Config=require('./config.js');
require("firebase/firestore");
var firebaseApp=firebase.initializeApp(Config.firebase);
exports.fb=firebaseApp;
exports.fbs=firebaseApp.firestore();