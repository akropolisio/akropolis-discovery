(function () {
  'use strict';

  angular.module('akr-charts')
    .component('akrSavingsChart', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/charts/akr-savings-chart.component.html'
    });


  /** @ngInject */
  function ComponentController($location, $q, AkrWeb3Service, AkrUserService, baConfig, layoutPaths) {
    var ctrl = this;

    ctrl.$onInit = function () {
      var layoutColors = baConfig.colors;
      ctrl.colors = [
        layoutColors.primary,
        layoutColors.warning,
        layoutColors.success,
        layoutColors.danger,
        layoutColors.info,
        layoutColors.primaryDark];

      $q.all([AkrUserService.get(), AkrWeb3Service.savingsGoal(), AkrWeb3Service.accounts()])
        .then(function (result) {
          var user = result[0];
          var savingGoals = result[1];
          var accounts = result[2];

          var now = moment();
          var currentYear = now.year();
          var age = now.diff(user.dateOfBirth, 'years');
          var savingGoalAge = savingGoals.age;
          var yearsLeft = savingGoalAge - age;

          var pessimisticPercent = 0.02;
          var normalPercent = 0.05;
          var optimisticPercent = 0.08;

          var accountsSum = Object.keys(accounts)
            .map(function (key) {
              return accounts[key].balance;
            })
            .reduce(function (previousValue, currentValue) {
              return previousValue + currentValue;
            });

          var areaData = [];

          for (var i = 0; i < yearsLeft; i++) {
            var pessimistic = calcSaving(i == 0 ? accountsSum : areaData[i - 1].p, pessimisticPercent);
            var normal = calcSaving(i == 0 ? accountsSum : areaData[i - 1].n, normalPercent);
            var optimistic = calcSaving(i == 0 ? accountsSum : areaData[i - 1].o, optimisticPercent);
            areaData.push(
              {
                y: (currentYear + i).toString(),
                p: pessimistic,
                pdiff: i == 0 ? 0 : pessimistic - areaData[i - 1].p,
                n: normal,
                ndiff: i == 0 ? 0 : normal - areaData[i - 1].n,
                o: optimistic,
                odiff: i == 0 ? 0 : optimistic - areaData[i - 1].o
              }
            )
          }

          function calcSaving(base, percent) {
            return ~~(base + percent * base);
          }

          ctrl.areaData = areaData;


          var chart = AmCharts.makeChart("zoomAxisChart", {
            "type": "serial",
            "theme": "none",
            "color": layoutColors.defaultText,
            "dataDateFormat": "YYYY",
            "precision": 0,
            "valueAxes": [{
              color: layoutColors.defaultText,
              axisColor: layoutColors.defaultText,
              gridColor: layoutColors.defaultText,
              "id": "v1",
              "title": "Total Savings",
              "position": "left",
              "autoGridCount": false,
              "labelFunction": function (value) {
                return "$" + Math.round(value);
              }
            }, {
              color: layoutColors.defaultText,
              axisColor: layoutColors.defaultText,
              gridColor: layoutColors.defaultText,
              "id": "v2",
              "title": "Year to year growth",
              "gridAlpha": 0,
              "position": "right",
              "autoGridCount": false,
              "labelFunction": function (value) {
                return "$" + Math.round(value);
              }
            }],
            "graphs": [
              {
                "id": "g3",
                color: layoutColors.defaultText,
                "valueAxis": "v2",
                "lineColor": layoutColors.dashboard.surfieGreen,
                "fillColors": layoutColors.dashboard.surfieGreen,
                "fillAlphas": 1,
                "lineAlpha": 1,
                "type": "column",
                "title": "Optimistic grow",
                "valueField": "odiff",
                "clustered": false,
                "columnWidth": 200,
                "lineColorField": layoutColors.defaultText,
                "legendValueText": "$[[value]]",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]</b>"
              },
              {
                "id": "g2",
                color: layoutColors.defaultText,
                "valueAxis": "v2",
                "lineColor": layoutColors.dashboard.silverTree,
                "fillColors": layoutColors.dashboard.silverTree,
                "fillAlphas": 1,
                "lineAlpha": 1,
                "type": "column",
                "title": "Normal grow",
                "valueField": "ndiff",
                "clustered": false,
                "columnWidth": 200,
                "lineColorField": layoutColors.defaultText,
                "legendValueText": "$[[value]]",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]</b>"
              },
              {
                "id": "g1",
                color: layoutColors.defaultText,
                "valueAxis": "v2",
                "lineColor": layoutColors.dashboard.gossip,
                "fillColors": layoutColors.dashboard.gossip,
                "fillAlphas": 1,
                "lineAlpha": 1,
                "type": "column",
                "title": "Pessimistic grow",
                "valueField": "pdiff",
                "clustered": false,
                "columnWidth": 200,
                "lineColorField": layoutColors.defaultText,
                "legendValueText": "$[[value]]",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]</b>",
              }
              , {
                "id": "g4",
                "valueAxis": "v1",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": layoutColors.defaultText,
                color: layoutColors.defaultText,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": layoutColors.danger,
                "type": "smoothedLine",
                "title": "Pessimistic",
                "useLineColorForBulletBorder": true,
                "valueField": "p",
                "legendValueText": "$[[value]]",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]</b>"
              }, {
                "id": "g5",
                "valueAxis": "v1",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": layoutColors.defaultText,
                color: layoutColors.defaultText,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": layoutColors.warning,
                "type": "smoothedLine",
                "title": "Normal",
                "useLineColorForBulletBorder": true,
                "valueField": "n",
                "legendValueText": "$[[value]]",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]</b>"
              },
              {
                "id": "g6",
                "valueAxis": "v1",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": layoutColors.defaultText,
                color: layoutColors.defaultText,
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": layoutColors.success,
                "type": "smoothedLine",
                "title": "Optimistic",
                "useLineColorForBulletBorder": true,
                "valueField": "o",
                "legendValueText": "$[[value]]",
                "balloonText": "[[title]]<br/><b style='font-size: 130%'>$[[value]]</b>"
              }

            ],
            "chartScrollbar": {
              "graph": "g5",
              "oppositeAxis": false,
              "offset": 30,
              gridAlpha: 0,
              color: layoutColors.defaultText,
              scrollbarHeight: 50,
              backgroundAlpha: 0,
              selectedBackgroundAlpha: 0.05,
              selectedBackgroundColor: layoutColors.defaultText,
              graphFillAlpha: 0,
              autoGridCount: true,
              selectedGraphFillAlpha: 0,
              graphLineAlpha: 0.2,
              selectedGraphLineColor: layoutColors.defaultText,
              selectedGraphLineAlpha: 1
            },
            "chartCursor": {
              "pan": true,
              "cursorColor": layoutColors.danger,
              "valueLineEnabled": true,
              "valueLineBalloonEnabled": true,
              "cursorAlpha": 0,
              "valueLineAlpha": 0.2
            },
            "categoryField": "y",
            "categoryAxis": {
              "axisColor": layoutColors.defaultText,
              "color": layoutColors.defaultText,
              "gridColor": layoutColors.defaultText,
              "parseDates": true,
              "dashLength": 1,
              "minorGridEnabled": true
            },
            "legend": {
              "useGraphSettings": true,
              "position": "top",
              "color": layoutColors.defaultText
            },
            "balloon": {
              "borderThickness": 1,
              "shadowAlpha": 0
            },
            "export": {
              "enabled": true
            },
            "dataProvider": areaData,
            pathToImages: layoutPaths.images.amChart
          });


        });

    };

  }
})();