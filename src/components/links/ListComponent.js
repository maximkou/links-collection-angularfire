/**
 * Created by maximkou on 24.07.16.
 */

define(['../_module', 'firebase'], function (com, firebase) {
    var ref = firebase.database().ref().child('links');

    // links page
    function LinkListCtrl($scope, $firebaseArray, Auth) {

        $scope.links = $firebaseArray(ref);
        $scope.linksLoaded = false;
        $scope
            .links
            .$loaded()
            .then(function () {
                $scope.linksLoaded = true;
            });

        $scope.curUser = Auth.user();
        Auth.wait(function (data) {
            $scope.curUser = data;
        });

        $scope.filterModel = {};
        $scope.deleteLink = function (link) {
            $scope
                .links
                .$remove(link)
                .catch(function () {
                    alert('Error on removing link. Maybe, link is not exist?');
                });
        };

        $scope.filterLinks = function (link) {
            var fv = $scope.filterModel.tags;

            if (!fv || !fv.length) {
                return true;
            }

            for (var i = 0; i < fv.length; i++) {
                if (link.tags.indexOf(fv[i].text) !== -1) {
                    return true;
                }
            }

            return false;
        };
    }

    return com.component('linkList', {
            templateUrl: 'src/components/links/list.template.html',
            controller: ['$scope', '$firebaseArray', 'Auth', LinkListCtrl]
        });
});