const mongoose = require('mongoose');

const Categorie = mongoose.model('Categorie', {
    title: {type:String, required: true },
    content: {type:String, required: true }
});

module.exports = Categorie ;



















/*

const postSchema = mongoose.Schema({
    title: {type:String, required:true },
    content: { type: String, required: true }
});

//� solo un progetto e per creare dati o creare oggetti modelli, dobbiamo trasformare la definizione in un modello. Lo faremo utilizzando la funzione modello mangusta.dobbiamo esportarlo
module.exports = mongoose.model('Post', postSchema);

*/