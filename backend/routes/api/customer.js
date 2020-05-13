const express = require("express");
const router = express.Router();
const passport = require("passport");
const isManager = require("../../guards/isManager");
const isAdvisor = require("../../guards/isAdvisor");
const Customer = require('../../models/Customer');

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Customer.find()
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post("/register", [passport.authenticate("jwt", { session: false }), isAdvisor], (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const contactNumber = Number(req.body.contactNumber);
    const discount = req.body.discount;
    const customerStatus = req.body.customerStatus;

    const newCustomer = new Customer({
        name,
        address,
        email,
        contactNumber,
        discount,
        customerStatus
       
    });

    newCustomer.save()
    .then(() => res.json('Customer registered successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
    .then(() => res.json('Customer deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/update/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Customer.findById(req.params.id)
    .then(customer => {
        customer.name = req.body.name;
        customer.address = req.body.address;
        customer.email = req.body.email;
        customer.contactNumber = Number(req.body.contactNumber);
        
        customer.save()
            .then(() => res.json('customer updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
});

router.post("/manager/update/:id", [passport.authenticate("jwt", { session: false }), isManager], (req, res) => {
    Customer.findById(req.params.id)
    .then(customer => {
        customer.discount = req.body.discount;
        customer.customerStatus = req.body.customerStatus;
        
        customer.save()
            .then(() => res.json('customer manged!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
});

module.exports = router;
