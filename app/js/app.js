var app = angular.module('dashcam-repo', [
    'ui.router',
    'angular.filter',
    'dashcam-repo.controllers.MainController',
    'dashcam-repo.controllers.HomeController',
    'dashcam-repo.services.DBService',
    'dashcam-repo.extras'
]);

app.run(
    function () {
        console.log("RUN!");
    }
).config(
    function ($compileProvider, $sceProvider, $stateProvider, $urlRouterProvider) {
        $compileProvider.debugInfoEnabled(false);
        $sceProvider.enabled(false);

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: 'templates/home.html',
                controller: "HomeController"
            })
        ;

        $urlRouterProvider.otherwise("/home");
    }
);
