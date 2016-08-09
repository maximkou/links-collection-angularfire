/**
 * Created by maximkou on 03.08.16.
 */

define(['./_module', 'angular'], function (module, ng) {
    module.service(
        'Translator',
        [
            '$http',
            '$window',
            function ($http, $window) {
                var available = [],
                    defaultLang = null;

                function getCurrentLang(defaultLang) {
                    var lang = $window.navigator.language || $window.navigator.userLanguage;

                    if (!lang) {
                        return defaultLang;
                    }

                    return lang.split('-')[0];
                }

                return {
                    init: function ($translateProvider) {
                        $http
                            .get('src/translations.json')
                            .then(function (response) {

                                ng.forEach(response.data, function (messages, lang) {
                                    if (lang == 'default') {
                                        defaultLang = messages;
                                    } else {
                                        $translateProvider.translations(lang, messages);
                                    }
                                });

                                $translateProvider
                                    .preferredLanguage(defaultLang)
                                    .use(getCurrentLang(defaultLang));
                            });
                    },

                    getAvailableLanguages: function () {
                        return available;
                    },

                    getDefault: function () {
                        return defaultLang;
                    }
                };
            }
        ]
    );
});