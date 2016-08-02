/**
 * Created by maximkou on 29.07.16.
 */

define(['./users.module'], function (users) {

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

    return users
        .controller('AuthCtrl', ['$scope', 'Auth', AuthCtrl]);
});