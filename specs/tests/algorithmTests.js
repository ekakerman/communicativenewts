'use strict';

describe('Services', function () {
  beforeEach(module('app.algorithm'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));


  describe('Algorithm', function () {
    var $httpBackend, Algorithm;

    beforeEach(inject(function (_$httpBackend_, _Algorithm_) {
      $httpBackend = _$httpBackend_;
      Algorithm = _Algorithm_;
    }));

    it('should exist', function () {
      var Algorithm = true;
      expect(Algorithm).to.exist;
    });

    it('should have a method `checkEvent`', function () {
      expect(Algorithm.checkEvent).to.be.a('function');
    });

    it('should have a method `makeSchedule`', function () {
      expect(Algorithm.makeSchedule).to.be.a('function');
    });

    it('should have a method `displaySchedule`', function () {
      expect(Algorithm.displaySchedule).to.be.a('function');
    });

    it('should have a method `makeAPI`', function () {
      expect(Algorithm.makeAPI).to.be.a('function');
    });

  });

});

