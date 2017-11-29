/*angular.module('regCtrl', []).config(function(){
  console.log("this worked");
})*/

angular.module('userCtrl', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User){
  var app = this;
  this.regUser = function(regData, valid){
    app.loading = true;
    app.errorMsg = false;

    if (valid){
      User.create(app.regData).then(function(data){
        if (data.data.success){
          app.loading = false;
          app.successMsg = data.data.message;

          $timeout(function(){
            $location.path('/');
          }, 2500);
        } else {
          app.loading = false;
          app.errorMsg = data.data.message;
        }
      });
    } else {
      app.loading = false;
      app.errorMsg = 'Fill the form properly';
    }
  };
});
