app.controller('mwUiCtrl', function($scope, $http, $window) {
    $scope.allPreviewFolio = '';
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
                    $scope.selectedCats = [];
                    $scope.ui_items = [];

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


});