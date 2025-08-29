# Frontend: Aplikasi Pencatatan Kendala Harian

Ini adalah bagian *frontend* dari **Aplikasi Pencatatan Kendala Harian**, yang dibangun menggunakan React.js. Aplikasi ini menyediakan antarmuka pengguna (UI) untuk berinteraksi dengan server *backend* Node.js, memungkinkan pengguna untuk membuat, melihat, mengedit, dan menghapus catatan.

## Teknologi

- **React.js**: Library JavaScript untuk membangun UI yang dinamis dan modular.
- **Bootstrap**: Framework CSS yang digunakan untuk *styling*, memastikan tampilan yang bersih dan responsif.
- **Axios**: Klien HTTP berbasis janji (*promise-based*) untuk membuat permintaan API ke *backend*.

## Fitur

- **Halaman Utama (`LandingPage.js`)**: Layar awal untuk menavigasi ke fungsi `Create Note` atau `View Notes`.
- **Formulir Catatan (`NoteForm.js`)**: Formulir untuk membuat catatan baru yang akan dikirim ke *backend* untuk disimpan.
- **Pemilih Tanggal (`DatePicker.js`)**: Halaman untuk memilih tanggal, yang memuat daftar tanggal catatan yang tersedia dari *backend*.
- **Daftar Catatan (`NoteList.js`)**: Menampilkan daftar catatan untuk tanggal yang dipilih dalam format tabel.
- **Detail & Edit (`NoteDetail.js` & `NoteEdit.js`)**: Mengizinkan pengguna untuk melihat detail lengkap dan mengubah catatan yang sudah ada.

## Struktur Folder

Struktur folder di dalam direktori `src` diatur untuk menjaga kode tetap terorganisir dan mudah dikelola.

```tree
/frontend
|-- /src
|   |-- /components
|   |   |-- DatePicker.js      \# Memuat dan menampilkan tanggal-tanggal yang tersedia
|   |   |-- LandingPage.js     \# Halaman beranda
|   |   |-- NoteDetail.js      \# Tampilan detail dari catatan tertentu
|   |   |-- NoteEdit.js        \# Formulir untuk mengedit catatan
|   |   |-- NoteForm.js        \# Formulir untuk membuat catatan baru
|   |   |-- NoteList.js        \# Tampilan tabel daftar catatan
|   |-- App.css
|   |-- App.js                 \# Komponen utama yang mengelola routing dan state
|   |-- index.js               \# Titik masuk utama aplikasi

```

## Cara Menjalankan

Ikuti langkah-langkah di bawah ini untuk menjalankan bagian *frontend* aplikasi secara lokal.

1. Pastikan Anda telah menjalankan server *backend* Node.js di `http://localhost:5000`. Jika belum, silakan merujuk ke `README.md` utama di *root directory*.

2. Buka terminal di dalam direktori `frontend`.

    ```bash
    cd frontend
    ```

3. Pasang semua dependensi yang diperlukan.

    ```bash
    npm install
    ```

4. Jalankan aplikasi React.

    ```bash
    npm start
    ```

Aplikasi akan terbuka secara otomatis di peramban web Anda di `http://localhost:3000`. Jika tidak, silakan buka URL tersebut secara manual.
