/**
 * Created by maximkou on 24.07.16.
 */

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var links = angular.module('interestLinksApp', [
    'firebase',
    'ngRoute',
    'links',
    'ngTagsInput'
]);