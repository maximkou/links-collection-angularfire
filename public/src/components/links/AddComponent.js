/**
 * Created by maximkou on 24.07.16.
 */

define(['../_module', 'firebase'], function (com, firebase) {
    var ref = firebase.database().ref().child('links');

    // add new link page
    function LinkAddCtrl($scope, $firebaseArray, Auth, pageTitleFilter) {
        var lastFetchedDescription = null;

        $scope.link = {};
        $scope.isAdded = false;
        $scope.isLoadDescription = false;

        $scope.addLink = function () {
            if (!$scope.addLinkForm.$valid) {
                return false;
            }

            var newLink = angular.copy($scope.link),
                tags = [];

            for (var k in newLink.tags) {
                if (!newLink.tags.hasOwnProperty(k)) {
                    continue;
                }

                tags.push(newLink.tags[k].text);
            }
            newLink.tags = tags;
            newLink.createdAt = firebase.database.ServerValue.TIMESTAMP;
            newLink.uid = Auth.user().uid;

            $firebaseArray(ref)
                .$add(newLink)
                .then(
                    function () {
                        $scope.link = {};
                        $scope.isAdded = true;
                    },
                    function (error) {
                        $scope.addingError = 'Cannot add record: ' + error;
                    }
                );
        };

        $scope.fetchTitle = function (url) {
            if ($scope.link.description && $scope.link.description != lastFetchedDescription) {
                return false;
            }

            $scope.isLoadDescription = true;
            pageTitleFilter(url).then(function (response) {
                $scope.isLoadDescription = false;
                if (response.data.query.count > 0) {
                    $scope.link.description = lastFetchedDescription = response.data.query.results.title;
                }
            });
        };
    }

    return com.component('linkAdd', {
            templateUrl: 'src/components/links/add.template.html',
            controller: ['$scope', '$firebaseArray', 'Auth', 'urlPageTitleFilter', LinkAddCtrl]
        });
});