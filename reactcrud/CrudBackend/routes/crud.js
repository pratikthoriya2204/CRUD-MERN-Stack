const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Crud = require("../models/crudModel");

router.post('/create', [
    body("name", "Enter minimum 5 length").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
    body("mob", "Enter valid phone number").isLength({ min: 10, max: 10 }),
], async (req, res) => {
    try {
        //code to check error for validation...
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //code to insert...
        const { name, email, gender, mob, status } = req.body;
        const crud = new Crud({
            name, email, gender, mob, status
        });
        const savedCrud = await crud.save();

        res.json(savedCrud);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Inetrnal server error..");
    }
});

router.get('/read', async (req, res) => {
    const readData = await Crud.find();
    res.json(readData);
});

router.put('/update/:id', async (req, res) => {
    try {
       
    
        let crud = await Crud.findById(req.params.id)
        if (!crud) { return res.status(404).send("Not Found") }

        crud = await Crud.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json({ "Success": "Data has been Updated", crud: crud });

    } catch (error) {
        res.status(404).send("Internal server error...")
    }
});

router.delete('/delete/:id', async (req, res) => {

    const { name, email, gender, mob, status } = req.body;

    const newData = {};

    if (name) { newData.name = name };
    if (email) { newData.name = email };
    if (gender) { newData.name = gender };
    if (mob) { newData.name = mob };
    if (status) { newData.name = status };

    let crud = await Crud.findById(req.params.id)
    if (!crud) { return res.status(404).send("Not Found") }

    crud = await Crud.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Data has been deleted", crud: crud });
});


module.exports = router;
