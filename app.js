// ==========================================================================
// PWA SERVICE WORKER REGISTRATION & OFFLINE CONTROL
// ==========================================================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[PWA] Service Worker registrado con éxito', reg.scope))
      .catch(err => console.error('[PWA] Error al registrar Service Worker', err));
  });
}

// ==========================================================================
// DEFAULT SEED DATA (AUTHENTICATION & DATABASES)
// ==========================================================================

const DEFAULT_GLOBAL_SERVICES = [
  { id: "srv-base-1", name: "Corte de Cabello Clásico", category: "corte", price: 12000, duration: 30, desc: "Corte tradicional a tijera o máquina, incluye lavado con champú premium y peinado." },
  { id: "srv-base-2", name: "Degradado Premium (Fade)", category: "corte", price: 15000, duration: 45, desc: "Corte con degradado limpio, perfilado de contornos y peinado con cera." },
  { id: "srv-base-3", name: "Perfilado y Arreglo de Barba", category: "barba", price: 10000, duration: 30, desc: "Recorte y diseño de barba, perfilado de mejillas y cuello con navaja libre." },
  { id: "srv-base-4", name: "Afeitado Tradicional Toalla Caliente", category: "barba", price: 12000, duration: 45, desc: "Ritual de toallas húmedas calientes, espuma especial y afeitado a navaja." },
  { id: "srv-base-5", name: "Combo Imperial (Corte + Barba)", category: "combos", price: 22000, duration: 75, desc: "Degradado o corte clásico junto con arreglo completo de barba a navaja." },
  { id: "srv-base-6", name: "Tratamiento Capilar Regenerador", category: "tratamientos", price: 18000, duration: 45, desc: "Tratamiento de hidratación profunda y masaje de cuero cabelludo." }
];

const DEFAULT_BARBERS = [
  { 
    id: "bar-1", 
    name: "Carlos Mendoza", 
    username: "carlos", 
    password: "carlos123",
    specialty: "Afeitado Clásico y Navaja", 
    bio: "Maestro de la navaja libre y toallas calientes. Especialista en rituales clásicos y perfilados detallados.", 
    image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=300&auto=format&fit=crop",
    services: [
      { id: "srv-c1", name: "Afeitado Clásico Toalla Caliente", category: "barba", price: 11000, duration: 45, desc: "Ritual relajante con toallas calientes, crema de afeitar mentolada y afeitado clásico a navaja." },
      { id: "srv-c2", name: "Perfilado de Barba VIP", category: "barba", price: 9000, duration: 30, desc: "Diseño y perfilado preciso con navaja libre, hidratación con aceites esenciales." },
      { id: "srv-c3", name: "Corte Tradicional Carlos", category: "corte", price: 13000, duration: 45, desc: "Corte clásico a tijera con asesoramiento de visagismo y peinado." },
      { id: "srv-c4", name: "Combo Clásico Carlos", category: "combos", price: 20000, duration: 75, desc: "Corte clásico + perfilado de barba tradicional." }
    ],
    hours: {
      1: { isWorking: true, openTime: "10:00", closeTime: "19:00" },
      2: { isWorking: true, openTime: "10:00", closeTime: "19:00" },
      3: { isWorking: true, openTime: "10:00", closeTime: "19:00" },
      4: { isWorking: true, openTime: "10:00", closeTime: "19:00" },
      5: { isWorking: true, openTime: "10:00", closeTime: "19:00" },
      6: { isWorking: true, openTime: "09:00", closeTime: "16:00" },
      0: { isWorking: false, openTime: "10:00", closeTime: "15:00" }
    },
    blockedDates: []
  },
  { 
    id: "bar-2", 
    name: "Daniel Ortiz", 
    username: "daniel", 
    password: "daniel123",
    specialty: "Cortes Modernos y Degradados", 
    bio: "Experto en skin fades, degradados urbanos y diseños modernos. Te dará el estilo más actual.", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    services: [
      { id: "srv-d1", name: "Degradado Skin Fade", category: "corte", price: 15000, duration: 45, desc: "Degradado desde el cero absoluto (a navaja o shaver) con acabado texturizado superior." },
      { id: "srv-d2", name: "Corte Moderno (Buzz / Crop)", category: "corte", price: 12000, duration: 30, desc: "Cortes texturizados de tendencia ideales para cabellos cortos." },
      { id: "srv-d3", name: "Combo Degradado + Barba Daniel", category: "combos", price: 23000, duration: 75, desc: "Degradado Skin Fade + perfilado y recorte de barba con toalla de vapor." }
    ],
    hours: {
      1: { isWorking: true, openTime: "11:00", closeTime: "20:00" },
      2: { isWorking: true, openTime: "11:00", closeTime: "20:00" },
      3: { isWorking: true, openTime: "11:00", closeTime: "20:00" },
      4: { isWorking: true, openTime: "11:00", closeTime: "20:00" },
      5: { isWorking: true, openTime: "11:00", closeTime: "20:00" },
      6: { isWorking: true, openTime: "09:00", closeTime: "18:00" },
      0: { isWorking: false, openTime: "10:00", closeTime: "15:00" }
    },
    blockedDates: []
  },
  { 
    id: "bar-3", 
    name: "Mateo Silva", 
    username: "mateo", 
    password: "mateo123",
    specialty: "Cuidado Capilar y Tratamientos", 
    bio: "Especialista en nutrición capilar, exfoliaciones y cuidado de barbas largas y abundantes.", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    services: [
      { id: "srv-m1", name: "Perfilado Barbas Largas", category: "barba", price: 11000, duration: 30, desc: "Esculpido de barbas largas tipo leñador, alineación a navaja y tratamiento acondicionador." },
      { id: "srv-m2", name: "Tratamiento Nutritivo de Vapor", category: "tratamientos", price: 18000, duration: 45, desc: "Lavado especial, aplicación de ampolletas y vaporizador ozonizado para restaurar el cuero cabelludo." },
      { id: "srv-m3", name: "Limpieza Facial Profunda", category: "tratamientos", price: 12000, duration: 30, desc: "Exfoliación facial, extracción de impurezas con mascarilla de arcilla negra e hidratación." },
      { id: "srv-m4", name: "Combo Cuidado Mateo", category: "combos", price: 26000, duration: 90, desc: "Corte clásico + Tratamiento de vapor capilar + Hidratación facial." }
    ],
    hours: {
      1: { isWorking: true, openTime: "10:00", closeTime: "18:00" },
      2: { isWorking: true, openTime: "10:00", closeTime: "18:00" },
      3: { isWorking: true, openTime: "10:00", closeTime: "18:00" },
      4: { isWorking: true, openTime: "10:00", closeTime: "18:00" },
      5: { isWorking: true, openTime: "10:00", closeTime: "18:00" },
      6: { isWorking: true, openTime: "09:00", closeTime: "19:00" },
      0: { isWorking: false, openTime: "10:00", closeTime: "15:00" }
    },
    blockedDates: []
  }
];

const DEFAULT_CLIENTS = [
  {
    id: "cli-1",
    name: "Alberto Riquelme",
    email: "alberto@correo.com",
    phone: "+56998765432",
    password: "user123"
  },
  {
    id: "cli-2",
    name: "Juan Pérez",
    email: "juan@correo.com",
    phone: "+56911112222",
    password: "user123"
  }
];

const DEFAULT_REVIEWS = [
  { id: "rev-1", name: "Pedro Alvarado", rating: 5, barber: "Carlos Mendoza", comment: "Excelente atención de Carlos. El afeitado con toalla caliente es un ritual espectacular y súper relajante.", date: "2026-06-15" },
  { id: "rev-2", name: "Francisco Muñoz", rating: 5, barber: "Daniel Ortiz", comment: "Daniel tiene una técnica excelente para los degradados. Quedó genial el skin fade.", date: "2026-06-16" },
  { id: "rev-3", name: "Claudio Salazar", rating: 4, barber: "Mateo Silva", comment: "Muy buena experiencia. Mateo fue muy detallista al perfilar mi barba larga.", date: "2026-06-17" }
];

const DEFAULT_GLOBAL_HOURS = {
  1: { dayName: "Lunes", isWorking: true, openTime: "10:00", closeTime: "20:00" },
  2: { dayName: "Martes", isWorking: true, openTime: "10:00", closeTime: "20:00" },
  3: { dayName: "Miércoles", isWorking: true, openTime: "10:00", closeTime: "20:00" },
  4: { dayName: "Jueves", isWorking: true, openTime: "10:00", closeTime: "20:00" },
  5: { dayName: "Viernes", isWorking: true, openTime: "10:00", closeTime: "20:00" },
  6: { dayName: "Sábado", isWorking: true, openTime: "09:00", closeTime: "19:00" },
  0: { dayName: "Domingo", isWorking: false, openTime: "10:00", closeTime: "15:00" }
};

const DEFAULT_GLOBAL_BLOCKED_DATES = [
  { date: "2026-06-25", reason: "Feriado Local - Aniversario Local" }
];

const generateInitialBookings = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];
  
  return [
    {
      id: "B-883492",
      clientId: "cli-1",
      customerName: "Alberto Riquelme",
      customerPhone: "+56998765432",
      customerEmail: "alberto@correo.com",
      services: ["srv-d1", "srv-d2"], 
      barberId: "bar-2", // Daniel
      date: todayStr,
      time: "11:00",
      totalPrice: 27000,
      totalDuration: 75,
      status: "Pendiente",
      createdAt: todayStr
    },
    {
      id: "B-129402",
      clientId: "cli-2",
      customerName: "Juan Pérez",
      customerPhone: "+56911112222",
      customerEmail: "juan@correo.com",
      services: ["srv-c1"], 
      barberId: "bar-1", // Carlos
      date: todayStr,
      time: "15:30",
      totalPrice: 11000,
      totalDuration: 45,
      status: "Atendida",
      createdAt: todayStr
    },
    {
      id: "B-647302",
      clientId: "cli-1",
      customerName: "Alberto Riquelme",
      customerPhone: "+56998765432",
      customerEmail: "alberto@correo.com",
      services: ["srv-m2"], 
      barberId: "bar-3", // Mateo
      date: tomorrowStr,
      time: "10:00",
      totalPrice: 18000,
      totalDuration: 45,
      status: "Pendiente",
      createdAt: todayStr
    }
  ];
};

// Global DB Store
const store = {
  clients: JSON.parse(localStorage.getItem("barbe_clients")) || DEFAULT_CLIENTS,
  barbers: JSON.parse(localStorage.getItem("barbe_barbers")) || DEFAULT_BARBERS,
  reviews: JSON.parse(localStorage.getItem("barbe_reviews")) || DEFAULT_REVIEWS,
  globalHours: JSON.parse(localStorage.getItem("barbe_global_hours")) || DEFAULT_GLOBAL_HOURS,
  globalBlockedDates: JSON.parse(localStorage.getItem("barbe_global_blocked_dates")) || DEFAULT_GLOBAL_BLOCKED_DATES,
  bookings: JSON.parse(localStorage.getItem("barbe_bookings")) || generateInitialBookings(),
  
  save(key) {
    localStorage.setItem(`barbe_${key}`, JSON.stringify(this[key]));
    
    // Mirror write to simulated cloud database if online
    if (navigator.onLine) {
      cloudStore[key] = JSON.parse(JSON.stringify(this[key]));
      cloudStore.save(key);
    }
  }
};

// Simulated Cloud Database (Representing Remote Server Database)
const cloudStore = {
  clients: JSON.parse(localStorage.getItem("cloud_clients")) || DEFAULT_CLIENTS,
  barbers: JSON.parse(localStorage.getItem("cloud_barbers")) || DEFAULT_BARBERS,
  reviews: JSON.parse(localStorage.getItem("cloud_reviews")) || DEFAULT_REVIEWS,
  globalHours: JSON.parse(localStorage.getItem("cloud_global_hours")) || DEFAULT_GLOBAL_HOURS,
  globalBlockedDates: JSON.parse(localStorage.getItem("cloud_global_blocked_dates")) || DEFAULT_GLOBAL_BLOCKED_DATES,
  bookings: JSON.parse(localStorage.getItem("cloud_bookings")) || generateInitialBookings(),
  
  save(key) {
    localStorage.setItem(`cloud_${key}`, JSON.stringify(this[key]));
  }
};

// Ensure all barbers have hours and blocked dates initialized
store.barbers.forEach(b => {
  if (!b.hours) b.hours = {...DEFAULT_GLOBAL_HOURS};
  if (!b.blockedDates) b.blockedDates = [];
});
store.save("barbers");

// ==========================================================================
// APP LIFE CYCLE & NETWORK MANAGEMENT (ONLINE/OFFLINE)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initNetworkStatus();
  initMap();
  renderLandingShowcase();
  initLandingUI();
  initClientAuth();
  initBookingWizard();
  initNotifications();
  initManageBooking();
  initVoipSimulation();
  initAdminPanel();
  checkURLParameters();
  
  // Sticky Header
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Mobile Menu
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mobileClose = document.querySelector(".mobile-nav-close");
  const mobileMenu = document.querySelector(".mobile-nav-menu");
  mobileToggle.addEventListener("click", () => mobileMenu.classList.add("open"));
  mobileClose.addEventListener("click", () => mobileMenu.classList.remove("open"));
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
});

function initNetworkStatus() {
  const badge = document.getElementById("connection-status-badge");
  const dot = badge.querySelector(".status-dot");
  const text = badge.querySelector(".status-text");

  const adminDot = document.getElementById("admin-offline-dot");
  const adminText = document.getElementById("admin-offline-text");

  const updateStatus = () => {
    const online = navigator.onLine;
    
    // Main header badge
    badge.className = `connection-status-badge ${online ? 'online' : 'offline'}`;
    text.textContent = online ? "En Línea" : "Sin Internet";
    
    // Admin Sidebar status
    if (adminDot && adminText) {
      adminDot.style.backgroundColor = online ? "var(--color-success)" : "var(--color-danger)";
      adminText.textContent = online ? "En Línea" : "Modo Local Offline";
    }

    updateSyncBadges();

    if (online) {
      syncOfflineData();
    }

    // Adapt Leaflet map if offline
    if (!online) {
      replaceMapWithOfflineFallback();
    } else {
      reinitOnlineMap();
    }
  };

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
  updateStatus(); // run immediately
}

