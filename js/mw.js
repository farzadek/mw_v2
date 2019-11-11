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
        /*
        .when("/emails", {
            templateUrl: "pages/portfolio-email.html"
        })
        */
        .when("/special", {
            templateUrl: "pages/special-photo.html"
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
    $scope.graphicPrevPosition = 0;
    $scope.uiPrevPosition = 0;
    $scope.instaPosts = '';
    const parent = document.getElementById("jsModalBody");
    let sourceToShow = '';
    let scroll_per_page = 1;


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
        $scope.instaPosts = [];
        response.data.data.forEach(
            function(item){
                if(item.tags.indexOf("mw")>-1){
                    $scope.instaPosts.push(item);
                }
            }
        );

    });
    $scope.nextPreview = function(prevName) {

        switch (prevName) {
            case 'web':
                if ($scope.webPrevPosition > -(6 - scroll_per_page) * ($scope.scroll_prev_item_width + 40)) {
                    $scope.webPrevPosition -= ($scope.scroll_prev_item_width + 40);
                    document.getElementById('web').style.left = $scope.webPrevPosition + 'px';
                }
                break;
            case 'graphic':
                if ($scope.graphicPrevPosition > -(6 - scroll_per_page) * ($scope.scroll_prev_item_width + 40)) {
                    $scope.graphicPrevPosition -= ($scope.scroll_prev_item_width + 40);
                    document.getElementById('graphic').style.left = $scope.graphicPrevPosition + 'px';
                }
                console.log($scope.graphicPrevPosition);
                break;
            case 'ui':
                if ($scope.uiPrevPosition > -(6 - scroll_per_page) * ($scope.scroll_prev_item_width + 40)) {
                    $scope.uiPrevPosition -= ($scope.scroll_prev_item_width + 40);
                    document.getElementById('ui').style.left = $scope.uiPrevPosition + 'px';
                }
                break;
        }
    }

    $scope.prevPreview = function(prevName) {
        switch (prevName) {
            case 'web':
                if ($scope.webPrevPosition <= -($scope.scroll_prev_item_width + 40)) {
                    $scope.webPrevPosition += ($scope.scroll_prev_item_width + 40);
                    document.getElementById('web').style.left = $scope.webPrevPosition + 'px';
                }
                break;
            case 'graphic':
                if ($scope.graphicPrevPosition <= -($scope.scroll_prev_item_width + 40)) {
                    $scope.graphicPrevPosition += ($scope.scroll_prev_item_width + 40);
                    document.getElementById('graphic').style.left = $scope.graphicPrevPosition + 'px';
                }
                break;
            case 'ui':
                if ($scope.uiPrevPosition <= -($scope.scroll_prev_item_width + 40)) {
                    $scope.uiPrevPosition += ($scope.scroll_prev_item_width + 40);
                    document.getElementById('ui').style.left = $scope.uiPrevPosition + 'px';
                }
                break;
        }
    }

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
            _url = 'images/portfolio/' + type + '/' + item.url;
            $scope.imageToView = _url;
        }
    }

    $scope.init = function() {
        let wdt = document.getElementById('web-container').clientWidth;
        if (wdt > 768) { scroll_per_page = 3 } else if (wdt < 768 && wdt > 576) { scroll_per_page = 2 } else { scroll_per_page = 1 }
        $scope.scroll_prev_item_width = (document.getElementById('web-container').clientWidth / scroll_per_page - 40);
    };

});