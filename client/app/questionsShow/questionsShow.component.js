'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './questionsShow.routes';

export class QuestionsShowComponent {
  question;
  newAnswer;

  /*@ngInject*/
  constructor($http, $stateParams, $location, Auth) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.Auth = Auth;
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
            self.loadQuestions();
            self.newAnswer = {};
          },
          function(response) { // optional
            // failed
          });
    }
  }

  deleteQuestion = function() {
    self = this;
    self.$http.delete('/api/questions/' + self.$stateParams.id)
      .then(function() {
        self.$location.path('/');
      });
  };

  updateQuestion = function() {
    self = this;
    self.$http.put('/api/questions/' + self.$stateParams.id, self.question)
      .then(function() {
        self.loadQuestions();
      });
  };

  deleteAnswer = function(answer) {
    self = this;
    self.$http.delete('/api/questions/' + self.$stateParams.id + '/answers/' + answer._id)
      .then(function() {
        self.loadQuestions();
      });
  };

  updateAnswer = function(answer) {
    self = this;
    self.$http.put('/api/questions/' + self.$stateParams.id + '/answers/' + answer._id, answer)
      .then(function() {
        self.loadQuestions();
      });
  };

  isOwner = function(obj) {
    self = this;
    return self.Auth.isLoggedInSync() &&
      obj &&
      obj.user && obj.user._id === self.Auth.getCurrentUserSync()._id;
  };

  isAdmin = function() {
    self = this;
    return self.Auth.isAdminSync();
  };

  isOwnerOrAdmin(obj) {
      return this.isOwner(obj) || this.isAdmin();
  }

}

QuestionsShowComponent.$inject = ["$http", "$stateParams", "$location", "Auth"];

export default angular.module('paizaqaApp.questionsShow', [uiRouter])
  .config(routes)
  .component('questionsShow', {
    template: require('./questionsShow.html'),
    controller: QuestionsShowComponent,
    controllerAs: 'questionsShowCtrl'
  })
  .name;
