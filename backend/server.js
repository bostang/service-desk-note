const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Helper function untuk mendapatkan nama file harian
const getTodayFileName = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}.json`;
};

// Endpoint untuk menyimpan data, tetap sama
app.post('/save-data', (req, res) => {
  const newData = req.body;
  const fileName = getTodayFileName();
  const dataPath = path.join(dataDir, fileName);

  fs.readFile(dataPath, (err, data) => {
    let records = [];
    if (!err && data.length > 0) {
      try {
        records = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }
    records.push(newData);

    fs.writeFile(dataPath, JSON.stringify(records, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal menyimpan data.' });
      }
      res.status(200).json({ message: 'Data berhasil disimpan!' });
    });
  });
});

// Endpoint BARU untuk mendapatkan daftar file (tanggal) yang tersedia
app.get('/available-dates', (req, res) => {
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      console.error("Gagal membaca direktori data:", err);
      return res.status(500).json([]);
    }
    // Filter hanya file JSON dan ambil nama dasarnya
    const dates = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    res.json(dates.sort().reverse()); // Urutkan dari yang terbaru
  });
});

// Endpoint BARU untuk mendapatkan data dari tanggal tertentu
app.get('/get-data/:date', (req, res) => {
    const fileName = `${req.params.date}.json`;
    const dataPath = path.join(dataDir, fileName);

    fs.readFile(dataPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.json([]);
            }
            console.error('Gagal membaca file data:', err);
            return res.status(500).json({ message: 'Gagal membaca data.' });
        }
        try {
            const records = JSON.parse(data);
            res.json(records);
        } catch (e) {
            res.status(500).json([]);
        }
    });
});

// Endpoint yang DIMODIFIKASI untuk menghapus catatan
app.delete('/delete-note/:date/:index', (req, res) => {
  const indexToDelete = parseInt(req.params.index, 10);
  const fileName = `${req.params.date}.json`;
  const dataPath = path.join(dataDir, fileName);

  fs.readFile(dataPath, (err, data) => {
    if (err) {
      console.error(`Gagal membaca file untuk dihapus: ${err.message}`);
      return res.status(500).json({ message: 'Gagal menghapus data.' });
    }

    let records = [];
    try {
      if (data.length > 0) {
        records = JSON.parse(data);
      }
    } catch (e) {
      console.error('Error parsing JSON saat hapus:', e.message);
      return res.status(500).json({ message: 'Data file rusak.' });
    }

    if (indexToDelete >= 0 && indexToDelete < records.length) {
      records.splice(indexToDelete, 1);

      fs.writeFile(dataPath, JSON.stringify(records, null, 2), (err) => {
        if (err) {
          console.error('Gagal menulis data setelah hapus:', err.message);
          return res.status(500).json({ message: 'Gagal menyimpan perubahan.' });
        }
        res.status(200).json({ message: 'Note berhasil dihapus.' });
      });
    } else {
      res.status(404).json({ message: 'Indeks note tidak ditemukan.' });
    }
  });
});

// Endpoint yang DIMODIFIKASI untuk mengedit catatan
app.put('/edit-note/:date/:index', (req, res) => {
  const indexToEdit = parseInt(req.params.index, 10);
  const updatedData = req.body;
  const fileName = `${req.params.date}.json`;
  const dataPath = path.join(dataDir, fileName);

  fs.readFile(dataPath, (err, data) => {
    if (err) {
      console.error('Gagal membaca file untuk diedit:', err.message);
      return res.status(500).json({ message: 'Gagal mengedit data.' });
    }

    let records = [];
    try {
      if (data.length > 0) {
        records = JSON.parse(data);
      }
    } catch (e) {
      console.error('Error parsing JSON saat edit:', e.message);
      return res.status(500).json({ message: 'Data file rusak.' });
    }

    if (indexToEdit >= 0 && indexToEdit < records.length) {
      records[indexToEdit] = updatedData;

      fs.writeFile(dataPath, JSON.stringify(records, null, 2), (err) => {
        if (err) {
          console.error('Gagal menulis data setelah edit:', err.message);
          return res.status(500).json({ message: 'Gagal menyimpan perubahan.' });
        }
        res.status(200).json({ message: 'Note berhasil diperbarui.' });
      });
    } else {
      res.status(404).json({ message: 'Indeks note tidak ditemukan.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});