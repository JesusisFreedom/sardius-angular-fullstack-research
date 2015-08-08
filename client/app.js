//Deps TODO - Some sort of automagic dep injection here

require('./styles.scss');

require('angular');
require('angular-ui-router');

module.exports = angular.module('awebpack', [
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

require('./main/main.js');
require('./main/main.controller.js');


