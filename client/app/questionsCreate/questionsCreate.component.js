'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './questionsCreate.routes';

export class QuestionsCreateComponent {
  newQuestion;

  /*@ngInject*/
  constructor($http, $location) {
    this.message = 'Hello';
    this.$http = $http;
    this.$location = $location;

  }

  askQuestion = function() {
    console.log(this);
    if (this.newQuestion) {
      self = this;
      this.$http.post('/api/questions', this.newQuestion).then(function() {
        self.$location.path('/');
      });
    }
  }

}

QuestionsCreateComponent.$inject = ["$http", "$location"];

export default angular.module('paizaqaApp.questionsCreate', [uiRouter])
  .config(routes)
  .component('questionsCreate', {
    template: require('./questionsCreate.html'),
    controller: QuestionsCreateComponent,
    controllerAs: 'questionsCreateCtrl'
  })
  .name;