function syncOfflineData() {
  if (!navigator.onLine) return;

  let syncedCount = 0;

  // Sync bookings
  store.bookings.forEach(b => {
    if (b.syncPending) {
      delete b.syncPending;
      const existsIdx = cloudStore.bookings.findIndex(cb => cb.id === b.id);
      if (existsIdx > -1) {
        cloudStore.bookings[existsIdx] = b;
      } else {
        cloudStore.bookings.push(b);
      }
      syncedCount++;
    }
  });

  // Sync reviews
  store.reviews.forEach(r => {
    if (r.syncPending) {
      delete r.syncPending;
      const existsIdx = cloudStore.reviews.findIndex(cr => cr.id === r.id);
      if (existsIdx > -1) {
        cloudStore.reviews[existsIdx] = r;
      } else {
        cloudStore.reviews.push(r);
      }
      syncedCount++;
    }
  });

  // Sync barbers profile changes
  cloudStore.barbers = JSON.parse(JSON.stringify(store.barbers));
  cloudStore.globalBlockedDates = JSON.parse(JSON.stringify(store.globalBlockedDates));
  cloudStore.globalHours = JSON.parse(JSON.stringify(store.globalHours));

  // Save all cloud keys
  cloudStore.save("bookings");
  cloudStore.save("reviews");
  cloudStore.save("barbers");
  cloudStore.save("globalBlockedDates");
  cloudStore.save("globalHours");

  // Save local keys to remove syncPending flag
  store.save("bookings");
  store.save("reviews");

  if (syncedCount > 0) {
    showSyncToast(syncedCount);
  }
}

function showSyncToast(count) {
  let toast = document.querySelector(".sync-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "sync-toast";
    toast.innerHTML = `
      <div class="sync-toast-icon spinning"><i class="fa-solid fa-arrows-rotate"></i></div>
      <div class="sync-toast-content">
        <h4>Sincronización en la Nube</h4>
        <p id="sync-toast-message">Subiendo datos offline al servidor...</p>
      </div>
    `;
    document.body.appendChild(toast);
  }

  const msg = toast.querySelector("#sync-toast-message");
  const icon = toast.querySelector(".sync-toast-icon");
  
  icon.className = "sync-toast-icon spinning";
  icon.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
  msg.textContent = `Sincronizando ${count} dato(s) guardados localmente...`;
  
  toast.classList.add("show");

  setTimeout(() => {
    icon.className = "sync-toast-icon";
    icon.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--color-success);"></i>`;
    msg.textContent = `¡Sincronización completada! ${count} dato(s) actualizados.`;
    
    updateSyncBadges();

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }, 2000);
}

function updateSyncBadges() {
  const badge = document.getElementById("cloud-sync-badge");
  if (!badge) return;
  const icon = badge.querySelector("i");
  const text = badge.querySelector(".sync-text");

  const adminIcon = document.getElementById("admin-cloud-icon");
  const adminText = document.getElementById("admin-cloud-text");

  const hasPending = store.bookings.some(b => b.syncPending) || store.reviews.some(r => r.syncPending);

  if (!navigator.onLine) {
    badge.className = "cloud-sync-badge pending";
    text.textContent = "Modo Offline";
    if (adminIcon && adminText) {
      adminIcon.style.color = "var(--color-warning)";
      adminText.textContent = "Datos Locales (Offline)";
    }
  } else if (hasPending) {
    badge.className = "cloud-sync-badge pending";
    text.textContent = "Pendiente Sync";
    if (adminIcon && adminText) {
      adminIcon.style.color = "var(--color-warning)";
      adminText.textContent = "Pendiente de Sincronizar";
    }
  } else {
    badge.className = "cloud-sync-badge synced";
    text.textContent = "Sincronizado";
    if (adminIcon && adminText) {
      adminIcon.style.color = "var(--color-gold)";
      adminText.textContent = "Nube Sincronizada";
    }
  }
}

let mapInstance = null;
function initMap() {
  if (!navigator.onLine) {
    replaceMapWithOfflineFallback();
    return;
  }

  const coords = [-33.4246, -70.6156];
  try {
    mapInstance = L.map('contact-map', {
      center: coords,
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    const markerIcon = L.divIcon({
      html: '<div style="background-color: #D4AF37; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #121212; color: #121212; font-size: 1rem;"><i class="fa-solid fa-scissors"></i></div>',
      className: 'custom-leaflet-marker',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const marker = L.marker(coords, { icon: markerIcon }).addTo(mapInstance);
    marker.bindPopup(`
      <div style="font-family: sans-serif; text-align: center;">
        <h4 style="margin: 0 0 5px; color: #D4AF37; font-weight: 700;">EL BARBERO CLUB</h4>
        <p style="margin: 0; font-size: 11px;">Av. Principal de la Moda 742</p>
      </div>
    `).openPopup();
  } catch (err) {
    console.error("No se pudo cargar Leaflet online", err);
    replaceMapWithOfflineFallback();
  }
}

function reinitOnlineMap() {
  const container = document.getElementById("contact-map");
  if (container.querySelector(".offline-map-fallback")) {
    container.innerHTML = ""; // Clear fallback
    initMap();
  }
}

function replaceMapWithOfflineFallback() {
  const container = document.getElementById("contact-map");
  if (!container) return;

  container.innerHTML = `
    <div class="offline-map-fallback" style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background-color:#1a1a1a; border:2px solid rgba(255,255,255,0.05); border-radius:8px; padding:30px; text-align:center; color:var(--color-gray-medium);">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:20px;">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
        <line x1="9" y1="3" x2="9" y2="18"></line>
        <line x1="15" y1="6" x2="15" y2="21"></line>
        <circle cx="12" cy="11" r="2" fill="#D4AF37"></circle>
      </svg>
      <h4 style="color:#fff; margin-bottom:8px; text-transform:uppercase; font-size:1.1rem; letter-spacing:1px;">Ubicación (Modo Sin Conexión)</h4>
      <p style="font-size:0.9rem; max-width:400px; margin:0 auto;">Av. Principal de la Moda 742, Piso 1, Providencia, Santiago.</p>
      <span style="font-size:0.75rem; color:var(--color-danger); font-weight:700; margin-top:10px;"><i class="fa-solid fa-wifi-slash"></i> Mapa Leaflet deshabilitado sin internet</span>
    </div>
  `;
}

function checkURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const manageCode = urlParams.get('manage');
  if (manageCode) {
    openManageBookingModal(manageCode);
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({path:newurl},'',newurl);
  }
}

// ==========================================================================
// CLIENT REGISTRATION & SESSION MANAGEMENT
// ==========================================================================

let activeClientSession = JSON.parse(sessionStorage.getItem("client_user")) || JSON.parse(localStorage.getItem("client_user")) || null;

function initClientAuth() {
  const authModal = document.getElementById("client-auth-modal");
  const authContainer = document.getElementById("auth-box-container");
  const dashContainer = document.getElementById("client-dashboard-container");

  const btnHeaderAuth = document.getElementById("btn-client-menu");
  
  // Close Auth trigger
  document.getElementById("close-client-auth-modal").addEventListener("click", () => authModal.classList.remove("open"));
  document.getElementById("close-client-dash-modal").addEventListener("click", () => authModal.classList.remove("open"));

  // Click on Header Auth button
  btnHeaderAuth.addEventListener("click", () => {
    if (activeClientSession) {
      // Show Dashboard directly
      authContainer.style.display = "none";
      dashContainer.style.display = "flex";
      renderClientDashboard();
    } else {
      // Show Login/Register box
      authContainer.style.display = "flex";
      dashContainer.style.display = "none";
      // Select login tab by default
      document.getElementById("tab-client-login").click();
    }
    authModal.classList.add("open");
  });

  // Switch tabs inside Auth box
  const authTabs = document.querySelectorAll("#auth-box-container .notif-tab");
  authTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      authTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const type = tab.dataset.tab;
      document.getElementById("pane-client-login").style.display = type === "login" ? "block" : "none";
      document.getElementById("pane-client-register").style.display = type === "register" ? "block" : "none";
    });
  });

  // Client Login Form
  const loginForm = document.getElementById("client-login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("c-login-email").value.trim().toLowerCase();
    const pass = document.getElementById("c-login-pass").value.trim();
    const errorBox = document.getElementById("c-login-error");

    const client = store.clients.find(c => c.email === email && c.password === pass);

    if (client) {
      activeClientSession = client;
      sessionStorage.setItem("client_user", JSON.stringify(client));
      loginForm.reset();
      errorBox.style.display = "none";
      
      updateClientHeaderState();
      
      // Redirect to dash
      authContainer.style.display = "none";
      dashContainer.style.display = "flex";
      renderClientDashboard();
    } else {
      errorBox.textContent = "Correo o contraseña incorrectos.";
      errorBox.style.display = "block";
    }
  });

  // Client Register Form
  const registerForm = document.getElementById("client-register-form");
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("c-reg-name").value.trim();
    const phone = document.getElementById("c-reg-phone").value.trim();
    const email = document.getElementById("c-reg-email").value.trim().toLowerCase();
    const pass = document.getElementById("c-reg-pass").value.trim();
    const errorBox = document.getElementById("c-reg-error");

    if (store.clients.some(c => c.email === email)) {
      errorBox.textContent = "Este correo electrónico ya está registrado.";
      errorBox.style.display = "block";
      return;
    }

    const newClient = {
      id: "cli-" + Math.floor(100000 + Math.random() * 900000),
      name,
      phone,
      email,
      password: pass
    };

    store.clients.push(newClient);
    store.save("clients");

    activeClientSession = newClient;
    sessionStorage.setItem("client_user", JSON.stringify(newClient));
    registerForm.reset();
    errorBox.style.display = "none";

    updateClientHeaderState();
    
    // Redirect to dashboard immediately
    authContainer.style.display = "none";
    dashContainer.style.display = "flex";
    renderClientDashboard();

    alert("¡Registro exitoso! Cuenta de cliente creada e iniciada.");
  });

  // Client Logout
  document.getElementById("btn-client-logout").addEventListener("click", () => {
    activeClientSession = null;
    sessionStorage.removeItem("client_user");
    localStorage.removeItem("client_user"); // fallback
    updateClientHeaderState();
    authModal.classList.remove("open");
  });

  updateClientHeaderState();
}

function updateClientHeaderState() {
  const btnText = document.querySelector("#btn-client-menu .btn-text");
  if (activeClientSession) {
    btnText.textContent = activeClientSession.name.split(" ")[0]; // First name
    document.getElementById("booking-client-prompt").style.display = "none";
  } else {
    btnText.textContent = "Mi Cuenta";
    document.getElementById("booking-client-prompt").style.display = "flex";
  }
}

function renderClientDashboard() {
  if (!activeClientSession) return;

  document.getElementById("client-name-display").textContent = activeClientSession.name;
  document.getElementById("client-phone-display").innerHTML = `<i class="fa-solid fa-phone"></i> Teléfono: ${activeClientSession.phone} | <i class="fa-regular fa-envelope"></i> Correo: ${activeClientSession.email}`;

  const tbody = document.getElementById("client-bookings-tbody");
  tbody.innerHTML = "";

  const clientBookings = store.bookings.filter(b => b.clientId === activeClientSession.id || b.customerEmail.toLowerCase() === activeClientSession.email.toLowerCase());

  if (clientBookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="color:var(--color-gray-medium)">Aún no tienes citas registradas.</td></tr>`;
    return;
  }

  // Sort: pending first, then chronologically latest
  clientBookings.sort((a,b) => {
    if (a.status === "Pendiente" && b.status !== "Pendiente") return -1;
    if (a.status !== "Pendiente" && b.status === "Pendiente") return 1;
    return (b.date + 'T' + b.time).localeCompare(a.date + 'T' + a.time);
  });

  clientBookings.forEach(b => {
    const barber = store.barbers.find(bar => bar.id === b.barberId);
    const barberName = barber ? barber.name : "Profesional";

    // Lookup services names
    // Barber services might differ, we search first in the selected barber's service array or templates
    const srvsText = b.services.map(id => {
      let srvObj = null;
      if (barber) srvObj = barber.services.find(s => s.id === id);
      if (!srvObj) srvObj = DEFAULT_GLOBAL_SERVICES.find(s => s.id === id); // global fallback
      return srvObj ? srvObj.name : "";
    }).join(", ");

    const statusBadge = getStatusBadgeHTML(b.status);
    
    // Reprogram/Cancel links
    let actionsHtml = "-";
    if (b.status === "Pendiente") {
      actionsHtml = `<button class="btn btn-outline btn-sm btn-manage-client-booking" data-id="${b.id}">Gestionar</button>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="text-gold" style="font-weight:700;">${b.id}</span></td>
      <td>${barberName}</td>
      <td><span style="font-size:0.8rem; color:var(--color-gray-medium);" title="${srvsText}">${srvsText.length > 25 ? srvsText.substring(0, 22) + '...' : srvsText}</span></td>
      <td>${formatSpanishDate(b.date)} - ${b.time} Hrs</td>
      <td><strong>$${b.totalPrice.toLocaleString("es-CL")}</strong></td>
      <td>${statusBadge}</td>
      <td>${actionsHtml}</td>
    `;

    const manageBtn = tr.querySelector(".btn-manage-client-booking");
    if (manageBtn) {
      manageBtn.onclick = () => {
        // Close client dashboard modal and open manage booking modal
        document.getElementById("client-auth-modal").classList.remove("open");
        openManageBookingModal(b.id);
      };
    }

    tbody.appendChild(tr);
  });
}

// ==========================================================================
// LANDING SHOWCASE & UI LOGIC
// ==========================================================================

function renderLandingShowcase() {
  const container = document.getElementById("landing-services-showcase");
  container.innerHTML = "";

  // Compile a small selection of popular services across barbers
  const popular = [];
  store.barbers.forEach(bar => {
    if (bar.services.length > 0) {
      // Add first 2 services of each barber to represent their work
      popular.push({
        barberName: bar.name,
        barberId: bar.id,
        service: bar.services[0]
      });
      if (bar.services[1]) {
        popular.push({
          barberName: bar.name,
          barberId: bar.id,
          service: bar.services[1]
        });
      }
    }
  });

  if (popular.length === 0) {
    container.innerHTML = `<div class="no-data-selected">No hay servicios registrados.</div>`;
    return;
  }

  // Shuffle or slice popular list to show max 6 cards on landing
  popular.slice(0, 6).forEach(item => {
    const srv = item.service;
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <div>
        <div class="service-header">
          <h3>${srv.name}</h3>
          <span class="service-price">$${srv.price.toLocaleString("es-CL")}</span>
        </div>
        <p>${srv.desc}</p>
      </div>
      <div class="service-meta">
        <span class="service-duration"><i class="fa-regular fa-clock"></i> ${srv.duration} min</span>
        <div style="display:flex; flex-direction:column; align-items:flex-end;">
          <span style="font-size:0.75rem; color:var(--color-gold); font-weight:700; margin-bottom:4px;">Ofrecido por ${item.barberName.split(" ")[0]}</span>
          <button class="btn btn-outline btn-sm btn-landing-srv-book" data-barber="${item.barberId}" data-srv="${srv.id}">Reservar</button>
        </div>
      </div>
    `;
    
    card.querySelector(".btn-landing-srv-book").onclick = () => {
      openBookingWizard(srv.id, item.barberId);
    };

    container.appendChild(card);
  });
}

