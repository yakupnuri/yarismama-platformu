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

// Ana route - API durumunu kontrol etmek için
app.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Yarışma API çalışıyor',
    timestamp: new Date().toISOString()
  });
});

// API durum kontrolü için yeni endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API sağlık kontrolü başarılı',
    dbConnection: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Hata yönetimi middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Sunucu hatası oluştu',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler - tanımlanmamış routelar için
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'İstenen sayfa bulunamadı'
  });
});

// Port dinleme
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

module.exports = app;