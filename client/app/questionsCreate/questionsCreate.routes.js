'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('questionsCreate', {
      url: '/questions/create',
      template: '<questions-create></questions-create>'
    });
}
