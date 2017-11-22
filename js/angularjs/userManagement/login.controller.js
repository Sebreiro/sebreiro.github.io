(function () {

    'use strict';
    angular
        .module('app.userManagement')
        .controller('loginController', controller);

    controller.$inject = [
        '$scope',
        "webApiService",
        "sessionService",
        "$state"
    ];

    function controller(
        $scope,
        webApiService,
        sessionService,
        $state
    ) {

        $scope.user = {
            username:"",
            password:""
        };

        $scope.login = login;
        $scope.stayAsAGuest = stayAsAGuest;
        //////////

        function login() {
            var data = {
                username: $scope.user.username,
                password: $scope.user.password
            }
            webApiService.postData("Account", "Login", data)
                .then(function (result) {
                    //TODO Show signIn errors
                    if (result.data.success === true) {
                        sessionService.setCurrentUser(result.data.username, true);
                        goToSettings();
                    }
                });
        }

        //Private methods

        function stayAsAGuest() {
            goToSettings();
        }

        function goToSettings() {
            $state.go('root.mathtraining.settings');
        }
       
    }
})();