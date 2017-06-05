'use strict';


var app = angular.module('weatherCellApp');

app.factory('LoginService', function () {
    //    var log = 'test';
    //    var pass = 'test';
    var isAuthenticated = false;
    var currentUser = {};
    var users = [{
        "listeVilleFavortie": [
        "Lyon",
        "Marseille",
        "Dijon"
      ],
        "login": "aa@aa.aa",
        "password": "aa"
  }, {
        "listeVilleFavortie": [
        "Chatellerault",
        "Paris",
        "Lille",
        "Nantes",
        "Bordeaux"
      ],
        "login": "bb@bb.bb",
        "password": "bb"
  }, {
        "listeVilleFavortie": [
        "Strasbourg",
        "Mertz",
        "Nancy",
        "Amiens",
        "Bourges",
        "Tours"
      ],
        "login": "cc@cc.cc",
        "password": "cc"
  }];
    return {
        login: function (username, password) {
            //recheche du current user
            currentUser = {};
            isAuthenticated = false;
            for (var i = 0; i <= 2; i++) {
                if (username === users[i].login && password === users[i].password) {
                    currentUser = users[i];
                    isAuthenticated = true;
                }
            }
            return currentUser;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        },
        getCurrentUser: function () {
            return currentUser;
        }
    };

});

app.controller('LoginController', function ($scope, $location, LoginService) {

    $scope.formSubmit = function () {
        var user = LoginService.login($scope.username, $scope.password);
        if (LoginService.isAuthenticated()) {
            $location.path('/home');
        } else {
            $scope.error = 'Incorrect username/password !';
        }
    };

});

app.factory('WeatherService', function ($http) {
        return {
            getWeatherData: function (cityName, callbackFunc) {
                console.log($http);
                $http({
                        method: 'get',
                        url: 'http://api.openweathermap.org/data/2.5/weather?q=%5b' + cityName + '%5d,fr&appid=3d32e5ea54d83c5d53afbeab1e165307'
                    })
                    .then(function (data, status, headers, config) {
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                        console.log("succés :", data);
                    });
            }

        };
    })
    .controller('HomeController', function ($scope, WeatherService, LoginService) {
        $scope.showMe = false;
        var user = LoginService.getCurrentUser();
        $scope.listVille = user.listeVilleFavortie;

        // onclick event on city --> get CityName and get Data from Weather API
        $scope.testEventCLick = function (e) {
            var cityName = e.currentTarget.innerHTML;
            $scope.showMe = !$scope.showMe;
            $scope.weather = null;
            WeatherService.getWeatherData(cityName, function (dataResponse) {
                var weather = [];
                angular.forEach(dataResponse, function (value) {
                    weather.push(value);
                });
                $scope.weather = weather[0];
                console.log(weather);
            });
        };
    });

app.directive("weatherDetail", function () {
    return {
        restrict: 'E',
        templateUrl: 'weatherCity.html'
    };
});