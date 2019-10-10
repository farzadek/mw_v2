const app = angular.module("mwApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html"
        })
        .otherwise("/blue", {
            templateUrl: "home.html"
        });
});

app.controller('mwCtrl', function ($scope) {
    $scope.text = texts;
    $scope.MenuIsOpen = false;

    $scope.openMenu = function () {
        $scope.MenuIsOpen = !$scope.MenuIsOpen;
    }
});