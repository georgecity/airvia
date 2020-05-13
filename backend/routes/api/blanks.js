const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAdmin = require("../../guards/isAdmin");
const isManager = require("../../guards/isManager");
const isAdvisor = require("../../guards/isAdvisor");

const Blank = require("../../models/Blanks");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
     Blank.find()
    .then(blanks => res.json(blanks))
    .catch(err => res.status(400).json('Error: '+err));
    }
  );

router.get(
    "/sales",
    [passport.authenticate("jwt", { session: false }), isAdvisor],
    (req, res) => {
      Blank.find({ status: "Available" })
      .then(blanks => res.json(blanks))
      .catch(err => res.status(400).json('Error: '+err));
      }
  );

router.post("/add", [passport.authenticate("jwt", { session: false }), isAdmin], (req, res) => {
        const owner = req.body.owner;
        const blankType = Number(req.body.blankType);
        const blankID = Number(req.body.blankID);
        const status = req.body.status;

        const newBlank = new Blank({
            owner,
            blankType,
            blankID,
            status
    });

        newBlank.save()
        .then(() => res.json('Blank Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
        }
  );

  router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Blank.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

  router.delete("/:id", [passport.authenticate("jwt", { session: false }), isAdmin], (req, res) => {
        Blank.findByIdAndDelete(req.params.id)
        .then(() => res.json('Blank deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  );

  router.post("/update/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
        Blank.findById(req.params.id)
        .then(blank => {
            blank.owner = req.body.owner;
            blank.status = req.body.status;

            blank.save()
                .then(() => res.json('blank updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }
  );

module.exports = router;