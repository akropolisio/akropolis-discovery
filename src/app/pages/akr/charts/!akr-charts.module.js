(function () {
  'use strict';

  angular.module('akr-charts', [])
    .config(function (baConfigProvider) {
      var layoutColors = baConfigProvider.colors;
      Morris.Donut.prototype.defaults.backgroundColor = 'transparent';
      Morris.Donut.prototype.defaults.labelColor = layoutColors.defaultText;
      Morris.Grid.prototype.gridDefaults.gridLineColor = layoutColors.borderDark;
      Morris.Grid.prototype.gridDefaults.gridTextColor = layoutColors.defaultText;
    });
})();