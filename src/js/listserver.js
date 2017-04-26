var angularTodo = angular.module('lostsysApp', []);    


        angularTodo.controller('mainController', function($scope, $http) {
            $scope.names = [];

            $http.get('http://multimedia.uoc.edu/frontend/getbooks.php')
                .success(function(data) {
                    $scope.names = eval(data);
                    console.log(data)
                })
                .error(function(data) {
                    alert(data);
                    console.log('Error: ' + data);
                });

            $scope.addNom = function() {
                $http.post('http://multimedia.uoc.edu/frontend/getbooks.php', { nom: $scope.id, titulo: $scope.title, imagen: $scope.cover, } )
                    .success(function(data) {
                        $scope.names = eval(data);
                        console.log(data)
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

                $scope.id="";
                $scope.title="";
                $scope.cover="";
            }

            $scope.delNom = function( nom ) {
                if ( confirm("Seguro?") ) {
                    $http.post('http://multimedia.uoc.edu/frontend/getbooks.php', { op: 'delete', nom: nom } )
                        .success(function(data) {
                            $scope.names = eval(data);
                            console.log(data)
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                }
            }
        });