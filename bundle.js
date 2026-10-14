/**
 * ¿Dónde comemos? - Bundle unificado compatible con protocolo file:// y http(s)://
 * Diseñado con estética Apple HIG (iOS 17/18 y visionOS) y 'Liquid Glass'.
 * Sin bloqueos CORS al abrir con doble clic en index.html.
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CATÁLOGO DE RESTAURANTES (LOGOS OFICIALES VECTORIALES SVG)
  // ==========================================
  const DEFAULT_RESTAURANTS = [
    {
      id: 'mcdonalds',
      name: "McDonald's",
      category: 'Hamburguesas',
      emoji: '🍟',
      logo: './mcdonalds.png',
      image: './mcdonalds.png',
      description: 'Hamburguesas clásicas, Big Mac, patatas y McFlurry.',
      price: '€',
      color: '#E51920',
      hints: [
        'Su mascota más famosa viste de amarillo y rojo.',
        'Su postre estrella tiene nombre de tormenta.',
        'Sus patatas doradas son mundialmente conocidas.',
        'Tiene un menú para niños con juguete sorpresa.'
      ],
      branches: [
        { name: 'CC Espacio Mediterráneo', address: 'Polígono Cabezo Beaza, Cartagena', lat: 37.6186, lng: -0.9575 },
        { name: 'Paseo Alfonso XIII', address: 'Paseo Alfonso XIII 44, Cartagena', lat: 37.6075, lng: -0.9850 },
        { name: 'CC Thader', address: 'Av. Juan de Borbón s/n, Murcia', lat: 38.0305, lng: -1.1482 },
        { name: 'CC Nueva Condomina', address: 'Autovía A-7 km 560, Murcia', lat: 38.0332, lng: -1.1441 },
        { name: 'Ronda Sur', address: 'Paseo Florencia s/n, Murcia', lat: 37.9734, lng: -1.1278 }
      ]
    },
    {
      id: 'burger-king',
      name: 'Burger King',
      category: 'Hamburguesas',
      emoji: '👑',
      logo: './burger_king.png',
      image: './burger_king.png',
      description: 'Hamburguesas a la parrilla, Whopper, aros de cebolla y King Fries.',
      price: '€',
      color: '#D62300',
      hints: [
        'Presumen de cocinar la carne 100% a la auténtica parrilla.',
        'Su hamburguesa más legendaria empieza por W.',
        'Si pides menú, te puedes llevar una corona de cartón.',
        'Tienen unos famosos aros de cebolla y salsa barbacoa.'
      ],
      branches: [
        { name: 'Paseo Alfonso XIII', address: 'Paseo Alfonso XIII 16, Cartagena', lat: 37.6052, lng: -0.9831 },
        { name: 'CC Espacio Mediterráneo', address: 'Parque Comercial Mediterráneo, Cartagena', lat: 37.6182, lng: -0.9568 },
        { name: 'Alameda de San Antón', address: 'Alameda de San Antón 38, Cartagena', lat: 37.6135, lng: -0.9961 },
        { name: 'Gran Vía Murcia', address: 'Gran Vía del Escultor Salzillo 22, Murcia', lat: 37.9858, lng: -1.1315 },
        { name: 'CC Atalayas', address: 'Calle Molina de Segura s/n, Murcia', lat: 37.9892, lng: -1.1165 },
        { name: 'Juan Carlos I', address: 'Avenida Juan Carlos I 45, Murcia', lat: 38.0012, lng: -1.1412 }
      ]
    },
    {
      id: 'kfc',
      name: 'KFC',
      category: 'Pollo',
      emoji: '🍗',
      logo: './kfc.png',
      image: './kfc.png',
      description: 'Pollo frito receta original, tiras crujientes y cubos para compartir.',
      price: '€',
      color: '#ED1C24',
      hints: [
        'Su fundador era un coronel con pajarita negra y pelo blanco.',
        'Guardan bajo llave una receta secreta de 11 hierbas y especias.',
        'Es típico pedir su comida en cubos gigantes para compartir.',
        'Crujiente por fuera y tierno por dentro desde Kentucky.'
      ],
      branches: [
        { name: 'CC Espacio Mediterráneo', address: 'Parque Comercial Mediterráneo, Cartagena', lat: 37.6191, lng: -0.9582 },
        { name: 'CC Thader', address: 'Av. Juan de Borbón s/n, Murcia', lat: 38.0298, lng: -1.1475 },
        { name: 'CC Nueva Condomina', address: 'Autovía del Mediterráneo km 560, Murcia', lat: 38.0335, lng: -1.1438 },
        { name: 'Ronda Norte', address: 'Plaza Circular / Ronda Norte, Murcia', lat: 37.9942, lng: -1.1345 }
      ]
    },
    {
      id: 'popeyes',
      name: 'Popeyes',
      category: 'Pollo',
      emoji: '🌶️',
      logo: './popeyes.png',
      image: './popeyes.png',
      description: 'Pollo crujiente de Louisiana marinado 12h, The Chicken Sandwich.',
      price: '€',
      color: '#FF7A18',
      hints: [
        'Nació en Nueva Orleans, en el corazón de Louisiana.',
        'Marinan todo el pollo durante al menos 12 horas con especias cajún.',
        'Su color corporativo más vibrante es un naranja intenso.',
        'Su Chicken Sandwich desató colas interminables en todo el mundo.'
      ],
      branches: [
        { name: 'CC Espacio Mediterráneo', address: 'Calle Londres s/n, Parque Comercial, Cartagena', lat: 37.6180, lng: -0.9570 },
        { name: 'CC Nueva Condomina', address: 'Autovía A-7, Murcia', lat: 38.0339, lng: -1.1448 },
        { name: 'CC Thader', address: 'Av. Juan de Borbón, Murcia', lat: 38.0309, lng: -1.1490 }
      ]
    },
    {
      id: 'unica',
      name: 'Única Burgers',
      category: 'Hamburguesas',
      emoji: '🔥',
      logo: './unica.png',
      image: './unica.png',
      description: 'Hamburguesería artesanal de Cartagena. Smash burgers y patatas épicas.',
      price: '€€',
      color: '#F43F5E',
      hints: [
        'Es un local 100% autóctono nacido en Cartagena.',
        'Son especialistas en la técnica smash con costra caramelizada.',
        'Su nombre dice que ninguna otra es igual.',
        'Sus patatas con salsa de la casa son irresistibles.'
      ],
      branches: [
        { name: 'Única Cartagena Centro', address: 'Calle Carlos III / Plaza Juan XXIII, Cartagena', lat: 37.6048, lng: -0.9840 },
        { name: 'Única Alameda', address: 'Alameda de San Antón 38, Cartagena', lat: 37.6138, lng: -0.9934 }
      ]
    },
    {
      id: 'kebab',
      name: 'Kebab',
      category: 'Kebab',
      emoji: '🥙',
      logo: './kebab.png',
      image: './kebab.png',
      description: 'Döner Kebab auténtico, durum y especialidades en pan recién horneado.',
      price: '€',
      color: '#F59E0B',
      hints: [
        'La carne gira lentamente en una gran espada vertical.',
        'La clásica pregunta: ¿Salsa blanca, picante o de las dos?',
        'Se envuelve en pan de pita o enrollado como un durum.',
        'Lleva lechuga, tomate, cebolla y carne recién cortada.'
      ],
      branches: [
        { name: 'City Döner Kebab', address: 'C. Jiménez de la Espada, 17, bajo, 30204 Cartagena, Murcia', lat: 37.6108, lng: -0.9902 },
        { name: 'Kebab El Buen Rollo', address: 'C. Músico Antonio Rodríguez de Hita, 10, 30007 Murcia', lat: 37.9957, lng: -1.1275 }
      ]
    },
    {
      id: 'telepizza',
      name: 'Telepizza',
      category: 'Pizza',
      emoji: '🍕',
      logo: './telepizza.png',
      image: './telepizza.png',
      description: 'El secreto está en la masa. Barbacoa, 4 quesos, carbonara y masa fina.',
      price: '€',
      color: '#E60026',
      hints: [
        'Dicen desde hace décadas que "el secreto está en la masa".',
        'Llega en una caja cuadrada de cartón pero lo de dentro es redondo.',
        'Su pizza barbacoa es un clásico de las noches de peli y manta.',
        'Masa estirada con sémola y borde crujiente con queso.'
      ],
      branches: [
        { name: 'Telepizza Alfonso XIII', address: 'Paseo Alfonso XIII 27, Cartagena', lat: 37.6062, lng: -0.9845 },
        { name: 'Telepizza Alameda', address: 'Alameda de San Antón 30, Cartagena', lat: 37.6128, lng: -0.9955 },
        { name: 'Telepizza Dolores', address: 'Calle Mayor 65, Los Dolores, Cartagena', lat: 37.6250, lng: -0.9910 },
        { name: 'Telepizza Gran Vía Murcia', address: 'Gran Vía Alfonso X El Sabio 9, Murcia', lat: 37.9898, lng: -1.1308 },
        { name: 'Telepizza Ronda Sur Murcia', address: 'Avenida Juan Carlos I 12, Murcia', lat: 38.0005, lng: -1.1398 }
      ]
    }
  ];

  const STORAGE_KEY = 'donde_comemos_custom_restaurants_v7';

  function getRestaurants() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const custom = JSON.parse(raw);
        const customIds = new Set(custom.map(function (r) { return r.id; }));
        const filteredDefaults = DEFAULT_RESTAURANTS.filter(function (r) { return !customIds.has(r.id); });
        return custom.concat(filteredDefaults);
      }
    } catch (err) {
      console.error('Error al leer de localStorage:', err);
    }
    return DEFAULT_RESTAURANTS.slice();
  }

  function saveRestaurant(restaurant) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const index = list.findIndex(function (r) { return r.id === restaurant.id; });
      if (index >= 0) {
        list[index] = restaurant;
      } else {
        list.unshift(restaurant);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (err) {
      console.error('Error al guardar en localStorage:', err);
      return false;
    }
  }

  const DIARY_STORAGE_KEY = 'donde_comemos_food_diary_v1';

  function getFoodDiary() {
    try {
      const raw = localStorage.getItem(DIARY_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function addFoodVisit(restaurantId, restaurantName, rating) {
    try {
      const list = getFoodDiary();
      list.unshift({
        id: 'visit-' + Date.now(),
        restaurantId: restaurantId,
        restaurantName: restaurantName,
        rating: rating || 5,
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
        timestamp: Date.now()
      });
      localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getRestaurantVisitStats() {
    const list = getFoodDiary();
    const counts = {};
    list.forEach(function (v) {
      counts[v.restaurantId] = (counts[v.restaurantId] || 0) + 1;
    });
    return counts;
  }

  // ==========================================
  // 2. GEOLOCALIZACIÓN Y DISTANCIAS (HAVERSINE)
  // ==========================================
  function getUserLocation() {
    if (!navigator.geolocation) {
      return Promise.resolve(null);
    }
    return new Promise(function (resolve) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        function (error) {
          console.warn('Geolocalización omitida:', error.message);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 }
      );
    });
  }

  function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function findClosestBranch(restaurant, userCoords) {
    if (!restaurant.branches || restaurant.branches.length === 0) {
      return {
        name: 'Ubicación principal',
        address: 'Destino sorpresa',
        lat: userCoords ? userCoords.lat : 37.6000,
        lng: userCoords ? userCoords.lng : -0.9850,
        distanceKm: null
      };
    }

    if (!userCoords) {
      return Object.assign({}, restaurant.branches[0], { distanceKm: null });
    }

    let closest = restaurant.branches[0];
    let minDistance = calculateDistanceKm(
      userCoords.lat,
      userCoords.lng,
      closest.lat,
      closest.lng
    );

    for (let i = 1; i < restaurant.branches.length; i++) {
      const branch = restaurant.branches[i];
      const dist = calculateDistanceKm(
        userCoords.lat,
        userCoords.lng,
        branch.lat,
        branch.lng
      );
      if (dist < minDistance) {
        minDistance = dist;
        closest = branch;
      }
    }

    return Object.assign({}, closest, { distanceKm: minDistance });
  }

  function getMysteryNavigationUrl(branch) {
    const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
    const lat = branch.lat.toFixed(6);
    const lng = branch.lng.toFixed(6);
    const appChoice = state.mapApp || 'auto';

    if (appChoice === 'apple' || (appChoice === 'auto' && isApple)) {
      return 'https://maps.apple.com/?daddr=' + lat + ',' + lng + '&dirflg=d';
    }
    if (appChoice === 'waze') {
      return 'https://waze.com/ul?ll=' + lat + ',' + lng + '&navigate=yes';
    }
    // Google Maps por defecto
    return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;
  }

  // ==========================================
  // 3. EFECTOS DE SONIDO NATIVOS (WEB AUDIO API)
  // ==========================================
  const sound = {
    ctx: null,
    muted: localStorage.getItem('donde_comemos_sound_muted') === null ? true : (localStorage.getItem('donde_comemos_sound_muted') === 'true'),
    init: function () {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },
    toggleMute: function () {
      this.muted = !this.muted;
      localStorage.setItem('donde_comemos_sound_muted', this.muted);
      return this.muted;
    },
    playPop: function () {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(820, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    },
    playWhoosh: function () {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(460, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } catch (e) {}
    },
    playTick: function () {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(700, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    },
    playVeto: function () {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      } catch (e) {}
    },
    playSuperlike: function () {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, this.ctx.currentTime);
        osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.22);
      } catch (e) {}
    },
    playCoin: function () {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
        osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.28);
      } catch (e) {}
    },
    playFanfare: function () {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.15 },
        { f: 1046.5, d: 0.35 }
      ];
      let t = this.ctx.currentTime;
      const ctx = this.ctx;
      notes.forEach(function (n) {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(n.f, t);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.005, t + n.d);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + n.d);
          t += n.d * 0.9;
        } catch (e) {}
      });
    },
    vibrate: function (pattern) {
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate(pattern || [30]);
        } catch (e) {}
      }
    }
  };

  // ==========================================
  // 4. ESTADO DE LA APLICACIÓN
  // ==========================================
  const state = {
    screen: 'home',
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
    mapApp: localStorage.getItem('donde_comemos_map_app') || 'auto', // 'auto', 'apple', 'google', 'waze'
    soundMuted: localStorage.getItem('donde_comemos_sound_muted') === null ? true : (localStorage.getItem('donde_comemos_sound_muted') === 'true'),
    p1Guess: null,
    p2Guess: null,
    payerWinner: null,
    isPayerSpinning: false,
    showClues: false,
    clueIndex: 0,
    activeResultTab: 'destiny', // 'destiny' | 'games' | 'map'
    showHomeActionsSheet: false,
    activeChallenge: null,
    restaurants: [],
    selectedCategory: 'all',
    winningRestaurant: null,
    winningBranch: null,
    userCoords: null,
    isNameRevealed: false,
    matchesCount: 0,
    roundAttempt: 1,
    tieBreakerUser: null,
    recommendedMaxDistance: 15, // null (cualquier distancia) | 2 | 5 | 15 | 30
    recommendedMinRating: 4.5, // 4.5 por defecto, ajustable a 4.3, 4.0 o 0 (todas)
    recommendedPrice: 'all', // 'all' | '€' | '€€' | '€€€' | '€€€€'
    recommendedCityQuery: '',
    recommendedLimit: 5
  };

  const KNOWN_CITY_COORDS = {
    cartagena: { lat: 37.6000, lng: -0.9850, name: 'Cartagena' },
    murcia: { lat: 37.9870, lng: -1.1300, name: 'Murcia' },
    'cabo de palos': { lat: 37.6322, lng: -0.7028, name: 'Cabo de Palos' },
    'la manga': { lat: 37.6400, lng: -0.7100, name: 'La Manga' },
    espinardo: { lat: 38.0083, lng: -1.1542, name: 'Espinardo' },
    'el palmar': { lat: 37.9422, lng: -1.1561, name: 'El Palmar' }
  };

  function normalizeSearchText(str) {
    if (!str) return '';
    return str.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  const RECOMMENDED_RESTAURANTS_POOL = [
    {
      id: 'rec-magoga',
      name: 'Restaurante Magoga',
      city: 'Cartagena',
      zone: 'Plaza Dr. Vicente García Marcos, 4',
      rating: 4.7,
      reviewsCount: 1350,
      price: '€€€€',
      category: 'Alta cocina & Mediterráneo',
      accolades: 'Estrella Michelin · 2 Soles Repsol',
      description: 'Menú degustación marinero que reinterpreta con elegancia el recetario de la costa y el Campo de Cartagena.',
      lat: 37.6047,
      lng: -0.9859,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Magoga+Cartagena'
    },
    {
      id: 'rec-marquesita',
      name: 'La Marquesita',
      city: 'Cartagena',
      zone: 'Plaza Alcolea, 6',
      rating: 4.6,
      reviewsCount: 1620,
      price: '€€€',
      category: 'Cocina marinera & Arroces',
      accolades: 'Clásico indispensable',
      description: 'Especialistas en caldero cartagenero tradicional y pescados frescos seleccionados de lonja con servicio impecable.',
      lat: 37.6019,
      lng: -0.9838,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=La+Marquesita+Cartagena'
    },
    {
      id: 'rec-luces',
      name: 'Luces de Cartagena',
      city: 'Cartagena',
      zone: 'Calle de la Caridad, 52',
      rating: 4.7,
      reviewsCount: 840,
      price: '€€',
      category: 'Fusión mediterránea & Tapas',
      accolades: 'Top valorado en casco histórico',
      description: 'Cocina creativa con producto local, atún rojo, croquetas melosas y excelente ambiente acogedor en el centro.',
      lat: 37.6033,
      lng: -0.9822,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Luces+de+Cartagena'
    },
    {
      id: 'rec-alabrasa',
      name: 'A la Brasa Cartagena',
      city: 'Cartagena',
      zone: 'Calle del Carmen, 61',
      rating: 4.7,
      reviewsCount: 1140,
      price: '€€',
      category: 'Brasas & Hamburguesas gourmet',
      accolades: 'Cortes nobles al carbón',
      description: 'Carnes maduradas a la brasa de encina y hamburguesas gourmet con brioche artesano y salsas caseras.',
      lat: 37.6062,
      lng: -0.9851,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=A+la+Brasa+Cartagena'
    },
    {
      id: 'rec-lafabrica',
      name: 'Gastrobar La Fábrica',
      city: 'Cartagena',
      zone: 'Calle San Roque, 11',
      rating: 4.6,
      reviewsCount: 1250,
      price: '€€',
      category: 'Brew-pub artesanal & Tapas',
      accolades: 'Cerveza artesana propia',
      description: 'Cerveza artesanal elaborada en el propio brew-pub, tapas de vanguardia y hamburguesas de autor en ambiente distendido.',
      lat: 37.6005,
      lng: -0.9825,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Gastrobar+La+Fabrica+Cartagena'
    },
    {
      id: 'rec-currycorner',
      name: 'The Curry Corner',
      city: 'Cartagena',
      zone: 'Calle Campos, 12',
      rating: 4.8,
      reviewsCount: 780,
      price: '€€',
      category: 'Cocina india tradicional',
      accolades: 'Máxima nota en reseñas de viajeros',
      description: 'Auténticos curris tradicionales con especias recién molidas, pollo tikka al horno tandoor y pan naan artesano.',
      lat: 37.6026,
      lng: -0.9828,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=The+Curry+Corner+Cartagena'
    },
    {
      id: 'rec-bodega-fuente',
      name: 'Bodega La Fuente',
      city: 'Cartagena',
      zone: 'Calle Jara, 27',
      rating: 4.6,
      reviewsCount: 2100,
      price: '€€',
      category: 'Salazones & Tapas tradicionales',
      accolades: 'Templo de la anchoa y salazones',
      description: 'Emblemático rincón cartagenero con salazones del Cantábrico y del mar Mediterráneo, montaditos y vermú artesanal.',
      lat: 37.6009,
      lng: -0.9847,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Bodega+La+Fuente+Cartagena'
    },
    {
      id: 'rec-pincho-castilla',
      name: 'El Pincho de Castilla',
      city: 'Cartagena',
      zone: 'Calle Ángel Bruna, 17',
      rating: 4.6,
      reviewsCount: 1850,
      price: '€€',
      category: 'Carnes a la brasa & Tapas',
      accolades: 'Referente local de carnes',
      description: 'Especialistas en carnes rojas a la brasa, pinchos castellanos y raciones generosas en pleno ensanche cartagenero.',
      lat: 37.6085,
      lng: -0.9880,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=El+Pincho+de+Castilla+Cartagena'
    },
    {
      id: 'rec-miramar',
      name: 'Restaurante Miramar',
      city: 'Cabo de Palos',
      zone: 'Paseo del Puerto, 32',
      rating: 4.6,
      reviewsCount: 2450,
      price: '€€€',
      category: 'Caldero & Cocina marinera',
      accolades: 'Arroces icónicos frente al faro',
      description: 'Vistas panorámicas al puerto pesquero de Cabo de Palos, afamado por su genuino caldero del Mar Menor y pescados de roca.',
      lat: 37.6322,
      lng: -0.7028,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Miramar+Cabo+de+Palos'
    },
    {
      id: 'rec-bocana-palos',
      name: 'Bocana de Palos',
      city: 'Cabo de Palos',
      zone: 'Calle del Faro, 8',
      rating: 4.6,
      reviewsCount: 1320,
      price: '€€€',
      category: 'Fusión marinera & Arroces',
      accolades: 'Terraza privilegiada sobre el mar',
      description: 'Pescados frescos del día a la brasa, arroces melosos y cocina marinera con toques contemporáneos junto al acantilado.',
      lat: 37.6335,
      lng: -0.7015,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Bocana+de+Palos'
    },
    {
      id: 'rec-almamater',
      name: 'AlmaMáter',
      city: 'Murcia',
      zone: 'Calle Madre de Dios, 15',
      rating: 4.7,
      reviewsCount: 1180,
      price: '€€€€',
      category: 'Alta cocina de raíz',
      accolades: 'Estrella Michelin · 1 Sol Repsol',
      description: 'Cocina de autor sensible y honesta que eleva los sabores tradicionales de la huerta con técnica milimétrica.',
      lat: 37.9856,
      lng: -1.1278,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=AlmaMater+Murcia'
    },
    {
      id: 'rec-alborada',
      name: 'Alborada Restaurante',
      city: 'Murcia',
      zone: 'Calle Andrés Baquero, 15',
      rating: 4.6,
      reviewsCount: 1740,
      price: '€€€',
      category: 'Arroces & Cocina de mercado',
      accolades: 'Referente histórico en Murcia',
      description: 'Arroz con bogavante, marisco fresco de lonja y verduras de temporada con una relación calidad-precio excepcional.',
      lat: 37.9842,
      lng: -1.1305,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Alborada+Murcia'
    },
    {
      id: 'rec-localensayo',
      name: 'Local de Ensayo',
      city: 'Murcia',
      zone: 'Calle Policía Ángel García, 20',
      rating: 4.7,
      reviewsCount: 960,
      price: '€€€€',
      category: 'Cocina creativa de proximidad',
      accolades: '1 Sol Repsol',
      description: 'Experiencia gastronómica sensorial guiada por hortalizas ecológicas de la huerta, setas silvestres y fondos intensos.',
      lat: 37.9947,
      lng: -1.1251,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Local+de+Ensayo+Murcia'
    },
    {
      id: 'rec-tapeoteca',
      name: 'La Tapeoteca',
      city: 'Murcia',
      zone: 'Plaza San Pedro, 3',
      rating: 4.6,
      reviewsCount: 2240,
      price: '€€',
      category: 'Tapas de autor contemporáneas',
      accolades: 'Tapeo de culto en el centro',
      description: 'Tapeo creativo e informal en pleno casco histórico: famosos raviolis de rabo de toro, brioches de autor y guiños internacionales.',
      lat: 37.9861,
      lng: -1.1332,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=La+Tapeoteca+Murcia'
    },
    {
      id: 'rec-toneles',
      name: 'Bodegón Los Toneles',
      city: 'Murcia',
      zone: 'Calle Cánovas del Castillo, 7',
      rating: 4.6,
      reviewsCount: 3100,
      price: '€',
      category: 'Tasca murciana tradicional',
      accolades: 'Tasca clásica de la huerta',
      description: 'Pisto murciano, michirones a fuego lento, montaditos caseros y ensaladas de la huerta con décadas de tradición.',
      lat: 37.9870,
      lng: -1.1310,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Bodegon+Los+Toneles+Murcia'
    },
    {
      id: 'rec-pasaje-zabalburu',
      name: 'El Pasaje de Zabalburu',
      city: 'Murcia',
      zone: 'Plaza San Pedro, 3',
      rating: 4.6,
      reviewsCount: 2600,
      price: '€€',
      category: 'Alta cocina en formato tapa',
      accolades: 'Tapas gastronómicas premiadas',
      description: 'Tapas de alta cocina con materias primas nobles, alcachofas confitadas, caballitos crujientes y maridajes selectos.',
      lat: 37.9859,
      lng: -1.1330,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=El+Pasaje+de+Zabalburu+Murcia'
    },
    {
      id: 'rec-taulla',
      name: 'Taúlla',
      city: 'Murcia',
      zone: 'Calle Antonio Flores Guillamón, 2 (Espinardo)',
      rating: 4.6,
      reviewsCount: 1420,
      price: '€€€',
      category: 'Cocina tradicional renovada & Brasas',
      accolades: 'Espacio singular en molino histórico',
      description: 'Antiguo molino harinero rehabilitado con pucheros a fuego lento, verduras selectas de la comarca y carnes nobles a la brasa.',
      lat: 38.0083,
      lng: -1.1542,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Taulla+Murcia'
    },
    {
      id: 'rec-odiseo',
      name: 'Odiseo',
      city: 'Murcia',
      zone: 'Avenida Juan de Borbón, 224',
      rating: 4.6,
      reviewsCount: 2850,
      price: '€€€€',
      category: 'Fusión mediterránea de vanguardia',
      accolades: 'Estrella Michelin',
      description: 'Puesta en escena deslumbrante con alta cocina mediterránea de autor, coctelería premiada y arquitectura de vanguardia.',
      lat: 38.0162,
      lng: -1.1417,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Odiseo+Murcia'
    },
    {
      id: 'rec-cabana-buenavista',
      name: 'Cabaña Buenavista',
      city: 'Murcia',
      zone: 'Urbanización Buenavista, s/n (El Palmar)',
      rating: 4.7,
      reviewsCount: 1250,
      price: '€€€€',
      category: 'Alta gastronomía de autor',
      accolades: '2 Estrellas Michelin · 3 Soles Repsol',
      description: 'Máximo exponente gastronómico regional liderado por el chef Pablo González-Conejero en un idílico entorno natural.',
      lat: 37.9422,
      lng: -1.1561,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Cabana+Buenavista+El+Palmar'
    },
    {
      id: 'rec-parrilla-baco',
      name: 'Parrilla Baco',
      city: 'Murcia',
      zone: 'Calle del Pilar, 3',
      rating: 4.6,
      reviewsCount: 1500,
      price: '€€',
      category: 'Carnes a la brasa & Asador',
      accolades: 'Especialistas en brasa de encina',
      description: 'Cortes seleccionados de ternera y cerdo ibérico a la brasa de carbón vegetal, guarniciones caseras y empanadas.',
      lat: 37.9885,
      lng: -1.1290,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Parrilla+Baco+Murcia'
    },
    {
      id: 'rec-uva-jumillana',
      name: 'La Uva Jumillana',
      city: 'Cartagena',
      zone: 'Calle del Carmen, 73',
      rating: 4.3,
      reviewsCount: 1950,
      price: '€',
      category: 'Tasca marinera & Michirones',
      accolades: 'Tasca histórica desde 1917',
      description: 'Tradición viva desde hace más de un siglo: calderos de michirones, marineras, rollicos de carne y vinos de la tierra a precios muy populares.',
      lat: 37.6071,
      lng: -0.9856,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=La+Uva+Jumillana+Cartagena'
    },
    {
      id: 'rec-soldadito-plomo',
      name: 'El Soldadito de Plomo',
      city: 'Cartagena',
      zone: 'Calle Príncipe de Vergara, 1',
      rating: 4.4,
      reviewsCount: 1680,
      price: '€',
      category: 'Cafetería cultural & Tostas gourmet',
      accolades: 'Rincón bohemio y tostas caseras',
      description: 'Espacio cultural singular rodeado de libros, tostas creativas con pan artesano, ensaladas frescas, cafés especiales y cervezas artesanas.',
      lat: 37.6002,
      lng: -0.9821,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=El+Soldadito+de+Plomo+Cartagena'
    },
    {
      id: 'rec-mejillonera',
      name: 'Cervecería La Mejillonera',
      city: 'Cartagena',
      zone: 'Calle Mayor, 4',
      rating: 4.2,
      reviewsCount: 2300,
      price: '€',
      category: 'Cervecería & Mejillones al vapor',
      accolades: 'Clásico popular de tapeo rápido',
      description: 'Mejillones tigre, al vapor y con salsa brava casera, patatas fritas al momento y caña bien tirada en pleno eje peatonal de la Calle Mayor.',
      lat: 37.5995,
      lng: -0.9860,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=La+Mejillonera+Cartagena'
    },
    {
      id: 'rec-rino',
      name: 'Pizzería Da Rino',
      city: 'Cartagena',
      zone: 'Calle San Fernando, 55',
      rating: 4.4,
      reviewsCount: 1120,
      price: '€€',
      category: 'Pizzería & Trattoria italiana',
      accolades: 'Pizzas al horno de piedra',
      description: 'Auténtica masa fina y crujiente al horno de piedra, pastas frescas rellenas, carpaccios y tiramisú tradicional en acogedor ambiente.',
      lat: 37.6042,
      lng: -0.9829,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Pizzeria+Da+Rino+Cartagena'
    },
    {
      id: 'rec-marenostrum',
      name: 'Restaurante Mare Nostrum',
      city: 'Cartagena',
      zone: 'Paseo Alfonso XII (Puerto)',
      rating: 4.3,
      reviewsCount: 1450,
      price: '€€€',
      category: 'Marisquería & Arroces del puerto',
      accolades: 'Terraza sobre la dársena marítima',
      description: 'Pescados frescos capturados a diario en la costa, gamba roja a la plancha, frituras andaluzas y caldero frente a los barcos del puerto.',
      lat: 37.5985,
      lng: -0.9830,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Mare+Nostrum+Cartagena'
    },
    {
      id: 'rec-rinconcito-carmen',
      name: 'El Rincón de Carmen',
      city: 'Cartagena',
      zone: 'Calle del Carmen, 28',
      rating: 4.5,
      reviewsCount: 890,
      price: '€',
      category: 'Montaditos & Tapeo casero',
      accolades: 'Excelente relación calidad-precio',
      description: 'Gran surtido de montaditos crujientes, tapas recién preparadas, ensaladilla de marisco y atmósfera cálida a precios muy asequibles.',
      lat: 37.6052,
      lng: -0.9854,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=El+Rincon+de+Carmen+Cartagena'
    },
    {
      id: 'rec-zagales',
      name: 'Bar Los Zagales',
      city: 'Murcia',
      zone: 'Calle Saavedra Fajardo, 1',
      rating: 4.3,
      reviewsCount: 4200,
      price: '€',
      category: 'Templo del tapeo murciano',
      accolades: 'Institución gastronómica de la catedral',
      description: 'Famosos caballitos crujientes, tigres, zarangollo caliente, morcilla de verano y tapas históricas en la barra más legendaria de Murcia.',
      lat: 37.9853,
      lng: -1.1292,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Bar+Los+Zagales+Murcia'
    },
    {
      id: 'rec-pequena-taberna',
      name: 'La Pequeña Taberna',
      city: 'Murcia',
      zone: 'Plaza San Juan, 7',
      rating: 4.5,
      reviewsCount: 2150,
      price: '€€€',
      category: 'Cocina de mercado & Huerta murciana',
      accolades: 'Recomendado Guía Repsol',
      description: 'Alcachofas de la huerta célebres, revueltos artesanos, jamón ibérico de bellota y pescados nobles con servicio impecable.',
      lat: 37.9838,
      lng: -1.1265,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=La+Pequena+Taberna+Murcia'
    },
    {
      id: 'rec-fenix',
      name: 'El Fénix Gastrobar',
      city: 'Murcia',
      zone: 'Plaza de Santa Catalina, 2',
      rating: 4.4,
      reviewsCount: 1650,
      price: '€€',
      category: 'Tapas creativas & Hamburguesas',
      accolades: 'Terraza animada en Plaza Santa Catalina',
      description: 'Hamburguesas gourmet de buey y vaca madurada, croquetas caseras de jamón ibérico, tostas y cócteles en animada plaza peatonal.',
      lat: 37.9863,
      lng: -1.1328,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=El+Fenix+Murcia'
    },
    {
      id: 'rec-imperial',
      name: 'Pizzería Imperial',
      city: 'Murcia',
      zone: 'Calle Sociedad, 1',
      rating: 4.3,
      reviewsCount: 1800,
      price: '€',
      category: 'Pizzas al corte & Pasta clásica',
      accolades: 'La pizzería más antigua de Murcia',
      description: 'Pizzas artesanas con receta tradicional italiana desde hace más de cuatro décadas, calzones generosos y precios muy ajustados.',
      lat: 37.9845,
      lng: -1.1302,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Pizzeria+Imperial+Murcia'
    },
    {
      id: 'rec-latapa-flores',
      name: 'La Tapa',
      city: 'Murcia',
      zone: 'Plaza de las Flores, 13',
      rating: 4.2,
      reviewsCount: 3400,
      price: '€€',
      category: 'Pulpo al horno & Marineras',
      accolades: 'Epicentro del aperitivo murciano',
      description: 'Pulpo al horno con patatas al estilo de la huerta, marineras con anchoa del Cantábrico y cañas frías en la terraza más concurrida.',
      lat: 37.9858,
      lng: -1.1336,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=La+Tapa+Plaza+Flores+Murcia'
    },
    {
      id: 'rec-hispano',
      name: 'Restaurante Hispano',
      city: 'Murcia',
      zone: 'Calle Arquitectos Cerdán y Belando, 7',
      rating: 4.4,
      reviewsCount: 1550,
      price: '€€€',
      category: 'Guisos tradicionales & Arroces',
      accolades: 'Clásico burgués de cocina regional',
      description: 'Arroz con conejo y caracoles serranos, guisos de legumbre a fuego lento, verduras seleccionadas de la comarca y repostería casera.',
      lat: 37.9877,
      lng: -1.1318,
      googleUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Hispano+Murcia'
    }
  ];

  function getRecommendedCandidates() {
    let center = state.userCoords || { lat: 37.6000, lng: -0.9850 };
    const query = normalizeSearchText(state.recommendedCityQuery);
    let centerLabel = state.userCoords ? 'tu ubicación actual' : 'Cartagena';

    if (query) {
      for (const key in KNOWN_CITY_COORDS) {
        if (query.includes(key) || key.includes(query)) {
          center = KNOWN_CITY_COORDS[key];
          centerLabel = KNOWN_CITY_COORDS[key].name;
          break;
        }
      }
    }

    let list = RECOMMENDED_RESTAURANTS_POOL.map(function (r) {
      const dist = calculateDistanceKm(center.lat, center.lng, r.lat, r.lng);
      return Object.assign({}, r, { computedDistanceKm: dist });
    });

    // 1. Filtro por valoración mínima en Google (por defecto 4.5, ajustable a 4.3, 4.0 o 0)
    const minRating = typeof state.recommendedMinRating === 'number' ? state.recommendedMinRating : 4.5;
    if (minRating > 0) {
      list = list.filter(function (r) {
        return r.rating >= minRating;
      });
    }

    // 2. Filtro por precio (€, €€, €€€, €€€€)
    if (state.recommendedPrice && state.recommendedPrice !== 'all') {
      list = list.filter(function (r) {
        return r.price === state.recommendedPrice;
      });
    }

    // 3. Filtro por búsqueda de ciudad o zona
    if (query) {
      list = list.filter(function (r) {
        const cityNorm = normalizeSearchText(r.city);
        const zoneNorm = normalizeSearchText(r.zone);
        const nameNorm = normalizeSearchText(r.name);
        const catNorm = normalizeSearchText(r.category);
        return cityNorm.includes(query) || zoneNorm.includes(query) || nameNorm.includes(query) || catNorm.includes(query);
      });
    }

    // 4. Filtro por distancia máxima
    if (state.recommendedMaxDistance !== null && typeof state.recommendedMaxDistance === 'number') {
      list = list.filter(function (r) {
        return r.computedDistanceKm <= state.recommendedMaxDistance;
      });
    }

    // Ordenar de más cercano a más lejano
    list.sort(function (a, b) {
      return a.computedDistanceKm - b.computedDistanceKm;
    });

    return { list: list, center: center, centerLabel: centerLabel };
  }

  function getRecommendedDisplayList() {
    const data = getRecommendedCandidates();
    const list = data.list;
    const total = list.length;
    const limit = state.recommendedLimit || 5;
    const items = list.slice(0, limit);
    return {
      items: items,
      total: total,
      limit: limit,
      hasMore: limit < total,
      centerLabel: data.centerLabel
    };
  }

  const SECRET_MISSIONS_POOL = [
    'Quien haya usado el Veto o haya perdido la moneda invita a los postres.',
    'Pedid al menos un producto o complemento de la carta que ninguno de los dos haya probado nunca.',
    'Quien pierda la moneda tiene que ir a la barra a hacer el pedido o recoger la bandeja.',
    'Elegid una salsa o acompañamiento al azar para compartir.',
    'El primero que mire las notificaciones del móvil durante la comida invita al café.',
    'Antes de dar el primer bocado, hay que brindar por la decisión.',
    'Quien acertó la apuesta en la app tiene derecho a elegir qué postre o bebida pedir.',
    'Haced una foto graciosa del ticket o de la bandeja para el recuerdo.'
  ];

  const app = document.getElementById('app');
  const toastEl = document.getElementById('toast');
  const modalContainer = document.getElementById('modal-container');

  function showToast(message, duration) {
    if (!toastEl) return;
    toastEl.innerHTML =
      '<svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' +
      '<span>' + message + '</span>';
    toastEl.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(function () {
      toastEl.classList.add('opacity-0', 'pointer-events-none');
    }, duration || 2500);
  }

  function init() {
    state.restaurants = getRestaurants();
    setupPwaBanner();
    render();
  }

  function setupPwaBanner() {
    const banner = document.getElementById('ios-install-banner');
    const closeBtn = document.getElementById('btn-close-install');
    if (!banner || !closeBtn) return;

    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    const isDismissed = localStorage.getItem('donde_comemos_banner_dismissed') === 'true';

    if (!isStandalone && !isDismissed) {
      setTimeout(function () {
        banner.classList.remove('hidden');
      }, 1500);
    }

    closeBtn.addEventListener('click', function () {
      banner.classList.add('hidden');
      localStorage.setItem('donde_comemos_banner_dismissed', 'true');
    });
  }

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
      case 'recommended':
        renderRecommendedScreen();
        break;
      default:
        renderHomeScreen();
    }
  }

  // ==========================================
  // 5. PANTALLA DE INICIO (HOME) - APPLE HIG DECLUTTERED
  // ==========================================
  function renderHomeScreen() {
    const hasLastWinner = state.lastWinnerId && state.lastWinnerName;
    const visits = getFoodDiary();

    app.innerHTML = `
      <div class="mobile-shell px-6 justify-between animate-view-enter">
        <div class="pt-10 text-center flex flex-col items-center">
          <div class="w-20 h-20 rounded-[24px] p-0.5 shadow-2xl shadow-indigo-500/20 mb-3 flex items-center justify-center">
            <img src="./duo_icon.svg" alt="Duo" class="w-full h-full object-contain filter drop-shadow-xl" />
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-1 flex items-center justify-center gap-2">
            <span>Duo</span>
          </h1>
          <p class="text-neutral-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
            Votad en secreto a dos turnos y encontrad el plan o sitio ideal sin discutir.
          </p>
        </div>

        <div class="ios-glass p-5 rounded-[26px] my-3 space-y-3.5">
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

          ${
            hasLastWinner
              ? `
              <div class="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <div class="text-left pr-2">
                  <div class="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                    <span>Historial reciente</span>
                  </div>
                  <div class="text-[10px] text-neutral-400">
                    Última vez: <strong class="text-white">${state.lastWinnerName}</strong>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="toggle-avoid-last" class="sr-only peer" ${state.avoidLastWinner ? 'checked' : ''}>
                  <div class="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  <span class="ml-2 text-[10px] font-semibold text-neutral-300">No repetir</span>
                </label>
              </div>
            `
              : ''
          }
        </div>

        <!-- Zona de acción limpia: CTA Único Dominante + Acciones Secundarias agrupadas -->
        <div class="space-y-3 pb-4">
          <button 
            id="btn-start" 
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#FF2D55] via-[#FF375F] to-[#FF9F0A] shadow-xl shadow-rose-500/25 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
          >
            <span>Comenzar votación</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>

          <!-- Botón de menú secundario discreto y elegante -->
          <button 
            id="btn-open-more-actions" 
            class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] active:scale-[0.98] transition flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>Más opciones y modos rápidos</span>
            <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>

          <div class="ios-home-indicator"></div>
        </div>
      </div>

      <!-- Action Sheet estilo iOS para Acciones Secundarias de Home -->
      <div id="home-actions-sheet" class="${state.showHomeActionsSheet ? 'flex' : 'hidden'} fixed inset-0 z-50 items-end justify-center bg-black/75 backdrop-blur-md p-0 sm:p-4 animate-ios-slide">
        <div class="bg-neutral-950/95 border-t border-white/[0.12] w-full max-w-md rounded-t-[30px] sm:rounded-[30px] p-5 pb-8 shadow-2xl space-y-3">
          <div class="w-10 h-1 bg-white/25 rounded-full mx-auto mb-2"></div>
          
          <div class="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div>
              <h3 class="text-sm font-bold text-white">Opciones Rápidas</h3>
              <p class="text-[11px] text-neutral-400">Herramientas y modos alternativos</p>
            </div>
            <button id="btn-close-actions-sheet" class="w-7 h-7 rounded-full bg-white/[0.08] text-neutral-300 hover:text-white flex items-center justify-center transition">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="space-y-2 pt-1">
            <!-- Acción 0: Sitios recomendados (>4.5 Google) -->
            <button 
              id="btn-sheet-recommended" 
              class="w-full py-3.5 px-4 rounded-2xl text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 active:scale-[0.98] transition flex items-center justify-between text-left"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <svg class="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div>
                  <div class="font-bold flex items-center gap-1.5">
                    <span>Sitios recomendados</span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">+4.5 Google</span>
                  </div>
                  <div class="text-[10px] text-amber-300/70 font-normal">Sugerencias por tu ubicación o búsqueda de ciudad</div>
                </div>
              </div>
              <svg class="w-4 h-4 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Acción 1: Sorpréndenos directamente -->
            <button 
              id="btn-instant-surprise" 
              class="w-full py-3.5 px-4 rounded-2xl text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 active:scale-[0.98] transition flex items-center justify-between text-left"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle>
                    <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"></circle>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
                    <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"></circle>
                    <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"></circle>
                  </svg>
                </div>
                <div>
                  <div class="font-bold">Sorpréndenos directamente</div>
                  <div class="text-[10px] text-amber-300/70 font-normal">Ruleta express a ciegas sin pasar por votación</div>
                </div>
              </div>
              <svg class="w-4 h-4 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Acción 2: Historial / Food Diary -->
            <button 
              id="btn-food-diary" 
              class="w-full py-3 px-4 rounded-2xl text-xs font-semibold text-neutral-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] active:scale-[0.98] transition flex items-center justify-between text-left"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <div>
                  <div class="font-bold">Historial de visitas</div>
                  <div class="text-[10px] text-neutral-400 font-normal">${visits.length} visitas registradas</div>
                </div>
              </div>
              <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <!-- Acción 4: Gestión de restaurantes -->
            <button 
              id="btn-manage" 
              class="w-full py-3 px-4 rounded-2xl text-xs font-semibold text-neutral-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] active:scale-[0.98] transition flex items-center justify-between text-left"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-neutral-300 shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-bold">Gestionar restaurantes</div>
                  <div class="text-[10px] text-neutral-400 font-normal">${state.restaurants.length} disponibles en catálogo</div>
                </div>
              </div>
              <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    const btnToggleSound = document.getElementById('btn-toggle-sound');
    if (btnToggleSound) {
      btnToggleSound.addEventListener('click', function () {
        state.soundMuted = sound.toggleMute();
        sound.vibrate([30]);
        if (!state.soundMuted) sound.playPop();
        renderHomeScreen();
      });
    }

    document.getElementById('input-p1').addEventListener('input', function (e) {
      state.player1Name = e.target.value.trim() || 'Jugador 1';
      localStorage.setItem('donde_comemos_p1_name', state.player1Name);
    });

    document.getElementById('input-p2').addEventListener('input', function (e) {
      state.player2Name = e.target.value.trim() || 'Jugador 2';
      localStorage.setItem('donde_comemos_p2_name', state.player2Name);
    });

    const toggleAvoid = document.getElementById('toggle-avoid-last');
    if (toggleAvoid) {
      toggleAvoid.addEventListener('change', function (e) {
        state.avoidLastWinner = e.target.checked;
        localStorage.setItem('donde_comemos_avoid_last', state.avoidLastWinner);
        sound.playPop();
        if (state.avoidLastWinner) {
          showToast('Descartado ' + state.lastWinnerName + ' de esta ronda');
        } else {
          showToast('Incluidos todos los restaurantes');
        }
      });
    }

    document.getElementById('btn-start').addEventListener('click', function () {
      sound.init();
      sound.playWhoosh();
      sound.vibrate([40]);
      state.player1Selections.clear();
      state.player2Selections.clear();
      state.player1Veto = null;
      state.player2Veto = null;
      state.player1Superlike = null;
      state.player2Superlike = null;
      state.selectedCategory = 'all';
      state.roundAttempt = 1;
      state.tieBreakerUser = null;
      state.clueIndex = 0;
      state.p1Guess = null;
      state.p2Guess = null;
      state.payerWinner = null;
      state.showHomeActionsSheet = false;
      state.activeResultTab = 'destiny';
      state.screen = 'player1';
      render();
    });

    const btnSheetRec = document.getElementById('btn-sheet-recommended');
    if (btnSheetRec) {
      btnSheetRec.addEventListener('click', function () {
        state.showHomeActionsSheet = false;
        sound.playPop();
        sound.vibrate([30]);
        state.screen = 'recommended';
        render();
      });
    }

    const btnOpenMore = document.getElementById('btn-open-more-actions');
    if (btnOpenMore) {
      btnOpenMore.addEventListener('click', function () {
        sound.playPop();
        state.showHomeActionsSheet = true;
        renderHomeScreen();
      });
    }

    const btnCloseSheet = document.getElementById('btn-close-actions-sheet');
    if (btnCloseSheet) {
      btnCloseSheet.addEventListener('click', function () {
        sound.playPop();
        state.showHomeActionsSheet = false;
        renderHomeScreen();
      });
    }

    const sheetBackdrop = document.getElementById('home-actions-sheet');
    if (sheetBackdrop) {
      sheetBackdrop.addEventListener('click', function (e) {
        if (e.target === sheetBackdrop) {
          state.showHomeActionsSheet = false;
          renderHomeScreen();
        }
      });
    }

    // MODO RULETA RUSA / SORPRÉNDENOS DIRECTAMENTE
    const btnInstant = document.getElementById('btn-instant-surprise');
    if (btnInstant) {
      btnInstant.addEventListener('click', async function () {
        state.showHomeActionsSheet = false;
        sound.init();
        sound.playWhoosh();
        sound.vibrate([50]);
        
        const pool = state.restaurants.filter(function (r) {
          if (state.avoidLastWinner && state.lastWinnerId === r.id) return false;
          return true;
        });

        const candidateList = pool.length > 0 ? pool : state.restaurants;
        const winner = candidateList[Math.floor(Math.random() * candidateList.length)];
        
        state.player1Selections.clear();
        state.player2Selections.clear();
        state.player1Veto = null;
        state.player2Veto = null;
        state.player1Superlike = null;
        state.player2Superlike = null;
        state.matchesCount = candidateList.length;
        state.winningRestaurant = winner;
        state.lastWinnerId = winner.id;
        state.lastWinnerName = winner.name;
        localStorage.setItem('donde_comemos_last_winner_id', winner.id);
        localStorage.setItem('donde_comemos_last_winner_name', winner.name);

        if (!state.userCoords) {
          state.userCoords = await getUserLocation();
        }

        state.winningBranch = findClosestBranch(winner, state.userCoords);
        state.isNameRevealed = false;
        state.showClues = false;
        state.clueIndex = 0;
        state.p1Guess = null;
        state.p2Guess = null;
        state.payerWinner = null;
        state.activeResultTab = 'destiny';
        state.activeChallenge = null;
        state.tieBreakerUser = 'Modo Ruleta Rusa Directa';
        state.screen = 'result';
        render();
      });
    }

    const btnFoodDiary = document.getElementById('btn-food-diary');
    if (btnFoodDiary) {
      btnFoodDiary.addEventListener('click', function () {
        state.showHomeActionsSheet = false;
        sound.playPop();
        openDiaryModal();
      });
    }

    const btnManage = document.getElementById('btn-manage');
    if (btnManage) {
      btnManage.addEventListener('click', function () {
        state.showHomeActionsSheet = false;
        sound.playPop();
        openManageModal();
      });
    }
  }

  // ==========================================
  // 6. PANTALLA DE JUGADOR (DOS TARJETAS POR FILA: GRID-COLS-2)
  // ==========================================
  function renderPlayerScreen(playerNum) {
    const isP1 = playerNum === 1;
    const playerName = isP1 ? state.player1Name : state.player2Name;
    const currentSelections = isP1 ? state.player1Selections : state.player2Selections;
    const currentVeto = isP1 ? state.player1Veto : state.player2Veto;
    const currentSuperlike = isP1 ? state.player1Superlike : state.player2Superlike;

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

    const displayedRestaurants = state.restaurants.filter(function (r) {
      if (state.avoidLastWinner && state.lastWinnerId === r.id) {
        return false;
      }
      return true;
    });

    app.innerHTML = `
      <div class="mobile-shell flex flex-col justify-between">
        <div class="px-5 pt-3 pb-2.5 sticky top-0 z-20 bg-black/85 backdrop-blur-2xl border-b border-white/[0.08]">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <button 
                id="btn-player-back" 
                class="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] flex items-center justify-center text-neutral-300 hover:text-white active:scale-95 transition shrink-0"
                title="${isP1 ? 'Volver a inicio' : 'Volver al turno anterior'}"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}">
                <span class="w-2 h-2 rounded-full ${isP1 ? 'bg-[#FF2D55]' : 'bg-[#5E5CE6]'} animate-pulse"></span>
                Turno: ${playerName}
              </div>
            </div>
            <div class="flex items-center gap-2">
              ${state.roundAttempt > 1 ? '<span class="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">Ronda 2</span>' : ''}
              <div class="text-xs font-semibold px-2.5 py-1 rounded-xl ${theme.counterBg} shadow-md transition flex items-center gap-1">
                <span id="selected-counter">${currentSelections.size}</span>
                <span class="text-[10px] opacity-80">elegidos</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-neutral-400">
            <span>Toca para elegir. Botones superiores para superlike y veto:</span>
          </div>

          <!-- Indicadores Veto & Superlike -->
          <div class="mt-2 flex items-center gap-2 text-[10px] font-semibold">
            <div class="px-2.5 py-0.5 rounded-full border transition flex items-center gap-1.5 ${currentVeto ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-white/5 text-neutral-400 border-white/10'}">
              <svg class="w-3 h-3 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
              <span>Veto:</span>
              <span class="font-normal opacity-85">${currentVeto ? '1 usado' : '1 disponible'}</span>
            </div>
            <div class="px-2.5 py-0.5 rounded-full border transition flex items-center gap-1.5 ${currentSuperlike ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/5 text-neutral-400 border-white/10'}">
              <svg class="w-3 h-3 text-amber-400 fill-amber-400/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>Superlike:</span>
              <span class="font-normal opacity-85">${currentSuperlike ? '1 usado (x2)' : '1 disponible'}</span>
            </div>
          </div>
        </div>

        <div class="px-4 py-4 grid grid-cols-2 gap-3.5 flex-1 content-start pb-28">
          ${displayedRestaurants
            .map(function (r) {
              const isSelected = currentSelections.has(r.id);
              const isVetoed = (isP1 ? state.player1Veto : state.player2Veto) === r.id;
              const isSuper = (isP1 ? state.player1Superlike : state.player2Superlike) === r.id;
              const logoSrc = r.logo || r.image;

              let cardClass = isSelected ? theme.selectedClass : '';
              if (isVetoed) cardClass = 'card-vetoed opacity-65';
              if (isSuper) cardClass = 'card-superliked';

              return `
                <div 
                  data-id="${r.id}"
                  class="ios-glass-card p-3 flex flex-col items-center justify-between min-h-[195px] ${cardClass}"
                >
                  <div class="w-full flex items-center justify-between mb-1">
                    <div class="flex items-center gap-1">
                      <button 
                        data-action="superlike" 
                        data-id="${r.id}" 
                        title="Superlike (Doble probabilidad)"
                        class="btn-card-superlike w-6 h-6 rounded-full flex items-center justify-center text-xs transition active:scale-90 ${isSuper ? 'bg-amber-500 text-black shadow-md font-bold' : 'bg-white/10 text-neutral-400 hover:text-amber-400'}"
                      >
                        <svg class="w-3 h-3 ${isSuper ? 'fill-black stroke-black' : 'fill-none stroke-current'}" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      </button>
                      <button 
                        data-action="veto" 
                        data-id="${r.id}" 
                        title="Veto (Bloquear restaurante)"
                        class="btn-card-veto w-6 h-6 rounded-full flex items-center justify-center text-xs transition active:scale-90 ${isVetoed ? 'bg-rose-500 text-white shadow-md font-bold' : 'bg-white/10 text-neutral-400 hover:text-rose-400'}"
                      >
                        <svg class="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                      </button>
                    </div>

                    <div class="ios-check ${isSelected ? theme.checkClass : 'ios-check-unselected'} check-badge pointer-events-none">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div class="w-[74px] h-[74px] rounded-[22px] p-1.5 flex items-center justify-center my-auto drop-shadow-md pointer-events-none">
                    <img 
                      src="${logoSrc}" 
                      alt="${r.name}" 
                      class="w-full h-full object-contain filter drop-shadow-sm"
                      loading="lazy"
                      onerror="this.src='${r.image}'"
                    />
                  </div>

                  <div class="w-full text-center mt-1.5 pointer-events-none">
                    <div class="font-bold text-[14px] text-white truncate leading-tight flex items-center justify-center gap-1">
                      <span>${r.name}</span>
                      ${isSuper ? '<svg class="w-3 h-3 text-amber-400 fill-amber-400 inline" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>' : ''}
                      ${isVetoed ? '<svg class="w-3 h-3 text-rose-400 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>' : ''}
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

        <div class="sticky bottom-0 z-20 px-4 pt-3 floating-bottom-bar border-t border-white/[0.08]">
          <button 
            id="btn-confirm-turn" 
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white ${theme.btnBg} shadow-xl active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
          >
            <span>Confirmar selecciones</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </button>
          <div class="ios-home-indicator"></div>
        </div>
      </div>
    `;

    document.querySelectorAll('.ios-glass-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('button[data-action]')) return;
        const id = card.dataset.id;

        if ((isP1 ? state.player1Veto : state.player2Veto) === id) {
          showToast('Has vetado este sitio. Quita el veto para seleccionarlo.');
          sound.playVeto();
          sound.vibrate([40]);
          return;
        }

        if (currentSelections.has(id)) {
          currentSelections.delete(id);
          card.classList.remove(theme.selectedClass);
          const checkEl = card.querySelector('.check-badge');
          if (checkEl) {
            checkEl.className = 'ios-check ios-check-unselected check-badge pointer-events-none';
          }
        } else {
          currentSelections.add(id);
          card.classList.add(theme.selectedClass);
          const checkEl = card.querySelector('.check-badge');
          if (checkEl) {
            checkEl.className = 'ios-check ' + theme.checkClass + ' check-badge pointer-events-none';
          }
        }
        sound.playPop();
        sound.vibrate([20]);

        // Actualizar contador superior en tiempo real sin recargar la pantalla
        const counterEl = document.getElementById('selected-counter');
        if (counterEl) {
          counterEl.textContent = currentSelections.size;
        }
      });
    });

    document.querySelectorAll('.btn-card-veto').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (isP1) {
          if (state.player1Veto === id) {
            state.player1Veto = null;
            showToast('Veto retirado');
          } else {
            state.player1Veto = id;
            state.player1Selections.delete(id);
            if (state.player1Superlike === id) state.player1Superlike = null;
            sound.playVeto();
            sound.vibrate([60]);
            showToast('Veto aplicado');
          }
        } else {
          if (state.player2Veto === id) {
            state.player2Veto = null;
            showToast('Veto retirado');
          } else {
            state.player2Veto = id;
            state.player2Selections.delete(id);
            if (state.player2Superlike === id) state.player2Superlike = null;
            sound.playVeto();
            sound.vibrate([60]);
            showToast('Veto aplicado');
          }
        }
        renderPlayerScreen(playerNum);
      });
    });

    document.querySelectorAll('.btn-card-superlike').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (isP1) {
          if (state.player1Superlike === id) {
            state.player1Superlike = null;
            showToast('Superlike retirado');
          } else {
            state.player1Superlike = id;
            state.player1Selections.add(id);
            if (state.player1Veto === id) state.player1Veto = null;
            sound.playSuperlike();
            sound.vibrate([40, 40]);
            showToast('Superlike: doble voto');
          }
        } else {
          if (state.player2Superlike === id) {
            state.player2Superlike = null;
            showToast('Superlike retirado');
          } else {
            state.player2Superlike = id;
            state.player2Selections.add(id);
            if (state.player2Veto === id) state.player2Veto = null;
            sound.playSuperlike();
            sound.vibrate([40, 40]);
            showToast('Superlike: doble voto');
          }
        }
        renderPlayerScreen(playerNum);
      });
    });

    const btnPlayerBack = document.getElementById('btn-player-back');
    if (btnPlayerBack) {
      btnPlayerBack.addEventListener('click', function () {
        sound.playPop();
        sound.vibrate([25]);
        if (isP1) {
          state.screen = 'home';
        } else {
          state.screen = 'handover';
        }
        render();
      });
    }

    document.getElementById('btn-confirm-turn').addEventListener('click', function () {
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
  // 7. PANTALLA DE TRASPASO (HANDOVER)
  // ==========================================
  function renderHandoverScreen() {
    app.innerHTML = `
      <div class="mobile-shell px-6 justify-between text-center animate-ios-slide">
        <div class="pt-10">
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

        <div class="pb-4 space-y-2.5">
          <button 
            id="btn-ready-p2" 
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#5E5CE6] via-[#0A84FF] to-[#30D158] shadow-xl shadow-indigo-500/25 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
          >
            <span>Soy ${state.player2Name}, continuar</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>

          <button 
            id="btn-handover-back" 
            class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Volver a la selección de ${state.player1Name}</span>
          </button>

          <div class="ios-home-indicator"></div>
        </div>
      </div>
    `;

    document.getElementById('btn-ready-p2').addEventListener('click', function () {
      sound.playWhoosh();
      sound.vibrate([40]);
      state.screen = 'player2';
      render();
    });

    document.getElementById('btn-handover-back').addEventListener('click', function () {
      sound.playPop();
      sound.vibrate([25]);
      state.screen = 'player1';
      render();
    });
  }

  // ==========================================
  // 8. PANTALLA DE MATCHING & RULETA DE SUSPENSE
  // ==========================================
  function renderMatchingScreen() {
    app.innerHTML = `
      <div class="mobile-shell px-6 justify-center items-center text-center">
        <div class="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FF2D55] via-[#5E5CE6] to-[#0A84FF] flex items-center justify-center mb-6 shadow-2xl p-1 animate-shimmer" id="roulette-container">
          <div class="w-full h-full bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/25">
            <img id="roulette-logo" src="./mcdonalds.png" class="w-14 h-14 object-contain filter drop-shadow" />
          </div>
        </div>

        <h2 class="text-2xl font-extrabold text-white mb-2" id="roulette-title">
          Buscando coincidencias...
        </h2>
        <p class="text-xs sm:text-sm text-neutral-400 max-w-xs leading-relaxed" id="roulette-subtitle">
          Cruzando votos, aplicando vetos y localizando la sucursal más cercana en Cartagena o Murcia...
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
    const interval = setInterval(function () {
      const logoEl = document.getElementById('roulette-logo');
      if (logoEl) {
        logoEl.src = logos[tickCount % logos.length];
      }
      sound.playTick();
      tickCount++;
    }, 140);

    getUserLocation().then(function (coords) {
      state.userCoords = coords;
    });

    setTimeout(async function () {
      clearInterval(interval);

      // 1. Coincidencias brutas (ambos han seleccionado)
      const rawMatches = Array.from(state.player1Selections).filter(function (id) {
        return state.player2Selections.has(id);
      });

      // 2. Aplicar VETOS: Si alguno lo vetó, queda completamente descartado
      const validMatches = rawMatches.filter(function (id) {
        return id !== state.player1Veto && id !== state.player2Veto;
      });

      state.matchesCount = validMatches.length;

      if (validMatches.length > 0) {
        // 3. Ponderación por SUPERLIKE: si tiene superlike de P1 o P2, entra doble (o triple si de ambos)
        const lotteryPool = [];
        validMatches.forEach(function (id) {
          lotteryPool.push(id);
          if (state.player1Superlike === id) {
            lotteryPool.push(id); // Voto doble
          }
          if (state.player2Superlike === id) {
            lotteryPool.push(id); // Voto doble
          }
        });

        const randomIndex = Math.floor(Math.random() * lotteryPool.length);
        const winnerId = lotteryPool[randomIndex];
        state.winningRestaurant = state.restaurants.find(function (r) { return r.id === winnerId; });

        // Guardar ganador en el historial para "no repetir"
        state.lastWinnerId = state.winningRestaurant.id;
        state.lastWinnerName = state.winningRestaurant.name;
        localStorage.setItem('donde_comemos_last_winner_id', state.lastWinnerId);
        localStorage.setItem('donde_comemos_last_winner_name', state.lastWinnerName);

        if (!state.userCoords) {
          state.userCoords = await getUserLocation();
        }

        state.winningBranch = findClosestBranch(state.winningRestaurant, state.userCoords);
        state.isNameRevealed = false;
        state.showClues = false;
        state.clueIndex = 0;
        state.tieBreakerUser = null;
        state.activeChallenge = null;
        state.screen = 'result';
      } else {
        state.screen = 'no_match';
      }

      render();
    }, 2200);
  }

  // 9. PANTALLA RESULTADO MISTERIOSO (MODO CIEGO & PROGRESSIVE DISCLOSURE)
  // ==========================================
  function renderResultScreen() {
    sound.playFanfare();
    sound.vibrate([100, 50, 150]);

    // Confetti temático con los colores corporativos de Jugador 1 y Jugador 2
    if (window.confetti) {
      window.confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2D55', '#5E5CE6', '#0A84FF', '#FFD60A', '#30D158']
      });
    }

    const branch = state.winningBranch;
    const navUrl = getMysteryNavigationUrl(branch);

    const distanceText = branch.distanceKm !== null
      ? 'A ~' + (branch.distanceKm < 1 ? Math.round(branch.distanceKm * 1000) + ' m' : branch.distanceKm.toFixed(1) + ' km') + ' de vosotros'
      : 'Destino calculado';

    const headerBadge = state.tieBreakerUser
      ? 'Sorteo (' + state.tieBreakerUser + ')'
      : '¡Coincidencia ganadora! (' + state.matchesCount + ' en común)';

    const hints = (state.winningRestaurant && state.winningRestaurant.hints) || [
      'Tiene opciones deliciosas y servicio rápido.',
      'Su aroma inconfundible os abrirá el apetito en cuanto lleguéis.',
      'Es un clásico que nunca defrauda.',
      'El destino está a muy pocos minutos.'
    ];

    const currentHintText = hints[Math.min(state.clueIndex, hints.length - 1)];
    const hasMoreHints = state.clueIndex < hints.length - 1;

    // Verificar si alguno acertó en su apuesta
    const hasGuesses = state.p1Guess || state.p2Guess;
    const isP1Correct = state.p1Guess === state.winningRestaurant.id;
    const isP2Correct = state.p2Guess === state.winningRestaurant.id;

    const currentTab = state.activeResultTab || 'destiny';

    app.innerHTML = `
      <div class="mobile-shell px-6 justify-between text-center animate-view-enter">
        <!-- Encabezado con estado y badge de coincidencia -->
        <div class="pt-4">
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2 backdrop-blur-xl">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>${headerBadge}</span>
          </div>

          <h2 class="text-3xl font-extrabold text-white tracking-tight">
            Destino Secreto
          </h2>
          <p class="text-[11px] text-neutral-400 mt-0.5 max-w-xs mx-auto leading-relaxed">
            El nombre permanece en incógnito. Pulsad en navegación y Maps os llevará sin desvelarlo.
          </p>
        </div>

        <!-- Segmented Control estilo iOS / Apple HIG para Progressive Disclosure -->
        <div class="w-full mt-3 mb-1">
          <div class="grid grid-cols-3 p-1 rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-xl">
            <button 
              class="tab-btn py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                currentTab === 'destiny' 
                  ? 'bg-white/20 text-white shadow-md border border-white/10' 
                  : 'text-neutral-400 hover:text-white'
              }" 
              data-tab="destiny"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <span>Destino</span>
            </button>
            <button 
              class="tab-btn py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                currentTab === 'games' 
                  ? 'bg-white/20 text-white shadow-md border border-white/10' 
                  : 'text-neutral-400 hover:text-white'
              }" 
              data-tab="games"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><circle cx="8" cy="8" r="1.5"></circle><circle cx="16" cy="16" r="1.5"></circle><circle cx="12" cy="12" r="1.5"></circle></svg>
              <span>Juegos</span>
              ${state.showClues || hasGuesses || state.payerWinner ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>' : ''}
            </button>
            <button 
              class="tab-btn py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                currentTab === 'map' 
                  ? 'bg-white/20 text-white shadow-md border border-white/10' 
                  : 'text-neutral-400 hover:text-white'
              }" 
              data-tab="map"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
              <span>Mapa</span>
            </button>
          </div>
        </div>

        <!-- CONTENEDOR DE PESTAÑA ACTIVA -->
        <div class="my-2">
          ${
            currentTab === 'destiny'
              ? `
            <!-- TAB 1: DESTINO MISTERIOSO Y REVELACIÓN VOLUNTARIA -->
            <div class="ios-glass p-5 rounded-[26px] relative overflow-hidden text-center shadow-2xl animate-tab-slide">
              <div class="relative z-10 flex flex-col items-center">
                <div class="w-20 h-20 rounded-[22px] bg-white/[0.06] border border-white/[0.15] flex items-center justify-center text-4xl mb-3 shadow-inner">
                  <svg class="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>

                <div class="text-base font-bold text-white mb-1 tracking-tight">
                  Restaurante Sorpresa
                </div>
                
                <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-200 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.1] mb-2.5">
                  <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>${distanceText}</span>
                </div>

                <p class="text-xs text-neutral-400 max-w-xs leading-relaxed mb-3">
                  Ruta directa calculada hacia la sucursal más óptima por coordenadas secretas.
                </p>

                <!-- Divulgación progresiva para desvelar el sitio -->
                <div class="w-full pt-3 border-t border-white/[0.08]">
                  <button 
                    id="btn-toggle-reveal" 
                    class="w-full py-2 px-3 text-center text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-xl border border-white/[0.08] transition flex items-center justify-center gap-2"
                  >
                    <span>${state.isNameRevealed ? 'Ocultar nombre de nuevo' : '¿Queréis desvelar el sitio ahora?'}</span>
                    <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${state.isNameRevealed ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}"/></svg>
                  </button>
                  
                  <div id="revealed-box" class="${state.isNameRevealed ? 'block' : 'hidden'} mt-3 p-4 rounded-2xl bg-black/60 border border-white/10 text-center animate-reveal">
                    <div class="w-14 h-14 rounded-2xl p-1 bg-white/[0.06] border border-white/15 mx-auto mb-2 flex items-center justify-center">
                      <img src="${state.winningRestaurant.logo || state.winningRestaurant.image}" class="w-full h-full object-contain filter drop-shadow" />
                    </div>
                    <div class="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">Destino confirmado</div>
                    <div class="text-base font-extrabold text-white">${state.winningRestaurant.name}</div>
                    <div class="text-xs text-neutral-400 mt-0.5">${branch.address}</div>

                    ${
                      hasGuesses
                        ? `
                      <div class="mt-2.5 pt-2 border-t border-white/10 text-xs">
                        <div class="font-bold text-neutral-300 mb-1">Vuestras apuestas:</div>
                        <div class="${isP1Correct ? 'text-emerald-400 font-bold' : 'text-neutral-400'}">
                          ${state.player1Name}: ${isP1Correct ? '¡Acertó!' : 'No acertó'}
                        </div>
                        <div class="${isP2Correct ? 'text-emerald-400 font-bold' : 'text-neutral-400'}">
                          ${state.player2Name}: ${isP2Correct ? '¡Acertó!' : 'No acertó'}
                        </div>
                      </div>
                    `
                        : ''
                    }

                    <!-- Botón registrar en Historial / Food Diary -->
                    <div class="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <span class="text-[11px] text-neutral-400">¿Visita finalizada?</span>
                      <button 
                        id="btn-log-visit" 
                        class="px-3 py-1.5 rounded-full text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/35 hover:bg-emerald-500/30 active:scale-95 transition"
                      >
                        Guardar en historial
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
              : currentTab === 'games'
              ? `
            <!-- TAB 2: JUEGOS Y PISTAS EN RUTA (ACORDEONES / SUB-BLOQUES) -->
            <div class="ios-glass p-4 rounded-[26px] text-left space-y-3 animate-tab-slide">
              <!-- Bloque 1: Pistas progresivas -->
              <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5">
                ${
                  !state.showClues
                    ? `
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
                      </div>
                      <div>
                        <div class="text-xs font-bold text-white">Pistas en ruta</div>
                        <div class="text-[10px] text-neutral-400">Adivinad el sitio por el camino</div>
                      </div>
                    </div>
                    <button 
                      id="btn-request-first-clue" 
                      class="px-3 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/35 hover:bg-amber-500/30 active:scale-95 transition"
                    >
                      Pedir pista
                    </button>
                  </div>
                `
                    : `
                  <div class="animate-ios-fade">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        <span>Pista ${state.clueIndex + 1}</span>
                        <span class="text-neutral-500 font-normal">(${state.clueIndex + 1} de ${hints.length})</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        ${
                          hasMoreHints
                            ? `
                          <button id="btn-next-clue" class="text-[10px] font-bold text-amber-300 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/35 active:scale-95 transition">
                            Siguiente
                          </button>
                        `
                            : `
                          <span class="text-[10px] text-neutral-500 font-medium">Última pista</span>
                        `
                        }
                        <button id="btn-hide-clues" class="text-[10px] font-semibold text-neutral-400 hover:text-white px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] active:scale-95 transition">
                          ✕
                        </button>
                      </div>
                    </div>
                    <p class="text-xs text-neutral-200 italic leading-snug bg-black/40 p-2.5 rounded-xl border border-white/[0.06]">
                      "${currentHintText}"
                    </p>
                  </div>
                `
                }
              </div>

              <!-- Bloque 2: Apuestas de Jugador 1 y Jugador 2 -->
              <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                    <span>¿Quién acierta el sitio?</span>
                  </span>
                  <span class="text-[10px] text-neutral-400">Apuesta</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="bg-black/40 p-2.5 rounded-xl border border-white/[0.06]">
                    <div class="text-[10px] font-semibold text-[#FF2D55] truncate mb-1">${state.player1Name}:</div>
                    <select id="select-guess-p1" class="w-full bg-white/[0.08] text-white text-[11px] rounded-lg p-1.5 border border-white/10 focus:outline-none">
                      <option value="">Tu apuesta</option>
                      ${state.restaurants.map(function(r) {
                        return '<option value="' + r.id + '" ' + (state.p1Guess === r.id ? 'selected' : '') + '>' + r.name + '</option>';
                      }).join('')}
                    </select>
                  </div>
                  <div class="bg-black/40 p-2.5 rounded-xl border border-white/[0.06]">
                    <div class="text-[10px] font-semibold text-[#5E5CE6] truncate mb-1">${state.player2Name}:</div>
                    <select id="select-guess-p2" class="w-full bg-white/[0.08] text-white text-[11px] rounded-lg p-1.5 border border-white/10 focus:outline-none">
                      <option value="">Tu apuesta</option>
                      ${state.restaurants.map(function(r) {
                        return '<option value="' + r.id + '" ' + (state.p2Guess === r.id ? 'selected' : '') + '>' + r.name + '</option>';
                      }).join('')}
                    </select>
                  </div>
                </div>
              </div>

              <!-- Bloque 3: ¿Quién paga hoy? -->
              <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div id="coin-icon" class="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-sm shrink-0 ${state.isPayerSpinning ? 'animate-coin-flip' : ''}">
                    <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v12M15 9.5a3.5 3.5 0 0 0-7 0c0 2 2 3 4 3.5s4 1.5 4 3.5a3.5 3.5 0 0 1-7 0"></path></svg>
                  </div>
                  <div>
                    <div class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">¿Quién paga hoy?</div>
                    <div class="text-xs font-semibold text-white">
                      ${state.payerWinner ? state.payerWinner : 'Tirad la moneda al azar'}
                    </div>
                  </div>
                </div>
                <button 
                  id="btn-spin-payer" 
                  class="px-3 py-1.5 rounded-full text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/35 hover:bg-amber-500/30 active:scale-95 transition"
                >
                  ${state.payerWinner ? 'Repetir' : 'Lanzar'}
                </button>
              </div>

              <!-- Bloque 4: Misión Secreta / Reto post-elección -->
              <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <div>
                      <div class="text-xs font-bold text-white">Misión secreta</div>
                      <div class="text-[10px] text-neutral-400">Reto de la comida</div>
                    </div>
                  </div>
                  <button 
                    id="btn-new-challenge" 
                    class="px-3 py-1.5 rounded-full text-[11px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/35 hover:bg-purple-500/30 active:scale-95 transition"
                  >
                    ${state.activeChallenge ? 'Cambiar' : 'Pedir misión'}
                  </button>
                </div>
                ${
                  state.activeChallenge
                    ? `
                  <p class="text-xs text-purple-200 italic leading-snug bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/20 animate-ios-fade">
                    "${state.activeChallenge}"
                  </p>
                `
                    : ''
                }
              </div>
            </div>
          `
              : `
            <!-- TAB 3: OPCIONES DE MAPA Y PREFERENCIAS -->
            <div class="ios-glass p-5 rounded-[26px] text-left space-y-4 animate-tab-slide">
              <div>
                <div class="text-xs font-bold text-white mb-1">Navegador Predilecto</div>
                <div class="text-[11px] text-neutral-400 mb-3">Elige con qué servicio deseas abrir la ruta sin revelar el destino:</div>
                
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <button class="btn-map-choice p-2.5 rounded-xl border flex items-center gap-2 transition ${state.mapApp === 'auto' ? 'bg-white/20 text-white border-white/25 shadow-md' : 'bg-black/40 text-neutral-400 border-white/10'}" data-app="auto">
                    <svg class="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                    <span class="font-semibold">Automático</span>
                  </button>
                  <button class="btn-map-choice p-2.5 rounded-xl border flex items-center gap-2 transition ${state.mapApp === 'apple' ? 'bg-white/20 text-white border-white/25 shadow-md' : 'bg-black/40 text-neutral-400 border-white/10'}" data-app="apple">
                    <svg class="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
                    <span class="font-semibold">Apple Maps</span>
                  </button>
                  <button class="btn-map-choice p-2.5 rounded-xl border flex items-center gap-2 transition ${state.mapApp === 'google' ? 'bg-white/20 text-white border-white/25 shadow-md' : 'bg-black/40 text-neutral-400 border-white/10'}" data-app="google">
                    <svg class="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                    <span class="font-semibold">Google Maps</span>
                  </button>
                  <button class="btn-map-choice p-2.5 rounded-xl border flex items-center gap-2 transition ${state.mapApp === 'waze' ? 'bg-white/20 text-white border-white/25 shadow-md' : 'bg-black/40 text-neutral-400 border-white/10'}" data-app="waze">
                    <svg class="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                    <span class="font-semibold">Waze</span>
                  </button>
                </div>
              </div>

              <div class="pt-3 border-t border-white/[0.08] text-[11px] text-neutral-400 flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>Las coordenadas se transmiten numéricamente para preservar el anonimato.</span>
              </div>
            </div>
          `
          }
        </div>

        <!-- Acciones Fijas Inferiores: Llamada a la acción primaria "CÓMO LLEGAR" + Reset -->
        <div class="space-y-2.5 pb-4">
          <a 
            id="btn-navigate"
            href="${navUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-xl shadow-emerald-500/30 active:scale-[0.97] transition transform flex items-center justify-center gap-3 border-t border-white/20"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
            <span>Cómo llegar</span>
          </a>

          <button 
            id="btn-restart" 
            class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
          >
            <span>Nueva votación</span>
          </button>

          <div class="ios-home-indicator"></div>
        </div>
      </div>
    `;

    // Listeners de cambio de pestaña (Segmented Control)
    document.querySelectorAll('.tab-btn').forEach(function (tabEl) {
      tabEl.addEventListener('click', function () {
        const selectedTab = tabEl.dataset.tab;
        if (state.activeResultTab !== selectedTab) {
          sound.playPop();
          state.activeResultTab = selectedTab;
          renderResultScreen();
        }
      });
    });

    document.getElementById('btn-navigate').addEventListener('click', function () {
      sound.playPop();
      sound.vibrate([60]);
    });

    const btnRequestFirstClue = document.getElementById('btn-request-first-clue');
    if (btnRequestFirstClue) {
      btnRequestFirstClue.addEventListener('click', function () {
        sound.playPop();
        state.showClues = true;
        state.clueIndex = 0;
        renderResultScreen();
      });
    }

    const btnNextClue = document.getElementById('btn-next-clue');
    if (btnNextClue) {
      btnNextClue.addEventListener('click', function () {
        sound.playPop();
        state.clueIndex++;
        renderResultScreen();
      });
    }

    const btnHideClues = document.getElementById('btn-hide-clues');
    if (btnHideClues) {
      btnHideClues.addEventListener('click', function () {
        sound.playPop();
        state.showClues = false;
        renderResultScreen();
      });
    }

    // Handlers para las apuestas de los jugadores
    const guessP1El = document.getElementById('select-guess-p1');
    if (guessP1El) {
      guessP1El.addEventListener('change', function (e) {
        state.p1Guess = e.target.value;
        sound.playPop();
        if (state.p1Guess) showToast(state.player1Name + ' apuesta por esta opción');
      });
    }

    const guessP2El = document.getElementById('select-guess-p2');
    if (guessP2El) {
      guessP2El.addEventListener('change', function (e) {
        state.p2Guess = e.target.value;
        sound.playPop();
        if (state.p2Guess) showToast(state.player2Name + ' apuesta por esta opción');
      });
    }

    // Handler para tirar la moneda de quién paga
    const btnSpinPayer = document.getElementById('btn-spin-payer');
    if (btnSpinPayer) {
      btnSpinPayer.addEventListener('click', function () {
        sound.playCoin();
        sound.vibrate([40, 40]);
        state.isPayerSpinning = true;
        renderResultScreen();

        setTimeout(function () {
          const outcomes = [
            '¡Paga ' + state.player1Name + '!',
            '¡Paga ' + state.player2Name + '!',
            '¡A medias (50/50)!'
          ];
          state.payerWinner = outcomes[Math.floor(Math.random() * outcomes.length)];
          state.isPayerSpinning = false;
          sound.playPop();
          sound.vibrate([60]);
          renderResultScreen();
        }, 1200);
      });
    }

    // Handler para Misión Secreta
    const btnNewChallenge = document.getElementById('btn-new-challenge');
    if (btnNewChallenge) {
      btnNewChallenge.addEventListener('click', function () {
        sound.playPop();
        sound.vibrate([50]);
        const pool = SECRET_MISSIONS_POOL.filter(function (m) {
          return m !== state.activeChallenge;
        });
        state.activeChallenge = pool[Math.floor(Math.random() * pool.length)];
        renderResultScreen();
      });
    }

    // Selector de app de mapas favorita
    document.querySelectorAll('.btn-map-choice').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const choice = btn.dataset.app;
        state.mapApp = choice;
        localStorage.setItem('donde_comemos_map_app', choice);
        sound.playPop();
        renderResultScreen();
      });
    });

    // Guardar visita en el Food Diary
    const btnLogVisit = document.getElementById('btn-log-visit');
    if (btnLogVisit) {
      btnLogVisit.addEventListener('click', function () {
        addFoodVisit(state.winningRestaurant.id, state.winningRestaurant.name, 5);
        sound.playPop();
        sound.vibrate([50, 50]);
        showToast('Visita registrada en tu historial');
        btnLogVisit.disabled = true;
        btnLogVisit.innerText = 'Registrado';
        btnLogVisit.classList.add('opacity-50');
      });
    }

    const btnToggleReveal = document.getElementById('btn-toggle-reveal');
    if (btnToggleReveal) {
      btnToggleReveal.addEventListener('click', function () {
        state.isNameRevealed = !state.isNameRevealed;
        sound.playPop();
        renderResultScreen();
      });
    }

    document.getElementById('btn-restart').addEventListener('click', function () {
      sound.playWhoosh();
      state.roundAttempt = 1;
      state.activeResultTab = 'destiny';
      state.screen = 'home';
      render();
    });
  }

  // ==========================================
  // 10. PANTALLAS DE DESEMPATE (NO MATCH)
  // ==========================================
  function renderNoMatchScreen() {
    sound.vibrate([50, 50, 50]);
    const isFirstAttempt = state.roundAttempt === 1;

    if (isFirstAttempt) {
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

      document.getElementById('btn-retry-round').addEventListener('click', function () {
        sound.playWhoosh();
        state.roundAttempt = 2;
        state.player1Selections.clear();
        state.player2Selections.clear();
        state.screen = 'player1';
        render();
      });

      document.getElementById('btn-restart-home').addEventListener('click', function () {
        sound.playWhoosh();
        state.roundAttempt = 1;
        state.screen = 'home';
        render();
      });

    } else {
      const p2Options = Array.from(state.player2Selections);

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

      document.getElementById('btn-pick-p2').addEventListener('click', async function () {
        sound.playWhoosh();
        const randomIndex = Math.floor(Math.random() * p2Options.length);
        const winnerId = p2Options[randomIndex];
        state.winningRestaurant = state.restaurants.find(function (r) { return r.id === winnerId; });
        state.winningBranch = findClosestBranch(state.winningRestaurant, state.userCoords);
        state.matchesCount = 1;
        state.isNameRevealed = false;
        state.showClues = false;
        state.clueIndex = 0;
        state.tieBreakerUser = state.player2Name;
        state.screen = 'result';
        render();
      });

      document.getElementById('btn-restart-home').addEventListener('click', function () {
        sound.playWhoosh();
        state.roundAttempt = 1;
        state.screen = 'home';
        render();
      });
    }
  }

  // ==========================================
  // 10.1 PANTALLA DE SITIOS RECOMENDADOS (GOOGLE REVIEWS & CASCADA)
  // ==========================================
  function renderRecommendedScreen() {
    if (!state.userCoords && !state.recommendedCityQuery && !state._geoRequested) {
      state._geoRequested = true;
      getUserLocation().then(function (coords) {
        if (coords) {
          state.userCoords = coords;
          if (state.screen === 'recommended' && !state.recommendedCityQuery) {
            renderRecommendedScreen();
          }
        }
      });
    }

    const recData = getRecommendedDisplayList();
    const displayedOptions = recData.items;
    const totalCandidates = recData.total;
    const hasMore = recData.hasMore;
    const centerLabel = recData.centerLabel;

    const isDist2 = state.recommendedMaxDistance === 2;
    const isDist5 = state.recommendedMaxDistance === 5;
    const isDist15 = state.recommendedMaxDistance === 15;
    const isDist30 = state.recommendedMaxDistance === 30;
    const isDistAll = state.recommendedMaxDistance === null;

    const ratingBadge = state.recommendedMinRating > 0 ? `+${state.recommendedMinRating.toFixed(1)}` : 'Todas';
    const ratingLabel = state.recommendedMinRating > 0 ? `${state.recommendedMinRating.toFixed(1)}+` : 'Todas';
    const priceLabel = state.recommendedPrice === 'all' ? 'Todos' : state.recommendedPrice;

    app.innerHTML = `
      <div class="mobile-shell px-4 justify-between animate-view-enter pb-8">
        <div>
          <!-- Cabecera estilo Apple HIG con botón volver -->
          <div class="pt-6 pb-3 flex items-center justify-between border-b border-white/[0.08] mb-3">
            <button 
              id="btn-back-from-recommended" 
              class="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 flex items-center justify-center transition active:scale-95 border border-white/10"
              title="Volver"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <div class="text-center">
              <h2 class="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                <span>Sitios Recomendados</span>
                <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">${ratingBadge}</span>
              </h2>
              <div class="text-[11px] text-neutral-400">Por cercanía, reseñas y precio en Google</div>
            </div>

            <div class="w-9 h-9"></div>
          </div>

          <!-- Barra de búsqueda de ciudad o zona -->
          <div class="relative mb-2">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input 
              id="input-rec-city" 
              type="text" 
              placeholder="Buscar ciudad o zona (ej. Murcia, Cartagena...)" 
              value="${(state.recommendedCityQuery || '').replace(/"/g, '&quot;')}"
              class="w-full bg-white/[0.06] border border-white/[0.12] focus:border-amber-500/50 rounded-2xl pl-9 pr-9 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition shadow-inner"
            />
            ${state.recommendedCityQuery ? `
              <button id="btn-clear-city-search" class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white transition" title="Limpiar búsqueda">
                <div class="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">✕</div>
              </button>
            ` : ''}
          </div>

          <!-- Chips de acceso rápido y GPS -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-2.5">
            <button 
              id="btn-use-gps" 
              class="shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition ${!state.recommendedCityQuery ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'bg-white/[0.05] text-neutral-400 hover:text-neutral-200 border border-white/[0.08]'}"
            >
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></svg>
              <span>Mi ubicación</span>
            </button>
            <button data-quick-city="Cartagena" class="shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition ${state.recommendedCityQuery.toLowerCase() === 'cartagena' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'bg-white/[0.05] text-neutral-400 hover:text-neutral-200 border border-white/[0.08]'}">
              Cartagena
            </button>
            <button data-quick-city="Murcia" class="shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition ${state.recommendedCityQuery.toLowerCase() === 'murcia' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'bg-white/[0.05] text-neutral-400 hover:text-neutral-200 border border-white/[0.08]'}">
              Murcia
            </button>
            <button data-quick-city="Cabo de Palos" class="shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition ${state.recommendedCityQuery.toLowerCase() === 'cabo de palos' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'bg-white/[0.05] text-neutral-400 hover:text-neutral-200 border border-white/[0.08]'}">
              Cabo de Palos
            </button>
            <button data-quick-city="Espinardo" class="shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition ${state.recommendedCityQuery.toLowerCase() === 'espinardo' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'bg-white/[0.05] text-neutral-400 hover:text-neutral-200 border border-white/[0.08]'}">
              Espinardo
            </button>
            <button data-quick-city="El Palmar" class="shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition ${state.recommendedCityQuery.toLowerCase() === 'el palmar' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'bg-white/[0.05] text-neutral-400 hover:text-neutral-200 border border-white/[0.08]'}">
              El Palmar
            </button>
          </div>

          <!-- Filtros de Distancia, Estrellas y Precio -->
          <div class="space-y-2 mb-3.5">
            <!-- Fila 1: Radio de distancia -->
            <div class="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-neutral-400 font-medium">Distancia máxima</span>
                <span class="text-neutral-300 font-semibold flex items-center gap-1 truncate max-w-[190px]">
                  <svg class="w-3 h-3 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span class="truncate">Desde ${centerLabel}</span>
                </span>
              </div>
              <div class="grid grid-cols-5 gap-1">
                <button data-rec-dist="2" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${isDist2 ? 'bg-white/15 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">&lt;2 km</button>
                <button data-rec-dist="5" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${isDist5 ? 'bg-white/15 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">&lt;5 km</button>
                <button data-rec-dist="15" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${isDist15 ? 'bg-white/15 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">&lt;15 km</button>
                <button data-rec-dist="30" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${isDist30 ? 'bg-white/15 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">&lt;30 km</button>
                <button data-rec-dist="all" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${isDistAll ? 'bg-white/15 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">Todas</button>
              </div>
            </div>

            <!-- Fila 2: Estrellas mínimas en Google -->
            <div class="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-neutral-400 font-medium">Estrellas Google mínimas</span>
                <span class="text-amber-400 font-semibold flex items-center gap-1">
                  <svg class="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span>${ratingLabel}</span>
                </span>
              </div>
              <div class="grid grid-cols-4 gap-1">
                <button data-rec-rating="4.5" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedMinRating === 4.5 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">
                  4.5+ (Top)
                </button>
                <button data-rec-rating="4.3" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedMinRating === 4.3 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">
                  4.3+
                </button>
                <button data-rec-rating="4.0" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedMinRating === 4.0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">
                  4.0+
                </button>
                <button data-rec-rating="0" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedMinRating === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">
                  Todas
                </button>
              </div>
            </div>

            <!-- Fila 3: Rango de Precio -->
            <div class="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-neutral-400 font-medium">Rango de precio</span>
                <span class="text-emerald-400 font-semibold">${priceLabel}</span>
              </div>
              <div class="grid grid-cols-5 gap-1">
                <button data-rec-price="all" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedPrice === 'all' ? 'bg-white/15 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">Todos</button>
                <button data-rec-price="€" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedPrice === '€' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">€</button>
                <button data-rec-price="€€" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedPrice === '€€' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">€€</button>
                <button data-rec-price="€€€" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedPrice === '€€€' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">€€€</button>
                <button data-rec-price="€€€€" class="py-1 rounded-xl text-center text-[11px] font-semibold transition ${state.recommendedPrice === '€€€€' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 shadow-sm' : 'text-neutral-400 hover:text-white'}">€€€€</button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between px-1 pb-2.5 text-[11px] text-neutral-400">
            <span>${totalCandidates > 0 ? ('Mostrando ' + displayedOptions.length + ' de ' + totalCandidates + ' restaurantes') : 'Sin resultados'}</span>
            <span class="text-amber-400/90 font-medium">Google Reviews</span>
          </div>

          <!-- Contenido: Lista en cascada o Empty State -->
          ${totalCandidates === 0 ? `
            <div class="ios-glass p-6 rounded-[28px] border border-white/[0.1] text-center space-y-3 my-4">
              <div class="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] mx-auto flex items-center justify-center text-neutral-400">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </div>
              <div class="space-y-1">
                <div class="text-sm font-bold text-white">Sin restaurantes con estos filtros</div>
                <div class="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  No hay opciones que cumplan los criterios seleccionados de distancia, estrellas o precio en ${centerLabel}.
                </div>
              </div>
              <div class="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                <button 
                  id="btn-reset-filters" 
                  class="py-2.5 px-4 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition active:scale-95"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            </div>
          ` : `
            <div class="space-y-3 mb-4">
              ${displayedOptions
                .map(function (r) {
                  const distFormatted = r.computedDistanceKm < 1 
                    ? Math.round(r.computedDistanceKm * 1000) + ' m' 
                    : r.computedDistanceKm.toFixed(1) + ' km';

                  return `
                    <div class="ios-glass p-4 rounded-[24px] border border-white/[0.1] space-y-3 transition hover:border-amber-500/30 animate-card-appear">
                      <div class="flex items-start justify-between gap-2">
                        <div class="space-y-0.5">
                          <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.08] text-neutral-300 border border-white/[0.1]">${r.city}</span>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                              <svg class="w-2.5 h-2.5 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></svg>
                              <span>~${distFormatted}</span>
                            </span>
                            <span class="text-[10px] font-semibold text-neutral-400">${r.category}</span>
                            <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">${r.price}</span>
                          </div>
                          <h3 class="text-base font-bold text-white tracking-tight leading-snug pt-0.5">${r.name}</h3>
                        </div>

                        <div class="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shrink-0">
                          <svg class="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          <span>${r.rating}</span>
                          <span class="text-[10px] text-amber-300/60 font-normal">(${r.reviewsCount})</span>
                        </div>
                      </div>

                      ${r.accolades ? `
                        <div class="text-[11px] font-semibold text-amber-400/90 flex items-center gap-1.5 pl-0.5">
                          <svg class="w-3 h-3 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                          <span>${r.accolades}</span>
                        </div>
                      ` : ''}

                      <div class="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-neutral-300 leading-relaxed italic">
                        "${r.description}"
                      </div>

                      <div class="text-[11px] text-neutral-400 flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span class="truncate">${r.zone}</span>
                      </div>

                      <div class="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.06]">
                        <a 
                          href="${r.googleUrl}" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          class="py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
                        >
                          <span>Ver en Google</span>
                          <svg class="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>

                        <a 
                          href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          class="py-2 px-3 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
                        >
                          <span>Cómo llegar</span>
                          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                        </a>
                      </div>
                    </div>
                  `;
                })
                .join('')}
            </div>

            <!-- Botón Ver Más en Cascada -->
            ${hasMore ? `
              <div class="pb-5">
                <button 
                  id="btn-load-more-recommended" 
                  class="w-full py-3.5 px-4 rounded-2xl text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                >
                  <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                  <span>Ver más</span>
                </button>
              </div>
            ` : ''}
          `}
        </div>

        <!-- Zona de acción inferior -->
        <div class="space-y-2.5 pt-2 border-t border-white/[0.08]">
          ${displayedOptions.length > 0 ? `
            <button 
              id="btn-vote-these" 
              class="w-full py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#FF2D55] via-[#FF375F] to-[#FF9F0A] shadow-xl shadow-rose-500/20 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
            >
              <span>Votar entre estas ${displayedOptions.length} con Duo</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          ` : ''}

          <button 
            id="btn-return-home" 
            class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-500 hover:text-neutral-300 transition flex items-center justify-center gap-1.5"
          >
            <span>Volver al inicio</span>
          </button>

          <div class="ios-home-indicator"></div>
        </div>
      </div>
    `;

    document.getElementById('btn-back-from-recommended').addEventListener('click', function () {
      sound.playPop();
      state.screen = 'home';
      render();
    });

    document.getElementById('btn-return-home').addEventListener('click', function () {
      sound.playPop();
      state.screen = 'home';
      render();
    });

    const loadMoreBtn = document.getElementById('btn-load-more-recommended');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function () {
        sound.playPop();
        sound.vibrate([20]);
        state.recommendedLimit = (state.recommendedLimit || 5) + 5;
        renderRecommendedScreen();
      });
    }

    const cityInput = document.getElementById('input-rec-city');
    if (cityInput) {
      cityInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          state.recommendedCityQuery = cityInput.value.trim();
          state.recommendedLimit = 5;
          sound.playPop();
          renderRecommendedScreen();
        }
      });
      cityInput.addEventListener('change', function () {
        state.recommendedCityQuery = cityInput.value.trim();
        state.recommendedLimit = 5;
        renderRecommendedScreen();
      });
    }

    const clearCityBtn = document.getElementById('btn-clear-city-search');
    if (clearCityBtn) {
      clearCityBtn.addEventListener('click', function () {
        sound.playPop();
        state.recommendedCityQuery = '';
        state.recommendedLimit = 5;
        renderRecommendedScreen();
      });
    }

    const btnUseGps = document.getElementById('btn-use-gps');
    if (btnUseGps) {
      btnUseGps.addEventListener('click', function () {
        sound.playPop();
        sound.vibrate([20]);
        state.recommendedCityQuery = '';
        state.recommendedLimit = 5;
        getUserLocation().then(function (coords) {
          if (coords) {
            state.userCoords = coords;
          }
          renderRecommendedScreen();
        });
      });
    }

    document.querySelectorAll('[data-quick-city]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        sound.playPop();
        sound.vibrate([20]);
        state.recommendedCityQuery = btn.dataset.quickCity;
        state.recommendedLimit = 5;
        renderRecommendedScreen();
      });
    });

    document.querySelectorAll('[data-rec-dist]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const val = btn.dataset.recDist;
        state.recommendedMaxDistance = val === 'all' ? null : Number(val);
        state.recommendedLimit = 5;
        sound.playPop();
        sound.vibrate([20]);
        renderRecommendedScreen();
      });
    });

    document.querySelectorAll('[data-rec-rating]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const val = Number(btn.dataset.recRating);
        state.recommendedMinRating = val;
        state.recommendedLimit = 5;
        sound.playPop();
        sound.vibrate([20]);
        renderRecommendedScreen();
      });
    });

    document.querySelectorAll('[data-rec-price]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const val = btn.dataset.recPrice;
        state.recommendedPrice = val;
        state.recommendedLimit = 5;
        sound.playPop();
        sound.vibrate([20]);
        renderRecommendedScreen();
      });
    });

    const btnResetFilters = document.getElementById('btn-reset-filters');
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', function () {
        sound.playPop();
        state.recommendedMaxDistance = null;
        state.recommendedMinRating = 0;
        state.recommendedPrice = 'all';
        state.recommendedCityQuery = '';
        state.recommendedLimit = 5;
        renderRecommendedScreen();
      });
    }

    const btnVote = document.getElementById('btn-vote-these');
    if (btnVote && displayedOptions.length > 0) {
      btnVote.addEventListener('click', function () {
        sound.init();
        sound.playWhoosh();
        sound.vibrate([40]);
        const duoChoices = displayedOptions.map(function (r) {
          return {
            id: r.id,
            name: r.name,
            category: r.category,
            price: r.price,
            logo: './unica.png',
            image: './unica.png',
            description: r.description,
            branches: [
              { name: r.name, address: r.zone, lat: r.lat, lng: r.lng }
            ]
          };
        });
        state.restaurants = duoChoices;
        state.player1Selections.clear();
        state.player2Selections.clear();
        state.player1Veto = null;
        state.player2Veto = null;
        state.player1Superlike = null;
        state.player2Superlike = null;
        state.selectedCategory = 'all';
        state.roundAttempt = 1;
        state.tieBreakerUser = null;
        state.clueIndex = 0;
        state.p1Guess = null;
        state.p2Guess = null;
        state.payerWinner = null;
        state.activeResultTab = 'destiny';
        state.screen = 'player1';
        render();
      });
    }
  }

  // ==========================================
  // 11. MODAL DE GESTIÓN DE RESTAURANTES (APPLE SHEET)
  // ==========================================
  function openManageModal() {
    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-ios-slide">
        <div class="bg-neutral-950 border-t border-white/[0.12] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
          <div class="w-10 h-1 bg-white/25 rounded-full mx-auto my-3"></div>

          <div class="px-6 pb-3 flex items-center justify-between border-b border-white/[0.08]">
            <div>
              <h3 class="font-bold text-base text-white">Catálogo de Restaurantes</h3>
              <div class="text-[11px] text-neutral-400">Cartagena & Murcia</div>
            </div>
            <button id="btn-close-modal" class="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 flex items-center justify-center font-bold text-xs transition">✕</button>
          </div>

          <div class="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
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
                  <option value="Hamburguesas">Hamburguesas</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Pollo">Pollo</option>
                  <option value="Kebab">Kebab</option>
                  <option value="Asiático">Asiático</option>
                  <option value="Mexicano">Mexicano</option>
                  <option value="Tapas">Tapas</option>
                  <option value="Otro">Otro</option>
                </select>

                <select id="new-res-price" class="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                  <option value="€">Económico (€)</option>
                  <option value="€€" selected>Medio (€€)</option>
                  <option value="€€€">Especial (€€€)</option>
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

            <div>
              <div class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5 pl-1">Restaurantes activos (${state.restaurants.length})</div>
              <div class="space-y-2">
                ${state.restaurants
                  .map(function (r) {
                    return `
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
                    `;
                  })
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-close-modal').addEventListener('click', function () {
      modalContainer.innerHTML = '';
    });

    document.getElementById('btn-add-restaurant').addEventListener('click', async function () {
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
        name: name,
        category: category,
        price: price,
        emoji: emojiMap[category] || '🍽️',
        logo: './unica.svg',
        image: './unica.svg',
        description: 'Restaurante añadido por vosotros.',
        branches: [
          {
            name: 'Sucursal',
            address: address,
            lat: coords.lat,
            lng: coords.lng
          }
        ]
      };

      saveRestaurant(newRes);
      state.restaurants = getRestaurants();
      sound.playPop();
      showToast('"' + name + '" añadido');
      openManageModal();
    });

    document.querySelectorAll('.btn-delete-res').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.dataset.del;
        removeRestaurant(id);
        state.restaurants = getRestaurants();
        sound.playPop();
        showToast('Restaurante eliminado');
        openManageModal();
      });
    });
  }

  // ==========================================
  // 12. MODAL DE HISTORIAL & DIARIO DE VISITAS (APPLE SHEET)
  // ==========================================
  function openDiaryModal() {
    const visits = getFoodDiary();
    const stats = getRestaurantVisitStats();

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-ios-slide">
        <div class="bg-neutral-950 border-t border-white/[0.12] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
          <div class="w-10 h-1 bg-white/25 rounded-full mx-auto my-3"></div>

          <div class="px-6 pb-3 flex items-center justify-between border-b border-white/[0.08]">
            <div>
              <h3 class="font-bold text-base text-white flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                <span>Historial de Comidas</span>
              </h3>
              <div class="text-[11px] text-neutral-400">¿De qué soléis pecar más?</div>
            </div>
            <button id="btn-close-diary" class="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 flex items-center justify-center font-bold text-xs transition">✕</button>
          </div>

          <div class="p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
            <!-- Estadísticas rápidas estilo Apple Health / Fitness -->
            <div class="ios-glass p-4 rounded-2xl">
              <div class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">Frecuencia por restaurante</div>
              <div class="space-y-2.5">
                ${state.restaurants
                  .map(function (r) {
                    const count = stats[r.id] || 0;
                    const maxCount = Math.max.apply(null, Object.values(stats).concat([1]));
                    const pct = Math.round((count / maxCount) * 100);
                    return `
                      <div class="space-y-1">
                        <div class="flex items-center justify-between text-xs">
                          <span class="text-white font-medium flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                            <span>${r.name}</span>
                          </span>
                          <span class="text-neutral-400 font-bold">${count} vez${count === 1 ? '' : 'es'}</span>
                        </div>
                        <div class="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div class="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" style="width: ${pct}%"></div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <!-- Registro de visitas cronológico -->
            <div>
              <div class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 pl-1">
                Últimas visitas registradas (${visits.length})
              </div>
              ${
                visits.length === 0
                  ? `
                <div class="p-6 text-center text-xs text-neutral-500 border border-white/[0.06] rounded-2xl">
                  Aún no habéis guardado ninguna visita. Al salir el resultado, podréis pulsar "Registrar visita".
                </div>
              `
                  : `
                <div class="space-y-2">
                  ${visits
                    .map(function (v) {
                      return `
                        <div class="ios-glass p-3 rounded-2xl flex items-center justify-between">
                          <div>
                            <div class="text-xs font-bold text-white">${v.restaurantName}</div>
                            <div class="text-[10px] text-neutral-400">${v.date}</div>
                          </div>
                          <div class="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-bold border border-emerald-500/25">
                            Visitado
                          </div>
                        </div>
                      `;
                    })
                    .join('')}
                </div>
              `
              }
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-close-diary').addEventListener('click', function () {
      modalContainer.innerHTML = '';
    });
  }

  // Inicializar al cargar
  init();
})();
