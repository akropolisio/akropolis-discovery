(function () {
  'use strict';

  angular.module('akr-msg-center')
    .service('AkrMsgCenterService', AkrMsgCenterService);

  /** @ngInject */
  function AkrMsgCenterService($rootScope) {

    var state = {
      message: [],
      notification: []
    };


    this.message = function (type, content) {
      if (angular.isUndefined(content)) {
        return state[type];
      } else {
        state[type].push({text: content, read: false});
        $rootScope.$broadcast('akrMessageEvent');
      }
    };


    this.markAllRead = function (type) {
      state[type].forEach(function (m) {
        m.read = true;
      });
      $rootScope.$broadcast('akrMessageEvent');
    };


  }
})();