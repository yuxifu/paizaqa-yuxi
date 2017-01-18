'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';

//require('../bower_components/lib/Markdown.Converter.js');
//require('../bower_components/lib/Markdown.Sanitizer.js');
//require('../bower_components/lib/Markdown.Extra.js');
//require('../bower_components/lib/Markdown.Editor.js');
//require('../bower_components/lib/angular-pagedown.js');

import ngTagsInput from 'ng-tags-input';
import ngMessages from 'angular-messages';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
//import main from './main/main.component';
import QuestionsIndexComponent from './questionsIndex/questionsIndex.component';
import QuestionsCreateComponent from './questionsCreate/questionsCreate.component';
import QuestionsShowComponent from './questionsShow/questionsShow.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import fromNow from './fromNow/fromNow.Filter';

import './app.scss';

angular.module('paizaqaApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, navbar, footer, constants, socket, util, //main,
  QuestionsIndexComponent, QuestionsCreateComponent, QuestionsShowComponent,
//  "ui.pagedown", "Markdown"
  'ngTagsInput', ngMessages, fromNow
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['paizaqaApp'], {
      strictDi: true
    });
  });
