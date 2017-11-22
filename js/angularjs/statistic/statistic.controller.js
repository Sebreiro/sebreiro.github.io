(function () {
    'use strict';
    
    angular
        .module('app.statistic')
        .controller('statisticController', controller);

    controller.$inject = [
        '$scope',
        'webApiService',
        '$q'
    ];

    function controller(
        $scope,
        webApiService,
        $q
    ) {

        $scope.isDataLoaded = false;

        $scope.chartResponseTimetData = {};
        $scope.chartPercentageData = {};

        //////////

        function getResponseTimeStatistic() {
            return webApiService.getData("Statistic", "GetResponseTimetStatistic")
                .then((response) => {
                    if (response && response.data && response.data.success === true)
                        prepareResponseTimeTemplate(response.data.data);
                });
        }
        
        function getAnswersPercentage() {
            return webApiService.getData("Statistic", "GetAnswersPercentage")
                .then((response) => {
                    if (response && response.data && response.data.success === true)
                        preparePercentagetemplate(response.data.data);
                });
        }
        

        function prepareResponseTimeTemplate(serverData) {
            $scope.chartResponseTimetData = getChartTemplate();

            var chart = {
                x: ['x'],
                data1: ['Average response time'],
                data2: ['Median response time']
            };
            chart.x.push.apply(chart.x, _.map(serverData, (x) => { return new Date(x.date); }));
            chart.data1.push.apply(chart.data1,
                _.map(serverData,
                    (x) => { return Number((x.averageResponseTime / 1000).toFixed(3)) }));
            chart.data2.push.apply(chart.data2,
                _.map(serverData,
                    (x) => { return Number((x.medianResponseTime / 1000).toFixed(3)) }));

            $scope.chartResponseTimetData.data.columns.push(chart.x);
            $scope.chartResponseTimetData.data.columns.push(chart.data1);
            $scope.chartResponseTimetData.data.columns.push(chart.data2);

            $scope.chartResponseTimetData.axis.y.label.text = "Time, s";
        }

        function preparePercentagetemplate(serverData) {
            $scope.chartPercentageData = getChartTemplate();

            var chart= {
                x: ['x'],
                data1: ['Correct answers'],
                data2: ['Incorrect answers']
            }

            chart.x.push.apply(chart.x, _.map(serverData, (x) => { return new Date(x.date); }));
            chart.data1.push.apply(chart.data1, _.map(serverData, 'correctPercent'));
            chart.data2.push.apply(chart.data2, _.map(serverData, 'incorrectPercent'));

            $scope.chartPercentageData.data.columns.push(chart.x);
            $scope.chartPercentageData.data.columns.push(chart.data1);
            $scope.chartPercentageData.data.columns.push(chart.data2);

            $scope.chartPercentageData.axis.y.label.text = "Percentage, %";
        }

        function getChartTemplate() {
            var data = {
                data: {
                    x: 'x',
                    columns: []
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m-%d'
                        },
                        label: {
                            text: 'Date'
                        }
                    },
                    y: {
                        label: {
                            position: 'outer-middle'
                        }
                    }
                },
                tooltip: {
                    //position: function (data, width, height, element) {
                    //    var top = d3.mouse(element)[1];
                    //    var left = d3.mouse(element)[0];
                    //    return {
                    //        top: top,
                    //        left: left
                    //    }
                    //}
                }
            };
            return data;
        }

        //////////

        function refresh() {
            $q.all({
                    rts: getResponseTimeStatistic(),
                    ap: getAnswersPercentage()
                })
                .then(() => {
                    $scope.isDataLoaded = true;

                });
        }

        refresh();
    }
})();