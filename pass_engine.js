  // ==========================================
  // DUO PASS ENGINE: GENERADOR Y RENDERIZADOR DE PASES ÚNICOS (REALIA & BESPOKE)
  // ==========================================
  const DuoPassEngine = {
    ARCHETYPES: {
      THERMAL_RECEIPT: 'thermal-receipt',
      CINEMA_TICKET: 'cinema-ticket',
      SECRET_DOSSIER: 'secret-dossier',
      SPA_VOUCHER: 'spa-voucher',
      VIP_BACKSTAGE: 'vip-backstage',
      BOARDING_PASS: 'boarding-pass',
      NATURE_PERMIT: 'nature-permit',
      WINE_RESERVE: 'wine-reserve',
      ARCADE_SCORECARD: 'arcade-scorecard',
      SUNSET_POSTCARD: 'sunset-postcard',
      GALLERY_PASS: 'gallery-pass',
      CHEF_RECIPE: 'chef-recipe',
      CUSTOM_VISA: 'custom-visa'
    },

    LABELS: {
      'thermal-receipt': 'Ticket Térmico de Restaurante',
      'cinema-ticket': 'Entrada de Cine Vintage',
      'secret-dossier': 'Dossier de Misión Secreta',
      'spa-voucher': 'Voucher Ritual Wellness',
      'vip-backstage': 'Pase VIP Backstage Tour',
      'boarding-pass': 'Tarjeta de Embarque Oficial',
      'nature-permit': 'Permiso de Expedición Botánica',
      'wine-reserve': 'Certificado de Reserva & Bodega',
      'arcade-scorecard': 'Scorecard Neón Arcade & Bolera',
      'sunset-postcard': 'Postal Golden Hour Atardecer',
      'gallery-pass': 'Pase Exclusivo de Galería de Arte',
      'chef-recipe': 'Comanda Atelier de Cocina',
      'custom-visa': 'Pase Prestige Oficial Duo'
    },

    hashString: function (str) {
      if (!str) return '8821';
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash).toString();
    },

    detectArchetype: function (name, note, mode) {
      const text = ((name || '') + ' ' + (note || '')).toLowerCase();

      // 1. Cine y Películas
      if (mode === 'movies' || /(cine|pel[ií]cula|peli|serie|estreno|palomitas|filmaffinity|cinesa|neocine|hollywood|butaca|sala 3d|imax|pantalla)/i.test(text)) {
        return 'cinema-ticket';
      }
      // 2. Escape Room / Juegos de misterio / Karts / Acción
      if (/(escape|misterio|enigma|acertijo|candado|cluedo|l[aá]ser|laser tag|paintball|kart|karts|tirolina|misi[oó]n|secreto|agente|detective|investigaci[oó]n|terror|fantasma|pista secreta)/i.test(text)) {
        return 'secret-dossier';
      }
      // 3. Spa / Bienestar / Termal
      if (/(spa|termal|termas|masaje|balneario|circuito termal|sauna|jacuzzi|relax|bienestar|desconexi[oó]n|yoga|meditaci[oó]n|hidromasaje|talaso|hammam)/i.test(text)) {
        return 'spa-voucher';
      }
      // 4. Música / Conciertos / Festivales
      if (/(concierto|festival|m[uú]sica|directo|ac[uú]stico|dj|recital|banda|rock|pop|indie|teatro musical|auditorio|conciertazo|fiesta|discoteca|baile)/i.test(text)) {
        return 'vip-backstage';
      }
      // 5. Viajes / Vuelos / Escapadas
      if (/(vuelo|viaje|escapada|avi[oó]n|aeropuerto|hotel|resort|tren|ave|maleta|par[ií]s|roma|londres|crucero|billete)/i.test(text)) {
        return 'boarding-pass';
      }
      // 6. Vino / Bodega / Cerveza / Degustación
      if (/(vino|bodega|cata|sommelier|copa|barrica|degustaci[oó]n|maridaje|quesos|jam[oó]n ib[eé]rico|cerveza artesana|coctel|c[oó]ctel|vermut|ginebra)/i.test(text)) {
        return 'wine-reserve';
      }
      // 7. Bolos / Arcade / Minigolf
      if (/(bolera|bolos|strike|arcade|recreativos|billar|dardos|minigolf|air hockey|pinball|futbol[ií]n|gaming|recreativo)/i.test(text)) {
        return 'arcade-scorecard';
      }
      // 8. Naturaleza / Senderismo / Aire libre
      if (/(senderismo|ruta|monta[nñ]a|playa|cala|picnic|parque|naturaleza|bosque|mirador|bici|kayak|paddle|surf|acampada|trekking)/i.test(text)) {
        return 'nature-permit';
      }
      // 9. Atardecer / Romántico / Estrellas
      if (/(atardecer|puesta de sol|puesta del sol|golden hour|estrellas|constelaciones|paseo rom[aá]ntico|helado|velas|rom[aá]ntico)/i.test(text)) {
        return 'sunset-postcard';
      }
      // 10. Arte / Museos / Cultura
      if (/(museo|exposici[oó]n|galer[ií]a|arte|escultura|cuadros|cer[aá]mica|alfarer[ií]a|pintura|taller creativo|historia|exhibici[oó]n)/i.test(text)) {
        return 'gallery-pass';
      }
      // 11. Cocinar en casa
      if (/(cocinar|receta|sushi en casa|pasta casera|reposter[ií]a|tarta casera|chef|masterchef|cocinillas)/i.test(text)) {
        return 'chef-recipe';
      }
      // 12. Comida / Restaurantes (Modo food o cualquier indicio gastronómico)
      if (mode === 'food' || /(cena|comida|comer|almuerzo|desayuno|merienda|restaurante|pizza|burger|hamburguesa|popeyes|kfc|mcdonald|burger king|unica|goiko|tacos|mexicano|sushi|asi[aá]tico|italiano|chiringuito|asador|bar|tapas|poke|ramen|kebab|pollo|patatas|postre|brunch|cafeter[ií]a|marisquer[ií]a|churros|buffet)/i.test(text)) {
        return 'thermal-receipt';
      }
      // Por defecto pase lifestyle prestige
      return 'custom-visa';
    },

    synthesizeDishes: function (name, note) {
      const text = ((name || '') + ' ' + (note || '')).toLowerCase();
      if (/mexican|taco|burrito|guacamole|nacho/i.test(text)) {
        return [
          { qty: '2x', name: 'Tacos al Pastor Especial de la Casa', price: '13.50 €' },
          { qty: '1x', name: 'Totopos con Guacamole Fresco y Queso', price: '7.80 €' },
          { qty: '2x', name: 'Margaritas Frozen de Lima', price: '12.00 €' }
        ];
      }
      if (/italian|pizza|pasta|lasa|trattoria/i.test(text)) {
        return [
          { qty: '1x', name: 'Pizza Artesanal al Horno de Leña', price: '14.90 €' },
          { qty: '1x', name: 'Pasta Fresca al Tartufo con Parmigiano', price: '15.50 €' },
          { qty: '1x', name: 'Tiramisù Tradizionale Fatto in Casa', price: '6.20 €' },
          { qty: '2x', name: 'Calice di Vino Chianti', price: '7.00 €' }
        ];
      }
      if (/sushi|japon|asia|ramen|gyoza|poke/i.test(text)) {
        return [
          { qty: '1x', name: 'Variado Especial Nigiris & Uramakis (16 pz)', price: '19.50 €' },
          { qty: '1x', name: 'Gyozas Crujientes de Langostino y Verduras', price: '6.80 €' },
          { qty: '2x', name: 'Mochis Artesanales de Té Matcha y Fresa', price: '5.50 €' }
        ];
      }
      if (/burger|hamburgues|smash/i.test(text)) {
        return [
          { qty: '2x', name: 'Duo Burger Gourmet Doble Carne con Queso Ahumado', price: '18.90 €' },
          { qty: '1x', name: 'Patatas Rústicas con Salsa Trufada', price: '4.90 €' },
          { qty: '2x', name: 'Bebidas Grandes Refill', price: '5.60 €' }
        ];
      }
      if (/tapas|bar|taberna|ca[nñ]as/i.test(text)) {
        return [
          { qty: '1x', name: 'Tabla de Jamón Ibérico y Queso Curado', price: '16.00 €' },
          { qty: '1x', name: 'Patatas Bravas Crujientes de la Taberna', price: '5.50 €' },
          { qty: '1x', name: 'Croquetas Caseras Cremosas (6 uds)', price: '7.20 €' },
          { qty: '2x', name: 'Cañas Dobles Bien Frías', price: '5.00 €' }
        ];
      }
      return [
        { qty: '2x', name: 'Plato Especial Seleccionado de la Casa', price: '21.00 €' },
        { qty: '1x', name: 'Guarnición Especial para Compartir', price: '6.50 €' },
        { qty: '1x', name: 'Postre Delicioso de Enamorados', price: '6.00 €' },
        { qty: '2x', name: 'Bebidas de Celebración en Pareja', price: '6.00 €' }
      ];
    },

    generatePassData: function (item) {
      if (!item) item = {};
      const name = item.name || item.restaurantName || 'Plan Especial';
      const note = item.note || '';
      const mode = item.mode || state.activeMode || 'food';
      const id = item.id || item.restaurantId || ('custom-' + Date.now());
      const p1 = item.p1Name || state.player1Name || 'Miguel';
      const p2 = item.p2Name || state.player2Name || 'Patri';
      const coupleNames = `${p1} & ${p2}`;
      const date = item.date || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
      const rating = item.rating || 5;
      const photo = item.photo || null;
      const hash = this.hashString(name + date);
      const cleanPrefix = name.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X') || 'DUO';
      const ticketNum = `#DUO-${hash.slice(0, 4)}-${cleanPrefix}`;

      const lowerId = (id || '').toLowerCase();
      const lowerName = name.toLowerCase();

      let archetype = this.detectArchetype(name, note, mode);
      let brandLogo = null;
      let venueAddress = 'Cartagena / Tu Ciudad';
      let dishes = null;
      let navQuery = name;

      // Coincidencias de catálogo oficial
      if (lowerId.includes('popeyes') || lowerName.includes('popeyes')) {
        archetype = 'thermal-receipt';
        brandLogo = './popeyes.png';
        venueAddress = 'CC ESPACIO MEDITERRÁNEO • LOCAL B-14, CARTAGENA';
        navQuery = 'Popeyes CC Espacio Mediterraneo Cartagena';
        dishes = [
          { qty: '2x', name: 'The Chicken Sandwich (12h marinado cajún)', price: '13.80 €' },
          { qty: '1x', name: 'Patatas Cajún Grandes', price: '3.60 €' },
          { qty: '4x', name: 'Tenders Crujientes Louisiana', price: '5.90 €' },
          { qty: '2x', name: 'Refresco Refill Ilimitado', price: '5.40 €' }
        ];
      } else if (lowerId.includes('unica') || lowerName.includes('única') || lowerName.includes('unica')) {
        archetype = 'thermal-receipt';
        brandLogo = './unica.png';
        venueAddress = 'CASCO HISTÓRICO • CALLE MAYOR, CARTAGENA';
        navQuery = 'Unica Smash Burgers Cartagena';
        dishes = [
          { qty: '2x', name: 'Smash Burger Doble Bacon Trufada', price: '17.90 €' },
          { qty: '1x', name: 'Patatas Especiales Queso Ahumado', price: '4.80 €' },
          { qty: '2x', name: 'Bebidas Artesanales', price: '6.00 €' }
        ];
      } else if (lowerId.includes('kfc') || lowerName.includes('kfc')) {
        archetype = 'thermal-receipt';
        brandLogo = './kfc.png';
        venueAddress = 'CC MANDARACHE • RONDA CIUDAD DE LA UNIÓN, CARTAGENA';
        navQuery = 'KFC Mandarache Cartagena';
        dishes = [
          { qty: '1x', name: 'Cubo Receta Original 8 Piezas', price: '15.99 €' },
          { qty: '2x', name: 'Patatas Clásicas Grandes', price: '5.50 €' },
          { qty: '2x', name: 'Refresco Grande', price: '5.20 €' }
        ];
      } else if (lowerId.includes('mcdonald') || lowerName.includes('mcdonald')) {
        archetype = 'thermal-receipt';
        brandLogo = './mcdonalds.png';
        venueAddress = 'ESPACIO MEDITERRÁNEO / PUERTO DE CARTAGENA';
        navQuery = 'McDonalds Cartagena';
        dishes = [
          { qty: '2x', name: 'Menú Big Mac con Patatas Deluxe', price: '18.40 €' },
          { qty: '9x', name: 'McNuggets con Salsa Barbacoa', price: '5.90 €' },
          { qty: '2x', name: 'McFlurry Lotus Biscoff', price: '6.20 €' }
        ];
      } else if (lowerId.includes('burger_king') || lowerName.includes('burger king')) {
        archetype = 'thermal-receipt';
        brandLogo = './burger_king.png';
        venueAddress = 'AVDA. TITO DIDIO / CC MANDARACHE, CARTAGENA';
        navQuery = 'Burger King Cartagena';
        dishes = [
          { qty: '2x', name: 'Menú Whopper Doble a la Parrilla', price: '19.20 €' },
          { qty: '1x', name: 'Aros de Cebolla Crujientes', price: '4.20 €' },
          { qty: '2x', name: 'King Fusion Oreo', price: '6.00 €' }
        ];
      } else if (lowerId.includes('telepizza') || lowerName.includes('telepizza')) {
        archetype = 'thermal-receipt';
        brandLogo = './telepizza.png';
        venueAddress = 'CALLE ALFONSO X EL SABIO, CARTAGENA';
        navQuery = 'Telepizza Cartagena';
        dishes = [
          { qty: '1x', name: 'Pizza Mediana Barbacoa Gourmet', price: '15.95 €' },
          { qty: '1x', name: 'Pizza Mediana Carbonara Masa Fina', price: '14.95 €' },
          { qty: '1x', name: 'Pizzolinos Ajo y Queso', price: '4.50 €' }
        ];
      } else if (lowerId.includes('kebab') || lowerName.includes('kebab')) {
        archetype = 'thermal-receipt';
        brandLogo = './kebab.png';
        venueAddress = 'CALLE DEL CARMEN / PUERTO, CARTAGENA';
        dishes = [
          { qty: '2x', name: 'Dürüm Mixto con Salsa Blanca y Picante', price: '14.00 €' },
          { qty: '1x', name: 'Patatas Especiadas Orientales', price: '3.50 €' },
          { qty: '2x', name: 'Bebidas Frías Refrescantes', price: '4.00 €' }
        ];
      } else if (lowerId === 'plan-cine') {
        archetype = 'cinema-ticket';
        venueAddress = 'Neocine Mandarache • Sala 04';
      } else if (lowerId === 'plan-escape-room') {
        archetype = 'secret-dossier';
        venueAddress = 'Mystery Lab Centro • Sala Enigma';
      } else if (lowerId === 'plan-spa') {
        archetype = 'spa-voucher';
        venueAddress = 'Talaso Spa Marino & Aguas Termales';
      } else if (lowerId === 'plan-concierto') {
        archetype = 'vip-backstage';
        venueAddress = 'Auditorio y Sala de Conciertos';
      } else if (lowerId === 'plan-bolera') {
        archetype = 'arcade-scorecard';
        venueAddress = 'Bowling Espacio Mediterráneo';
      } else if (lowerId === 'plan-cata-vinos') {
        archetype = 'wine-reserve';
        venueAddress = 'Taberna y Bodega Selecta';
      } else if (lowerId === 'plan-picnic' || lowerId === 'plan-senderismo') {
        archetype = 'nature-permit';
        venueAddress = 'Parque Natural / Mirador Panorámico';
      } else if (lowerId === 'plan-paseo-helado') {
        archetype = 'sunset-postcard';
        venueAddress = 'Puerto y Paseo Marítimo';
      } else if (lowerId === 'plan-museo') {
        archetype = 'gallery-pass';
        venueAddress = 'Museo Teatro Romano / Galería de Arte';
      } else if (lowerId === 'plan-cocinar-juntos') {
        archetype = 'chef-recipe';
        venueAddress = 'Cocina Atelier en Casa';
      } else if (archetype === 'thermal-receipt' && !dishes) {
        dishes = this.synthesizeDishes(name, note);
      }

      const archetypeLabel = this.LABELS[archetype] || 'Pase Único Duo';

      return {
        id: id,
        name: name,
        note: note,
        mode: mode,
        date: date,
        rating: rating,
        photo: photo,
        p1Name: p1,
        p2Name: p2,
        coupleNames: coupleNames,
        ticketNum: ticketNum,
        archetype: archetype,
        archetypeLabel: archetypeLabel,
        brandLogo: brandLogo,
        venueAddress: venueAddress,
        dishes: dishes,
        navQuery: navQuery,
        navUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(navQuery)
      };
    },

    // Generador SVG del Código de Barras
    getBarcodeSvg: function (color) {
      const c = color || 'currentColor';
      return `
        <svg viewBox="0 0 160 36" class="w-full h-7 fill-current" style="color: ${c};">
          <rect x="0" y="0" width="3" height="36" />
          <rect x="5" y="0" width="1" height="36" />
          <rect x="8" y="0" width="4" height="36" />
          <rect x="14" y="0" width="2" height="36" />
          <rect x="18" y="0" width="1" height="36" />
          <rect x="22" y="0" width="5" height="36" />
          <rect x="30" y="0" width="2" height="36" />
          <rect x="34" y="0" width="3" height="36" />
          <rect x="39" y="0" width="1" height="36" />
          <rect x="43" y="0" width="4" height="36" />
          <rect x="49" y="0" width="2" height="36" />
          <rect x="54" y="0" width="1" height="36" />
          <rect x="58" y="0" width="6" height="36" />
          <rect x="67" y="0" width="2" height="36" />
          <rect x="71" y="0" width="3" height="36" />
          <rect x="76" y="0" width="1" height="36" />
          <rect x="80" y="0" width="4" height="36" />
          <rect x="87" y="0" width="2" height="36" />
          <rect x="91" y="0" width="5" height="36" />
          <rect x="98" y="0" width="1" height="36" />
          <rect x="102" y="0" width="4" height="36" />
          <rect x="108" y="0" width="2" height="36" />
          <rect x="112" y="0" width="3" height="36" />
          <rect x="117" y="0" width="1" height="36" />
          <rect x="121" y="0" width="5" height="36" />
          <rect x="128" y="0" width="2" height="36" />
          <rect x="132" y="0" width="4" height="36" />
          <rect x="138" y="0" width="2" height="36" />
          <rect x="142" y="0" width="3" height="36" />
          <rect x="148" y="0" width="1" height="36" />
          <rect x="152" y="0" width="5" height="36" />
          <rect x="158" y="0" width="2" height="36" />
        </svg>
      `;
    },

    // Generador SVG del Corte de Sierra Superior e Inferior
    getSawtoothSvg: function () {
      return `
        <svg viewBox="0 0 400 8" class="w-full h-2 text-[#0A0B0E] fill-current" preserveAspectRatio="none">
          <polygon points="0,0 5,8 10,0 15,8 20,0 25,8 30,0 35,8 40,0 45,8 50,0 55,8 60,0 65,8 70,0 75,8 80,0 85,8 90,0 95,8 100,0 105,8 110,0 115,8 120,0 125,8 130,0 135,8 140,0 145,8 150,0 155,8 160,0 165,8 170,0 175,8 180,0 185,8 190,0 195,8 200,0 205,8 210,0 215,8 220,0 225,8 230,0 235,8 240,0 245,8 250,0 255,8 260,0 265,8 270,0 275,8 280,0 285,8 290,0 295,8 300,0 305,8 310,0 315,8 320,0 325,8 330,0 335,8 340,0 345,8 350,0 355,8 360,0 365,8 370,0 375,8 380,0 385,8 390,0 395,8 400,0" />
        </svg>
      `;
    },

    // Renderizador del Reverso Común / Bitácora
    renderCardBack: function (pass, cardId, isCompact) {
      const stars = '★'.repeat(pass.rating || 5) + '☆'.repeat(5 - (pass.rating || 5));
      const hasPhoto = !!pass.photo;
      return `
        <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-5 flex flex-col justify-between text-left select-none bg-neutral-900 border border-white/20 text-white font-sans">
          <div>
            <div class="flex items-center justify-between pb-2 border-b border-white/10">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span class="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold">BITÁCORA & REVERSO DUO</span>
              </div>
              <span class="text-[10px] font-mono text-neutral-400">${pass.ticketNum}</span>
            </div>

            <div class="mt-2.5">
              <div class="text-[10px] text-amber-400 font-bold tracking-widest">${stars}</div>
              <h4 class="text-sm font-extrabold text-white mt-0.5 truncate">${escapeHtml(pass.name)}</h4>
              <div class="text-[11px] text-neutral-400 mt-0.5">Pareja: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></div>
            </div>

            ${hasPhoto ? `
              <div class="mt-2.5 rounded-xl overflow-hidden max-h-36 border border-white/15 shadow-md relative group">
                <img src="${pass.photo}" class="w-full h-28 object-cover" />
                <div class="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[8px] font-mono text-white/90">FOTO OFICIAL</div>
              </div>
            ` : ''}

            <div class="mt-2.5 p-2.5 bg-black/40 rounded-xl border border-white/10 text-[11px] text-neutral-300 italic leading-relaxed">
              "${escapeHtml(pass.note || 'Cita celebrada y validada en Duo. Momentos únicos que construyen nuestra historia.')}"
            </div>
          </div>

          <div class="pt-2 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
            <a href="${pass.navUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white flex items-center gap-1 transition">
              <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
              <span class="flex items-center gap-1"><svg class="w-3 h-3 text-emerald-400 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg><span>Ruta Maps</span></span>
            </a>
            <div class="text-right">
              <span class="text-[9px] font-mono text-neutral-400 block">${pass.date}</span>
            </div>
          </div>
        </div>
      `;
    },

    // Renderizador Maestro de Pase según su Arquetipo
    renderPassCard: function (pass, options) {
      if (!pass) return '';
      if (!options) options = {};
      const cardId = options.id || ('pass-' + Math.random().toString(36).substring(2, 9));
      const isCompact = !!options.compact;
      const isPreview = !!options.isPreview;
      const arc = pass.archetype || 'custom-visa';

      let frontHtml = '';

      switch (arc) {
        case 'thermal-receipt':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl thermal-receipt-paper text-[#18191C] p-4 sm:p-5 pt-6 pb-6 border border-neutral-300/80 font-mono text-left select-none">
              <!-- Sawtooth Top -->
              <div class="absolute top-0 left-0 right-0 h-2 overflow-hidden pointer-events-none opacity-90">
                ${this.getSawtoothSvg()}
              </div>

              <!-- Cabecera Restaurante -->
              <div class="text-center pb-2.5 border-b-2 border-dashed border-neutral-400/60">
                <div class="flex items-center justify-center gap-2 mb-1">
                  ${pass.brandLogo ? `<img src="${pass.brandLogo}" class="w-7 h-7 object-contain filter grayscale contrast-125" alt="Logo">` : '<span class="text-xl">️</span>'}
                  <h3 class="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900 uppercase">${escapeHtml(pass.name)}</h3>
                </div>
                <p class="text-[9px] text-neutral-600 leading-tight uppercase font-medium">
                  ${escapeHtml(pass.venueAddress)}<br>
                  NIF: B-88291048 • TEL: 968 00 24 12
                </p>
              </div>

              <!-- Metadatos de Comanda -->
              <div class="py-2 border-b border-dashed border-neutral-400/60 text-[10px] space-y-0.5">
                <div class="flex justify-between">
                  <span class="text-neutral-500">FECHA: ${pass.date}</span>
                  <span class="text-neutral-500">HORA: 21:30 H</span>
                </div>
                <div class="flex justify-between font-bold text-neutral-800">
                  <span>TICKET: ${pass.ticketNum}</span>
                  <span>MESA: #07 DUO</span>
                </div>
                <div class="flex justify-between text-[11px] pt-0.5">
                  <span class="text-neutral-600">PAREJA:</span>
                  <strong class="font-extrabold text-neutral-900 uppercase">${escapeHtml(pass.coupleNames)}</strong>
                </div>
              </div>

              <!-- Desglose de Platos -->
              <div class="py-2.5 border-b-2 border-dashed border-neutral-400/60 text-[10px] space-y-1.5">
                <div class="flex justify-between font-bold text-[9px] text-neutral-500 pb-0.5 border-b border-neutral-300">
                  <span>CANT / ARTÍCULO</span>
                  <span>TOTAL</span>
                </div>
                ${(pass.dishes || [
                  { qty: '2x', name: 'Plato Especial de la Casa', price: '18.50 €' },
                  { qty: '1x', name: 'Guarnición Especial Duo', price: '4.50 €' },
                  { qty: '2x', name: 'Bebidas de Pareja', price: '5.00 €' }
                ]).map(function (d) {
                  return `
                    <div class="flex justify-between items-start leading-tight">
                      <span class="text-neutral-800"><strong class="font-bold">${d.qty}</strong> ${escapeHtml(d.name)}</span>
                      <span class="font-bold text-neutral-900 shrink-0 ml-2">${d.price}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Totales & Descuento 100% Duo Love -->
              <div class="py-2 text-[11px] space-y-0.5 border-b border-dashed border-neutral-400/60">
                <div class="flex justify-between text-neutral-600">
                  <span>SUBTOTAL:</span>
                  <span>28.00 €</span>
                </div>
                <div class="flex justify-between font-bold text-emerald-800 bg-emerald-100/60 px-1 py-0.5 rounded">
                  <span>DESCUENTO DUO LOVE (100%):</span>
                  <span>-100%</span>
                </div>
                <div class="flex justify-between font-extrabold text-neutral-950 text-xs sm:text-sm pt-1">
                  <span>TOTAL A PAGAR:</span>
                  <span>0.00 €</span>
                </div>
              </div>

              <!-- Sello de Caucho Rojo Pagado -->
              <div class="py-3 text-center">
                <div class="stamp-paid-red text-xs sm:text-sm">
                  ★ PAGADO EN DUO ★
                </div>
                <div class="text-[9px] text-neutral-500 mt-1 uppercase font-semibold tracking-wider">
                  ${pass.date} • MATCH COMPARTIDO AL 100%
                </div>
              </div>

              <!-- Código de Barras Térmico -->
              <div class="pt-1 flex flex-col items-center">
                ${this.getBarcodeSvg('#18191C')}
                <span class="text-[8px] text-neutral-500 tracking-widest mt-0.5">${pass.ticketNum}</span>
              </div>

              <!-- Sawtooth Bottom -->
              <div class="absolute bottom-0 left-0 right-0 h-2 overflow-hidden pointer-events-none opacity-90 rotate-180">
                ${this.getSawtoothSvg()}
              </div>
            </div>
          `;
          break;

        case 'cinema-ticket':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#140e10] border border-amber-600/40 text-amber-100 p-4 sm:p-5 ticket-scallop-edges text-left select-none">
              <div class="foil-glare absolute inset-0 pointer-events-none opacity-30"></div>
              <div class="border border-amber-500/40 rounded-xl p-3 sm:p-4 bg-gradient-to-b from-[#1a1114] via-[#120a0d] to-[#1c1216]">
                <div class="text-center pb-2 border-b border-amber-500/30">
                  <p class="font-cinzel text-[9px] tracking-[0.25em] text-amber-400 uppercase font-bold">★ PALACIO CINEMATOGRÁFICO DUO ★</p>
                  <h2 class="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-sm mt-0.5">ADMIT TWO</h2>
                  <p class="text-[10px] font-playfair italic text-amber-300/90 mt-0.5">Pase de Gala para <strong class="font-bold text-amber-100">${escapeHtml(pass.coupleNames)}</strong></p>
                </div>

                <div class="py-3 space-y-2">
                  <div class="flex items-center justify-between text-[11px] font-mono text-amber-300 px-2.5 py-1 bg-amber-950/40 rounded border border-amber-500/20">
                    <span>SALA: <strong class="text-amber-100 font-sans">04 VIP</strong></span>
                    <span>FILA: <strong class="text-amber-100 font-sans">07</strong></span>
                    <span>BUTACAS: <strong class="text-amber-100 font-sans">1A & 1B</strong></span>
                  </div>
                  <div>
                    <span class="text-[9px] font-cinzel text-amber-400/80 uppercase block">PELÍCULA / PLAN:</span>
                    <h3 class="text-base sm:text-lg font-black text-white font-cinzel tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                  </div>
                  <div class="flex justify-between items-center text-[10px] text-amber-200/80 pt-1">
                    <span>${pass.date}</span>
                    <span class="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 font-mono text-[9px] text-amber-300">LOVE SEAT VIP</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-dashed border-amber-500/30 flex items-center justify-between">
                  <div class="w-32">
                    ${this.getBarcodeSvg('#f59e0b')}
                  </div>
                  <div class="stamp-circle-seal w-12 h-12 text-rose-400 text-[8px] font-bold tracking-tighter">
                    CANJEADO<br>DUO
                  </div>
                </div>
              </div>
            </div>
          `;
          break;

        case 'secret-dossier':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#16171a] border-2 border-red-700/60 p-4 sm:p-5 text-zinc-200 text-left select-none">
              <div class="absolute -top-1 right-6 w-4 h-10 border-2 border-amber-400/80 rounded-full shadow-md z-20 pointer-events-none"></div>
              
              <div class="flex items-center justify-between border-b-2 border-zinc-700 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 bg-red-600 rounded-sm animate-pulse"></span>
                  <span class="font-mono text-[10px] font-black tracking-widest text-red-500 uppercase">DUO INTELLIGENCE AGENCY</span>
                </div>
                <span class="font-mono text-[9px] bg-red-950 text-red-400 px-2 py-0.5 rounded border border-red-800 font-bold">NIVEL 5</span>
              </div>

              <div class="my-3 flex items-center justify-between">
                <div>
                  <p class="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">EXPEDIENTE OPERATIVO</p>
                  <h3 class="text-base sm:text-lg font-black text-white uppercase tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                </div>
                <div class="stamp-classified px-2.5 py-1 text-[11px] font-mono">
                  TOP SECRET
                </div>
              </div>

              <div class="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-700/60 font-mono text-[10px] space-y-1">
                <div class="flex justify-between">
                  <span class="text-zinc-500">AGENTES ACTIVOS:</span>
                  <span class="text-red-400 font-bold">${escapeHtml(pass.coupleNames)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-500">FECHA CLAVE:</span>
                  <span class="text-zinc-300">${pass.date}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-500">ESTADO MISIÓN:</span>
                  <span class="text-emerald-400 font-bold">DESBLOQUEADO (100%)</span>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-zinc-700 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#ef4444')}
                </div>
                <span class="font-mono text-[9px] text-zinc-500">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'spa-voucher':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#FAF7F2] border border-[#e4ded5] p-5 text-[#2e2b27] text-left select-none">
              <div class="flex items-center justify-between border-b border-stone-300 pb-2">
                <span class="text-[10px] font-serif text-emerald-900/80 tracking-widest uppercase">DUO WELLNESS RETREAT</span>
                <div class="w-6 h-6 rounded border-2 border-red-700 text-red-700 flex items-center justify-center font-serif text-xs font-bold">美</div>
              </div>

              <div class="my-4 text-center">
                <p class="font-cormorant italic text-[11px] text-stone-500 tracking-widest uppercase">INVITACIÓN AL BIENESTAR & CALMA</p>
                <h3 class="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-0.5 truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-[11px] font-serif italic text-stone-600 mt-1">Válido para dos almas: <strong class="text-stone-900">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <div class="p-3 bg-stone-100/70 rounded-xl border border-stone-200 font-serif text-[11px] text-center text-stone-700 space-y-0.5">
                <div>Circuito Termal • Vapor & Aguas Claras</div>
                <div class="text-[10px] text-stone-500 font-sans tracking-wide">EMITIDO EL ${pass.date} • CITA VALIDADA</div>
              </div>

              <div class="mt-3 pt-2 border-t border-stone-300/80 flex items-center justify-between text-[10px] font-serif text-stone-500">
                <span>TERMAL DUO PASS</span>
                <span class="font-bold text-stone-800">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'vip-backstage':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#13072b] via-[#1a0a38] to-[#090317] border border-fuchsia-500/40 p-4 sm:p-5 text-fuchsia-100 text-left select-none">
              <div class="hologram-shimmer absolute inset-0 opacity-40"></div>
              
              <!-- Agujero de Cinta Lanyard -->
              <div class="w-10 h-2 rounded-full bg-black/80 border border-fuchsia-400/40 mx-auto mb-2.5"></div>

              <div class="flex items-center justify-between pb-2 border-b border-fuchsia-500/30">
                <span class="text-[10px] font-mono tracking-widest text-fuchsia-400 font-bold uppercase">DUO LIVE TOUR PASS</span>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold border border-fuchsia-500/40">VIP ACCESS</span>
              </div>

              <div class="my-3">
                <span class="text-[9px] font-mono text-fuchsia-400/80 uppercase">HEADLINER & CITA:</span>
                <h3 class="text-lg sm:text-xl font-black text-white font-syne tracking-tight leading-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-[11px] text-fuchsia-300 mt-0.5">Acceso Backstage: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Ecualizador Gráfico SVG -->
              <div class="my-2.5 p-2 bg-black/50 rounded-xl border border-fuchsia-500/20 flex flex-col items-center">
                <svg viewBox="0 0 100 20" class="w-full h-5 text-pink-400 fill-current opacity-90">
                  <rect x="2" y="8" width="2" height="8" rx="1"/><rect x="6" y="4" width="2" height="16" rx="1"/><rect x="10" y="2" width="2" height="20" rx="1"/><rect x="14" y="6" width="2" height="12" rx="1"/><rect x="18" y="1" width="2" height="22" rx="1"/><rect x="22" y="5" width="2" height="14" rx="1"/><rect x="26" y="8" width="2" height="8" rx="1"/><rect x="30" y="3" width="2" height="18" rx="1"/><rect x="34" y="0" width="2" height="24" rx="1"/><rect x="38" y="4" width="2" height="16" rx="1"/><rect x="42" y="7" width="2" height="10" rx="1"/><rect x="46" y="2" width="2" height="20" rx="1"/><rect x="50" y="5" width="2" height="14" rx="1"/><rect x="54" y="1" width="2" height="22" rx="1"/><rect x="58" y="8" width="2" height="8" rx="1"/><rect x="62" y="4" width="2" height="16" rx="1"/><rect x="66" y="2" width="2" height="20" rx="1"/><rect x="70" y="6" width="2" height="12" rx="1"/><rect x="74" y="1" width="2" height="22" rx="1"/><rect x="78" y="5" width="2" height="14" rx="1"/><rect x="82" y="8" width="2" height="8" rx="1"/><rect x="86" y="3" width="2" height="18" rx="1"/><rect x="90" y="5" width="2" height="14" rx="1"/><rect x="94" y="8" width="2" height="8" rx="1"/>
                </svg>
              </div>

              <div class="pt-2 border-t border-fuchsia-500/30 flex items-center justify-between text-[10px] font-mono">
                <span class="text-fuchsia-400">${pass.date}</span>
                <span class="font-bold text-white">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'boarding-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0b1d33] via-[#081524] to-[#040a12] border border-sky-500/35 p-4 sm:p-5 text-sky-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-sky-500/30 font-mono text-[10px]">
                <div class="flex items-center gap-1.5 font-bold text-white">
                  <span class="text-sky-400"><svg class="w-3.5 h-3.5 text-sky-400 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.1-2.1.7l-.7.7 5.7 3.6-2.5 2.5-2.3-.4c-.5-.1-1 .1-1.4.5l-.3.3 2.8 1.8 1.8 2.8.3-.3c.4-.4.6-.9.5-1.4l-.4-2.3 2.5-2.5 3.6 5.7.7-.7c.6-.5.9-1.3.7-2.1z"/></svg></span>
                  <span>DUO AIRLINES • FIRST CLASS</span>
                </div>
                <span class="text-sky-300 font-bold">${pass.ticketNum}</span>
              </div>

              <div class="my-3 flex items-center justify-between">
                <div>
                  <span class="text-[9px] font-mono text-sky-400 uppercase">ORIGEN</span>
                  <div class="text-lg font-black text-white font-mono">RTN</div>
                  <span class="text-[9px] text-sky-300">Rutina</span>
                </div>
                <div class="flex flex-col items-center px-3">
                  <span class="text-xs text-sky-400 font-bold">➔</span>
                  <span class="text-[8px] font-mono text-sky-400 mt-0.5">VUELO DUO</span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] font-mono text-sky-400 uppercase">DESTINO</span>
                  <div class="text-lg font-black text-white font-mono">ESC</div>
                  <span class="text-[9px] text-sky-300 truncate max-w-[90px] block">${escapeHtml(pass.name)}</span>
                </div>
              </div>

              <div class="p-2.5 bg-sky-950/40 rounded-xl border border-sky-500/20 font-mono text-[10px] grid grid-cols-3 gap-1 text-center">
                <div>
                  <span class="text-sky-400 text-[8px] block">PUERTA</span>
                  <strong class="text-white">G-04</strong>
                </div>
                <div>
                  <span class="text-sky-400 text-[8px] block">ASIENTOS</span>
                  <strong class="text-amber-300">1A & 1B</strong>
                </div>
                <div>
                  <span class="text-sky-400 text-[8px] block">CLASE</span>
                  <strong class="text-white">LOVE</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-dashed border-sky-500/30 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#38bdf8')}
                </div>
                <div class="text-right">
                  <span class="text-[9px] font-mono text-sky-300 block">${pass.date}</span>
                </div>
              </div>
            </div>
          `;
          break;

        case 'arcade-scorecard':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0a0d24] via-[#07091a] to-[#03040c] border-2 border-cyan-500/50 p-4 sm:p-5 text-cyan-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-cyan-500/30 font-mono text-[10px]">
                <span class="text-cyan-400 font-bold tracking-widest">★ DUO ARCADE & BOWLING ★</span>
                <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">100% MATCH</span>
              </div>

              <div class="my-3 flex items-center justify-between">
                <div>
                  <span class="text-[9px] font-mono text-cyan-400 uppercase">JUGADORES DUO:</span>
                  <h3 class="text-base sm:text-lg font-black text-white font-mono tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                  <p class="text-[11px] text-cyan-300 mt-0.5">${escapeHtml(pass.coupleNames)}</p>
                </div>
                <div class="px-3 py-1.5 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-300 font-mono text-xs font-black text-center">
                  STRIKE!<br><span class="text-[9px] font-normal">10/10</span>
                </div>
              </div>

              <div class="p-2.5 bg-black/60 rounded-xl border border-cyan-500/25 font-mono text-[10px] grid grid-cols-4 gap-1 text-center">
                <div class="border-r border-cyan-500/20">
                  <span class="text-neutral-500 text-[8px] block">ROUND 1</span>
                  <strong class="text-cyan-300">30</strong>
                </div>
                <div class="border-r border-cyan-500/20">
                  <span class="text-neutral-500 text-[8px] block">ROUND 2</span>
                  <strong class="text-cyan-300">60</strong>
                </div>
                <div class="border-r border-cyan-500/20">
                  <span class="text-neutral-500 text-[8px] block">SPARE</span>
                  <strong class="text-cyan-300">90</strong>
                </div>
                <div>
                  <span class="text-neutral-500 text-[8px] block">TOTAL</span>
                  <strong class="text-pink-400 font-bold">300 MAX</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-cyan-500/30 flex items-center justify-between text-[10px] font-mono">
                <span class="text-neutral-400">${pass.date}</span>
                <span class="text-cyan-400 font-bold">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'nature-permit':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0f2115] via-[#0b170e] to-[#060d08] border border-emerald-600/40 p-4 sm:p-5 text-emerald-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-emerald-500/30 font-mono text-[10px]">
                <div class="flex items-center gap-1.5 font-bold text-emerald-400">
                  <span></span>
                  <span>PERMISO OFICIAL DE EXPEDICIÓN</span>
                </div>
                <span class="text-emerald-300 font-bold">DUO NATURE</span>
              </div>

              <div class="my-3">
                <span class="text-[9px] font-mono text-emerald-400/80 uppercase">DESTINO & RUTA:</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight leading-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-[11px] text-emerald-300 mt-0.5">Exploradores: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <div class="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-500/20 font-mono text-[10px] flex items-center justify-between">
                <div>
                  <span class="text-emerald-400 text-[8px] block">COORDENADAS</span>
                  <span class="text-white font-bold">${pass.date}</span>
                </div>
                <div class="stamp-circle-seal px-2 py-1 text-emerald-300 text-[9px] font-bold">
                  VALIDADO
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-emerald-500/30 flex items-center justify-between font-mono text-[10px]">
                <span class="text-emerald-400">AIRE PURO • CITA 100%</span>
                <span class="text-neutral-400">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'wine-reserve':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#230b14] via-[#17060d] to-[#0d0307] border border-amber-600/40 p-4 sm:p-5 text-amber-100 text-left select-none">
              <div class="text-center pb-2 border-b border-amber-500/30">
                <span class="font-cinzel text-[9px] tracking-widest text-amber-400 uppercase font-bold">BODEGA & DEGUSTACIÓN SELECTA</span>
                <h3 class="font-cinzel text-lg sm:text-xl font-black text-white tracking-tight mt-0.5 truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-[10px] font-playfair italic text-amber-300/80 mt-0.5">Reserva Especial para <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <div class="my-3 flex items-center justify-between p-2.5 bg-amber-950/30 rounded-xl border border-amber-500/20">
                <div class="text-[10px] font-serif text-amber-200">
                  <div>Cata de Autor • Maridaje en Pareja</div>
                  <div class="text-amber-400/70 text-[9px] mt-0.5">${pass.date}</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-red-900 border-2 border-amber-400/80 flex items-center justify-center text-amber-300 font-serif text-xs font-black shadow-lg">
                  DUO
                </div>
              </div>

              <div class="pt-2 border-t border-amber-500/30 flex items-center justify-between font-mono text-[10px]">
                <span class="text-amber-400">SOMMELIER PASS</span>
                <span class="text-neutral-400">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'sunset-postcard':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#331826] via-[#210f19] to-[#12080e] border border-orange-400/40 p-4 sm:p-5 text-orange-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-orange-500/30 font-mono text-[10px]">
                <span class="text-orange-400 font-bold uppercase tracking-wider">POSTAL GOLDEN HOUR DUO</span>
                <span class="text-amber-300 font-bold">★ ROMÁNTICO</span>
              </div>

              <div class="my-3 flex items-center justify-between">
                <div>
                  <span class="text-[9px] font-mono text-orange-400 uppercase">MOMENTO ESPECIAL:</span>
                  <h3 class="text-base sm:text-lg font-black text-white tracking-tight leading-tight truncate">${escapeHtml(pass.name)}</h3>
                  <p class="text-[11px] font-playfair italic text-orange-200 mt-0.5">${escapeHtml(pass.coupleNames)}</p>
                </div>
                <div class="stamp-circle-seal w-12 h-12 text-orange-400 text-[8px] font-mono font-bold">
                  POSTAL<br>${pass.date.slice(0, 6)}
                </div>
              </div>

              <div class="p-2 bg-black/40 rounded-xl border border-orange-500/20 text-[10px] text-orange-200/90 italic">
                "Paseos tranquilos, atardeceres dorados y risas que quedan para siempre."
              </div>

              <div class="mt-3 pt-2 border-t border-orange-500/30 flex items-center justify-between font-mono text-[10px]">
                <span class="text-neutral-400">${pass.date}</span>
                <span class="text-orange-400 font-bold">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'gallery-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0f1014] border border-white/20 p-4 sm:p-5 text-neutral-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[10px]">
                <span class="text-neutral-400 font-bold uppercase tracking-widest font-syne">ARCHIVO CULTURAL DUO</span>
                <span class="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[9px]">SALA 01</span>
              </div>

              <div class="my-3">
                <span class="text-[9px] font-mono text-neutral-400 uppercase">EXHIBICIÓN & CITA:</span>
                <h3 class="text-base sm:text-lg font-black text-white font-syne tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-[11px] text-neutral-400 mt-0.5">Invitados de Honor: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <div class="p-2.5 bg-white/5 rounded-xl border border-white/10 font-mono text-[10px] flex items-center justify-between">
                <div>
                  <span class="text-neutral-400 text-[8px] block">Nº DE ARCHIVO</span>
                  <span class="font-bold text-white">${pass.ticketNum}</span>
                </div>
                <div class="text-right">
                  <span class="text-neutral-400 text-[8px] block">FECHA INGRESO</span>
                  <span class="text-neutral-200 font-bold">${pass.date}</span>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>ADMISIÓN LIBRE DE PAREJA</span>
                <span class="text-white font-bold">100% VALORADO</span>
              </div>
            </div>
          `;
          break;

        case 'chef-recipe':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#1f1a14] border border-amber-600/40 p-4 sm:p-5 text-amber-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-amber-500/30 font-mono text-[10px]">
                <span class="text-amber-400 font-bold uppercase"> ATELIER GASTRONÓMICO DUO</span>
                <span class="text-amber-300 font-bold">★★★ MICHELIN</span>
              </div>

              <div class="my-3">
                <span class="text-[9px] font-mono text-amber-400/80 uppercase">RECETA / MENÚ:</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-[11px] text-amber-200 mt-0.5">Chefs: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <div class="p-2.5 bg-black/40 rounded-xl border border-amber-500/20 font-mono text-[10px] space-y-1">
                <div class="flex justify-between">
                  <span class="text-neutral-400">INGREDIENTES:</span>
                  <span class="text-amber-300">Cariño, vino y buena música</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">VEREDICTO:</span>
                  <span class="text-emerald-400 font-bold">¡Delicioso! 10/10</span>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-amber-500/30 flex items-center justify-between font-mono text-[10px]">
                <span class="text-neutral-400">${pass.date}</span>
                <span class="text-amber-400 font-bold">${pass.ticketNum}</span>
              </div>
            </div>
          `;
          break;

        case 'custom-visa':
        default:
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#18181b] via-[#111113] to-[#09090b] border border-yellow-500/40 p-4 sm:p-5 text-yellow-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-yellow-500/30 font-mono text-[10px]">
                <span class="text-yellow-400 font-bold uppercase tracking-widest font-cinzel">★ PASAPORTE DUO • PRESTIGE ★</span>
                <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-bold border border-yellow-500/30">OFICIAL</span>
              </div>

              <div class="my-3">
                <span class="text-[9px] font-mono text-yellow-400/80 uppercase">PLAN EXCLUSIVO:</span>
                <h3 class="text-base sm:text-lg font-black text-white font-cinzel tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-[11px] text-yellow-200 mt-0.5">Titulares: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <div class="p-2.5 bg-yellow-950/25 rounded-xl border border-yellow-500/20 font-mono text-[10px] flex items-center justify-between">
                <div>
                  <span class="text-yellow-500 text-[8px] block">VISADO DUO</span>
                  <span class="text-white font-bold">${pass.ticketNum}</span>
                </div>
                <div class="stamp-circle-seal px-2 py-1 text-yellow-300 text-[9px] font-bold">
                  VALIDADO
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-yellow-500/30 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>MEMORIA REGISTRADA</span>
                <span class="text-yellow-400 font-bold">${pass.date}</span>
              </div>
            </div>
          `;
          break;
      }

      const backHtml = this.renderCardBack(pass, cardId, isCompact);

      return `
        <div id="${cardId}" class="duo-pass-wrapper relative w-full perspective-scene my-2 group" data-pass-json="${escapeHtml(JSON.stringify(pass))}">
          <div id="${cardId}-flipper" class="flipper-container relative w-full cursor-pointer transition-transform duration-500">
            ${frontHtml}
            ${backHtml}
          </div>

          <!-- Barra de Acciones del Pase -->
          ${!isPreview ? `
            <div class="mt-2.5 px-2 flex items-center justify-between text-xs font-semibold">
              <div class="flex items-center gap-1.5">
                <button type="button" class="btn-flip-pass py-1 px-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 hover:text-white flex items-center gap-1 transition active:scale-95 text-[11px]" data-card="${cardId}">
                  <span> Voltear</span>
                </button>
                <button type="button" class="btn-inspect-pass py-1 px-2.5 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 flex items-center gap-1 transition active:scale-95 text-[11px]" data-card="${cardId}">
                  <span> Ver 3D</span>
                </button>
              </div>

              ${options.id ? `
                <button type="button" class="btn-delete-visit p-1 text-neutral-500 hover:text-rose-400 transition" data-id="${options.id}" title="Eliminar del Diario">
                  ✕
                </button>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;
    },

    // Modal de Inspección 3D a Pantalla Completa
    openPassInspectorModal: function (pass, options) {
      if (!pass) return;
      if (!options) options = {};
      const modalId = 'modal-pass-inspector';
      const cardId = 'inspector-card';
      sound.playStamp();
      sound.vibrate([40, 30]);

      const isWinnerEmission = !!options.isWinnerEmission;

      modalContainer.innerHTML = `
        <div id="${modalId}" class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-ios-fade">
          <div class="w-full max-w-sm flex flex-col items-center">
            
            <!-- Barra Superior del Modal -->
            <div class="w-full flex items-center justify-between mb-3 text-white">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span class="text-xs font-mono font-bold tracking-wider uppercase text-amber-300">${pass.archetypeLabel}</span>
              </div>
              <button id="btn-close-pass-inspector" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center font-bold text-xs transition">
                ✕
              </button>
            </div>

            <!-- Contenedor del Pase en 3D -->
            <div class="w-full max-h-[75vh] overflow-y-auto no-scrollbar py-2">
              <div id="${cardId}" class="perspective-scene relative w-full">
                <div id="${cardId}-flipper" class="flipper-container relative w-full">
                  ${this.renderPassCard(pass, { id: 'inner-' + cardId, compact: false, isPreview: true })}
                </div>
              </div>
            </div>

            <!-- Botonera de Interacción 3D -->
            <div class="w-full mt-3 flex items-center justify-center gap-2">
              <button id="btn-modal-flip" class="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.1] hover:bg-white/[0.18] border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition active:scale-95">
                <span> Voltear Reverso</span>
              </button>

              <a href="${pass.navUrl}" target="_blank" rel="noopener noreferrer" class="py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/35 text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 transition active:scale-95">
                <span>️ Maps</span>
              </a>
            </div>

            ${isWinnerEmission ? `
              <button id="btn-save-winner-pass-diary" class="w-full mt-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 text-xs font-extrabold text-white shadow-lg shadow-rose-500/25 active:scale-98 transition flex items-center justify-center gap-2">
                <span>★ Guardar este Pase en el Diario</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;

      // Eventos del Modal
      const modalEl = document.getElementById(modalId);
      const btnClose = document.getElementById('btn-close-pass-inspector');
      if (btnClose) {
        btnClose.addEventListener('click', function () {
          modalContainer.innerHTML = '';
        });
      }

      const flipper = document.querySelector('#inspector-card .flipper-container');
      const btnModalFlip = document.getElementById('btn-modal-flip');
      if (btnModalFlip && flipper) {
        btnModalFlip.addEventListener('click', function () {
          sound.playFlip();
          sound.vibrate([25]);
          flipper.classList.toggle('flipped');
          const isFlipped = flipper.classList.contains('flipped');
          btnModalFlip.innerHTML = isFlipped ? '<span> Voltear Anverso</span>' : '<span> Voltear Reverso</span>';
        });
      }

      const btnSaveWinner = document.getElementById('btn-save-winner-pass-diary');
      if (btnSaveWinner) {
        btnSaveWinner.addEventListener('click', function () {
          addFoodVisit(pass.id, pass.name, pass.rating, pass.note, pass.photo, null, pass);
          sound.playFanfare();
          sound.vibrate([50, 50]);
          showToast('¡Pase guardado en el Diario de Pareja!');
          modalContainer.innerHTML = '';
          openDiaryModal();
        });
      }
    },

    // Enlazar Eventos de Flip y Apertura de Pases en Contenedores
    bindCardInteractions: function (container) {
      if (!container) return;

      container.querySelectorAll('.btn-flip-pass').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          const cardId = btn.dataset.card;
          const flipper = document.getElementById(cardId + '-flipper');
          if (flipper) {
            sound.playFlip();
            sound.vibrate([20]);
            flipper.classList.toggle('flipped');
          }
        });
      });

      container.querySelectorAll('.btn-inspect-pass').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          const wrapper = btn.closest('.duo-pass-wrapper');
          if (wrapper && wrapper.dataset.passJson) {
            try {
              const passData = JSON.parse(wrapper.dataset.passJson);
              DuoPassEngine.openPassInspectorModal(passData);
            } catch (err) {}
          }
        });
      });

      // Al pulsar sobre la tarjeta misma, voltear
      container.querySelectorAll('.duo-pass-wrapper').forEach(function (wrap) {
        wrap.addEventListener('click', function (e) {
          if (e.target.closest('button') || e.target.closest('a')) return;
          const flipper = wrap.querySelector('.flipper-container');
          if (flipper) {
            sound.playFlip();
            sound.vibrate([20]);
            flipper.classList.toggle('flipped');
          }
        });
      });
    }
  };
