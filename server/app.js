//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4200
const MONGODB_URI = process.env.MONGODB_URI;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('dist'));
app.use('/uploads', express.static('uploads'));

//database connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch((error) => console.log("Erreur de connexion à MongoDB : " + error));

//routes prefix
app.use('/api/v1', require('./routes/routes'))

//start server
app.listen(port, () => console.log(`Serveur démarré sur http://localhost:${port}`));
