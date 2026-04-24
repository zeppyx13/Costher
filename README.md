# Coasther — Mobile App (Tenant)

Aplikasi mobile tenant **Coasther** berbasis React Native CLI, dirancang untuk mempermudah penghuni kost dalam memantau penggunaan utilitas, mengelola tagihan, dan berkomunikasi dengan pengelola secara digital.

## Fitur Utama

- **Dashboard Tenant** — Ringkasan kamar, tagihan bulan ini, dan pengumuman terbaru
- **IoT Monitoring** — Pantau pemakaian listrik & air kamar secara real-time via Socket.IO
- **AI Insight** — Analisis dan prediksi pemakaian utilitas berbasis Google Gemini
- **Pembayaran** — Bayar tagihan bulanan via Midtrans (QRIS, Transfer, dll)
- **Riwayat Invoice** — Lihat semua tagihan dan status pembayaran
- **Keluhan** — Buat dan pantau status keluhan ke pengelola
- **Review** — Berikan rating dan ulasan untuk kamar
- **Pengumuman** — Terima info terbaru dari pengelola
- **Info Kontrak** — Detail kontrak sewa dan sisa masa tinggal
- **Booking Kamar** — Ajukan booking kamar baru langsung dari aplikasi
- **Notifikasi Push** — FCM notification untuk tagihan, pembayaran, keluhan, dan pengumuman
- **Google Maps** — Lokasi kost terintegrasi dengan Google Maps
- **Profil & Keamanan** — Edit profil, ganti password, hapus akun via OTP

## Tech Stack

- **Framework** — React Native CLI (TypeScript)
- **Navigasi** — React Navigation v6 (Native Stack)
- **HTTP Client** — Axios
- **Realtime** — Socket.IO client
- **Push Notification** — Firebase Cloud Messaging (FCM)
- **Pembayaran** — Midtrans Snap (WebView)
- **Maps** — React Native Maps + Google Maps API
- **Storage** — AsyncStorage
- **Font** — Poppins + Inter

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/zeppyx13/Costher.git
cd Costher
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Google Maps

Rename file `AndroidManifest1.xml` menjadi `AndroidManifest.xml` pada:

```bash
android/app/src/main/AndroidManifest.xml
```

Lalu isi API key Google Maps di dalam file tersebut:

```xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY" />
```

### 4. Setup environment

Sesuaikan base URL backend di `src/lib/api.ts`:

```ts
baseURL: 'http://YOUR_BACKEND_IP:5000';
```

### 5. Jalankan aplikasi

```bash
# Android
npm run android

# iOS
npm run ios
```

## Struktur Screen

Home → Landing page & info kost <br>
Room → Daftar kamar tersedia <br>
DetailRoom → Detail kamar & fasilitas<br>
Booking → Form booking kamar<br>
Login → Autentikasi tenant<br>
Register → Registrasi akun baru<br>
ForgotPassword → Reset password via OTP<br>
Dashboard → Dashboard utama tenant<br>
Payment → Detail & proses pembayaran<br>
MidtransProcessing → Halaman proses Midtrans<br>
InvoiceHistory → Riwayat tagihan<br>
MeterReadings → Riwayat bacaan meter IoT<br>
AIInsight → Insight & prediksi AI<br>
LeaseInfo → Info kontrak sewa<br>
Complaint → Keluhan tenant<br>
Review → Rating & ulasan kamar<br>
Announcement → Pengumuman pengelola<br>
Profile → Profil pengguna<br>
EditProfile → Edit data profil<br>
DeleteAccount → Hapus akun via OTP<br>

## Kontributor

- [@GungNanda-230040028](https://github.com/zeppyx13)
- [@Dewa-230040026](https://github.com/DwDhrm7)

## Lisensi

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
