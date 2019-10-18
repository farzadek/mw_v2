const app = angular.module("mwApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html"
        })
        .when("/portfolio", {
            templateUrl: "pages/portfolio.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.controller('mwCtrl', function($scope, $location, $anchorScroll, $http) {
    $scope.MenuIsOpen = false;
    $scope.$lang = true;
    $scope.text = $scope.$lang ? texts.en : texts.fr;
    $scope.previewWebFolio = '';
    $scope.previewGraphicFolio = '';
    $scope.previewUiFolio = '';
    $scope.previewEmailFolio = '';
    $scope.previewFullFolio = '';
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

    $scope.showItem = function(type, item) {
        if (type == 'web') {
            if (document.getElementById("previewObject")) {
                document.getElementById("previewObject").remove();
            }
            sourceToShow = 'portfolio/web/' + item.title + '/';
            let node = document.createElement("object");
            node.setAttribute("type", "text/html");
            node.setAttribute("data", sourceToShow);
            node.setAttribute("id", "previewObject");
            parent.appendChild(node);
        }
    }

    $scope.showFullFolio = function(type) {
        $http.get("php/get_file_list.php?type=" + type)
            .then(function(response) {
                console.log(response.data);
                $scope.previewFullFolio = response.data;
            });
    }
});