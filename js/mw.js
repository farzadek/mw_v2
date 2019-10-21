const app = angular.module("mwApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html"
        })
        .when("/portfolio-web", {
            templateUrl: "pages/portfolio-web.html"
        })
        .when("/portfolio", {
            templateUrl: "pages/portfolio.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.controller('mwCtrl', function($scope, $location, $anchorScroll, $http, $rootScope) {
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
            case 'web':
                if ($scope.graphicPrevPosition <= -312) {
                    $scope.graphicPrevPosition += 312;
                }
                break;
            case 'web':
                if ($scope.uiPrevPosition <= -312) {
                    $scope.uiPrevPosition += 312;
                }
                break;
        }
        document.getElementById(prevName).style.left = $scope.webPrevPosition + 'px';
    }

    $scope.imageToView = '';
    $scope.showItem = function(type, item) {
        if (document.getElementById("previewObject")) {
            document.getElementById("previewObject").remove();
        }
        if (type == 'web') {
            sourceToShow = 'portfolio/web/' + item.title + '/';
            let node = document.createElement("object");
            node.setAttribute("type", "text/html");
            node.setAttribute("data", sourceToShow);
            node.setAttribute("id", "previewObject");
            parent.appendChild(node);
        } else {
            $scope.imageToView = item.url;
        }
    }

    $scope.itemPerRow = 1;
    $scope.allPreviewFolio = '';
    $scope.loadAllPortfolio = function(type) {
        $http.get("php/get_file_list.php?type=" + type)
            .then(function(response) {
                $scope.previewFullFolioCount = response.data.length;
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                if (w > 768) {
                    $scope.itemPerRow = 3;
                }
                if (w < 768 && w > 576) {
                    $Scope.itemPerRow = 2;
                }
                $scope.showedItem = Math.ceil(h / 380) * $scope.itemPerRow;
                $scope.allPreviewFolio = response.data;
                $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);
            });
    }

    $scope.showMorePorfolio = function() {
        $scope.showedItem += $scope.itemPerRow;
        $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);
    }

});