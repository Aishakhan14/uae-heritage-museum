
"use strict";

/* =========================================================
   UAE HERITAGE MUSEUM — MAIN JAVASCRIPT
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* CHAPTERS */

const chapters = {
  past: {
    number: "01",
    kicker: "WHERE OUR STORY BEGAN",
    title: "The Roots of the UAE",
    arabicTitle: "جذور دولة الإمارات",
    description: "Before the modern skyline, life in the Emirates was shaped by the desert, the sea, and close-knit communities. Fishing, pearl diving, trade, farming, and craftsmanship helped families build lives together. Stories, values, and knowledge passed between generations became the roots of a shared national identity.",
    arabicDescription: "قبل ناطحات السحاب الحديثة، تشكّلت الحياة في الإمارات من الصحراء والبحر والمجتمعات المترابطة. ساهم الصيد والغوص على اللؤلؤ والتجارة والزراعة والحرف اليدوية في بناء حياة الأسر. وانتقلت القصص والقيم والمعرفة بين الأجيال لتصبح جذور الهوية الوطنية المشتركة.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
  },
  present: {
    number: "02",
    kicker: "A NATION IN MOTION",
    title: "The UAE Today",
    arabicTitle: "الإمارات اليوم",
    description: "Today, the UAE brings together people, cultures, and ideas. Its cities, universities, museums, and creative industries reflect ambition and progress. While the country continues to innovate, family, hospitality, generosity, and respect remain important parts of everyday life.",
    arabicDescription: "تجمع دولة الإمارات اليوم بين الناس والثقافات والأفكار. وتعكس مدنها وجامعاتها ومتاحفها وصناعاتها الإبداعية الطموح والتقدم. ومع استمرار الابتكار، تظل الأسرة والضيافة والكرم والاحترام من القيم المهمة في الحياة اليومية.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
  },
  future: {
    number: "03",
    kicker: "IMAGINING TOMORROW",
    title: "A Future of Possibilities",
    arabicTitle: "مستقبل مليء بالإمكانات",
    description: "The future is shaped by the choices people make today. Science, technology, sustainability, education, and creativity can help the UAE meet new challenges. The next generation has a role in protecting the environment, respecting heritage, and building a future that benefits everyone.",
    arabicDescription: "يتشكل المستقبل من خلال الخيارات التي نتخذها اليوم. ويمكن للعلوم والتكنولوجيا والاستدامة والتعليم والإبداع أن تساعد الإمارات في مواجهة التحديات الجديدة. وللجيل القادم دور في حماية البيئة واحترام التراث وبناء مستقبل يفيد الجميع.",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2000&q=85"
  },
  unity: {
    number: "04",
    kicker: "SEVEN EMIRATES, ONE NATION",
    title: "The Strength of Unity",
    arabicTitle: "قوة الاتحاد",
    description: "The UAE was formed on 2 December 1971, bringing emirates together in a union built on cooperation and shared purpose. Each emirate has its own character, landscapes, and traditions. Together, they form one nation whose strength comes from unity, diversity, and a common vision.",
    arabicDescription: "تأسست دولة الإمارات في الثاني من ديسمبر عام 1971، لتجمع الإمارات في اتحاد يقوم على التعاون والهدف المشترك. ولكل إمارة طابعها ومناظرها الطبيعية وتقاليدها الخاصة. وتشكل الإمارات معًا دولة واحدة تستمد قوتها من الاتحاد والتنوع والرؤية المشتركة.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
  }
};

let currentChapter = "past";
let currentLanguage = "en";
let voices = [];
let selectedVoice = null;
let currentStory = 0;
let uploadedPortrait = null;
let portraitImage = null;
let portraitStream = null;
let selectedPortraitId = null;
let portraitRecords = [];
let databasePromise = null;

const chapterKeys = ["past", "present", "future", "unity"];

