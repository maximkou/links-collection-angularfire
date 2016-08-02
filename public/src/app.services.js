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
        })
        .filter('pageTitle', ['$http', function ($http) {
            function getYqlUrl(url) {
                return "https://query.yahooapis.com/v1/public/yql?q=select+*+from+html+where+url='" + url + "'+and+xpath='//title'&format=json&env=store://datatables.org/alltableswithkeys";
            }

            return function (url) {
                return $http
                    .get(getYqlUrl(url), {
                        cache: true
                    });
            }
        }])
        .directive('waitLoader', function () {
            return {
                restrict: 'E',
                template: '<img ng-src="img/loader.gif"/>'
            };
        });
});