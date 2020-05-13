const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAdvisor = require("../../guards/isAdvisor");
const Payment = require('../../models/Payment');

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Payment.find()
    .then(payments => res.json(payments))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post("/add", [passport.authenticate("jwt", { session: false }), isAdvisor], (req, res) => {
    const customer = req.body.customer;
    const cardNumber = req.body.cardNumber;
    const cvv = Number(req.body.cvv);
    const expiryDate = Date.parse(req.body.expiryDate);
    const billingAddress = req.body.billingAddress;
    const nameOnCard = req.body.nameOnCard;

    //
    const newPayment = new Payment({
        customer,
        cardNumber,
        cvv,
        expiryDate,
        billingAddress,
        nameOnCard
    });

    newPayment.save()
    .then(() => res.json('Payment Details recorded!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => { 
    Payment.findById(req.params.id)
    .then(payment => res.json(payment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Payment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Payment deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;