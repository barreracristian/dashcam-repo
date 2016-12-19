angular.module('dashcam-repo.controllers.LoginController', [])
    .controller('LoginController',
        function ($scope, $state, DBService) {

            $scope.login = function(){
                $state.go('home', {id: 0});
            }
        }
    )
;
