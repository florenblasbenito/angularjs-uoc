
angular.module("HttpApp", [])
.controller("HttpGetController", ['$http', function ( $http ) {
  var self = this;
  
  this.usuario = '';
  this.contrasena = '';
  this.LOGIN_URL = 'http://multimedia.uoc.edu/frontend/auth.php';
  this.postDataResponse = '';
  
  self.sendData = function() {
      // use $.param jQuery function to serialize data from JSON 
      var loginData = $.param({
          user: self.usuario,
          passwd: self.contrasena
      });  
    
    console.log(loginData);
        
      var config = {
          headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' }
      }

      // Send login to the LOGIN_URL
      self.postDataResponse = 'Sending login to the server...';
      $http.post(self.LOGIN_URL, loginData, config)
        .success(function (data, status, headers, config) {
            console.log(data);
            self.postDataResponse = JSON.stringify(data);
            $(location).attr('href', 'http:#/home');
        })
        .error(function (data, status, header, config) {
            self.postDataResponse = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            $(location).attr('href', '');
        });
        
  };
}]);