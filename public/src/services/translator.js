/**
 * Created by maximkou on 03.08.16.
 */

define(['./_module', 'angular'], function (module, ng) {
    module.service(
        'Translator',
        [
            'LANGUAGES',
            'DEFAULT_LANG',
            '$http',
            '$translate',
            function (LANGUAGES, DEFAULT_LANG, $http, $translate) {
                return {
                    init: function ($translateProvider) {
                        ng.forEach(LANGUAGES, function (value) {
                            $http
                                .get('src/languages/' + value + '.json')
                                .then(function (response) {
                                    $translateProvider.translations(value, response.data);

                                    if (value == DEFAULT_LANG) {
                                        $translateProvider
                                            .preferredLanguage(DEFAULT_LANG)
                                            .use(DEFAULT_LANG);
                                    }
                                });
                        });
                    },

                    getAvailableLanguages: function () {
                        return LANGUAGES;
                    },

                    getDefault: function () {
                        return defaultLang;
                    }
                };
            }
        ]
    );
});