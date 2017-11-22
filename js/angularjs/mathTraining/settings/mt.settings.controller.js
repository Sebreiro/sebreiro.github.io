(function() {
    'use strict';

    angular
        .module('app.mathtraining')
        .controller('mathTrainingSettingsController',controller);

    controller.$inject = [
        '$scope',
        '$document',
        '$state'
    ];

    function controller(
        $scope,
        $document,
        $state
    ) {
        var operators = ['+', '-', '*', '/'];

        var settings = {
            numberOfSigns: 2,
            operator: operators[0],
        }

        //.....scope variables

        $scope.settings = settings;
        $scope.operators = operators;

        //.....scope Methods

        $scope.startTraining = startTraining;

        /////////////////////

        //..........Public Methods
        function startTraining() {
            var params = {
                settings: settings
            };
            $state.go('root.mathtraining.training',params);
        }

    }

})();