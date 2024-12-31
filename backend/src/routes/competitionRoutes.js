const express = require('express');
const router = express.Router();
const Competition = require('../models/Competition');
const User = require('../models/User');

// Yeni aktivite ekleme
router.post('/activities', async (req, res) => {
  try {
    const { userId, type, value } = req.body;
    
    let points = 0;
    switch (type) {
      case 'namaz':
        points = value * 5;
        break;
      case 'kuran':
        points = value * 3;
        break;
      case 'zikir':
        points = value * 2;
        break;
      default:
        points = value;
    }

    let competition = await Competition.findOne({ userId });
    
    if (!competition) {
      competition = new Competition({ userId, activities: [], totalPoints: 0 });
    }

    competition.activities.push({ type, value, points });
    competition.totalPoints += points;
    await competition.save();

    // Kullanıcının toplam puanını güncelle
    await User.findByIdAndUpdate(userId, { $inc: { score: points } });

    res.status(201).json({ 
      message: 'Aktivite başarıyla kaydedildi',
      points,
      totalPoints: competition.totalPoints
    });
  } catch (error) {
    res.status(500).json({ message: 'Aktivite kaydedilemedi', error: error.message });
  }
});

// Kullanıcının aktivitelerini getirme
router.get('/activities/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const competition = await Competition.findOne({ userId });
    
    if (!competition) {
      return res.json({ activities: [], totalPoints: 0 });
    }

    res.json({
      activities: competition.activities,
      totalPoints: competition.totalPoints
    });
  } catch (error) {
    res.status(500).json({ message: 'Aktiviteler getirilemedi', error: error.message });
  }
});

module.exports = router;