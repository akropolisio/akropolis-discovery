(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('baWizardStep', baWizardStep);

  /** @ngInject */
  function baWizardStep() {
    return {
      restrict: 'E',
      transclude: true,
      require: '^baWizard',
      scope: {
        form: '=',
        valid: '&',
        invalidHandler: '&'
      },
      templateUrl: 'app/theme/components/baWizard/baWizardStep.html',
      link: function ($scope, $element, $attrs, wizard) {
        $scope.selected = true;

        var tab = {
          title: $attrs.title,
          select: select,
          submit: submit,
          isComplete: isComplete,
          isAvailiable: isAvailiable,
          prevTab: undefined,
          setPrev: setPrev
        };

        wizard.addTab(tab);

        function select(isSelected) {
          $scope.selected = isSelected;
        }

        function submit() {
          $scope.form && $scope.form.$setSubmitted(true);
        }

        function isComplete() {
          var isValid = $scope.form
            ? $scope.form.$valid
            : $scope.valid
              ? $scope.valid()
              : true;
          if ($scope.invalidHandler && !isValid) {
            $scope.invalidHandler();
          }
          return isValid;
        }

        function isAvailiable() {
          return tab.prevTab ? tab.prevTab.isComplete() : true;
        }

        function setPrev(pTab) {
          tab.prevTab = pTab;
        }
      }
    };
  }
})();