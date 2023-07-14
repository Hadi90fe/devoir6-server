const Tortue = require("../models/tortue")
const User = require('../models/user')
const fs = require("fs")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class API {

    //fetch all tortues
    static async fetchAllTortues(req, res) {
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 6; // Number of documents per page
        const skip = (page - 1) * limit;
        const totalCount = await Tortue.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        await Tortue.find().skip(skip).limit(limit).exec()
            .then(tortues => res.json({ tortues, totalCount, totalPages , page}))
            .catch(err => res.status(500).send(err));
    };

    //fetch tortue by id
    static async fetchTortueById(req, res) {
        const id = req.params.id
        await Tortue.find({ "_id": id })
            .then(tortue => res.json(tortue))
            .catch(err => res.status(500).send(err));
    };

    //delete tortue
    static async deleteTortue(req, res) {
        const id = req.params.id;
        try {
            const result = await Tortue.findByIdAndDelete(id)
            try {
                fs.unlinkSync(result.image);
            } catch (err) {
                console.log(err)
            }
            res.status(200).json({ message: 'tortue supprimé avec succes' })
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    };

    // create new tortue
    static async createTortue(req, res) {
        const tortue = req.body;
        const image = req.file.path;
        tortue.image = image;
        try {
            await Tortue.create(tortue)
            res.status(201).json({ message: 'Tortue enregistrée' })
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    };

    // update tortue
    static async updateTortue(req, res) {
        // console.log(req.body)
        const id = req.params.id;
        let new_image = "";
        if (req.file) {
            new_image = req.file.path;
            try {
                fs.unlinkSync(req.body.old_image)
            } catch (error) {
                console.log(error)
            }
        } else {
            new_image = req.body.old_image;
        }
        const newTortue = req.body;
        newTortue.image = new_image;
        try {
            await Tortue.findByIdAndUpdate(id, newTortue);
            res.status(200).json({ message: "Tortue mis a jour" })
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    };

    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            //validadtion des champs
            if (!(email && username && password)) {
                res.status(400).send("tous les champs sont obligatoires");
            }
            // if utilisateur existe !!
            const oldUser = await User.findOne({ email });
            if (oldUser) {
                return res.status(409).send('utilisateur existe. SVP connectez-vous')
            }
            // encrypt pass
            var encPass = await bcrypt.hash(password, 10);
            //creer utilisateur
            const user = await User.create({
                username,
                email: email.toLowerCase(),
                password: encPass,
            });
            // creer token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );
            // save token
            user.token = token;
            // return nouveau utilisateur
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
        }
    };

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(400).send("Tous les champs sont obligatoire");
            }
            const user = await User.findOne({ email });
            if (user && (bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "1h",
                    }
                );
                user.token = token;
                res.status(200).json(user);
            } else {
                res.status(400).send("Invalid Credentials");
            }
        } catch (err) {
            console.log(err)
        }
    };
}