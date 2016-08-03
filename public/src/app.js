/**
 * Created by maximkou on 29.07.16.
 */
requirejs.config({

    paths: {
        'firebase': '../bower_components/firebase/firebase',
        'domReady': '../bower_components/requirejs-domready/domReady',
        'angular': '../bower_components/angular/angular',
        'ngRoute': '../bower_components/angular-route/angular-route',
        'angularfire': '../bower_components/angularfire/dist/angularfire',
        'translate': '../bower_components/angular-translate/angular-translate',
        'ngTagsInput': '../bower_components/ng-tags-input/ng-tags-input'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'firebase': {
            exports: 'firebase'
        }
    },

    deps: ['./bootstrap']
});