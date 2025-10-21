Cuci Sepatu API
Deskripsi Umum

Cuci Sepatu API adalah proyek sederhana berbasis Node.js + Express.js yang berfungsi sebagai REST API untuk mengelola data cucian sepatu.
API ini dibuat sebagai implementasi konsep dasar CRUD (Create, Read, Update, Delete) menggunakan file JSON sebagai penyimpanan data.

Tujuan Proyek

1. Mengimplementasikan konsep dasar REST API menggunakan Express.js.

2. Melatih penggunaan metode HTTP (GET, POST, PUT, DELETE).

3. Mengelola data dalam format JSON tanpa database eksternal.

4. Menyediakan API yang dapat diuji menggunakan Postman.

Fitur Utama
Metode	Endpoint	Deskripsi
GET	/items	Menampilkan seluruh daftar sepatu yang sedang dicuci.
POST	/items	Menambahkan data cucian sepatu baru.
PUT	/items/:id	Mengubah data cucian sepatu berdasarkan ID.
DELETE	/items/:id	Menghapus data cucian sepatu berdasarkan ID.
Struktur Data

Data disimpan dalam file items.json di root folder proyek.

[
  {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-16",
    "tanggalSelesai": "-"
  }
]

Contoh Request dan Response
1. GET /items

Request:

GET http://localhost:3000/items


Response:

[
  {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-16",
    "tanggalSelesai": "-"
  }
]

2. POST /items

Request:

POST http://localhost:3000/items
Content-Type: application/json


Body:

{
  "nama": "Converse Chuck 70",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-21",
  "tanggalSelesai": "-"
}


Response:

{
  "id": 3,
  "nama": "Converse Chuck 70",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-21",
  "tanggalSelesai": "-"
}

3. PUT /items/:id

Request:

PUT http://localhost:3000/items/3
Content-Type: application/json


Body:

{
  "status": "Selesai Dicuci",
  "tanggalSelesai": "2025-10-22"
}


Response:

{
  "id": 3,
  "nama": "Converse Chuck 70",
  "status": "Selesai Dicuci",
  "tanggalMasuk": "2025-10-21",
  "tanggalSelesai": "2025-10-22"
}

4. DELETE /items/:id

Request:

DELETE http://localhost:3000/items/2


Response:

{
  "message": "Item dengan id 2 telah dihapus"
}

Langkah Instalasi

1. Clone repositori

git clone https://github.com/Wizard-Gandalf/cuci-sepatu-api.git
cd cuci-sepatu-api


2. Instal dependensi

npm install


3. Jalankan server lokal

npm run dev


Jika berhasil, akan muncul di terminal:

Local: http://localhost:3000


Uji API menggunakan Postman

GET → http://localhost:3000/items

POST → http://localhost:3000/items

PUT → http://localhost:3000/items/:id

DELETE → http://localhost:3000/items/:id

Struktur Folder
cuci-sepatu-api/
│
├── src/
│   └── app.js          # Berisi konfigurasi route Express
│
├── items.json          # Penyimpanan data sepatu
├── server-local.js     # File utama untuk menjalankan server lokal
├── package.json        # Dependensi Node.js
└── README.md           # Dokumentasi proyek
