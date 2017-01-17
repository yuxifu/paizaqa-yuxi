'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './questionsShow.routes';

export class QuestionsShowComponent {
  question;
  newAnswer;

  /*@ngInject*/
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.message = 'Hello';
  }

  $onInit() {
    self = this;
    self.$http.get('/api/questions/' + self.$stateParams.id)
      .then(response => {
        self.question = response.data;
      });
  }

  loadQuestions = function() {
    self = this;
    self.$http.get('/api/questions/' + self.$stateParams.id)
      .then(response => {
        self.question = response.data;
      });
  }

  submitAnswer = function() {
    if (this.newAnswer) {
      self = this;
      this.$http.post('/api/questions/' + this.$stateParams.id + '/answers', this.newAnswer)
        .then(function(response) {
            // success
            //self.$http.get('/api/questions/' + self.$stateParams.id)
            //  .then(response => {
            //    self.question = response.data;
            //  });
            self.loadQuestions(self);
            self.newAnswer = {};
          },
          function(response) { // optional
            // failed
          });
    }
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
