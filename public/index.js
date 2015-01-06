// Register the app class
// To declare a module, 2nd parameter as array is MANDATORY. Calling without second parater act as a "getter" instead.
var App = angular.module('Todolist', []);

// Register the controller class
App.controller('ListController', function($scope) {
    $scope.items = [
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
    ];

    $scope.ordering = 'title';
});
