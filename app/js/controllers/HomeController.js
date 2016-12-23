angular.module('dashcam-repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, $timeout, $interval, DBService) {

            $scope.videos = [
                {
                    siniestroId: 2345,
                    patente: "LFRG34",
                    rut: "13.235.235-5",
                    uploaded: true,
                    seen: false,
                    downloaded: false,
                    videoId: "Q6Ms0SxEcT0"
                },
                {
                    siniestroId: 2345,
                    patente: "LFRG34",
                    rut: "13.235.235-5",
                    uploaded: true,
                    seen: true,
                    downloaded: false,
                    videoId: "KxUoTlKMVnM"
                }
            ];

            $scope.search = function () {
                $scope.searching = true;
                $timeout(function () {
                    $scope.searching = false;
                }, 2000);
            };

            $scope.selectVideo = function (video) {
                $scope.selectedVideo = video;
                $scope.videoId = video.videoId;
                $scope.playerVars = {
                    controls: 0,
                    autoplay: 1
                };
                $("#videoSpace").modal("show");
            };

            $scope.$on('youtube.player.ready', function ($event, player) {
                console.log("------------------ ready");
                $scope.player = player;
                $scope.playVideo();
            });

            $("#videoSpace").on('shown.bs.modal', function () {
            });

            $("#videoSpace").on('hidden.bs.modal', function () {
                $scope.stopVideo();
                $scope.selectedVideo = undefined;
                $scope.videoId = undefined;
            });

            // Controles play / pause / stop

            $interval(function () {
                if ($scope.player && $scope.videoId) {
                    var j = $scope.player.j;
                    if (j.duration > 0 && j.currentTime >= j.duration - 2) {
                        $scope.pauseByTime = true;
                        $scope.pauseVideo();
                    }
                }
            }, 1000);

            $scope.playVideo = function () {
                if (!$scope.pauseByTime) {
                    console.log("------------------ play");
                    $scope.player.playVideo();
                }
            };

            $scope.pauseVideo = function () {
                console.log("------------------ pause");
                $scope.player.pauseVideo();
            };

            $scope.stopVideo = function () {
                console.log("------------------ stop");
                $scope.player.stopVideo();
                $scope.pauseByTime = false;
            };

            // Download

            $scope.download = function (video) {
                $scope.download = {};
                $scope.download[video.videoId] = 'ongoing';
            }
        }
    )
;
