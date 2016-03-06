'use strict';
var angular = require('angular');

var stickyApp = angular.module('stickyApp', [require('satellizer')])
  .config(function($authProvider) {

    $authProvider.google({
      clientId: '1756204919-rb2dt1t62tecum2quucdcjljcouncoge.apps.googleusercontent.com'
    });
  });

stickyApp.controller('stickyPosts', function ($scope, $auth) {

  $scope.posts = [];

  $scope.getLoginText = function() {
    if (!$auth.getToken())
      return "Login";
    else {
      return "Signed in";
    }
  }

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
    console.log('Token', $auth.getToken())
  }


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



/*
  $scope.add = function() {
    $scope.posts.push({id: getId(), text: ''});
    $webstorage.saveposts($scope.posts);
  }

  $scope.getposts = function(googleId) {
    $http( {
      method: 'GET',
      url: '/post/get',
      data: {googleId: googleId},
    }).then(function successCallback(response) {

    }, function errorCallback(response) {

    });
  }
  */

  $scope.savepost = function(googleId) {
    $http( {
      method: 'POST',
      url: '/post/save',
      data: {googleId: googleId, posts: $scope.posts},
    })
  }


  $scope.save = function(id, text) {
    var i;
    for (i = 0; i < $scope.posts.length; i++) {
      if (id == $scope.posts[i].id) {
        $scope.posts[i].text = text;
      }
    }
    //$webstorage.saveposts($scope.posts);
  }

  $scope.delete = function(id) {
    var i;
    for (i = 0; i < $scope.posts.length; i++) {
      if (id == $scope.posts[i].id) {
        $scope.posts.splice(i, 1);
      }
    }
    //$webstorage.saveposts($scope.posts);
  }


});
