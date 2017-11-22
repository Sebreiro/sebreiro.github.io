(function() {
    'use strict';

    angular
        .module('app')
        .directive('onEnterKeyDown', directive);

    directive.$inject = [
        '$document'
    ];

    function directive(
        $document
    ) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                $document.bind("keydown", onKeyDown);

                function onKeyDown(event) {
                    if (event.keyCode === 13) {
                        scope.$apply(() => {
                            scope.$eval(attrs.onEnterKeyDown, { 'event': event });
                        });
                        event.preventDefault();
                    }

                }
            }
        }
    }
})();