droneCafe.controller('KitchenCtrl', function ($scope, KitchenService) {

  $scope.logged = true;
  $scope.orderedDishes = [];
  $scope.cookingDishes = [];

  KitchenService.getOrders('ordered').then(function (res) {
    $scope.orderedDishes = res.data;
  });

  KitchenService.getOrders('cooking').then(function (res) {
    $scope.cookingDishes = res.data;
  });

  $scope.startCooking = function (order) {
    order.status = 'cooking';
    $scope.cookingDishes.push(order);

    $scope.orderedDishes = $scope.orderedDishes.filter(function (orderedDish) {
      return order._id !== orderedDish._id;
    });

    KitchenService.changeStatus(order, 'cooking').then(function (data) {
    });
  };

  $scope.finishCooking = function (order) {
    $scope.cookingDishes = $scope.cookingDishes.filter(function (cookingDish) {
      return order._id !== cookingDish._id;
    });

    KitchenService.changeStatus(order, 'delivering').then(function (data) {
    });
  };

  let socket = io();

  socket.on('order created', function () {
    KitchenService.getOrders('ordered').then(function (res) {
      $scope.orderedDishes = res.data;
    });
  });
});