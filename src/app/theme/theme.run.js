/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($timeout, $rootScope, layoutPaths, preloader, $q, themeLayoutSettings, $interval) {
    $rootScope.$showPreloder = false;
    $rootScope.$preloaderText = "Loading Application. Please Wait.";
    console.log('themeRun');

    var whatToWait = [
      preloader.loadAmCharts()
    ];

    var theme = themeLayoutSettings;
    if (theme.blur) {
      if (theme.mobile) {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
      } else {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg.jpg'));
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-blurred.jpg'));
      }
    }

    $q.all(whatToWait).then(function () {
      if (!window.Dapp.initComplete) {
        var stop = $interval(function() {
          console.log('window.Dapp.initComplete: ' + window.Dapp.initComplete);
          if (window.Dapp.initComplete) {
            $rootScope.$pageFinishedLoading = true;
            $rootScope.$preloaderText = null;
            $interval.cancel(stop);
          }
        }, 100);
      } else {
        $rootScope.$pageFinishedLoading = true;
      }
    });
  }

})();