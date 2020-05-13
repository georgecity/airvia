const express = require("express");
const router = express.Router();
const passport = require("passport");
const isManager = require("../../guards/isManager");
const Comission = require('../../models/Comission');

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Comission.find()
    .then(comissions => res.json(comissions))
    .catch(err => res.status(400).json('Error: '+err));
});

router.post("/add", [passport.authenticate("jwt", { session: false }), isManager], (req, res) => {
    const creator = req.body.creator;
    const comission = Number(req.body.comission);
    
    const newComission = new Comission({
        creator,
        comission
    });

    newComission.save()
    .then(() => res.json('Comission added!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.delete("/:id", [passport.authenticate("jwt", { session: false }), isManager], (req, res) => {
    Comission.findByIdAndDelete(req.params.id)
    .then(() => res.json('Comission deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;