(function(){

    var app=angular.module("storeServices",['ngResource']);

    app.factory('Product', ['$resource',
       function($resource){
          return $resource('http://multimedia.uoc.edu/frontend/getbooks.php', {}, {
             query: {method:'get', params:{productId:"n.id"}, isArray:true}
         });
      }]);

    app.service('onlineStore', ['Product', function(Product){

       this.products=Product.query();

       this.getProduct = function (pId) {
          for (var i = 0; i < this.products.length; i++) {
             if (this.products[i].id == pId)
                return this.products[i];
        }
        return null;
    };

}]);

// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
app.factory("DataService", ["onlineStore",function (onlineStore) {

    // create store
    var myStore = onlineStore;

    // create shopping cart
    var myCart = new shoppingCart("AngularStore");

    return {
        store: myStore,
        cart: myCart
    };
}]);

})();