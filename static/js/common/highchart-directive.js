myApp.directive('highchart', function () {
        var seriesId = 0;
        var ensureIds = function (series) {
        }
        var getMergedOptions = function (element, options, series) {
            var defaultOptions = {
                chart: {
                    renderTo: element[0]
                },
                title: {},
                series: []
            }
            var mergedOptions = {}
            if (options) {
                mergedOptions = $.extend(true, {}, defaultOptions, options);
            } else {
                mergedOptions = defaultOptions;
            }
            if(series) {
              mergedOptions.series = series
            }
            return mergedOptions
        }
        return {
            restrict: 'EC',
            replace: false,
            scope: {
                series: '=',
                options: '=',
                title: '='
            },
            link: function (scope, element, attrs) {

                var mergedOptions = getMergedOptions(element, scope.options, scope.series);
                var chart = new Highcharts.Chart(mergedOptions);

                scope.$watch("series", function (newSeries, oldSeries) {
                    //do nothing when called on registration
                    if (newSeries === oldSeries) return;
                    if (newSeries) {
                        ensureIds(newSeries);
                        var ids = []
                        chart.redraw();
                    }


                }, true);
                scope.$watch("title", function (newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);
                scope.$watch("options", function (newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions) return;
                    chart.destroy()
                    var mergedOptions = getMergedOptions(element, newOptions);
                    chart = new Highcharts.Chart(mergedOptions);
                    chart.setTitle(scope.title, true);
                    ensureIds(scope.series);
                    // scope.series.forEach(function (s) {
                    //     chart.addSeries(angular.copy(s), false)
                    // });
                    chart.redraw()

                }, true);
            }
        }
    }); 
