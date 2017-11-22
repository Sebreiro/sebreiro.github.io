(function() {
    'use strict';

    angular.module('app')
        .constant('config', getConstant());

    function getConstant() {

        var constant = {}

        if (window && window.__environment) {
            var env = window.__environment;

            constant.ENABLE_BACKEND = env.enableBackend || false;
        }

        return constant;
    }
})();