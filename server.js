const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: 'rzp_live_WRJRjojdXoajCE',
  key_secret: 'r6AGW25i9lOnbXRJ4GKeO9dm'
});

app.post('/create-order', async (req, res) => {
  const { amount, receipt } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt,
      payment_capture: 1, // auto-capture
    });
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
