(function() {
    'use strict';

    angular
        .module('app')
        .directive('setFocus', directive);

    directive.$inject = [

    ];

    function directive() {
        return {
            restrict: 'A',
            scope: {
                setFocus: "="
            },
            link: function (scope, element, attrs) {
                var currentElement = element[0];
                currentElement.focus();

                scope.setFocus.setFocus = setFocus;

                function setFocus() {
                    currentElement.focus();
                }
            }
        }
    }

})();

