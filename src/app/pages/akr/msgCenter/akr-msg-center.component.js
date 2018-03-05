(function () {
  'use strict';

  angular.module('akr-msg-center')
    .component('akrMsgCenter', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/msgCenter/akr-msg-center.component.html'
    });

  /** @ngInject */
  function ComponentController($sce, AkrMsgCenterService, $rootScope) {
    var ctrl = this;

    ctrl.messages = [];
    ctrl.notifications = [];

    ctrl.$onInit = function () {
      $rootScope.$on('akrMessageEvent', assignMessagesState);
      assignMessagesState();
    };

    ctrl.getMessage = function (msg) {
      return $sce.trustAsHtml(msg);
    };

    ctrl.markAllRead = function (type) {
      AkrMsgCenterService.markAllRead(type);
    };

    ctrl.unreadMessagesLength = function () {
      return unreadLength(ctrl.messages);
    };

    ctrl.unreadNotificationsLength = function () {
      return unreadLength(ctrl.notifications);
    };

    function assignMessagesState() {
      ctrl.messages = AkrMsgCenterService.message('message');
      ctrl.notifications = AkrMsgCenterService.message('notification');
    }

    function unreadLength(array) {
      return array.filter(function (e) {
        return !e.read;
      }).length;
    }

  }
})();