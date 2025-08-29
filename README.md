# Aplikasi Pencatatan Kendala Harian

Aplikasi web sederhana untuk mencatat kendala harian, dilengkapi dengan fitur penyimpanan data harian, tampilan, pengeditan, dan penghapusan catatan. Data disimpan dalam format JSON berdasarkan tanggal.

## Fitur Utama

- **`Create Note`**: Buat catatan baru yang secara otomatis disimpan ke file JSON untuk hari ini.
- **`View Notes`**: Lihat semua catatan yang dibuat pada tanggal tertentu.
- **`View Detail`**: Lihat detail lengkap dari catatan tertentu.
- **`Edit Note`**: Ubah data catatan yang sudah ada.
- **`Delete Note`**: Hapus catatan tertentu.
- **`Multi-Date Support`**: Navigasi dan kelola catatan dari tanggal-tanggal sebelumnya.

## Teknologi yang Digunakan

**Frontend**:

- **React.js**: Library JavaScript untuk membangun antarmuka pengguna.
- **Bootstrap**: Framework CSS untuk *styling* dan *responsiveness*.
- **Axios**: Klien HTTP untuk melakukan permintaan API ke *backend*.

**Backend**:

- **Node.js**: Lingkungan *runtime* JavaScript untuk menjalankan server.
- **Express.js**: Framework web Node.js untuk membangun REST API.
- **`fs` (File System)**: Modul bawaan Node.js untuk mengelola file JSON.
- **`cors`**: Middleware untuk mengizinkan permintaan dari domain yang berbeda.

---

## Struktur Proyek

Proyek ini dibagi menjadi dua bagian utama: `frontend` (aplikasi React) dan `backend` (server Node.js).

```tree

/nama-proyek
|-- /frontend
|   |-- /src
|   |   |-- /components
|   |   |   |-- DatePicker.js
|   |   |   |-- LandingPage.js
|   |   |   |-- NoteDetail.js
|   |   |   |-- NoteEdit.js
|   |   |   |-- NoteForm.js
|   |   |   |-- NoteList.js
|   |   |-- App.js
|   |   |-- index.js
|   |-- package.json
|
|-- /backend
|   |-- /data
|   |   |-- 2025-08-28.json
|   |   |-- 2025-08-29.json
|   |-- server.js
|   |-- package.json
|
|-- README.md

````

- **`/frontend/src/components`**: Berisi semua komponen React yang dapat digunakan kembali.
- **`/backend/data`**: Folder ini secara otomatis dibuat oleh server untuk menyimpan file JSON catatan harian.

---

## Cara Menjalankan Aplikasi

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi secara lokal.

### 1. Menjalankan Backend

Buka terminal baru di direktori `backend`.

```bash
# Pindah ke direktori backend
cd backend

# Pasang dependensi
npm install

# Jalankan server
node server.js
````

Server akan berjalan di `http://localhost:5000`.

### 2\. Menjalankan Frontend

Buka terminal **baru** di direktori `frontend`.

```bash
# Pindah ke direktori frontend
cd frontend

# Pasang dependensi
npm install

# Jalankan aplikasi React
npm start
```
