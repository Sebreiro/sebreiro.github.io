(function() {
    'use strict';

    angular
        .module("app.shared")
        .factory("webApiService", factory);

    factory.$inject = [
        "$http",
        "$q",
        "config"
    ];

    function factory(
        $http,
        $q,
        config
    ) {

        var service = {
            postData: postData,
            getData: getData,
        }

        var isEnableBackend = config.ENABLE_BACKEND || false;

        ////////

        function postData(controller, action, data) {
            if (!isEnableBackend) return $q.when();

           var loadingPromise = $http.post(`/api/${controller}/${action}`, data);
           return loadingPromise;
        }

        

        function getData(controller, action) {
            if (!isEnableBackend) return $q.when();

            var loadingPromise = $http.get(`/api/${controller}/${action}`);
            return loadingPromise;
        }

        return service;
    }
})();