/**
 * Created by maximkou on 09.08.16.
 */
define(['firebase'], function (firebase) {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD2yS7a1Je8P9uU6CFBqeNBoqcVE5kWZQ4",
        authDomain: "interest-links.firebaseapp.com",
        databaseURL: "https://interest-links.firebaseio.com",
        storageBucket: "interest-links.appspot.com"
    };
    firebase.initializeApp(config);
});