const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS ayarları
app.use(cors({
  origin: '*', // Geliştirme aşamasında tüm originlere izin ver
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Ana route
app.get('/', (req, res) => {
  res.json({ message: 'Yarışma API çalışıyor' });
});

// Hata yönetimi middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Sunucu hatası oluştu',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Port dinleme
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

module.exports = app;