/**
 * Created by maximkou on 24.07.16.
 */

define(
    [
        'angular',
        'firebase',
        './links/links.module',
        './links/links.components',
        './users/users.module',
        './users/users.controllers'
    ],
    function (ng) {
        return ng.module('interestLinksApp', [
            'firebase',
            'ngRoute',
            'ngTagsInput',
            'links',
            'users'
        ]);
    }
);