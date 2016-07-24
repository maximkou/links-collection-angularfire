/**
 * Created by maximkou on 24.07.16.
 */
angular
    .module('interestLinksApp')
    .config(['$locationProvider', '$routeProvider', function ($location, $router) {
        $location.hashPrefix('!');

        $router
            .when('/links', {
                template: '<link-list></link-list>'
            })
            .when('/links/add', {
                template: '<link-add></link-add>'
            })
            .otherwise('/links');
    }]);