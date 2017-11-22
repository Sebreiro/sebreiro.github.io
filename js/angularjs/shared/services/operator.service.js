(function() {
    'use strict';

    angular
        .module("app.shared")
        .factory("operatorService", factory);

    factory.$inject = [
    ];

    function factory() {

        var service= {
            getOperatorData:getOperatorData
        }

        var operators = {
            '+': {
                func: operatorAddition,
                name: 'Addition'
            },
            '-': {
                func: operatorSubtraction,
                name: 'Subtraction'
            },
            '*': {
                func: operatorMultiplication,
                name: 'Multiplication'
            },
            '/': {
                func: operatorDivision,
                name: 'Division'
            }
        }


        function getOperatorData(operator) {
            var data = operators[operator];

            if (!data)
                return null;

            return { func: data.func, name: data.name };
        }

        //...........

        function operatorAddition(firstNumber, secondNumber) {
            return firstNumber + secondNumber;
        }

        function operatorSubtraction(firstNumber, secondNumber) {
            return firstNumber - secondNumber;
        }

        function operatorMultiplication(firstNumber, secondNumber) {
            return firstNumber * secondNumber;
        }

        function operatorDivision(firstNumber, secondNumber) {
            return firstNumber / secondNumber;
        }

        return service;
    }
})();