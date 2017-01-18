'use strict';
const angular = require('angular');

var moment = require("moment");

/*@ngInject*/
export function fromNowFilter() {
  return function(input) {
    return moment(input).fromNow();
    //return `fromNow filter: ${input}`;
  };
}

export default angular.module('paizaqaApp.fromNow', [])
  .filter('fromNow', fromNowFilter)
  .name;
