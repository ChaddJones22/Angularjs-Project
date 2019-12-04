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

        function setCurrentRole(user, role){
            user.userRole = role;
            UserService.Update(user)
            .then(function (){
                loadAllUsers();
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