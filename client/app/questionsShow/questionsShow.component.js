'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './questionsShow.routes';

export class QuestionsShowComponent {
  question;

  /*@ngInject*/
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.message = 'Hello';
  }

  $onInit() {
      self = this;
    this.$http.get('/api/questions/' + this.$stateParams.id)
      .then(response => {
        self.question = response.data;
      });
  }
}

QuestionsShowComponent.$inject = ["$http", "$stateParams"];

export default angular.module('paizaqaApp.questionsShow', [uiRouter])
  .config(routes)
  .component('questionsShow', {
    template: require('./questionsShow.html'),
    controller: QuestionsShowComponent,
    controllerAs: 'questionsShowCtrl'
  })
  .name;
