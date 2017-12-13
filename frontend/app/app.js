var app = angular.module('userApp', ['appRoutes', 'bigOFacts', 'cppFacts', 'javaFacts', 'userCtrl', 'userServices', 'ngAnimate', 'mainController', 'authServices'])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors');
});