const storyData = [
  {
    category: "FAMILY & LEGACY",
    title: "Family, Leadership & Legacy",
    date: "A STORY OF CONTINUITY",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Adi_with_the_three_rulers_of_Dubai.jpg",
    text: "Family histories and public histories often meet. Across generations, people have helped shape their communities through service, leadership, learning, and cooperation. Remembering the people who came before us helps us understand the values that continue to guide the UAE.",
    detail: "A photograph can preserve more than a face. It can keep a moment, a relationship, and a piece of community memory alive for the next generation."
  },
  {
    category: "HOME & COMMUNITY",
    title: "A Home Built for Togetherness",
    date: "TRADITIONAL NEIGHBOURHOODS",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Al_Fahidi_Historical_Neighbourhood%2C_Dubai.jpg?width=1200",
    text: "Traditional neighbourhoods were places where neighbours knew one another and daily life brought people together. Courtyards, shaded walkways, and gathering spaces supported family life, conversation, and hospitality.",
    detail: "The majlis is an important gathering space in Emirati culture, associated with welcoming guests, exchanging ideas, and strengthening relationships."
  },
  {
    category: "CHILDHOOD & IDENTITY",
    title: "Tradition Through Young Eyes",
    date: "CULTURE PASSED ON",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Emirati_Children_playing_in_Traditional_Dresses.jpg?width=1200",
    text: "Children experience heritage through family stories, celebrations, language, clothing, food, and the example of older generations. These experiences help them understand where they come from while creating their own memories.",
    detail: "Heritage stays alive when younger generations are invited to learn, ask questions, take part, and make traditions meaningful in their own lives."
  },
  {
    category: "SKILLS & GENERATIONS",
    title: "Knowledge Passed Hand to Hand",
    date: "CRAFT & EVERYDAY LIFE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/A1_Two_Emirati_women.jpg?width=1200",
    text: "Traditional knowledge includes weaving, cooking, storytelling, fishing, navigation, and other skills learned through practice. Families and communities have passed these forms of knowledge from one generation to another.",
    detail: "Palm-frond weaving, known as khoos, uses date-palm leaves to create useful objects. It reflects the resourcefulness of communities that made thoughtful use of the materials around them."
  }
];

/* CHAPTER DISPLAY */

function updateChapter(key) {
  if (!chapters[key]) return;
  currentChapter = key;
  const chapter = chapters[key];

  $("#chapter-kicker").textContent = chapter.kicker;
  $("#chapter-number").textContent = chapter.number;
  $("#chapter-title").textContent = chapter.title;
  $("#chapter-arabic-title").textContent = chapter.arabicTitle;
  $("#chapter-description").textContent = chapter.description;
  $("#chapter-arabic-description").textContent = chapter.arabicDescription;

  const image = $("#chapter-image");
  image.style.opacity = "0";
  image.onload = () => { image.style.opacity = "1"; };
  image.onerror = () => { image.style.opacity = "0.35"; };
  image.src = chapter.image;
  if (image.complete && image.naturalWidth) image.style.opacity = "1";

  $$(".timeline-stop").forEach(button => {
    const active = button.dataset.chapter === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });

  $$(".chapter-card").forEach(button => {
    button.classList.toggle("active", button.dataset.chapter === key);
  });

  const progress = $("#chapter-timeline-progress");
  if (progress) progress.style.width = `${(chapterKeys.indexOf(key) / (chapterKeys.length - 1)) * 100}%`;

  if ($("#background-mode").value === "animated") {
    image.style.opacity = "0";
  }
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  $("#audio-status").textContent = "";
}

