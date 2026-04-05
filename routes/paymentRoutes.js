import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourTestKeyId',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourTestSecretKey',
});

// @route   POST /api/payments/create-order
// @desc    Create a payment order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay takes amount in minimum currency units
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {}
    };
    
    const order = await razorpay.orders.create(options);
    
    if (!order) return res.status(500).send("Some error occurred");
    
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send(error);
  }
});

// @route   POST /api/payments/verify
// @desc    Verify payment signature
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      studentId
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'YourTestSecretKey')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully", success: true });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!", success: false });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
});

export default router;
