# 💍 Sliva Invitation - Premium Digital Wedding Invitation

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/status-Ready%20to%20Use-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

Selamat datang di *source code* **Sliva Invitation**! Ini adalah templat undangan pernikahan digital (*digital wedding invitation*) berpenampilan elegan, modern, dan sangat mudah untuk dimodifikasi (CMS-ready) yang dibuat oleh **lazee Apps** (@ikbal_handini). 

Aplikasi web ini menggunakan teknologi React.js, Tailwind CSS untuk desain memukau, animasi halus menggunakan AOS (Animate on Scroll), dan bundler Vite yang sangat cepat.

---

## 🌟 Fitur Utama
- **Desain Premium:** Mengusung tema kota *watercolor* klasik dengan perpaduan warna navy dan emas yang mewah.
- **Sistem Modular:** Halaman dapat dimatikan/dihidupkan dengan sangat mudah melalui file konfigurasi JSON.
- **Kustomisasi Tanpa Coding (Data-Driven):** Cukup ubah teks dan tautan gambar di satu file `invitationData.json`, seluruh *website* akan langsung berubah!
- **Galeri & Musik Latar:** Dilengkapi dengan pemutar musik otomatis dan *lightbox* galeri foto interaktif.
- **Hitung Mundur (Countdown):** Penghitung waktu otomatis menuju hari-H.
- **Animasi Halus:** Transisi memudar (*fade*), efek latar belakang menyatu (*blend-multiply*), dan tombol melayang.

---

## 🛠️ Apa Saja yang Dibutuhkan? (Persyaratan)

Jangan khawatir jika Anda pemula! Anda hanya perlu menginstal dua aplikasi gratis ini di laptop/komputer Anda:
1. **Node.js** (Versi 18 ke atas) - *Ini adalah mesin agar aplikasi React bisa jalan.* [Download Node.js di sini](https://nodejs.org/). Pilih versi "LTS" (Recommended for Most Users).
2. **Visual Studio Code (VS Code)** - *Ini adalah aplikasi editor untuk membuka dan mengubah kode.* [Download VS Code di sini](https://code.visualstudio.com/).
3. *(Opsional)* **Git** - Jika Anda ingin mengunduh kode ini menggunakan fitur *clone*.

---

## 🚀 Cara Menjalankan Aplikasi di Komputer Anda

Ikuti langkah-langkah mudah ini:

1. **Buka Terminal/Command Prompt (CMD)**
   Buka folder tempat Anda menyimpan kode undangan ini. Jika menggunakan VS Code, Anda bisa membuka folder proyeknya, lalu klik menu `Terminal > New Terminal` di atas.

2. **Instal Modul/Dependensi**
   Ketik perintah berikut di terminal lalu tekan `Enter`. Tunggu sampai proses download selesai (pastikan komputer terhubung ke internet):
   ```bash
   npm install
   ```

3. **Jalankan Aplikasi**
   Setelah instalasi selesai, ketik perintah ini untuk menyalakan "server lokal":
   ```bash
   npm run dev
   ```

4. **Buka di Browser**
   Nanti di terminal akan muncul tulisan `➜  Local:   http://localhost:5173/`. Silakan klik *link* tersebut, atau buka aplikasi Google Chrome Anda dan ketikkan `http://localhost:5173` di kotak pencarian atas.
   *Taraa!* Undangan Anda sudah bisa dilihat!

---

## 🎨 Cara Mengubah Data (Nama, Foto, Acara)

Ada dua cara mudah untuk mengubah isi undangan ini:

### 1. Menggunakan Panel Super Admin (CMS) - Paling Gampang!
Undangan ini sudah dilengkapi dengan halaman pengaturan super canggih. Anda tidak perlu menyentuh kode sama sekali!
1. Jalankan aplikasi di browser (`http://localhost:5173`).
2. Tambahkan `#admin` di belakang *link* tersebut sehingga menjadi: **`http://localhost:5173/#admin`**.
3. *Voila!* Panel pengaturan rahasia akan terbuka.
4. Anda bisa mengganti nama, *upload* gambar baru (hanya dengan memasukkan *link*), mengubah teks cerita, hingga mengatur *link* lagu langsung dari browser.
5. Jika sudah, klik **Simpan & Terapkan**.

*Catatan: Fitur CMS ini hanya aktif saat mode `dev` (pengembangan). Saat nanti dipublish (di-build), panel ini akan disembunyikan otomatis demi keamanan.*

### 2. Mengubah Data Secara Manual via File JSON
Jika Anda lebih suka mengatur data secara manual, semua teks, foto, dan lagu diatur dari file **`src/data/invitationData.json`**. 
> **Penting:** Secara *default*, aplikasi ini menggunakan gambar *placeholder* (gambar abu-abu sementara) agar foto pribadi tidak tersebar. Silakan ganti *link* gambar tersebut dengan foto asli Anda.

**Langkah:** 
1. *Copy-paste* foto Anda ke dalam folder `public/assets/cust`.
2. Buka `invitationData.json`.
3. Ganti nama file atau tautan di bagian yang mau diubah. Contoh: 
   Dari: `"https://placehold.co/..."`
   Menjadi: `"/assets/cust/foto_anda_yang_baru.jpeg"`

---

## 🌐 Cara Menjadikannya Website Sungguhan (Build untuk Produksi)

Jika undangan Anda sudah selesai diedit dan siap dibagikan ke tamu:
1. Matikan server lokal di terminal dengan menekan tombol `Ctrl + C`.
2. Ketik perintah ini:
   ```bash
   npm run build
   ```
3. Proses ini akan membuat sebuah folder baru bernama **`dist`** di dalam proyek Anda.
4. Isi dari folder `dist` inilah yang Anda "unggah (upload)" ke layanan hosting *website* seperti **Vercel**, **Netlify**, atau **GitHub Pages** secara gratis! 

---

## 📁 Struktur Folder Penting
- `src/components/` : Berisi kepingan-kepingan kode penyusun undangan (Hero, Maps, Profil, dll).
- `src/data/invitationData.json` : Pusat pengatur data Anda!
- `public/assets/` : Lemari penyimpanan foto dan musik Anda.
- `capture/` : Folder ini disediakan untuk Anda menyimpan gambar *thumbnail*, *screenshot* demo undangan, atau keperluan dokumentasi pribadi.

---

> Dibuat dengan cinta dan banyak kopi oleh [@ikbal_handini](https://www.instagram.com/ikbal_handini/). Silakan hubungi via Instagram jika tertarik membuat *website* keren lainnya bersama **lazee Apps**!
