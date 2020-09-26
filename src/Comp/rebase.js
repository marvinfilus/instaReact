var Rebase = require('re-base');
var firebase = require('firebase');
// require('firebase/auth');
var app = firebase.initializeApp({
    apiKey: "AIzaSyBGRgmk3-VKiKd8mpGg8I3zy-1K4sP5hHI",
    authDomain: "instare-79a71.firebaseapp.com",
    databaseURL: "https://instare-79a71.firebaseio.com",
    projectId: "instare-79a71",
    storageBucket: "instare-79a71.appspot.com",
    messagingSenderId: "359743168767",
    appId: "1:359743168767:web:dcbf4c2d72e4f9faa02cca",
    measurementId: "G-PE28ZJPE81"
  });

var base = Rebase.createClass(app.database());

// var firebaseConfig = {
//     apiKey: "AIzaSyBGRgmk3-VKiKd8mpGg8I3zy-1K4sP5hHI",
//     authDomain: "instare-79a71.firebaseapp.com",
//     databaseURL: "https://instare-79a71.firebaseio.com",
//     storageBucket: "instare-79a71.appspot.com"
//   };
//   firebase.initializeApp(firebaseConfig);

  // Get a reference to the storage service, which is used to create references in your storage bucket

  export{ base , app };
