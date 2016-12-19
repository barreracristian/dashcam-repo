angular.module('dashcam-repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, $timeout, DBService) {

            $scope.videos = [
                {
                    siniestroId:2345,
                    patente:"LFRG34",
                    rut:"13.235.235-5",
                    uploaded:true,
                    seen:false,
                    downloaded:false,
                    videoId:"Q6Ms0SxEcT0"
                },
                {
                    siniestroId:2345,
                    patente:"LFRG34",
                    rut:"13.235.235-5",
                    uploaded:true,
                    seen:true,
                    downloaded:false,
                    videoId:"KxUoTlKMVnM"
                },
                {
                    siniestroId:2345,
                    patente:"LFRG34",
                    rut:"13.235.235-5",
                    uploaded:true,
                    seen:true,
                    downloaded:true,
                    videoId:""
                }
            ];

            $scope.search = function(){
                $scope.searching = true;
                $timeout(function(){
                    $scope.searching = false;
                }, 2000);

            };

            $scope.selectVideo = function (video) {
                $scope.videoId = video.videoId;
            };

            $scope.$on('youtube.player.ready', function ($event, player) {
                player.playVideo();
            });

        }
    )
;
