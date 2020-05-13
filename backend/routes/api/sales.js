const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAdvisor = require("../../guards/isAdvisor");
const Sales = require('../../models/Sales');

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Sales.find()
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: '+err));
   }
 );

 router.post("/add", [passport.authenticate("jwt", { session: false }), isAdvisor], (req, res) => {
    const seller = req.body.seller;
    const customer = req.body.customer;
    const ticketAmount = Number(req.body.ticketAmount);
    const blankID = Number(req.body.blankID);
    const coupons = req.body.coupons;
    const date = Date.parse(req.body.date);
    const method = req.body.method;
    const currency = req.body.currency;
    const currencyRate = Number(req.body.currencyRate);
    const comission = Number(req.body.comission);
    const discount = req.body.discount;
    const payment = req.body.payment;

    const newSales = new Sales({
        seller,
        customer,
        ticketAmount,
        blankID,
        coupons,
        date,
        method,
        currency,
        currencyRate,
        comission,
        discount,
        payment
    });

    newSales.save()
    .then(() => res.json('Sales recorded!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Sales.findById(req.params.id)
    .then(sale => res.json(sale))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Sales.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sales deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/update/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Sales.findById(req.params.id)
    .then(sale => {
        sale.ticketAmount = Number(req.body.ticketAmount);
        sale.date = Date.parse(req.body.date);
        sale.method = req.body.method;
        sale.currency = req.body.currency;
        sale.currencyRate = req.body.currencyRate;
        
        sale.save()
            .then(() => res.json('sales updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
});

module.exports = router;