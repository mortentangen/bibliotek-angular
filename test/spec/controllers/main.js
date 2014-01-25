'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bibliotekAngularApp'));
  beforeEach(module('ui.bootstrap'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('skal returnere 0 bøker initielt ', function () {
    expect(scope.awesomeThings.length).toBe(0);
  });
});
