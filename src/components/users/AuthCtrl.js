/**
 * Created by maximkou on 29.07.16.
 */

define(['../_module'], function (com) {

    function AuthCtrl($scope, Auth) {

        $scope.login = function () {
            Auth.login();
        };

        $scope.logout = function () {
            Auth.logout();
        };

        $scope.auth = null;
        Auth.wait(function (data) {
            $scope.auth = data;
        });
    }

    return com
        .controller('AuthCtrl', ['$scope', 'Auth', AuthCtrl]);
});