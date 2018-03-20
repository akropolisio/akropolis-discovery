/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, $q, baConfig, baUtil, $filter, AkrWeb3Service, AkrUserService, AkrSavingAccountsService) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);


		var totalSavings = 0;
		var estimatedPension = 0;
		var estimatedPensionPercentage = 0;

		$q.all([AkrSavingAccountsService.accounts(), AkrWeb3Service.savingGoal(), AkrUserService.age(), AkrWeb3Service.aetBalance()])
			.then(function (result) {

			var accounts = result[0];
			var savingGoal = result[1];
			var age = result[2];
			var balance = result[3];

			if (accounts) {
				totalSavings = Object.keys(accounts)
					.map(function (key) {
						return accounts[key].balance;
					})
					.reduce(function (previousValue, currentValue) {
						return previousValue + currentValue;
					});
			}

      estimatedPension = AkrUserService.calculatePensionBenefit(age, savingGoal.age, 71, totalSavings, 0.05)
			estimatedPensionPercentage = estimatedPension / savingGoal.monthlyIncome * 100;

				$scope.charts = [{
					color: pieColor,
					description: 'Total savings',
					stats: $filter('gbp')(totalSavings),
					icon: 'person',
					percentage: 0,
				}, {
					color: pieColor,
					description: 'Estimated pension',
					stats: $filter('gbp')(estimatedPension),
					icon: 'money',
					percentage: estimatedPensionPercentage,
				}, {
					color: pieColor,
					description: 'AET balance',
					stats: $filter('aet')(balance) + ' tokens',
					icon: 'money',
					percentage: $filter('aet')(balance)
				}
				];

				$timeout(function () {
					loadPieCharts();
					updatePieCharts();
				}, 1000);

		});


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
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function (index, chart) {
        $(chart).data('easyPieChart').update($scope.charts[index].percentage);
      });
    }


  }
})();