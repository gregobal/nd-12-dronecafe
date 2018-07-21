droneCafe.controller('CustomerCtrl', function ($scope, CustomerService) {

  $scope.logged = false;
  $scope.customer = {};

  $scope.customer = JSON.parse(localStorage.getItem('customer'));
  if ($scope.customer == null) {
    $scope.customer = {};
  }

  $scope.login = function (customer) {

    CustomerService.login({name: customer.name, email: customer.email}).then(function (res) {
      $scope.logged = true;
      $scope.customer = res.data;
      localStorage.setItem('customer', JSON.stringify($scope.customer));

      $scope.orders = [];
      $scope.dishes = [];

      CustomerService.getOrders($scope.customer._id).then(function (res) {
        $scope.orders = res.data;
      });

      CustomerService.getDishes().then(function (res) {
        $scope.dishes = res.data;
      });

      let socket = io();

      socket.on('order changed', function (changedOrder) {
        $scope.orders = $scope.orders.map(function (order) {
          if (order._id === changedOrder._id) {
            order = changedOrder;
            return order;
          }
          return order;
        });
        $scope.$apply();
      });

      socket.on('order deleted', function (deletedOrder) {
        $scope.orders = $scope.orders.filter(function (order) {
          return order._id !== deletedOrder._id;
        });
        $scope.$apply();
      });

      socket.on('refund', function (data) {
        CustomerService.login({name: customer.name, email: customer.email}).then(function (res) {
          $scope.customer = res.data;
        });
      });

    });
  };

  $scope.addCredits = function () {
    $scope.customer.credits += 100;

    CustomerService.updateCredits($scope.customer).then(function (data) {
    });
  };

  $scope.makeOrder = function (dish) {
    $scope.customer.credits -= dish.price;

    CustomerService.updateCredits($scope.customer).then(function (data) {
    });

    CustomerService.newOrder($scope.customer._id, dish._id).then(function (order) {
      $scope.orders.push(order.data);
    });

  };
});