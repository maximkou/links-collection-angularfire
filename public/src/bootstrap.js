/**
 * Created by maximkou on 29.07.16.
 */
define([
    'require',
    'angular',
    'firebase'
], function (require, ng, firebase) {
    'use strict';

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD2yS7a1Je8P9uU6CFBqeNBoqcVE5kWZQ4",
        authDomain: "interest-links.firebaseapp.com",
        databaseURL: "https://interest-links.firebaseio.com",
        storageBucket: "interest-links.appspot.com"
    };
    firebase.initializeApp(config);

    require(
        [
            'domReady!',
            'app.module',
            'app.config',
            'angularfire',
            'ngRoute',
            'ngTagsInput'
        ],
        function (document, interestLinksApp) {
            ng.bootstrap(document, ['interestLinksApp']);
        }
    );
});
