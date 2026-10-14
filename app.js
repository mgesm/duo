import { getRestaurants, saveRestaurant, removeRestaurant } from './restaurants.js';
import { getUserLocation, findClosestBranch, getMysteryNavigationUrl } from './geo.js';
import { sound } from './sound.js';

// Estado global de la aplicación
const state = {
  screen: 'home', // 'home' | 'player1' | 'handover' | 'player2' | 'matching' | 'result' | 'no_match'
  player1Name: localStorage.getItem('donde_comemos_p1_name') || 'Jugador 1',
  player2Name: localStorage.getItem('donde_comemos_p2_name') || 'Jugador 2',
  player1Selections: new Set(),
  player2Selections: new Set(),
  player1Veto: null,
  player2Veto: null,
  player1Superlike: null,
  player2Superlike: null,
  avoidLastWinner: localStorage.getItem('donde_comemos_avoid_last') === 'true',
  lastWinnerId: localStorage.getItem('donde_comemos_last_winner_id') || null,
  lastWinnerName: localStorage.getItem('donde_comemos_last_winner_name') || null,
  clueIndex: 0,
  restaurants: [],
  selectedCategory: 'all',
  winningRestaurant: null,
  winningBranch: null,
  userCoords: null,
  isNameRevealed: false,
  matchesCount: 0,
  roundAttempt: 1, // Contador de intentos para la regla de desempate en segunda ronda
  tieBreakerUser: null // Indica si el ganador vino de desempate
};

const app = document.getElementById('app');
const toastEl = document.getElementById('toast');
const modalContainer = document.getElementById('modal-container');

function showToast(message, duration = 2500) {
  if (!toastEl) return;
  toastEl.innerHTML = `
    <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span>${message}</span>
  `;
  toastEl.classList.remove('opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toastEl.classList.add('opacity-0', 'pointer-events-none');
  }, duration);
}

// Iniciar aplicación
export function init() {
  state.restaurants = getRestaurants();
  render();
}

// Enrutador de pantallas
function render() {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (state.screen) {
    case 'home':
      renderHomeScreen();
      break;
    case 'player1':
      renderPlayerScreen(1);
      break;
    case 'handover':
      renderHandoverScreen();
      break;
    case 'player2':
      renderPlayerScreen(2);
      break;
    case 'matching':
      renderMatchingScreen();
      break;
    case 'result':
      renderResultScreen();
      break;
    case 'no_match':
      renderNoMatchScreen();
      break;
    default:
      renderHomeScreen();
  }
}