function initLandingUI() {
  renderTeam();
  renderReviews();
  
  // Star Rating input form handler (re-init just in case)
  const starBtns = document.querySelectorAll(".stars-rating-input .star-rating-btn");
  const hiddenStarsInput = document.getElementById("review-stars-val");
  
  starBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const val = parseInt(btn.dataset.value);
      hiddenStarsInput.value = val;
      starBtns.forEach(b => {
        const bVal = parseInt(b.dataset.value);
        const icon = b.querySelector("i");
        icon.className = bVal <= val ? "fa-solid fa-star" : "fa-regular fa-star";
        b.classList.toggle("active", bVal <= val);
      });
    });
  });

  // Populate barbers options in reviews
  const reviewBarberSelect = document.getElementById("review-barber-select");
  reviewBarberSelect.innerHTML = `<option value="Ninguno">Ninguno / General</option>`;
  store.barbers.forEach(bar => {
    reviewBarberSelect.innerHTML += `<option value="${bar.name}">${bar.name}</option>`;
  });

  // Form submission
  const addReviewForm = document.getElementById("add-review-form");
  addReviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("review-name").value.trim();
    const rating = parseInt(hiddenStarsInput.value);
    const barber = reviewBarberSelect.value;
    const comment = document.getElementById("review-comment").value.trim();
    const date = new Date().toISOString().split('T')[0];

    const newReview = { 
      id: "rev-" + Date.now(), 
      name, 
      rating, 
      barber, 
      comment, 
      date,
      syncPending: !navigator.onLine 
    };
    store.reviews.unshift(newReview);
    store.save("reviews");
    updateSyncBadges();
    
    addReviewForm.reset();
    starBtns[4].click();
    renderReviews();
    alert("¡Muchas gracias! Tu opinión ha sido publicada con éxito.");
  });
}

function renderTeam() {
  const container = document.getElementById("barbers-container");
  container.innerHTML = "";

  store.barbers.forEach(bar => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
      <div class="team-img-wrapper">
        <img src="${bar.image}" alt="${bar.name}">
        <div class="team-overlay">
          <h3>${bar.name}</h3>
          <span class="team-specialty">${bar.specialty}</span>
        </div>
      </div>
      <div class="team-info">
        <p class="team-bio">"${bar.bio}"</p>
        <div class="team-actions">
          <button class="btn btn-primary btn-sm btn-book-barber-select" data-id="${bar.id}">Elegir Barbería</button>
        </div>
      </div>
    `;
    card.querySelector(".btn-book-barber-select").onclick = () => openBookingWizard(null, bar.id);
    container.appendChild(card);
  });
}

function renderReviews() {
  const feedContainer = document.getElementById("reviews-feed-container");
  const starsContainer = document.getElementById("avg-stars-container");
  const barsContainer = document.getElementById("stars-bars-container");
  const totalReviewsCountSpan = document.querySelector(".total-reviews-count");
  const averageRatingSpan = document.querySelector(".average-rating");

  feedContainer.innerHTML = "";

  if (store.reviews.length === 0) {
    feedContainer.innerHTML = `<p class="no-data-selected">Aún no hay opiniones. ¡Sé el primero!</p>`;
    return;
  }

  const total = store.reviews.length;
  let sum = 0;
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  store.reviews.forEach(r => {
    sum += r.rating;
    distribution[r.rating]++;
  });

  const avg = (sum / total).toFixed(1);
  averageRatingSpan.textContent = avg;
  totalReviewsCountSpan.textContent = `Basado en ${total} opinión${total > 1 ? 'es' : ''}`;

  starsContainer.innerHTML = "";
  const fullStars = Math.floor(avg);
  const hasHalf = (avg - fullStars) >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsContainer.innerHTML += `<i class="fa-solid fa-star"></i>`;
    } else if (i === fullStars + 1 && hasHalf) {
      starsContainer.innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else {
      starsContainer.innerHTML += `<i class="fa-regular fa-star"></i>`;
    }
  }

  barsContainer.innerHTML = "";
  for (let rating = 5; rating >= 1; rating--) {
    const count = distribution[rating];
    const percentage = total > 0 ? (count / total) * 100 : 0;
    barsContainer.innerHTML += `
      <div class="stars-bar-row">
        <span class="stars-bar-label">${rating} <i class="fa-solid fa-star text-gold"></i></span>
        <div class="stars-bar-track">
          <div class="stars-bar-fill" style="width: ${percentage}%"></div>
        </div>
        <span class="stars-bar-count">${count}</span>
      </div>
    `;
  }

  store.reviews.forEach(rev => {
    const starsHtml = Array(5).fill(0).map((_, i) => 
      i < rev.rating ? `<i class="fa-solid fa-star"></i>` : `<i class="fa-regular fa-star"></i>`
    ).join("");

    const card = document.createElement("div");
    card.className = "review-item-card";
    card.innerHTML = `
      <div class="review-item-header">
        <div>
          <span class="review-author">${rev.name}</span>
          <div class="review-meta-info">
            <span>${rev.date}</span>
            ${rev.barber && rev.barber !== "Ninguno" ? `<span class="review-barber-tag">Atendido por: ${rev.barber}</span>` : ''}
          </div>
        </div>
        <div class="review-item-stars">${starsHtml}</div>
      </div>
      <p>"${rev.comment}"</p>
    `;
    feedContainer.appendChild(card);
  });
}

// ==========================================================================
// UPDATED AGENDAMIENTO WIZARD LOGIC (BARBER FIRST -> SERVICES)
// ==========================================================================

let bookingWizardState = {
  step: 1,
  barberId: null, // REQUIRED FIRST STEP
  services: [], // Barber specific services list
  date: null,
  time: null,
  
  reset() {
    this.step = 1;
    this.barberId = null;
    this.services = [];
    this.date = null;
    this.time = null;
  }
};

let currentCalendarDate = new Date();

function initBookingWizard() {
  const bookingModal = document.getElementById("booking-modal");
  const closeBtn = document.getElementById("close-booking-modal");
  
  document.querySelectorAll(".btn-book-trigger").forEach(btn => {
    btn.addEventListener("click", () => openBookingWizard());
  });

  closeBtn.addEventListener("click", () => bookingModal.classList.remove("open"));

  // Navigation steps buttons
  const nextBtn = document.getElementById("wizard-next-btn");
  const prevBtn = document.getElementById("wizard-prev-btn");

  nextBtn.addEventListener("click", () => {
    if (validateStep(bookingWizardState.step)) {
      goToStep(bookingWizardState.step + 1);
    }
  });

  prevBtn.addEventListener("click", () => {
    goToStep(bookingWizardState.step - 1);
  });

  // Calendar navigations
  document.getElementById("prev-month-btn").addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderWizardCalendar();
  });
  document.getElementById("next-month-btn").addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderWizardCalendar();
  });

  // Details form submission
  const bookingForm = document.getElementById("booking-details-form");
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitBooking();
  });

  // Prompt click inside wizard to log in
  document.getElementById("btn-wizard-login-trigger").addEventListener("click", () => {
    // Close booking modal briefly, open client auth modal
    bookingModal.classList.remove("open");
    document.getElementById("btn-client-menu").click();
  });
}

function openBookingWizard(preSelectServiceId = null, preSelectBarberId = null) {
  bookingWizardState.reset();
  currentCalendarDate = new Date();
  
  // Set default form credentials if client logged in
  const form = document.getElementById("booking-details-form");
  const promptBox = document.getElementById("booking-client-prompt");
  const detailsSubtitle = document.getElementById("booking-details-subtitle");
  
  if (activeClientSession) {
    promptBox.style.display = "none";
    detailsSubtitle.textContent = `Registrando cita para ti: ${activeClientSession.name}. Haz clic en Confirmar para agendar.`;
    document.getElementById("cust-name").value = activeClientSession.name;
    document.getElementById("cust-phone").value = activeClientSession.phone;
    document.getElementById("cust-email").value = activeClientSession.email;
  } else {
    promptBox.style.display = "flex";
    detailsSubtitle.textContent = "Completa el formulario para finalizar tu reserva.";
    form.reset();
  }

  // Pre-fill state
  if (preSelectBarberId) {
    bookingWizardState.barberId = preSelectBarberId;
  }
  if (preSelectServiceId && preSelectBarberId) {
    bookingWizardState.services.push(preSelectServiceId);
  }

  // Draw first step lists
  renderWizardBarbers();
  renderWizardCalendar();
  
  // If pre-filled barber, go straight to Step 2!
  if (preSelectBarberId) {
    renderWizardServices();
    goToStep(2);
  } else {
    goToStep(1);
  }

  document.getElementById("booking-modal").classList.add("open");
}

function renderWizardBarbers() {
  const container = document.getElementById("wizard-barbers-list");
  container.innerHTML = "";

  store.barbers.forEach(bar => {
    const isSelected = bookingWizardState.barberId === bar.id;
    const card = document.createElement("div");
    card.className = `wizard-barber-card ${isSelected ? 'selected' : ''}`;
    card.innerHTML = `
      <span class="barber-select-indicator"><i class="fa-solid fa-circle-check"></i></span>
      <div class="barber-card-avatar">
        <img src="${bar.image}" alt="${bar.name}">
      </div>
      <h5>${bar.name}</h5>
      <p>${bar.specialty}</p>
    `;
    card.addEventListener("click", () => {
      bookingWizardState.barberId = bar.id;
      // Reset selected services when barber changes
      bookingWizardState.services = [];
      
      renderWizardBarbers();
      renderWizardServices(); // Render specific catalog
      
      // Auto move to step 2 for speed
      setTimeout(() => goToStep(2), 250);
    });
    container.appendChild(card);
  });
}

function renderWizardServices() {
  const container = document.getElementById("wizard-services-list");
  const subtitle = document.getElementById("wizard-services-subtitle");
  container.innerHTML = "";

  const selectedBarber = store.barbers.find(b => b.id === bookingWizardState.barberId);
  if (!selectedBarber) {
    container.innerHTML = `<div class="no-date-selected">Selecciona un barbero en el paso anterior primero.</div>`;
    return;
  }

  subtitle.textContent = `Catálogo de servicios exclusivos de ${selectedBarber.name}:`;

  if (selectedBarber.services.length === 0) {
    container.innerHTML = `<div class="no-date-selected">Este barbero no tiene servicios asignados actualmente.</div>`;
    return;
  }

  selectedBarber.services.forEach(srv => {
    const isSelected = bookingWizardState.services.includes(srv.id);
    const item = document.createElement("div");
    item.className = `wizard-service-item ${isSelected ? 'selected' : ''}`;
    item.innerHTML = `
      <div class="service-item-left">
        <div class="service-item-checkbox">
          ${isSelected ? '<i class="fa-solid fa-check"></i>' : ''}
        </div>
        <div class="service-item-info">
          <h5>${srv.name}</h5>
          <p>${srv.desc}</p>
        </div>
      </div>
      <div class="service-item-right">
        <span class="service-item-price">$${srv.price.toLocaleString("es-CL")}</span>
        <span class="service-item-duration">${srv.duration} min</span>
      </div>
    `;
    
    item.addEventListener("click", () => {
      const idx = bookingWizardState.services.indexOf(srv.id);
      if (idx > -1) {
        bookingWizardState.services.splice(idx, 1);
      } else {
        bookingWizardState.services.push(srv.id);
      }
      renderWizardServices();
      updateSummaryCard();
    });
    container.appendChild(item);
  });
}

function updateSummaryCard() {
  const servicesText = document.getElementById("summary-services-text");
  const barberText = document.getElementById("summary-barber-text");
  const dateText = document.getElementById("summary-date-text");
  const timeText = document.getElementById("summary-time-text");
  const priceText = document.getElementById("summary-price-text");
  const durationText = document.getElementById("summary-duration-text");

  const barber = store.barbers.find(b => b.id === bookingWizardState.barberId);

  // Barber name
  barberText.textContent = barber ? barber.name : "No asignado";

  // Services & Totals
  let priceSum = 0;
  let durationSum = 0;
  
  if (bookingWizardState.services.length === 0) {
    servicesText.textContent = "Ninguno";
  } else {
    const names = [];
    bookingWizardState.services.forEach(id => {
      const srvObj = barber ? barber.services.find(s => s.id === id) : null;
      if (srvObj) {
        names.push(srvObj.name);
        priceSum += srvObj.price;
        durationSum += srvObj.duration;
      }
    });
    servicesText.textContent = names.join(", ");
  }

  // Date / Time
  dateText.textContent = bookingWizardState.date ? formatSpanishDate(bookingWizardState.date) : "-";
  timeText.textContent = bookingWizardState.time ? `${bookingWizardState.time} Hrs` : "-";

  priceText.textContent = `$${priceSum.toLocaleString("es-CL")}`;
  durationText.textContent = `${durationSum} min`;
}

function renderWizardCalendar() {
  // Check if calendar dates should respect specific barber blocked dates or vacations
  const selectedBarber = store.barbers.find(b => b.id === bookingWizardState.barberId);
  const container = document.getElementById("calendar-days-container");
  const title = document.getElementById("calendar-month-year");
  container.innerHTML = "";

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  title.textContent = `${months[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  let adjustedFirstDay = firstDayIndex - 1;
  if (adjustedFirstDay === -1) adjustedFirstDay = 6;

  for (let i = 0; i < adjustedFirstDay; i++) {
    container.appendChild(document.createElement("div"));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= totalDays; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = dateObj.toISOString().split('T')[0];
    const dayOfWeek = dateObj.getDay();

    const btn = document.createElement("button");
    btn.className = "calendar-day-btn";
    btn.textContent = d;

    const isPast = dateObj < today;
    
    // Check specific barber hours configuration
    const barberDaySetting = selectedBarber ? selectedBarber.hours[dayOfWeek] : store.globalHours[dayOfWeek];
    const isClosed = barberDaySetting ? !barberDaySetting.isWorking : true;

    // Check holiday list (barber personal vacations OR global local blocked date)
    const isGlobalBlocked = store.globalBlockedDates.some(h => h.date === dateStr);
    const isBarberBlocked = selectedBarber ? selectedBarber.blockedDates.some(h => h.date === dateStr) : false;
    const isBlocked = isGlobalBlocked || isBarberBlocked;

    const isSelected = bookingWizardState.date === dateStr;
    const isToday = today.toISOString().split('T')[0] === dateStr;

    if (isToday) btn.classList.add("today");

    if (isPast || isClosed || isBlocked) {
      btn.className = "calendar-day-btn disabled";
      btn.disabled = true;
      let reason = "No laborable";
      if (isPast) reason = "Fecha pasada";
      if (isBlocked) {
        let blockObj = store.globalBlockedDates.find(h => h.date === dateStr);
        if (!blockObj && selectedBarber) blockObj = selectedBarber.blockedDates.find(h => h.date === dateStr);
        reason = blockObj ? blockObj.reason : "Vacaciones/Festivo";
      }
      btn.title = reason;
    } else {
      if (isSelected) btn.classList.add("active");
      
      btn.addEventListener("click", () => {
        container.querySelectorAll(".calendar-day-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        bookingWizardState.date = dateStr;
        bookingWizardState.time = null; // reset time slot
        updateSummaryCard();
        renderWizardTimeSlots();
      });
    }

    container.appendChild(btn);
  }
}

function renderWizardTimeSlots() {
  const container = document.getElementById("time-slots-container");
  container.innerHTML = "";

  if (!bookingWizardState.date || !bookingWizardState.barberId) {
    container.innerHTML = `<div class="no-date-selected">Selecciona un día en el calendario para ver las horas disponibles.</div>`;
    return;
  }

  const selectedBarber = store.barbers.find(b => b.id === bookingWizardState.barberId);
  const selectedDateObj = new Date(bookingWizardState.date + 'T00:00:00');
  const dayOfWeek = selectedDateObj.getDay();
  const dayConfig = selectedBarber ? selectedBarber.hours[dayOfWeek] : store.globalHours[dayOfWeek];

  if (!dayConfig || !dayConfig.isWorking) {
    container.innerHTML = `<div class="no-date-selected">Cerrado este día.</div>`;
    return;
  }

  const [startHour, startMin] = dayConfig.openTime.split(":").map(Number);
  const [endHour, endMin] = dayConfig.closeTime.split(":").map(Number);

  // Sum up duration of selected services
  let totalDuration = 0;
  bookingWizardState.services.forEach(id => {
    const srv = selectedBarber.services.find(s => s.id === id);
    if (srv) totalDuration += srv.duration;
  });

  const slots = [];
  let current = new Date(selectedDateObj);
  current.setHours(startHour, startMin, 0, 0);

  const limit = new Date(selectedDateObj);
  limit.setHours(endHour, endMin, 0, 0);

  while (current < limit) {
    const hrs = String(current.getHours()).padStart(2, '0');
    const mins = String(current.getMinutes()).padStart(2, '0');
    const timeStr = `${hrs}:${mins}`;

    const slotEnd = new Date(current);
    slotEnd.setMinutes(slotEnd.getMinutes() + totalDuration);

    if (slotEnd <= limit) {
      slots.push({
        time: timeStr,
        dateTimeObj: new Date(current)
      });
    }
    current.setMinutes(current.getMinutes() + 30);
  }

  if (slots.length === 0) {
    container.innerHTML = `<div class="no-date-selected">No hay horarios suficientes para la duración de este servicio.</div>`;
    return;
  }

  const now = new Date();

  slots.forEach(slot => {
    const isSelected = bookingWizardState.time === slot.time;
    let isBooked = false;

    const isToday = new Date().toISOString().split('T')[0] === bookingWizardState.date;
    const isPastSlot = isToday && slot.dateTimeObj < now;

    if (!isPastSlot) {
      // Check collision with the selected barber's active bookings
      const dayBookings = store.bookings.filter(b => b.barberId === bookingWizardState.barberId && b.date === bookingWizardState.date && b.status !== "Cancelada");
      
      isBooked = dayBookings.some(b => {
        return checkCollision(b.time, b.totalDuration, slot.time, totalDuration);
      });
    }

    const btn = document.createElement("button");
    btn.className = "time-slot-btn";
    btn.textContent = slot.time;

    if (isPastSlot || isBooked) {
      btn.className = "time-slot-btn disabled";
      btn.disabled = true;
      btn.title = isPastSlot ? "Horario ya pasado" : "Ocupado";
    } else {
      if (isSelected) btn.classList.add("active");
      btn.addEventListener("click", () => {
        container.querySelectorAll(".time-slot-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        bookingWizardState.time = slot.time;
        updateSummaryCard();
      });
    }

    container.appendChild(btn);
  });
}

function goToStep(stepNum) {
  if (stepNum < 1 || stepNum > 4) return;
  bookingWizardState.step = stepNum;

  // Toggle panes
  document.querySelectorAll(".wizard-pane").forEach(p => p.classList.remove("active"));
  document.querySelector(`.wizard-pane[data-pane="${stepNum}"]`).classList.add("active");

  // Toggle step numbers active class
  document.querySelectorAll(".progress-step").forEach(step => {
    const val = parseInt(step.dataset.step);
    step.classList.toggle("active", val === stepNum);
    step.classList.toggle("completed", val < stepNum);
  });

  const prevBtn = document.getElementById("wizard-prev-btn");
  const nextBtn = document.getElementById("wizard-next-btn");

  prevBtn.disabled = stepNum === 1;

  if (stepNum === 4) {
    nextBtn.innerHTML = `Confirmar Reserva <i class="fa-solid fa-check btn-icon-right"></i>`;
  } else {
    nextBtn.innerHTML = `Siguiente <i class="fa-solid fa-chevron-right btn-icon-right"></i>`;
  }
}

function validateStep(stepNum) {
  if (stepNum === 1) {
    if (!bookingWizardState.barberId) {
      alert("Por favor, selecciona a un barbero para poder ver sus servicios.");
      return false;
    }
  } else if (stepNum === 2) {
    if (bookingWizardState.services.length === 0) {
      alert("Por favor, selecciona al menos un servicio del catálogo del barbero.");
      return false;
    }
  } else if (stepNum === 3) {
    if (!bookingWizardState.date || !bookingWizardState.time) {
      alert("Por favor, selecciona el día en el calendario y una hora de atención.");
      return false;
    }
  } else if (stepNum === 4) {
    const form = document.getElementById("booking-details-form");
    return form.reportValidity();
  }
  return true;
}

function submitBooking() {
  const name = document.getElementById("cust-name").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const email = document.getElementById("cust-email").value.trim();

  const barber = store.barbers.find(b => b.id === bookingWizardState.barberId);
  let totalPrice = 0;
  let totalDuration = 0;

  bookingWizardState.services.forEach(id => {
    const srv = barber.services.find(s => s.id === id);
    if (srv) {
      totalPrice += srv.price;
      totalDuration += srv.duration;
    }
  });

  const bookingCode = "B-" + Math.floor(100000 + Math.random() * 900000);

  const newBooking = {
    id: bookingCode,
    clientId: activeClientSession ? activeClientSession.id : null,
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    services: [...bookingWizardState.services],
    barberId: bookingWizardState.barberId,
    date: bookingWizardState.date,
    time: bookingWizardState.time,
    totalPrice: totalPrice,
    totalDuration: totalDuration,
    status: "Pendiente",
    createdAt: new Date().toISOString().split('T')[0],
    syncPending: !navigator.onLine
  };

  store.bookings.push(newBooking);
  store.save("bookings");
  updateSyncBadges();

  document.getElementById("booking-modal").classList.remove("open");
  showSimulatedNotification(newBooking);

  if (document.getElementById("admin-panel").classList.contains("open")) {
    renderAdminAppointments();
    renderAdminDashboard();
  }
}

// Check time intervals collisions
function checkCollision(bTime, bDuration, targetTime, targetDuration) {
  const [bH, bM] = bTime.split(":").map(Number);
  const [tH, tM] = targetTime.split(":").map(Number);

  const bStart = bH * 60 + bM;
  const bEnd = bStart + bDuration;

  const tStart = tH * 60 + tM;
  const tEnd = tStart + targetDuration;

  return (tStart < bEnd && tEnd > bStart);
}

// ==========================================================================
// SIMULATOR DE NOTIFICACIÓN LOGIC
// ==========================================================================

function initNotifications() {
  const modal = document.getElementById("notification-modal");
  const closeBtn = document.getElementById("close-notification-modal");
  const finishBtn = document.getElementById("btn-finish-booking");

  const closeNotif = () => modal.classList.remove("open");
  closeBtn.addEventListener("click", closeNotif);
  finishBtn.addEventListener("click", closeNotif);

  const tabs = document.querySelectorAll(".notifications-tabs .notif-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const notifType = tab.dataset.notif;
      document.getElementById("notif-whatsapp-pane").classList.toggle("active", notifType === "whatsapp");
      document.getElementById("notif-email-pane").classList.toggle("active", notifType === "email");
    });
  });
}

function showSimulatedNotification(booking) {
  const modal = document.getElementById("notification-modal");
  const barber = store.barbers.find(b => b.id === booking.barberId);

  document.querySelectorAll(".notif-cust-name").forEach(s => s.textContent = booking.customerName);
  document.querySelectorAll(".notif-barber").forEach(s => s.textContent = barber ? barber.name : "Profesional");

  const servicesText = booking.services.map(id => {
    const srv = barber ? barber.services.find(s => s.id === id) : null;
    return srv ? srv.name : "";
  }).join(", ");
  document.querySelectorAll(".notif-services").forEach(s => s.textContent = servicesText);

  document.querySelectorAll(".notif-date").forEach(s => s.textContent = formatSpanishDate(booking.date));
  document.querySelectorAll(".notif-time").forEach(s => s.textContent = `${booking.time} Hrs`);
  document.querySelectorAll(".notif-price").forEach(s => s.textContent = `$${booking.totalPrice.toLocaleString("es-CL")}`);

  document.getElementById("email-to-field").textContent = booking.customerEmail;

  const path = window.location.href.split('?')[0];
  const manageURL = `${path}?manage=${booking.id}`;
  
  document.getElementById("wa-manage-link").href = manageURL;
  document.getElementById("email-manage-link").href = manageURL;

  document.querySelectorAll(".manage-booking-link").forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      modal.classList.remove("open");
      openManageBookingModal(booking.id);
    };
  });

  modal.classList.add("open");
}

