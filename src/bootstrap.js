/**
 * Created by maximkou on 29.07.16.
 */
define([
    './db.init',
    'angular',
    'domReady!',
    'app.module',
    'app.config',
    'angularfire',
    'ngRoute',
    'ngTagsInput'
], function (db, ng, document) {
    'use strict';
    
    ng.bootstrap(document, ['interestLinksApp']);
});