$$("[data-chapter]").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.chapter;
    if (chapters[key]) {
      updateChapter(key);
      if (button.classList.contains("chapter-card")) {
        $("#hero").scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

/* NARRATION */

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    $("#audio-status").textContent = "Narration is not supported by this browser.";
    $("#read-button").disabled = true;
    return;
  }

  voices = speechSynthesis.getVoices();
  const select = $("#voice-select");
  const previous = select.value;
  select.replaceChildren();

  const auto = document.createElement("option");
  auto.value = "";
  auto.textContent = "Automatic voice";
  select.append(auto);

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? " · Default" : ""}`;
    select.append(option);
  });

  if (previous && select.querySelector(`option[value="${CSS.escape(previous)}"]`)) {
    select.value = previous;
  }
}

if ("speechSynthesis" in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

$("#voice-select").addEventListener("change", () => {
  selectedVoice = $("#voice-select").value === ""
    ? null
    : voices[Number($("#voice-select").value)] || null;
});

$("#read-button").addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();

  const chapter = chapters[currentChapter];
  const text = currentLanguage === "ar"
    ? chapter.arabicDescription
    : `${chapter.title}. ${chapter.description}`;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLanguage === "ar" ? "ar-AE" : "en-AE";

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  } else {
    const preferred = voices.find(v =>
      currentLanguage === "ar"
        ? /^ar/i.test(v.lang)
        : /^en-AE/i.test(v.lang)
    ) || voices.find(v =>
      currentLanguage === "ar" ? /^ar/i.test(v.lang) : /^en/i.test(v.lang)
    );
    if (preferred) {
      utterance.voice = preferred;
      utterance.lang = preferred.lang;
    }
  }

  utterance.onstart = () => {
    $("#audio-status").textContent = currentLanguage === "ar"
      ? "جاري تشغيل السرد..."
      : "Narration is playing…";
    $("#read-button").textContent = currentLanguage === "ar" ? "▶ تشغيل السرد" : "▶ Narration playing";
  };
  utterance.onend = () => {
    $("#audio-status").textContent = currentLanguage === "ar" ? "انتهى السرد." : "Narration finished.";
    $("#read-button").textContent = currentLanguage === "ar" ? "▶ تشغيل السرد" : "▶ Play English narration";
  };
  utterance.onerror = () => {
    $("#audio-status").textContent = "The selected voice could not play. Try another voice.";
    $("#read-button").textContent = "▶ Play narration";
  };

  speechSynthesis.speak(utterance);
});

$("#stop-button").addEventListener("click", () => {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  $("#audio-status").textContent = "Narration stopped.";
  $("#read-button").textContent = currentLanguage === "ar" ? "▶ تشغيل السرد" : "▶ Play English narration";
});

/* ENGLISH / ARABIC UI */

$("#language-toggle").addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  const arabic = currentLanguage === "ar";
  document.documentElement.lang = arabic ? "ar" : "en";
  document.documentElement.dir = arabic ? "rtl" : "ltr";
  $("#language-toggle").textContent = arabic ? "English" : "العربية";
  $("#chapter-description").hidden = arabic;
  $("#chapter-arabic-description").hidden = !arabic;
  $("#read-button").textContent = arabic ? "▶ تشغيل السرد" : "▶ Play English narration";
  $("#stop-button").textContent = arabic ? "إيقاف السرد" : "Stop narration";
  updateChapter(currentChapter);
});

/* SCENE STYLE */

$("#background-mode").addEventListener("change", event => {
  const animated = event.target.value === "animated";
  $("#flag-animation").classList.toggle("active", animated);
  document.body.classList.toggle("flag-animation-active", animated);
  $("#chapter-image").style.opacity = animated ? "0" : "1";
  $("#video-status").textContent = animated
    ? "Showing UAE flag colours."
    : "Showing chapter image.";
  if (!animated) updateChapter(currentChapter);
});

/* UI DEVELOPMENT VIDEO */

const videoOverlay = $("#ui-video-overlay");
const uiVideo = $("#ui-development-video");

function closeUIVideo() {
  uiVideo.pause();
  videoOverlay.classList.remove("visible");
  videoOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
}

$("#ui-development-button").addEventListener("click", () => {
  videoOverlay.classList.add("visible");
  videoOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");
  uiVideo.currentTime = 0;
  uiVideo.play().catch(() => {
    $("#ui-video-status").textContent =
      "Press play to start the local video. Check that videos/past.mp4 exists.";
  });
});
$("#close-ui-video").addEventListener("click", closeUIVideo);
uiVideo.addEventListener("error", () => {
  $("#ui-video-status").textContent =
    "Video unavailable. Check that videos/past.mp4 exists in your project folder.";
});

/* FAMILY STORY VIEWER */

function showStory(index) {
  currentStory = (index + storyData.length) % storyData.length;
  const story = storyData[currentStory];
  $("#story-main-category").textContent = story.category;
  $("#story-main-counter").textContent = `${String(currentStory + 1).padStart(2, "0")} / ${String(storyData.length).padStart(2, "0")}`;
  $("#story-main-title").textContent = story.title;
  $("#story-main-text").textContent = story.text;
  $("#story-image-date").textContent = story.date;
  $("#story-main-image").src = story.image;
  $("#story-main-image").alt = story.title;
  $("#story-image-source").href = story.image;
  $("#story-detail-text").textContent = story.detail;
  $("#story-hidden-detail").hidden = true;
  $("#story-detail-button").setAttribute("aria-expanded", "false");
  $("#story-detail-button").textContent = "Discover the hidden detail +";
  $("#family-story-viewer").classList.add("visible");
  $("#family-story-viewer").setAttribute("aria-hidden", "false");
  $$(".family-story-card").forEach((card, i) => card.classList.toggle("selected", i === currentStory));
}

$$(".family-story-card").forEach(card => {
  card.addEventListener("click", () => {
    showStory(Number(card.dataset.story));
    $("#family-story-viewer").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
$("#previous-story-button").addEventListener("click", () => showStory(currentStory - 1));
$("#next-story-button").addEventListener("click", () => showStory(currentStory + 1));
$("#close-story-button").addEventListener("click", () => {
  $("#family-story-viewer").classList.remove("visible");
  $("#family-story-viewer").setAttribute("aria-hidden", "true");
  $$(".family-story-card").forEach(card => card.classList.remove("selected"));
});
$("#story-detail-button").addEventListener("click", () => {
  const detail = $("#story-hidden-detail");
  detail.hidden = !detail.hidden;
  $("#story-detail-button").setAttribute("aria-expanded", String(!detail.hidden));
  $("#story-detail-button").textContent = detail.hidden
    ? "Discover the hidden detail +"
    : "Hide the detail −";
});

/* THEN AND NOW SLIDER */

function updateComparison() {
  const value = Number($("#comparison-slider").value);
  $("#comparison-now").style.clipPath = `inset(0 0 0 ${value}%)`;
  $("#comparison-divider").style.left = `${value}%`;
}
$("#comparison-slider").addEventListener("input", updateComparison);

/* ANTHEM */

const anthem = $("#anthem-audio");
$("#anthem-button").addEventListener("click", () => {
  anthem.play().catch(() => {
    alert("The anthem could not play. Check that audio/uae-anthem.mp3 exists.");
  });
});
$("#anthem-stop-button").addEventListener("click", () => {
  anthem.pause();
  anthem.currentTime = 0;
});

/* FEATURE OVERLAYS */

function openOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add("visible");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");
}
function closeOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.remove("visible");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
  if (id === "portrait-studio-overlay") stopCamera();
}

$("#portrait-studio-button").addEventListener("click", () => openOverlay("portrait-studio-overlay"));
$("#family-gallery-button").addEventListener("click", () => {
  openOverlay("family-gallery-overlay");
  loadGallery();
});
$("#close-studio-button").addEventListener("click", () => closeOverlay("portrait-studio-overlay"));
$("#close-gallery-button").addEventListener("click", () => closeOverlay("family-gallery-overlay"));
$("#gallery-create-button").addEventListener("click", () => {
  closeOverlay("family-gallery-overlay");
  openOverlay("portrait-studio-overlay");
});
$("#gallery-empty-create-button").addEventListener("click", () => {
  closeOverlay("family-gallery-overlay");
  openOverlay("portrait-studio-overlay");
});
$("#close-portrait-detail").addEventListener("click", () => {
  $("#portrait-detail").hidden = true;
  $("#gallery-grid").hidden = false;
});

/* FAMILY PORTRAIT STUDIO */

const canvas = $("#portrait-canvas");
const ctx = canvas.getContext("2d");

function drawPortrait() {
  if (!portraitImage) return;
  const w = canvas.width;
  const h = canvas.height;
  const filter = $("#portrait-filter").value;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#111615";
  ctx.fillRect(0, 0, w, h);

  const scale = Math.max(w / portraitImage.width, h / portraitImage.height);
  const sw = portraitImage.width * scale;
  const sh = portraitImage.height * scale;
  ctx.save();

  if (filter === "golden") ctx.filter = "sepia(.38) saturate(1.12) contrast(1.04)";
  else if (filter === "monochrome") ctx.filter = "grayscale(1) contrast(1.05)";
  else if (filter === "soft") ctx.filter = "saturate(.72) brightness(1.06)";
  else ctx.filter = "sepia(.12) saturate(.92)";

  ctx.drawImage(portraitImage, (w - sw) / 2, (h - sh) / 2, sw, sh);
  ctx.restore();

  const border = 24;
  ctx.strokeStyle = "#d6b875";
  ctx.lineWidth = 4;
  ctx.strokeRect(border, border, w - border * 2, h - border * 2);
  ctx.strokeStyle = "rgba(240,219,166,.6)";
  ctx.lineWidth = 1;
  ctx.strokeRect(border + 10, border + 10, w - (border + 10) * 2, h - (border + 10) * 2);

  const title = $("#portrait-title").value.trim() || "A Family Memory";
  const message = $("#portrait-message").value.trim();
  const gradient = ctx.createLinearGradient(0, h * .68, 0, h);
  gradient.addColorStop(0, "rgba(4,6,5,0)");
  gradient.addColorStop(.35, "rgba(4,6,5,.7)");
  gradient.addColorStop(1, "rgba(4,6,5,.94)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, h * .65, w, h * .35);

  ctx.textAlign = "center";
  ctx.fillStyle = "#f0dba6";
  ctx.font = "600 36px Georgia";
  ctx.fillText(title.slice(0, 38), w / 2, h - 105, w - 100);

  if (message) {
    ctx.fillStyle = "#f6f4ed";
    ctx.font = "22px Arial";
    const words = message.split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach(word => {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > w - 120 && line) {
        lines.push(line);
        line = word;
      } else line = next;
    });
    if (line) lines.push(line);
    lines.slice(0, 2).forEach((text, i) => ctx.fillText(text, w / 2, h - 62 + i * 25, w - 100));
  }

  canvas.classList.add("ready");
  $("#portrait-placeholder").hidden = true;
  $("#save-portrait-button").disabled = false;
}

function loadPortraitFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    $("#studio-status").textContent = "Please choose an image file.";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      portraitImage = image;
      uploadedPortrait = null;
      drawPortrait();
      $("#studio-status").textContent = "Photograph loaded. Choose a style and save your portrait.";
    };
    image.onerror = () => {
      $("#studio-status").textContent = "This image could not be opened.";
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

$("#portrait-upload").addEventListener("change", event => {
  loadPortraitFile(event.target.files[0]);
});
$("#apply-filter-button").addEventListener("click", () => {
  if (!portraitImage) {
    $("#studio-status").textContent = "Upload a photograph or capture one first.";
    return;
  }
  drawPortrait();
  $("#studio-status").textContent = "Artistic style applied.";
});
$("#portrait-title").addEventListener("input", () => { if (portraitImage) drawPortrait(); });
$("#portrait-message").addEventListener("input", () => { if (portraitImage) drawPortrait(); });

/* CAMERA */

async function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    $("#studio-status").textContent = "Camera access is unavailable here. Try localhost or HTTPS, or upload a photograph.";
    return;
  }
  try {
    portraitStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
    $("#portrait-camera").srcObject = portraitStream;
    $("#camera-panel").hidden = false;
    $("#studio-status").textContent = "Camera ready.";
  } catch (error) {
    $("#studio-status").textContent = "Camera permission was denied or the camera is unavailable. You can upload an image instead.";
  }
}
function stopCamera() {
  if (portraitStream) portraitStream.getTracks().forEach(track => track.stop());
  portraitStream = null;
  if ($("#portrait-camera")) $("#portrait-camera").srcObject = null;
  if ($("#camera-panel")) $("#camera-panel").hidden = true;
}
$("#start-camera-button").addEventListener("click", startCamera);
$("#stop-camera-button").addEventListener("click", stopCamera);
$("#capture-photo-button").addEventListener("click", () => {
  const video = $("#portrait-camera");
  if (!video.videoWidth) {
    $("#studio-status").textContent = "Wait for the camera to start, then try again.";
    return;
  }
  const snap = document.createElement("canvas");
  snap.width = video.videoWidth;
  snap.height = video.videoHeight;
  snap.getContext("2d").drawImage(video, 0, 0);
  const image = new Image();
  image.onload = () => {
    portraitImage = image;
    drawPortrait();
    $("#studio-status").textContent = "Photo captured. You can now save it to the gallery.";
  };
  image.src = snap.toDataURL("image/png");
  stopCamera();
});

/* LOCAL DATABASE FOR FAMILY GALLERY */

function openDatabase() {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("This browser does not support local gallery storage."));
  }
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("NAEFamilyPortraitGallery", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("portraits")) {
        db.createObjectStore("portraits", { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return databasePromise;
}

async function saveRecord(record) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("portraits", "readwrite");
    const request = tx.objectStore("portraits").add(record);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function getRecords() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction("portraits", "readonly").objectStore("portraits").getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => b.created - a.created));
    request.onerror = () => reject(request.error);
  });
}
async function getRecord(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction("portraits", "readonly").objectStore("portraits").get(Number(id));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function deleteRecord(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("portraits", "readwrite");
    tx.objectStore("portraits").delete(Number(id));
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

$("#save-portrait-button").addEventListener("click", async () => {
  if (!portraitImage || !canvas.classList.contains("ready")) return;
  const button = $("#save-portrait-button");
  button.disabled = true;

  try {
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Could not create portrait image.");
    await saveRecord({
      title: $("#portrait-title").value.trim() || "A Family Memory",
      message: $("#portrait-message").value.trim(),
      image: blob,
      created: Date.now()
    });
    $("#studio-status").textContent = "Portrait saved to this browser's family gallery.";
    $("#portrait-title").value = "";
    $("#portrait-message").value = "";
    await loadGallery();
  } catch (error) {
    $("#studio-status").textContent = "Could not save the portrait. Your browser storage may be unavailable or full.";
  } finally {
    button.disabled = !portraitImage;
  }
});

function blobToURL(blob) {
  return URL.createObjectURL(blob);
}
async function loadGallery() {
  try {
    portraitRecords = await getRecords();
    const grid = $("#gallery-grid");
    grid.replaceChildren();
    $("#gallery-count").textContent = `YOUR COLLECTION · ${portraitRecords.length} PORTRAIT${portraitRecords.length === 1 ? "" : "S"}`;
    $("#gallery-empty").hidden = portraitRecords.length > 0;
    $("#gallery-status").textContent = "";

    portraitRecords.forEach(record => {
      const button = document.createElement("button");
      button.className = "gallery-card";
      button.type = "button";

      const image = document.createElement("img");
      image.src = blobToURL(record.image);
      image.alt = record.title;
      const copy = document.createElement("span");
      copy.className = "gallery-card-copy";
      const title = document.createElement("strong");
      title.textContent = record.title;
      const date = document.createElement("small");
      date.textContent = new Date(record.created).toLocaleDateString();
      copy.append(title, date);
      button.append(image, copy);
      button.addEventListener("click", () => showPortraitDetail(record.id));
      grid.append(button);
    });
  } catch (error) {
    $("#gallery-status").textContent = "The gallery could not be opened. Your browser may not support local storage.";
  }
}

async function showPortraitDetail(id) {
  try {
    const record = await getRecord(id);
    if (!record) return;
    selectedPortraitId = record.id;
    $("#detail-portrait-image").src = blobToURL(record.image);
    $("#detail-portrait-title").textContent = record.title;
    $("#detail-portrait-message").textContent = record.message || "No family message was added.";
    $("#detail-portrait-date").textContent = new Date(record.created).toLocaleString();
    $("#gallery-grid").hidden = true;
    $("#gallery-empty").hidden = true;
    $("#portrait-detail").hidden = false;
  } catch (error) {
    $("#gallery-status").textContent = "Could not open this portrait.";
  }
}

$("#download-portrait-button").addEventListener("click", async () => {
  if (selectedPortraitId == null) return;
  const record = await getRecord(selectedPortraitId);
  if (!record) return;
  const url = URL.createObjectURL(record.image);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${record.title.replace(/[^\w -]/g, "").trim() || "family-portrait"}.png`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