// ==========================================================================
// CLIENT EDIT/CANCEL BOOKING DIALOG (REPROGRAMAR / CANCELAR)
// ==========================================================================

let currentManageBooking = null;
let reprogramCalendarTracker = new Date();
let selectedReprogramDate = null;
let selectedReprogramTime = null;

function initManageBooking() {
  document.getElementById("close-manage-modal").addEventListener("click", () => {
    document.getElementById("manage-booking-modal").classList.remove("open");
  });

  document.getElementById("btn-submit-cancel").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      cancelCurrentAppointment();
    }
  });

  document.getElementById("reprogram-prev-month").addEventListener("click", () => {
    reprogramCalendarTracker.setMonth(reprogramCalendarTracker.getMonth() - 1);
    renderReprogramCalendar();
  });
  document.getElementById("reprogram-next-month").addEventListener("click", () => {
    reprogramCalendarTracker.setMonth(reprogramCalendarTracker.getMonth() + 1);
    renderReprogramCalendar();
  });

  document.getElementById("btn-submit-reprogram").addEventListener("click", () => {
    saveReprogrammedAppointment();
  });
}

function openManageBookingModal(bookingId) {
  const bookingObj = store.bookings.find(b => b.id === bookingId);
  if (!bookingObj) {
    alert("Cita no encontrada.");
    return;
  }

  currentManageBooking = bookingObj;
  selectedReprogramDate = null;
  selectedReprogramTime = null;
  reprogramCalendarTracker = new Date();

  document.getElementById("manage-code-display").textContent = bookingObj.id;
  const barber = store.barbers.find(b => b.id === bookingObj.barberId);
  document.getElementById("manage-barber-display").textContent = barber ? barber.name : "Profesional";

  const servicesText = bookingObj.services.map(id => {
    const srv = barber ? barber.services.find(s => s.id === id) : null;
    return srv ? srv.name : "";
  }).join(", ");
  document.getElementById("manage-services-display").textContent = servicesText;

  document.getElementById("manage-datetime-display").textContent = `${formatSpanishDate(bookingObj.date)} a las ${bookingObj.time} Hrs`;
  document.getElementById("manage-price-display").textContent = `$${bookingObj.totalPrice.toLocaleString("es-CL")}`;

  const statusBadge = document.getElementById("manage-status-display");
  statusBadge.textContent = bookingObj.status;
  statusBadge.className = `status-badge status-${bookingObj.status.toLowerCase().replace(" ", "")}`;

  const isPending = bookingObj.status === "Pendiente";
  document.getElementById("reprogram-calendar-box").style.display = isPending ? "block" : "none";
  document.getElementById("btn-submit-cancel").disabled = !isPending;

  renderReprogramCalendar();
  document.getElementById("reprogram-time-slots").innerHTML = `<div class="no-date-selected">Selecciona un día en el calendario.</div>`;
  document.getElementById("btn-submit-reprogram").disabled = true;

  document.getElementById("manage-booking-modal").classList.add("open");
}

function renderReprogramCalendar() {
  // We reuse the calendar drawer utility, customized for the specific barber
  renderWizardCalendar(
    "reprogram-calendar-days",
    "reprogram-month-year",
    "date", // dummy
    onReprogramDateClick
  );
}

function onReprogramDateClick(dateStr) {
  selectedReprogramDate = dateStr;
  selectedReprogramTime = null;
  document.getElementById("btn-submit-reprogram").disabled = true;
  renderReprogramTimeSlots();
}

