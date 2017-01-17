'use strict';

var app = require('../..');
import request from 'supertest';

var newQuestion;

describe('Question API:', function() {
  describe('GET /api/questions', function() {
    var questions;

    beforeEach(function(done) {
      request(app)
        .get('/api/questions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          questions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(questions).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/questions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/questions')
        .send({
          title: 'New Question',
          content: 'This is the brand new question!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQuestion = res.body;
          done();
        });
    });

    it('should respond with the newly created question', function() {
      expect(newQuestion.title).to.equal('New Question');
      expect(newQuestion.content).to.equal('This is the brand new question!!!');
    });
  });

  describe('GET /api/questions/:id', function() {
    var question;

    beforeEach(function(done) {
      request(app)
        .get(`/api/questions/${newQuestion._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          question = res.body;
          done();
        });
    });

    afterEach(function() {
      question = {};
    });

    it('should respond with the requested question', function() {
      expect(question.title).to.equal('New Question');
      expect(question.content).to.equal('This is the brand new question!!!');
    });
  });

  describe('PUT /api/questions/:id', function() {
    var updatedQuestion;

    beforeEach(function(done) {
      request(app)
        .put(`/api/questions/${newQuestion._id}`)
        .send({
          title: 'Updated Question',
          content: 'This is the updated question!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQuestion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuestion = {};
    });

    it('should respond with the updated question', function() {
      expect(updatedQuestion.title).to.equal('Updated Question');
      expect(updatedQuestion.content).to.equal('This is the updated question!!!');
    });

    it('should respond with the updated question on a subsequent GET', function(done) {
      request(app)
        .get(`/api/questions/${newQuestion._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let question = res.body;

          expect(question.title).to.equal('Updated Question');
          expect(question.content).to.equal('This is the updated question!!!');

          done();
        });
    });
  });

  describe('PATCH /api/questions/:id', function() {
    var patchedQuestion;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/questions/${newQuestion._id}`)
        .send([
          { op: 'replace', path: '/title', value: 'Patched Question' },
          { op: 'replace', path: '/content', value: 'This is the patched question!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQuestion = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQuestion = {};
    });

    it('should respond with the patched question', function() {
      expect(patchedQuestion.title).to.equal('Patched Question');
      expect(patchedQuestion.content).to.equal('This is the patched question!!!');
    });
  });

  describe('DELETE /api/questions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/questions/${newQuestion._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when question does not exist', function(done) {
      request(app)
        .delete(`/api/questions/${newQuestion._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
