const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  try {
    const { email, password, age, gender, color } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
    }

    const user = new User({
      email,
      password,
      age,
      gender,
      color
    });

    await user.save();
    res.status(201).json({ 
      message: 'Kullanıcı başarıyla kaydedildi',
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Kayıt işlemi başarısız', error: error.message });
  }
});

// Kullanıcı girişi
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Email veya şifre hatalı' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email veya şifre hatalı' });
    }

    // Kullanıcı bilgilerini döndürürken ID'yi de ekleyelim
    res.json({
      message: 'Giriş başarılı',
      user: {
        id: user._id,
        email: user.email,
        age: user.age,
        gender: user.gender,
        color: user.color,
        score: user.score
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Giriş işlemi başarısız', error: error.message });
  }
});

// Kullanıcı listesi
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({}, 'email score color')
      .sort({ score: -1 })
      .limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Liderlik tablosu getirilemedi', error: error.message });
  }
});

module.exports = router;