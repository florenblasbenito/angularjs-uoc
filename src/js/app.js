(function(){

// App Module: the name AngularStore matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var storeApp = angular.module('AngularStore', ['ngRoute','storeCtrl','storeServices','HttpApp','lostsysApp']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'storeController',
    controllerAs: 'ctrl'
  }).
    when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'storeController',
    controllerAs: 'ctrl'
  }).
    when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'storeController',
    controllerAs: 'ctrl'
  }).
  when('/products/:productId', {
    templateUrl: 'partials/product.html',
    controller: 'storeController',
    controllerAs: 'ctrl'
  }).
  when('/cart', {
    templateUrl: 'partials/shoppingCart.html',
    controller: 'storeController',
    controllerAs: 'ctrl'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);

})();
