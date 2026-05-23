const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

// Middleware para verificar token
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Acesso negado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Criar postagem
router.post('/', auth, async (req, res) => {
  const { description, image, location } = req.body;
  try {
    const post = new Post({ 
      user: req.user, 
      description, 
      image,
      location: location ? {
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude
      } : null
    });
    await post.save();
    await post.populate('user', 'username');
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar postagens
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;