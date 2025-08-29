# Backend: Aplikasi Pencatatan Kendala Harian

Ini adalah bagian *backend* dari **Aplikasi Pencatatan Kendala Harian**. Dibangun dengan Node.js dan Express.js, server ini berfungsi sebagai API untuk mengelola data catatan harian. Semua data disimpan dalam file JSON, dengan setiap file mewakili catatan dari satu hari.

## Teknologi

- **Node.js**: Lingkungan *runtime* JavaScript untuk menjalankan server.
- **Express.js**: Framework web minimalis yang menyediakan fungsionalitas perutean (`routing`) dan *middleware* untuk API.
- **`fs` (File System)**: Modul bawaan Node.js yang digunakan untuk membaca, menulis, dan mengelola file JSON.
- **`body-parser`**: Middleware untuk mengurai data JSON dari permintaan HTTP.
- **`cors`**: Middleware untuk mengizinkan permintaan dari domain *frontend* (CORS).

## Struktur Folder

Struktur folder di dalam direktori `backend` dirancang untuk memisahkan kode server dari data yang dihasilkannya.

```tree
/backend
|-- /data
|   |-- 2025-08-28.json       \# Contoh file data untuk catatan harian
|   |-- 2025-08-29.json       \# File ini dibuat secara otomatis
|-- server.js               \# Kode utama server
|-- package.json            \# Daftar dependensi proyek
```

- **`/data`**: Folder ini secara otomatis dibuat saat server dijalankan untuk pertama kalinya. Semua file JSON yang berisi catatan harian akan disimpan di sini, dengan nama file yang sesuai dengan tanggal (`YYYY-MM-DD.json`).
- **`server.js`**: Berisi semua logika server, termasuk definisi *endpoint* API dan penanganan permintaan.

## Endpoint API

Server ini menyediakan serangkaian *endpoint* REST API untuk berinteraksi dengan data:

| Method   | Endpoint                    | Deskripsi                                                    |
| :------- | :-------------------------- | :----------------------------------------------------------- |
| `POST`   | `/save-data`                | Menyimpan catatan baru ke file data hari ini.                |
| `GET`    | `/available-dates`          | Mendapatkan daftar semua tanggal yang memiliki catatan.      |
| `GET`    | `/get-data/:date`           | Mendapatkan semua catatan dari tanggal tertentu.             |
| `PUT`    | `/edit-note/:date/:index`   | Memperbarui catatan tertentu berdasarkan tanggal dan indeks. |
| `DELETE` | `/delete-note/:date/:index` | Menghapus catatan tertentu berdasarkan tanggal dan indeks.   |

## Cara Menjalankan

Ikuti langkah-langkah di bawah ini untuk menjalankan server *backend* secara lokal.

1. Buka terminal di dalam direktori `backend`.

    ```bash
    cd backend
    ```

2. Pasang semua dependensi yang diperlukan.

    ```bash
    npm install
    ```

3. Jalankan server Node.js.

    ```bash
    node server.js
    ```

Server akan mulai mendengarkan permintaan di `http://localhost:5000`. Pastikan server ini berjalan sebelum Anda menjalankan aplikasi *frontend*.
