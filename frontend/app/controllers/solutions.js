angular.module('solutions', [])

.controller('solCtrl', function($scope, $http){
  $http.get('/pseudosol').then(function(data){
    console.log(data);
    $scope.solutions = data;
  })
});
