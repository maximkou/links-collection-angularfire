/**
 * Created by maximkou on 29.07.16.
 */

define(['./app.module'], function (app) {
    app
        // auth service
        .service('Auth', ['$firebaseAuth', function ($firebaseAuth) {
            var auth = $firebaseAuth(firebase.auth()),
                data = null,
                onChangeStateCallback = null;

            auth.$onAuthStateChanged(function (udata) {
                data = udata;

                if (typeof onChangeStateCallback == 'function') {
                    onChangeStateCallback(udata);
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
                    onChangeStateCallback = callback;
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
        }]);
});