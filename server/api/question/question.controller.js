/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  upsert
 * PATCH   /api/questions/:id          ->  patch
 * DELETE  /api/questions/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Question from './question.model';

var auth = require('../../auth/auth.service');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Questions
export function index(req, res) {
  return Question.find()
    .sort({
      createdAt: -1
    })
    .limit(20)
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Question in the DB
export function create(req, res) {
  req.body.user = req.user;
  return Question.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Question in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Question.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    })
    .exec()
    .then(handleUnauthorized(req, res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Question from the DB
export function destroy(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function handleUnauthorized(req, res) {
  return function(entity) {
    if (!entity) {
      return null;
    }
    if(auth.hasRole('admin')) { //admin is always authorized
        return entity;
    }
    if (entity.user._id.toString() !== req.user._id.toString()) {
      res.send(403).end();
      return null;
    }
    return entity;
  }
}

export function createAnswer(req, res) {
  req.body.user = req.user;
  Question.update({
    _id: req.params.id
  }, {
    $push: {
      answers: req.body
    }
  }, function(err, num) {
    if (err) {
      return handleError(res)(err);
    }
    if (num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
};

export function destroyAnswer(req, res) {
  Question.update({
    _id: req.params.id
  }, {
    $pull: {
      answers: {
        _id: req.params.answerId,
        //'user': req.user._id     //both admin and owner can delete
      }
    }
  }, function(err, num) {
    if (err) {
      return handleError(res)(err);
    }
    if (num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
};

export function updateAnswer(req, res) {
  Question.update({
    _id: req.params.id,
    'answers._id': req.params.answerId
  }, {
    'answers.$.content': req.body.content,
    'answers.$.user': req.user.id
  }, function(err, num) {
    if (err) {
      return handleError(res)(err);
    }
    if (num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
};
