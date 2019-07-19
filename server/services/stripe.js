const Stripe = require('stripe')('sk_test_...');

const customer = await Stripe.customers.create({
  email: 'customer@example.com',
});