/**
 * Created by maximkou on 24.07.16.
 */

define(
    [
        'angular',
        'firebase',
        'components/_loader',
        'directives/_loader',
        'filters/_loader',
        'services/_loader'
    ],
    function (ng) {
        return ng.module('interestLinksApp', [
            'firebase',
            'ngRoute',
            'ngTagsInput',
            'app.components',
            'app.directives',
            'app.filters',
            'app.services'
        ]);
    }
);