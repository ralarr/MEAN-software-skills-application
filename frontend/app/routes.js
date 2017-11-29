var app = angular.module('appRoutes', ['ngRoute'])

.config(($routeProvider, $locationProvider) => {
  $routeProvider

  .when('/', {
    templateUrl: 'app/views/pages/home.html'
  })
  .when('/register', {
    templateUrl: 'app/views/pages/users/register.html',
    controller: 'regCtrl',
    controllerAs: 'register',
    member: false
  })
  .when('/login', {
    templateUrl: 'app/views/pages/users/login.html',
    member: false
  })
  .when('/logout', {
    templateUrl: 'app/views/pages/users/logout.html',
    member: true
  })
  .when('/profile', {
    templateUrl: 'app/views/pages/users/profile.html',
    member: true
  })
  .when('/quizes', {
    templateUrl: 'app/views/pages/quizes.html',
    member: true
  })
  .when('/questionslist', {
    templateUrl: 'app/views/pages/questionslist.html',
    member: true
  })
  .when('/solutions', {
    templateUrl: 'app/views/pages/solutions.html',
    member: true
  })
  .when('/pseudosol', {
    templateUrl: 'app/views/pages/pseudosolutions.html',
    controller: 'solCtrl'
  })
  .when('/about', {
    templateUrl: 'app/views/pages/about.html',
    member: false
  })
  .when('/quizes/big_O_Quiz_Recap', {
    templateUrl: 'app/views/pages/bigORecap.html',
    controller: 'listCtrl',
    member: true
  })
  .when('/quizes/big_O_Quiz', {
    templateUrl: 'app/views/pages/bigOQuiz.html',
    member: true
  })
  .otherwise({ redirectTo: '/' });
  $locationProvider.html5Mode({
    enabled: true,
    requiredBase: false
  });
});

app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    if (next.$$route.member == true){
      if (!Auth.isLoggedIn()){
        event.preventDefault();
        $location.path('/');
      }
    } else if (next.$$route.member == false){
      if (Auth.isLoggedIn()){
        event.preventDefault();
        $location.path('/profile');
      }
    }
  });
}]);
