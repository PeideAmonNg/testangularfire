angular.module('project', ['firebase'])
.controller("MyCtrl", ["$scope", "$firebaseObject", "$firebaseArray", 
  function($scope, $firebaseObject, $firebaseArray) {
    var ref = firebase.database().ref().child("users");
    var users;
    // var obj = $firebaseObject(ref);
    var list = $firebaseArray(ref);
    $scope.users = list;
    // list.$add({name: "jill"}).then(function(ref) {
    //   var id = ref.key;
    //   console.log("key " + ref.key)
    //   console.log("added record with id " + id);
    //   list.$indexFor(id); // returns location in the array
    //   console.log(list.$indexFor(id));
    //   console.log("length " + list.length);
    // });

    $scope.name = 'default';
    
    $scope.add = function(){
      list.$add({name: $scope.name})
    };

    // ref.child('users/2/name').set({first: "john", last: "wick"});

    // to take an action after the data loads, use the $loaded() promise
    list.$loaded().then(function() {
      // console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

      // To iterate the key/value pairs of the object, use angular.forEach()
      // angular.forEach(obj, function(value, key) {
      //   console.log(key, value);
      // });
    users = list;
    });

    // To make the data available in the DOM, assign it to $scope
    // $scope.data = obj;

    // For three-way data bindings, bind it to the scope instead
    // obj.$bindTo($scope, "data");
  }
]);