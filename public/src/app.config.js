/**
 * Created by maximkou on 24.07.16.
 */

define(['app.module'], function (app) {
    app
        .config(['$locationProvider', '$routeProvider', function ($location, $router) {
            $location.hashPrefix('!');

            $router
                .when('/links', {
                    template: '<link-list></link-list>'
                })
                .when('/links/add', {
                    template: '<link-add></link-add>',
                    resolve: {
                        'currentAuth': ['Auth', function(Auth) {
                            return Auth.object().$requireSignIn();
                        }]
                    }
                })
                .otherwise('/links');
        }]);
});