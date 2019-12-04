(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;
        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    if (vm.password == "admin" && vm.username == "admin") {$location.path('/admin')}
                    else if (response.currentRole == "ADMIN") {
                        $location.path('/admin')
                    }
                    else if (response.currentRole == "ENGG_ADMIN") {
                        $location.path('/engineering')
                    }
                    else if (response.currentRole == "FINANCE_ADMIN") {
                        $location.path('/finance')
                    }
                    else if (response.currentRole == "SALES_ADMIN") {
                        $location.path('/sales')
                    }
                    else if (response.currentRole == "HR_ADMIN") {
                        $location.path('/human')
                    }
                    else {$location.path('/')}
                } 
                else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
})();