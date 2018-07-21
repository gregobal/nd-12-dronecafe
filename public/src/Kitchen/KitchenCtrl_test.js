describe('Check that KitchenCtrl controller', function () {

  let $scope = null;
  beforeEach(module('droneCafe'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
    controller = $controller('KitchenCtrl', {$scope: $scope});
  }));

  it('exists', function () {
    expect(controller).toBeDefined();
  });
});