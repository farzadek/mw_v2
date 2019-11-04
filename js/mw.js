const app = angular.module("mwApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html"
        })
        .when("/portfolio-web", {
            templateUrl: "pages/portfolio-web.html"
        })
        .when("/ui", {
            templateUrl: "pages/portfolio-ui.html"
        })
        .when("/portfolio", {
            templateUrl: "pages/portfolio.html"
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
        //console.log(response.data.data);
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
                $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);/*
                if (type == 'ui') {
                    $scope.ui_cat = [];
                    $scope.allPreviewFolio.forEach(element => {
                        $scope.ui_cat.push(element.category);
                    });
                    const names = $scope.ui_cat;

                    function removeDups(names) {
                        let unique = {};
                        names.forEach(function(i) {
                            if (!unique[i]) {
                                unique[i] = true;
                            }
                        });
                        return Object.keys(unique);
                    }

                    $scope.ui_cat = removeDups(names);
                    $scope.selectedCats = [];
                    $scope.ui_items = [];

                    for (let i = 0; i < $scope.ui_cat.length; i++) {
                        let tmp = '';
                        for (let j = 0; j < $scope.allPreviewFolio.length; j++) {
                            if ($scope.allPreviewFolio[j].category == $scope.ui_cat[i]) {
                                tmp = j == $scope.allPreviewFolio.length - 1 ? tmp + $scope.allPreviewFolio[j] + ',' : tmp + $scope.allPreviewFolio[j];
                            }
                        }
                        $scope.ui_items[i] = tmp;
                    }
                    $scope.selectedCats.push($scope.ui_cat[Math.ceil(Math.random() * ($scope.ui_cat.length - 1))]);
                    $scope.ui_items1 = [];
                    $scope.ui_items2 = [];
                    let y = true;
                    $scope.allPreviewFolio.forEach(
                        function(element) {
                            if ($scope.selectedCats.indexOf(element.category) > -1) {
                                if (y == true) $scope.ui_items1.push(element);
                                else $scope.ui_items2.push(element);
                                y = !y;
                            }
                        }
                    );
                }*/
            });
        $window.scrollTo(0, 0);
    }

    $scope.showMorePorfolio = function() {
        $scope.showedItem += $scope.itemPerRow * 3;
        $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);
    }/*
    $scope.catSelected = function(checkedItem) {
        var idx = $scope.selectedCats.indexOf(checkedItem);

        // Is currently selected
        if (idx > -1) {
            $scope.selectedCats.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.selectedCats.push(checkedItem);
        }
        $scope.ui_items1 = [];
        $scope.ui_items2 = [];
        y = true;
        $scope.allPreviewFolio.forEach(
            function(element) {
                if ($scope.selectedCats.indexOf(element.category) > -1) {
                    if (y == true) $scope.ui_items1.push(element);
                    else $scope.ui_items2.push(element);
                    y = !y;
                }
            }
        );
    }
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        console.log(document.getElementById('ui-container').clientHeight);
        $scope.ui_container_height = document.getElementById('ui-container').clientHeight;
    });*/
});

