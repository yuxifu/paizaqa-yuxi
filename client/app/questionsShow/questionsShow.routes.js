'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('questionsShow', {
      url: '/questions/show/:id',
      template: '<questions-show></questions-show>'
    });
}
