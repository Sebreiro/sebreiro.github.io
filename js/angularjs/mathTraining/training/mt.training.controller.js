(function() {
    'use strict';

    angular
        .module('app.mathtraining')
        .controller('mathTrainingTrainingController', controller);

    controller.$inject = [
        '$scope',
        '$document',
        '$state',
        '$stateParams',
        "operatorService",
        "statisticService"
    ];

    function controller(
        $scope,
        $document,
        $state,
        $stateParams,
        operatorService,
        statisticService
    ) {

        var settings = $stateParams.settings;
       
        var operatorData = operatorService.getOperatorData(settings.operator);

        var trainingState= {
            isAnswerWrong: false,
            isAnswerChecked: false
        }

        var exercise= {
            firstNumber: 0,
            secondNumber: 0,
            expression: '',
            userResult: 0,
            correctResult: 0,
            responseTime: 0,
        }

        //.....scope variables

        $scope.trainingName = getTrainingName(operatorData);
        $scope.trainingState = trainingState;
        $scope.exercise = exercise;

        //.....scope Methods
        
        $scope.nextStep = nextStep;
        $scope.goBackToSettings = goBackToSettings;

        $scope.focusDirectiveOptions = {
            //setFocus: function() {}// directive will assign function here
        }
        
        ////////////////////
        var timer = Date(0);
        function nextExercise() {
            resetState(trainingState);
            renewExercise(exercise, settings);

            setFocusOnExpressionInput();
            
            timer = Date.now();
        }
        
        function checkResult() {
            
            var responseTime = Date.now() - timer;

            trainingState.isAnswerWrong = exercise.userResult != exercise.correctResult;

            trainingState.isAnswerChecked = true;


            addStatistic(
                settings.operator,
                exercise.firstNumber,
                exercise.secondNumber,
                exercise.userResult,
                !trainingState.isAnswerWrong,
                responseTime
            );
        }

        function nextStep() {
            trainingState.isAnswerChecked === false
                ? checkResult()
                : nextExercise();
        }

        function goBackToSettings() {
            $state.go('root.mathtraining.settings');
        }

        //...........Local Methods

        function renewExercise(exercise,settings) {
            exercise.firstNumber = getRandomValueBasedOnSigns(settings.numberOfSigns);
            exercise.secondNumber = getRandomValueBasedOnSigns(settings.numberOfSigns);
            exercise.expression = getExpressionString(exercise.firstNumber, exercise.secondNumber, settings.operator);
            exercise.userResult = '';
            exercise.correctResult = getCorrectResult(exercise.firstNumber, exercise.secondNumber, operatorData);
        }

        function getRandomValueBasedOnSigns(numberOfSigns) {
            return getRandomValue(getMinValue(numberOfSigns), getMaxValue(numberOfSigns));
        }

        function getMaxValue(numberOfSigns) {
            return Math.pow(10, numberOfSigns) - 1;
        }

        function getMinValue(numberOfSigns) {
            return Math.pow(10, numberOfSigns - 1);
        }

        function getRandomValue(min, max) {
            return Math.floor(Math.random() * (max + 1 - min)) + min;
        }

        function getExpressionString(firstNumber, secondNumber, operator) {
            var str = `${firstNumber} ${operator} ${secondNumber}`;
            return str;
        }

        function getCorrectResult(firstNumber, secondNumber, operatorData) {
            return operatorData && operatorData.func(firstNumber, secondNumber) || "Error";
        }

        function setFocusOnExpressionInput() {
            if (isFunction($scope.focusDirectiveOptions.setFocus))
                $scope.focusDirectiveOptions.setFocus();
        }

        
        function getTrainingName(operatorData) {
            return operatorData && operatorData.name || "ERROR";
        }

        //..........Statistic

        function addStatistic(operator, firstNumber, secondNumber, userResult, isResultCorrect, responseTime) {
            statisticService.addExerciseStatistic(
                operator,
                firstNumber,
                secondNumber,
                userResult,
                isResultCorrect,
                responseTime
            );
        }

        //...........Helpers

        function resetState(state) {
            state.isAnswerWrong = false;
            state.isAnswerChecked = false;
        }

        function isFunction(func) {
            return !!(func && func.constructor && func.call && func.apply);
        };

        ///////////
        function refresh() {
            nextExercise();
        }

        refresh();

    }

})();