'use strict';

/**
 * @ngdoc function
 * @name weatherCellApp.controller:userCtrl
 * @description
 * # userCtrl
 * Controller of the weatherCellApp login page
 */

angular.module('weatherCellApp')
    .service('usersService', function ($http, $q) {
        var deffered = $q.defer();
        
        $http.get('json/users.json').then(function (data) {
            deffered.resolve(data);
        });
    
        this.getUsersData = function () {
            return deffered.promise;
        };
    })
    .controller('userCtrl', ['usersService', function ($scope, usersService) {
        
        var promise = usersService.getUsersData();
        promise.then(function (data) {
            $scope.users = data;
            console.log($scope.users);
        });
        
        
    }]);