$("#delete-portrait-button").addEventListener("click", async () => {
  if (selectedPortraitId == null) return;
  if (!confirm("Delete this portrait from the gallery on this browser?")) return;
  try {
    await deleteRecord(selectedPortraitId);
    selectedPortraitId = null;
    $("#portrait-detail").hidden = true;
    $("#gallery-grid").hidden = false;
    await loadGallery();
  } catch (error) {
    $("#gallery-status").textContent = "Could not delete this portrait.";
  }
});

/* NEW FEATURE 1 — FAMILY COURTYARD */

const courtyardObjects = {
  dallah: {
    kicker: "HOSPITALITY & GENEROSITY",
    title: "The Dallah",
    description: "The traditional Arabic coffee pot is a familiar symbol of Emirati hospitality. Arabic coffee is often offered to welcome guests and is part of important family and social gatherings.",
    fact: "A small cup of coffee can express a big welcome."
  },
  lantern: {
    kicker: "LIGHT & TOGETHERNESS",
    title: "The Lantern",
    description: "Lanterns provided light before modern electricity became common. Their warm glow can remind us of evenings spent together, sharing food, conversation, and stories at home.",
    fact: "The most meaningful light is often the one shared with others."
  },
  palm: {
    kicker: "RESOURCEFULNESS & CRAFT",
    title: "The Date Palm",
    description: "The date palm has long been important in the UAE. Dates provide food, while palm leaves can be woven into useful items such as baskets, mats, and containers.",
    fact: "Khoos is a traditional craft made by weaving palm leaves."
  },
  majlis: {
    kicker: "WELCOME & COMMUNITY",
    title: "The Majlis",
    description: "The majlis is a gathering space where family, friends, and guests meet. It represents hospitality, conversation, listening, and the sharing of knowledge between generations.",
    fact: "A gathering place becomes special because of the people in it."
  }
};

