describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});



describe('stickyAppController', function() {

  beforeEach(module('stickyApp'));
  var $controller;

  beforeEach(angular.mock.inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  describe('saving data to mongo or storaging it', function() {
      $scope = {};
  });

  describe('mongoDb setup', function() {
      $scope = {};
      $http =
      it('can get json of new addition', function() {
        var controller = $controller('stickyPosts',
        { $scope: $scope, $http: $http });
        /*
        add json to array of things to add
        call mongoDb
        Try to save
          if fail:
            report the failure
            set timer to try again
          if succecss:
            remove storage
        */

      });
  });

  describe('add, save and delete', function() {
    $scope = {};
    $webstorage = {};
    var storage = [];
    // Mock webstorage
    $webstorage.getposts = function() {
      return storage;
    }
    $webstorage.addpost = function(post) {
      storage.push(post);
    }
    $webstorage.saveposts = function() {};

    it('id of new posts set correct', function() {
      var controller = $controller('stickyPosts',
      { $scope: $scope, $webstorage: $webstorage });
      $scope.add();
      expect($scope.posts.length).toBe(1);
      expect($scope.posts[0].id).toBe(1);
      $scope.add();
      expect($scope.posts.length).toBe(2);
      expect($scope.posts[1].id).toBe(2);
    })

  });

});
