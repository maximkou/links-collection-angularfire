/**
 * Created by maximkou on 02.08.16.
 */
define(['./_module'], function (module) {
    module
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
                        .catch(function (error) {
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
        }]);
});