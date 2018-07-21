angular
  .module('droneCafe')
  .factory('KitchenService', function ($http) {

    return {

      getOrders: function (status) {
        return $http.get('/orders?status=' + status);
      },

      changeStatus: function (order, status) {
        return $http({
          method: 'PUT',
          url: '/orders/' + order._id,
          data: {status: status}
        });
      }
    }
  });