function renderReprogramTimeSlots() {
  const container = document.getElementById("reprogram-time-slots");
  container.innerHTML = "";

  if (!selectedReprogramDate || !currentManageBooking) return;

  const barber = store.barbers.find(b => b.id === currentManageBooking.barberId);
  const selectedDateObj = new Date(selectedReprogramDate + 'T00:00:00');
  const dayOfWeek = selectedDateObj.getDay();
  const dayConfig = barber ? barber.hours[dayOfWeek] : store.globalHours[dayOfWeek];

  if (!dayConfig || !dayConfig.isWorking) {
    container.innerHTML = `<div class="no-date-selected">Cerrado.</div>`;
    return;
  }

  const [startHour, startMin] = dayConfig.openTime.split(":").map(Number);
  const [endHour, endMin] = dayConfig.closeTime.split(":").map(Number);
  const duration = currentManageBooking.totalDuration;

  const slots = [];
  let current = new Date(selectedDateObj);
  current.setHours(startHour, startMin, 0, 0);
  const limit = new Date(selectedDateObj);
  limit.setHours(endHour, endMin, 0, 0);

  while (current < limit) {
    const hrs = String(current.getHours()).padStart(2, '0');
    const mins = String(current.getMinutes()).padStart(2, '0');
    const timeStr = `${hrs}:${mins}`;

    const slotEnd = new Date(current);
    slotEnd.setMinutes(slotEnd.getMinutes() + duration);

    if (slotEnd <= limit) {
      slots.push({ time: timeStr, dateTimeObj: new Date(current) });
    }
    current.setMinutes(current.getMinutes() + 30);
  }

  const now = new Date();

  slots.forEach(slot => {
    let isBooked = false;
    const isToday = new Date().toISOString().split('T')[0] === selectedReprogramDate;
    const isPastSlot = isToday && slot.dateTimeObj < now;

    if (!isPastSlot) {
      const dayBookings = store.bookings.filter(b => b.barberId === currentManageBooking.barberId && b.date === selectedReprogramDate && b.status !== "Cancelada" && b.id !== currentManageBooking.id);
      
      isBooked = dayBookings.some(b => checkCollision(b.time, b.totalDuration, slot.time, duration));
    }

    const btn = document.createElement("button");
    btn.className = "time-slot-btn";
    btn.textContent = slot.time;

    if (isPastSlot || isBooked) {
      btn.className = "time-slot-btn disabled";
      btn.disabled = true;
    } else {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".time-slot-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        selectedReprogramTime = slot.time;
        document.getElementById("btn-submit-reprogram").disabled = false;
      });
    }

    container.appendChild(btn);
  });
}

function saveReprogrammedAppointment() {
  if (!currentManageBooking || !selectedReprogramDate || !selectedReprogramTime) return;

  currentManageBooking.date = selectedReprogramDate;
  currentManageBooking.time = selectedReprogramTime;
  currentManageBooking.syncPending = !navigator.onLine; // tag for offline sync
  store.save("bookings");
  updateSyncBadges();

  alert("Cita reprogramada con éxito.");
  document.getElementById("manage-booking-modal").classList.remove("open");
  
  if (activeClientSession) renderClientDashboard();

  if (document.getElementById("admin-panel").classList.contains("open")) {
    renderAdminAppointments();
    renderAdminDashboard();
  }
}

function cancelCurrentAppointment() {
  if (!currentManageBooking) return;

  currentManageBooking.status = "Cancelada";
  currentManageBooking.syncPending = !navigator.onLine; // tag for offline sync
  store.save("bookings");
  updateSyncBadges();

  alert("Tu cita ha sido cancelada.");
  document.getElementById("manage-booking-modal").classList.remove("open");
  
  if (activeClientSession) renderClientDashboard();

  if (document.getElementById("admin-panel").classList.contains("open")) {
    renderAdminAppointments();
    renderAdminDashboard();
  }
}

// ==========================================================================
// VoIP WEB CALLING INTERACTION (VOIP SIMULATION)
// ==========================================================================

let audioContextInstance = null;
let ringtoneInterval = null;
let callDurationTimer = null;
let voipState = {
  status: "idle", // idle, ringing, connected, ended
  seconds: 0,
  muted: false,
  speaker: false
};

function initVoipSimulation() {
  const modal = document.getElementById("voip-call-modal");
  
  // Hang Up call button
  document.getElementById("voip-btn-hangup").addEventListener("click", () => {
    hangupVoipCall();
  });

  // Mute button toggle
  const muteBtn = document.getElementById("voip-btn-mute");
  muteBtn.addEventListener("click", () => {
    voipState.muted = !voipState.muted;
    muteBtn.classList.toggle("active", voipState.muted);
    muteBtn.querySelector("i").className = voipState.muted ? "fa-solid fa-microphone-slash" : "fa-solid fa-microphone";
  });

  // Speaker button toggle
  const speakerBtn = document.getElementById("voip-btn-speaker");
  speakerBtn.addEventListener("click", () => {
    voipState.speaker = !voipState.speaker;
    speakerBtn.classList.toggle("active", voipState.speaker);
  });
}

// Initialize BroadcastChannel for real-time multi-tab call simulation
const voipChannel = new BroadcastChannel("barbe_voip_channel");

// Listen for VoIP signaling messages on the channel
voipChannel.onmessage = (event) => {
  const { type, data } = event.data;
  console.log("[VoIP Channel] Received signal:", type, data);

  if (type === "CALL_INITIATED") {
    // If client is logged in and matches target phone number, trigger incoming call UI!
    if (activeClientSession && activeClientSession.phone === data.clientPhone) {
      showIncomingCall(data.barberName, data.barberId);
    }
  } else if (type === "CALL_ACCEPTED") {
    // Barber receives acceptance from client tab
    if (adminSession.authenticated && adminSession.role === "barber" && adminSession.barberId === data.barberId) {
      connectVoipCall(true); // connect call without broadcasting again
    }
  } else if (type === "CALL_REJECTED") {
    // Barber receives decline from client tab
    if (adminSession.authenticated && adminSession.role === "barber" && adminSession.barberId === data.barberId) {
      voipState.status = "rejected";
      document.getElementById("voip-call-status").textContent = "🔴 Llamada rechazada";
      playShortBeep(300, 0.4);
      if (ringtoneInterval) {
        clearInterval(ringtoneInterval);
        clearTimeout(ringtoneInterval);
      }
      setTimeout(() => {
        document.getElementById("voip-call-modal").classList.remove("open");
      }, 2000);
    }
  } else if (type === "CALL_MUTED") {
    // Sync mute indicators between client and barber
    if (activeClientSession && data.sender === "barber" && data.barberId === data.barberId) {
      const callPanel = document.getElementById("voip-client-call-modal");
      callPanel.querySelector("p").textContent = data.muted 
        ? "🟢 Llamada en Curso (Barbero Silenciado)" 
        : "🟢 Llamada en Curso (Web VoIP)";
    } else if (adminSession.authenticated && adminSession.role === "barber" && data.sender === "client" && adminSession.barberId === data.barberId) {
      document.getElementById("voip-call-status").textContent = data.muted 
        ? "🟢 Conectado (Cliente Silenciado)" 
        : "🟢 Conectado";
    }
  } else if (type === "CALL_HUNGUP") {
    // Hangup sync
    if (activeClientSession && data.sender === "barber") {
      hangupClientCall(data.barberId, true); // hang up client side without broadcasting again
    } else if (adminSession.authenticated && data.sender === "client" && adminSession.barberId === data.barberId) {
      hangupVoipCall(true); // hang up barber side without broadcasting again
    }
  }
};

function startVoipCall(clientName, clientPhone) {
  const modal = document.getElementById("voip-call-modal");
  
  // Reset states
  voipState.status = "ringing";
  voipState.seconds = 0;
  voipState.muted = false;
  voipState.speaker = false;

  document.getElementById("voip-btn-mute").classList.remove("active");
  document.getElementById("voip-btn-mute").querySelector("i").className = "fa-solid fa-microphone";
  document.getElementById("voip-btn-speaker").classList.remove("active");

  document.getElementById("voip-client-name").textContent = clientName;
  document.getElementById("voip-call-status").textContent = "Llamando...";
  document.getElementById("voip-timer").style.display = "none";
  
  // Standard phone call fallback link setup
  document.getElementById("voip-real-call-link").href = `tel:${clientPhone}`;

  modal.classList.add("open");

  // Get active barber details
  const activeBarber = store.barbers.find(b => b.id === (adminSession.barberId || "bar-1"));
  const barberName = activeBarber ? activeBarber.name : "Tu Barbero";
  const barberId = adminSession.barberId || "bar-1";

  // Broadcast Call Initiative
  voipChannel.postMessage({
    type: "CALL_INITIATED",
    data: {
      clientPhone,
      barberName,
      barberId
    }
  });

  // Play synthetic telephone ring tone using Web Audio API!
  playSyntheticRingtone();

  // If client doesn't answer in 10 seconds, timeout and simulate "no answer"
  ringtoneInterval = setTimeout(() => {
    if (voipState.status === "ringing") {
      voipState.status = "no_answer";
      document.getElementById("voip-call-status").textContent = "🔴 Sin respuesta en la web";
      playShortBeep(300, 0.4);
      if (ringtoneInterval) {
        clearInterval(ringtoneInterval);
        clearTimeout(ringtoneInterval);
      }
      setTimeout(() => {
        modal.classList.remove("open");
      }, 3000);
    }
  }, 10000);
}

function playSyntheticRingtone() {
  try {
    if (!audioContextInstance) {
      audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const playRingCycle = () => {
      if (voipState.status !== "ringing") return;

      const osc1 = audioContextInstance.createOscillator();
      const osc2 = audioContextInstance.createOscillator();
      const gainNode = audioContextInstance.createGain();

      osc1.frequency.value = 440;
      osc2.frequency.value = 480;

      gainNode.gain.setValueAtTime(0, audioContextInstance.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContextInstance.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioContextInstance.currentTime + 1.2);
      gainNode.gain.linearRampToValueAtTime(0, audioContextInstance.currentTime + 1.3);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContextInstance.destination);

      osc1.start();
      osc2.start();

      osc1.stop(audioContextInstance.currentTime + 1.5);
      osc2.stop(audioContextInstance.currentTime + 1.5);
    };

    playRingCycle();
    ringtoneInterval = setInterval(playRingCycle, 3000);
  } catch (err) {
    console.log("AudioContext blocked or not supported. Ringtone simulated silently.", err);
  }
}

function connectVoipCall(skipBroadcast = false) {
  if (ringtoneInterval) {
    clearInterval(ringtoneInterval);
    clearTimeout(ringtoneInterval);
  }

  voipState.status = "connected";
  document.getElementById("voip-call-status").textContent = "🟢 Conectado";
  document.getElementById("voip-timer").style.display = "block";
  document.getElementById("voip-timer").textContent = "00:00";

  // Play a short double beep when connected
  playShortBeep(600, 0.08);
  setTimeout(() => playShortBeep(600, 0.08), 120);

  // Timer tick
  callDurationTimer = setInterval(() => {
    voipState.seconds++;
    const m = String(Math.floor(voipState.seconds / 60)).padStart(2, '0');
    const s = String(voipState.seconds % 60).padStart(2, '0');
    document.getElementById("voip-timer").textContent = `${m}:${s}`;
  }, 1000);
}

function hangupVoipCall(skipBroadcast = false) {
  if (ringtoneInterval) {
    clearInterval(ringtoneInterval);
    clearTimeout(ringtoneInterval);
  }
  if (callDurationTimer) clearInterval(callDurationTimer);

  if (!skipBroadcast) {
    // Send hangup event
    voipChannel.postMessage({
      type: "CALL_HUNGUP",
      data: {
        sender: "barber",
        barberId: adminSession.barberId || "bar-1"
      }
    });
  }

  voipState.status = "ended";
  document.getElementById("voip-call-status").textContent = "🔴 Llamada finalizada";
  
  // Play hangup beep sound
  playShortBeep(300, 0.3);

  setTimeout(() => {
    document.getElementById("voip-call-modal").classList.remove("open");
  }, 1200);
}

function playShortBeep(freq, dur) {
  try {
    if (!audioContextInstance) {
      audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioContextInstance.createOscillator();
    const gain = audioContextInstance.createGain();
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0.08, audioContextInstance.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioContextInstance.currentTime + dur);
    
    osc.connect(gain);
    gain.connect(audioContextInstance.destination);
    
    osc.start();
    osc.stop(audioContextInstance.currentTime + dur);
  } catch (e) {
    // silently fail if audio blocked
  }
}

// ==========================================================================
// CLIENT-SIDE INCOMING & ACTIVE VOIP CALL UI HANDLERS
// ==========================================================================

let clientCallingTimer = null;
let clientCallSeconds = 0;
let clientRingtoneTimer = null;
let clientRingtoneStatus = "idle";

function showIncomingCall(barberName, barberId) {
  const modal = document.getElementById("voip-incoming-modal");
  document.getElementById("incoming-caller-name").textContent = barberName;

  // Play synthetic telephone ring tone on the client side!
  playClientIncomingRingtone();

  // Accept button
  document.getElementById("btn-accept-incoming").onclick = () => {
    stopClientRingtone();
    modal.classList.remove("open");

    // Inform barber that call was accepted
    voipChannel.postMessage({
      type: "CALL_ACCEPTED",
      data: {
        barberId
      }
    });

    // Show call active screen
    showClientCallingPanel(barberName, barberId);
  };

  // Decline button
  document.getElementById("btn-decline-incoming").onclick = () => {
    stopClientRingtone();
    modal.classList.remove("open");

    // Inform barber that call was rejected
    voipChannel.postMessage({
      type: "CALL_REJECTED",
      data: {
        barberId
      }
    });
  };

  modal.classList.add("open");
}

function playClientIncomingRingtone() {
  clientRingtoneStatus = "ringing";
  const playRing = () => {
    if (clientRingtoneStatus !== "ringing") return;
    try {
      if (!audioContextInstance) {
        audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc1 = audioContextInstance.createOscillator();
      const osc2 = audioContextInstance.createOscillator();
      const gainNode = audioContextInstance.createGain();

      osc1.frequency.value = 440;
      osc2.frequency.value = 480;

      gainNode.gain.setValueAtTime(0, audioContextInstance.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContextInstance.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioContextInstance.currentTime + 1.2);
      gainNode.gain.linearRampToValueAtTime(0, audioContextInstance.currentTime + 1.3);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContextInstance.destination);

      osc1.start();
      osc2.start();
      osc1.stop(audioContextInstance.currentTime + 1.5);
      osc2.stop(audioContextInstance.currentTime + 1.5);
    } catch (e) {
      console.log("AudioContext blocked or not supported on client.", e);
    }
  };

  playRing();
  clientRingtoneTimer = setInterval(playRing, 3000);
}

function stopClientRingtone() {
  clientRingtoneStatus = "idle";
  if (clientRingtoneTimer) {
    clearInterval(clientRingtoneTimer);
  }
}