$$(".courtyard-object").forEach(button => {
  button.addEventListener("click", () => {
    const object = courtyardObjects[button.dataset.object];
    if (!object) return;
    $$(".courtyard-object").forEach(item => item.classList.toggle("active", item === button));
    $("#courtyard-kicker").textContent = object.kicker;
    $("#courtyard-title").textContent = object.title;
    $("#courtyard-description").textContent = object.description;
    $("#courtyard-fact").textContent = object.fact;
  });
});

/* NEW FEATURE 2 — SEVEN EMIRATES */

const emirates = {
  "abu-dhabi": {
    number: "01", name: "Abu Dhabi", label: "THE CAPITAL", symbol: "✧",
    description: "The capital of the UAE brings together national institutions, cultural landmarks, islands, mangroves, and desert landscapes.",
    landmark: "Sheikh Zayed Grand Mosque",
    known: "Culture, nature and national institutions"
  },
  "dubai": {
    number: "02", name: "Dubai", label: "A GLOBAL CROSSROADS", symbol: "◇",
    description: "Dubai is known for its historic creek, trading heritage, modern architecture, and role as an international centre for business and tourism.",
    landmark: "Dubai Creek and Al Fahidi",
    known: "Trade, architecture and innovation"
  },
  "sharjah": {
    number: "03", name: "Sharjah", label: "ART & LEARNING", symbol: "✦",
    description: "Sharjah has a strong cultural identity, with museums, heritage districts, libraries, and a long tradition of supporting arts and education.",
    landmark: "Heart of Sharjah",
    known: "Arts, museums and heritage"
  },
  "ajman": {
    number: "04", name: "Ajman", label: "COASTAL HERITAGE", symbol: "≈",
    description: "Ajman combines a coastline and traditional neighbourhoods with a history connected to fishing, boatbuilding, trade, and community life.",
    landmark: "Ajman Museum",
    known: "Coastal life and traditional crafts"
  },
  "umm-al-quwain": {
    number: "05", name: "Umm Al Quwain", label: "NATURE & THE SEA", symbol: "〰",
    description: "Umm Al Quwain is known for its coastal setting, islands, lagoons, mangroves, and connections to fishing and maritime life.",
    landmark: "Umm Al Quwain's mangroves",
    known: "Islands, wetlands and marine heritage"
  },
  "ras-al-khaimah": {
    number: "06", name: "Ras Al Khaimah", label: "MOUNTAINS & HISTORY", symbol: "△",
    description: "Ras Al Khaimah features mountains, fertile areas, coastal landscapes, and archaeological sites that reveal a long history of settlement and trade.",
    landmark: "Jebel Jais",
    known: "Mountains, archaeology and outdoor landscapes"
  },
  "fujairah": {
    number: "07", name: "Fujairah", label: "THE EAST COAST", symbol: "◈",
    description: "Facing the Gulf of Oman, Fujairah is known for the Hajar Mountains, beaches, historic forts, and a distinctive east-coast landscape.",
    landmark: "Fujairah Fort",
    known: "Mountains, forts and the east coast"
  }
};