// ==========================================
// 1. PANTALLA DE INICIO (HOME) - APPLE HIG
// ==========================================
function renderHomeScreen() {
  app.innerHTML = `
    <div class="mobile-shell px-6 justify-between animate-ios-pop">
      <!-- Encabezado con estética Apple / Dynamic Island -->
      <div class="pt-6 text-center flex flex-col items-center">
        <!-- Dynamic Island Capsule -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-xl text-[12px] font-semibold text-neutral-300 mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Cartagena & Murcia</span>
        </div>

        <!-- App Icon Squircle con Liquid Glass Specular -->
        <div class="w-20 h-20 rounded-[24px] bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-500 p-0.5 shadow-2xl shadow-rose-500/25 mb-5 flex items-center justify-center">
          <div class="w-full h-full bg-black/40 backdrop-blur-md rounded-[22px] flex items-center justify-center border border-white/20">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 9v4l3 3"/>
            </svg>
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          ¿Dónde comemos?
        </h1>
        <p class="text-neutral-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
          Decisión en secreto a dos turnos. Elegid en tarjetas 2x2 y el mapa os llevará a ciegas sin desvelar el sitio.
        </p>
      </div>

      <!-- Inset Grouped Card: Nombres de los comensales -->
      <div class="ios-glass p-5 rounded-[26px] my-5 space-y-3.5">
        <div class="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
          Comensales
        </div>
        
        <div class="space-y-2.5">
          <div class="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-2xl px-3.5 py-2.5 transition focus-within:border-rose-500/70">
            <span class="w-7 h-7 rounded-xl bg-rose-500/20 text-[#FF2D55] flex items-center justify-center font-bold text-xs border border-rose-500/30">1</span>
            <input 
              id="input-p1" 
              type="text" 
              value="${state.player1Name}" 
              placeholder="Nombre Persona 1"
              class="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <div class="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-2xl px-3.5 py-2.5 transition focus-within:border-indigo-500/70">
            <span class="w-7 h-7 rounded-xl bg-indigo-500/20 text-[#5E5CE6] flex items-center justify-center font-bold text-xs border border-indigo-500/30">2</span>
            <input 
              id="input-p2" 
              type="text" 
              value="${state.player2Name}" 
              placeholder="Nombre Persona 2"
              class="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Acciones principales -->
      <div class="space-y-3 pb-4">
        <button 
          id="btn-start" 
          class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#FF2D55] via-[#FF375F] to-[#FF9F0A] shadow-xl shadow-rose-500/25 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
        >
          <span>Comenzar votación</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>

        <button 
          id="btn-manage" 
          class="w-full py-3 px-4 rounded-2xl text-xs font-semibold text-neutral-300 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] active:scale-[0.98] transition flex items-center justify-center gap-2 backdrop-blur-md"
        >
          <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>Gestionar restaurantes (${state.restaurants.length})</span>
        </button>

        <!-- Apple Home Indicator -->
        <div class="ios-home-indicator"></div>
      </div>
    </div>
  `;

  // Listeners
  const inputP1 = document.getElementById('input-p1');
  const inputP2 = document.getElementById('input-p2');

  inputP1.addEventListener('input', (e) => {
    state.player1Name = e.target.value.trim() || 'Jugador 1';
    localStorage.setItem('donde_comemos_p1_name', state.player1Name);
  });

  inputP2.addEventListener('input', (e) => {
    state.player2Name = e.target.value.trim() || 'Jugador 2';
    localStorage.setItem('donde_comemos_p2_name', state.player2Name);
  });

  document.getElementById('btn-start').addEventListener('click', () => {
    sound.init();
    sound.playWhoosh();
    sound.vibrate([40]);
    state.player1Selections.clear();
    state.player2Selections.clear();
    state.selectedCategory = 'all';
    state.roundAttempt = 1;
    state.tieBreakerUser = null;
    state.screen = 'player1';
    render();
  });

  document.getElementById('btn-manage').addEventListener('click', () => {
    sound.playPop();
    openManageModal();
  });
}

