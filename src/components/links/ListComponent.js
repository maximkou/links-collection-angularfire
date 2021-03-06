/**
 * Created by maximkou on 24.07.16.
 */

define(['../_module', 'firebase'], function (com, firebase) {
    var ref = firebase.database().ref().child('links');

    // links page
    function LinkListCtrl($scope, $firebaseArray, FilterState, Auth) {

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

        $scope.filterModel = { tags: [] };
        var lastFilterState = FilterState.getState();
        if (lastFilterState) {
            $scope.filterModel.tags = lastFilterState;
        }

        $scope.deleteLink = function (link) {
            $scope
                .links
                .$remove(link)
                .catch(function () {
                    alert('Error on removing link. Maybe, link is not exist?');
                });
        };

        $scope.selectTag = function (tagText) {
            var collection = $scope.filterModel.tags;

            for (var k in collection) {
                if (collection[k].text == tagText) {
                    return;
                }
            }

            collection.push({text: tagText});
        };

        $scope.filterLinks = function (link) {
            var fv = $scope.filterModel.tags;

            if (!fv || !fv.length) {
                return true;
            }

            for (var i = 0; i < fv.length; i++) {
                if (Array.isArray(link.tags) && link.tags.indexOf(fv[i].text) !== -1) {
                    return true;
                }
            }

            return false;
        };

        $scope.$watchCollection('filterModel.tags', function (newVal, oldVal) {
            FilterState.setState(newVal);
        });
    }

    return com.component('linkList', {
            templateUrl: 'src/components/links/list.template.html',
            controller: ['$scope', '$firebaseArray', 'FilterState', 'Auth', LinkListCtrl]
        });
});