$$(".emirate-button").forEach(button => {
  button.addEventListener("click", () => {
    const emirate = emirates[button.dataset.emirate];
    if (!emirate) return;
    $$(".emirate-button").forEach(item => item.classList.toggle("active", item === button));
    $("#emirate-number").textContent = emirate.number;
    $("#emirate-symbol").textContent = emirate.symbol;
    $("#emirate-label").textContent = emirate.label;
    $("#emirate-title").textContent = emirate.name;
    $("#emirate-description").textContent = emirate.description;
    $("#emirate-landmark").textContent = emirate.landmark;
    $("#emirate-known").textContent = emirate.known;
  });
});

/* NEW FEATURE 3 — WALK THROUGH TIME */

const eras = {
  past: {
    year: "BEFORE 1971",
    kicker: "OUR FOUNDATIONS",
    title: "A life shaped by land and sea",
    description: "Communities built their lives around the sea, desert, oasis, trade, fishing, pearl diving, and close family ties. Skills and stories were passed from one generation to the next.",
    legacy: "The legacy: resourcefulness, hospitality, and a strong sense of community."
  },
  present: {
    year: "THE UAE TODAY",
    kicker: "A CHANGING NATION",
    title: "Tradition meets possibility",
    description: "Modern cities, education, science, business, and the arts continue to shape life in the UAE. Families preserve language, celebrations, and customs while adapting to a changing world.",
    legacy: "The connection: progress can move forward while respect for heritage remains."
  },
  future: {
    year: "TOMORROW",
    kicker: "THE NEXT GENERATION",
    title: "A future we create together",
    description: "Future generations can build on the UAE's achievements through creativity, responsible technology, sustainability, education, and care for one another. The choices made today help shape the country of tomorrow.",
    legacy: "The responsibility: protect what matters and create opportunities for those who come next."
  }
};

