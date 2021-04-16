'use strict';

const express = require('express');
const { Paragraph } = require('../data');

const route = express.Router();

const OK = { ok: true };

route.get('/:slug', async (req, res) => {
  const paragraph = new Paragraph(req.params.slug);
  try {
    res.status(200).json(await paragraph.fetch());
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post('/:slug', async (req, res) => {
  const paragraph = new Paragraph(req.params.slug);
  try {
    await paragraph.create(req.body.numSentences);
  } catch (error) {
    res.status(404).send(error.message);
    return
  }

  res.status(200).json(OK);
})

route.delete('/:slug', async (req, res) => {
  const paragraph = new Paragraph(req.params.slug);
  try {
    await paragraph.delete();
  } catch (error) {
    res.status(404).send(error.message);
    return
  }

  res.status(200).json(OK);
})

route.post('/:slug/sentence/:idx', async (req, res) => {
  const paragraph = new Paragraph(req.params.slug);
  try {
    await paragraph.fetch()
  } catch (error) {
    res.status(404).send(error.message);
    return
  }

  try {
    await paragraph.addSentence(req.params.idx, req.body.sentence);
  } catch (error) {
    res.status(400).send(error.message);
    return
  }

  res.status(200).json(OK);
})

route.delete('/:slug/sentence/:idx', async (req, res) => {
  const paragraph = new Paragraph(req.params.slug);

  try {
    await paragraph.deleteSentence(req.params.idx);
  } catch (error) {
    res.status(400).send(error.message);
    return
  }

  res.status(200).json(OK);
})

module.exports = route;
