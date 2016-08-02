/**
 * Created by maximkou on 29.07.16.
 */

define(['./app.module'], function (app) {
    app
        // auth service
        .service('Auth', ['$firebaseAuth', function ($firebaseAuth) {
            var auth = $firebaseAuth(firebase.auth()),
                data = null,
                onChangeStateCallbacks = [];

            auth.$onAuthStateChanged(function (udata) {
                data = udata;

                for (var i = 0; i < onChangeStateCallbacks.length; i++) {
                    if (typeof onChangeStateCallbacks[i] == 'function') {
                        onChangeStateCallbacks[i](udata);
                    }
                }
            });

            return {
                login: function () {
                    auth
                        .$signInWithPopup('google')
                        .catch(function(error) {
                            console.error("Authentication failed:", error);
                        });
                },

                wait: function (callback) {
                    onChangeStateCallbacks.push(callback);
                },

                user: function () {
                    return data;
                },

                logout: function () {
                    auth.$signOut();
                },

                object: function () {
                    return auth;
                }
            };
        }])
        .filter('favicon', function () {
            return function (url) {
                return 'https://www.google.com/s2/favicons?domain=' + url;
            }
        });
});