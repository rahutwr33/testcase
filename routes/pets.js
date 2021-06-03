const express = require('express');
const Joi = require('@hapi/joi');

const Pets = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets  name'),
    age: Joi.number().required().description('Pets age'),
    colour: Joi.string().required(''),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pets = new Pets(req.body);
      await pets.save();
      res.status(201).json(pets);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;