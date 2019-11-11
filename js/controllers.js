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
    let wc = 360;

    $http.get("php/get_file_list.php?type=web")
        .then(function(response) {
            $scope.previewFullFolioCount = response.data.length;
            const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (w > 768) {
                itemPerRow = 3;
            }
            if (w < 768 && w > 576) {
                itemPerRow = 2;
                wc = 235;
            }
            $scope.showedItem = 12;
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
    allPreviewFolio = '';
    $scope.imageToView = '';
    let wc = 360;

    $http.get("php/get_file_list.php?type=graphic")
        .then(function(response) {
            $scope.previewFullFolioCount = response.data.length;
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (w > 768) {
                itemPerRow = 3;
            }
            if (w < 768 && w > 576) {
                itemPerRow = 2;
                wc = 235;
            }
            $scope.showedItem = 12;
            allPreviewFolio = response.data;
            for (let i = $scope.previewFullFolioCount - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = allPreviewFolio[i];
                allPreviewFolio[i] = allPreviewFolio[j];
                allPreviewFolio[j] = x;
            }
            previewFullFolio = allPreviewFolio.slice(0, $scope.showedItem);

            which = -1;
            coloums = [0, 0, 0];
            $scope.itemToView = [
                [],
                [],
                []
            ];
            let h = 0;
            console.log(wc);
            previewFullFolio.forEach(
                function(element) {
                    which = coloums.indexOf(Math.min.apply(null, coloums));
                    if (which < 0) { which = 0; }
                    h = Math.round((element.height * wc) / element.width);
                    coloums[which] += h;
                    $scope.itemToView[which].push(element.url)
                    console.log(which + ' - ' + h + ' - ' + element.url);
                    console.log(coloums);
                }
            );
        });

    $scope.showMorePorfolio = function() {
        const temp = $scope.showedItem;
        $scope.showedItem += itemPerRow * 3;
        previewFullFolio = allPreviewFolio.slice(temp + 1, $scope.showedItem);
        previewFullFolio.forEach(
            function(element) {
                which = coloums.indexOf(Math.min.apply(null, coloums));
                if (which < 0) { which = 0; }
                h = Math.round((element.height * (wc - 30)) / element.width);
                coloums[which] += h;
                $scope.itemToView[which].push(element.url)

            }
        );
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
    ui_items = [];
    $scope.uiToView = [
        [],
        []
    ];
    let data;
    $http.get("php/get_file_list.php?type=ui")
        .then(function(response) {
            $scope.ui_cat = [];
            data = response.data;
            response.data.forEach(element => {
                $scope.ui_cat.push(element.category);
            });

            /* set categories unique array */
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
            /* *************************** */
            for (let i = 0; i < $scope.ui_cat.length; i++) {
                let tmp = '';
                for (let j = 0; j < data.length; j++) {
                    if (data[j].category == $scope.ui_cat[i]) {
                        tmp = j == data.length - 1 ? tmp + data[j] + ',' : tmp + data[j];
                    }
                }
                ui_items[i] = tmp;
            }
            $scope.selectedCats.push($scope.ui_cat[Math.ceil(Math.random() * ($scope.ui_cat.length - 1))]);
            which = -1;
            coloums = [0, 0];
            data.forEach(
                function(element) {
                    if ($scope.selectedCats.indexOf(element.category) > -1) {
                        which = coloums.indexOf(Math.min.apply(null, coloums));
                        if (which < 0) { which = 0; }
                        coloums[which] += element.height;
                        $scope.uiToView[which].push(element.url)
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

        data.forEach(
            function(element) {
                if ($scope.selectedCats.indexOf(element.category) > -1) {
                    which = coloums.indexOf(Math.min.apply(null, coloums));
                    if (which < 0) { which = 0; }
                    coloums[which] += element.height;
                    $scope.uiToView[which].push(element.url)
                }
            }
        );
    }

    $scope.showItem = function(type, item) {
        if (document.getElementById("previewObject")) {
            document.getElementById("previewObject").remove();
        }
        $scope.imageToView = item.url;
    }

});

/* ======================================== */
/* ===== SPECIAL ========================== */
app.controller('mwSpPhotoCtrl', function($scope, $http, $window) {
    let itemPerRow = 1;
    allPreviewFolio = '';
    $scope.imageToView = '';
    let wc = 360;

    $http.get("php/get_file_list.php?type=special")
        .then(function(response) {
            $scope.previewFullFolioCount = response.data.length;
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (w > 768) {
                itemPerRow = 3;
            }
            if (w < 768 && w > 576) {
                itemPerRow = 2;
                wc = 235;
            }
            $scope.showedItem = 4 * itemPerRow;
            allPreviewFolio = response.data;
            for (let i = $scope.previewFullFolioCount - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = allPreviewFolio[i];
                allPreviewFolio[i] = allPreviewFolio[j];
                allPreviewFolio[j] = x;
            }
            previewFullFolio = allPreviewFolio.slice(0, $scope.showedItem);

            which = -1;
            coloums = [0, 0, 0];
            $scope.itemToView = [
                [],
                [],
                []
            ];
            let h = 0;
            previewFullFolio.forEach(
                function(element) {
                    which = coloums.indexOf(Math.min.apply(null, coloums));
                    if (which < 0) { which = 0; }
                    h = Math.round((element.height * wc) / element.width);
                    coloums[which] += h;
                    $scope.itemToView[which].push(element.url)
                }
            );

        });

    $scope.showMorePorfolio = function() {
        const temp = $scope.showedItem;
        $scope.showedItem += itemPerRow * 3;
        previewFullFolio = allPreviewFolio.slice(temp + 1, $scope.showedItem);
        previewFullFolio.forEach(
            function(element) {
                which = coloums.indexOf(Math.min.apply(null, coloums));
                if (which < 0) { which = 0; }
                h = Math.round((element.height * wc) / element.width);
                coloums[which] += h;
                $scope.itemToView[which].push(element.url)
            }
        );
    }

    $scope.showItem = function(item) {
        if (document.getElementById("previewObject")) {
            document.getElementById("previewObject").remove();
        }
        $scope.imageToView = item.url;
    }

    $window.scrollTo(0, 0);

});