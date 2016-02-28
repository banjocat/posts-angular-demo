var angular = require('angular');

var stickyApp = angular.module('stickyApp', []);


stickyApp.service('$webstorage', function() {
    this.getposts = function() {
      var value = localStorage.getItem('posts');
      // If first time visiting or it is empty
      if (!value || value == "[]") {
        return [{id: 1, text: 'Replace me!'}];
      }
      else {
        return angular.fromJson(value);
      }
    }

    this.saveposts = function(posts) {
        localStorage.setItem('posts', angular.toJson(posts));
    }
});

stickyApp.controller('stickyPosts', function ($scope, $webstorage) {

  $scope.posts = $webstorage.getposts();

  var getId = function() {
      var id = 1;
      var i;
      for (i = 0; i < $scope.posts.length; i++) {
        match = parseInt($scope.posts[i].id);
        if (match >= id)
          id = $scope.posts[i].id + 1;
      }
      return id;
  };

  $scope.add = function() {
    $scope.posts.push({id: getId(), text: ''});
    $webstorage.saveposts($scope.posts);
  }

  $scope.save = function(id, text) {
    var i;
    for (i = 0; i < $scope.posts.length; i++) {
      if (id == $scope.posts[i].id) {
        $scope.posts[i].text = text;
      }
    }
    $webstorage.saveposts($scope.posts);
  }

  $scope.delete = function(id) {
    var i;
    for (i = 0; i < $scope.posts.length; i++) {
      if (id == $scope.posts[i].id) {
        $scope.posts.splice(i, 1);
      }
    }
    $webstorage.saveposts($scope.posts);
  }


});
