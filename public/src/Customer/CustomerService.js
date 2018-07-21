angular
  .module('droneCafe')
  .factory('CustomerService', function ($http) {

    return {

      getOrders: function () {
        return $http.get('/orders');
      },

      getDishes: function () {
        return $http.get('/dishes');
      },

      login: function (customer) {
        return $http({
          method: 'POST',
          url: '/users',
          data: customer
        });
      },

      updateCredits: function (customer) {
        return $http({
          method: 'PUT',
          url: '/users/' + customer._id,
          data: customer
        });
      },

      newOrder: function (customer, dish) {
        return $http({
          method: 'POST',
          url: '/orders',
          data: {user: customer, dish: dish}
        });
      },
    }
  });