'use strict';

describe('Component: QuestionsShowComponent', function() {
  // load the controller's module
  beforeEach(module('paizaqaApp.questionsShow'));

  var QuestionsShowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuestionsShowComponent = $componentController('questionsShow', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
