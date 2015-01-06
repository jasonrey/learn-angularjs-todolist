// Register the app class
// To declare a module, 2nd parameter as array is MANDATORY. Calling without second parater act as a "getter" instead.
var App = angular.module('Todolist', []);

// Register the controller class
// Angular infers the dependency from the constructor function argument name
// It is crucial that the variable starts with a $ to indicate that it is a built in service provided by Angular
// Hence it is not possible to directly declare it as function(anyname){}
// However, this conflicts with minification because minifier tends to shorten the variable name whenever possible
// To prevent conflict with minification, Angular notes that you can pass in second parameter as array, that declares all the dependency in plain string, then provide the constructor function with any variable name

// Below 2 lines are equivalent
// App.controller('ListController', function($scope) {$scope.items = []});
// App.controller('ListController', ['$scope', function(scope) {scope.items = []}]);

App.controller('ListController', ['$scope', '$http', function($scope, $http) {

/*
    // Showcases Promise concept where data can be retrieved through server

    // Need to include $q in the dependency

    // Initialises a new deferred object
    var dfd = $q.defer();

    // Binds the (success, error, notify) callbacks to the promise object's then method
    dfd.promise.then(function(data) {
        $scope.items = data;
    });

    // Mimic server call that takes 2 seconds to get the data
    setTimeout(function() {
        // Resolve the deferred object
        dfd.resolve([
            {
                title: 'Todo 1',
                description: 'This is my first todo.',
                datetime: '2014-10-31 12:34:00'
            },
            {
                title: 'Todo 2',
                description: 'This is my second todo.',
                datetime: '2014-12-15 12:34:00'
            },
            {
                title: 'Todo 3',
                description: 'This is my third todo.',
                datetime: '2014-11-16 12:34:00'
            }
        ]);
    }, 2000);
*/

    // $http.get/post/put/delete makes the request accordingly, and returns a promise object, with 2 http specific methods that is only available in $http service: success and error.
    // You can either do $http.get().then(success(), error())
    // Or $http.get().success(function).error(function)
    $http.get('/items').success(function(data) {
        $scope.items = data;
    });

    // Depending on the initial ordering set, even if the data is retrieved AFTER setting the ordering, the ordering still gets obeyed when Angular outputs the data to the page.
    $scope.ordering = 'datetime';
}]);
