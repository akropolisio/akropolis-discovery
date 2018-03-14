/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, $filter, AkrWeb3Service) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

    var accounts = $scope.accounts;
    var totalSavings = Object.keys(accounts)
      .map(function (key) {
        return accounts[key].balance;
      })
      .reduce(function (previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
      });

    var aetBalance = AkrWeb3Service.aetBalance()
      .then(function(result) {
        $scope.charts = [{
          color: pieColor,
          description: 'Total savings',
          stats: $filter('gbp')(totalSavings),
          icon: 'person',
        }, {
          color: pieColor,
          description: 'Estimated pension',
          stats: '$ 2,200',
          icon: 'money',
        }, {
          color: pieColor,
          description: 'AET balance',
          stats: result + ' tokens',
          icon: 'money',
        }
        ];
      });



    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function (index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();