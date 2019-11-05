/* ======================================== */
/* ===== EMAIL ============================ */
app.controller('mwEmailCtrl', function($scope, $http, $window) {
    $scope.allPreviewFolio = '';
    $scope.imageToView = '';
    let data;
    $http.get("php/get_file_list.php?type=email")
        .then(function(response) {
            $scope.ui_cat = [];
            data = response.data;
            response.data.forEach(element => {
                $scope.ui_cat.push(element.category);
            });
            $scope.ui_items1 = [];
            $scope.ui_items2 = [];
            let y = true;
            data.forEach(
                function(element) {
                    if (y == true) $scope.ui_items1.push(element);
                    else $scope.ui_items2.push(element);
                    y = !y;

                }
            );

        });
    $window.scrollTo(0, 0);
});

/* ======================================== */
/* ===== WEB ============================== */
app.controller('mwWebCtrl', function($scope, $http, $window) {

    let itemPerRow = 1;
    $scope.allPreviewFolio = '';
    $scope.imageToView = '';
    const parent = document.getElementById("jsModalBody");

    $http.get("php/get_file_list.php?type=web")
        .then(function(response) {
            $scope.previewFullFolioCount = response.data.length;
            const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            if (w > 768) {
                itemPerRow = 3;
            }
            if (w < 768 && w > 576) {
                itemPerRow = 2;
            }
            $scope.showedItem = Math.ceil(h / 380) * itemPerRow;
            $scope.allPreviewFolio = response.data;
            $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);
        });
    $window.scrollTo(0, 0);

    $scope.showMorePorfolio = function() {
        $scope.showedItem += $scope.itemPerRow * 3;
        $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);
    }

    $scope.showItem = function(item) {
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

});

/* ======================================== */
/* ===== GRAPHIC ==========================*/
app.controller('mwGraphicCtrl', function($scope, $http, $window) {
    let itemPerRow = 1;
    $scope.allPreviewFolio = '';
    $scope.imageToView = '';

    $http.get("php/get_file_list.php?type=graphic")
        .then(function(response) {
            $scope.previewFullFolioCount = response.data.length;
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            if (w > 768) {
                itemPerRow = 3;
            }
            if (w < 768 && w > 576) {
                itemPerRow = 2;
            }
            $scope.showedItem = 4 * itemPerRow;
            $scope.allPreviewFolio = response.data;
            for (let i = $scope.previewFullFolioCount - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = $scope.allPreviewFolio[i];
                $scope.allPreviewFolio[i] = $scope.allPreviewFolio[j];
                $scope.allPreviewFolio[j] = x;
            }
            $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);
            $scope.previewFullFolio1 = [];
            $scope.previewFullFolio2 = [];
            $scope.previewFullFolio3 = [];

            for (i = 0; i < $scope.previewFullFolio.length; i += itemPerRow) {
                $scope.previewFullFolio1.push($scope.allPreviewFolio[i]);
                if (i + 1 < $scope.allPreviewFolio.length) {
                    $scope.previewFullFolio2.push($scope.allPreviewFolio[i + 1]);
                }
                if (i + 2 < $scope.allPreviewFolio.length) {
                    $scope.previewFullFolio3.push($scope.allPreviewFolio[i + 2]);
                }
            }
        });

    $scope.showMorePorfolio = function() {
        const temp = $scope.showedItem;
        $scope.showedItem += itemPerRow * 3;
        $scope.previewFullFolio = $scope.allPreviewFolio.slice(0, $scope.showedItem);
        for (i = temp; i < $scope.previewFullFolio.length; i += itemPerRow) {
            $scope.previewFullFolio1.push($scope.allPreviewFolio[i]);
            if (i + 1 < $scope.allPreviewFolio.length) {
                $scope.previewFullFolio2.push($scope.allPreviewFolio[i + 1]);
            }
            if (i + 2 < $scope.allPreviewFolio.length) {
                $scope.previewFullFolio3.push($scope.allPreviewFolio[i + 2]);
            }
        }
    }

    $scope.showItem = function(item) {
        $scope.imageToView = item.url;
    }
    $window.scrollTo(0, 0);

});

/* ======================================== */
/* ========== UI ==========================*/
app.controller('mwUiCtrl', function($scope, $http, $window) {
    $scope.allPreviewFolio = '';
    $scope.imageToView = '';
    $scope.selectedCats = [];
    $scope.ui_items = [];
    let data;
    $http.get("php/get_file_list.php?type=ui")
        .then(function(response) {
            $scope.ui_cat = [];
            data = response.data;
            response.data.forEach(element => {
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

            for (let i = 0; i < $scope.ui_cat.length; i++) {
                let tmp = '';
                for (let j = 0; j < data.length; j++) {
                    if (data[j].category == $scope.ui_cat[i]) {
                        tmp = j == data.length - 1 ? tmp + data[j] + ',' : tmp + data[j];
                    }
                }
                $scope.ui_items[i] = tmp;
            }
            $scope.selectedCats.push($scope.ui_cat[Math.ceil(Math.random() * ($scope.ui_cat.length - 1))]);
            $scope.ui_items1 = [];
            $scope.ui_items2 = [];
            let y = true;
            data.forEach(
                function(element) {
                    if ($scope.selectedCats.indexOf(element.category) > -1) {
                        if (y == true) $scope.ui_items1.push(element);
                        else $scope.ui_items2.push(element);
                        y = !y;
                    }
                }
            );

        });
    $window.scrollTo(0, 0);

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
        data.forEach(
            function(element) {
                if ($scope.selectedCats.indexOf(element.category) > -1) {
                    if (y == true) $scope.ui_items1.push(element);
                    else $scope.ui_items2.push(element);
                    y = !y;
                }
            }
        );
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
            $scope.imageToView = item.url;
        }
    }

});