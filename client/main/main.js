require('./main.scss');
angular.module('awebpack')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: require('./main.html'),
        controller: 'MainCtrl'
      });
  });