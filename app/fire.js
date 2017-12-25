angular.module('project', ['ngRoute', 'firebase'])
.controller("MyCtrl", ["$scope", "$firebaseObject", "$firebaseArray", 
  function($scope, $firebaseObject, $firebaseArray) {
    var ref = firebase.database().ref().child("users");
    $scope.users = $firebaseArray(ref);

    
    $scope.name = 'default';
    
    $scope.add = function(){
      $scope.users.$add({name: $scope.name})
    };

    $scope.search = function(){
      if(!$scope.searchedName){
        var ref = firebase.database().ref().child("users");
        $scope.users = $firebaseArray(ref);
      }else{
        var ref = firebase.database().ref().child("users").orderByChild("name").equalTo($scope.searchedName);
        $scope.users = $firebaseArray(ref);
      }
    }
  }
])

.config(function($routeProvider, $locationProvider) {
  
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      controller:'UserListController as userList',
      templateUrl:'app/userlist.html'
    })
    .when('/edit/:userId', {
      controller:'EditUserController as editUser',
      templateUrl:'app/edituser.html'
    })
    // .when('/new', {
    //   controller:'NewProjectController as editProject',
    //   templateUrl:'detail.html',
    //   resolve: resolveProjects
    // })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('UserListController', ["$scope", "$firebaseObject", "$firebaseArray", function($scope, $firebaseObject, $firebaseArray) {
    var ref = firebase.database().ref().child("users");
    var list = $firebaseArray(ref);
    var userList = this;
    userList.users = list;
}])
 
.controller('EditUserController', ["$scope", "$firebaseObject", "$firebaseArray", "$routeParams", "$location", function($scope, $firebaseObject, $firebaseArray, $routeParams, $location) {
    var editUser = this;
    console.log($routeParams);
    var userId = $routeParams.userId;
    var ref = firebase.database().ref().child("users/");
    var list = $firebaseArray(ref);
    list.$loaded().then(function() { 
      editUser.user = list.$getRecord(userId);
    });

    editUser.destroy = function() {
        list.$remove(editUser.user).then(function(data) {
            $location.path('/');
        });
    };
 
    editUser.save = function() {
        list.$save(editUser.user).then(function(data) {
           $location.path('/');
        });
    };
}]);