// ==========================================
// 2. PANTALLA DE JUGADOR (DOS TARJETAS POR FILA: GRID-COLS-2)
// ==========================================
function renderPlayerScreen(playerNum) {
  const isP1 = playerNum === 1;
  const playerName = isP1 ? state.player1Name : state.player2Name;
  const currentSelections = isP1 ? state.player1Selections : state.player2Selections;

  const theme = isP1
    ? {
        badgeBg: 'bg-rose-500/15 text-[#FF2D55] border-rose-500/30',
        counterBg: 'bg-[#FF2D55] text-white shadow-rose-500/40',
        btnBg: 'bg-gradient-to-r from-[#FF2D55] via-[#FF375F] to-[#FF9F0A] shadow-rose-500/30',
        selectedClass: 'card-p1-selected',
        checkClass: 'ios-check-p1'
      }
    : {
        badgeBg: 'bg-indigo-500/15 text-[#5E5CE6] border-indigo-500/30',
        counterBg: 'bg-[#5E5CE6] text-white shadow-indigo-500/40',
        btnBg: 'bg-gradient-to-r from-[#5E5CE6] via-[#0A84FF] to-[#30D158] shadow-indigo-500/30',
        selectedClass: 'card-p2-selected',
        checkClass: 'ios-check-p2'
      };

  app.innerHTML = `
    <div class="mobile-shell flex flex-col justify-between">
      <!-- Barra superior fija con Blur translúcido e Info de Turno -->
      <div class="px-5 pt-3 pb-3 sticky top-0 z-20 bg-black/80 backdrop-blur-2xl border-b border-white/[0.08]">
        <div class="flex items-center justify-between mb-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}">
            <span class="w-2 h-2 rounded-full ${isP1 ? 'bg-[#FF2D55]' : 'bg-[#5E5CE6]'} animate-pulse"></span>
            Turno: ${playerName}
          </div>
          <div class="flex items-center gap-2">
            ${state.roundAttempt > 1 ? '<span class="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">Ronda 2</span>' : ''}
            <div class="text-xs font-semibold px-2.5 py-1 rounded-xl ${theme.counterBg} shadow-md transition flex items-center gap-1">
              <span id="selected-counter">${currentSelections.size}</span>
              <span class="text-[10px] opacity-80">elegidos</span>
            </div>
          </div>
        </div>

        <h2 class="text-lg font-bold text-white tracking-tight">
          Elige tus opciones favoritas
        </h2>
        <p class="text-[11px] text-neutral-400">
          Pulsa para seleccionar. Tu voto se mantiene confidencial:
        </p>
      </div>

      <!-- Cuadrícula EXACTAMENTE DE DOS (2) TARJETAS POR FILA (GRID-COLS-2) con SCROLL HOLGADO -->
      <div class="px-4 py-4 grid grid-cols-2 gap-3.5 flex-1 content-start pb-28">
        ${state.restaurants
          .map((r) => {
            const isSelected = currentSelections.has(r.id);
            const logoSrc = r.logo || r.image;
            return `
              <div 
                data-id="${r.id}"
                class="ios-glass-card p-3.5 flex flex-col items-center justify-between min-h-[185px] ${isSelected ? theme.selectedClass : ''}"
              >
                <!-- Cabecera de la tarjeta: Checkmark estilo iOS -->
                <div class="w-full flex items-center justify-end mb-1 pointer-events-none">
                  <div class="ios-check ${isSelected ? theme.checkClass : 'ios-check-unselected'} check-badge">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>

                <!-- Placa squircle de Apple para el Logo Oficial (78x78) -->
                <div class="w-[78px] h-[78px] rounded-[22px] p-1.5 flex items-center justify-center my-auto drop-shadow-md pointer-events-none">
                  <img 
                    src="${logoSrc}" 
                    alt="${r.name}" 
                    class="w-full h-full object-contain filter drop-shadow-sm"
                    loading="lazy"
                    onerror="this.src='${r.image}'"
                  />
                </div>

                <!-- Nombre del restaurante e información de sucursales -->
                <div class="w-full text-center mt-2 pointer-events-none">
                  <div class="font-bold text-[14px] text-white truncate leading-tight">
                    ${r.name}
                  </div>
                  <div class="text-[10px] text-neutral-400 truncate mt-0.5">
                    ${r.branches ? r.branches.length + ' ubicaciones' : r.price}
                  </div>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>

      <!-- Barra flotante de confirmación estilo iOS -->
      <div class="sticky bottom-0 z-20 px-4 pt-3 floating-bottom-bar border-t border-white/[0.08]">
        <button 
          id="btn-confirm-turn" 
          class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white ${theme.btnBg} shadow-xl active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
        >
          <span>Confirmar selecciones</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </button>
        <!-- Apple Home Indicator -->
        <div class="ios-home-indicator"></div>
      </div>
    </div>
  `;

  // Handlers para interacción táctil con tarjetas
  document.querySelectorAll('.ios-glass-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (currentSelections.has(id)) {
        currentSelections.delete(id);
      } else {
        currentSelections.add(id);
      }
      sound.playPop();
      sound.vibrate([20]);

      const isSelected = currentSelections.has(id);
      const check = card.querySelector('.check-badge');
      if (isSelected) {
        card.classList.add(theme.selectedClass);
        check.className = `ios-check ${theme.checkClass} check-badge`;
      } else {
        card.classList.remove(theme.selectedClass);
        check.className = 'ios-check ios-check-unselected check-badge';
      }
      document.getElementById('selected-counter').textContent = currentSelections.size;
    });
  });

  // Confirmar turno
  document.getElementById('btn-confirm-turn').addEventListener('click', () => {
    if (currentSelections.size === 0) {
      sound.vibrate([50, 50, 50]);
      showToast('Elige al menos 1 restaurante');
      return;
    }

    sound.playWhoosh();
    sound.vibrate([35]);

    if (isP1) {
      state.screen = 'handover';
    } else {
      state.screen = 'matching';
    }
    render();
  });
}

// ==========================================
// 3. PANTALLA DE TRASPASO (HANDOVER) - PRIVACY NATIVE
// ==========================================
function renderHandoverScreen() {
  app.innerHTML = `
    <div class="mobile-shell px-6 justify-between text-center animate-ios-slide">
      <div class="pt-10">
        <!-- Icono Apple Privacy Shield -->
        <div class="w-20 h-20 rounded-[24px] bg-indigo-500/15 border border-indigo-500/30 text-[#5E5CE6] flex items-center justify-center shadow-lg shadow-indigo-500/15 mb-6 mx-auto">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>

        <h2 class="text-3xl font-extrabold text-white mb-3">
          Cambio de turno
        </h2>
        
        <div class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] text-xs font-semibold text-neutral-300 border border-white/[0.12] mb-6">
          <span>Pásale el teléfono a</span>
          <span class="text-[#5E5CE6] font-bold">${state.player2Name}</span>
        </div>

        <p class="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto">
          Mantén el secreto. Las elecciones de ${state.player1Name} quedan ocultas para evitar sesgos.
        </p>
      </div>

      <!-- Tarjeta Inset Privacy -->
      <div class="my-auto py-6">
        <div class="ios-glass p-6 rounded-[26px] max-w-xs mx-auto text-center space-y-2">
          <div class="w-8 h-8 rounded-full bg-indigo-500/20 text-[#5E5CE6] mx-auto flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div class="text-xs text-neutral-300 font-medium">
            Selecciones de ${state.player1Name} guardadas en secreto.
          </div>
          <div class="text-[11px] text-neutral-500">
            Ninguna opción será visible durante el siguiente turno.
          </div>
        </div>
      </div>

      <div class="pb-4 space-y-3">
        <button 
          id="btn-ready-p2" 
          class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#5E5CE6] via-[#0A84FF] to-[#30D158] shadow-xl shadow-indigo-500/25 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
        >
          <span>Soy ${state.player2Name}, continuar</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>

        <div class="ios-home-indicator"></div>
      </div>
    </div>
  `;

  document.getElementById('btn-ready-p2').addEventListener('click', () => {
    sound.playWhoosh();
    sound.vibrate([40]);
    state.screen = 'player2';
    render();
  });
}

// ==========================================
// 4. PANTALLA DE MATCHING & RULETA DE SUSPENSE
// ==========================================
function renderMatchingScreen() {
  app.innerHTML = `
    <div class="mobile-shell px-6 justify-center items-center text-center">
      <!-- Animated visionOS Sphere -->
      <div class="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FF2D55] via-[#5E5CE6] to-[#0A84FF] flex items-center justify-center mb-6 shadow-2xl p-1 animate-shimmer" id="roulette-container">
        <div class="w-full h-full bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/25">
          <img id="roulette-logo" src="./mcdonalds.svg" class="w-14 h-14 object-contain filter drop-shadow" />
        </div>
      </div>

      <h2 class="text-2xl font-extrabold text-white mb-2" id="roulette-title">
        Buscando coincidencias...
      </h2>
      <p class="text-xs sm:text-sm text-neutral-400 max-w-xs leading-relaxed" id="roulette-subtitle">
        Cruzando elecciones y localizando la sucursal más cercana en Cartagena o Murcia por GPS...
      </p>

      <div class="w-52 h-1.5 bg-white/[0.08] rounded-full overflow-hidden mt-8 border border-white/[0.1]">
        <div class="h-full bg-gradient-to-r from-[#FF2D55] via-[#5E5CE6] to-[#0A84FF] animate-pulse w-full"></div>
      </div>
    </div>
  `;

  const logos = [
    './mcdonalds.png',
    './burger_king.png',
    './kfc.png',
    './popeyes.png',
    './unica.png',
    './kebab.png',
    './telepizza.png'
  ];

  let tickCount = 0;
  const interval = setInterval(() => {
    const logoEl = document.getElementById('roulette-logo');
    if (logoEl) {
      logoEl.src = logos[tickCount % logos.length];
    }
    sound.playTick();
    tickCount++;
  }, 140);

  // Obtener geolocalización en segundo plano
  getUserLocation().then((coords) => {
    state.userCoords = coords;
  });

  setTimeout(async () => {
    clearInterval(interval);

    // Calcular coincidencias (intersección exacta)
    const matches = [...state.player1Selections].filter((id) =>
      state.player2Selections.has(id)
    );

    state.matchesCount = matches.length;

    if (matches.length > 0) {
      // Sorteo equiprobable entre las coincidencias
      const randomIndex = Math.floor(Math.random() * matches.length);
      const winnerId = matches[randomIndex];
      state.winningRestaurant = state.restaurants.find((r) => r.id === winnerId);

      if (!state.userCoords) {
        state.userCoords = await getUserLocation();
      }

      state.winningBranch = findClosestBranch(state.winningRestaurant, state.userCoords);
      state.isNameRevealed = false;
      state.tieBreakerUser = null;
      state.screen = 'result';
    } else {
      // Sin coincidencias -> activar flujo de desempate
      state.screen = 'no_match';
    }

    render();
  }, 2200);
}

// ==========================================
// 5. PANTALLA RESULTADO MISTERIOSO (MODO CIEGO)
// ==========================================
function renderResultScreen() {
  sound.playFanfare();
  sound.vibrate([100, 50, 150]);

  if (window.confetti) {
    window.confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const branch = state.winningBranch;
  const navUrl = getMysteryNavigationUrl(branch);

  const distanceText = branch.distanceKm !== null
    ? `A ~${branch.distanceKm < 1 ? Math.round(branch.distanceKm * 1000) + ' m' : branch.distanceKm.toFixed(1) + ' km'} de ti`
    : `Sucursal seleccionada`;

  const headerBadge = state.tieBreakerUser
    ? `Sorteo de desempate (${state.tieBreakerUser})`
    : `¡Coincidencia ganadora! (${state.matchesCount} en común)`;

  app.innerHTML = `
    <div class="mobile-shell px-6 justify-between text-center animate-ios-pop">
      <!-- Encabezado de resultado -->
      <div class="pt-6">
        <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-4 backdrop-blur-xl">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>${headerBadge}</span>
        </div>

        <h2 class="text-3xl font-extrabold text-white tracking-tight">
          Destino Secreto
        </h2>
        <p class="text-xs text-neutral-400 mt-1 max-w-xs mx-auto leading-relaxed">
          El nombre permanece oculto. Pulsad en el botón de navegación y Maps os guiará directamente a la puerta sin desvelar qué es.
        </p>
      </div>

      <!-- Tarjeta Liquid Glass con efecto incógnito -->
      <div class="ios-glass p-6 rounded-[28px] my-5 relative overflow-hidden text-center shadow-2xl">
        <div class="relative z-10 flex flex-col items-center">
          <!-- Squircle Misterioso con Glifo incógnito -->
          <div class="w-24 h-24 rounded-[24px] bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-5xl mb-4 shadow-inner">
            <svg class="w-12 h-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <div class="text-lg font-bold text-white mb-1 tracking-tight">
            Restaurante Sorpresa
          </div>
          
          <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.1] mb-3">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>${distanceText}</span>
          </div>

          <p class="text-[11px] text-neutral-400 leading-normal max-w-xs">
            Ruta calculada hacia la sucursal más cercana en tu zona.
          </p>

          <!-- Accordion secreto para desvelar el nombre si lo desean -->
          <div class="mt-4 pt-3.5 border-t border-white/[0.08] w-full text-left">
            <button 
              id="btn-toggle-reveal" 
              class="w-full text-center text-[11px] font-semibold text-neutral-400 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <span>${state.isNameRevealed ? 'Ocultar nombre de nuevo' : '¿Queréis saber el sitio antes de salir? Ver destino'}</span>
            </button>
            
            <div id="revealed-box" class="${state.isNameRevealed ? 'block' : 'hidden'} mt-3 p-4 rounded-2xl bg-black/60 border border-white/10 text-center animate-ios-slide">
              <div class="w-14 h-14 rounded-2xl p-1 bg-white/[0.06] border border-white/15 mx-auto mb-2 flex items-center justify-center">
                <img src="${state.winningRestaurant.logo || state.winningRestaurant.image}" class="w-full h-full object-contain filter drop-shadow" />
              </div>
              <div class="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">Destino confirmado</div>
              <div class="text-base font-extrabold text-white">${state.winningRestaurant.name}</div>
              <div class="text-xs text-neutral-400 mt-1">${branch.address}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de acción principal: CÓMO LLEGAR -->
      <div class="space-y-3 pb-4">
        <a 
          id="btn-navigate"
          href="${navUrl}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-xl shadow-emerald-500/30 active:scale-[0.97] transition transform flex items-center justify-center gap-3 border-t border-white/20"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          <span>¡CÓMO LLEGAR! 🗺️</span>
        </a>

        <button 
          id="btn-restart" 
          class="w-full py-3 px-4 rounded-2xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.06] border border-white/[0.1] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
        >
          <span>Nueva votación</span>
        </button>

        <div class="ios-home-indicator"></div>
      </div>
    </div>
  `;

  document.getElementById('btn-navigate').addEventListener('click', () => {
    sound.playPop();
    sound.vibrate([60]);
  });

  document.getElementById('btn-toggle-reveal').addEventListener('click', () => {
    state.isNameRevealed = !state.isNameRevealed;
    sound.playPop();
    renderResultScreen();
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    sound.playWhoosh();
    state.roundAttempt = 1;
    state.screen = 'home';
    render();
  });
}

// ==========================================
// 6. PANTALLA CERO COINCIDENCIAS (DESEMPATE INTELIGENTE)
// ==========================================
function renderNoMatchScreen() {
  sound.vibrate([50, 50, 50]);

  const isFirstAttempt = state.roundAttempt === 1;

  if (isFirstAttempt) {
    // --- RONDA 1 FALLIDA: Opción de repetir ronda ---
    app.innerHTML = `
      <div class="mobile-shell px-6 justify-between text-center animate-ios-pop">
        <div class="pt-10">
          <div class="w-20 h-20 rounded-[24px] bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg shadow-amber-500/10">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>

          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] text-xs font-semibold text-amber-400 border border-amber-500/30 mb-3">
            <span>Ronda 1 sin coincidencia</span>
          </div>

          <h2 class="text-3xl font-extrabold text-white mb-2 tracking-tight">
            No habéis coincidido
          </h2>
          <p class="text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
            ${state.player1Name} eligió <strong class="text-[#FF2D55]">${state.player1Selections.size}</strong> y ${state.player2Name} eligió <strong class="text-[#5E5CE6]">${state.player2Selections.size}</strong>, pero ninguna opción en común.
          </p>
        </div>

        <div class="ios-glass p-5 rounded-[26px] text-xs text-neutral-300 space-y-2 max-w-xs mx-auto text-left">
          <div class="font-bold text-amber-400">Regla de desempate</div>
          <div class="text-neutral-300 leading-relaxed">
            Vamos a repetir la votación en una <strong>segunda ronda</strong> para daros otra oportunidad de coincidir.
          </div>
          <div class="text-[11px] text-neutral-500 pt-1 border-t border-white/[0.06]">
            Si tampoco coincidís en la ronda 2, el sistema sorteará automáticamente entre los que marque <strong>${state.player2Name}</strong>.
          </div>
        </div>

        <div class="space-y-3 pb-4">
          <button 
            id="btn-retry-round" 
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-[#FF2D55] shadow-xl shadow-amber-500/25 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
          >
            <span>Repetir votación (Intento 2)</span>
          </button>

          <button 
            id="btn-restart-home" 
            class="w-full py-3 px-4 rounded-2xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.06] border border-white/[0.1] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
          >
            <span>Volver al inicio</span>
          </button>

          <div class="ios-home-indicator"></div>
        </div>
      </div>
    `;

    document.getElementById('btn-retry-round').addEventListener('click', () => {
      sound.playWhoosh();
      state.roundAttempt = 2;
      state.player1Selections.clear();
      state.player2Selections.clear();
      state.screen = 'player1';
      render();
    });

    document.getElementById('btn-restart-home').addEventListener('click', () => {
      sound.playWhoosh();
      state.roundAttempt = 1;
      state.screen = 'home';
      render();
    });

  } else {
    // --- RONDA 2 FALLIDA: Azar entre los elegidos por el SEGUNDO USUARIO ---
    const p2Options = [...state.player2Selections];

    app.innerHTML = `
      <div class="mobile-shell px-6 justify-between text-center animate-ios-pop">
        <div class="pt-10">
          <div class="w-20 h-20 rounded-[24px] bg-indigo-500/15 border border-indigo-500/30 text-[#5E5CE6] flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg shadow-indigo-500/15">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>

          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] text-xs font-semibold text-[#5E5CE6] border border-indigo-500/30 mb-3">
            <span>Desempate definitivo (Ronda 2)</span>
          </div>

          <h2 class="text-2xl font-extrabold text-white mb-2 tracking-tight">
            Desempate final
          </h2>
          <p class="text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
            Aplicando la regla pactada: el azar elegirá directamente entre los sitios que ha elegido el segundo usuario (<strong class="text-[#5E5CE6]">${state.player2Name}</strong>).
          </p>
        </div>

        <div class="ios-glass p-5 rounded-[26px] text-xs text-neutral-300 space-y-1.5 max-w-xs mx-auto text-left">
          <div class="font-bold text-[#5E5CE6]">Opciones de ${state.player2Name}:</div>
          <div class="text-[12px] text-neutral-300 font-medium">
            ${p2Options.length} restaurante${p2Options.length > 1 ? 's en juego' : ' en juego'}.
          </div>
        </div>

        <div class="space-y-3 pb-4">
          <button 
            id="btn-pick-p2" 
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#5E5CE6] via-[#0A84FF] to-[#30D158] shadow-xl shadow-indigo-500/30 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
          >
            <span>Sorteo entre las opciones de ${state.player2Name}</span>
          </button>

          <button 
            id="btn-restart-home" 
            class="w-full py-3 px-4 rounded-2xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.06] border border-white/[0.1] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
          >
            <span>Reiniciar desde cero</span>
          </button>

          <div class="ios-home-indicator"></div>
        </div>
      </div>
    `;

    document.getElementById('btn-pick-p2').addEventListener('click', async () => {
      sound.playWhoosh();
      const randomIndex = Math.floor(Math.random() * p2Options.length);
      const winnerId = p2Options[randomIndex];
      state.winningRestaurant = state.restaurants.find((r) => r.id === winnerId);
      state.winningBranch = findClosestBranch(state.winningRestaurant, state.userCoords);
      state.matchesCount = 1;
      state.isNameRevealed = false;
      state.tieBreakerUser = state.player2Name;
      state.screen = 'result';
      render();
    });

    document.getElementById('btn-restart-home').addEventListener('click', () => {
      sound.playWhoosh();
      state.roundAttempt = 1;
      state.screen = 'home';
      render();
    });
  }
}

// ==========================================
// 7. MODAL DE GESTIÓN DE RESTAURANTES (APPLE SHEET)
// ==========================================
function openManageModal() {
  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-ios-slide">
      <div class="bg-neutral-950 border-t border-white/[0.12] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <!-- Grabber bar de Apple Sheet -->
        <div class="w-10 h-1 bg-white/25 rounded-full mx-auto my-3"></div>

        <!-- Cabecera del modal -->
        <div class="px-6 pb-3 flex items-center justify-between border-b border-white/[0.08]">
          <div>
            <h3 class="font-bold text-base text-white">Catálogo de Restaurantes</h3>
            <div class="text-[11px] text-neutral-400">Cartagena & Murcia</div>
          </div>
          <button id="btn-close-modal" class="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 flex items-center justify-center font-bold text-xs transition">✕</button>
        </div>

        <!-- Contenido scrolleable -->
        <div class="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          <!-- Formulario para añadir nuevo restaurante -->
          <div class="ios-glass p-4 rounded-2xl space-y-3">
            <div class="text-xs font-bold text-rose-400 uppercase tracking-wider">Añadir otro sitio</div>
            
            <input 
              id="new-res-name" 
              type="text" 
              placeholder="Nombre (ej. La Tagliatella Cartagena)" 
              class="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
            />

            <div class="grid grid-cols-2 gap-2">
              <select id="new-res-cat" class="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="Hamburguesas">🍔 Hamburguesas</option>
                <option value="Pizza">🍕 Pizza</option>
                <option value="Pollo">🍗 Pollo</option>
                <option value="Kebab">🥙 Kebab</option>
                <option value="Asiático">🍣 Asiático</option>
                <option value="Mexicano">🌮 Mexicano</option>
                <option value="Tapas">🥘 Tapas</option>
                <option value="Otro">🍽️ Otro</option>
              </select>

              <select id="new-res-price" class="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="€">€ Económico</option>
                <option value="€€" selected>€€ Medio</option>
                <option value="€€€">€€€ Especial</option>
              </select>
            </div>

            <input 
              id="new-res-address" 
              type="text" 
              placeholder="Dirección o calle (Cartagena / Murcia)" 
              class="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
            />

            <button 
              id="btn-add-restaurant" 
              class="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#FF2D55] active:scale-[0.98] transition shadow-md shadow-rose-500/30"
            >
              + Guardar en la lista
            </button>
          </div>

          <!-- Lista de restaurantes activos -->
          <div>
            <div class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5 pl-1">Restaurantes activos (${state.restaurants.length})</div>
            <div class="space-y-2">
              ${state.restaurants
                .map((r) => `
                  <div class="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl p-1 bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                        <img src="${r.logo || r.image}" class="w-full h-full object-contain filter drop-shadow-sm" onerror="this.src='${r.image}'" />
                      </div>
                      <div class="overflow-hidden">
                        <div class="font-bold text-xs text-white truncate">${r.name}</div>
                        <div class="text-[10px] text-neutral-400 truncate">${r.category} • ${r.branches ? r.branches.length + ' ubicaciones' : ''}</div>
                      </div>
                    </div>
                    <button 
                      data-del="${r.id}" 
                      class="btn-delete-res text-xs text-neutral-500 hover:text-rose-400 p-2 transition rounded-lg hover:bg-white/[0.05]"
                      title="Eliminar"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                `)
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-close-modal').addEventListener('click', () => {
    modalContainer.innerHTML = '';
  });

  document.getElementById('btn-add-restaurant').addEventListener('click', async () => {
    const name = document.getElementById('new-res-name').value.trim();
    const category = document.getElementById('new-res-cat').value;
    const price = document.getElementById('new-res-price').value;
    const address = document.getElementById('new-res-address').value.trim() || 'Cartagena / Murcia';

    if (!name) {
      showToast('Escribe el nombre del restaurante');
      return;
    }

    const emojiMap = {
      Hamburguesas: '🍔',
      Pizza: '🍕',
      Pollo: '🍗',
      Kebab: '🥙',
      Asiático: '🍣',
      Mexicano: '🌮',
      Tapas: '🥘',
      Otro: '🍽️'
    };

    const coords = state.userCoords || { lat: 37.6000, lng: -0.9850 };

    const newRes = {
      id: 'custom-' + Date.now(),
      name,
      category,
      price,
      emoji: emojiMap[category] || '🍽️',
      logo: './unica.svg',
      image: './unica.svg',
      description: 'Restaurante añadido por vosotros.',
      branches: [
        {
          name: 'Sucursal',
          address,
          lat: coords.lat,
          lng: coords.lng
        }
      ]
    };

    saveRestaurant(newRes);
    state.restaurants = getRestaurants();
    sound.playPop();
    showToast(`"${name}" añadido`);
    openManageModal();
  });

  document.querySelectorAll('.btn-delete-res').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.del;
      removeRestaurant(id);
      state.restaurants = getRestaurants();
      sound.playPop();
      showToast('Restaurante eliminado');
      openManageModal();
    });
  });
}

// Iniciar aplicación
init();
