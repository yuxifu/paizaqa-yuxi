'use strict';

describe('Component: QuestionsCreateComponent', function() {
  // load the controller's module
  beforeEach(module('paizaqaApp.questionsCreate'));

  var QuestionsCreateComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuestionsCreateComponent = $componentController('questionsCreate', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
