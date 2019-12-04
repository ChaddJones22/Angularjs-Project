(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'

            })
            
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/admin', {
                controller: 'AdminController',
                templateUrl: 'adminViews/admin/admin.view.html',
                controllerAs: 'vm'
            })
            
            .when('/engineering', {
                controller: 'AdminController',
                templateUrl: 'adminViews/engineering/engineering.view.html',
                controllerAs: 'vm'
            })

            .when('/finance', {
                controller: 'AdminController',
                templateUrl: 'adminViews/finance/finance.view.html',
                controllerAs: 'vm'
            })

            .when('/sales', {
                controller: 'AdminController',
                templateUrl: 'adminViews/sales/sales.view.html',
                controllerAs: 'vm'
            })

            .when('/human', {
                controller: 'AdminController',
                templateUrl: 'adminViews/humanRes/hr.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();