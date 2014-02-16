'use strict';

var bokApp = angular.module("bibliotekAngularApp");

bokApp.controller('MainCtrl', ['$scope', '$location', 'bokService', function($scope, $location, bokService) {
    $scope.boker = bokService.boker();
    $scope.velgBok = function(bokId) {
        $location.path('/bok/' + bokId);
    }
}]);

bokApp.controller('VisBokCtrl', ['$scope', '$location', '$routeParams', 'bokService', function($scope, $location, $routeParams, bokService) {
    $scope.editorEnabled = false;
    $scope.bok = bokService.getBok($routeParams.id);
    $scope.editer = function() {
        $location.path('/bok/'+$routeParams.id+'/edit');
    }
}]);

bokApp.controller('EditerBokCtrl', ['$scope', '$location', '$routeParams', 'bokService', function($scope, $location, $routeParams, bokService) {
    $scope.editorEnabled = true;

    $scope.bok = bokService.getBok($routeParams.id);
    var bokFoerEditering = angular.copy($scope.bok);

    $scope.lagreBok = function() {
        bokService.oppdaterBok($routeParams.id);
        $location.path('/');
    }
    $scope.validateInput = function(field) {
        return field.$invalid && field.$dirty
    }
    $scope.avbryt = function() {
        $scope.bok = angular.copy(bokFoerEditering);
    }
}]);

bokApp.controller('NyBokCtrl', ['$scope', '$location', '$routeParams', 'bokService', function($scope, $location, $routeParams, bokService) {
    $scope.editorEnabled = true;

    $scope.bok = {};
    $scope.lagreBok = function() {
        bokService.lagreBok($scope.bok);
        $location.path('/');
    }
    $scope.validateInput = function(field) {
        return field.$invalid && field.$dirty
    }
    $scope.avbryt = function() {
        $location.path('/');
    }
}]);

bokApp.controller('HeaderController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        console.log($location.path());
        return viewLocation === $location.path();
    }
}]);

// SERVICES
bokApp.service('bokService', ['$firebase' , function($firebase) {
    var ref = new Firebase("https://popping-fire-1561.firebaseio.com/");
    var boker = $firebase(ref);

    return {
        boker: function () {
            return boker;
        },
        lagreBok: function(bok) {
            var ref = boker.$add(bok);
        },
        oppdaterBok: function(id) {
            var ref = boker.$save(id);
        },
        getBok: function(id) {
            return boker[id];
        }
    };
}]);