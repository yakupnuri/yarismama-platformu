const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS ayarları
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB Cloud Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Cloud bağlantısı başarılı');
  console.log('Bağlantı URI:', process.env.MONGODB_URI);
})
.catch((err) => {
  console.error('MongoDB Cloud bağlantı hatası:', err);
  process.exit(1);
});

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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

module.exports = app;