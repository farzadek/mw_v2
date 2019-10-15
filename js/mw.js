const app = angular.module("mwApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html"
        })
        .otherwise("/blue", {
            templateUrl: "home.html"
        });
});

app.controller('mwCtrl', function($scope, $location, $anchorScroll, $http) {
    $scope.MenuIsOpen = false;
    $scope.$lang = true;
    $scope.text = $scope.$lang ? texts.en : texts.fr;
    $scope.previewWebFolio = '';
    $scope.webPrevPosition = 0;
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

    $http.get("php/get_file_list.php")
        .then(function(response) {
            $scope.previewWebFolio = response.data;
        });

    $scope.nextPreview = function(prevName) {
        switch (prevName) {
            case 'web':
                if ($scope.webPrevPosition > -3 * 312) {
                    $scope.webPrevPosition -= 312;
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
        }
        document.getElementById(prevName).style.left = $scope.webPrevPosition + 'px';
    }

    $scope.showItem = function(type, item) {
        if (type == 'web') {
            console.log(parent.getElementsByTagName("object").length);
            if (parent.getElementsByTagName("object").length > 0) {
                parent.removeChild(getElementsByTagName("object"));
            }
            sourceToShow = 'portfolio/web/' + item.title + '/';
            let node = document.createElement("object");
            node.setAttribute("type", "text/html");
            node.setAttribute("data", sourceToShow);
            parent.appendChild(node);
        }
    }

});

/*
      var token = '3648306560.1c1827a.4a2783080b7646dcac204724ad4a63fc';
      $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token},
        success: function(data){
          for( x in data.data ){
            if( data.data[x].tags.indexOf("montrealweb")>-1 ){
              $('#instafeed').append('<div><img src="'+data.data[x].images.low_resolution.url+'" alt="instagram post image"></div>');
            }
          }
        },
        error: function(data){
          console.log(data);
        }
      });

*/