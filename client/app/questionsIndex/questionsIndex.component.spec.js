'use strict';

describe('Component: QuestionsIndexComponent', function() {
  // load the controller's module
  beforeEach(module('paizaqaApp.questionsIndex'));

  var QuestionsIndexComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuestionsIndexComponent = $componentController('questionsIndex', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
