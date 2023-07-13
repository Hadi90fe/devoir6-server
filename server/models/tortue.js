const mongoose = require('mongoose');

const TortueSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    nomLatin: { type: String, required: true },
    espece: { type: String, required: true },
    vitesse: { type: String, required: true },
    habitat: { type: String, required: true },
    ageMaximal: { type: String, required: true },
    alimentation: { type: String,required: true },
    image: { type: String ,required: true}
});

module.exports = mongoose.model('tortues', TortueSchema);