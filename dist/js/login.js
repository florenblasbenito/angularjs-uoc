angular.module("HttpApp",[]).controller("HttpGetController",["$http",function(t){var o=this;this.usuario="",this.contrasena="",this.LOGIN_URL="http://multimedia.uoc.edu/frontend/auth.php",this.postDataResponse="",o.sendData=function(){var e=$.param({user:o.usuario,passwd:o.contrasena});console.log(e);var a={headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}};o.postDataResponse="Sending login to the server...",t.post(o.LOGIN_URL,e,a).success(function(t,e,a,s){console.log(t),o.postDataResponse=JSON.stringify(t),$(location).attr("href","http:#/home")}).error(function(t,e,a,s){o.postDataResponse="Data: "+t+"<hr />status: "+e+"<hr />headers: "+a+"<hr />config: "+s,$(location).attr("href","")})}}]);
//# sourceMappingURL=maps/login.js.map