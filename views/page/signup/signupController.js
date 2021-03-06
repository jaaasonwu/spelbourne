define(['app'], function (app) {
    app.controller('signupController', ['$scope', '$http', '$location', 'adminService', '$routeParams', '$rootScope',
        function ($scope, $http, $location, adminService, $routeParams, $rootScope) {
            // you can't go to login page or sign up page once you logged in
            if ($rootScope.username) {
                $location.path('/');
            }
            $scope.ret = $routeParams.ret || '/';
            // Should not be return to login and signUp anymore
            if ($scope.ret === '/login' || $scope.ret === '/signup') {
                $scope.ret = '/';
            }
            // Dummy profile
            $scope.profile = {
                phone: "",
                imagePath: "",
                name: ""
            };
            $scope.successCallback = function(res) {
                adminService.getAdmin(function () {
                    $location.path($scope.ret);
                });
            };
            $scope.failureCallback = function(res) {
                console.log(res);
                $scope.errMsg = res.data.msg[0];
            };
            $scope.signUp = adminService.signUp;
            $scope.google = adminService.google;
            $scope.facebook = adminService.facebook;
        }]
    );
});
