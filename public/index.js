// Register the app class
// To declare a module, 2nd parameter as array is MANDATORY. Calling without second parater act as a "getter" instead.
// Now we declare the app to depend on ngRoute and Controllers (in which Controllers is a module coming from controllers.js that defines all the controller classes)
var App = angular.module('Todolist', ['ngRoute', 'Controllers']);

// Using the config() method, we request the $routeProvider to be injected into our config function and use the $routeProvider.when() method to define our routes.
App.config(['$routeProvider', function($routeProvider) {
    // Define template and controller needed for each address
    // templateUrl can be a static html page that is already pre-rendered (/partials/template.html)
    // or it be a path that makes a GET call to the server that returns a template (server side templating system)
    // All the links are build on top of hash fragment, eg: base/#/items
    $routeProvider
        .when('/items', {
            templateUrl: 'template/items',
            controller: 'ItemsController'
        })
        .when('/items/:id', {
            templateUrl: 'template/item',
            controller: 'ItemController'
        })
        .otherwise({
            redirectTo: '/items'
        });
}]);
