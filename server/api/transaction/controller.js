const get = require('lodash/get');
const set = require('lodash/set');
const Transaction = require('./model');
const logger = require('../../logger');
const stripeService = require('../../services/stripe');

const validationError = (res, err) => {
  if (err) {
    logger.error(err);
  }

  return res.status(422).json(err);
};

function getUser(request) {
  return request.body.user || request.user;
}

async function create(req, res, next) {
  try {
    const newTransaction = new Transaction({
      user: getUser(req)._id,
      amount: req.body.amount,
      source: req.body.source
    });
    const stripeCharge = await stripeService.create(newTransaction);

    newTransaction.source = stripeCharge.source;
    const transaction = await newTransaction.save();

    return res.status(201).json(transaction);
  } catch (err) {
    return validationError(res, err);
  }
}

module.exports = {
  create
};
