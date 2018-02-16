(function () {
    'use strict';

    angular.module('akr-signup')
        .component('akrSignup', {
            controller: ComponentController,
            templateUrl: 'akr-pages/signup/akr-signup.component.html'
            /*transclude: {
                'header': 'eisCardHeader',
                'content': 'eisCardContent',
                'summary': 'eisCardSummary'
            },
            bindings: {
                inactive: '&?',
                productOfferKey: '@',
                isLast: '<',
                hasReferral: '<',
                quote: '<'
            },
            require: {
                compareCtrl: '^eisCompare'
            }*/

        });

    function ComponentController($location) {
        var ctrl = this;

        ctrl.joinNow = function () {
          $location.path('/signup')
        };

    }
})();