function showClientCallingPanel(barberName, barberId) {
  const callPanel = document.getElementById("voip-client-call-modal");
  document.getElementById("client-call-barber-name").textContent = barberName;
  document.getElementById("client-call-timer").textContent = "00:00";

  clientCallSeconds = 0;
  playShortBeep(600, 0.08);
  setTimeout(() => playShortBeep(600, 0.08), 120);

  if (clientCallingTimer) clearInterval(clientCallingTimer);
  clientCallingTimer = setInterval(() => {
    clientCallSeconds++;
    const m = String(Math.floor(clientCallSeconds / 60)).padStart(2, '0');
    const s = String(clientCallSeconds % 60).padStart(2, '0');
    document.getElementById("client-call-timer").textContent = `${m}:${s}`;
  }, 1000);

  // Hangup button
  document.getElementById("voip-client-hangup").onclick = () => {
    hangupClientCall(barberId);
  };

  // Mute button
  const muteBtn = document.getElementById("voip-client-mute");
  let clientMuted = false;
  muteBtn.classList.remove("active");
  muteBtn.querySelector("i").className = "fa-solid fa-microphone";
  
  muteBtn.onclick = () => {
    clientMuted = !clientMuted;
    muteBtn.classList.toggle("active", clientMuted);
    muteBtn.querySelector("i").className = clientMuted ? "fa-solid fa-microphone-slash" : "fa-solid fa-microphone";

    voipChannel.postMessage({
      type: "CALL_MUTED",
      data: {
        sender: "client",
        muted: clientMuted,
        barberId
      }
    });
  };

  callPanel.classList.add("open");
}

function hangupClientCall(barberId, skipBroadcast = false) {
  if (clientCallingTimer) {
    clearInterval(clientCallingTimer);
  }
  
  if (!skipBroadcast) {
    voipChannel.postMessage({
      type: "CALL_HUNGUP",
      data: {
        sender: "client",
        barberId: barberId || "bar-1"
      }
    });
  }

  const callPanel = document.getElementById("voip-client-call-modal");
  callPanel.querySelector("p").textContent = "🔴 Llamada finalizada";
  playShortBeep(300, 0.3);

  setTimeout(() => {
    callPanel.classList.remove("open");
    callPanel.querySelector("p").textContent = "🟢 Llamada en Curso (Web VoIP)";
  }, 1200);
}

// ==========================================================================
// ADMINISTRATIVE PANEL VIEW (ROLES CONTROL: OWNER VS BARBER)
// ==========================================================================

let adminSession = {
  authenticated: false,
  role: "owner", // owner, barber
  barberId: null // barber id if role is barber
};

function initAdminPanel() {
  const adminWrapper = document.getElementById("admin-panel");
  const loginModal = document.getElementById("login-modal");

  // Load session from sessionStorage if active
  const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
  if (isAuth) {
    adminSession.authenticated = true;
    adminSession.role = sessionStorage.getItem("admin_role") || "owner";
    adminSession.barberId = sessionStorage.getItem("admin_barber_id") || null;
  }

  // Admin access clicks
  document.querySelectorAll(".btn-admin-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      if (adminSession.authenticated) {
        openAdminPanel();
      } else {
        loginModal.classList.add("open");
        document.getElementById("tab-admin-login").click(); // default tab
      }
    });
  });

  document.getElementById("close-login-modal").addEventListener("click", () => loginModal.classList.remove("open"));

  // Personal Login Modal tabs switching
  const adminTabs = document.querySelectorAll("#login-modal .notif-tab");
  adminTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      adminTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const type = tab.dataset.tab;
      document.getElementById("pane-admin-login").style.display = type === "login" ? "block" : "none";
      document.getElementById("pane-barber-register").style.display = type === "register" ? "block" : "none";
    });
  });

  // Barber Register Form Submission
  const barberRegForm = document.getElementById("barber-register-form");
  if (barberRegForm) {
    barberRegForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-barber-name").value.trim();
      const specialty = document.getElementById("reg-barber-specialty").value.trim();
      const bio = document.getElementById("reg-barber-bio").value.trim();
      const user = document.getElementById("reg-barber-user").value.trim().toLowerCase();
      const pass = document.getElementById("reg-barber-pass").value.trim();
      let image = document.getElementById("reg-barber-image").value.trim();
      const errorBox = document.getElementById("reg-barber-error");

      if (user === "admin" || store.barbers.some(b => b.username === user)) {
        errorBox.textContent = "El nombre de usuario ya está registrado.";
        errorBox.style.display = "block";
        return;
      }

      if (image === "") {
        image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop";
      }

      const newBarber = {
        id: "bar-" + Date.now(),
        name,
        specialty,
        username: user,
        password: pass,
        bio,
        image,
        services: [...DEFAULT_GLOBAL_SERVICES], // Copy default global services
        hours: {...DEFAULT_GLOBAL_HOURS},
        blockedDates: [],
        syncPending: !navigator.onLine
      };

      store.barbers.push(newBarber);
      store.save("barbers");

      barberRegForm.reset();
      errorBox.style.display = "none";

      alert("¡Registro exitoso! Cuenta de barbero creada. Ya puedes iniciar sesión.");
      
      // Switch to login tab and prefill
      document.getElementById("tab-admin-login").click();
      document.getElementById("login-username").value = user;
      document.getElementById("login-password").value = pass;
    });
  }

  // Form submit login
  const loginForm = document.getElementById("admin-login-form");
  const errorMsg = document.getElementById("login-error-msg");
  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("login-username").value.trim();
    const pass = document.getElementById("login-password").value.trim();

    if (user === "admin" && pass === "admin123") {
      // Owner login
      adminSession.authenticated = true;
      adminSession.role = "owner";
      adminSession.barberId = null;

      sessionStorage.setItem("admin_authenticated", "true");
      sessionStorage.setItem("admin_role", "owner");
      sessionStorage.setItem("admin_barber_id", "");

      loginForm.reset();
      errorMsg.style.display = "none";
      loginModal.classList.remove("open");
      openAdminPanel();
    } else {
      // Check if it matches a barber username/password
      const barber = store.barbers.find(b => b.username === user && b.password === pass);
      if (barber) {
        // Barber login
        adminSession.authenticated = true;
        adminSession.role = "barber";
        adminSession.barberId = barber.id;

        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_role", "barber");
        sessionStorage.setItem("admin_barber_id", barber.id);

        loginForm.reset();
        errorMsg.style.display = "none";
        loginModal.classList.remove("open");
        openAdminPanel();
      } else {
        errorMsg.textContent = "Credenciales incorrectas. Inténtalo de nuevo.";
        errorMsg.style.display = "block";
      }
    }
  });

  // Logout
  document.getElementById("btn-admin-logout").addEventListener("click", () => {
    adminSession.authenticated = false;
    adminSession.role = "owner";
    adminSession.barberId = null;

    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_role");
    sessionStorage.removeItem("admin_barber_id");

    adminWrapper.classList.remove("open");
  });

  // Admin menu switching tabs
  const menuButtons = document.querySelectorAll(".admin-sidebar .admin-menu-btn");
  menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      menuButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const targetId = btn.dataset.target;
      switchAdminTab(targetId);
    });
  });

  // Admin Sidebar drawer mobile toggle
  const sidebar = document.querySelector(".admin-sidebar");
  document.querySelector(".admin-sidebar-toggle").addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("open");
  });

  document.body.addEventListener("click", () => sidebar.classList.remove("open"));
  sidebar.addEventListener("click", (e) => e.stopPropagation());

  // Quick link view all
  document.getElementById("dash-view-all-citas").onclick = (e) => {
    e.preventDefault();
    document.querySelector(`.admin-menu-btn[data-target="admin-appointments"]`).click();
  };

  // Filters Citas listeners
  document.getElementById("filter-search-name").addEventListener("input", renderAdminAppointments);
  document.getElementById("filter-barber").addEventListener("change", renderAdminAppointments);
  document.getElementById("filter-status").addEventListener("change", renderAdminAppointments);
  document.getElementById("filter-date").addEventListener("change", renderAdminAppointments);

  // Client search input listener
  const clientSearchInput = document.getElementById("filter-client-search");
  if (clientSearchInput) {
    clientSearchInput.addEventListener("input", renderAdminClients);
  }

  // Barber profile edit form submit listener
  const profileForm = document.getElementById("barber-profile-edit-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (adminSession.role !== "barber") return;

      const name = document.getElementById("prof-name").value.trim();
      const specialty = document.getElementById("prof-specialty").value.trim();
      const bio = document.getElementById("prof-bio").value.trim();
      let image = document.getElementById("prof-image").value.trim();
      const username = document.getElementById("prof-username").value.trim().toLowerCase();
      const pass = document.getElementById("prof-password").value.trim();

      const barber = store.barbers.find(b => b.id === adminSession.barberId);
      if (!barber) return;

      // Check username collision
      if (username === "admin" || store.barbers.some(b => b.username === username && b.id !== barber.id)) {
        alert("El nombre de usuario ya está registrado por otra cuenta.");
        return;
      }

      if (image === "") {
        image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop";
      }

      barber.name = name;
      barber.specialty = specialty;
      barber.bio = bio;
      barber.image = image;
      barber.username = username;
      barber.password = pass;

      store.save("barbers");

      // Update sidebar displays
      document.getElementById("admin-profile-name").textContent = barber.name;
      document.getElementById("admin-profile-sub").textContent = barber.specialty;

      alert("¡Perfil actualizado con éxito!");
      renderTeam(); // update landing page team
    });
  }

  // Forms Barber / Services CRUD
  document.getElementById("admin-barber-form").addEventListener("submit", submitBarberForm);
  document.getElementById("btn-cancel-barber-edit").addEventListener("click", resetBarberForm);

  document.getElementById("admin-service-form").addEventListener("submit", submitServiceForm);
  document.getElementById("btn-cancel-service-edit").addEventListener("click", resetServiceForm);

  document.getElementById("config-hours-form").addEventListener("submit", submitHoursForm);
  document.getElementById("config-block-date-form").addEventListener("submit", submitBlockDateForm);
}

function openAdminPanel() {
  document.getElementById("admin-panel").classList.add("open");
  
  // Set date in header
  const todayStr = formatSpanishDate(new Date().toISOString().split('T')[0]);
  document.getElementById("admin-current-date-indicator").textContent = todayStr;

  // Apply Role restriction layout shifts
  const isOwner = adminSession.role === "owner";
  
  // Sidebar options visible/hidden
  document.getElementById("menu-item-barbers").style.display = isOwner ? "block" : "none";
  document.getElementById("menu-item-clients").style.display = isOwner ? "block" : "none";
  document.getElementById("menu-item-profile").style.display = !isOwner ? "block" : "none";
  document.getElementById("admin-role-badge").textContent = isOwner ? "Dueño Panel" : "Barbero Panel";

  // Profile names in sidebar
  if (isOwner) {
    document.getElementById("admin-profile-name").textContent = "Dueño Principal";
    document.getElementById("admin-profile-sub").textContent = "Acceso Absoluto";
  } else {
    const barber = store.barbers.find(b => b.id === adminSession.barberId);
    document.getElementById("admin-profile-name").textContent = barber ? barber.name : "Barbero";
    document.getElementById("admin-profile-sub").textContent = barber ? barber.specialty : "Especialista";
  }

  // Dashboard performance list (Owner only)
  document.getElementById("dash-card-performance-wrapper").style.display = isOwner ? "block" : "none";
  
  // Citas Page Barber Filter option
  document.getElementById("filter-barber-group").style.display = isOwner ? "block" : "none";
  
  // Services associated barber select (Owner only can select which barber gets the service)
  document.getElementById("service-owner-barber-select-group").style.display = isOwner ? "block" : "none";

  // Layout text adjustments
  document.getElementById("stat-revenue-label").textContent = isOwner ? "Ingresos Totales (Hoy)" : "Mis Ingresos (Hoy)";
  document.getElementById("dashboard-citas-titulo").textContent = isOwner ? "Próximas Citas Generales" : "Mis Citas de Hoy/Mañana";
  document.getElementById("appointments-list-title").textContent = isOwner ? "Todas las Citas Agendadas" : "Mi Agenda de Citas";
  
  document.getElementById("admin-services-list-title").textContent = isOwner ? "Catálogo General de Servicios" : "Mis Servicios Ofrecidos";
  document.getElementById("service-form-title").textContent = isOwner ? "Registrar Servicio a Barbero" : "Agregar mi Servicio";

  document.getElementById("config-hours-title").textContent = isOwner ? "Horarios Base Local" : "Mi Horario Semanal";
  document.getElementById("config-hours-desc").textContent = isOwner 
    ? "Configura el horario de apertura base de la barbería." 
    : "Ajusta las horas en las que los clientes pueden agendar citas contigo.";

  document.getElementById("config-block-title").textContent = isOwner ? "Bloqueos Generales Local" : "Mis Días de Vacaciones";
  document.getElementById("config-block-desc").textContent = isOwner
    ? "Registra feriados locales o mantenciones generales para cerrar el local."
    : "Bloquea días específicos de tu calendario para vacaciones o descanso personal.";

  // Sync state data on opening
  renderAdminDashboard();
  renderAdminAppointments();
  renderAdminBarbersTab();
  renderAdminServicesTab();
  renderAdminConfigTab();
  renderAdminClients();
  renderAdminProfileTab();
  
  // Go to Dashboard
  document.querySelector(`.admin-menu-btn[data-target="admin-dashboard"]`).click();
}

