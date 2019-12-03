(function () {
    'use strict';

    angular
        .module('app')
        .controller('EnggController', EnggController);

    EnggController.$inject = ['UserService', '$rootScope'];
    function EnggController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.setRole = setRole;
        $rootScope.roles = ["admin", "engineering"];

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

        function setRole(user){
            UserService.Update(user)
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