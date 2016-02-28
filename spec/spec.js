describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});



describe('stickyAppController', function() {

  beforeEach(mock.module('stickyApp'));
  var $controller;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

console.log('hi');
  describe('$webstorage', function() {
    it('gets webstorage and it is an array', function() {
      var controller = $controller('stickyPosts');
      console.log($webstorage.getposts());
    })
  });
});
