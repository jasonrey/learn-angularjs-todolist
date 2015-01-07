// Create a new module that holds all the controllers
var Controllers = angular.module('Controllers', ['ngResource']);

// Create a custom service (like a class, but used within this scope) with ngResource to perform REST calls
// Although we can actually use $resource directly, wrapping it up in a custom service allows us to give it custom name, in which can be then injected into other modules if needed
// This is a high level $http service
// ngResource is needed for this, hence we define this dependency in the module declaration above
Controllers.factory('Items', ['$resource', function($resource) {
    // Prefiing a parameter value with @ to extract this key from the data object provided when calling $resource method. See below in Items.get
    return $resource('api/items/:id', {id: '@id'}, {
        // Custom methods that can be invoked by calling Items.*
        query: {
            method: 'GET',
            params: {
                // We define this as null to indicate this parameter is not needed
                // This is because we are sharing 1 single route of api/items and api/items/:id
                // In this case, when we are getting the list, the :id should not be there for it to point to the server's api/items route
                id: null
            },
            // This indicates that the api will return a list of object (instances) of Items
            isArray: true
        }
    })
}]);

// Creates a filter provider with a custom name
// It uses dependency injection markup, hence if there are any dependency needed:
// Controllers.filter('filterItems', [dependency, function(dependency) {}]);
// It should return a function that always receives the targetted filter items as the first parameter, while the subsequent parameter depends on declaration
// filterItems:query, this makes query the second argument
Controllers.filter('filterItems', function() {
    return function(input, query) {
        if (input === undefined) {
            return;
        }

        if (query === undefined) {
            return input;
        }

        var result = [],
            regex = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i');

        $.each(input, function(i, item) {
            if (item.title.search(regex) >= 0) {
                result.push(item);
            }
        });

        return result;
    };
});

// Register the controller class
// Angular infers the dependency from the constructor function argument name
// It is crucial that the variable starts with a $ to indicate that it is a built in service provided by Angular
// Hence it is not possible to directly declare it as function(anyname){}
// However, this conflicts with minification because minifier tends to shorten the variable name whenever possible
// To prevent conflict with minification, Angular notes that you can pass in second parameter as array, that declares all the dependency in plain string, then provide the constructor function with any variable name

// Below 2 lines are equivalent
// App.controller('ItemsController', function($scope) {$scope.items = []});
// App.controller('ItemsController', ['$scope', function(scope) {scope.items = []}]);

Controllers.controller('ItemsController', ['$scope', 'Items', function($scope, Items) {

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
                datetime: '2014-10-31 12:34:00'
            },
            {
                title: 'Todo 2',
                datetime: '2014-12-15 12:34:00'
            },
            {
                title: 'Todo 3',
                datetime: '2014-11-16 12:34:00'
            }
        ]);
    }, 2000);
*/
/*
    // $http.get/post/put/delete makes the request accordingly, and returns a promise object, with 2 http specific methods that is only available in $http service: success and error.
    // You can either do $http.get().then(success(), error())
    // Or $http.get().success(function).error(function)
    $http.get('/api/items').success(function(data) {
        $scope.items = data;
    });
*/

    // Now instead of injecting $http service, we use our custom created service Items, and declaring it as a dependency of this controller
    $scope.items = Items.query();

    // Depending on the initial ordering set, even if the data is retrieved AFTER setting the ordering, the ordering still gets obeyed when Angular outputs the data to the page.
    $scope.ordering = 'datetime';
}]);

// Item controller needs to access the route params defined by :param in the $routeProvider, hence we inject the depdency of $routeParams
Controllers.controller('ItemController', ['$scope', '$routeParams', 'Items', function($scope, $routeParams, Items) {
    // This is equivalent to
    // $scope.item = Items.get({id: $routeParams.id})
    // Because we specify that the default parameter as id: '@id', this means the method will automatically search for the key 'id' from the value provided, in which in this case, is $routeParams.id
    $scope.item = Items.get($routeParams);
}]);
