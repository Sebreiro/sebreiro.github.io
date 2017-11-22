(function () {
    'use strict';

    angular
        .module('app.mathtraining')
        .config(configure);

    configure.$inject = [
        '$stateProvider'
    ];

    function configure(
        $stateProvider
    ) {

        $stateProvider
            .state('root.mathtraining',
                {
                    abstract: true,
                    url: '/mathtraining'
                })
            .state('root.mathtraining.settings',
                {
                    url: '/settings',
                    views: {
                        'content@root': {
                            templateUrl: '/js/angularjs/mathTraining/settings/mt.settings.html',
                            controller: 'mathTrainingSettingsController'
                        }
                    }
                })
            .state('root.mathtraining.training',
                {
                    url: '/training',
                    views: {
                        'content@root': {
                            templateUrl: '/js/angularjs/mathTraining/training/mt.training.html',
                            controller: 'mathTrainingTrainingController'
                        }
                    },
                    params: {
                        settings: {}
                    }
                })
            .state('root.mathtraining.defaultAdditionTwoSigns',
                {
                    url: '/additionTwoSigns',
                    views: {
                        'content@root': {
                            templateUrl: '/js/angularjs/mathTraining/training/mt.training.html',
                            controller: 'mathTrainingTrainingController'
                        }
                    },
                    params: {
                        settings: {}
                    }
                });

    }

})();