function switchAdminTab(tabId) {
  activeAdminTab = tabId;
  document.querySelectorAll(".admin-tab-section").forEach(s => s.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");

  const titles = {
    "admin-dashboard": "Estadísticas del Local",
    "admin-appointments": "Agenda de Reservas",
    "admin-barbers": "Administración del Personal",
    "admin-services": "Catálogo de Servicios y Precios",
    "admin-config": "Ajustes de Horarios y Vacaciones",
    "admin-clients": "Clientes Registrados",
    "admin-profile": "Editar mi Perfil"
  };
  document.getElementById("admin-view-title").textContent = titles[tabId] || "Panel Admin";
}

// ==================== SUB-TAB: DASHBOARD LOGIC ====================
function renderAdminDashboard() {
  const todayStr = new Date().toISOString().split('T')[0];
  const isOwner = adminSession.role === "owner";

  // Filter appointments for stats calculation
  let appts = store.bookings;
  if (!isOwner) {
    // Barber sees only his own
    appts = appts.filter(b => b.barberId === adminSession.barberId);
  }

  const todayBookings = appts.filter(b => b.date === todayStr);

  // Stats cards values
  const totalToday = todayBookings.length;
  const pendingCount = appts.filter(b => b.status === "Pendiente").length;
  const reviewsTotal = store.reviews.length;
  const revenueToday = todayBookings
    .filter(b => b.status === "Atendida" || b.status === "Pendiente")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  document.getElementById("stat-today-count").textContent = totalToday;
  document.getElementById("stat-today-revenue").textContent = `$${revenueToday.toLocaleString("es-CL")}`;
  document.getElementById("stat-pending-count").textContent = pendingCount;
  document.getElementById("stat-reviews-count").textContent = reviewsTotal;

  // Render Table
  const tbody = document.getElementById("dash-recent-appointments-tbody");
  tbody.innerHTML = "";

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const recent = appts
    .filter(b => b.date === todayStr || b.date === tomorrowStr)
    .sort((a, b) => (a.date + 'T' + a.time).localeCompare(b.date + 'T' + b.time));

  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="color:var(--color-gray-medium)">No hay citas para hoy ni mañana.</td></tr>`;
  } else {
    recent.slice(0, 5).forEach(b => {
      const barberObj = store.barbers.find(bar => bar.id === b.barberId);
      const barberName = barberObj ? barberObj.name : "Sin asignar";
      
      const srvsText = b.services.map(id => {
        const s = barberObj ? barberObj.services.find(x => x.id === id) : null;
        return s ? s.name : "";
      }).join(", ");

      const statusBadge = getStatusBadgeHTML(b.status);
      const actionButtons = getActionsRowHTML(b.id, b.customerPhone, b.customerName);
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${b.customerName}</strong></td>
        <td>${barberName}</td>
        <td>${b.date === todayStr ? 'Hoy' : 'Mañana'} a las ${b.time}</td>
        <td><span style="font-size:0.8rem; color:var(--color-gray-medium);" title="${srvsText}">${srvsText.length > 28 ? srvsText.substring(0, 25) + '...' : srvsText}</span></td>
        <td><strong>$${b.totalPrice.toLocaleString("es-CL")}</strong></td>
        <td>${statusBadge}</td>
        <td>${actionButtons}</td>
      `;
      tbody.appendChild(tr);
    });
    
    setupDashboardTableActions(tbody);
  }

  // Render Barbers performance lists (Owner only)
  if (isOwner) {
    const performanceContainer = document.getElementById("dash-barbers-performance-list");
    performanceContainer.innerHTML = "";

    store.barbers.forEach(bar => {
      const barJobs = store.bookings.filter(b => b.barberId === bar.id);
      const completedJobsCount = barJobs.filter(b => b.status === "Atendida").length;
      const totalSales = barJobs.filter(b => b.status === "Atendida").reduce((sum, b) => sum + b.totalPrice, 0);

      const perfItem = document.createElement("div");
      perfItem.className = "barber-perf-item";
      perfItem.innerHTML = `
        <div class="barber-perf-info">
          <div class="barber-perf-avatar"><img src="${bar.image}"></div>
          <div class="barber-perf-details">
            <h5>${bar.name}</h5>
            <p>${bar.specialty}</p>
          </div>
        </div>
        <div class="barber-perf-stats">
          <div class="barber-perf-sales">$${totalSales.toLocaleString("es-CL")}</div>
          <div class="barber-perf-jobs">${completedJobsCount} corte${completedJobsCount !== 1 ? 's' : ''}</div>
        </div>
      `;
      performanceContainer.appendChild(perfItem);
    });
  }
}

