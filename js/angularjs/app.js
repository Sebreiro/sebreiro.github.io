var app = angular.module('app',
    [
        'ui.router',
        'ui.select',
        'app.shared',

        'app.mathtraining',
        'app.userManagement',
        "app.statistic"
    ]);


app.config([
    '$stateProvider', function($stateProvider) {
        $stateProvider
            .state('root',
                {
                    abstract: true,
                    templateUrl: '/js/angularjs/master.html',
                    controller: 'masterController'
                })
            .state('root.login',
                {
                    url: '/login',
                    views: {
                        'content@root': {
                            templateUrl: '/js/angularjs/userManagement/login.html',
                            controller: 'loginController'
                        }
                    }
                })
            .state("root.statistic",
                {
                    url: "/statistic",
                    views: {
                        "content@root": {
                            templateUrl: "/js/angularjs/statistic/statistic.html",
                            controller: "statisticController"
                        }
                    }
                });
    }
]);

app.run(['$state',function($state) {
    $state.go('root.mathtraining.settings');
}]);

//Modules
function addModules() {
    angular.module("app.shared", []);
    angular.module("app.statistic", []);
    angular.module('app.mathtraining', []);
    angular.module('app.userManagement', []);
    

}


addModules();