$$(".timewalk-button").forEach(button => {
  button.addEventListener("click", () => {
    const era = eras[button.dataset.era];
    if (!era) return;
    $$(".timewalk-button").forEach(item => item.classList.toggle("active", item === button));
    $("#timewalk-year").textContent = era.year;
    $("#timewalk-kicker").textContent = era.kicker;
    $("#timewalk-title").textContent = era.title;
    $("#timewalk-description").textContent = era.description;
    $("#timewalk-legacy").textContent = era.legacy;
  });
});

/* NEW FEATURE 4 — MESSAGE TO THE FUTURE
   Messages are stored only in localStorage on this device.
*/

const MESSAGE_STORAGE_KEY = "naeFutureMessagesV1";
const messageTags = {
  Heritage: "PROTECT OUR HERITAGE",
  Unity: "UNITY & KINDNESS",
  Innovation: "INNOVATION & TOMORROW",
  Family: "FAMILY & BELONGING",
  Nature: "CARE FOR NATURE"
};

function readFutureMessages() {
  try {
    const value = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function renderFutureMessages() {
  const wall = $("#future-message-wall");
  const messages = readFutureMessages();
  wall.replaceChildren();
  $("#future-message-count").textContent =
    `${messages.length} MESSAGE${messages.length === 1 ? "" : "S"}`;

  if (!messages.length) {
    const empty = document.createElement("div");
    empty.className = "message-empty";
    empty.textContent = "Your message wall is waiting for its first message.";
    wall.append(empty);
    return;
  }

  messages.forEach(message => {
    const card = document.createElement("article");
    card.className = "future-message-card";

    const tag = document.createElement("span");
    tag.className = "message-tag";
    tag.textContent = messageTags[message.topic] || "A MESSAGE FOR TOMORROW";

    const quote = document.createElement("blockquote");
    quote.textContent = `“${message.text}”`;

    const author = document.createElement("small");
    author.textContent = message.name ? `— ${message.name}` : "— A visitor to the exhibition";

    card.append(tag, quote, author);
    wall.append(card);
  });
}

$("#future-message-form").addEventListener("submit", event => {
  event.preventDefault();

  const text = $("#future-message-text").value.trim();
  const name = $("#future-message-name").value.trim();
  const topic = $("#future-message-era").value;

  if (!text) {
    $("#future-message-status").textContent = "Please write a message before submitting.";
    return;
  }

  const messages = readFutureMessages();
  messages.unshift({
    text: text.slice(0, 350),
    name: name.slice(0, 40),
    topic,
    created: Date.now()
  });

  try {
    localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages.slice(0, 60)));
    $("#future-message-form").reset();
    $("#future-message-status").textContent = "Your message has been added to this device's message wall.";
    renderFutureMessages();
  } catch (error) {
    $("#future-message-status").textContent = "Your browser could not save the message. Check its storage settings.";
  }
});

$("#clear-own-messages").addEventListener("click", () => {
  if (!confirm("Clear all future messages saved on this browser? This cannot be undone.")) return;
  try {
    localStorage.removeItem(MESSAGE_STORAGE_KEY);
    $("#future-message-status").textContent = "Messages saved on this device have been cleared.";
    renderFutureMessages();
  } catch {
    $("#future-message-status").textContent = "Could not clear the saved messages.";
  }
});

/* CLOSE OVERLAYS WITH ESCAPE */

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (videoOverlay.classList.contains("visible")) closeUIVideo();
  if ($("#portrait-studio-overlay").classList.contains("visible")) closeOverlay("portrait-studio-overlay");
  if ($("#family-gallery-overlay").classList.contains("visible")) closeOverlay("family-gallery-overlay");
});

/* INITIALISE */

updateChapter("past");
updateComparison();
renderFutureMessages();
loadGallery();
