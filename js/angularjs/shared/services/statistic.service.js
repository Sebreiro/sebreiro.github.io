(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('statisticService', factory);

    factory.$inject = [
        "webApiService",
        "operatorService"
    ];

    function factory(
        webApiService,
        operatorService
    ) {

        var service = {
            isSaveStatistic:true,
            addExerciseStatistic: addExerciseStatistic,
        }

        var isSaveStatistic = true;

        //Data of single exercise
        function addExerciseStatistic(operator, firstNumber, secondNumber,userResult, isResultCorrect, responseTime) {
            if (isSaveStatistic === false) return;

            var operatorData = operatorService.getOperatorData(operator);
            if (!operatorData)
                return;

            var data = {
                operator: operatorData.name,
                firstNumber: Number(firstNumber),
                secondNumber: Number(secondNumber),
                userResult: Number(userResult) || null,
                isResultCorrect: isResultCorrect,
                responseTime: Number(responseTime)
            }

            sendExerciseStatistic(data);

        }

        //Private Methods

        function sendExerciseStatistic(data) {
            return webApiService.postData("Statistic", "AddExerciseStatistic", data);
        }

        return service;
        
    }
})();