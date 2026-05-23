const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL da imagem
  location: {
    address: { type: String }, // Nome do local
    latitude: { type: Number },
    longitude: { type: Number }
  },
  likes: { type: Number, default: 0 },
  comments: [{ type: String }], // Simples, pode expandir
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);