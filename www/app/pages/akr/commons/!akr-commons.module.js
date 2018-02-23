(function () {
  'use strict';

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
    .filter('age', ['$filter', function ($filter) {
      return function (input) {
        return input + ' years';
      };
    }])
  ;

})();