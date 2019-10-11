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

app.controller('mwCtrl', function($scope, $location, $anchorScroll) {
    $scope.MenuIsOpen = false;
    $scope.$lang = true;
    $scope.text = $scope.$lang ? texts.en : texts.fr;

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