# 🧠 Temtra Emotional AI

**Aplikasi AI Pendamping Emosi Berbasis Web**

Platform interaktif yang dirancang untuk membantu pengguna mengekspresikan perasaan, mendapatkan validasi emosional, dan respons yang menenangkan melalui teknologi AI yang empatik dan suportif.

---

## 📋 Daftar Isi

1. [Gambaran Umum](#gambaran-umum)
2. [Fitur Utama](#fitur-utama)
3. [Arsitektur Sistem](#arsitektur-sistem)
4. [Instalasi & Setup](#instalasi--setup)
5. [Panduan Penggunaan](#panduan-penggunaan)
6. [Dokumentasi Modul](#dokumentasi-modul)
7. [Dokumentasi API](#dokumentasi-api)
8. [Dokumentasi Frontend](#dokumentasi-frontend)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Gambaran Umum

### Apa itu Temtra Emotional AI?

Temtra Emotional AI adalah aplikasi web yang menghadirkan **tiga AI spesialis** untuk mendampingi emosi pengguna:

- **AI Utama (Core)**: Menganalisis emosi, memberikan respons empatik, dan merekomendasikan AI yang tepat
- **AI Penenang (Calming)**: Memandu teknik pernapasan, grounding, dan relaksasi
- **AI Pendengar (Listener)**: Mendengarkan tanpa penilaian, memvalidasi perasaan, dan bertanya reflektif

### Teknologi

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **LLM**: Groq API (Llama 3.1)
- **Penyimpanan**: localStorage (riwayat lokal)

### Filosofi

Aplikasi ini **bukan** pengganti layanan kesehatan mental profesional. Kami fokus pada:
- ✅ Memberikan ruang aman untuk berbagi
- ✅ Validasi emosional
- ✅ Teknik pengelolaan emosi
- ❌ Diagnosis medis
- ❌ Pengobatan

---

## ✨ Fitur Utama

### 1. **Tiga Mode AI Spesialis**

| Mode | Fungsi | Kapan Digunakan |
|------|--------|-----------------|
| **AI Utama** | Analisis emosi otomatis & rekomendasi mode | Untuk pemahaman holistik perasaan |
| **AI Penenang** | Teknik relaksasi & pernapasan | Saat merasa cemas atau gelisah |
| **AI Pendengar** | Validasi & pertanyaan reflektif | Saat ingin didengar tanpa saran |

### 2. **Deteksi & Indikator Emosi**

- Indikator emosi real-time dengan emoji
- Deteksi intensitas emosi (low, medium, high)
- Update otomatis berdasarkan analisis AI

### 3. **Riwayat Chat**

- Tersimpan secara lokal di browser
- Hingga 100 percakapan terakhir
- Dapat dihapus sesuai kebutuhan

### 4. **Navigasi Mode Intuitif**

- Tombol mode cepat di header
- Status mode aktif yang jelas
- Switch otomatis berdasarkan rekomendasi AI

### 5. **Manajemen Percakapan**

- ➕ Mulai percakapan baru
- 🗑️ Hapus seluruh riwayat
- Keyboard shortcut (Shift+Enter untuk baris baru, Enter untuk kirim)

---

## 🏗️ Arsitektur Sistem

### Diagram Alur Data

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Browser)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  HTML/CSS/JS - UI Chatbox, Mode Selection, History  │   │
│  └────────────────────────┬─────────────────────────────┘   │
│                           │                                  │
│                    HTTP POST (/chat)                         │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           routes/chat.js (Router)                    │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ • Validasi input message & mode               │  │   │
│  │  │ • Routing ke AI yang sesuai                   │  │   │
│  │  │ • Parse JSON response                          │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│           ┌───────────────┼───────────────┐                 │
│           │               │               │                 │
│           ▼               ▼               ▼                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  coreAI.js   │  │calmingAI.js  │  │listenerAI.js │      │
│  │              │  │              │  │              │      │
│  │ • Analisis   │  │ • Relaksasi  │  │ • Validasi   │      │
│  │   emosi      │  │ • Pernapasan │  │ • Mendengar  │      │
│  │ • JSON       │  │ • Teks biasa │  │ • Teks biasa │      │
│  │   output     │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │               │
│         └─────────────────┼─────────────────┘               │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                    Groq API / LLM
                            │
                    (llama-3.1-8b-instant)
```

### Struktur Folder

```
temtra_emotional_ai/
│
├── README.md                          # Dokumentasi utama
│
├── frontend/
│   ├── index.html                    # Struktur HTML aplikasi
│   ├── script.js                     # Logika interaktif browser
│   └── style.css                     # Styling & responsive design
│
└── backend/
    ├── package.json                  # Dependencies & scripts
    ├── server.js                     # Entry point server
    ├── .env                          # Konfigurasi (GROQ_API_KEY, PORT)
    │
    ├── routes/
    │   └── chat.js                   # Router untuk endpoint /chat
    │
    └── ai/
        ├── coreAI.js                 # AI Utama - Analisis & Rekomendasi
        ├── calmingAI.js              # AI Penenang - Relaksasi & Teknik
        ├── listenerAI.js             # AI Pendengar - Validasi & Mendengar
        └── motivatorAI.js            # AI Motivator (opsional)
```

---

## 🚀 Instalasi & Setup

### Prasyarat

- Node.js v18+ (atau lebih baru)
- npm atau yarn
- Groq API Key (gratis dari [console.groq.com](https://console.groq.com))

### Langkah 1: Clone Repository

```bash
git clone https://github.com/naandarz/temtra_emotional_ai.git
cd temtra_emotional_ai
```

### Langkah 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Buat file .env
cat > .env << EOF
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
EOF

# Ganti your_groq_api_key_here dengan API key Anda
```

### Langkah 3: Jalankan Backend

```bash
npm start
```

Output yang diharapkan:
```
Server running on port 3000
```

### Langkah 4: Buka Frontend

Buka browser dan navigasi ke:
```
file:///path/to/temtra_emotional_ai/frontend/index.html
```

**Atau** gunakan Live Server:
```bash
# Instal Live Server di VS Code
# Klik kanan index.html → Open with Live Server
```

### Langkah 5: Verifikasi Koneksi

1. Pilih mode AI dari tombol di header
2. Ketik pesan uji di input field
3. Klik "Kirim" atau tekan Enter
4. Jika berhasil, akan muncul respons dari AI

---

## 📖 Panduan Penggunaan

### Alur Penggunaan Dasar

#### 1. Membuka Aplikasi

```
┌─────────────────────────────────────┐
│  🧠 AI Pendamping Emosi             │
│  Tempat aman untuk bercerita &      │
│  menenangkan diri                   │
│                                     │
│  😐 Netral     [Mode Aktif: CORE]   │
└─────────────────────────────────────┘
```

#### 2. Memilih Mode AI

**Header menunjukkan:**
- Tombol mode: `[AI Utama] [AI Penenang] [AI Pendengar]`
- Status mode aktif dengan indikator visual
- Indikator emosi dengan emoji

#### 3. Mengetik Pesan

```
textarea (placeholder: "Ceritakan perasaanmu di sini...")
        ↓
[Kirim] button
```

**Keyboard shortcuts:**
- `Enter` → Kirim pesan
- `Shift + Enter` → Baris baru
- `Tab` → Keluar dari input (opsional)

#### 4. Menerima Respons

**Dari AI Utama (Core):**
- Respons empatik
- Indikator emosi
- Rekomendasi mode otomatis

**Dari AI Penenang:**
- Teknik relaksasi
- Panduan pernapasan
- Pesan yang menenangkan

**Dari AI Pendengar:**
- Validasi perasaan
- Pertanyaan reflektif
- Dukungan tanpa saran

### Fitur Tambahan

#### ➕ Mulai Chat Baru
- Menghapus chat aktif
- Reset ke mode Core
- Mulai sesi baru

#### 🗑️ Hapus Riwayat
- Menghapus semua percakapan dari localStorage
- Konfirmasi sebelum dihapus
- Tidak bisa dibatalkan

#### 📱 Responsive Design
- Desktop: Lebar penuh (~90%)
- Tablet: Menyesuaikan ukuran
- Mobile: Optimal untuk layar kecil

---

## 🔧 Dokumentasi Modul

### Backend

#### **server.js** - Entry Point

**Fungsi:**
- Inisialisasi Express app
- Konfigurasi middleware (CORS, JSON parser)
- Mount routes

**Dependencies:**
```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";
```

**Konfigurasi:**
```javascript
app.use(cors());                    // Izinkan request dari frontend
app.use(express.json());            // Parse JSON body
app.use("/chat", chatRoute);        // Mount chat router
```

**Port:** Diambil dari `process.env.PORT` (default: 3000)

---

#### **routes/chat.js** - API Router

**Endpoint:**
```
POST /chat
```

**Request Body:**
```json
{
  "message": "string - pesan dari user",
  "mode": "core | calming | listener"
}
```

**Response Success (Core Mode):**
```json
{
  "reply": "Respons empatik...",
  "emotion": "sedih | cemas | tenang | marah | lelah | netral",
  "intensity": "low | medium | high",
  "recommendedAI": "core | calming | listener"
}
```

**Response Success (Manual Mode):**
```json
{
  "reply": "Respons dari AI spesialis..."
}
```

**Error Response:**
```json
{
  "reply": "Maaf, aku sedang kesulitan merespons. Coba lagi sebentar ya."
}
```

**Logika:**

```
┌─ Request /chat ─────────────────┐
│                                 │
├─ Mode Manual (calming/listener)?│
│  │                              │
│  ├─ Ya → Panggil AI Spesialis  │
│  │        Return: { reply }     │
│  │                              │
│  └─ Tidak ↓                     │
│                                 │
├─ Mode Core                      │
│  │                              │
│  ├─ Panggil coreAI()            │
│  ├─ Parse JSON response         │
│  ├─ Extract: emotion, intensity │
│  │            response, rec_ai  │
│  │                              │
│  └─ Return: { reply, emotion,   │
│              intensity, recAI } │
│                                 │
└─────────────────────────────────┘
```

---

#### **ai/coreAI.js** - AI Utama (Analisis & Rekomendasi)

**Fungsi:**
- Menganalisis emosi pengguna
- Memberikan respons empatik
- Merekomendasikan AI spesialis yang tepat
- Mengembalikan JSON terstruktur

**Model:** `llama-3.1-8b-instant`
**Temperature:** 0.4 (fokus, konsisten)

**Prompt System:**
```
Kamu adalah AI pendamping emosi yang empatik.
TUGAS:
- Analisis kondisi emosional pengguna
- Berikan respons yang empatik
- Rekomendasikan AI spesialis yang paling cocok

ATURAN OUTPUT (SANGAT PENTING):
- Kembalikan HANYA JSON
- TANPA penjelasan atau markdown
- JSON harus dimulai dengan { dan diakhiri }

FORMAT JSON:
{
  "emotion": "string",
  "intensity": "low | medium | high",
  "response": "pesan empatik dalam Bahasa Indonesia",
  "recommended_ai": "core | calming | listener"
}

BATASAN:
- JANGAN diagnosa
- JANGAN sebutkan istilah medis
- Gunakan Bahasa Indonesia yang hangat
```

**Output JSON:**
```json
{
  "emotion": "cemas",
  "intensity": "medium",
  "response": "Aku mengerti kamu merasa cemas. Perasaan itu normal...",
  "recommended_ai": "calming"
}
```

**Contoh Implementasi:**
```javascript
export async function coreAI(userInput) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "..." },
      { role: "user", content: userInput }
    ],
    temperature: 0.4
  });
  return completion.choices[0].message.content;
}
```

---

#### **ai/calmingAI.js** - AI Penenang (Relaksasi)

**Fungsi:**
- Memandu teknik pernapasan
- Memberikan instruksi grounding
- Respons relaksasi yang hangat dan lambat

**Model:** `llama-3.1-8b-instant`
**Temperature:** 0.5 (seimbang)

**Prompt System:**
```
Kamu adalah AI pendamping emosi yang menenangkan.
Pandulah pernapasan, grounding, dan relaksasi.
Bicara lambat, hangat, dan lembut dalam Bahasa Indonesia.
JANGAN diagnosa.
```

**Karakteristik Output:**
- Instruksi step-by-step
- Kata-kata yang menenangkan
- Fokus pada fisik (pernapasan, otot)
- Tidak ada istilah medis

**Contoh Output:**
```
Ayo kita mulai dengan pernapasan dalam, ya...

1. Tarik napas perlahan melalui hidung selama 4 hitungan
2. Tahan napas selama 4 hitungan
3. Hembuskan perlahan melalui mulut selama 6 hitungan
4. Tahan selama 2 hitungan

Ulangi 5 kali. Rasakan tubuhmu rileks...
```

---

#### **ai/listenerAI.js** - AI Pendengar (Validasi & Mendengarkan)

**Fungsi:**
- Mendengarkan tanpa penilaian
- Memvalidasi perasaan
- Bertanya pertanyaan reflektif
- Tidak memberikan saran kecuali diminta

**Model:** `llama-3.1-8b-instant`
**Temperature:** 0.6 (kreatif, variatif)

**Prompt System:**
```
Kamu adalah AI pendengar yang tidak menghakimi.
Dengarkan dengan perhatian, validasi perasaan, 
dan ajukan pertanyaan reflektif yang lembut.
Gunakan Bahasa Indonesia.
JANGAN berikan saran kecuali diminta.
```

**Karakteristik Output:**
- Frasa validasi: "Perasaanmu valid", "Itu wajar"
- Pertanyaan reflektif: "Apa yang membuat...?", "Bagaimana perasaanmu tentang...?"
- Mirroring emosi: Mengulangi perasaan dengan kata-kata sendiri
- Suportif tanpa solusi

**Contoh Output:**
```
Aku mengerti bahwa kamu merasa sendirian dalam situasi ini.
Terima kasih sudah berbagi denganku.

Bisa diceritakan lebih banyak tentang apa yang terjadi?
Apa yang paling sulit dari pengalaman ini?
```

---

#### **ai/motivatorAI.js** - AI Motivator (Opsional)

**Fungsi:**
- Memberikan semangat dan motivasi
- Fokus ke masa depan yang realistis
- Membangkitkan harapan

**Model:** `llama3-8b-8192`
**Temperature:** Default (kreatif)

**Prompt:**
```
Kamu adalah AI motivator yang suportif.
Bangkitkan semangat, berikan harapan, 
dan fokus ke masa depan secara realistis.
```

**Status:** Saat ini tidak terintegrasi dalam flow utama. Dapat ditambahkan sebagai mode 4 di masa depan.

---

### Frontend

#### **index.html** - Struktur UI

**Elemen Utama:**

```html
<div class="app">
  <!-- HEADER: Judul, tagline, indikator emosi -->
  <header>
    <h1>🧠 AI Pendamping Emosi</h1>
    <p>Tempat aman untuk bercerita & menenangkan diri</p>
    <div id="emotionIndicator">😐 Netral</div>
  </header>

  <!-- MODE STATUS: Status mode aktif -->
  <div id="modeStatus" class="mode-status">
    <span class="dot"></span>
    <span id="modeText">Mode Aktif: AI UTAMA</span>
  </div>

  <!-- MODE MENU: Tombol seleksi mode -->
  <div class="mode-menu">
    <button class="mode active" data-mode="core">AI Utama</button>
    <button class="mode" data-mode="calming">AI Penenang</button>
    <button class="mode" data-mode="listener">AI Pendengar</button>
  </div>

  <!-- ACTION MENU: Tombol aksi -->
  <div class="action-menu">
    <button id="newChatBtn">➕ New Chat</button>
    <button id="clearHistoryBtn" class="danger">🗑 Hapus</button>
  </div>

  <!-- CHAT BOX: Area percakapan -->
  <div class="chat-box" id="chatBox"></div>

  <!-- INPUT AREA: Input & tombol kirim -->
  <div class="input-area">
    <textarea id="input" placeholder="Ceritakan perasaanmu di sini..."></textarea>
    <button id="sendBtn">Kirim</button>
  </div>
</div>
```

**Struktur DOM:**
- Responsive 90% width, max 1200px
- Flexbox layout vertikal
- Fixed header & input, scrollable chat area
- Mobile-first CSS

---

#### **style.css** - Styling & UX

**Skema Warna:**
| Elemen | Warna | Usage |
|--------|-------|-------|
| Background | `#eef5f1` | Warna hijau tenang (latar) |
| Card | `#ffffff` | White (app container) |
| Text | `#2c3e50` | Dark blue (heading) |
| Secondary | `#7f8c8d` | Gray (subtitle) |
| Success | `#27ae60` | Green (tombol kirim) |
| Danger | `#e74c3c` | Red (hapus) |
| AI | `#3498db` | Blue (pesan AI) |
| User | `#95a5a6` | Gray (pesan user) |

**Responsive Breakpoints:**
```css
/* Desktop */
.app {
  width: 90%;
  max-width: 1200px;
  height: 90vh;
}

/* Tablet & Mobile */
@media (max-width: 768px) {
  .app {
    width: 95%;
    height: 95vh;
    padding: 20px;
  }
}
```

**Komponen Styling:**

| Komponen | Class | Deskripsi |
|----------|-------|-----------|
| Header | `header` | Text center, margin bottom |
| Mode Buttons | `.mode` | Tombol toggle dengan active state |
| Chat Messages | `.message.user / .ai` | Styling pesan dengan alignment berbeda |
| Input | `textarea#input` | Resizable, focus state |
| Buttons | `.action-btn`, `.danger` | Styling dengan hover effects |
| Emotion Indicator | `.emotion-indicator` | Badge dengan emoji & text |

---

#### **script.js** - Logika Interaktif

**State Management:**

```javascript
let currentMode = "core";           // Mode AI aktif
const allowedModes = ["core", "calming", "listener"];
const CHAT_HISTORY_KEY = "emotionalai_history";
```

**Event Listeners:**

```javascript
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", handleKeypress);  // Enter to send
modeButtons.forEach(btn => {
  btn.addEventListener("click", switchMode);
});
newChatBtn.addEventListener("click", startNewChat);
clearHistoryBtn.addEventListener("click", clearHistory);
```

**Fungsi Utama:**

| Fungsi | Deskripsi | Return |
|--------|-----------|--------|
| `sendMessage()` | Kirim pesan ke backend | void (display result) |
| `addMessage(text, sender, meta)` | Render & simpan pesan | void |
| `saveToHistory(item)` | Simpan ke localStorage | void |
| `loadHistory()` | Load & render chat history | void |
| `updateActiveMode()` | Update UI mode aktif | void |
| `updateEmotion(emotion)` | Update indikator emosi | void |
| `startNewChat()` | Reset sesi baru | void |
| `clearHistory()` | Hapus semua riwayat | void |

**Alur sendMessage():**

```javascript
async function sendMessage() {
  1. Ambil text dari input
  2. Display pesan user
  3. Clear input field
  4. Fetch POST /chat dengan mode & message
  5. Parse response JSON
  6. Display respons AI
  7. Update emosi (jika core mode)
  8. Auto-switch mode (jika ada rekomendasi)
  9. Handle error → tampilkan pesan error
}
```

**Contoh Request-Response:**

```javascript
// REQUEST
fetch("http://localhost:3000/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "Aku merasa sedih",
    mode: "core"
  })
})

// RESPONSE
{
  reply: "Aku mengerti kamu merasa sedih...",
  emotion: "sedih",
  intensity: "medium",
  recommendedAI: "calming"
}
```

**localStorage Management:**

```javascript
// Struktur history item
{
  text: "pesan chat",
  sender: "user | ai",
  mode: "core | calming | listener",
  emotion: "sentimen atau null",
  time: timestamp
}

// Max 100 item, yang terbaru disimpan pertama
```

---

## 🔌 Dokumentasi API

### Endpoint

#### `POST /chat`

**URL:**
```
http://localhost:3000/chat
```

**Content-Type:**
```
application/json
```

**Request Body:**
```json
{
  "message": "Aku merasa cemas dan tidak tahu harus bagaimana",
  "mode": "core"
}
```

**Parameter:**

| Parameter | Type | Required | Values | Deskripsi |
|-----------|------|----------|--------|-----------|
| `message` | string | ✅ | any | Pesan dari user |
| `mode` | string | ✅ | "core", "calming", "listener" | Mode AI yang dipilih |

**Response (Core Mode):**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "reply": "Cemas adalah perasaan yang natural. Aku di sini untuk menemani...",
  "emotion": "cemas",
  "intensity": "medium",
  "recommendedAI": "calming"
}
```

**Response (Manual Mode - Calming/Listener):**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "reply": "Mari kita lakukan pernapasan dalam bersama..."
}
```

**Error Response:**

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "reply": "Maaf, aku sedang kesulitan merespons. Coba lagi sebentar ya."
}
```

**Status Codes:**

| Code | Meaning | Contoh Kasus |
|------|---------|-------------|
| 200 | Success | Request berhasil diproses |
| 400 | Bad Request | Message atau mode tidak valid |
| 500 | Server Error | Groq API error / parsing error |

**Contoh cURL:**

```bash
# Core Mode
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Aku merasa cemas","mode":"core"}'

# Calming Mode
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Tolong aku tenang","mode":"calming"}'

# Listener Mode
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Aku ingin didengar saja","mode":"listener"}'
```

---

## 📱 Dokumentasi Frontend

### UI/UX Flow

```
┌─────────────────────────────────────────┐
│ Buka aplikasi                           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Load riwayat chat (localStorage)        │
│ Set mode = "core"                       │
│ Update UI                               │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Tampilkan chat history (jika ada)       │
│ User dapat memilih mode AI              │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ User mengetik pesan                     │
│ - Tekan Enter → sendMessage()           │
│ - Tekan Shift+Enter → Newline           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Display pesan user di chat box          │
│ Simpan ke localStorage                  │
│ Clear input field                       │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Fetch POST /chat (async)                │
│ Body: { message, mode }                 │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Tunggu response dari backend            │
│ (Backend fetch Groq API)                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Parse response JSON                     │
│ - reply (required)                      │
│ - emotion (optional, core only)         │
│ - recommendedAI (optional, core only)   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Display pesan AI di chat box            │
│ Simpan ke localStorage                  │
│ Update indikator emosi (jika core)      │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ Jika mode core & ada recommended_ai:    │
│ - Auto switch ke mode baru              │
│ - Tampilkan notifikasi rekomendasi      │
│ - Update UI button mode                 │
└─────────────────────────────────────────┘
```

### Component Interaksi

#### Mode Selection

```html
<div class="mode-menu">
  <button class="mode active" data-mode="core">AI Utama</button>
  <button class="mode" data-mode="calming">AI Penenang</button>
  <button class="mode" data-mode="listener">AI Pendengar</button>
</div>
```

**Behavior:**
- Click tombol → `currentMode` berubah
- Update `.active` class
- Update `#modeText` status
- Pesan user berikutnya menggunakan mode baru

#### Chat Message

```html
<!-- User Message -->
<div class="message user">
  Aku merasa cemas
</div>

<!-- AI Message -->
<div class="message ai">
  Cemas adalah perasaan yang natural...
</div>
```

**Styling:**
- User: Right-aligned, gray background
- AI: Left-aligned, blue background
- Auto-scroll ke pesan terbaru

#### Emotion Indicator

```html
<div id="emotionIndicator" class="emotion-indicator">
  😐 Netral
</div>
```

**Update Map:**
```javascript
{
  tenang: "😌 Tenang",
  cemas: "😟 Cemas",
  sedih: "😔 Sedih",
  marah: "😡 Marah",
  lelah: "😴 Lelah",
  netral: "😐 Netral"
}
```

### Storage & Persistence

**localStorage Key:** `emotionalai_history`

**Data Structure:**
```javascript
[
  {
    text: "Aku merasa cemas",
    sender: "user",
    mode: "core",
    emotion: null,
    time: 1705382400000
  },
  {
    text: "Cemas adalah perasaan yang natural...",
    sender: "ai",
    mode: "core",
    emotion: "cemas",
    time: 1705382401000
  }
]
```

**Max Items:** 100 (FIFO - First In First Out)

**Clear Trigger:**
- Click tombol "🗑 Hapus" dengan konfirmasi
- Tidak ada auto-clear berdasarkan waktu

---

## 🐛 Troubleshooting

### Problem: Server tidak bisa dijalankan

**Error:**
```
Error: listen EADDRINUSE :::3000
```

**Solusi:**
1. Port 3000 sudah digunakan aplikasi lain
2. Ubah port di `.env`:
   ```bash
   PORT=3001
   ```
3. Restart server

**Alternatif:** Tutup aplikasi yang menggunakan port 3000

---

### Problem: Frontend tidak bisa koneksi ke Backend

**Error di console:**
```
CORS error: Access to XMLHttpRequest blocked
```

**Penyebab & Solusi:**

| Penyebab | Solusi |
|---------|--------|
| Backend tidak running | Jalankan `npm start` di folder backend |
| URL endpoint salah | Cek hardcoded URL di script.js |
| CORS tidak aktif | Pastikan `app.use(cors())` di server.js |
| Port berbeda | Update URL jika ubah PORT |

**Debug:**
```javascript
// Di browser console, cek:
console.log("Trying to fetch...");
fetch("http://localhost:3000/chat", {...})
  .then(r => console.log("Response:", r))
  .catch(e => console.error("Error:", e))
```

---

### Problem: Groq API Error

**Error:**
```
Error: Invalid API key
```

**Solusi:**
1. Pastikan `.env` memiliki `GROQ_API_KEY`
2. Cek key di [console.groq.com](https://console.groq.com)
3. Restart server setelah ubah `.env`

**Verifikasi:**
```bash
# Di backend folder
echo $GROQ_API_KEY  # Pastikan tidak kosong
```

---

### Problem: Chat history tidak tersimpan

**Penyebab:**
- localStorage disabled di browser
- Incognito/Private mode (history tidak persist)

**Solusi:**
1. Gunakan browser normal (bukan incognito)
2. Cek browser settings: Privacy → Cookies & storage
3. Clear browser cache & cookies

---

### Problem: Pesan AI tidak muncul

**Kemungkinan:**
1. Groq API respons lambat
2. Parsing JSON gagal
3. Response tidak valid

**Debug:**
```javascript
// Buka Developer Tools (F12)
// Console tab → lihat error message
// Network tab → lihat respons API
```

**Check response dari backend:**
```bash
# Terminal backend
# Lihat output "RAW AI OUTPUT"
# Jika format error, cek prompt di coreAI.js
```

---

### Problem: Mode auto-switch tidak bekerja

**Penyebab:**
- Response AI tidak berisi `recommended_ai`
- Mode rekomendasi bukan valid

**Solusi:**
1. Pastikan mode = "core" saat mengirim
2. Check Groq API respons JSON format
3. Lihat console untuk "RAW AI OUTPUT"

---

### Problem: CSS Styling tidak jalan

**Penyebab:**
- CSS file path salah
- Browser cache

**Solusi:**
1. Verifikasi path di HTML: `<link rel="stylesheet" href="style.css">`
2. Hard refresh: `Ctrl+Shift+R`
3. Clear browser cache

---

## 🎓 Best Practices

### Untuk Developer

#### Backend

✅ **DO:**
- Gunakan `.env` untuk sensitive data
- Validasi input di setiap route
- Log error untuk debugging
- Gunakan try-catch untuk async operations

❌ **DON'T:**
- Hardcode API key
- Skip error handling
- Konsumsi Groq API tanpa cek quota

#### Frontend

✅ **DO:**
- Validasi input sebelum send
- Handle error cases dengan UI feedback
- Use semantic HTML
- Test di berbagai device

❌ **DON'T:**
- Hardcode backend URL (gunakan config)
- Forget keyboard accessibility
- Overload chat history (>1000 items)

---

### Untuk User

✅ **DO:**
- Gunakan aplikasi sebagai emotional support, bukan medical advice
- Berbagi dengan jujur untuk respons lebih baik
- Coba ketiga mode AI untuk menemukan yang paling cocok

❌ **DON'T:**
- Anggap AI sebagai pengganti terapis profesional
- Gunakan untuk emergency mental health crisis
- Share informasi sensitif (password, kartu kredit)

---

## 🚦 Peta Jalan (Roadmap)

### v1.0 (Saat Ini)
- ✅ Tiga mode AI (Core, Calming, Listener)
- ✅ Deteksi emosi
- ✅ Riwayat chat lokal
- ✅ Responsive design

### v1.1 (Planned)
- 🔄 Integrasi Mode Motivator
- 🔄 Settings user (bahasa, theme)
- 🔄 Export chat history (PDF/TXT)
- 🔄 Multi-language support

### v2.0 (Future)
- 🔄 Authentikasi user
- 🔄 Cloud-based history
- 🔄 Notifikasi reminder
- 🔄 Analisis mood trend
- 🔄 Integration dengan calendar/reminders

---

## 📞 Support & Kontribusi

### Report Bug
1. Deskripsi bug secara jelas
2. Steps untuk reproduce
3. Screenshot/video jika perlu
4. Browser & OS yang digunakan

### Kontribusi

Kami welcome kontribusi! Silakan:
1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📄 License

Proyek ini dilisensikan di bawah ISC License - lihat file LICENSE untuk detail.

---

## ❤️ Terima Kasih

Terima kasih telah menggunakan Temtra Emotional AI. Semoga aplikasi ini dapat membantu kamu dalam perjalanan emosional. 🌟

---

**Last Updated:** Januari 2026
**Version:** 1.0.0
**Maintainer:** naandarz
