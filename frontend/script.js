// ================== AMBIL ELEMENT ==================
const input = document.getElementById("input");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");

const modeButtons = document.querySelectorAll(".mode");
const modeStatusText = document.getElementById("modeText");
const emotionIndicator = document.getElementById("emotionIndicator");

const newChatBtn = document.getElementById("newChatBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const CHAT_HISTORY_KEY = "emotionalai_history";

// ================== STATE ==================
let currentMode = "core";
const allowedModes = ["core", "calming", "listener"];

// ================== EVENT LISTENER ==================
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;
    if (!allowedModes.includes(mode)) return;

    currentMode = mode;
    updateActiveMode();
  });
});

newChatBtn?.addEventListener("click", startNewChat);
clearHistoryBtn?.addEventListener("click", clearHistory);

// ================== MODE UI ==================
function updateActiveMode() {
  modeButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.mode === currentMode)
  );

  const labels = {
    core: "AI UTAMA",
    calming: "AI PENENANG",
    listener: "AI PENDENGAR",
  };

  if (modeStatusText) {
    modeStatusText.textContent = `Mode Aktif: ${labels[currentMode]}`;
  }
}

// ================== EMOTION UI ==================
function updateEmotion(emotion = "netral") {
  if (!emotionIndicator) return;

  const map = {
    tenang: "😌 Tenang",
    cemas: "😟 Cemas",
    sedih: "😔 Sedih",
    marah: "😡 Marah",
    lelah: "😴 Lelah",
    netral: "😐 Netral",
  };

  emotionIndicator.textContent =
    map[emotion?.toLowerCase()] || "😐 Netral";
}

// ================== CHAT UI ==================
function addMessage(text, sender, meta = {}) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simpan ke history kecuali system message
  if (!meta.system) {
    saveToHistory({
      text,
      sender,
      mode: currentMode,
      emotion: meta.emotion || null,
      time: Date.now(),
    });
  }
}

// ================== HISTORY ==================
function saveToHistory(item) {
  const history =
    JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];

  history.push(item);
  if (history.length > 100) history.shift();

  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
}

function loadHistory() {
  const history =
    JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];

  history.forEach((item) => {
    const div = document.createElement("div");
    div.className = `message ${item.sender}`;
    div.textContent = item.text;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// ================== LOAD AWAL ==================
window.addEventListener("load", () => {
  loadHistory();
  updateActiveMode();
  updateEmotion("netral");
});

// ================== SEND MESSAGE ==================
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        mode: currentMode,
      }),
    });

    const data = await res.json();

    if (!data?.reply) {
      addMessage("⚠️ Respons AI tidak valid.", "ai");
      return;
    }

    addMessage(data.reply, "ai", { emotion: data.emotion });

    // Update emosi hanya di CORE
    if (currentMode === "core" && data.emotion) {
      updateEmotion(data.emotion);
    }

    // Auto rekomendasi mode
    if (
      currentMode === "core" &&
      data.recommendedAI &&
      allowedModes.includes(data.recommendedAI)
    ) {
      currentMode = data.recommendedAI;
      updateActiveMode();

      addMessage(
        `💡 Aku mendeteksi emosimu (${data.emotion}).\nAku akan menemanimu menggunakan AI ${data.recommendedAI.toUpperCase()}.`,
        "ai",
        { system: true }
      );
    }
  } catch (err) {
    console.error(err);
    addMessage("⚠️ Server tidak merespons.", "ai");
  }
}

// ================== NEW CHAT ==================
function startNewChat() {
  chatBox.innerHTML = "";

  currentMode = "core";
  updateActiveMode();
  updateEmotion("netral");

  addMessage(
    "🆕 Sesi baru dimulai. Aku siap mendengarkan kamu.",
    "ai",
    { system: true }
  );
}

// ================== CLEAR HISTORY ==================
function clearHistory() {
  const confirmClear = confirm(
    "Hapus seluruh riwayat chat? Ini tidak bisa dibatalkan."
  );

  if (!confirmClear) return;

  localStorage.removeItem(CHAT_HISTORY_KEY);
  chatBox.innerHTML = "";

  currentMode = "core";
  updateActiveMode();
  updateEmotion("netral");

  addMessage(
    "🧹 Riwayat telah dihapus. Kamu bisa mulai cerita dari awal.",
    "ai",
    { system: true }
  );
}
