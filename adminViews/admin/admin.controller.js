(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['UserService', '$rootScope'];
    function AdminController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.setCurrentRole = setCurrentRole;
        vm.loadCurrentRole = loadCurrentRole
        $rootScope.role = ["BASIC", "ADMIN", "FINANCE_ADMIN", "SALES_ADMIN", "HR_ADMIN", "ENGG_ADMIN"];

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function setCurrentRole(user,role){
            UserService.SetRole(user,role)
            .then(function (user,role){
                vm.user = user;
                vm.user.userRole = role;
                loadAllUsers();
            });
        }

        function loadCurrentRole(role){
            UserService.GetRole(role)
            .then(function (user){
                vm.user = user;
            });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();