angular.module('solutions', [])

.controller('solutionsCtrl', function($scope, $http) {

  $http.get('/solutions.html').then(function(res) {
    $scope.solutions = res.data;
    //$scope.solution = "";
    //console.log(res)
  });
});﻿
