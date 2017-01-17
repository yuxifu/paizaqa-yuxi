//const angular = require('angular');

//const uiRouter = require('angular-ui-router');

//import routes from './questionsIndex.routes';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './questionsIndex.routes';

export class QuestionsIndexComponent {
  questions = [];

  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/questions')
      .then(response => {
        this.questions = response.data;
      });
  }

}

QuestionsIndexComponent.$inject = ["$http"];

export default angular.module('paizaqaApp.main', [uiRouter])
  .config(routes)
  .component('questionsIndex', {
    template: require('./questionsIndex.html'),
    controller: QuestionsIndexComponent,
    controllerAs: 'questionsIndexCtrl'
  })
  .name;
