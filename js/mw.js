const app = angular.module("mwApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html"
        })
        .when("/web", {
            templateUrl: "pages/portfolio-web.html"
        })
        .when("/ui", {
            templateUrl: "pages/portfolio-ui.html"
        })
        .when("/graphic", {
            templateUrl: "pages/portfolio.html"
        })
        .when("/emails", {
            templateUrl: "pages/portfolio-email.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});
app.directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                }, 4000);
            }
        }
    }
});
app.controller('mwCtrl', function($scope, $location, $anchorScroll, $http, $window) {
    $scope.MenuIsOpen = false;
    $scope.$lang = true;
    $scope.text = $scope.$lang ? texts.en : texts.fr;
    $scope.previewWebFolio = '';
    $scope.previewGraphicFolio = '';
    $scope.previewUiFolio = '';
    $scope.previewEmailFolio = '';
    $scope.previewFullFolio = '';
    $scope.previewFullFolioCount = 0;
    $scope.webPrevPosition = 0;
    $scope.GraphicPrevPosition = 0;
    $scope.uiPrevPosition = 0;
    $scope.instaPosts = '';
    const parent = document.getElementById("jsModalBody");
    let sourceToShow = '';

    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }

    $scope.openMenu = function() {
        $scope.MenuIsOpen = !$scope.MenuIsOpen;
    }

    $scope.changeLang = function() {
        $scope.$lang = $scope.$lang ? false : true;
        $scope.text = $scope.$lang ? texts.en : texts.fr;
    }

    $http.get("php/get_limit_file_list.php?type=web")
        .then(function(response) {
            $scope.previewWebFolio = response.data;
        });
    $http.get("php/get_limit_file_list.php?type=graphic")
        .then(function(response) {
            $scope.previewGraphicFolio = response.data;
        });
    $http.get("php/get_limit_file_list.php?type=ui")
        .then(function(response) {
            $scope.previewUiFolio = response.data;
        });
    $http.get("php/get_limit_file_list.php?type=email")
        .then(function(response) {
            $scope.previewEmailFolio = response.data;
        });
    $http({
        method: "GET",
        url: "https://api.instagram.com/v1/users/self/media/recent",
        params: { access_token: "3648306560.1c1827a.4a2783080b7646dcac204724ad4a63fc" }
    }).then(function(response) {
        $scope.instaPosts = response.data.data;
    });
    $scope.nextPreview = function(prevName) {
        switch (prevName) {
            case 'web':
                if ($scope.webPrevPosition > -3 * 312) {
                    $scope.webPrevPosition -= 312;
                }
                break;
            case 'graphic':
                if ($scope.graphicPrevPosition > -3 * 312) {
                    $scope.graphicPrevPosition -= 312;
                }
                break;
            case 'ui':
                if ($scope.uiPrevPosition > -3 * 312) {
                    $scope.uiPrevPosition -= 312;
                }
                break;
        }
        document.getElementById(prevName).style.left = $scope.webPrevPosition + 'px';
    }

    $scope.prevPreview = function(prevName) {
        switch (prevName) {
            case 'web':
                if ($scope.webPrevPosition <= -312) {
                    $scope.webPrevPosition += 312;
                }
                break;
            case 'graphic':
                if ($scope.graphicPrevPosition <= -312) {
                    $scope.graphicPrevPosition += 312;
                }
                break;
            case 'ui':
                if ($scope.uiPrevPosition <= -312) {
                    $scope.uiPrevPosition += 312;
                }
                break;
        }
        document.getElementById(prevName).style.left = $scope.webPrevPosition + 'px';
    }


});