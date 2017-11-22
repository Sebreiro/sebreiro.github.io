(function() {
    'use strict';

    angular
        .module('app')
        .controller('masterController', controller);

    controller.$inject = [
        '$scope',
        '$state',
        "sessionService",
        "config"
    ];

    function controller(
        $scope,
        $state,
        sessionService,
        config
    ) {

        $scope.isShowSignIn = config.ENABLE_BACKEND;

        $scope.user = sessionService.user;

        $scope.signIn = signIn;
        $scope.signOut = signOut;
        $scope.stayAsAGuest = stayAsAGuest;
        $scope.goToSettings = goToSettings;
        $scope.showStatistic = showStatistic;

        ///////////////////

        function signIn() {
            $state.go('root.login');
        }

        function signOut() {
            sessionService.signOut();
        }

        function stayAsAGuest() {
            goToSettings();
        }

        function goToSettings() {
            $state.go('root.mathtraining.settings');
        }

        function showStatistic() {
            $state.go("root.statistic");
        }
        
    }

})();