var app = angular.module('dashcam-repo', [
    'ui.router',
    'angular.filter',
    'dashcam-repo.controllers.MainController',
    'dashcam-repo.controllers.HomeController',
    'dashcam-repo.controllers.LoginController',
    'dashcam-repo.services.DBService',
    'dashcam-repo.extras',
    'youtube-embed'
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
            .state('login', {
                url: "/login",
                templateUrl: 'templates/login.html',
                controller: "LoginController"
            })
            .state('home', {
                url: "/home",
                templateUrl: 'templates/home.html',
                controller: "HomeController"
            })
        ;

        $urlRouterProvider.otherwise("/login");
    }
);
