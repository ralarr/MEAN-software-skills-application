var app = angular.module('userApp', ['appRoutes', 'bigOFacts', 'userCtrl', 'userServices', 'ngAnimate', 'mainController', 'authServices', 'solutions'])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors');
});
