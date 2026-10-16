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

  function makeMovieSvg(primaryColor) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">' +
      '<defs><linearGradient id="bgm" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + primaryColor + '" stop-opacity="0.35"/>' +
      '<stop offset="100%" stop-color="' + primaryColor + '" stop-opacity="0.1"/>' +
      '</linearGradient></defs>' +
      '<rect width="96" height="96" rx="26" fill="url(#bgm)" stroke="' + primaryColor + '" stroke-opacity="0.4" stroke-width="2"/>' +
      '<rect x="22" y="24" width="52" height="48" rx="8" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/>' +
      '<line x1="22" y1="36" x2="74" y2="36" stroke="' + primaryColor + '" stroke-width="2"/>' +
      '<line x1="32" y1="24" x2="28" y2="36" stroke="' + primaryColor + '" stroke-width="2"/>' +
      '<line x1="46" y1="24" x2="42" y2="36" stroke="' + primaryColor + '" stroke-width="2"/>' +
      '<line x1="60" y1="24" x2="56" y2="36" stroke="' + primaryColor + '" stroke-width="2"/>' +
      '<polygon points="43,44 57,52 43,60" fill="' + primaryColor + '"/>' +
      '</svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function makePlanSvg(primaryColor, iconType) {
    let innerIcon = '';
    if (iconType === 'cinema') {
      innerIcon = '<rect x="22" y="24" width="52" height="48" rx="8" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><polygon points="43,44 57,52 43,60" fill="' + primaryColor + '"/>';
    } else if (iconType === 'sunset') {
      innerIcon = '<circle cx="48" cy="46" r="14" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><path d="M24 64h48M30 72h36" stroke="' + primaryColor + '" stroke-width="2.5" stroke-linecap="round"/>';
    } else if (iconType === 'bowling') {
      innerIcon = '<circle cx="48" cy="48" r="22" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><circle cx="42" cy="42" r="2.5" fill="' + primaryColor + '"/><circle cx="54" cy="42" r="2.5" fill="' + primaryColor + '"/><circle cx="48" cy="54" r="2.5" fill="' + primaryColor + '"/>';
    } else if (iconType === 'spa') {
      innerIcon = '<path d="M48 24c-12 16-16 26-16 34a16 16 0 0 0 32 0c0-8-4-18-16-34z" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/>';
    } else if (iconType === 'picnic') {
      innerIcon = '<rect x="24" y="38" width="48" height="34" rx="6" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><path d="M48 38v34M24 54h48M34 38c0-8 6-14 14-14s14 6 14 14" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/>';
    } else if (iconType === 'escape') {
      innerIcon = '<rect x="30" y="42" width="36" height="30" rx="6" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><path d="M38 42v-8a10 10 0 0 1 20 0v8" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><circle cx="48" cy="56" r="3" fill="' + primaryColor + '"/>';
    } else if (iconType === 'wine') {
      innerIcon = '<path d="M34 26h28l-8 22a8 8 0 0 1-6 6 8 8 0 0 1-6-6zM48 54v18M36 72h24" fill="none" stroke="' + primaryColor + '" stroke-width="2.5" stroke-linecap="round"/>';
    } else if (iconType === 'hiking') {
      innerIcon = '<path d="M22 68l22-34 16 22 14-16 12 28H22z" fill="none" stroke="' + primaryColor + '" stroke-width="2.5" stroke-linejoin="round"/>';
    } else if (iconType === 'music') {
      innerIcon = '<path d="M34 62a6 6 0 1 1-6-6 6 6 0 0 1 6 6zm30-8a6 6 0 1 1-6-6 6 6 0 0 1 6 6zM34 56V28l30-6v34M34 38l30-6" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/>';
    } else if (iconType === 'games') {
      innerIcon = '<rect x="26" y="26" width="44" height="44" rx="8" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><circle cx="38" cy="38" r="3" fill="' + primaryColor + '"/><circle cx="48" cy="48" r="3" fill="' + primaryColor + '"/><circle cx="58" cy="58" r="3" fill="' + primaryColor + '"/>';
    } else if (iconType === 'museum') {
      innerIcon = '<path d="M24 38l24-14 24 14M24 70h48M28 42v28M40 42v28M56 42v28M68 42v28" fill="none" stroke="' + primaryColor + '" stroke-width="2.5" stroke-linecap="round"/>';
    } else {
      innerIcon = '<circle cx="48" cy="48" r="22" fill="none" stroke="' + primaryColor + '" stroke-width="2.5"/><path d="M38 48a10 10 0 0 0 20 0M48 26v4M38 28l2 3M58 28l-2 3" stroke="' + primaryColor + '" stroke-width="2.5" stroke-linecap="round"/>';
    }

    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">' +
      '<defs><linearGradient id="bgp" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + primaryColor + '" stop-opacity="0.35"/>' +
      '<stop offset="100%" stop-color="' + primaryColor + '" stop-opacity="0.1"/>' +
      '</linearGradient></defs>' +
      '<rect width="96" height="96" rx="26" fill="url(#bgp)" stroke="' + primaryColor + '" stroke-opacity="0.4" stroke-width="2"/>' +
      innerIcon +
      '</svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  const STREAMING_PROVIDERS = {
    netflix: {
      name: 'Netflix',
      color: '#E50914',
      bg: '#E50914',
      url: 'https://www.netflix.com',
      badgeHtml: '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-[#E50914] text-white tracking-wider">NETFLIX</span>'
    },
    hbo: {
      name: 'Max',
      color: '#002BE7',
      bg: '#002BE7',
      url: 'https://www.max.com',
      badgeHtml: '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-[#002BE7] text-white tracking-wider">MAX</span>'
    },
    prime: {
      name: 'Prime Video',
      color: '#00A8E1',
      bg: '#00050d',
      url: 'https://www.primevideo.com',
      badgeHtml: '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-[#00A8E1] text-black tracking-tight">PRIME</span>'
    },
    disney: {
      name: 'Disney+',
      color: '#00D6FF',
      bg: '#040714',
      url: 'https://www.disneyplus.com',
      badgeHtml: '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#040714] text-[#00D6FF] border border-[#00D6FF]/40 tracking-tight">DISNEY+</span>'
    },
    apple: {
      name: 'Apple TV+',
      color: '#FFFFFF',
      bg: '#1C1C1E',
      url: 'https://tv.apple.com',
      badgeHtml: '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/15 text-white border border-white/25 tracking-tight">tv+</span>'
    },
    movistar: {
      name: 'Movistar+',
      color: '#019DF4',
      bg: '#011B38',
      url: 'https://ver.movistarplus.es',
      badgeHtml: '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#011B38] text-[#019DF4] border border-[#019DF4]/40 tracking-tight">M+</span>'
    }
  };

  function renderStreamingBadges(providers, isLarge) {
    if (!providers || !providers.length) return '';
    return providers.map(function(key) {
      const p = STREAMING_PROVIDERS[key];
      if (!p) return '';
      if (isLarge) {
        return '<a href="' + p.url + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold transition active:scale-95 shadow-sm">' +
          p.badgeHtml + '<span>' + p.name + '</span></a>';
      }
      return p.badgeHtml;
    }).join(' ');
  }

  const MOVIES_CATALOGUE = [
    // --- 1. RECOMENDADAS / TOP CRÍTICA FILMAFFINITY (PELÍCULAS CON NOTAZA) ---
    {
      id: 'movie-interstellar',
      name: 'Interstellar',
      type: 'movie',
      genre: 'scifi',
      isRecommended: true,
      category: 'Ciencia Ficción • Épica',
      price: '169 min',
      duration: '169 min',
      rating: '7.9',
      year: 2014,
      streaming: ['prime', 'hbo'],
      color: '#3B82F6',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      synopsis: 'Un grupo de astronautas atraviesa un agujero de gusano cerca de Saturno en una misión desesperada para hallar un nuevo hogar habitable antes de que la Tierra colapse.',
      description: 'Un grupo de astronautas atraviesa un agujero de gusano buscando un nuevo hogar para la humanidad.',
      hints: [
        'Un reloj de manecillas y una librería conectan el espacio y el tiempo.',
        'En el planeta de las olas titánicas, una hora son siete años en la Tierra.',
        'El amor es lo único que trasciende las dimensiones.',
        'La épica banda sonora de Hans Zimmer con órgano de iglesia monumental.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-origen',
      name: 'Origen',
      type: 'movie',
      genre: 'scifi',
      isRecommended: true,
      category: 'Ciencia Ficción • Thriller',
      price: '148 min',
      duration: '148 min',
      rating: '8.0',
      year: 2010,
      streaming: ['hbo', 'movistar'],
      color: '#0284C7',
      poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
      image: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
      synopsis: 'Dom Cobb es un ladrón capaz de infiltrarse en el subconsciente ajeno durante los sueños. Ahora debe realizar lo imposible: implantar una idea sin ser descubierto.',
      description: 'Un ladrón que roba secretos entrando en los sueños de los demás debe implantar una idea ajena.',
      hints: [
        'Una peonza metálica girando sobre una mesa para comprobar si es realidad o sueño.',
        'Peleas ingrávidas en el pasillo giratorio de un hotel.',
        'La canción de Édith Piaf avisa de la patada inminente para despertar.',
        'Varios niveles de sueños dentro de otros sueños en una furgoneta cayendo al agua.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-oppenheimer',
      name: 'Oppenheimer',
      type: 'movie',
      genre: 'drama',
      isRecommended: true,
      category: 'Drama • Biografía / Historia',
      price: '180 min',
      duration: '180 min',
      rating: '7.6',
      year: 2023,
      streaming: ['apple', 'prime'],
      color: '#EA580C',
      poster: 'https://image.tmdb.org/t/p/w500/ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg',
      image: 'https://image.tmdb.org/t/p/w500/ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg',
      synopsis: 'La intensa historia del físico J. Robert Oppenheimer y su liderazgo científico en el Proyecto Manhattan para construir la primera arma atómica durante la Segunda Guerra Mundial.',
      description: 'La historia del físico J. Robert Oppenheimer y el proyecto Manhattan en Los Álamos.',
      hints: [
        'La cuenta atrás en silencio durante la prueba Trinity en el desierto de Los Álamos.',
        'Gotas de lluvia cayendo sobre un charco y chispas de física cuántica.',
        'Arrasó con 7 premios Óscar, incluyendo Mejor Película y Mejor Director.',
        'Cillian Murphy encarna al padre de la bomba atómica.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-el-padrino',
      name: 'El Padrino',
      type: 'movie',
      genre: 'drama',
      isRecommended: true,
      category: 'Crimen • Drama / Clásico',
      price: '175 min',
      duration: '175 min',
      rating: '9.0',
      year: 1972,
      streaming: ['netflix', 'prime'],
      color: '#78350F',
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      image: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      synopsis: 'Don Vito Corleone, patriarca respetado de una poderosa dinastía mafiosa neoyorquina, traspasa el control de su imperio criminal a su reacio hijo Michael.',
      description: 'Una de las obras cumbre de la historia del cine universal.',
      hints: [
        'Una oferta que no podrá rechazar susurrada en la penumbra de un despacho.',
        'Una cabeza de caballo en la cama de sábanas de seda.',
        'El vals inconfundible de Nino Rota con trompeta nostálgica.',
        'Marlon Brando y Al Pacino en la mayor epopeya mafiosa de todos los tiempos.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-dark-knight',
      name: 'El Caballero Oscuro',
      type: 'movie',
      genre: 'action',
      isRecommended: true,
      category: 'Acción • Superhéroes / Thriller',
      price: '152 min',
      duration: '152 min',
      rating: '8.1',
      year: 2008,
      streaming: ['hbo', 'movistar'],
      color: '#475569',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      synopsis: 'Batman, el teniente Gordon y el fiscal Harvey Dent combaten el crimen en Gotham hasta que emerge Joker, sembrando una ola incontrolable de caos anárquico.',
      description: 'El duelo cinematográfico definitivo entre el murciélago de Gotham y el Joker de Heath Ledger.',
      hints: [
        '¿Por qué tan serio? Una sonrisa marcada con cuchillo.',
        'Un truco de magia con un lápiz que desaparece en una mesa.',
        'La mítica interpretación de Heath Ledger que le valió el Óscar póstumo.',
        'El héroe que Gotham se merece, pero no el que necesita ahora.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-dune-2',
      name: 'Dune: Parte Dos',
      type: 'movie',
      genre: 'scifi',
      isRecommended: true,
      category: 'Ciencia Ficción • Aventura Épica',
      price: '166 min',
      duration: '166 min',
      rating: '7.6',
      year: 2024,
      streaming: ['hbo'],
      color: '#D97706',
      poster: 'https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7y2NscmtcuEt4xP.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7y2NscmtcuEt4xP.jpg',
      image: 'https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7y2NscmtcuEt4xP.jpg',
      synopsis: 'Paul Atreides se une a Chani y a los Fremen en el desierto mientras planea su venganza contra los conspiradores que destruyeron a su familia.',
      description: 'La consagración de Paul Atreides como mesías del desierto de Arrakis.',
      hints: [
        'Ojos completamente azules por el consumo de la especia.',
        'Montar a lomos de gusanos de arena colosales en Arrakis.',
        'Austin Butler irreconocible y aterrador como Feyd-Rautha Harkonnen.',
        'El poder del desierto desatado en batallas épicas.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-parasitos',
      name: 'Parásitos',
      type: 'movie',
      genre: 'comedy',
      isRecommended: true,
      category: 'Comedia Negra • Suspense',
      price: '132 min',
      duration: '132 min',
      rating: '8.0',
      year: 2019,
      streaming: ['prime', 'movistar'],
      color: '#10B981',
      poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      synopsis: 'Una humilde familia en paro pero con gran ingenio se infiltra progresivamente como empleados domésticos en la lujosa mansión de los acaudalados Park.',
      description: 'Ganadora histórica de 4 premios Óscar incluyendo Mejor Película internacional.',
      hints: [
        'Una casa de arquitectura de vanguardia con un búnker secreto en el sótano.',
        'Una piedra de la suerte que trae fortuna y desgracia.',
        'El olor característico del metro que delata a los protagonistas.',
        'Fideos ram-don cocinados a contrarreloj en 8 minutos.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-spiderverse-2',
      name: 'Spider-Man: Cruzando el Multiverso',
      type: 'movie',
      genre: 'animation',
      isRecommended: true,
      category: 'Animación • Aventura Multiverso',
      price: '140 min',
      duration: '140 min',
      rating: '7.8',
      year: 2023,
      streaming: ['netflix', 'movistar'],
      color: '#E11D48',
      poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      image: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      synopsis: 'Miles Morales viaja a través del multiverso con Gwen Stacy y choca frontalmente con la Sociedad Arácnida de Miguel O\'Hara para proteger a su padre.',
      description: 'Revolución estética y técnica del cine de animación contemporáneo.',
      hints: [
        'Cientos de versiones del hombre araña persiguiendo a Miles en Nueva York futurista.',
        'Acuarelas que cambian de color según las emociones de Gwen Stacy.',
        'El canon arácnido y el dilema moral de salvar a una persona o al multiverso.',
        'Un estilo visual híbrido que mezcla cómic impreso, graffiti y 3D.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-chihiro',
      name: 'El Viaje de Chihiro',
      type: 'movie',
      genre: 'animation',
      isRecommended: true,
      category: 'Animación • Fantasía Studio Ghibli',
      price: '125 min',
      duration: '125 min',
      rating: '8.1',
      year: 2001,
      streaming: ['netflix'],
      color: '#0D9488',
      poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
      image: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
      synopsis: 'Chihiro, una niña de diez años, queda atrapada en un mundo sobrenatural de espíritus tras convertirse sus padres en cerdos por comer comida mágica.',
      description: 'La cumbre artística de Hayao Miyazaki y el único anime ganador del Óscar a Mejor Película de Animación.',
      hints: [
        'Un dragón blanco de río llamado Haku que ayuda a la pequeña protagonista.',
        'Una casa de baños termales regentada por la bruja Yubaba.',
        'El misterioso espíritu Sin Rostro y bolitas de hollín que transportan carbón.',
        'Un billete de tren de ida atravesando aguas infinitas al atardecer.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-el-resplandor',
      name: 'El Resplandor',
      type: 'movie',
      genre: 'horror',
      isRecommended: true,
      category: 'Terror • Psicológico / Obra Maestra',
      price: '146 min',
      duration: '146 min',
      rating: '8.2',
      year: 1980,
      streaming: ['hbo', 'apple'],
      color: '#991B1B',
      poster: 'https://image.tmdb.org/t/p/w500/9fgh3Ns1iRzlQNZu29KhUVqW8Tc.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/9fgh3Ns1iRzlQNZu29KhUVqW8Tc.jpg',
      image: 'https://image.tmdb.org/t/p/w500/9fgh3Ns1iRzlQNZu29KhUVqW8Tc.jpg',
      synopsis: 'Jack Torrance acepta cuidar el aislado Hotel Overlook durante el crudo invierno junto a su esposa y su hijo Danny, poseedor de visiones premonitorias.',
      description: 'La adaptación magistral de Stanley Kubrick que redefinió el terror psicológico moderno.',
      hints: [
        '¡Aquí está Jack! El rostro desquiciado asomando por la puerta rota con un hacha.',
        'Dos gemelas vestidas de azul al final de un pasillo interminable.',
        'Un triciclo recorriendo alfombras geométricas y parqué de madera.',
        'La palabra REDRUM escrita con lápiz labial en el espejo.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-cadena-perpetua',
      name: 'Cadena Perpetua',
      type: 'movie',
      genre: 'drama',
      isRecommended: true,
      category: 'Drama • Cárcel y Amistad',
      price: '142 min',
      duration: '142 min',
      rating: '8.6',
      year: 1994,
      streaming: ['hbo', 'movistar'],
      color: '#2563EB',
      poster: 'https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
      image: 'https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
      synopsis: 'Andy Dufresne es condenado a cadena perpetua por un crimen que no cometió. En la prisión de Shawshank forja una amistad inolvidable con Red.',
      description: 'Elogiada unánimemente como una de las películas más emotivas e inspiradoras de la historia.',
      hints: [
        'Un póster de Rita Hayworth y un pequeño martillo geológico.',
        'La voz en off inolvidable y sabia de Morgan Freeman.',
        'Cervezas bien frías sobre el tejado al atardecer recompensando a los reclusos.',
        'Brazos abiertos bajo la lluvia torrencial saboreando la libertad recobrada.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-whiplash',
      name: 'Whiplash',
      type: 'movie',
      genre: 'drama',
      isRecommended: true,
      category: 'Drama • Música y Tensión',
      price: '106 min',
      duration: '106 min',
      rating: '7.9',
      year: 2014,
      streaming: ['prime', 'movistar'],
      color: '#B45309',
      poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
      image: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
      synopsis: 'Andrew Neiman, un joven y ambicioso baterista de jazz, ingresa en el mejor conservatorio bajo la tutela de Terence Fletcher, un implacable director.',
      description: 'Tensión extrema al límite del colapso físico y mental por alcanzar la perfección.',
      hints: [
        'No hay dos palabras más dañinas en nuestro idioma que "buen trabajo".',
        'Una silla volando por los aires hacia la cabeza del baterista.',
        'Manos ensangrentadas sumergidas en una jarra de agua con hielo.',
        'El solo de batería final más electrizante del cine moderno con Caravan.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 2. ACCIÓN Y AVENTURA ---
    {
      id: 'movie-john-wick-4',
      name: 'John Wick 4',
      type: 'movie',
      genre: 'action',
      isRecommended: false,
      category: 'Acción • Artes Marciales',
      price: '169 min',
      duration: '169 min',
      rating: '7.0',
      year: 2023,
      streaming: ['prime'],
      color: '#DC2626',
      poster: 'https://image.tmdb.org/t/p/w500/gh2bmprLtUQ8o9v5mZCS12vTeTV.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/gh2bmprLtUQ8o9v5mZCS12vTeTV.jpg',
      image: 'https://image.tmdb.org/t/p/w500/gh2bmprLtUQ8o9v5mZCS12vTeTV.jpg',
      synopsis: 'John Wick encuentra el camino para derrotar a la Alta Mesa enfrentándose a asesinos de élite desde Osaka y Berlín hasta los Campos Elíseos de París.',
      description: 'Coreografías de combate y tiroteos insuperables que elevan el cine de acción.',
      hints: [
        'Un plano cenital continuo con escopeta de munición de aliento de dragón en París.',
        'Subir 222 escalones empinados de Montmartre cayendo y volviendo a subir.',
        'Un traje a medida blindado con Kevlar impecable.',
        'Keanu Reeves repartiendo justicia junto a un leal perro de combate.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-mad-max',
      name: 'Mad Max: Furia en la carretera',
      type: 'movie',
      genre: 'action',
      isRecommended: false,
      category: 'Acción • Postapocalíptico',
      price: '120 min',
      duration: '120 min',
      rating: '7.1',
      year: 2015,
      streaming: ['hbo', 'movistar'],
      color: '#CA8A04',
      poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
      image: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
      synopsis: 'En un páramo desértico donde el agua y la gasolina escasean, Max se alía con Emperatriz Furiosa en una persecución motorizada de velocidad suicida.',
      description: 'Pura adrenalina visual y efectos prácticos reales que arrasaron con 6 premios Óscar.',
      hints: [
        'Un guitarrista colgado de cables tocando un instrumento que escupe fuego.',
        'Vehículos monstruosos colisionando en una tormenta de arena colosal.',
        'Charlize Theron rapada e imponente como la líder Furiosa.',
        '¡Qué día tan glorioso! Grito de guerra con pintura plateada en la boca.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-top-gun-maverick',
      name: 'Top Gun: Maverick',
      type: 'movie',
      genre: 'action',
      isRecommended: false,
      category: 'Acción • Aviación militar',
      price: '130 min',
      duration: '130 min',
      rating: '7.2',
      year: 2022,
      streaming: ['netflix', 'prime'],
      color: '#0284C7',
      poster: 'https://image.tmdb.org/t/p/w500/jeGvNOVMs5QZvRj9o9Va79vgHG1.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/jeGvNOVMs5QZvRj9o9Va79vgHG1.jpg',
      image: 'https://image.tmdb.org/t/p/w500/jeGvNOVMs5QZvRj9o9Va79vgHG1.jpg',
      synopsis: 'Tras treinta años de servicio, Maverick sigue desafiando los límites como piloto de pruebas mientras entrena a un grupo de élite para una misión de extrema precisión.',
      description: 'El regreso triunfal de Tom Cruise grabado en cazas F/A-18 reales sin CGI.',
      hints: [
        'Cazas de combate volando a ras de cañones montañosos a Mach 10.',
        'Gafas de sol de aviador Ray-Ban y chaquetas de cuero sobre motos al atardecer.',
        'Tom Cruise pilotando aviones supersónicos de combate reales.',
        'El emotivo reencuentro de Maverick con su antiguo rival y amigo Iceman.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-gladiator',
      name: 'Gladiator',
      type: 'movie',
      genre: 'action',
      isRecommended: false,
      category: 'Acción • Épica histórica',
      price: '155 min',
      duration: '155 min',
      rating: '7.9',
      year: 2000,
      streaming: ['prime', 'movistar'],
      color: '#B45309',
      poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
      image: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
      synopsis: 'Máximo Décimo Meridio, leal general romano traicionado por el corrupto emperador Cómodo, resurge como gladiador en el Coliseo en busca de justicia.',
      description: 'Ganadora de 5 Óscar, con Russell Crowe y Joaquin Phoenix en estado de gracia.',
      hints: [
        'Mi nombre es Máximo Décimo Meridio, comandante de los ejércitos del norte.',
        'Una mano acariciando espigas doradas de trigo en los Campos Elíseos.',
        'El pulgar hacia abajo del emperador en la arena ensangrentada del Coliseo.',
        'La conmovedora composición Now We Are Free de Hans Zimmer y Lisa Gerrard.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 3. CIENCIA FICCIÓN ---
    {
      id: 'movie-blade-runner-2049',
      name: 'Blade Runner 2049',
      type: 'movie',
      genre: 'scifi',
      isRecommended: false,
      category: 'Ciencia Ficción • Neo-noir',
      price: '164 min',
      duration: '164 min',
      rating: '7.2',
      year: 2017,
      streaming: ['netflix', 'prime'],
      color: '#0D9488',
      poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
      image: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
      synopsis: 'El agente K desentierra un antiguo secreto largamente oculto que podría sumir a la sociedad en el caos, llevándole a buscar a Rick Deckard.',
      description: 'Una deslumbrante secuela visual de Denis Villeneuve que expande el clásico cyberpunk.',
      hints: [
        'Luces de neón holográficas gigantes en una Los Ángeles lluviosa y desolada.',
        'Ryan Gosling y Harrison Ford en ruinas radioactivas doradas de Las Vegas.',
        'Test de empatía Voight-Kampff y la duda constante de qué nos hace humanos.',
        'La fotografía magistral con Óscar de Roger Deakins.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-matrix',
      name: 'Matrix',
      type: 'movie',
      genre: 'scifi',
      isRecommended: false,
      category: 'Ciencia Ficción • Ciberpunk',
      price: '136 min',
      duration: '136 min',
      rating: '7.9',
      year: 1999,
      streaming: ['hbo', 'apple'],
      color: '#16A34A',
      poster: 'https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
      image: 'https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
      synopsis: 'Thomas Anderson, programador y hacker apodado Neo, descubre guiado por Morfeo que la realidad que conoce es una simulación virtual de las máquinas.',
      description: 'La película que transformó para siempre los efectos especiales y el cine de ciencia ficción.',
      hints: [
        'Pastilla roja o pastilla azul: la elección definitiva entre verdad o ilusión.',
        'Lluvia digital de caracteres verdes de código cayendo por la pantalla.',
        'Esquivar balas en cámara lenta inclinándose hacia atrás en la azotea (Bullet Time).',
        'Gafas de sol negras sin patillas y gabardinas de cuero volando.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 4. DRAMA ---
    {
      id: 'movie-club-lucha',
      name: 'El Club de la Lucha',
      type: 'movie',
      genre: 'drama',
      isRecommended: false,
      category: 'Drama • Sátira psicológica',
      price: '139 min',
      duration: '139 min',
      rating: '8.2',
      year: 1999,
      streaming: ['disney', 'prime'],
      color: '#9333EA',
      poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      image: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      synopsis: 'Un oficinista hastiado con insomnio crónico conoce al enigmático vendedor Tyler Durden y juntos fundan un club secreto con reglas muy estrictas.',
      description: 'Una de las películas de culto más influyentes de finales del siglo XX dirigida por David Fincher.',
      hints: [
        'La primera regla del club es: nadie habla sobre el club.',
        'Una pastilla de jabón rosa con el título grabado en relieve.',
        'Brad Pitt con chaqueta de cuero roja y Edward Norton con maletín.',
        'Rascacielos derrumbándose al son de Where Is My Mind de los Pixies.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-pulp-fiction',
      name: 'Pulp Fiction',
      type: 'movie',
      genre: 'drama',
      isRecommended: false,
      category: 'Crimen • Cine de culto',
      price: '154 min',
      duration: '154 min',
      rating: '8.7',
      year: 1994,
      streaming: ['netflix', 'movistar'],
      color: '#F59E0B',
      poster: 'https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
      image: 'https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
      synopsis: 'Dos sicarios filósofos, la esposa del jefe mafioso, un boxeador en fuga y dos atracadores de poca monta entrelazan sus destinos en Los Ángeles.',
      description: 'La obra maestra no lineal de Quentin Tarantino ganadora de la Palma de Oro en Cannes.',
      hints: [
        'Un baile descalzo a ritmo de twist de Chuck Berry en el restaurante Jack Rabbit Slims.',
        'Un maletín misterioso con una luz dorada brillante en su interior.',
        'Una hamburguesa Big Kahuna y un debate sobre el masaje de pies.',
        'John Travolta, Samuel L. Jackson y Uma Thurman en un póster inolvidable.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 5. COMEDIA ---
    {
      id: 'movie-lebowski',
      name: 'El Gran Lebowski',
      type: 'movie',
      genre: 'comedy',
      isRecommended: false,
      category: 'Comedia • Culto disparatado',
      price: '117 min',
      duration: '117 min',
      rating: '7.6',
      year: 1998,
      streaming: ['apple', 'prime'],
      color: '#D97706',
      poster: 'https://image.tmdb.org/t/p/w500/1baeqY1kI8N7n92B6pA7hJzU6m1.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/1baeqY1kI8N7n92B6pA7hJzU6m1.jpg',
      image: 'https://image.tmdb.org/t/p/w500/1baeqY1kI8N7n92B6pA7hJzU6m1.jpg',
      synopsis: 'El Nota es confundido por unos matones con un magnate millonario del mismo nombre. Cuando orinan en su alfombra favorita, decide exigir compensación.',
      description: 'La hilarante comedia de los hermanos Coen convertida en auténtica religión cinematográfica.',
      hints: [
        'Esa alfombra le daba un ambiente genial a la habitación.',
        'Un ruso blanco con vodka y licor de café en la mano en bata de baño.',
        'Partidas de bolos caóticas con Walter Sobchak gritando sobre Vietnam.',
        'Jeff Bridges encarnando al tipo más relajado del planeta Tierra.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-superbad',
      name: 'Supersalidos',
      type: 'movie',
      genre: 'comedy',
      isRecommended: false,
      category: 'Comedia • Adolescente desenfadada',
      price: '113 min',
      duration: '113 min',
      rating: '6.4',
      year: 2007,
      streaming: ['netflix'],
      color: '#F97316',
      poster: 'https://image.tmdb.org/t/p/w500/ek8e8txUyUvd2BNqj6kkPtazBEq.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/ek8e8txUyUvd2BNqj6kkPtazBEq.jpg',
      image: 'https://image.tmdb.org/t/p/w500/ek8e8txUyUvd2BNqj6kkPtazBEq.jpg',
      synopsis: 'Seth y Evan quieren comprar alcohol para una fiesta de graduación y conquistar a sus compañeras antes de que la universidad los separe.',
      description: 'Comedia generacional icónica de los 2000 con Jonah Hill, Michael Cera y Christopher Mintz-Plasse.',
      hints: [
        'Un documento de identidad falso de Hawái a nombre de un único nombre: McLovin.',
        'Dos policías locos que se van de juerga disparando a señales de tráfico.',
        'Un dibujo obsesivo de penes en libretas escolares.',
        'Risas descontroladas en una de las mejores comedias de instituto.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-vida-brian',
      name: 'La Vida de Brian',
      type: 'movie',
      genre: 'comedy',
      isRecommended: false,
      category: 'Comedia • Sátira Monty Python',
      price: '94 min',
      duration: '94 min',
      rating: '8.0',
      year: 1979,
      streaming: ['netflix'],
      color: '#EAB308',
      poster: 'https://image.tmdb.org/t/p/w500/b1xV1zC5B0x1Xf2E5yP7gX8k2s.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/b1xV1zC5B0x1Xf2E5yP7gX8k2s.jpg',
      image: 'https://image.tmdb.org/t/p/w500/b1xV1zC5B0x1Xf2E5yP7gX8k2s.jpg',
      synopsis: 'Brian nace en un establo vecino de Belén el mismo día que Jesús de Nazaret, iniciando una hilarante serie de confusiones teológicas y políticas.',
      description: 'La sátira humorística más brillante e hilarante de la historia del cine británico.',
      hints: [
        'El silbido contagioso de Always Look on the Bright Side of Life.',
        '¿Qué han hecho los romanos por nosotros? Además del acueducto y las calzadas.',
        'Una madre asomada a la ventana diciendo: ¡No es el mesías, es un chico muy travieso!',
        'El Frente Popular de Judea discutiendo con el Frente Judaico Popular.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 6. TERROR ---
    {
      id: 'movie-hereditary',
      name: 'Hereditary',
      type: 'movie',
      genre: 'horror',
      isRecommended: false,
      category: 'Terror • Ocultismo familiar',
      price: '127 min',
      duration: '127 min',
      rating: '6.6',
      year: 2018,
      streaming: ['prime', 'movistar'],
      color: '#7F1D1D',
      poster: 'https://image.tmdb.org/t/p/w500/p9fopAhsvy2IEL6j27q5q1x31A2.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/p9fopAhsvy2IEL6j27q5q1x31A2.jpg',
      image: 'https://image.tmdb.org/t/p/w500/p9fopAhsvy2IEL6j27q5q1x31A2.jpg',
      synopsis: 'Tras la muerte de la matriarca de la familia Graham, su hija Annie y sus nietos empiezan a desentrañar oscuros secretos de su tenebrosa herencia.',
      description: 'La ópera prima de Ari Aster que revolucionó el cine de terror independiente de A24.',
      hints: [
        'Un chasquido de lengua gutural que congela la sangre en las venas.',
        'Maquetas a escala en miniatura que recrean tragedias familiares grotescas.',
        'Toni Collette en una interpretación desgarradora y desquiciada en el ático.',
        'Figuras desnudas de una secta sonriendo en la oscuridad del jardín.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-dejame-salir',
      name: 'Déjame Salir',
      type: 'movie',
      genre: 'horror',
      isRecommended: false,
      category: 'Terror • Thriller psicológico',
      price: '104 min',
      duration: '104 min',
      rating: '6.8',
      year: 2017,
      streaming: ['prime', 'apple'],
      color: '#4C1D95',
      poster: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
      image: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
      synopsis: 'Chris visita durante el fin de semana la finca familiar de los padres de su novia Rose, donde percibe un comportamiento perturbador en el servicio.',
      description: 'Sensación cinematográfica ganadora del Óscar a Mejor Guion Original de Jordan Peele.',
      hints: [
        'Una cucharilla de plata revolviendo una taza de té para hipnotizarte.',
        'Caer flotando en un vacío negro infinito paralizado sin poder moverte (El Lugar Hundido).',
        'El flash del teléfono que despierta brevemente a los sirvientes del trance.',
        'Un ciervo atropellado en la carretera que presagia el horror venidero.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-un-lugar-tranquilo',
      name: 'Un Lugar Tranquilo',
      type: 'movie',
      genre: 'horror',
      isRecommended: false,
      category: 'Terror • Suspense sensorial',
      price: '90 min',
      duration: '90 min',
      rating: '6.6',
      year: 2018,
      streaming: ['netflix', 'prime'],
      color: '#1E293B',
      poster: 'https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg',
      image: 'https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg',
      synopsis: 'Una familia lucha por sobrevivir en absoluto silencio en un planeta dominado por voraces criaturas extraterrestres guiadas por el sonido.',
      description: 'Tensión magistral en silencio absoluto con Emily Blunt y John Krasinski.',
      hints: [
        'Caminar descalzo sobre senderos de arena suave para no hacer el menor ruido.',
        'Un clavo oxidado saliendo hacia arriba en el escalón de madera del sótano.',
        'Bombillas rojas que se encienden por toda la granja cuando hay peligro inminente.',
        'Un parto doloroso en una bañera tratando de ahogar los gritos.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 7. ANIMACIÓN ---
    {
      id: 'movie-spiderverse-1',
      name: 'Spider-Man: Un Nuevo Universo',
      type: 'movie',
      genre: 'animation',
      isRecommended: false,
      category: 'Animación • Acción y Estilo',
      price: '117 min',
      duration: '117 min',
      rating: '7.7',
      year: 2018,
      streaming: ['disney', 'prime'],
      color: '#BE123C',
      poster: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      image: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      synopsis: 'Miles Morales asume el manto del héroe arácnido y recibe la inesperada ayuda de cinco versiones alternativas llegadas de otras dimensiones.',
      description: 'Ganadora indiscutible del Óscar a Mejor Película de Animación.',
      hints: [
        'Un salto de fe desde lo alto de un rascacielos con zapatillas Nike Jordan.',
        'El temazo Sunflower de Post Malone sonando en los auriculares de Miles.',
        'Spider-Ham el cerdo de dibujos animados y Spider-Man Noir en blanco y negro.',
        'Grafitis con pintura en spray y pegatinas de estilo cómic pop.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-coco',
      name: 'Coco',
      type: 'movie',
      genre: 'animation',
      isRecommended: false,
      category: 'Animación • Emotiva Pixar',
      price: '105 min',
      duration: '105 min',
      rating: '7.9',
      year: 2017,
      streaming: ['disney'],
      color: '#EA580C',
      poster: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
      image: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
      synopsis: 'Miguel, un niño que sueña con ser músico a pesar de la prohibición familiar, se transporta accidentalmente a la deslumbrante Tierra de los Muertos.',
      description: 'La joya más emotiva de Pixar ambientada en la tradición del Día de Muertos.',
      hints: [
        'Un puente colgante dorado hecho con pétalos mágicos de flores de cempasúchil.',
        'La conmovedora canción Recuérdame cantada a la abuelita Coco.',
        'Un perro xoloitzcuintle callejero y leal llamado Dante como guía espiritual.',
        'Alebrijes voladores fluorescentes de colores radiantes en el cielo nocturno.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-del-reves-2',
      name: 'Del Revés 2',
      type: 'movie',
      genre: 'animation',
      isRecommended: false,
      category: 'Animación • Comedia de emociones',
      price: '96 min',
      duration: '96 min',
      rating: '7.3',
      year: 2024,
      streaming: ['disney'],
      color: '#06B6D4',
      poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
      image: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
      synopsis: 'La mente de la adolescente Riley vive una demolición repentina para hacer hueco a emociones desconocidas encabezadas por la hiperactiva Ansiedad.',
      description: 'El mayor fenómeno de taquilla de animación de la historia mundial del cine.',
      hints: [
        'Ansiedad con pelo naranja erizado cargada de maletas de preocupaciones futuras.',
        'Nuevas emociones: Envidia, Vergüenza con capucha y la perezosa Ennui en el sofá.',
        'La tormenta mental de dudas y el árbol de las creencias de identidad.',
        'Alegría y Tristeza uniendo fuerzas para que Riley acepte todas sus emociones.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 8. JOYAS OCULTAS Y CINE DE NICHO (ORIGINALES STREAMING & CULTO) ---
    {
      id: 'movie-sociedad-nieve',
      name: 'La sociedad de la nieve',
      type: 'movie',
      genre: 'drama',
      isRecommended: false,
      isNiche: true,
      category: 'Drama • Supervivencia / Original Netflix',
      price: '144 min',
      duration: '144 min',
      rating: '7.4',
      year: 2023,
      streaming: ['netflix'],
      color: '#0EA5E9',
      poster: 'https://image.tmdb.org/t/p/w500/2e853FDVSIso600RqAMunPxiZjq.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/2e853FDVSIso600RqAMunPxiZjq.jpg',
      image: 'https://image.tmdb.org/t/p/w500/2e853FDVSIso600RqAMunPxiZjq.jpg',
      synopsis: 'En 1972, el vuelo 571 de la Fuerza Aérea Uruguaya con un equipo de rugby se estrella en los Andes. Atrapados en uno de los entornos más hostiles del planeta, los supervivientes se apoyan para seguir vivos.',
      description: 'La sobrecogedora y humana obra maestra de J.A. Bayona nominada al Óscar para Netflix.',
      hints: [
        'El fuselaje del avión partido entre ventisqueros en mitad de la cordillera andina.',
        'Un zapato de rugby colgado y cartas de afecto escritas a las familias.',
        'La dura decisión moral y humana para no rendirse ante el frío extremo.',
        'Una caminata titánica de diez días sobre glaciares hacia los valles chilenos.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-as-bestas',
      name: 'As Bestas',
      type: 'movie',
      genre: 'drama',
      isRecommended: false,
      isNiche: true,
      category: 'Thriller • Tensión rural psicológica',
      price: '137 min',
      duration: '137 min',
      rating: '7.6',
      year: 2022,
      streaming: ['movistar', 'prime'],
      color: '#15803D',
      poster: 'https://image.tmdb.org/t/p/w500/porCAB66BfEpYwjI5q4cAq3g2Uk.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/porCAB66BfEpYwjI5q4cAq3g2Uk.jpg',
      image: 'https://image.tmdb.org/t/p/w500/porCAB66BfEpYwjI5q4cAq3g2Uk.jpg',
      synopsis: 'Antoine y Olga son una pareja francesa que vive pacíficamente en una aldea del interior de Galicia cultivando hortalizas. Su negativa a autorizar un parque eólico despierta la hostilidad letal de dos hermanos vecinos.',
      description: 'El sobrecogedor thriller de Rodrigo Sorogoyen ganador de 9 premios Goya.',
      hints: [
        'La tradición ancestral de la Rapa das Bestas inmovilizando a los caballos salvajes.',
        'Conversaciones cargadas de veneno y amenazas en la barra de la taberna del pueblo.',
        'Una cámara de vídeo doméstica escondida en el bosque para documentar el acoso.',
        'Un duelo dialéctico magistral entre dos madres que defienden su hogar.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-coherence',
      name: 'Coherence',
      type: 'movie',
      genre: 'scifi',
      isRecommended: false,
      isNiche: true,
      category: 'Ciencia Ficción • Suspense cuántico de culto',
      price: '89 min',
      duration: '89 min',
      rating: '7.0',
      year: 2013,
      streaming: ['prime'],
      color: '#3B82F6',
      poster: 'https://image.tmdb.org/t/p/w500/uD2C7K9T813a34a34bX8bY4vUaE.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/uD2C7K9T813a34a34bX8bY4vUaE.jpg',
      image: 'https://image.tmdb.org/t/p/w500/uD2C7K9T813a34a34bX8bY4vUaE.jpg',
      synopsis: 'Ocho amigos se reúnen para cenar la noche en que un cometa anómalo pasa cerca de la Tierra. Cuando la luz se apaga en todo el vecindario excepto en una misteriosa casa cercana, la realidad se fragmenta.',
      description: 'Aclamada joya independiente de tensión psicológica y paradojas cuánticas.',
      hints: [
        'Palos luminosos de colores fluorescentes (rojo, azul y verde) para identificarse en la oscuridad.',
        'Una caja con una ruleta y fotografías con números escritos en el reverso.',
        'Descubrir que al doblar la esquina hay otra casa idéntica con ellos mismos dentro.',
        'El experimento del gato de Schrödinger cobrando vida durante una cena entre amigos.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-ex-machina',
      name: 'Ex Machina',
      type: 'movie',
      genre: 'scifi',
      isRecommended: false,
      isNiche: true,
      category: 'Ciencia Ficción • Inteligencia artificial',
      price: '108 min',
      duration: '108 min',
      rating: '7.1',
      year: 2014,
      streaming: ['prime', 'movistar'],
      color: '#06B6D4',
      poster: 'https://image.tmdb.org/t/p/w500/wxPhn4lvgbxNCLJGHdLCYApSGeR.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/wxPhn4lvgbxNCLJGHdLCYApSGeR.jpg',
      image: 'https://image.tmdb.org/t/p/w500/wxPhn4lvgbxNCLJGHdLCYApSGeR.jpg',
      synopsis: 'Caleb, un joven programador, es seleccionado para pasar una semana en la remota residencia en las montañas del magnate de su empresa. Su tarea: someter al test de Turing a Ava, una avanzada androide.',
      description: 'Fascinante thriller psicológico sobre los límites éticos y seductores de la IA.',
      hints: [
        'Una caja de cristal blindado y una elegante silueta robótica de malla transparente.',
        'Los cortes de energía que desactivan los micrófonos para susurrar secretos.',
        'Una sesión de baile disco improvisada y desconcertante entre Oscar Isaac y Sonoya Mizuno.',
        'El test de Turing puesto a prueba con consecuencias psicológicas impredecibles.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-klaus',
      name: 'Klaus',
      type: 'movie',
      genre: 'animation',
      isRecommended: false,
      isNiche: true,
      category: 'Animación • Joya original Netflix',
      price: '96 min',
      duration: '96 min',
      rating: '7.6',
      year: 2019,
      streaming: ['netflix'],
      color: '#F59E0B',
      poster: 'https://image.tmdb.org/t/p/w500/q1250yCMGldNTA7kCLSJB0pYCLi.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/q1250yCMGldNTA7kCLSJB0pYCLi.jpg',
      image: 'https://image.tmdb.org/t/p/w500/q1250yCMGldNTA7kCLSJB0pYCLi.jpg',
      synopsis: 'Jesper, el peor estudiante de la academia postal, es desterrado a una gélida isla del Círculo Polar Ártico. Allí conoce a Klaus, un ermitaño artesano con quien comenzará a repartir regalos a escondidas.',
      description: 'El deslumbrante prodigio de animación española nominado al Óscar y original de Netflix.',
      hints: [
        'Un cartero consentido transportado en barco a la gélida y enemistada ciudad de Smeerensburg.',
        'Juguetes de madera tallados a mano entregados en silencio a través de las chimeneas.',
        'Un trineo volando a la luz de la luna con la ayuda de renos veloces.',
        'Un acto sincero de bondad siempre provoca otro.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-captain-fantastic',
      name: 'Captain Fantastic',
      type: 'movie',
      genre: 'drama',
      isRecommended: false,
      isNiche: true,
      category: 'Drama • Familia y Contracultura',
      price: '118 min',
      duration: '118 min',
      rating: '7.4',
      year: 2016,
      streaming: ['prime', 'apple'],
      color: '#10B981',
      poster: 'https://image.tmdb.org/t/p/w500/hrlKoECbUi14fH4mO69d58iVd1T.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/hrlKoECbUi14fH4mO69d58iVd1T.jpg',
      image: 'https://image.tmdb.org/t/p/w500/hrlKoECbUi14fH4mO69d58iVd1T.jpg',
      synopsis: 'Ben Cash vive en los bosques del noroeste estadounidense con sus seis hijos, educándolos con una rigurosa preparación física e intelectual lejos del consumismo. Un suceso les forzará a entrar al mundo real.',
      description: 'Emotiva y provocadora historia familiar protagonizada por Viggo Mortensen.',
      hints: [
        'Celebrar el día de Noam Chomsky en lugar de las fiestas tradicionales de Navidad.',
        'Un autobús escolar antiguo reconvertido en hogar rodante llamado Steve.',
        'Cazar en el bosque y debatir sobre filosofía cuántica y literatura clásica junto a la hoguera.',
        'Una emotiva versión acústica de Sweet Child O Mine cantada en familia.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-drive',
      name: 'Drive',
      type: 'movie',
      genre: 'action',
      isRecommended: false,
      isNiche: true,
      category: 'Acción • Neo-noir de culto',
      price: '100 min',
      duration: '100 min',
      rating: '7.2',
      year: 2011,
      streaming: ['prime', 'movistar'],
      color: '#EC4899',
      poster: 'https://image.tmdb.org/t/p/w500/602vevIURmpDfzbnv5Ubi6wIkQm.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/602vevIURmpDfzbnv5Ubi6wIkQm.jpg',
      image: 'https://image.tmdb.org/t/p/w500/602vevIURmpDfzbnv5Ubi6wIkQm.jpg',
      synopsis: 'Un silencioso especialista de cine trabaja de noche como conductor para criminales. Su estricto código moral se ve amenazado cuando decide ayudar al marido de su vecina Irene para salvar a su familia.',
      description: 'El estilizado thriller neo-noir de Nicolas Winding Refn con Ryan Gosling.',
      hints: [
        'Una chaqueta de satén blanca con un escorpión dorado bordado en la espalda.',
        'Un palillo en la boca y un cronómetro en el salpicadero esperando exactamente 5 minutos.',
        'El tema musical synthwave Nightcall de Kavinsky iluminando las calles nocturnas de Los Ángeles.',
        'Un beso a cámara lenta en un ascensor antes de una pelea fulminante.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-el-hoyo',
      name: 'El hoyo',
      type: 'movie',
      genre: 'scifi',
      isRecommended: false,
      isNiche: true,
      category: 'Distopía • Original Netflix de culto',
      price: '94 min',
      duration: '94 min',
      rating: '6.4',
      year: 2019,
      streaming: ['netflix'],
      color: '#EF4444',
      poster: 'https://image.tmdb.org/t/p/w500/8ZX18L5m6rH5viSYpRnTSbb9eXh.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/8ZX18L5m6rH5viSYpRnTSbb9eXh.jpg',
      image: 'https://image.tmdb.org/t/p/w500/8ZX18L5m6rH5viSYpRnTSbb9eXh.jpg',
      synopsis: 'En una estructura vertical con un número desconocido de niveles y dos presos por piso, una plataforma cargada con un banquete desciende a diario. Los de arriba comen bien; los de abajo sufren hambre.',
      description: 'El viral e impactante fenómeno distópico español que conquistó el catálogo global de Netflix.',
      hints: [
        'Una plataforma flotante repleta de comida exquisita bajando por un hueco central sin fin.',
        'La inquietante palabra "obvio" repetida por un veterano compañero de celda con un cuchillo Samurái.',
        'Llevar un ejemplar de Don Quijote de la Mancha como único objeto personal al encierro.',
        'Un postre de panna cotta intacto enviado al nivel cero como mensaje supremo.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-glass-onion',
      name: 'Glass Onion: Un misterio de Knives Out',
      type: 'movie',
      genre: 'comedy',
      isRecommended: false,
      isNiche: true,
      category: 'Misterio • Original Netflix',
      price: '139 min',
      duration: '139 min',
      rating: '6.1',
      year: 2022,
      streaming: ['netflix'],
      color: '#8B5CF6',
      poster: 'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',
      image: 'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',
      synopsis: 'El detective Benoit Blanc viaja a una isla privada griega invitado a una reunión de viejos amigos organizada por un excéntrico magnate de la tecnología para fingir su propio asesinato.',
      description: 'Divertido whodunnit original de Netflix encabezado por Daniel Craig y Edward Norton.',
      hints: [
        'Cajas de rompecabezas mecánicas enviadas como invitación a una isla griega privada.',
        'Una cúpula de cristal gigante en lo alto de una mansión ultra moderna.',
        'Daniel Craig con un pañuelo al cuello resolviendo el misterio antes de la cena.',
        'Giros inesperados, traiciones entre amigos influyentes y una Mona Lisa protegida por código.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-uncut-gems',
      name: 'Diamantes en bruto',
      type: 'movie',
      genre: 'drama',
      isRecommended: false,
      isNiche: true,
      category: 'Thriller • Adrenalina / Original Netflix',
      price: '135 min',
      duration: '135 min',
      rating: '6.6',
      year: 2019,
      streaming: ['netflix'],
      color: '#D97706',
      poster: 'https://image.tmdb.org/t/p/w500/mZjGNlSTxDZxyc1WNVnXLzGk5oa.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/mZjGNlSTxDZxyc1WNVnXLzGk5oa.jpg',
      image: 'https://image.tmdb.org/t/p/w500/mZjGNlSTxDZxyc1WNVnXLzGk5oa.jpg',
      synopsis: 'Howard Ratner, un carismático joyero del distrito de los diamantes de Nueva York, tiene una adicción incontrolable al juego. Con prestamistas pisándole los talones, lo apuesta todo a un valioso ópalo etíope.',
      description: 'Incesante montaña rusa de tensión dirigida por los hermanos Safdie con Adam Sandler.',
      hints: [
        'Un ópalo negro etíope incrustado en roca con destellos multicolores hipnóticos.',
        'La estrella de la NBA Kevin Garnett obsesionado con la energía de la gema.',
        'Llamadas telefónicas frenéticas, empeños cruzados y apuestas combinadas en directo.',
        'Un cristal blindado bloqueado en una joyería abarrotada de tensión.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-barbarian',
      name: 'Barbarian',
      type: 'movie',
      genre: 'horror',
      isRecommended: false,
      isNiche: true,
      category: 'Terror • Suspense impredecible',
      price: '102 min',
      duration: '102 min',
      rating: '6.4',
      year: 2022,
      streaming: ['disney'],
      color: '#7F1D1D',
      poster: 'https://image.tmdb.org/t/p/w500/id8yQoxgwVOtiuzlTEzT2Gv2T4t.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/id8yQoxgwVOtiuzlTEzT2Gv2T4t.jpg',
      image: 'https://image.tmdb.org/t/p/w500/id8yQoxgwVOtiuzlTEzT2Gv2T4t.jpg',
      synopsis: 'Una joven alquila una casa en Detroit para acudir a una entrevista laboral. Al llegar de noche bajo una tormenta, descubre que la casa ya ha sido alquilada por un desconocido, escondiendo túneles secretos.',
      description: 'El aclamado thriller de terror contemporáneo de Zach Cregger cargado de giros radicales.',
      hints: [
        'Llegar a medianoche bajo una lluvia torrencial y encontrar la llave del candado vacía.',
        'Una cuerda colgada en la pared del sótano que abre un pasadizo secreto en penumbra.',
        'Un giro de trama radical a mitad de película que cambia por completo de personaje y época.',
        'Túneles ocultos bajo los cimientos de un barrio abandonado de Detroit.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 9. ROMÁNTICAS Y COMEDIAS DE PAREJA ---
    {
      id: 'movie-3msc',
      name: 'A tres metros sobre el cielo',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Éxito Juvenil Español',
      price: '120 min',
      duration: '120 min',
      rating: '4.7',
      year: 2010,
      streaming: ['prime', 'netflix'],
      color: '#E11D48',
      poster: 'https://image.tmdb.org/t/p/w500/2Mq10FWFbxoYgsZysWlw7T9wSNe.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/2Mq10FWFbxoYgsZysWlw7T9wSNe.jpg',
      image: 'https://image.tmdb.org/t/p/w500/2Mq10FWFbxoYgsZysWlw7T9wSNe.jpg',
      synopsis: 'En Barcelona, dos jóvenes de mundos opuestos se enamoran: Babi, una chica de clase alta dulce e inocente, y Hache, un chico rebelde e impulsivo aficionado al riesgo y las carreras ilegales de motos.',
      description: 'El fenómeno romántico juvenil español protagonizado por Mario Casas y María Valverde.',
      hints: [
        'Una moto de gran cilindrada rugiendo a toda velocidad por la noche.',
        'Un candado grabado cerrado en el puente sobre el río como promesa de amor eterno.',
        'Mario Casas gritando que se siente a tres metros sobre el cielo.',
        'Carreras ilegales, adrenalina y un romance apasionado entre dos mundos opuestos.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-it-ends-with-us',
      name: 'Romper el círculo',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Drama / Best Seller',
      price: '130 min',
      duration: '130 min',
      rating: '5.6',
      year: 2024,
      streaming: ['prime', 'apple', 'movistar'],
      color: '#DB2777',
      poster: 'https://image.tmdb.org/t/p/w500/AjV6jFJ2YFIluYo4GQf13AA1tqu.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/AjV6jFJ2YFIluYo4GQf13AA1tqu.jpg',
      image: 'https://image.tmdb.org/t/p/w500/AjV6jFJ2YFIluYo4GQf13AA1tqu.jpg',
      synopsis: 'Lily Bloom supera una infancia traumática para abrir una floristería en Boston, enamorándose del neurocirujano Ryle. Pero la reaparición de su primer amor Atlas la obligará a tomar una decisión desgarradora.',
      description: 'La adaptación del fenómeno editorial de Colleen Hoover con Blake Lively.',
      hints: [
        'Una preciosa floristería bohemia inaugurada con ilusión en Boston.',
        'Blake Lively luciendo un icónico abrigo largo y vaqueros de patchwork.',
        'El reencuentro casual con su amor de juventud en un restaurante de moda.',
        'La difícil fuerza necesaria para romper el círculo del dolor en una relación.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-diario-noa',
      name: 'El diario de Noa',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Clásico inolvidable',
      price: '124 min',
      duration: '124 min',
      rating: '7.3',
      year: 2004,
      streaming: ['hbo', 'movistar'],
      color: '#BE185D',
      poster: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg',
      image: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg',
      synopsis: 'En una residencia de ancianos, un hombre lee a una mujer con Alzheimer un cuaderno que relata el romance entre Noah y Allie, dos jóvenes de Carolina del Norte separados por las clases sociales y la guerra.',
      description: 'Uno de los romances más aclamados del cine moderno, con Ryan Gosling y Rachel McAdams.',
      hints: [
        'Un beso apasionado bajo una lluvia torrencial sobre el lago con cisnes.',
        'Una vieja casa blanca de campo restaurada con contraventanas azules.',
        'Cartas de amor que nunca fueron entregadas durante 365 días.',
        'Un anciano leyendo un gastado cuaderno de notas a su gran amor en la residencia.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-cuestion-tiempo',
      name: 'Una cuestión de tiempo',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Comedia / Viajes en el tiempo',
      price: '123 min',
      duration: '123 min',
      rating: '7.6',
      year: 2013,
      streaming: ['prime', 'movistar'],
      color: '#F43F5E',
      poster: 'https://image.tmdb.org/t/p/w500/iWyvwoCJcgrwiozAVR99qT775z4.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/iWyvwoCJcgrwiozAVR99qT775z4.jpg',
      image: 'https://image.tmdb.org/t/p/w500/iWyvwoCJcgrwiozAVR99qT775z4.jpg',
      synopsis: 'Al cumplir 21 años, Tim descubre un secreto familiar: los hombres de su familia pueden viajar en el tiempo al pasado. Tim decide usar su don para conquistar al amor de su vida, Mary.',
      description: 'Conmovedora comedia romántica de Richard Curtis sobre el amor y apreciar cada día ordinario.',
      hints: [
        'Apretar los puños en un armario a oscuras para volver atrás en el tiempo.',
        'Una primera cita a ciegas en un restaurante completamente en penumbra en Londres.',
        'Una boda al aire libre arruinada por un vendaval con risas bajo el temporal.',
        'El emotivo paseo junto al mar con su padre disfrutando de un día extra.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-lalaland',
      name: 'La La Land',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Musical y Pasión',
      price: '128 min',
      duration: '128 min',
      rating: '7.5',
      year: 2016,
      streaming: ['netflix', 'prime', 'movistar'],
      color: '#A855F7',
      poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      image: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      synopsis: 'Mia, una aspirante a actriz, y Sebastian, un pianista de jazz entregado, se enamoran locamente en Los Ángeles mientras luchan por abrirse camino en sus respectivas carreras artísticas.',
      description: 'Ganadora de 6 premios Óscar con la inolvidable química entre Emma Stone y Ryan Gosling.',
      hints: [
        'Un número de claqué al atardecer en el mirador de Griffith Park con vistas a Los Ángeles.',
        'Un vestido amarillo vibrante y una melodía nostálgica al piano de jazz.',
        'Bailar flotando entre las estrellas dentro del planetario de Griffith.',
        'La secuencia final de lo que pudo haber sido resumida en una mirada.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-antes-amanecer',
      name: 'Antes de amanecer',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Diálogo / Cine de culto',
      price: '105 min',
      duration: '105 min',
      rating: '7.4',
      year: 1995,
      streaming: ['apple', 'prime'],
      color: '#EC4899',
      poster: 'https://image.tmdb.org/t/p/w500/z7jjX1a9W9g8j9d00sY5vXlV0h.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/z7jjX1a9W9g8j9d00sY5vXlV0h.jpg',
      image: 'https://image.tmdb.org/t/p/w500/z7jjX1a9W9g8j9d00sY5vXlV0h.jpg',
      synopsis: 'Jesse, un joven estadounidense, y Céline, una estudiante francesa, se conocen en un tren europeo y deciden bajarse juntos en Viena para pasar una única noche paseando y conversando antes de que amanezca.',
      description: 'La obra cumbre del romance conversacional dirigida por Richard Linklater.',
      hints: [
        'Miradas tímidas y cómplices dentro de una cabina de escucha de discos de vinilo.',
        'Un poema improvisado por un vagabundo a orillas del río Danubio.',
        'Una promesa de encontrarse exactamente en el mismo andén seis meses después.',
        'Pasear por las calles empedradas de Viena hasta el primer rayo de sol.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-orgullo-prejuicio',
      name: 'Orgullo y prejuicio',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Clásico de Época',
      price: '127 min',
      duration: '127 min',
      rating: '7.1',
      year: 2005,
      streaming: ['netflix', 'prime'],
      color: '#9333EA',
      poster: 'https://image.tmdb.org/t/p/w500/1Onam6oWyFAUCcoxtdWkACtEiNr.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/1Onam6oWyFAUCcoxtdWkACtEiNr.jpg',
      image: 'https://image.tmdb.org/t/p/w500/1Onam6oWyFAUCcoxtdWkACtEiNr.jpg',
      synopsis: 'Las cinco hermanas Bennet han sido criadas por su madre con el único propósito de encontrar marido. Elizabeth, inteligente y decidida, desafía las convenciones cuando conoce al arrogante Sr. Darcy.',
      description: 'La cautivadora adaptación de Jane Austen protagonizada por Keira Knightley y Matthew Macfadyen.',
      hints: [
        'El señor Darcy caminando por la pradera envuelta en niebla al amanecer.',
        'El roce de manos tras ayudar a Elizabeth a subir al carruaje.',
        'Una declaración bajo la lluvia en un templete de piedra con reproches sinceros.',
        'Un baile de miradas tensas mientras todo el salón parece desvanecerse.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-500-dias',
      name: '(500) días juntos',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Comedia indie',
      price: '95 min',
      duration: '95 min',
      rating: '6.8',
      year: 2009,
      streaming: ['disney'],
      color: '#0284C7',
      poster: 'https://image.tmdb.org/t/p/w500/fTq8o0k856zW4G99b1r5H1W5WbC.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/fTq8o0k856zW4G99b1r5H1W5WbC.jpg',
      image: 'https://image.tmdb.org/t/p/w500/fTq8o0k856zW4G99b1r5H1W5WbC.jpg',
      synopsis: 'Tom, un aspirante a arquitecto que trabaja redactando tarjetas de felicitación, cree en el destino amoroso. Al conocer a Summer, queda deslumbrado, comenzando una crónica no lineal de su relación.',
      description: 'Una perspectiva fresca, desenfadada y realista sobre el desamor y las expectativas.',
      hints: [
        'Cantar a viva voz en una tienda IKEA imaginando que es su apartamento.',
        'Pantalla dividida comparando expectativa contra cruda realidad en una fiesta en la terraza.',
        'Ambos coinciden en su devoción por la banda The Smiths en un ascensor.',
        'Un número musical con baile callejero tras pasar la mejor noche de su vida.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-palm-springs',
      name: 'Palm Springs',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Comedia / Bucle temporal',
      price: '90 min',
      duration: '90 min',
      rating: '6.6',
      year: 2020,
      streaming: ['prime'],
      color: '#F59E0B',
      poster: 'https://image.tmdb.org/t/p/w500/gnAfqiV7yO3Jq9IntTmwkcaICqc.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/gnAfqiV7yO3Jq9IntTmwkcaICqc.jpg',
      image: 'https://image.tmdb.org/t/p/w500/gnAfqiV7yO3Jq9IntTmwkcaICqc.jpg',
      synopsis: 'El despreocupado Nyles y la dama de honor Sarah se conocen en una boda en Palm Springs. Tras un inesperado accidente en una cueva del desierto, quedan atrapados juntos en el mismo día eternamente.',
      description: 'Divertida y original comedia romántica con Andy Samberg y Cristin Milioti.',
      hints: [
        'Un flotador de piscina con camisa hawaiana y cerveza fresca cada mañana.',
        'Una cueva misteriosa con un resplandor ámbar en mitad del desierto de California.',
        'Ensayar un baile sincronizado en un bar de carretera para pasar el rato en el bucle.',
        'Dinosaurios paseando en el horizonte alucinando juntos al atardecer.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'movie-anyone-but-you',
      name: 'Cualquiera menos tú',
      type: 'movie',
      genre: 'romance',
      isRecommended: false,
      isRomance: true,
      category: 'Romance • Comedia desenfadada',
      price: '103 min',
      duration: '103 min',
      rating: '5.1',
      year: 2023,
      streaming: ['movistar', 'prime', 'apple'],
      color: '#06B6D4',
      poster: 'https://image.tmdb.org/t/p/w500/wNEHNqo3MgHmj3BUiPSqqq5czcm.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/wNEHNqo3MgHmj3BUiPSqqq5czcm.jpg',
      image: 'https://image.tmdb.org/t/p/w500/wNEHNqo3MgHmj3BUiPSqqq5czcm.jpg',
      synopsis: 'Tras una primera cita idílica que termina en malentendido, Bea y Ben descubren que ambos están invitados a la misma boda en Australia. Deciden fingir ser pareja por conveniencia con resultados disparatados.',
      description: 'El éxito viral de taquilla de comedia romántica con Sydney Sweeney y Glen Powell.',
      hints: [
        'Fingir ser la pareja perfecta frente a los invitados de una boda en Sídney.',
        'Cantar a voz en grito Unwritten de Natasha Bedingfield para calmar los nervios en helicóptero.',
        'Un incidente cómico con una araña gigante en los pantalones en pleno bosque.',
        'La recreación moderna de Mucho ruido y pocas nueces con sol y playas australianas.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },

    // --- 10. SERIES DEDICADAS (NO MEZCLADAS CON PELÍCULAS) ---
    {
      id: 'series-stranger-things',
      name: 'Stranger Things',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Misterio / Ochenta',
      price: '4 Temporadas',
      duration: '4 Temporadas',
      rating: '7.5',
      year: 2016,
      streaming: ['netflix'],
      color: '#E50914',
      poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      synopsis: 'En Hawkins en 1983, la desaparición del pequeño Will Byers desvela experimentos gubernamentales secretos y una niña con poderes telequinéticos.',
      description: 'El mayor fenómeno de cultura pop y nostalgia ochentera de Netflix.',
      hints: [
        'Luces de Navidad parpadeando en la pared del salón con letras pintadas.',
        'Un mundo del revés oscuro lleno de esporas y monstruos sin rostro (Demogorgon).',
        'Niños en bicicleta con walkie-talkies huyendo de furgonetas secretas.',
        'Waffles Eggo y sangre cayendo de la nariz al mover objetos con la mente.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-the-last-of-us',
      name: 'The Last of Us',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Drama Postapocalíptico',
      price: '1 Temporada',
      duration: '1 Temporada',
      rating: '7.6',
      year: 2023,
      streaming: ['hbo'],
      color: '#65A30D',
      poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2V7JMrne.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2V7JMrne.jpg',
      image: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2V7JMrne.jpg',
      synopsis: 'Joel, un endurecido contrabandista que sobrevivió a una pandemia por hongos, debe escoltar a la adolescente Ellie a través de unos Estados Unidos devastados.',
      description: 'La aclamada adaptación de HBO protagonizada por Pedro Pascal y Bella Ramsey.',
      hints: [
        'El escalofriante chasquido en la oscuridad de los infectados por Cordyceps.',
        'La emotiva historia de amor y supervivencia de Bill y Frank en su pueblo fortificado.',
        'Jirafas pastando pacíficamente entre las ruinas abandonadas de Salt Lake City.',
        'Pedro Pascal jurando proteger a Ellie cueste lo que cueste.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-the-bear',
      name: 'The Bear',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Drama Culinario',
      price: '3 Temporadas',
      duration: '3 Temporadas',
      rating: '7.8',
      year: 2022,
      streaming: ['disney'],
      color: '#0284C7',
      poster: 'https://image.tmdb.org/t/p/w500/zPyZ55UjC1Z2s32V0L16u0jZJ2m.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/zPyZ55UjC1Z2s32V0L16u0jZJ2m.jpg',
      image: 'https://image.tmdb.org/t/p/w500/zPyZ55UjC1Z2s32V0L16u0jZJ2m.jpg',
      synopsis: 'Carmy Berzatto, joven chef de alta cocina, regresa a Chicago para hacerse cargo de la caótica sandwichería familiar tras el suicidio de su hermano.',
      description: 'Ganadora de decenas de premios Emmy por su ritmo trepidante y actuaciones estelares.',
      hints: [
        '¡Oído, chef! Grito constante en una cocina con el fuego al rojo vivo.',
        'Botes de salsa de tomate italiana con miles de dólares escondidos.',
        'El agobiante episodio a tiempo real sin cortes con una comanda desbordada.',
        'Tenedores limpios, delantales azules y sándwiches de ternera italiana sublimes.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-ted-lasso',
      name: 'Ted Lasso',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Comedia / Optimismo',
      price: '3 Temporadas',
      duration: '3 Temporadas',
      rating: '7.8',
      year: 2020,
      streaming: ['apple'],
      color: '#EAB308',
      poster: 'https://image.tmdb.org/t/p/w500/5fhZdwP1DVJ0FyVNL7y7m05L4gq.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/5fhZdwP1DVJ0FyVNL7y7m05L4gq.jpg',
      image: 'https://image.tmdb.org/t/p/w500/5fhZdwP1DVJ0FyVNL7y7m05L4gq.jpg',
      synopsis: 'Un afable e ingenuo entrenador estadounidense de fútbol americano universitario es fichado para dirigir al AFC Richmond, club de la Premier League inglesa.',
      description: 'La serie más entrañable y premiada de Apple TV+ que conquistó los corazones de todo el mundo.',
      hints: [
        'Un cartel amarillo pegado torcido sobre la puerta del vestuario con la palabra BELIEVE.',
        'Galletas caseras de mantequilla llevadas cada mañana en una cajita rosa a la jefa.',
        'El mostacho inconfundible y la sonrisa contagiosa de Jason Sudeikis.',
        'Fútbol, salud mental, empatía y risas sinceras en los pubs de Londres.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-juego-tronos',
      name: 'Juego de Tronos',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Fantasía Medieval',
      price: '8 Temporadas',
      duration: '8 Temporadas',
      rating: '8.6',
      year: 2011,
      streaming: ['hbo'],
      color: '#475569',
      poster: 'https://image.tmdb.org/t/p/w500/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg',
      image: 'https://image.tmdb.org/t/p/w500/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg',
      synopsis: 'Nueve familias nobles combaten por el Trono de Hierro de Poniente mientras un enemigo ancestral resurge tras milenios sepultado más allá del Muro.',
      description: 'El mayor acontecimiento televisivo global de la historia moderna de HBO.',
      hints: [
        'El invierno se acerca: el lema severo de la Casa Stark de Invernalia.',
        'Un trono forjado con mil espadas de enemigos caídos fundidas con fuego de dragón.',
        'La sobrecogedora e inesperada Boda Roja a ritmo de Las Lluvias de Castamere.',
        'Daenerys Targaryen emergiendo ilesa de las llamas con tres dragones en sus hombros.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-la-casa-papel',
      name: 'La Casa de Papel',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Suspense / Atraco',
      price: '5 Temporadas',
      duration: '5 Temporadas',
      rating: '6.8',
      year: 2017,
      streaming: ['netflix'],
      color: '#DC2626',
      poster: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
      image: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
      synopsis: 'Ocho atracadores guiados desde el exterior por El Profesor toman rehenes y se encierran durante once días en la Fábrica Nacional de Moneda para imprimir miles de millones de euros.',
      description: 'El mayor éxito internacional de la ficción televisiva en español.',
      hints: [
        'Monos de trabajo rojos y máscaras con el rostro de Salvador Dalí.',
        'Nombres en clave de ciudades como Tokio, Berlín, Denver o Nairobi.',
        'El himno antifascista italiano Bella Ciao cantado a coro.',
        'Un plan de ajedrez donde cada posible movimiento de la policía está previsto.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-succession',
      name: 'Succession',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Drama / Sátira',
      price: '4 Temporadas',
      duration: '4 Temporadas',
      rating: '8.1',
      year: 2018,
      streaming: ['hbo'],
      color: '#334155',
      poster: 'https://image.tmdb.org/t/p/w500/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg',
      image: 'https://image.tmdb.org/t/p/w500/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg',
      synopsis: 'Los cuatro hijos del multimillonario y despiadado Logan Roy disputan encarnizadamente el control del imperio mediático familiar Waystar RoyCo cuando su salud empieza a flaquear.',
      description: 'Diálogos cortantes, traición familiar y sátira feroz que arrasó en todas las galas de premios.',
      hints: [
        'Un tema principal de piano hipnótico e inconfundible de Nicholas Britell.',
        'Juegos perversos de poder como Boar on the floor en escapadas de lujo.',
        'Kendall, Shiv, Roman y Connor batallando por la aprobación de su padre.',
        'Humor ácido y drama de altísimo voltaje en áticos y jets privados.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-shogun',
      name: 'Shōgun',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Drama Histórico',
      price: '1 Temporada',
      duration: '1 Temporada',
      rating: '7.5',
      year: 2024,
      streaming: ['disney'],
      color: '#B91C1C',
      poster: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
      image: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
      synopsis: 'En el Japón feudal de 1600, Lord Yoshii Toranaga lucha por sobrevivir ante sus rivales del Consejo de Regentes cuando un barco europeo naufraga con secretos que alteran el equilibrio.',
      description: 'Elogiada unánimemente como una de las mejores series históricas de la década, batiendo récord histórico de Emmys.',
      hints: [
        'Guerreros samuráis con armaduras tradicionales y katanas relucientes.',
        'Alianzas tejidas con palabras sutiles en casas de té de Kioto y Osaka.',
        'Hiroyuki Sanada encarnando al estratega supremo Toranaga.',
        'Honor, poesía, intriga política y batallas en el Japón señorial.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    },
    {
      id: 'series-breaking-bad',
      name: 'Breaking Bad',
      type: 'series',
      genre: 'series',
      isRecommended: false,
      category: 'Serie • Crimen / Drama',
      price: '5 Temporadas',
      duration: '5 Temporadas',
      rating: '8.8',
      year: 2008,
      streaming: ['netflix'],
      color: '#15803D',
      poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      logo: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      synopsis: 'Walter White, profesor de química con cáncer terminal, se asocia con su exalumno Jesse Pinkman para producir metanfetamina azul y asegurar el futuro económico de su familia.',
      description: 'Considerada una de las mejores series de la historia de la televisión mundial.',
      hints: [
        'Una caravana destartalada cocinando en medio del desierto de Nuevo México.',
        'El sombrero negro y las gafas de sol de Heisenberg.',
        'Cristales azules de pureza química inigualable.',
        'Bryan Cranston y Aaron Paul en una transformación dramática insuperable.'
      ],
      branches: [{ name: 'En casa en el sofá', address: 'Salón con manta y palomitas', lat: 37.6000, lng: -0.9850 }]
    }
  ];


  const PLANS_CATALOGUE = [
    {
      id: 'plan-cine',
      name: 'Cine y Palomitas',
      category: 'Ocio • Noche',
      price: '2h 30m',
      color: '#EC4899',
      logo: makePlanSvg('#EC4899', 'cinema'),
      image: makePlanSvg('#EC4899', 'cinema'),
      description: 'Estreno en pantalla gigante, butacas cómodas, cubo grande de palomitas calientes y refresco.',
      hints: [
        'Aroma inconfundible a palomitas de mantequilla recién hechas en el hall.',
        'Las luces se apagan por completo y el sonido envolvente retumba.',
        'La eterna disputa amigable por quién se queda con el mejor reposabrazos.',
        'El plan infalible para desconectar cualquier tarde de fin de semana.'
      ],
      branches: [
        { name: 'Neocine Mandarache', address: 'Ronda Ciudad de La Unión, Cartagena', lat: 37.6160, lng: -0.9820 },
        { name: 'Cinesa Nueva Condomina', address: 'Autovía A-7 km 560, Murcia', lat: 38.0332, lng: -1.1441 }
      ]
    },
    {
      id: 'plan-paseo-helado',
      name: 'Paseo al Atardecer y Helado',
      category: 'Romántico • Aire libre',
      price: '1h 30m',
      color: '#F59E0B',
      logo: makePlanSvg('#F59E0B', 'sunset'),
      image: makePlanSvg('#F59E0B', 'sunset'),
      description: 'Paseo relajado por el puerto o casco histórico con parada en la mejor heladería artesanal.',
      hints: [
        'Ver el cielo teñirse de tonos rosas, dorados y anaranjados.',
        'Elegir tarrina o cucurucho con dos sabores favoritos.',
        'Caminar sin prisa charlando de todo un poco mientras baja la brisa.',
        'Sentarse en un banco frente al mar o en una plaza bonita.'
      ],
      branches: [
        { name: 'Puerto de Cartagena', address: 'Paseo Alfonso XII, Cartagena', lat: 37.5980, lng: -0.9850 },
        { name: 'Paseo del Malecón', address: 'Plaza Camachos / Malecón, Murcia', lat: 37.9820, lng: -1.1350 }
      ]
    },
    {
      id: 'plan-bolera',
      name: 'Bolera y Arcade Retro',
      category: 'Diversión • Pique sano',
      price: '2h',
      color: '#3B82F6',
      logo: makePlanSvg('#3B82F6', 'bowling'),
      image: makePlanSvg('#3B82F6', 'bowling'),
      description: 'Partida de bolos americana con zapatos especiales, pique de puntos y máquinas de aire hockey.',
      hints: [
        'Calzarse los zapatos bicolores especiales de pista.',
        'El sonido crujiente y satisfactorio al derribar los diez bolos de pleno.',
        'Partida a vida o muerte en la mesa de disco flotante de aire hockey.',
        'Pique sano para ver a quién le toca pagar la siguiente ronda.'
      ],
      branches: [
        { name: 'Bowling CC Espacio Mediterráneo', address: 'Parque Comercial Mediterráneo, Cartagena', lat: 37.6186, lng: -0.9575 },
        { name: 'Ozone Bowling ZigZag', address: 'Av. Juan Carlos I, Murcia', lat: 38.0010, lng: -1.1410 }
      ]
    },
    {
      id: 'plan-spa',
      name: 'Spa y Circuito Termal',
      category: 'Bienestar • Desconexión',
      price: '2h',
      color: '#06B6D4',
      logo: makePlanSvg('#06B6D4', 'spa'),
      image: makePlanSvg('#06B6D4', 'spa'),
      description: 'Circuito de aguas relajantes, chorros cervicales, sauna de vapor, jacuzzi y ambiente zen.',
      hints: [
        'Vapor templado, aroma a eucalipto y música ambiental relajante.',
        'Burbujas en el jacuzzi para descargar toda la tensión muscular acumulada.',
        'El contraste revitalizante del chorro de agua fría tras el baño de vapor.',
        'Salir sintiéndose como flotando en una nube de paz.'
      ],
      branches: [
        { name: 'Balneario & Spa', address: 'Zona termal Archena / Los Alcázares', lat: 37.7450, lng: -0.8500 }
      ]
    },
    {
      id: 'plan-picnic',
      name: 'Picnic al Aire Libre',
      category: 'Naturaleza • Relax',
      price: '2h 30m',
      color: '#10B981',
      logo: makePlanSvg('#10B981', 'picnic'),
      image: makePlanSvg('#10B981', 'picnic'),
      description: 'Manta sobre la hierba, cesta con aperitivos, fruta, embutidos y bebida fresca bajo los árboles.',
      hints: [
        'Extender una manta amplia en el césped a la sombra de un árbol.',
        'Aperitivos en fiambreras, frutos secos y bebida fría recién sacada.',
        'Escuchar la brisa suave o poner una lista acústica de fondo.',
        'Tumbarse a mirar el cielo después de merendar.'
      ],
      branches: [
        { name: 'Parque Torres', address: 'Castillo de la Concepción, Cartagena', lat: 37.5995, lng: -0.9840 },
        { name: 'Parque de Fofó', address: 'Ronda Norte, Murcia', lat: 37.9940, lng: -1.1370 }
      ]
    },
    {
      id: 'plan-escape-room',
      name: 'Escape Room en Pareja',
      category: 'Misterio • Enigma',
      price: '1h',
      color: '#8B5CF6',
      logo: makePlanSvg('#8B5CF6', 'escape'),
      image: makePlanSvg('#8B5CF6', 'escape'),
      description: 'Encerrados en una habitación temática resolviendo acertijos y candados para escapar a tiempo.',
      hints: [
        'Un cronómetro digital luminoso descontando los sesenta minutos.',
        'Abrir candados secretos, descifrar combinaciones y encontrar llaves ocultas.',
        'La adrenalina sube al máximo cuando solo quedan cinco minutos.',
        'Pone a prueba la compenetración y la astucia en equipo.'
      ],
      branches: [
        { name: 'Escape Room Centro', address: 'Casco Histórico, Cartagena / Murcia', lat: 37.6020, lng: -0.9830 }
      ]
    },
    {
      id: 'plan-cata-vinos',
      name: 'Cata de Vinos y Tapas',
      category: 'Gourmet • Sabores',
      price: '2h',
      color: '#9333EA',
      logo: makePlanSvg('#9333EA', 'wine'),
      image: makePlanSvg('#9333EA', 'wine'),
      description: 'Degustación de copas de vino seleccionadas con tabla de quesos curados y jamón ibérico.',
      hints: [
        'Copas de cristal para apreciar aromas frutales y madera en barrica.',
        'Pan tostado crujiente con aceite de oliva virgen y lonchas de jamón ibérico.',
        'Descubrir qué maridaje realza mejor cada copa.',
        'Ambiente íntimo, iluminación tenue y conversación pausada.'
      ],
      branches: [
        { name: 'Taberna Selecta', address: 'Plaza de las Flores / Casco Antiguo', lat: 37.9860, lng: -1.1320 }
      ]
    },
    {
      id: 'plan-senderismo',
      name: 'Ruta de Senderismo',
      category: 'Aventura • Naturaleza',
      price: '3h',
      color: '#14B8A6',
      logo: makePlanSvg('#14B8A6', 'hiking'),
      image: makePlanSvg('#14B8A6', 'hiking'),
      description: 'Ruta de montaña o sendero costero, respirar aire puro y coronar un mirador con vistas.',
      hints: [
        'Calzado de montaña cómodo y mochila ligera con agua fresca.',
        'Subir la senda con calma hasta coronar el mirador más alto.',
        'La foto panorámica de recuerdo con el horizonte.',
        'La satisfacción de haber hecho ejercicio en la naturaleza juntos.'
      ],
      branches: [
        { name: 'Batería de Castillitos', address: 'Cabo Tiñoso, Cartagena', lat: 37.5450, lng: -1.1150 },
        { name: 'Cresta del Gallo', address: 'Parque Regional El Valle, Murcia', lat: 37.9300, lng: -1.1100 }
      ]
    },
    {
      id: 'plan-concierto',
      name: 'Concierto o Música en Directo',
      category: 'Música • Noche',
      price: '2h 30m',
      color: '#F43F5E',
      logo: makePlanSvg('#F43F5E', 'music'),
      image: makePlanSvg('#F43F5E', 'music'),
      description: 'Banda en directo o acústico íntimo en sala para cantar y vibrar con buena música.',
      hints: [
        'Sentir el golpe del bajo y la batería vibrando en el pecho.',
        'Cantar los estribillos favoritos mirándose y sonriendo.',
        'La energía contagiosa de una sala llena de aplausos.',
        'Pedir otra canción cuando el grupo se despide antes de los bises.'
      ],
      branches: [
        { name: 'Sala de conciertos', address: 'Zona centro o auditorio', lat: 37.6000, lng: -0.9850 }
      ]
    },
    {
      id: 'plan-juegos-mesa',
      name: 'Tarde de Juegos de Mesa y Café',
      category: 'Acogedor • Café y risas',
      price: '2h',
      color: '#D97706',
      logo: makePlanSvg('#D97706', 'games'),
      image: makePlanSvg('#D97706', 'games'),
      description: 'Cafetería acogedora o mesa del salón con té/café, tarta casera y partidas a juegos favoritos.',
      hints: [
        'Café calentito con espuma y una porción generosa de tarta casera.',
        'Tablero desplegado sobre la mesa, dados rodando y risas garantizadas.',
        'Las miradas de sospecha al robar una carta con cara de póker.',
        'El plan perfecto para una tarde tranquila o de lluvia.'
      ],
      branches: [
        { name: 'En casa o cafetería', address: 'Ambiente acogedor', lat: 37.6000, lng: -0.9850 }
      ]
    },
    {
      id: 'plan-museo',
      name: 'Museo o Exposición de Arte',
      category: 'Cultura • Inspiración',
      price: '1h 45m',
      color: '#6366F1',
      logo: makePlanSvg('#6366F1', 'museum'),
      image: makePlanSvg('#6366F1', 'museum'),
      description: 'Paseo tranquilo por galerías de arte, fotografía o historia comentando las piezas sin prisas.',
      hints: [
        'Salas amplias, techos altos y atmósfera de serenidad.',
        'Debatir qué transmite la obra más abstracta o curiosa.',
        'Curiosidades históricas y detalles que llaman la atención.',
        'Terminar ojeando libros y postales en la tienda de la salida.'
      ],
      branches: [
        { name: 'Teatro Romano de Cartagena', address: 'Palacio Consistorial, Cartagena', lat: 37.5992, lng: -0.9852 },
        { name: 'Museo Ramón Gaya', address: 'Plaza Santa Catalina, Murcia', lat: 37.9855, lng: -1.1332 }
      ]
    },
    {
      id: 'plan-cocinar-juntos',
      name: 'Cocinar una Receta Nueva Juntos',
      category: 'En Casa • Culinario',
      price: '2h 30m',
      color: '#FB7185',
      logo: makePlanSvg('#FB7185', 'cooking'),
      image: makePlanSvg('#FB7185', 'cooking'),
      description: 'Comprar ingredientes especiales, poner música, vino frío y preparar sushi, pasta o tacos desde cero.',
      hints: [
        'Poner una playlist especial de fondo mientras se pican los ingredientes.',
        'Una copa de vino blanco o cerveza fría para ir abriendo boca en la cocina.',
        'Probar la salsa de la cazuela con cuchara de madera: ¿un toque más de sal?',
        'Emplatar con mimo como en un restaurante con estrellas y cenar a la luz de las velas.'
      ],
      branches: [
        { name: 'En casa en la cocina', address: 'Cocina con música y copas', lat: 37.6000, lng: -0.9850 }
      ]
    }
  ];

  function loadModeCatalogue() {
    if (state.activeMode === 'movies') {
      state.restaurants = MOVIES_CATALOGUE.slice();
    } else if (state.activeMode === 'plans') {
      state.restaurants = PLANS_CATALOGUE.slice();
    } else {
      state.restaurants = getRestaurants();
    }
  }

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
    if (state.activeMode === 'movies' && state.winningRestaurant) {
      const streaming = state.winningRestaurant.streaming;
      if (streaming && streaming.length && STREAMING_PROVIDERS[streaming[0]]) {
        return STREAMING_PROVIDERS[streaming[0]].url;
      }
      return 'https://www.google.com/search?q=ver+' + encodeURIComponent(state.winningRestaurant.name) + '+online';
    }
    if (!branch || typeof branch.lat !== 'number') {
      return 'https://www.google.com/search?q=' + encodeURIComponent((state.winningRestaurant && state.winningRestaurant.name) || 'Duo');
    }
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
    activeMode: localStorage.getItem('donde_comemos_active_mode') || 'food', // 'food' | 'movies' | 'plans'
    isRemoteSession: false,
    remoteRole: null, // 'player2' | null
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
    movieCategoryFilter: 'recommended',
    movieCategoryLimits: {},
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

  function getOpeningStatus(r) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const cur = hours + minutes / 60;

    const isLunch = cur >= 13.5 && cur < 16.5;
    const isDinner = cur >= 20.5 && cur < 23.75;

    if (isLunch) {
      return { status: 'open', label: 'Abierto ahora', sub: 'Cierra 16:30' };
    }
    if (isDinner) {
      return { status: 'open', label: 'Abierto ahora', sub: 'Cierra 23:45' };
    }
    if (cur >= 12.5 && cur < 13.5) {
      return { status: 'soon', label: 'Abre a las 13:30', sub: 'Comida' };
    }
    if (cur >= 19.5 && cur < 20.5) {
      return { status: 'soon', label: 'Abre a las 20:30', sub: 'Cena' };
    }
    if (cur >= 16.5 && cur < 19.5) {
      return { status: 'closed', label: 'Cerrado ahora', sub: 'Abre a las 20:30' };
    }
    return { status: 'closed', label: 'Cerrado ahora', sub: 'Abre a las 13:30' };
  }

  function encodeRemoteState(obj) {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(obj)))));
  }

  function decodeRemoteState(str) {
    return JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(str)))));
  }

  function getRemoteP2ShareUrl() {
    const payload = {
      v: 1,
      m: state.activeMode,
      p1: state.player1Name,
      p2: state.player2Name,
      p1s: Array.from(state.player1Selections),
      p1v: state.player1Veto,
      p1x: state.player1Superlike,
      rnd: state.roundAttempt,
      avd: state.avoidLastWinner,
      lw: state.lastWinnerId
    };
    const base = window.location.href.split('#')[0];
    return base + '#duo_p2=' + encodeRemoteState(payload);
  }

  function getRemoteResultShareUrl() {
    const payload = {
      v: 1,
      m: state.activeMode,
      p1: state.player1Name,
      p2: state.player2Name,
      w: state.winningRestaurant ? state.winningRestaurant.id : null,
      mc: state.matchesCount,
      tb: state.tieBreakerUser
    };
    const base = window.location.href.split('#')[0];
    return base + '#duo_result=' + encodeRemoteState(payload);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('Enlace copiado al portapapeles');
        sound.playPop();
        sound.vibrate([30]);
      }).catch(function () {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  function fallbackCopyText(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Enlace copiado al portapapeles');
      sound.playPop();
      sound.vibrate([30]);
    } catch (e) {
      showToast('Copia el enlace manualmente');
    }
    document.body.removeChild(ta);
  }

  function checkRemoteHash() {
    try {
      const hash = window.location.hash || '';
      if (hash.startsWith('#duo_p2=')) {
        const encoded = hash.replace('#duo_p2=', '');
        const data = decodeRemoteState(encoded);
        if (data && data.p1s) {
          state.activeMode = data.m || 'food';
          loadModeCatalogue();
          state.player1Name = data.p1 || 'Jugador 1';
          state.player2Name = data.p2 || 'Jugador 2';
          state.player1Selections = new Set(data.p1s);
          state.player1Veto = data.p1v || null;
          state.player1Superlike = data.p1x || null;
          state.roundAttempt = data.rnd || 1;
          state.avoidLastWinner = !!data.avd;
          state.lastWinnerId = data.lw || null;
          state.isRemoteSession = true;
          state.remoteRole = 'player2';
          state.screen = 'player2';
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          setTimeout(function () {
            showToast('Turno de ' + state.player2Name + ' listo para votar');
          }, 350);
        }
      } else if (hash.startsWith('#duo_result=')) {
        const encoded = hash.replace('#duo_result=', '');
        const data = decodeRemoteState(encoded);
        if (data && data.w) {
          state.activeMode = data.m || 'food';
          loadModeCatalogue();
          state.player1Name = data.p1 || 'Jugador 1';
          state.player2Name = data.p2 || 'Jugador 2';
          state.winningRestaurant = state.restaurants.find(function (r) { return r.id === data.w; }) || state.restaurants[0];
          state.matchesCount = data.mc || 1;
          state.tieBreakerUser = data.tb || null;
          state.winningBranch = findClosestBranch(state.winningRestaurant, state.userCoords);
          state.isNameRevealed = false;
          state.showClues = false;
          state.clueIndex = 0;
          state.screen = 'result';
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          setTimeout(function () {
            showToast('Resultado recibido en Duo');
          }, 350);
        }
      }
    } catch (err) {
      console.error('Error al procesar enlace a distancia:', err);
    }
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
    loadModeCatalogue();
    checkRemoteHash();
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
        <div class="pt-8 text-center flex flex-col items-center">
          <div class="w-16 h-16 rounded-[22px] p-0.5 shadow-2xl shadow-indigo-500/20 mb-2 flex items-center justify-center">
            <img src="./duo_icon.svg" alt="Duo" class="w-full h-full object-contain filter drop-shadow-xl" />
          </div>

          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-0.5 flex items-center justify-center gap-2">
            <span>Duo</span>
          </h1>
          <p class="text-neutral-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed mb-3">
            ${state.activeMode === 'food' 
              ? 'Votad en secreto a dos turnos y encontrad el restaurante ideal sin discutir.' 
              : state.activeMode === 'movies'
              ? 'Votad en secreto a dos turnos y decidid qué película o serie ver hoy.'
              : 'Votad en secreto a dos turnos y encontrad la cita o plan perfecto.'}
          </p>

          <!-- Selector de Modo Apple HIG Segmented Control -->
          <div class="w-full max-w-xs p-1 rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-xl flex items-center justify-between text-xs font-bold mb-1">
            <button 
              id="mode-food" 
              class="flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${state.activeMode === 'food' ? 'bg-gradient-to-r from-[#FF2D55] to-[#FF9F0A] text-white shadow-md' : 'text-neutral-400 hover:text-white'}"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              <span>Comer</span>
            </button>

            <button 
              id="mode-movies" 
              class="flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${state.activeMode === 'movies' ? 'bg-gradient-to-r from-[#5E5CE6] to-[#0A84FF] text-white shadow-md' : 'text-neutral-400 hover:text-white'}"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
              <span>Películas</span>
            </button>

            <button 
              id="mode-plans" 
              class="flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${state.activeMode === 'plans' ? 'bg-gradient-to-r from-[#BF5AF2] to-[#FF2D55] text-white shadow-md' : 'text-neutral-400 hover:text-white'}"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>Planes</span>
            </button>
          </div>
        </div>

        <div class="ios-glass p-5 rounded-[26px] my-3 space-y-3.5">
          <div class="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
            ${state.activeMode === 'food' ? 'Comensales' : state.activeMode === 'movies' ? 'Espectadores' : 'Participantes'}
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

    ['food', 'movies', 'plans'].forEach(function (m) {
      const btn = document.getElementById('mode-' + m);
      if (btn) {
        btn.addEventListener('click', function () {
          if (state.activeMode === m) return;
          state.activeMode = m;
          localStorage.setItem('donde_comemos_active_mode', m);
          loadModeCatalogue();
          sound.playPop();
          sound.vibrate([25]);
          renderHomeScreen();
        });
      }
    });

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
      state.movieCategoryLimits = {};
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
    const MOVIE_CATEGORIES = [
    {
      id: 'recommended',
      label: 'Recomendadas',
      icon: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    },
    {
      id: 'niche',
      label: 'Joyas Ocultas',
      icon: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"></path><path d="M11 3 8 9l4 13 4-13-3-6"></path><path d="M2 9h20"></path></svg>'
    },
    {
      id: 'romance',
      label: 'Románticas',
      icon: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
    },
    {
      id: 'series',
      label: 'Series',
      icon: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>'
    },
    {
      id: 'all',
      label: 'Todas',
      icon: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
    },
    { id: 'action', label: 'Acción' },
    { id: 'scifi', label: 'Ciencia Ficción' },
    { id: 'drama', label: 'Drama' },
    { id: 'comedy', label: 'Comedia' },
    { id: 'horror', label: 'Terror' },
    { id: 'animation', label: 'Animación' }
  ];

  function renderPlayerScreen(playerNum) {
    const isP1 = playerNum === 1;
    const playerName = isP1 ? state.player1Name : state.player2Name;
    const currentSelections = isP1 ? state.player1Selections : state.player2Selections;
    const currentVeto = isP1 ? state.player1Veto : state.player2Veto;
    const currentSuperlike = isP1 ? state.player1Superlike : state.player2Superlike;
    const isMovies = state.activeMode === 'movies';

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

    let displayedRestaurants = state.restaurants.filter(function (r) {
      if (state.avoidLastWinner && state.lastWinnerId === r.id) {
        return false;
      }
      return true;
    });

    let totalCategoryCount = 0;
    let movieCategoryLimit = 6;
    let hasMoreInCat = false;

    if (isMovies) {
      const cat = state.movieCategoryFilter || 'recommended';
      displayedRestaurants = displayedRestaurants.filter(function (r) {
        if (cat === 'all') return r.type === 'movie';
        if (cat === 'recommended') return r.type === 'movie' && !!r.isRecommended;
        if (cat === 'niche') return r.type === 'movie' && (r.genre === 'niche' || !!r.isNiche);
        if (cat === 'romance') return r.type === 'movie' && (r.genre === 'romance' || !!r.isRomance);
        if (cat === 'series') return r.type === 'series';
        return r.type === 'movie' && r.genre === cat;
      });

      totalCategoryCount = displayedRestaurants.length;
      if (!state.movieCategoryLimits) state.movieCategoryLimits = {};
      movieCategoryLimit = state.movieCategoryLimits[cat] || 6;
      hasMoreInCat = totalCategoryCount > movieCategoryLimit;
      displayedRestaurants = displayedRestaurants.slice(0, movieCategoryLimit);
    }

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
            <span>Toca para elegir. Botones superiores para veto, superlike e info:</span>
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

        ${isMovies ? `
          <!-- Barra de categorías de películas y series estilo visionOS -->
          <div class="px-3 pt-2.5 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-white/[0.08] bg-black/60 backdrop-blur-xl sticky top-[108px] z-10">
            ${MOVIE_CATEGORIES.map(function(c) {
              const isAct = (state.movieCategoryFilter || 'recommended') === c.id;
              return `
                <button 
                  data-cat="${c.id}" 
                  class="movie-cat-chip px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition flex items-center gap-1.5 ${
                    isAct 
                      ? 'bg-white text-black font-bold shadow-lg shadow-white/10 scale-[1.02]' 
                      : 'bg-white/[0.06] text-neutral-400 hover:text-white border border-white/[0.08] active:scale-95'
                  }"
                >
                  ${c.icon ? c.icon : ''}
                  <span>${c.label}</span>
                </button>
              `;
            }).join('')}
          </div>
        ` : ''}

        <div class="px-4 py-4 grid grid-cols-2 gap-3.5 flex-1 content-start pb-28">
          ${displayedRestaurants
            .map(function (r) {
              const isSelected = currentSelections.has(r.id);
              const isVetoed = (isP1 ? state.player1Veto : state.player2Veto) === r.id;
              const isSuper = (isP1 ? state.player1Superlike : state.player2Superlike) === r.id;
              const logoSrc = r.poster || r.logo || r.image;

              let cardClass = isSelected ? theme.selectedClass : '';
              if (isVetoed) cardClass = 'card-vetoed opacity-65';
              if (isSuper) cardClass = 'card-superliked';

              if (isMovies) {
                return `
                  <div 
                    data-id="${r.id}"
                    class="ios-glass-card p-2.5 flex flex-col justify-between min-h-[310px] relative ${cardClass}"
                  >
                    <div class="w-full flex items-center justify-between mb-1.5">
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
                          title="Veto (Bloquear)"
                          class="btn-card-veto w-6 h-6 rounded-full flex items-center justify-center text-xs transition active:scale-90 ${isVetoed ? 'bg-rose-500 text-white shadow-md font-bold' : 'bg-white/10 text-neutral-400 hover:text-rose-400'}"
                        >
                          <svg class="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                        </button>
                        <button 
                          data-action="info" 
                          data-id="${r.id}" 
                          title="Ver sinopsis completa"
                          class="btn-card-info w-6 h-6 rounded-full flex items-center justify-center text-xs bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition active:scale-90"
                        >
                          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        </button>
                      </div>

                      <div class="ios-check ${isSelected ? theme.checkClass : 'ios-check-unselected'} check-badge pointer-events-none">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>

                    <!-- Cartel oficial / Foto poster (aspect-ratio 2:3) -->
                    <div class="w-full aspect-[2/3] rounded-xl overflow-hidden relative shadow-md bg-neutral-900 border border-white/10 pointer-events-none mb-2">
                      <img 
                        src="${r.poster || r.image}" 
                        alt="${r.name}" 
                        class="w-full h-full object-cover"
                        loading="lazy"
                        onerror="this.src='${r.image}'"
                      />
                      <div class="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                        <span class="px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-300/30 flex items-center gap-0.5 shadow">
                          <svg class="w-2.5 h-2.5 fill-amber-300 inline" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          ${r.rating}
                        </span>
                        <span class="px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] font-semibold text-neutral-300 border border-white/15 shadow">
                          ${r.duration || r.price}
                        </span>
                      </div>
                    </div>

                    <!-- Logos de servicios de streaming -->
                    <div class="w-full flex items-center flex-wrap gap-1 mb-1.5 pointer-events-none">
                      ${renderStreamingBadges(r.streaming, false)}
                    </div>

                    <!-- Título y categoría -->
                    <div class="w-full text-left pointer-events-none">
                      <div class="font-bold text-[13px] text-white truncate leading-tight flex items-center gap-1">
                        <span>${r.name}</span>
                        ${isSuper ? '<svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0 inline" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>' : ''}
                        ${isVetoed ? '<svg class="w-3 h-3 text-rose-400 shrink-0 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>' : ''}
                      </div>
                      <div class="text-[10px] text-neutral-400 truncate mt-0.5">${r.category}</div>
                    </div>

                    <!-- Pequeña sinopsis de 2 líneas -->
                    <p class="text-[10px] text-neutral-300 line-clamp-2 leading-tight text-left mt-1 pointer-events-none opacity-85">
                      ${r.synopsis || r.description}
                    </p>
                  </div>
                `;
              }

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
                      ${state.activeMode === 'food' && r.branches ? r.branches.length + ' ubicaciones' : (r.price || r.category)}
                    </div>
                  </div>
                </div>
              `;
            })
            .join('')}

          ${isMovies && hasMoreInCat ? `
            <div class="col-span-2 pt-1 pb-2 flex justify-center">
              <button 
                id="btn-movie-ver-mas" 
                class="w-full py-3.5 px-4 rounded-2xl text-xs font-bold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg backdrop-blur-xl"
              >
                <svg class="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                <span>Ver más películas (${totalCategoryCount - movieCategoryLimit} más)</span>
              </button>
            </div>
          ` : ''}
        </div>

        <div class="sticky bottom-0 z-20 px-4 pt-3 floating-bottom-bar border-t border-white/[0.08]">
          <button 
            id="btn-confirm-turn" 
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white ${theme.btnBg} shadow-xl active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
          >
            <span>Confirmar selecciones</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </button>
        </div>
      </div>
    `;

    document.querySelectorAll('.movie-cat-chip').forEach(function (chip) {
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        sound.playPop();
        state.movieCategoryFilter = chip.dataset.cat;
        renderPlayerScreen(playerNum);
      });
    });

    const btnMovieVerMas = document.getElementById('btn-movie-ver-mas');
    if (btnMovieVerMas) {
      btnMovieVerMas.addEventListener('click', function (e) {
        e.stopPropagation();
        sound.playPop();
        sound.vibrate([20]);
        const cat = state.movieCategoryFilter || 'recommended';
        if (!state.movieCategoryLimits) state.movieCategoryLimits = {};
        state.movieCategoryLimits[cat] = (state.movieCategoryLimits[cat] || 6) + 6;
        renderPlayerScreen(playerNum);
      });
    }

    document.querySelectorAll('.btn-card-info').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = btn.dataset.id;
        openMovieDetailModal(id);
      });
    });

    document.querySelectorAll('.ios-glass-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('button[data-action]')) return;
        const id = card.dataset.id;

        if ((isP1 ? state.player1Veto : state.player2Veto) === id) {
          showToast('Has vetado este título. Quita el veto para seleccionarlo.');
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
        showToast('Elige al menos 1 ' + (state.activeMode === 'food' ? 'restaurante' : state.activeMode === 'movies' ? 'película o serie' : 'plan'));
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

  // Modal para ver sinopsis completa y streaming de una película o serie
  function openMovieDetailModal(movieId) {
    const movie = MOVIES_CATALOGUE.find(function(m) { return m.id === movieId; });
    if (!movie) return;
    sound.playPop();

    modalContainer.innerHTML = `
      <div id="movie-modal-backdrop" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-xl p-0 sm:p-4 animate-ios-slide">
        <div class="bg-neutral-950 border-t sm:border border-white/[0.12] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
          <!-- Header con imagen / poster difuminado y portada nítida -->
          <div class="relative w-full h-52 bg-neutral-900 overflow-hidden shrink-0">
            <img src="${movie.poster || movie.image}" alt="${movie.name}" class="w-full h-full object-cover filter brightness-[0.4] blur-md scale-110 absolute inset-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/60"></div>
            
            <button id="btn-close-movie-modal" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-white flex items-center justify-center font-bold text-xs transition active:scale-90">✕</button>

            <div class="absolute bottom-3 left-4 right-4 flex items-end gap-3.5 z-10">
              <img src="${movie.poster || movie.image}" alt="${movie.name}" class="w-18 w-[72px] aspect-[2/3] object-cover rounded-xl shadow-2xl border border-white/20 shrink-0" />
              <div class="text-left flex-1 min-w-0">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-300/30 mb-1">
                  <span>★ ${movie.rating}</span>
                  <span class="text-[9px] font-semibold text-neutral-400">FilmAffinity</span>
                  <span class="text-white/40">•</span>
                  <span class="text-white">${movie.duration || movie.price}</span>
                  <span class="text-white/40">•</span>
                  <span class="text-neutral-300">${movie.year}</span>
                </div>
                <h3 class="text-lg font-black text-white leading-tight truncate">${movie.name}</h3>
                <div class="text-xs text-neutral-400 truncate">${movie.category}</div>
              </div>
            </div>
          </div>

          <!-- Contenido deslizable -->
          <div class="p-5 overflow-y-auto space-y-4 text-left flex-1">
            <!-- Servicios de streaming disponibles -->
            <div class="bg-white/[0.04] p-3.5 rounded-2xl border border-white/[0.08]">
              <div class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Disponible para ver en</div>
              <div class="flex items-center flex-wrap gap-2">
                ${renderStreamingBadges(movie.streaming, true)}
              </div>
            </div>

            <!-- Sinopsis completa -->
            <div class="space-y-1.5">
              <div class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Sinopsis</div>
              <p class="text-xs text-neutral-200 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
                ${movie.synopsis || movie.description}
              </p>
            </div>

            <!-- Curiosidades / Pistas -->
            ${movie.hints && movie.hints.length ? `
              <div class="space-y-1.5">
                <div class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Detalles y curiosidades</div>
                <ul class="text-xs text-neutral-300 space-y-1.5 pl-1">
                  ${movie.hints.map(function(h) {
                    return '<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#5E5CE6] mt-1.5 shrink-0"></span><span>' + h + '</span></li>';
                  }).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- Botón Buscar trailer en YouTube -->
            <a 
              href="https://www.youtube.com/results?search_query=trailer+${encodeURIComponent(movie.name)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] transition flex items-center justify-center gap-2 active:scale-98"
            >
              <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span>Ver tráiler oficial en YouTube</span>
            </a>
          </div>

          <!-- Footer con botón cerrar -->
          <div class="p-4 border-t border-white/[0.08] bg-black/60">
            <button id="btn-modal-close-footer" class="w-full py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold transition active:scale-95">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;

    function closeModal() {
      modalContainer.innerHTML = '';
    }

    const btnClose = document.getElementById('btn-close-movie-modal');
    if (btnClose) btnClose.addEventListener('click', closeModal);
    const btnFooterClose = document.getElementById('btn-modal-close-footer');
    if (btnFooterClose) btnFooterClose.addEventListener('click', closeModal);
    const backdrop = document.getElementById('movie-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) closeModal();
      });
    }
  }


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

        <div class="my-auto py-4 space-y-3">
          <div class="ios-glass p-5 rounded-[26px] max-w-xs mx-auto text-center space-y-2">
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

          <!-- Tarjeta de votación a distancia para multidispositivo -->
          <div class="ios-glass p-4 rounded-[24px] max-w-xs mx-auto text-left border border-indigo-500/25 bg-indigo-500/10 space-y-2.5">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-indigo-500/20 text-[#5E5CE6] border border-indigo-500/30 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              </div>
              <div>
                <div class="text-xs font-bold text-white">¿Estáis a distancia?</div>
                <div class="text-[10px] text-neutral-300">Vota cada uno en su propio móvil</div>
              </div>
            </div>
            <button 
              id="btn-share-p2-link" 
              class="w-full py-2.5 px-3 rounded-xl bg-indigo-500/25 hover:bg-indigo-500/35 border border-indigo-500/40 text-xs font-bold text-indigo-200 flex items-center justify-center gap-2 active:scale-98 transition shadow-sm"
            >
              <svg class="w-3.5 h-3.5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              <span>Copiar / Enviar enlace a ${state.player2Name}</span>
            </button>
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
        </div>
      </div>
    `;

    const btnShareP2 = document.getElementById('btn-share-p2-link');
    if (btnShareP2) {
      btnShareP2.addEventListener('click', function () {
        const url = getRemoteP2ShareUrl();
        if (navigator.share) {
          navigator.share({
            title: 'Duo - Te toca votar a ti',
            text: state.player1Name + ' ya ha votado en secreto en Duo. ¡Entra aquí y vota tus opciones!',
            url: url
          }).catch(function () {
            copyToClipboard(url);
          });
        } else {
          copyToClipboard(url);
        }
      });
    }

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

    if (window.confetti) {
      window.confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2D55', '#5E5CE6', '#0A84FF', '#FFD60A', '#30D158']
      });
    }

    const isMovies = state.activeMode === 'movies';
    const branch = state.winningBranch;
    const navUrl = getMysteryNavigationUrl(branch);

    const distanceText = branch.distanceKm !== null
      ? 'A ~' + (branch.distanceKm < 1 ? Math.round(branch.distanceKm * 1000) + ' m' : branch.distanceKm.toFixed(1) + ' km') + ' de vosotros'
      : 'Destino calculado';

    const headerBadge = state.tieBreakerUser
      ? 'Sorteo (' + state.tieBreakerUser + ')'
      : (isMovies ? '¡Elección de cine en común!' : '¡Coincidencia ganadora! (' + state.matchesCount + ' en común)');

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
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${isMovies ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'} text-xs font-semibold mb-2 backdrop-blur-xl">
            <span class="w-2 h-2 rounded-full ${isMovies ? 'bg-indigo-400' : 'bg-emerald-400'}"></span>
            <span>${headerBadge}</span>
          </div>

          <h2 class="text-3xl font-extrabold text-white tracking-tight">
            ${isMovies ? 'Elección Secreta' : 'Destino Secreto'}
          </h2>
          <p class="text-[11px] text-neutral-400 mt-0.5 max-w-xs mx-auto leading-relaxed">
            ${isMovies 
              ? 'El título permanece en incógnito. Podéis pedir pistas en Juegos o desvelarlo para ver las plataformas.'
              : 'El nombre permanece en incógnito. Pulsad en navegación y Maps os llevará sin desvelarlo.'}
          </p>
        </div>

        <!-- Segmented Control estilo iOS / Apple HIG para Progressive Disclosure -->
        <div class="w-full mt-3 mb-1">
          <div class="grid grid-cols-${isMovies ? '2' : '3'} p-1 rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-xl">
            <button 
              class="tab-btn py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                currentTab === 'destiny' 
                  ? 'bg-white/20 text-white shadow-md border border-white/10' 
                  : 'text-neutral-400 hover:text-white'
              }" 
              data-tab="destiny"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <span>${isMovies ? 'Elección' : 'Destino'}</span>
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
            ${!isMovies ? `
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
            ` : ''}
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
                  ${isMovies ? `
                    <svg class="w-10 h-10 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                      <line x1="7" y1="2" x2="7" y2="22"></line>
                      <line x1="17" y1="2" x2="17" y2="22"></line>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <line x1="2" y1="7" x2="7" y2="7"></line>
                      <line x1="2" y1="17" x2="7" y2="17"></line>
                      <line x1="17" y1="17" x2="22" y2="17"></line>
                      <line x1="17" y1="7" x2="22" y2="7"></line>
                    </svg>
                  ` : `
                    <svg class="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  `}
                </div>

                <div class="text-base font-bold text-white mb-1 tracking-tight">
                  ${isMovies ? 'Película o Serie Misteriosa' : 'Restaurante Sorpresa'}
                </div>
                
                <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-200 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.1] mb-2.5">
                  ${isMovies ? `
                    <span class="text-amber-300 font-bold">★ ${state.winningRestaurant.rating}</span>
                    <span class="opacity-40">•</span>
                    <span>${state.winningRestaurant.duration || state.winningRestaurant.price}</span>
                  ` : `
                    <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>${distanceText}</span>
                  `}
                </div>

                <p class="text-xs text-neutral-400 max-w-xs leading-relaxed mb-3">
                  ${isMovies 
                    ? (state.winningRestaurant.category + '. Adivinadla en Juegos o desveladla para ver en qué servicios reproducirla.')
                    : 'Ruta directa calculada hacia la sucursal más óptima por coordenadas secretas.'}
                </p>

                <!-- Divulgación progresiva para desvelar el sitio / película -->
                <div class="w-full pt-3 border-t border-white/[0.08]">
                  <button 
                    id="btn-toggle-reveal" 
                    class="w-full py-2 px-3 text-center text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-xl border border-white/[0.08] transition flex items-center justify-center gap-2"
                  >
                    <span>${state.isNameRevealed ? (isMovies ? 'Ocultar título de nuevo' : 'Ocultar nombre de nuevo') : (isMovies ? '¿Queréis desvelar la película/serie ahora?' : '¿Queréis desvelar el sitio ahora?')}</span>
                    <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${state.isNameRevealed ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}"/></svg>
                  </button>
                  
                  <div id="revealed-box" class="${state.isNameRevealed ? 'block' : 'hidden'} mt-3 p-4 rounded-2xl bg-black/75 border border-white/10 text-center animate-reveal">
                    ${isMovies ? `
                      <!-- Cartel oficial en grande -->
                      <div class="w-28 sm:w-36 aspect-[2/3] rounded-2xl overflow-hidden mx-auto mb-3 shadow-2xl border border-white/20 bg-neutral-900">
                        <img src="${state.winningRestaurant.poster || state.winningRestaurant.image}" class="w-full h-full object-cover" />
                      </div>
                      <div class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-0.5">Elección desvelada</div>
                      <div class="text-lg font-black text-white">${state.winningRestaurant.name}</div>
                      <div class="text-xs text-neutral-300 mt-0.5 flex items-center justify-center gap-2">
                        <span>${state.winningRestaurant.year}</span>
                        <span class="opacity-40">•</span>
                        <span class="text-amber-300 font-bold">★ ${state.winningRestaurant.rating}</span>
                        <span class="text-[10px] text-neutral-400 font-semibold">FilmAffinity</span>
                        <span class="opacity-40">•</span>
                        <span>${state.winningRestaurant.duration || state.winningRestaurant.price}</span>
                      </div>
                      <div class="text-[11px] text-neutral-400 mt-0.5">${state.winningRestaurant.category}</div>

                      <!-- Sinopsis completa -->
                      <div class="mt-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-200 leading-relaxed text-left">
                        ${state.winningRestaurant.synopsis || state.winningRestaurant.description}
                      </div>

                      <!-- Disponibilidad en streaming (Logos + Enlaces) -->
                      <div class="mt-3.5 pt-3 border-t border-white/10 text-left">
                        <div class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Disponible para ver en:</div>
                        <div class="flex items-center flex-wrap gap-2">
                          ${renderStreamingBadges(state.winningRestaurant.streaming, true)}
                        </div>
                      </div>

                      <!-- Botón ver trailer en YouTube -->
                      <a 
                        href="https://www.youtube.com/results?search_query=trailer+${encodeURIComponent(state.winningRestaurant.name)}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="mt-3 w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition flex items-center justify-center gap-2"
                      >
                        <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        <span>Ver tráiler oficial en YouTube</span>
                      </a>
                    ` : `
                      <div class="w-14 h-14 rounded-2xl p-1 bg-white/[0.06] border border-white/15 mx-auto mb-2 flex items-center justify-center">
                        <img src="${state.winningRestaurant.logo || state.winningRestaurant.image}" class="w-full h-full object-contain filter drop-shadow" />
                      </div>
                      <div class="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">Destino confirmado</div>
                      <div class="text-base font-extrabold text-white">${state.winningRestaurant.name}</div>
                      <div class="text-xs text-neutral-400 mt-0.5">${branch.address}</div>
                    `}

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

                    ${!isMovies ? `
                      <div class="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                        <span class="text-[11px] text-neutral-400">¿Visita finalizada?</span>
                        <button 
                          id="btn-log-visit" 
                          class="px-3 py-1.5 rounded-full text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/35 hover:bg-emerald-500/30 active:scale-95 transition"
                        >
                          Guardar en historial
                        </button>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          `
              : currentTab === 'games'
              ? `
            <!-- TAB 2: JUEGOS Y PISTAS -->
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
                        <div class="text-xs font-bold text-white">${isMovies ? 'Pistas y curiosidades' : 'Pistas en ruta'}</div>
                        <div class="text-[10px] text-neutral-400">${isMovies ? 'Adivinad el título antes de desvelarlo' : 'Adivinad el sitio por el camino'}</div>
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
                    <span>${isMovies ? '¿Quién acierta el título?' : '¿Quién acierta el sitio?'}</span>
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

              <!-- Bloque 3: ¿Quién paga o quién prepara las palomitas? -->
              <div class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div id="coin-icon" class="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-sm shrink-0 ${state.isPayerSpinning ? 'animate-coin-flip' : ''}">
                    <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v12M15 9.5a3.5 3.5 0 0 0-7 0c0 2 2 3 4 3.5s4 1.5 4 3.5a3.5 3.5 0 0 1-7 0"></path></svg>
                  </div>
                  <div>
                    <div class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">${isMovies ? '¿Quién hace las palomitas?' : '¿Quién paga hoy?'}</div>
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
            </div>
          `
              : `
            <!-- TAB 3: OPCIONES DE MAPA (SOLO MODO COMIDA / PLANES) -->
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

        <!-- Acciones Fijas Inferiores -->
        <div class="space-y-2.5 pb-4">
          <a 
            id="btn-navigate"
            href="${navUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r ${isMovies ? 'from-indigo-600 via-blue-600 to-cyan-500 shadow-indigo-500/30' : 'from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/30'} shadow-xl active:scale-[0.97] transition transform flex items-center justify-center gap-3 border-t border-white/20"
          >
            ${isMovies ? `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
              <span>Ver dónde reproducir</span>
            ` : `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              <span>Cómo llegar</span>
            `}
          </a>

          <!-- Botón compartir resultado con el otro usuario -->
          <button 
            id="btn-share-result" 
            class="w-full py-3 px-4 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <span>Compartir resultado con ${state.remoteRole === 'player2' ? state.player1Name : state.player2Name}</span>
          </button>

          <button 
            id="btn-restart" 
            class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
          >
            <span>Nueva votación</span>
          </button>
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

    const btnShareRes = document.getElementById('btn-share-result');
    if (btnShareRes) {
      btnShareRes.addEventListener('click', function () {
        const url = getRemoteResultShareUrl();
        if (navigator.share) {
          navigator.share({
            title: 'Duo - ¡Tenemos resultado!',
            text: '¡Ya tenemos elección en Duo! Abre el enlace para ver el resultado juntos:',
            url: url
          }).catch(function () {
            copyToClipboard(url);
          });
        } else {
          copyToClipboard(url);
        }
      });
    }

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

    // Handler para tirar la moneda de quién paga o quién hace las palomitas
    const btnSpinPayer = document.getElementById('btn-spin-payer');
    if (btnSpinPayer) {
      btnSpinPayer.addEventListener('click', function () {
        sound.playCoin();
        sound.vibrate([40, 40]);
        state.isPayerSpinning = true;
        renderResultScreen();

        setTimeout(function () {
          const outcomes = isMovies 
            ? [
                '¡' + state.player1Name + ' hace las palomitas!',
                '¡' + state.player2Name + ' hace las palomitas!',
                '¡Hacéis las palomitas a medias!'
              ]
            : [
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

    // Selector de app de mapas favorita (solo si existe en el DOM)
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


  function initInteractiveTieWheel(containerEl, candidateItems, onWinnerChosen) {
    const canvas = containerEl.querySelector('#tiebreak-wheel-canvas');
    const spinBtn = containerEl.querySelector('#btn-spin-wheel');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = 280;
    const h = 280;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = w / 2 - 8;
    const count = candidateItems.length;
    const sliceAngle = (2 * Math.PI) / count;

    const sliceColors = [
      '#FF2D55', '#5E5CE6', '#0A84FF', '#30D158', '#FF9F0A',
      '#BF5AF2', '#FF375F', '#64D2FF', '#FF453A', '#32D74B'
    ];

    let currentAngle = 0;
    let velocity = 0;
    let isSpinning = false;
    let animId = null;
    let lastSegment = -1;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < count; i++) {
        const startA = currentAngle + i * sliceAngle;
        const endA = startA + sliceAngle;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startA, endA);
        ctx.closePath();
        ctx.fillStyle = sliceColors[i % sliceColors.length];
        ctx.fill();

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.stroke();

        ctx.translate(cx, cy);
        ctx.rotate(startA + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 3;
        ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
        let name = candidateItems[i].name;
        if (name.length > 13) name = name.substring(0, 12) + '…';
        ctx.fillText(name, radius - 16, 4);
        ctx.restore();
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();
      ctx.restore();
    }

    function step() {
      if (!isSpinning) return;
      currentAngle += velocity;
      velocity *= 0.987;

      const normalized = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const seg = Math.floor(normalized / sliceAngle);
      if (seg !== lastSegment) {
        sound.playTick();
        sound.vibrate([15]);
        lastSegment = seg;
      }

      draw();

      if (velocity < 0.0018) {
        isSpinning = false;
        cancelAnimationFrame(animId);

        const topPointer = 1.5 * Math.PI;
        const effective = ((topPointer - currentAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const winIdx = Math.floor(effective / sliceAngle) % count;
        const winner = candidateItems[winIdx];

        sound.playFanfare();
        sound.vibrate([100, 50, 150]);

        setTimeout(function () {
          onWinnerChosen(winner);
        }, 600);
        return;
      }

      animId = requestAnimationFrame(step);
    }

    function startSpin(boost) {
      if (isSpinning) return;
      isSpinning = true;
      sound.playWhoosh();
      sound.vibrate([40]);
      velocity = boost || (0.28 + Math.random() * 0.22);
      step();
    }

    if (spinBtn) {
      spinBtn.addEventListener('click', function () {
        startSpin();
      });
    }

    let isDragging = false;
    let startY = 0;
    let lastY = 0;
    let lastTime = 0;

    canvas.addEventListener('pointerdown', function (e) {
      if (isSpinning) return;
      isDragging = true;
      startY = e.clientY;
      lastY = e.clientY;
      lastTime = Date.now();
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', function (e) {
      if (!isDragging || isSpinning) return;
      const dy = e.clientY - lastY;
      currentAngle += dy * 0.015;
      lastY = e.clientY;
      draw();
    });

    canvas.addEventListener('pointerup', function (e) {
      if (!isDragging) return;
      isDragging = false;
      const dt = Math.max(1, Date.now() - lastTime);
      const dy = lastY - startY;
      const flickVelocity = Math.abs(dy / dt) * 0.08;
      if (flickVelocity > 0.08) {
        startSpin(Math.min(0.45, flickVelocity));
      } else {
        startSpin();
      }
    });

    draw();
  }

  function renderNoMatchScreen() {
    sound.vibrate([50, 50, 50]);
    const isFirstAttempt = state.roundAttempt === 1 && !state._showWheelEarly;

    if (isFirstAttempt) {
      app.innerHTML = `
        <div class="mobile-shell px-6 justify-between text-center animate-ios-pop">
          <div class="pt-8">
            <div class="w-18 h-18 rounded-[24px] bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center text-4xl mb-4 mx-auto shadow-lg shadow-amber-500/10 p-4">
              <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>

            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] text-xs font-semibold text-amber-400 border border-amber-500/30 mb-2">
              <span>Ronda 1 sin coincidencia</span>
            </div>

            <h2 class="text-3xl font-extrabold text-white mb-2 tracking-tight">
              No habéis coincidido
            </h2>
            <p class="text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
              ${state.player1Name} eligió <strong class="text-[#FF2D55]">${state.player1Selections.size}</strong> y ${state.player2Name} eligió <strong class="text-[#5E5CE6]">${state.player2Selections.size}</strong>, pero ninguna opción en común.
            </p>
          </div>

          <div class="ios-glass p-4 rounded-[24px] text-xs text-neutral-300 space-y-1.5 max-w-xs mx-auto text-left">
            <div class="font-bold text-amber-400">¿Qué preferís hacer?</div>
            <div class="text-neutral-300 leading-relaxed">
              Podéis repetir la votación en una <strong>segunda ronda</strong>, o resolverlo directamente girando la <strong>ruleta táctil</strong> entre todas vuestras opciones.
            </div>
          </div>

          <div class="space-y-2.5 pb-4">
            <button 
              id="btn-retry-round" 
              class="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-[#FF2D55] shadow-xl shadow-amber-500/25 active:scale-[0.97] transition transform flex items-center justify-center gap-2 border-t border-white/20"
            >
              <span>Repetir votación (Intento 2)</span>
            </button>

            <button 
              id="btn-quick-wheel-r1" 
              class="w-full py-3.5 px-5 rounded-2xl font-bold text-xs text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20M2 12h20"/></svg>
              <span>Desempatar con la Ruleta ahora</span>
            </button>

            <button 
              id="btn-restart-home" 
              class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
            >
              <span>Volver al inicio</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById('btn-retry-round').addEventListener('click', function () {
        sound.playWhoosh();
        state._showWheelEarly = false;
        state.roundAttempt = 2;
        state.player1Selections.clear();
        state.player2Selections.clear();
        state.screen = 'player1';
        render();
      });

      document.getElementById('btn-quick-wheel-r1').addEventListener('click', function () {
        sound.playPop();
        sound.vibrate([30]);
        state._showWheelEarly = true;
        render();
      });

      document.getElementById('btn-restart-home').addEventListener('click', function () {
        sound.playWhoosh();
        state._showWheelEarly = false;
        state.roundAttempt = 1;
        state.screen = 'home';
        render();
      });

    } else {
      // Ronda 2 o Ruleta express
      const candidateIds = state._showWheelEarly
        ? Array.from(new Set([].concat(Array.from(state.player1Selections), Array.from(state.player2Selections))))
        : Array.from(state.player2Selections);

      let candidateItems = candidateIds
        .map(function (id) { return state.restaurants.find(function (r) { return r.id === id; }); })
        .filter(Boolean);

      if (candidateItems.length === 0) {
        candidateItems = state.restaurants.slice(0, 6);
      }

      app.innerHTML = `
        <div class="mobile-shell px-5 justify-between text-center animate-ios-pop pb-6">
          <div class="pt-6">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] text-xs font-semibold text-indigo-300 border border-indigo-500/30 mb-2">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              <span>${state._showWheelEarly ? 'Ruleta de desempate express' : 'Desempate final (Ronda 2)'}</span>
            </div>

            <h2 class="text-2xl font-extrabold text-white tracking-tight">
              Ruleta de Desempate
            </h2>
            <p class="text-xs text-neutral-400 max-w-xs mx-auto mt-1 leading-relaxed">
              Girad la ruleta o deslizad con el dedo para desempatar al azar entre las opciones en juego.
            </p>
          </div>

          <!-- Canvas interactivo de la ruleta táctil -->
          <div class="relative w-[280px] h-[280px] mx-auto my-3 flex items-center justify-center">
            <!-- Aguja superior estilo visionOS -->
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_2px_8px_rgba(255,214,10,0.7)] pointer-events-none">
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M12 28L3 6C2 4 3.5 1 6 1H18C20.5 1 22 4 21 6L12 28Z" fill="#FFD60A" stroke="#FFFFFF" stroke-width="1.5"/>
              </svg>
            </div>

            <canvas id="tiebreak-wheel-canvas" class="w-[280px] h-[280px] rounded-full drop-shadow-2xl cursor-grab active:cursor-grabbing touch-none select-none"></canvas>

            <!-- Botón central estilo visionOS Liquid Glass -->
            <button 
              id="btn-spin-wheel" 
              class="absolute z-20 w-16 h-16 rounded-full bg-black/90 backdrop-blur-2xl border-2 border-white/40 text-white font-extrabold text-[11px] tracking-wider shadow-2xl flex flex-col items-center justify-center active:scale-90 transition transform"
              title="Girar ruleta"
            >
              <svg class="w-4 h-4 text-amber-400 mb-0.5 animate-spin" style="animation-duration: 4s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              <span>GIRAR</span>
            </button>
          </div>

          <div class="space-y-2 pb-2">
            <div class="text-[11px] text-neutral-400">
              ${candidateItems.length} opciones en la ruleta
            </div>

            <button 
              id="btn-restart-home" 
              class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] active:scale-[0.98] transition flex items-center justify-center gap-1.5"
            >
              <span>Reiniciar desde cero</span>
            </button>
          </div>
        </div>
      `;

      initInteractiveTieWheel(app, candidateItems, function (winner) {
        state._showWheelEarly = false;
        state.winningRestaurant = winner;
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
        state._showWheelEarly = false;
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
                            ${(function () {
                              const op = getOpeningStatus(r);
                              if (op.status === 'open') {
                                return '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span><span>' + op.label + '</span></span>';
                              } else if (op.status === 'soon') {
                                return '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1"><svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><span>' + op.label + '</span></span>';
                              } else {
                                return '<span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.05] text-neutral-400 border border-white/[0.08]">' + op.label + ' (' + op.sub + ')</span>';
                              }
                            })()}
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
