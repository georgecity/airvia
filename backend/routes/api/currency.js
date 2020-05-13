const express = require("express");
const router = express.Router();
const passport = require("passport");
const Currency = require('../../models/Currency');

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Currency.find()
    .then(currencies => res.json(currencies))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const creator = req.body.creator;
    const currencyRate = Number(req.body.currencyRate);
    const date = Date.parse(req.body.date);

    const newCurrency = new Currency({
        creator,
        currencyRate,
        date
    });

    newCurrency.save()
    .then(() => res.json('Currency added!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Currency.findByIdAndDelete(req.params.id)
    .then(() => res.json('Currency deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;