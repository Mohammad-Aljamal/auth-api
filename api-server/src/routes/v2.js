'use strict';

const express = require('express');
const dataModules = require('../models');
const permissions = require('../middleware/acl')
const bearer = require('../middleware/bearer')

const router1 = express.Router();

router1.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router1.get('/:model', bearer, permissions('read'), handleGetAll);
router1.get('/:model/:id', bearer, permissions('read'), handleGetOne);
router1.post('/:model', bearer, permissions('create'), handleCreate);
router1.put('/:model/:id', bearer, permissions('update'), handleUpdate);
router1.delete('/:model/:id', bearer, permissions('Delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router1;