function getActionsRowHTML(bookingId, phone, name) {
  // Escaping single quotes in client names
  const escapedName = name.replace(/'/g, "\\'");
  
  return `
    <div class="table-actions-row">
      <button class="action-icon-btn btn-check-success admin-complete-booking" data-id="${bookingId}" title="Marcar Atendida"><i class="fa-solid fa-check"></i></button>
      <button class="action-icon-btn btn-noshow-warning admin-noshow-booking" data-id="${bookingId}" title="Marcar Ausente"><i class="fa-solid fa-user-slash"></i></button>
      <button class="action-icon-btn btn-cancel-danger admin-cancel-booking" data-id="${bookingId}" title="Cancelar"><i class="fa-solid fa-xmark"></i></button>
      <button class="action-icon-btn btn-edit-info admin-edit-booking" data-id="${bookingId}" title="Reprogramar"><i class="fa-solid fa-calendar-days"></i></button>
      <button class="action-icon-btn admin-call-client" style="background-color:rgba(212,175,55,0.1); color:var(--color-gold); border:1px solid var(--color-gold-light);" onclick="startVoipCall('${escapedName}', '${phone}')" title="Llamar por Web"><i class="fa-solid fa-phone-volume"></i></button>
    </div>
  `;
}

function setupDashboardTableActions(tbodyElement) {
  tbodyElement.querySelectorAll(".admin-complete-booking").forEach(btn => {
    btn.onclick = () => updateBookingStatus(btn.dataset.id, "Atendida");
  });
  tbodyElement.querySelectorAll(".admin-noshow-booking").forEach(btn => {
    btn.onclick = () => updateBookingStatus(btn.dataset.id, "Ausente");
  });
  tbodyElement.querySelectorAll(".admin-cancel-booking").forEach(btn => {
    btn.onclick = () => updateBookingStatus(btn.dataset.id, "Cancelada");
  });
  tbodyElement.querySelectorAll(".admin-edit-booking").forEach(btn => {
    btn.onclick = () => openManageBookingModal(btn.dataset.id);
  });
}

function updateBookingStatus(bookingId, newStatus) {
  const b = store.bookings.find(x => x.id === bookingId);
  if (b) {
    b.status = newStatus;
    b.syncPending = !navigator.onLine; // tag for offline sync
    store.save("bookings");
    updateSyncBadges();
    renderAdminDashboard();
    renderAdminAppointments();
  }
}

// ==================== SUB-TAB: CITAS LIST LOGIC ====================
function renderAdminAppointments() {
  const tbody = document.getElementById("admin-appointments-tbody");
  tbody.innerHTML = "";

  const isOwner = adminSession.role === "owner";

  // Populate filter dropdown
  const barberFilterSelect = document.getElementById("filter-barber");
  const currentVal = barberFilterSelect.value;
  barberFilterSelect.innerHTML = `<option value="all">Todos</option>`;
  store.barbers.forEach(bar => {
    barberFilterSelect.innerHTML += `<option value="${bar.id}">${bar.name}</option>`;
  });
  barberFilterSelect.value = currentVal || "all";

  // Filter parameters
  const searchName = document.getElementById("filter-search-name").value.trim().toLowerCase();
  const filterBarber = isOwner ? barberFilterSelect.value : adminSession.barberId;
  const filterStatus = document.getElementById("filter-status").value;
  const filterDateType = document.getElementById("filter-date").value;

  let filtered = store.bookings;

  // Role restriction
  if (!isOwner) {
    filtered = filtered.filter(b => b.barberId === adminSession.barberId);
  } else {
    // Barber selector filter (only for owner)
    if (filterBarber !== "all") {
      filtered = filtered.filter(b => b.barberId === filterBarber);
    }
  }

  // Name/Phone/ID Search
  if (searchName !== "") {
    filtered = filtered.filter(b => 
      b.customerName.toLowerCase().includes(searchName) || 
      b.customerPhone.includes(searchName) || 
      b.customerEmail.toLowerCase().includes(searchName) || 
      b.id.toLowerCase().includes(searchName)
    );
  }

  // Status Filter
  if (filterStatus !== "all") {
    filtered = filtered.filter(b => b.status === filterStatus);
  }

  // Date filters
  const todayStr = new Date().toISOString().split('T')[0];
  if (filterDateType === "today") {
    filtered = filtered.filter(b => b.date === todayStr);
  } else if (filterDateType === "week") {
    const today = new Date();
    const currentDay = today.getDay();
    const startWeek = new Date(today);
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    startWeek.setDate(diff);
    startWeek.setHours(0,0,0,0);
    const endWeek = new Date(startWeek);
    endWeek.setDate(startWeek.getDate() + 6);
    endWeek.setHours(23,59,59,999);

    filtered = filtered.filter(b => {
      const bDate = new Date(b.date + 'T00:00:00');
      return (bDate >= startWeek && bDate <= endWeek);
    });
  } else if (filterDateType === "month") {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    filtered = filtered.filter(b => {
      const bDate = new Date(b.date + 'T00:00:00');
      return (bDate.getMonth() === currentMonth && bDate.getFullYear() === currentYear);
    });
  }

  // Sort
  filtered.sort((a, b) => (b.date + 'T' + b.time).localeCompare(a.date + 'T' + a.time));

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center" style="color:var(--color-gray-medium)">No se encontraron citas.</td></tr>`;
    document.getElementById("appointments-pagination-info").innerHTML = `<span>Total: 0 citas</span>`;
    return;
  }

  filtered.forEach(b => {
    const barber = store.barbers.find(bar => bar.id === b.barberId);
    const barberName = barber ? barber.name : "Sin asignar";
    
    const srvsNames = b.services.map(id => {
      const srvObj = barber ? barber.services.find(s => s.id === id) : null;
      return srvObj ? srvObj.name : "";
    }).join(", ");

    const statusBadge = getStatusBadgeHTML(b.status);
    const actionRow = getActionsRowHTML(b.id, b.customerPhone, b.customerName);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="text-gold" style="font-weight:700">${b.id}</span></td>
      <td><strong>${b.customerName}</strong></td>
      <td>
        <div style="font-size:0.85rem">${b.customerPhone}</div>
        <div style="font-size:0.75rem; color:var(--color-gray-medium)">${b.customerEmail}</div>
      </td>
      <td><span style="font-size:0.8rem; color:var(--color-gray-medium)" title="${srvsNames}">${srvsNames.length > 30 ? srvsNames.substring(0, 28) + '...' : srvsNames}</span></td>
      <td class="col-barber-value">${barberName}</td>
      <td>
        <div><strong>${formatSpanishDate(b.date)}</strong></div>
        <div style="font-size:0.8rem; color:var(--color-gray-medium)"><i class="fa-regular fa-clock text-gold"></i> ${b.time} Hrs</div>
      </td>
      <td><strong>$${b.totalPrice.toLocaleString("es-CL")}</strong></td>
      <td>${statusBadge}</td>
      <td>${actionRow}</td>
    `;

    // Hide barber column if not Owner
    if (!isOwner) {
      tr.querySelector(".col-barber-value").style.display = "none";
    }

    tbody.appendChild(tr);
  });

  // Hide header column if not Owner
  document.querySelector(".col-barber-header").style.display = isOwner ? "table-cell" : "none";

  setupDashboardTableActions(tbody);
  document.getElementById("appointments-pagination-info").innerHTML = `<span>Mostrando ${filtered.length} registro(s) de citas</span>`;
}

// ==================== SUB-TAB: BARBERS EDIT (OWNER ONLY) ====================
function renderAdminBarbersTab() {
  const container = document.getElementById("admin-barbers-list-container");
  container.innerHTML = "";

  store.barbers.forEach(bar => {
    const div = document.createElement("div");
    div.className = "admin-list-item";
    div.innerHTML = `
      <div class="item-left-details">
        <div class="item-circle-icon avatar-img"><img src="${bar.image}"></div>
        <div class="item-text-info">
          <h4>${bar.name}</h4>
          <p>Especialista en ${bar.specialty} | Usuario: <strong>${bar.username}</strong></p>
        </div>
      </div>
      <div class="item-right-actions">
        <button class="action-icon-btn btn-edit-info edit-barber-btn" data-id="${bar.id}" title="Editar Datos"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="action-icon-btn btn-cancel-danger delete-barber-btn" data-id="${bar.id}" title="Eliminar del Equipo"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    `;

    div.querySelector(".edit-barber-btn").onclick = () => editBarber(bar.id);
    div.querySelector(".delete-barber-btn").onclick = () => deleteBarber(bar.id);

    container.appendChild(div);
  });
}

function submitBarberForm(e) {
  e.preventDefault();
  const editId = document.getElementById("barber-edit-id").value;
  const name = document.getElementById("barber-name-input").value.trim();
  const specialty = document.getElementById("barber-specialty-input").value.trim();
  const username = document.getElementById("barber-username-input").value.trim().toLowerCase();
  const pass = document.getElementById("barber-password-input").value.trim();
  const bio = document.getElementById("barber-bio-input").value.trim();
  let image = document.getElementById("barber-image-input").value.trim();

  if (image === "") {
    image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop";
  }

  // Check username collision
  const collide = store.barbers.some(b => b.username === username && b.id !== editId);
  if (username === "admin" || collide) {
    alert("Este nombre de usuario administrativo ya está en uso.");
    return;
  }

  if (editId !== "") {
    const bar = store.barbers.find(b => b.id === editId);
    if (bar) {
      bar.name = name;
      bar.specialty = specialty;
      bar.username = username;
      bar.password = pass;
      bar.bio = bio;
      bar.image = image;
    }
  } else {
    // Add new barber
    const newBar = {
      id: "bar-" + Date.now(),
      name,
      specialty,
      username,
      password: pass,
      bio,
      image,
      services: [...DEFAULT_GLOBAL_SERVICES], // Copy global services as templates
      hours: {...DEFAULT_GLOBAL_HOURS},
      blockedDates: []
    };
    store.barbers.push(newBar);
  }

  store.save("barbers");
  resetBarberForm();
  renderAdminBarbersTab();
  renderTeam(); // Refresh landing team
}

function editBarber(id) {
  const bar = store.barbers.find(b => b.id === id);
  if (!bar) return;

  document.getElementById("barber-form-title").textContent = "Editar Barbero";
  document.getElementById("barber-edit-id").value = bar.id;
  document.getElementById("barber-name-input").value = bar.name;
  document.getElementById("barber-specialty-input").value = bar.specialty;
  document.getElementById("barber-username-input").value = bar.username;
  document.getElementById("barber-password-input").value = bar.password;
  document.getElementById("barber-bio-input").value = bar.bio;
  document.getElementById("barber-image-input").value = bar.image;
  
  document.getElementById("btn-cancel-barber-edit").style.display = "inline-flex";
  document.getElementById("btn-submit-barber").textContent = "Guardar Cambios";
}

function deleteBarber(id) {
  if (store.barbers.length <= 1) {
    alert("Debe haber al menos un barbero en la barbería.");
    return;
  }
  
  if (confirm("¿Deseas eliminar a este barbero del equipo?")) {
    store.barbers = store.barbers.filter(b => b.id !== id);
    store.save("barbers");
    renderAdminBarbersTab();
    renderTeam();
  }
}

function resetBarberForm() {
  document.getElementById("barber-form-title").textContent = "Agregar Nuevo Barbero";
  document.getElementById("barber-edit-id").value = "";
  document.getElementById("admin-barber-form").reset();
  document.getElementById("btn-cancel-barber-edit").style.display = "none";
  document.getElementById("btn-submit-barber").textContent = "Registrar Barbero";
}

// ==================== SUB-TAB: SERVICES CATALOG EDIT ====================
function renderAdminServicesTab() {
  const container = document.getElementById("admin-services-list-container");
  container.innerHTML = "";

  const isOwner = adminSession.role === "owner";

  // Populate Owner Barber selector
  if (isOwner) {
    const ownerSrvSelect = document.getElementById("service-barber-owner-select");
    const currentSelVal = ownerSrvSelect.value;
    ownerSrvSelect.innerHTML = "";
    store.barbers.forEach(bar => {
      ownerSrvSelect.innerHTML += `<option value="${bar.id}">${bar.name}</option>`;
    });
    // Set first barber by default or restore
    ownerSrvSelect.value = currentSelVal || store.barbers[0].id;

    // Listen to changes in selector to redraw services
    ownerSrvSelect.onchange = () => renderAdminServicesTab();
  }

  // Determine whose services to display
  let barberTargetId = isOwner 
    ? document.getElementById("service-barber-owner-select").value 
    : adminSession.barberId;

  const targetBarber = store.barbers.find(b => b.id === barberTargetId);
  if (!targetBarber) return;

  if (targetBarber.services.length === 0) {
    container.innerHTML = `<div class="no-date-selected">Este barbero aún no tiene servicios agregados.</div>`;
    return;
  }

  targetBarber.services.forEach(srv => {
    const div = document.createElement("div");
    div.className = "admin-list-item";
    div.innerHTML = `
      <div class="item-left-details">
        <div class="item-circle-icon"><i class="fa-solid fa-scissors"></i></div>
        <div class="item-text-info">
          <h4>${srv.name}</h4>
          <p>Cat: ${srv.category.toUpperCase()} | Duración: ${srv.duration} min</p>
        </div>
      </div>
      <div class="item-right-actions" style="align-items:center; gap: 15px;">
        <span class="text-gold" style="font-weight:700;">$${srv.price.toLocaleString("es-CL")}</span>
        <div style="display:flex; gap: 8px;">
          <button class="action-icon-btn btn-edit-info edit-service-btn" data-id="${srv.id}"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="action-icon-btn btn-cancel-danger delete-service-btn" data-id="${srv.id}"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    `;

    div.querySelector(".edit-service-btn").onclick = () => editService(srv.id, targetBarber.id);
    div.querySelector(".delete-service-btn").onclick = () => deleteService(srv.id, targetBarber.id);

    container.appendChild(div);
  });
}

function submitServiceForm(e) {
  e.preventDefault();
  const editId = document.getElementById("service-edit-id").value;
  const name = document.getElementById("service-name-input").value.trim();
  const category = document.getElementById("service-category-input").value;
  const price = parseInt(document.getElementById("service-price-input").value);
  const duration = parseInt(document.getElementById("service-duration-input").value);
  const desc = document.getElementById("service-desc-input").value.trim();

  const isOwner = adminSession.role === "owner";
  const targetBarberId = isOwner 
    ? document.getElementById("service-barber-owner-select").value 
    : adminSession.barberId;

  const targetBarber = store.barbers.find(b => b.id === targetBarberId);
  if (!targetBarber) return;

  if (editId !== "") {
    // Edit
    const srv = targetBarber.services.find(s => s.id === editId);
    if (srv) {
      srv.name = name;
      srv.category = category;
      srv.price = price;
      srv.duration = duration;
      srv.desc = desc;
    }
  } else {
    // Add new
    const newSrv = {
      id: "srv-custom-" + Date.now(),
      name,
      category,
      price,
      duration,
      desc
    };
    targetBarber.services.push(newSrv);
  }

  store.save("barbers");
  resetServiceForm();
  renderAdminServicesTab();
  
  // Refresh landing
  renderLandingShowcase();
}

function editService(id, barberId) {
  const barber = store.barbers.find(b => b.id === barberId);
  if (!barber) return;

  const srv = barber.services.find(s => s.id === id);
  if (!srv) return;

  const isOwner = adminSession.role === "owner";
  document.getElementById("service-form-title").textContent = isOwner ? "Editar Servicio de Barbero" : "Editar mi Servicio";
  document.getElementById("service-edit-id").value = srv.id;
  document.getElementById("service-name-input").value = srv.name;
  document.getElementById("service-category-input").value = srv.category;
  document.getElementById("service-price-input").value = srv.price;
  document.getElementById("service-duration-input").value = srv.duration;
  document.getElementById("service-desc-input").value = srv.desc;

  document.getElementById("btn-cancel-service-edit").style.display = "inline-flex";
  document.getElementById("btn-submit-service").textContent = "Guardar Cambios";
}

function deleteService(id, barberId) {
  const barber = store.barbers.find(b => b.id === barberId);
  if (!barber) return;

  if (barber.services.length <= 1) {
    alert("Cada barbero debe tener al menos un servicio registrado en su perfil.");
    return;
  }

  if (confirm("¿Estás seguro de que deseas eliminar este servicio del catálogo del barbero?")) {
    barber.services = barber.services.filter(s => s.id !== id);
    store.save("barbers");
    renderAdminServicesTab();
    renderLandingShowcase();
  }
}

function resetServiceForm() {
  const isOwner = adminSession.role === "owner";
  document.getElementById("service-form-title").textContent = isOwner ? "Registrar Servicio a Barbero" : "Agregar mi Servicio";
  document.getElementById("service-edit-id").value = "";
  document.getElementById("admin-service-form").reset();
  document.getElementById("btn-cancel-service-edit").style.display = "none";
  document.getElementById("btn-submit-service").textContent = "Guardar Servicio";
}

// ==================== SUB-TAB: GENERAL CONFIG & VACATIONS LOGIC ====================
function renderAdminConfigTab() {
  const isOwner = adminSession.role === "owner";
  
  // Determine hours configuration to render
  let targetHours = store.globalHours;
  let targetBlocked = store.globalBlockedDates;
  
  if (!isOwner) {
    const barber = store.barbers.find(b => b.id === adminSession.barberId);
    if (barber) {
      targetHours = barber.hours;
      targetBlocked = barber.blockedDates;
    }
  }

  // Render Hours List
  const container = document.getElementById("config-hours-days-container");
  container.innerHTML = "";
  const order = [1, 2, 3, 4, 5, 6, 0];

  order.forEach(dayIndex => {
    // Label day names
    const names = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const conf = targetHours[dayIndex] || { isWorking: false, openTime: "10:00", closeTime: "20:00" };

    const div = document.createElement("div");
    div.className = "hour-row";
    div.innerHTML = `
      <span class="hour-day-label">${names[dayIndex]}</span>
      <div class="hour-switch-wrapper">
        <input type="checkbox" id="work-day-${dayIndex}" class="switch-input" ${conf.isWorking ? 'checked' : ''}>
        <label for="work-day-${dayIndex}" class="switch-label"></label>
      </div>
      <select id="open-time-${dayIndex}" class="hour-select-input" ${!conf.isWorking ? 'disabled' : ''}>
        ${generateHourOptions(conf.openTime)}
      </select>
      <select id="close-time-${dayIndex}" class="hour-select-input" ${!conf.isWorking ? 'disabled' : ''}>
        ${generateHourOptions(conf.closeTime)}
      </select>
    `;

    const switchCheckbox = div.querySelector(`#work-day-${dayIndex}`);
    const openSelect = div.querySelector(`#open-time-${dayIndex}`);
    const closeSelect = div.querySelector(`#close-time-${dayIndex}`);

    switchCheckbox.addEventListener("change", () => {
      openSelect.disabled = !switchCheckbox.checked;
      closeSelect.disabled = !switchCheckbox.checked;
    });

    container.appendChild(div);
  });

  // Render Blocked Dates List
  const holidaysTbody = document.getElementById("config-blocked-dates-tbody");
  holidaysTbody.innerHTML = "";

  const activeBlocked = [...targetBlocked].sort((a,b) => a.date.localeCompare(b.date));

  if (activeBlocked.length === 0) {
    holidaysTbody.innerHTML = `<tr><td colspan="3" class="text-center" style="color:var(--color-gray-medium)">No hay fechas bloqueadas.</td></tr>`;
  } else {
    activeBlocked.forEach(holiday => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${formatSpanishDate(holiday.date)}</strong></td>
        <td>${holiday.reason}</td>
        <td>
          <button class="action-icon-btn btn-cancel-danger unblock-date-btn" data-date="${holiday.date}"><i class="fa-regular fa-trash-can"></i></button>
        </td>
      `;
      tr.querySelector(".unblock-date-btn").onclick = () => unblockConfigDate(holiday.date);
      holidaysTbody.appendChild(tr);
    });
  }
}

function generateHourOptions(selectedVal) {
  let options = "";
  for (let h = 7; h <= 22; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      options += `<option value="${time}" ${time === selectedVal ? 'selected' : ''}>${time} Hrs</option>`;
    }
  }
  return options;
}

function submitHoursForm(e) {
  e.preventDefault();
  
  const isOwner = adminSession.role === "owner";
  let targetHours = store.globalHours;
  
  if (!isOwner) {
    const barber = store.barbers.find(b => b.id === adminSession.barberId);
    if (barber) targetHours = barber.hours;
  }

  for (let dayIndex in targetHours) {
    const isWorking = document.getElementById(`work-day-${dayIndex}`).checked;
    const openTime = document.getElementById(`open-time-${dayIndex}`).value;
    const closeTime = document.getElementById(`close-time-${dayIndex}`).value;

    if (isWorking && openTime >= closeTime) {
      alert("La hora de apertura debe ser menor a la hora de cierre.");
      return;
    }

    targetHours[dayIndex].isWorking = isWorking;
    targetHours[dayIndex].openTime = openTime;
    targetHours[dayIndex].closeTime = closeTime;
  }

  if (isOwner) {
    store.save("globalHours");
  } else {
    store.save("barbers");
  }

  alert("Horarios de atención guardados.");
  renderAdminConfigTab();
}

function submitBlockDateForm(e) {
  e.preventDefault();
  const date = document.getElementById("block-date-input").value;
  const reason = document.getElementById("block-reason-input").value.trim();

  const isOwner = adminSession.role === "owner";
  let targetBlocked = store.globalBlockedDates;

  if (!isOwner) {
    const barber = store.barbers.find(b => b.id === adminSession.barberId);
    if (barber) targetBlocked = barber.blockedDates;
  }

  if (targetBlocked.some(h => h.date === date)) {
    alert("Esta fecha ya se encuentra bloqueada.");
    return;
  }

  targetBlocked.push({ date, reason });
  
  if (isOwner) {
    store.save("globalBlockedDates");
  } else {
    store.save("barbers");
  }
  
  document.getElementById("config-block-date-form").reset();
  renderAdminConfigTab();
  alert("Fecha bloqueada con éxito.");
}

function unblockConfigDate(dateStr) {
  if (confirm(`¿Deseas desbloquear el día ${formatSpanishDate(dateStr)}?`)) {
    const isOwner = adminSession.role === "owner";
    
    if (isOwner) {
      store.globalBlockedDates = store.globalBlockedDates.filter(h => h.date !== dateStr);
      store.save("globalBlockedDates");
    } else {
      const barber = store.barbers.find(b => b.id === adminSession.barberId);
      if (barber) {
        barber.blockedDates = barber.blockedDates.filter(h => h.date !== dateStr);
        store.save("barbers");
      }
    }
    
    renderAdminConfigTab();
  }
}

// ==========================================================================
// TRANSLATION HELPER UTILITIES
// ==========================================================================

function formatSpanishDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;

  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return `${days[dateObj.getDay()]} ${parts[2]} de ${months[dateObj.getMonth()]}`;
}

// ==========================================================================
// CLIENTS LIST TAB LOGIC (OWNER ONLY)
// ==========================================================================

function renderAdminClients() {
  const tbody = document.getElementById("admin-clients-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const searchVal = document.getElementById("filter-client-search").value.trim().toLowerCase();

  let filteredClients = store.clients;

  if (searchVal !== "") {
    filteredClients = filteredClients.filter(c => 
      c.name.toLowerCase().includes(searchVal) || 
      c.phone.includes(searchVal) || 
      c.email.toLowerCase().includes(searchVal)
    );
  }

  if (filteredClients.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="color:var(--color-gray-medium)">No se encontraron clientes registrados.</td></tr>`;
    return;
  }

  filteredClients.forEach(c => {
    // Calculate spent and total appointments count
    const clientBookings = store.bookings.filter(b => b.clientId === c.id || b.customerEmail.toLowerCase() === c.email.toLowerCase());
    const totalBookingsCount = clientBookings.length;
    const totalSpent = clientBookings
      .filter(b => b.status === "Atendida")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="text-gold" style="font-weight:700;">${c.id}</span></td>
      <td><strong>${c.name}</strong></td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>${totalBookingsCount} cita${totalBookingsCount !== 1 ? 's' : ''}</td>
      <td><strong>$${totalSpent.toLocaleString("es-CL")}</strong></td>
      <td>
        <button class="action-icon-btn btn-cancel-danger delete-client-btn" data-id="${c.id}" title="Eliminar Cliente"><i class="fa-regular fa-trash-can"></i></button>
      </td>
    `;

    tr.querySelector(".delete-client-btn").onclick = () => {
      if (confirm(`¿Estás seguro de que deseas eliminar la cuenta del cliente ${c.name}?`)) {
        store.clients = store.clients.filter(client => client.id !== c.id);
        store.save("clients");
        renderAdminClients();
      }
    };

    tbody.appendChild(tr);
  });
}

// ==========================================================================
// BARBER PROFILE EDIT LOGIC (BARBERS ONLY)
// ==========================================================================

function renderAdminProfileTab() {
  if (adminSession.role !== "barber") return;
  const barber = store.barbers.find(b => b.id === adminSession.barberId);
  if (!barber) return;

  document.getElementById("prof-name").value = barber.name;
  document.getElementById("prof-specialty").value = barber.specialty;
  document.getElementById("prof-bio").value = barber.bio;
  document.getElementById("prof-image").value = barber.image === "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" ? "" : barber.image;
  document.getElementById("prof-username").value = barber.username;
  document.getElementById("prof-password").value = barber.password;
}
