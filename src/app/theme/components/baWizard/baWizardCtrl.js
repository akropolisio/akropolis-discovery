(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('baWizardCtrl', baWizardCtrl);

  /** @ngInject */
  function baWizardCtrl($scope, $location, $timeout, toastr, AkrMsgCenterService, AkrWeb3Service) {
    var vm = this;
    vm.tabs = [];

    vm.tabNum = 0;
    vm.progress = 0;

    vm.addTab = function (tab) {
      tab.setPrev(vm.tabs[vm.tabs.length - 1]);
      vm.tabs.push(tab);
      vm.selectTab(0);
    };

    $scope.$watch(angular.bind(vm, function () {
      return vm.tabNum;
    }), calcProgress);

    vm.selectTab = function (tabNum) {
      vm.tabs[vm.tabNum].submit();
      if (vm.tabs[tabNum].isAvailiable()) {
        vm.tabNum = tabNum;
        vm.tabs.forEach(function (t, tIndex) {
          tIndex == vm.tabNum ? t.select(true) : t.select(false);
        });
      }
    };

    vm.isFirstTab = function () {
      return vm.tabNum == 0;
    };

    vm.isLastTab = function () {
      return vm.tabNum == vm.tabs.length - 1;
    };

    vm.nextTab = function () {
      if (vm.isLastTab()) {
        vm.finish()
      } else {
        vm.selectTab(vm.tabNum + 1)
      }
    };

    vm.previousTab = function () {
      vm.selectTab(vm.tabNum - 1)
    };

    vm.finish = function () {
      $location.path('/dashboard');
			AkrWeb3Service.createUserAccount().then(function(result) {
			 	console.log(result);
				toastr.info('<p>Your account is being verified now. We\'ll notify you as soon as that\'s complete.</p>\n' +
					'          <p>Feel free to explore and get started by setting up the rest of your Akropolis account</p>',
					'Welcome!', {
						"autoDismiss": false,
						"positionClass": "toast-top-center",
						"type": "info",
						"timeOut": "10000",
						"extendedTimeOut": "2000",
						"allowHtml": true,
						"closeButton": true,
						"tapToDismiss": true,
						"progressBar": false,
						"newestOnTop": true,
						"maxOpened": 0,
						"preventDuplicates": false,
						"preventOpenDuplicates": false
					});
				//Initial account funding
				AkrWeb3Service.buyAETTokens(100);
			 });


      AkrMsgCenterService.message('message', 'Your account is being verified now. We\'ll notify you as soon as that\'s complete')
      AkrMsgCenterService.message('notification', 'Opened account and initial AET deposit notification')

    };

    function calcProgress() {
      vm.progress = ((vm.tabNum + 1) / vm.tabs.length) * 100;
    }
  }
})();

