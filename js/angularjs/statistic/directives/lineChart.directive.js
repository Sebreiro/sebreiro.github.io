//c3.js chart
(function () {
    'use strict';

    angular
        .module('app.statistic')
        .directive('lineChart', directive);

    function directive() {
        return {
            restriction: 'E',
            scope: {
                data:'='
            },
            link: function (scope, element, attrs) {
                var data = scope.data.data;
                var axis = scope.data.axis;
                var tooltip = scope.data.tooltip;
                var chart = c3.generate({
                    bindto: element[0],
                    data: data,
                    axis: axis,
                    tooltip: tooltip
                });
            }
        }

    }
})()