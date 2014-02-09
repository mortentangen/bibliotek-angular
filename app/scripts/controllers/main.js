'use strict';

var bokApp = angular.module("bibliotekAngularApp");

bokApp.controller('MainCtrl', ['$scope', '$location', 'bokService', function($scope, $location, bokService) {
    $scope.boker = bokService.boker();
    $scope.velgBok = function(bokId) {
        $location.path('/bok/' + bokId);
    }
}]);

bokApp.controller('BokCtrl', ['$scope', '$location', '$routeParams', 'bokService', function($scope, $location, $routeParams, bokService) {

    $scope.bok = {};
    var bokFoerEditering = {};
    if ($routeParams.id) {
        $scope.bok = bokService.getBok($routeParams.id);
        bokFoerEditering = angular.copy($scope.bok);
    }

    $scope.lagreBok = function() {
        bokService.lagreBok($scope.bok);
        $location.path('/');
    }
    $scope.validateInput = function(field) {
        return field.$invalid && field.$dirty
    }
    $scope.avbryt = function() {
        $scope.bok = bokFoerEditering;
    }
    $scope.editer = function() {
        bokFoerEditering = angular.copy($scope.bok);
    }
    $scope.editorEnabled = true;
}]);

bokApp.controller('HeaderController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    }
}]);

// SERVICES
bokApp.service('bokServiceMock', function() {
    var idSekvens = 0;
    var boker = [
        {id: idSekvens++, tittel:'Frost', forfatter:'Jan Banan'},
        {id: idSekvens++, tittel:'The Hobbit', forfatter:'Per Persen'},
        {id: idSekvens++, tittel:'Lone Survivor', forfatter:'Ola Normann'},
        {id: idSekvens++, tittel:'The Hunger Games: Catching Fire', forfatter:'Hans Hansen'}
    ];

    return {
        boker: function () {
            return boker;
        },
        lagreBok: function(bok) {
            bok.id = idSekvens++;
            boker.push(bok);
        },
        getBok: function(id) {
            var resultat = $.grep(boker, function(e) {return e.id == id});
            if (resultat.length == 1) {
                return resultat[0];
            }
            throw "fant ingen unik bok med id " + id;
        }
    };
});

bokApp.service('bokService', ['$firebase', function($firebase) {
    var ref = new Firebase("https://popping-fire-1561.firebaseio.com/");
    var boker = $firebase(ref);

    return {
        boker: function () {
            return boker;
        },
        lagreBok: function(bok) {
            var ref = boker.$add(bok);
        },
        getBok: function(id) {
            return boker[id];
        }
    };
}]);