'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      template: '<questions-index></questions-index>'
      //template: '<main></main>'
    });
}
