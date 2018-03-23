(function () {
  'use strict';

  var ONE_TOKEN = (new BigNumber(10)).pow(18);

  angular.module('akr-commons', [])
    .filter('metafilter', ['$filter', function ($filter) {
      return function (input, filterName) {
        return $filter(filterName)(input);
      };
    }])
    .filter('percent', [function () {
      return function (input) {
        return input + '%';
      };
    }])
    .filter('gbp', ['$filter', function ($filter) {
      return function (input) {
        return $filter('currency')(input, '£', 0);
      };
    }])
		.filter('aet', ['$filter', function ($filter) {
			return function (input) {
				return (new web3.BigNumber(input)).div(ONE_TOKEN).valueOf();
			};
		}])
    .filter('gbp_2', ['$filter', function ($filter) {
      return function (input) {
        return $filter('currency')(input, '£', 2);
      };
    }])
    .filter('age', ['$filter', function ($filter) {
      return function (input) {
        return input + ' years';
      };
    }]);

})();