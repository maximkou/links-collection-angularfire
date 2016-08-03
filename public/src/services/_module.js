/**
 * Created by maximkou on 02.08.16.
 */
define(['angular'], function (ng) {
    var $sharedTranslateProvider = null;
    return ng
        .module('app.services', [])
        .config(['$translateProvider', function ($translateProvider) {
            $sharedTranslateProvider = $translateProvider;
        }])
        .run(['Translator', function (Translator) {
            Translator.init($sharedTranslateProvider);
        }]);
});