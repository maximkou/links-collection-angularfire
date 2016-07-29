/**
 * Created by maximkou on 24.07.16.
 */

define(['./links.module', 'firebase'], function (links, firebase) {
    var ref = firebase.database().ref().child('links');

    // links page
    function LinkListCtrl($scope, $firebaseArray, Auth) {

        $scope.links = $firebaseArray(ref);
        $scope.curUser = null;
        Auth.wait(function (data) {
            $scope.curUser = data;
        });

        $scope.filterModel = {};
        $scope.deleteLink = function (linkID) {
            var object = $firebaseArray(ref.child(linkID));

            object
                .$remove()
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

    // add new link page
    function LinkAddCtrl($scope, $firebaseArray, Auth) {
        $scope.link = {};
        $scope.isAdded = false;

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
        }
    }

    return links
        .component('linkList', {
            templateUrl: 'src/links/list.template.html',
            controller: ['$scope', '$firebaseArray', 'Auth', LinkListCtrl]
        })
        .component('linkAdd', {
            templateUrl: 'src/links/add.template.html',
            controller: ['$scope', '$firebaseArray', 'Auth', LinkAddCtrl]
        });
});