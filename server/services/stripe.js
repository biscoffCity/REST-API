const config = require('../environment');
const Stripe = require('stripe')(config.stripe.secret_key);

async function create(userTransaction) {
  const charge = {
    amount : parseInt(userTransaction.amount, 10) * 100,
    source: userTransaction.source.id,
    currency: userTransaction.currency
  };
  const idempotencyKey = userTransaction._id
  const response = await Stripe.charges.create(charge, {
      idempotency_key: idempotencyKey
  });

  return response;
}

module.exports = {
  create
};
