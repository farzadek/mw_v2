app.service('mwService', function() {
    this.loadPortfolioData = function(type) {
        $http.get("php/get_file_list.php")
            .then(function(response) {
                $scope.myWelcome = response.data;
            });
    };

});
/*
app.service('mwService', function($http, $q) {

    return ({
        loadInstagram: () => {
            var token = '3648306560.1c1827a.4a2783080b7646dcac204724ad4a63fc';
            $.ajax({
                url: 'https://api.instagram.com/v1/users/self/media/recent',
                dataType: 'jsonp',
                type: 'GET',
                data: { access_token: token },
                success: function(data) {
                    return data;
                },
                error: function() {
                    return 'error'
                }
            });
        },

        loadPortfolioData: (type) => {

        }
    });
});
*/