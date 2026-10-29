  // ==========================================
  // DUO PASS ENGINE: GENERADOR Y RENDERIZADOR DE PASES UNICOS (REALIA & BESPOKE)
  // ==========================================
  const DuoPassEngine = {
    ARCHETYPES: {
      THERMAL_RECEIPT: 'thermal-receipt',
      CINEMA_TICKET: 'cinema-ticket',
      STREAMING_TICKET: 'streaming-ticket',
      AQUARIUM_PASS: 'aquarium-pass',
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
      'thermal-receipt': 'Ticket Termico de Restaurante',
      'cinema-ticket': 'Entrada Clasica de Cine & Palomitas',
      'streaming-ticket': 'Pase Sesion de Cine en Casa',
      'aquarium-pass': 'Pase Oceanico Acuario & Bioparc',
      'secret-dossier': 'Dossier de Mision Secreta',
      'spa-voucher': 'Voucher Ritual Wellness',
      'vip-backstage': 'Pase VIP Backstage Tour',
      'boarding-pass': 'Tarjeta de Embarque Oficial',
      'nature-permit': 'Permiso de Expedicion Botanica',
      'wine-reserve': 'Certificado de Reserva & Bodega',
      'arcade-scorecard': 'Scorecard Neon Arcade & Bolera',
      'sunset-postcard': 'Postal Golden Hour Atardecer',
      'gallery-pass': 'Pase Exclusivo de Galeria de Arte',
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

      // 1. Cine clasico en sala / taquilla (distinto a ver una pelicula en casa)
      if (/(cine\b|cinesa|neocine|yelmo|kinepolis|taquilla|sala 3d|imax|butaca|palacio cinematogr|cartelera)/i.test(text)) {
        return 'cinema-ticket';
      }

      // 2. Acuario / Oceanografico / Zoo / Safari marino
      if (/(acuario|aquarium|oceanogr|bioparc|faunia|delfinario|zoo|safari|vida marina|peces|tiburones)/i.test(text)) {
        return 'aquarium-pass';
      }

      // 3. Pelicula / Serie en casa / streaming (modo movies o ver en el sofa)
      if (mode === 'movies' || /(pel[ií]cula|peli|serie|estreno|filmaffinity|netflix|hbo|max|prime video|disney\+|movistar\+|filmin|sofa|palomitas|maraton de series)/i.test(text)) {
        return 'streaming-ticket';
      }

      // 4. Escape Room / Juegos de misterio / Karts / Accion
      if (/(escape|misterio|enigma|acertijo|candado|cluedo|l[aá]ser|laser tag|paintball|kart|karts|tirolina|misi[oó]n|secreto|agente|detective|investigaci[oó]n|terror|fantasma|pista secreta)/i.test(text)) {
        return 'secret-dossier';
      }

      // 5. Spa / Bienestar / Termal
      if (/(spa|termal|termas|masaje|balneario|circuito termal|sauna|jacuzzi|relax|bienestar|desconexi[oó]n|yoga|meditaci[oó]n|hidromasaje|talaso|hammam)/i.test(text)) {
        return 'spa-voucher';
      }

      // 6. Musica / Conciertos / Festivales / Teatro
      if (/(concierto|festival|m[uú]sica|directo|ac[uú]stico|dj|recital|banda|rock|pop|indie|teatro|musical|auditorio|conciertazo|fiesta|discoteca|baile)/i.test(text)) {
        return 'vip-backstage';
      }

      // 7. Viajes / Vuelos / Escapadas
      if (/(vuelo|viaje|escapada|avi[oó]n|aeropuerto|hotel|resort|tren|ave|maleta|par[ií]s|roma|londres|crucero|billete)/i.test(text)) {
        return 'boarding-pass';
      }

      // 8. Vino / Bodega / Cerveza / Degustacion
      if (/(vino|bodega|cata|sommelier|copa|barrica|degustaci[oó]n|maridaje|quesos|jam[oó]n ib[eé]rico|cerveza artesana|coctel|c[oó]ctel|vermut|ginebra)/i.test(text)) {
        return 'wine-reserve';
      }

      // 9. Bolos / Arcade / Minigolf / Recreativos
      if (/(bolera|bolos|strike|arcade|recreativos|billar|dardos|minigolf|air hockey|pinball|futbol[ií]n|gaming|recreativo)/i.test(text)) {
        return 'arcade-scorecard';
      }

      // 10. Naturaleza / Senderismo / Aire libre / Playa
      if (/(senderismo|ruta|monta[nñ]a|playa|cala|picnic|parque|naturaleza|bosque|mirador|bici|kayak|paddle|surf|acampada|trekking|camping)/i.test(text)) {
        return 'nature-permit';
      }

      // 11. Atardecer / Romantico / Estrellas / Helado
      if (/(atardecer|puesta de sol|puesta del sol|golden hour|estrellas|constelaciones|paseo rom[aá]ntico|helado|velas|rom[aá]ntico)/i.test(text)) {
        return 'sunset-postcard';
      }

      // 12. Arte / Museos / Cultura
      if (/(museo|exposici[oó]n|galer[ií]a|arte|escultura|cuadros|cer[aá]mica|alfarer[ií]a|pintura|taller creativo|historia|exhibici[oó]n)/i.test(text)) {
        return 'gallery-pass';
      }

      // 13. Cocinar en casa / Atelier
      if (/(cocinar|receta|sushi en casa|pasta casera|reposter[ií]a|tarta casera|chef|masterchef|cocinillas|hornear)/i.test(text)) {
        return 'chef-recipe';
      }

      // 14. Comida / Restaurantes (Modo food o cualquier indicio gastronomico)
      if (mode === 'food' || /(cena|comida|comer|almuerzo|desayuno|merienda|restaurante|pizza|burger|hamburguesa|popeyes|kfc|mcdonald|burger king|unica|goiko|tacos|mexicano|sushi|asi[aá]tico|italiano|chiringuito|asador|bar|tapas|poke|ramen|kebab|pollo|patatas|postre|brunch|cafeter[ií]a|marisquer[ií]a|churros|buffet)/i.test(text)) {
        return 'thermal-receipt';
      }

      // 15. Por defecto pase lifestyle prestige
      return 'custom-visa';
    },

    synthesizeDishes: function (name, note) {
      const text = ((name || '') + ' ' + (note || '')).toLowerCase();
      if (/mexican|taco|burrito|guacamole|nacho/i.test(text)) {
        return [
          { qty: '2x', name: 'Tacos al Pastor Especial de la Casa', price: '13.50 EUR' },
          { qty: '1x', name: 'Totopos con Guacamole Fresco y Queso', price: '7.80 EUR' },
          { qty: '2x', name: 'Margaritas Frozen de Lima', price: '12.00 EUR' }
        ];
      }
      if (/italian|pizza|pasta|lasa|trattoria/i.test(text)) {
        return [
          { qty: '1x', name: 'Pizza Artesanal al Horno de Lena', price: '14.90 EUR' },
          { qty: '1x', name: 'Pasta Fresca al Tartufo con Parmigiano', price: '15.50 EUR' },
          { qty: '1x', name: 'Tiramisu Tradizionale Fatto in Casa', price: '6.20 EUR' },
          { qty: '2x', name: 'Calice di Vino Chianti', price: '7.00 EUR' }
        ];
      }
      if (/sushi|japon|asia|ramen|gyoza|poke/i.test(text)) {
        return [
          { qty: '1x', name: 'Variado Especial Nigiris & Uramakis (16 pz)', price: '19.50 EUR' },
          { qty: '1x', name: 'Gyozas Crujientes de Langostino y Verduras', price: '6.80 EUR' },
          { qty: '2x', name: 'Mochis Artesanales de Te Matcha y Fresa', price: '5.50 EUR' }
        ];
      }
      if (/burger|hamburgues|smash/i.test(text)) {
        return [
          { qty: '2x', name: 'Duo Burger Gourmet Doble Carne con Queso Ahumado', price: '18.90 EUR' },
          { qty: '1x', name: 'Patatas Rusticas con Salsa Trufada', price: '4.90 EUR' },
          { qty: '2x', name: 'Bebidas Grandes Refill', price: '5.60 EUR' }
        ];
      }
      if (/tapas|bar|taberna|ca[nñ]as/i.test(text)) {
        return [
          { qty: '1x', name: 'Tabla de Jamon Iberico de Bellota y Queso Curado', price: '16.50 EUR' },
          { qty: '1x', name: 'Patatas Bravas con Alioli Casero', price: '5.20 EUR' },
          { qty: '2x', name: 'Canyas Dobles Bien Tiradas', price: '5.00 EUR' }
        ];
      }
      // General comida
      return [
        { qty: '2x', name: 'Menu Degustacion Especial para Dos', price: '24.00 EUR' },
        { qty: '1x', name: 'Racion Especial de la Casa', price: '8.50 EUR' },
        { qty: '2x', name: 'Bebidas Refrescantes', price: '5.00 EUR' }
      ];
    },

    generatePassData: function (item) {
      if (!item) item = {};
      const name = item.name || item.restaurantName || 'Plan Especial';
      const note = item.note || '';
      const mode = item.mode || (typeof state !== 'undefined' ? state.activeMode : 'food') || 'food';
      const id = item.id || item.restaurantId || ('custom-' + Date.now());
      const p1 = item.p1Name || (typeof state !== 'undefined' ? state.player1Name : 'Miguel') || 'Miguel';
      const p2 = item.p2Name || (typeof state !== 'undefined' ? state.player2Name : 'Patri') || 'Patri';
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

      // Coincidencias de catalogo oficial
      if (lowerId.includes('popeyes') || lowerName.includes('popeyes')) {
        archetype = 'thermal-receipt';
        brandLogo = './popeyes.png';
        venueAddress = 'CC ESPACIO MEDITERRANEO - LOCAL B-14, CARTAGENA';
        navQuery = 'Popeyes CC Espacio Mediterraneo Cartagena';
        dishes = [
          { qty: '2x', name: 'The Chicken Sandwich (12h marinado cajun)', price: '13.80 EUR' },
          { qty: '1x', name: 'Patatas Cajun Grandes', price: '3.60 EUR' },
          { qty: '4x', name: 'Tenders Crujientes Louisiana', price: '5.90 EUR' },
          { qty: '2x', name: 'Refresco Refill Ilimitado', price: '5.40 EUR' }
        ];
      } else if (lowerId.includes('unica') || lowerName.includes('unica')) {
        archetype = 'thermal-receipt';
        brandLogo = './unica.png';
        venueAddress = 'CASCO HISTORICO - CALLE MAYOR, CARTAGENA';
        navQuery = 'Unica Smash Burgers Cartagena';
        dishes = [
          { qty: '2x', name: 'Smash Burger Doble Bacon Trufada', price: '17.90 EUR' },
          { qty: '1x', name: 'Patatas Especiales Queso Ahumado', price: '4.80 EUR' },
          { qty: '2x', name: 'Bebidas Artesanales', price: '6.00 EUR' }
        ];
      } else if (lowerId.includes('kfc') || lowerName.includes('kfc')) {
        archetype = 'thermal-receipt';
        brandLogo = './kfc.png';
        venueAddress = 'CC MANDARACHE - RONDA CIUDAD DE LA UNION, CARTAGENA';
        navQuery = 'KFC Mandarache Cartagena';
        dishes = [
          { qty: '1x', name: 'Cubo Receta Original 8 Piezas', price: '15.99 EUR' },
          { qty: '2x', name: 'Patatas Clasicas Grandes', price: '5.50 EUR' },
          { qty: '2x', name: 'Refresco Grande', price: '5.20 EUR' }
        ];
      } else if (lowerId.includes('mcdonald') || lowerName.includes('mcdonald')) {
        archetype = 'thermal-receipt';
        brandLogo = './mcdonalds.png';
        venueAddress = 'ESPACIO MEDITERRANEO / PUERTO DE CARTAGENA';
        navQuery = 'McDonalds Cartagena';
        dishes = [
          { qty: '2x', name: 'Menu Big Mac con Patatas Deluxe', price: '18.40 EUR' },
          { qty: '9x', name: 'McNuggets con Salsa Barbacoa', price: '5.90 EUR' },
          { qty: '2x', name: 'McFlurry Lotus Biscoff', price: '6.20 EUR' }
        ];
      } else if (lowerId.includes('burger_king') || lowerName.includes('burger king')) {
        archetype = 'thermal-receipt';
        brandLogo = './burger_king.png';
        venueAddress = 'AVDA. TITO DIDIO / CC MANDARACHE, CARTAGENA';
        navQuery = 'Burger King Cartagena';
        dishes = [
          { qty: '2x', name: 'Menu Whopper Doble a la Parrilla', price: '19.20 EUR' },
          { qty: '1x', name: 'Aros de Cebolla Crujientes', price: '4.20 EUR' },
          { qty: '2x', name: 'King Fusion Oreo', price: '6.00 EUR' }
        ];
      } else if (lowerId.includes('telepizza') || lowerName.includes('telepizza')) {
        archetype = 'thermal-receipt';
        brandLogo = './telepizza.png';
        venueAddress = 'CALLE ALFONSO X EL SABIO, CARTAGENA';
        navQuery = 'Telepizza Cartagena';
        dishes = [
          { qty: '1x', name: 'Pizza Mediana Barbacoa Gourmet', price: '15.95 EUR' },
          { qty: '1x', name: 'Pizza Mediana Carbonara Masa Fina', price: '14.95 EUR' },
          { qty: '1x', name: 'Pizzolinos Ajo y Queso', price: '4.50 EUR' }
        ];
      } else if (lowerId.includes('kebab') || lowerName.includes('kebab')) {
        archetype = 'thermal-receipt';
        brandLogo = './kebab.png';
        venueAddress = 'CALLE DEL CARMEN / PUERTO, CARTAGENA';
        dishes = [
          { qty: '2x', name: 'Durum Mixto con Salsa Blanca y Picante', price: '14.00 EUR' },
          { qty: '1x', name: 'Patatas Especiadas Orientales', price: '3.50 EUR' },
          { qty: '2x', name: 'Bebidas Frias Refrescantes', price: '4.00 EUR' }
        ];
      } else if (lowerId === 'plan-cine' || /cinesa|neocine|cine\b/i.test(name)) {
        archetype = 'cinema-ticket';
        venueAddress = 'Neocine Mandarache - Sala 04';
      } else if (archetype === 'aquarium-pass' || lowerId.includes('acuario') || lowerName.includes('acuario')) {
        archetype = 'aquarium-pass';
        venueAddress = 'Oceanic Marine World - Tunel de Tiburones';
      } else if (lowerId === 'plan-escape-room') {
        archetype = 'secret-dossier';
        venueAddress = 'Mystery Lab Centro - Sala Enigma';
      } else if (lowerId === 'plan-spa') {
        archetype = 'spa-voucher';
        venueAddress = 'Talaso Spa Marino & Aguas Termales';
      } else if (lowerId === 'plan-concierto') {
        archetype = 'vip-backstage';
        venueAddress = 'Auditorio y Sala de Conciertos';
      } else if (lowerId === 'plan-bolera') {
        archetype = 'arcade-scorecard';
        venueAddress = 'Bowling Espacio Mediterraneo';
      } else if (lowerId === 'plan-cata-vinos') {
        archetype = 'wine-reserve';
        venueAddress = 'Taberna y Bodega Selecta';
      } else if (lowerId === 'plan-picnic' || lowerId === 'plan-senderismo') {
        archetype = 'nature-permit';
        venueAddress = 'Parque Natural / Mirador Panoramico';
      } else if (lowerId === 'plan-paseo-helado') {
        archetype = 'sunset-postcard';
        venueAddress = 'Puerto y Paseo Maritimo';
      } else if (lowerId === 'plan-museo') {
        archetype = 'gallery-pass';
        venueAddress = 'Museo Teatro Romano / Galeria de Arte';
      } else if (lowerId === 'plan-cocinar-juntos') {
        archetype = 'chef-recipe';
        venueAddress = 'Cocina Atelier en Casa';
      } else if (archetype === 'thermal-receipt' && !dishes) {
        dishes = this.synthesizeDishes(name, note);
      }

      const archetypeLabel = this.LABELS[archetype] || 'Pase Unico Duo';

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

    // Generador SVG del Codigo de Barras
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
          <rect x="99" y="0" width="1" height="36" />
          <rect x="103" y="0" width="3" height="36" />
          <rect x="109" y="0" width="4" height="36" />
          <rect x="116" y="0" width="2" height="36" />
          <rect x="120" y="0" width="1" height="36" />
          <rect x="124" y="0" width="4" height="36" />
          <rect x="131" y="0" width="2" height="36" />
          <rect x="135" y="0" width="5" height="36" />
          <rect x="143" y="0" width="2" height="36" />
          <rect x="147" y="0" width="4" height="36" />
          <rect x="154" y="0" width="1" height="36" />
          <rect x="157" y="0" width="3" height="36" />
        </svg>
      `;
    },

    // Generador SVG del Borde Dentado (Sawtooth)
    getSawtoothSvg: function () {
      return `
        <svg viewBox="0 0 200 8" preserveAspectRatio="none" class="w-full h-full fill-white/95">
          <polygon points="0,0 5,8 10,0 15,8 20,0 25,8 30,0 35,8 40,0 45,8 50,0 55,8 60,0 65,8 70,0 75,8 80,0 85,8 90,0 95,8 100,0 105,8 110,0 115,8 120,0 125,8 130,0 135,8 140,0 145,8 150,0 155,8 160,0 165,8 170,0 175,8 180,0 185,8 190,0 195,8 200,0" />
        </svg>
      `;
    },

    // Generador SVG del Escudo Oficial de Duo
    getShieldSvg: function (color) {
      const c = color || '#f59e0b';
      return `
        <svg viewBox="0 0 24 24" class="w-5 h-5 inline-block fill-none stroke-current" style="color: ${c};" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4" stroke-width="2.5"/>
        </svg>
      `;
    },

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
                  ${pass.brandLogo ? `<img src="${pass.brandLogo}" class="w-7 h-7 object-contain filter grayscale contrast-125" alt="Logo">` : '<span class="font-bold text-xs uppercase px-2 py-0.5 rounded bg-neutral-200">GASTRO</span>'}
                  <h3 class="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900 uppercase">${escapeHtml(pass.name)}</h3>
                </div>
                <p class="text-[9px] text-neutral-600 leading-tight uppercase font-medium">
                  ${escapeHtml(pass.venueAddress)}<br>
                  NIF: B-88291048 - TEL: 968 00 24 12
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
                  <span>CANT / ARTICULO</span>
                  <span>TOTAL</span>
                </div>
                ${(pass.dishes || [
                  { qty: '2x', name: 'Plato Especial de la Casa', price: '18.50 EUR' },
                  { qty: '1x', name: 'Guarnicion Especial Duo', price: '4.50 EUR' },
                  { qty: '2x', name: 'Bebidas de Pareja', price: '5.00 EUR' }
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
                  <span>28.00 EUR</span>
                </div>
                <div class="flex justify-between font-bold text-emerald-800 bg-emerald-100/60 px-1 py-0.5 rounded">
                  <span>DESCUENTO DUO LOVE (100%):</span>
                  <span>-100%</span>
                </div>
                <div class="flex justify-between font-extrabold text-neutral-950 text-xs sm:text-sm pt-1">
                  <span>TOTAL A PAGAR:</span>
                  <span>0.00 EUR</span>
                </div>
              </div>

              <!-- Sello de Caucho Rojo Pagado -->
              <div class="py-3 text-center">
                <div class="stamp-paid-red text-xs sm:text-sm">
                  PAGADO EN DUO
                </div>
                <div class="text-[9px] text-neutral-500 mt-1 uppercase font-semibold tracking-wider">
                  ${pass.date} - MATCH COMPARTIDO AL 100%
                </div>
              </div>

              <!-- Codigo de Barras Termico -->
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
                  <p class="font-cinzel text-[9px] tracking-[0.25em] text-amber-400 uppercase font-bold">CINEMA TAQUILLA & SALA GRAND</p>
                  <h2 class="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-sm mt-0.5">ADMIT TWO</h2>
                  <p class="text-[10px] font-playfair italic text-amber-300/90 mt-0.5">Entrada de Cine para <strong class="font-bold text-amber-100">${escapeHtml(pass.coupleNames)}</strong></p>
                </div>

                <div class="py-3 space-y-2">
                  <div class="flex items-center justify-between text-[11px] font-mono text-amber-300 px-2.5 py-1 bg-amber-950/40 rounded border border-amber-500/20">
                    <span>SALA: <strong class="text-amber-100 font-sans">04 VIP</strong></span>
                    <span>FILA: <strong class="text-amber-100 font-sans">07</strong></span>
                    <span>BUTACAS: <strong class="text-amber-100 font-sans">1A & 1B</strong></span>
                  </div>
                  <div>
                    <span class="text-[9px] font-cinzel text-amber-400/80 uppercase block">PELICULA / CARTELERA:</span>
                    <h3 class="text-base sm:text-lg font-black text-white font-cinzel tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                  </div>
                  <div class="flex justify-between items-center text-[10px] text-amber-200/80 pt-1">
                    <span>${pass.date}</span>
                    <span class="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 font-mono text-[9px] text-amber-300">PALOMITAS & BUTACAS DUO</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-dashed border-amber-500/30 flex items-center justify-between">
                  <div class="w-32">
                    ${this.getBarcodeSvg('#f59e0b')}
                  </div>
                  <div class="stamp-circle-seal w-12 h-12 text-rose-400 text-[8px] font-bold tracking-tighter">
                    CANJEADO<br>TAQUILLA
                  </div>
                </div>
              </div>
            </div>
          `;
          break;

        case 'streaming-ticket':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0c0f1d] via-[#141026] to-[#0a0715] border border-indigo-500/40 text-indigo-100 p-4 sm:p-5 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-indigo-500/25">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span class="font-mono text-[10px] font-extrabold tracking-wider text-indigo-300 uppercase">SESION STREAMING EN CASA</span>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">SOFA & PALOMITAS</span>
              </div>

              <div class="my-3 space-y-1">
                <span class="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">PELICULA O SERIE</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-indigo-300 font-medium">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="p-2.5 bg-black/50 rounded-xl border border-indigo-500/20 font-mono text-[10px] grid grid-cols-3 gap-1 text-center">
                <div>
                  <span class="text-neutral-500 text-[8px] block">MODO</span>
                  <strong class="text-white">SOFA VIP</strong>
                </div>
                <div>
                  <span class="text-neutral-500 text-[8px] block">PALOMITAS</span>
                  <strong class="text-amber-300">EXTRA</strong>
                </div>
                <div>
                  <span class="text-neutral-500 text-[8px] block">CALIDAD</span>
                  <strong class="text-indigo-400">4K HDR</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-dashed border-indigo-500/30 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#818cf8')}
                </div>
                <div class="text-right">
                  <span class="text-[9px] font-mono text-indigo-300 block">${pass.date}</span>
                </div>
              </div>
            </div>
          `;
          break;

        case 'aquarium-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#021f2d] via-[#053b52] to-[#01141f] border border-cyan-400/40 text-cyan-100 p-4 sm:p-5 aquarium-notched-edges text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-cyan-400/30">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span class="font-mono text-[10px] font-black tracking-widest text-cyan-300 uppercase">OCEANIC AQUARIUM EXPEDITION</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-200 text-[9px] font-mono font-bold border border-cyan-500/30">TUNEL MARINO</span>
              </div>

              <div class="my-3 space-y-1">
                <span class="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">PASE DE ACCESO TOTAL</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-cyan-200">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-400/25 font-mono text-[10px] grid grid-cols-3 gap-1 text-center">
                <div>
                  <span class="text-cyan-400/70 text-[8px] block">ZONA</span>
                  <strong class="text-white">TIBURONES</strong>
                </div>
                <div>
                  <span class="text-cyan-400/70 text-[8px] block">ENTRADAS</span>
                  <strong class="text-amber-300">2x ADULTO</strong>
                </div>
                <div>
                  <span class="text-cyan-400/70 text-[8px] block">ACCESO</span>
                  <strong class="text-cyan-300">PRIORITARIO</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-dashed border-cyan-400/30 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#22d3ee')}
                </div>
                <div class="stamp-circle-seal w-12 h-12 text-cyan-300 text-[8px] font-bold tracking-tighter">
                  AQUARIUM<br>VALIDADO
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
                  <span class="text-zinc-500">AGENTES ASIGNADOS:</span>
                  <strong class="text-zinc-200 uppercase">${escapeHtml(pass.coupleNames)}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-500">UBICACION OBJETIVO:</span>
                  <strong class="text-red-400 truncate max-w-[140px]">${escapeHtml(pass.venueAddress)}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-500">ESTADO OPERACION:</span>
                  <span class="text-emerald-400 font-bold">AUTORIZADA</span>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-zinc-700 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                <span>DOC REF: ${pass.ticketNum}</span>
                <span>FECHA: ${pass.date}</span>
              </div>
            </div>
          `;
          break;

        case 'spa-voucher':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#1b2320] via-[#121816] to-[#0c100e] border border-emerald-500/40 p-4 sm:p-5 text-emerald-100 text-left select-none">
              <div class="text-center pb-2 border-b border-emerald-500/20">
                <div class="flex items-center justify-center gap-1.5 text-emerald-400 font-playfair italic text-xs mb-0.5">
                  <span>RITUAL DE BIENESTAR & CALMA</span>
                </div>
                <h3 class="text-base sm:text-xl font-bold font-playfair tracking-wide text-white uppercase">${escapeHtml(pass.name)}</h3>
                <p class="text-[10px] font-sans text-emerald-300/80 mt-0.5">Voucher Exclusivo para Dos Personas</p>
              </div>

              <div class="my-3 py-2 px-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-center">
                <p class="text-[9px] font-sans text-emerald-400 uppercase tracking-widest font-semibold">INVITADOS DE HONOR</p>
                <p class="text-sm font-bold text-white font-playfair mt-0.5">${escapeHtml(pass.coupleNames)}</p>
                <div class="text-[10px] text-emerald-300/70 mt-1 flex justify-center gap-3">
                  <span>Circuito Termal</span>
                  <span>-</span>
                  <span>Aromaterapia</span>
                  <span>-</span>
                  <span>Desconexion</span>
                </div>
              </div>

              <div class="pt-2 border-t border-dashed border-emerald-500/25 flex items-center justify-between text-[10px]">
                <span class="font-mono text-emerald-400/80">${pass.ticketNum}</span>
                <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[9px]">CONFIRMADO</span>
              </div>
            </div>
          `;
          break;

        case 'vip-backstage':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0d0b14] border-2 border-purple-500/60 p-4 sm:p-5 text-purple-100 text-left select-none">
              <div class="w-8 h-2.5 bg-neutral-800 rounded-full mx-auto -mt-2 mb-2 border border-purple-500/40"></div>

              <div class="flex items-center justify-between pb-2 border-b border-purple-500/30 font-mono text-[10px]">
                <span class="text-purple-400 font-black tracking-widest">WORLD TOUR LIVE</span>
                <span class="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 font-bold border border-purple-500/40">ALL ACCESS</span>
              </div>

              <div class="my-3 text-center">
                <h3 class="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 uppercase tracking-tight">${escapeHtml(pass.name)}</h3>
                <div class="inline-block px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold mt-1">
                  PASE VIP DUO: ${escapeHtml(pass.coupleNames)}
                </div>
              </div>

              <div class="p-2.5 bg-purple-950/30 rounded-xl border border-purple-500/20 font-mono text-[10px] grid grid-cols-3 gap-1 text-center">
                <div>
                  <span class="text-purple-400 text-[8px] block">ACCESO</span>
                  <strong class="text-white">FRONT ROW</strong>
                </div>
                <div>
                  <span class="text-purple-400 text-[8px] block">ZONA</span>
                  <strong class="text-pink-300">GOLDEN RING</strong>
                </div>
                <div>
                  <span class="text-purple-400 text-[8px] block">PASES</span>
                  <strong class="text-white">2x VIP</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-purple-500/30 flex items-center justify-between">
                <div class="w-28">
                  ${this.getBarcodeSvg('#c084fc')}
                </div>
                <div class="text-right font-mono text-[9px] text-purple-400">
                  <span>${pass.date}</span>
                </div>
              </div>
            </div>
          `;
          break;

        case 'boarding-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0b1d33] via-[#081524] to-[#040a12] border border-sky-500/35 p-4 sm:p-5 text-sky-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-sky-500/30 font-mono text-[10px]">
                <div class="flex items-center gap-1.5 font-bold text-white">
                  <span>DUO AIRLINES - FIRST CLASS</span>
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
                  <span class="text-xs text-sky-400 font-bold">VUELO</span>
                  <span class="text-[8px] font-mono text-sky-400 mt-0.5">DUO-001</span>
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
                <span class="text-cyan-400 font-bold tracking-widest">DUO ARCADE & BOWLING</span>
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
                <span class="text-cyan-300 font-bold">PLAYER 1 & PLAYER 2 CO-OP</span>
              </div>
            </div>
          `;
          break;

        case 'nature-permit':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#131b14] border-2 border-emerald-700/60 p-4 sm:p-5 text-emerald-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-emerald-700/50">
                <span class="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">PARQUES NATURALES & RUTAS</span>
                <span class="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">PERMISO OFICIAL</span>
              </div>

              <div class="my-3 space-y-1">
                <span class="text-[9px] font-mono text-emerald-400/80 uppercase">EXPEDICION DE SENDERISMO</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-emerald-300 font-medium">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="p-2.5 bg-black/40 rounded-xl border border-emerald-800/60 text-[10px] font-mono space-y-1">
                <div class="flex justify-between">
                  <span class="text-emerald-500">UBICACION:</span>
                  <strong class="text-emerald-200 truncate max-w-[150px]">${escapeHtml(pass.venueAddress)}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-500">AUTORIZACION:</span>
                  <strong class="text-amber-300">RUTA & PICNIC DUO</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-emerald-700/40 flex items-center justify-between text-[10px]">
                <span class="font-mono text-emerald-400">${pass.date}</span>
                <div class="stamp-circle-seal w-11 h-11 text-emerald-400 text-[8px] font-bold">
                  ECO<br>PARK
                </div>
              </div>
            </div>
          `;
          break;

        case 'wine-reserve':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#1a0f14] via-[#12080c] to-[#0a0407] border border-amber-600/40 p-4 sm:p-5 text-amber-100 text-left select-none">
              <div class="text-center pb-2 border-b border-amber-600/30 font-serif">
                <p class="text-[9px] tracking-[0.25em] text-amber-400 uppercase font-semibold">RESERVA PRIVADA & BODEGA</p>
                <h3 class="text-base sm:text-xl font-bold text-white mt-0.5 tracking-wide">${escapeHtml(pass.name)}</h3>
                <p class="text-[10px] italic text-amber-300/80 mt-0.5">Certificado de Degustacion & Maridaje</p>
              </div>

              <div class="my-3 py-2 px-3 rounded-xl bg-amber-950/30 border border-amber-600/25 text-center font-serif">
                <p class="text-[9px] text-amber-400 uppercase tracking-widest font-sans font-bold">TITULARES DE LA CATA</p>
                <p class="text-sm font-bold text-white mt-0.5">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="pt-2 border-t border-dashed border-amber-600/30 flex items-center justify-between text-[10px] font-mono">
                <span class="text-amber-400">${pass.date}</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">COSECHA ESPECIAL</span>
              </div>
            </div>
          `;
          break;

        case 'sunset-postcard':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#2a1320] via-[#1e0f18] to-[#120a14] border border-pink-500/40 p-4 sm:p-5 text-pink-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-pink-500/30">
                <span class="text-[9px] font-bold text-pink-300 uppercase tracking-widest">GOLDEN HOUR & MOMENTO DUO</span>
                <span class="text-[9px] font-bold text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">ROMANTICO</span>
              </div>

              <div class="my-3 space-y-1">
                <span class="text-[9px] text-pink-400/80 uppercase block">RECUERDO AL ATARDECER</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-pink-200 font-medium">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="p-2.5 bg-black/40 rounded-xl border border-pink-500/20 text-[10px] space-y-1">
                <p class="italic text-pink-100 text-xs leading-relaxed">"Un momento compartido para detener el tiempo juntos."</p>
              </div>

              <div class="mt-3 pt-2 border-t border-pink-500/30 flex items-center justify-between text-[10px]">
                <span class="font-mono text-pink-300">${pass.date}</span>
                <div class="stamp-circle-seal w-11 h-11 text-pink-300 text-[8px] font-bold">
                  GOLDEN<br>HOUR
                </div>
              </div>
            </div>
          `;
          break;

        case 'gallery-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0f1118] border border-white/20 p-4 sm:p-5 text-neutral-200 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[9px]">
                <span class="text-white font-bold tracking-widest">EXPOSICION CULTURAL</span>
                <span class="text-neutral-400">${pass.ticketNum}</span>
              </div>

              <div class="my-3 space-y-1">
                <span class="text-[9px] font-mono text-neutral-400 uppercase">PASE DE GALERIA & MUSEO</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-neutral-300">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="p-2.5 bg-white/[0.04] rounded-xl border border-white/10 font-mono text-[10px] space-y-1">
                <div class="flex justify-between">
                  <span class="text-neutral-500">UBICACION:</span>
                  <strong class="text-white truncate max-w-[150px]">${escapeHtml(pass.venueAddress)}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-500">ACCESO:</span>
                  <strong class="text-amber-300">COLECCION PRIVADA</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#9ca3af')}
                </div>
                <span class="font-mono text-[10px] text-neutral-400">${pass.date}</span>
              </div>
            </div>
          `;
          break;

        case 'chef-recipe':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#1b1915] border border-amber-600/30 p-4 sm:p-5 text-amber-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-amber-600/30 font-mono text-[10px]">
                <span class="text-amber-400 font-bold uppercase tracking-widest">ATELIER CULINARIO EN CASA</span>
                <span class="text-amber-300 font-bold">CHEF DUO</span>
              </div>

              <div class="my-3 space-y-1">
                <span class="text-[9px] font-mono text-amber-400/80 uppercase">COMANDA GASTRONOMICA</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-amber-200">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="p-2.5 bg-black/40 rounded-xl border border-amber-600/20 text-[10px] font-mono space-y-1">
                <p class="text-neutral-300">Preparado con carino a cuatro manos.</p>
              </div>

              <div class="mt-3 pt-2 border-t border-amber-600/30 flex items-center justify-between text-[10px]">
                <span class="font-mono text-amber-400">${pass.date}</span>
                <div class="stamp-circle-seal w-11 h-11 text-amber-400 text-[8px] font-bold">
                  CHEF<br>HOMEMADE
                </div>
              </div>
            </div>
          `;
          break;

        case 'custom-visa':
        default:
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#121422] via-[#0d0e18] to-[#07080f] border-2 border-amber-500/40 p-4 sm:p-5 text-amber-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-amber-500/30">
                <div class="flex items-center gap-1.5 font-bold text-xs text-amber-400">
                  ${this.getShieldSvg('#f59e0b')}
                  <span class="font-cinzel tracking-wider">PASAPORTE DUO PRESTIGE</span>
                </div>
                <span class="font-mono text-[10px] font-bold text-amber-300">${pass.ticketNum}</span>
              </div>

              <div class="my-3 space-y-1">
                <span class="text-[9px] font-mono text-amber-400/80 uppercase">EXPERIENCIA AUTORIZADA</span>
                <h3 class="text-base sm:text-lg font-black text-white tracking-tight truncate">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-amber-200">${escapeHtml(pass.coupleNames)}</p>
              </div>

              <div class="p-2.5 bg-black/40 rounded-xl border border-amber-500/20 font-mono text-[10px] grid grid-cols-2 gap-2">
                <div>
                  <span class="text-amber-500 text-[8px] block">UBICACION</span>
                  <strong class="text-white truncate block">${escapeHtml(pass.venueAddress)}</strong>
                </div>
                <div>
                  <span class="text-amber-500 text-[8px] block">ESTADO</span>
                  <strong class="text-emerald-400">APROBADO DUO</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-dashed border-amber-500/30 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#f59e0b')}
                </div>
                <div class="stamp-circle-seal w-12 h-12 text-amber-400 text-[8px] font-bold">
                  PASAPORTE<br>OFICIAL
                </div>
              </div>
            </div>
          `;
          break;
      }

      // REVERSO EN 3D (RECUERDO, VALORACION Y NOTA DE PAREJA)
      const starsDisplay = (pass.rating || 5) + ' / 5 estrellas';

      const backHtml = `
        <div class="card-face card-back relative w-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/20 p-4 sm:p-5 text-white text-left flex flex-col justify-between select-none">
          <div>
            <div class="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span class="font-bold text-amber-400 uppercase tracking-wider text-[10px]">DIARIO DE PAREJA</span>
              <span class="text-neutral-400 font-mono text-[10px]">${pass.date}</span>
            </div>

            <div class="my-3">
              <div class="text-[10px] text-neutral-400 uppercase">VALORACION:</div>
              <div class="text-sm font-bold text-amber-400 mt-0.5">${starsDisplay}</div>
            </div>

            ${pass.photo ? `
              <div class="my-2 w-full h-28 rounded-xl overflow-hidden border border-white/15 shadow-md">
                <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo">
              </div>
            ` : ''}

            <div class="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-300 leading-relaxed italic">
              "${escapeHtml(pass.note || 'Cita memorable guardada en nuestro historial de momentos especiales.')}"
            </div>
          </div>

          <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
            <span>PASE: ${pass.ticketNum}</span>
            <span class="text-rose-400 font-bold">${escapeHtml(pass.coupleNames)}</span>
          </div>
        </div>
      `;

      if (isPreview) {
        return `
          <div class="duo-pass-wrapper relative w-full max-w-sm mx-auto" data-pass-json="${escapeHtml(JSON.stringify(pass))}">
            ${frontHtml}
            ${backHtml}
          </div>
        `;
      }

      // Version embebida para listas o pasaporte con flip interactivo
      return `
        <div class="duo-pass-wrapper relative w-full max-w-sm mx-auto my-2" data-pass-json="${escapeHtml(JSON.stringify(pass))}">
          <div id="${cardId}" class="perspective-scene relative w-full">
            <div id="${cardId}-flipper" class="flipper-container relative w-full cursor-pointer">
              ${frontHtml}
              ${backHtml}
            </div>
          </div>
          
          <div class="mt-1.5 flex items-center justify-between px-1 text-[11px] text-neutral-400">
            <span class="text-[10px] font-mono text-neutral-500">${pass.archetypeLabel}</span>
            <div class="flex items-center gap-2">
              <button type="button" class="btn-flip-pass text-neutral-400 hover:text-white font-semibold transition" data-card="${cardId}">
                Voltear
              </button>
              <button type="button" class="btn-inspect-pass text-amber-400 hover:text-amber-300 font-bold transition">
                Ampliar
              </button>
            </div>
          </div>
        </div>
      `;
    },

    openPassInspectorModal: function (pass, options) {
      if (!pass) return;
      const isWinnerEmission = !!(options && options.isWinnerEmission);
      const modalId = 'pass-inspector-modal';
      const cardId = 'inspector-card';

      modalContainer.innerHTML = `
        <div id="${modalId}" class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-ios-slide">
          <div class="bg-neutral-950 border border-white/15 w-full max-w-sm rounded-[32px] p-4 flex flex-col items-center overflow-hidden shadow-2xl relative">
            
            <!-- Header Modal -->
            <div class="w-full flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span class="text-xs font-bold text-white uppercase tracking-wider font-mono">${pass.archetypeLabel}</span>
              </div>
              <button id="btn-close-pass-inspector" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center font-bold text-xs transition">
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

            <!-- Botonera de Interaccion 3D -->
            <div class="w-full mt-3 flex items-center justify-center gap-2">
              <button id="btn-modal-flip" class="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.1] hover:bg-white/[0.18] border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition active:scale-95">
                <span>Voltear Reverso</span>
              </button>

              <a href="${pass.navUrl}" target="_blank" rel="noopener noreferrer" class="py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/35 text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 transition active:scale-95">
                <span>Maps</span>
              </a>
            </div>

            ${isWinnerEmission ? `
              <button id="btn-save-winner-pass-diary" class="w-full mt-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 text-xs font-extrabold text-white shadow-lg shadow-rose-500/25 active:scale-98 transition flex items-center justify-center gap-2">
                <span>Guardar este Pase en el Diario</span>
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
          btnModalFlip.innerHTML = isFlipped ? '<span>Voltear Anverso</span>' : '<span>Voltear Reverso</span>';
        });
      }

      const btnSaveWinner = document.getElementById('btn-save-winner-pass-diary');
      if (btnSaveWinner) {
        btnSaveWinner.addEventListener('click', function () {
          addFoodVisit(pass.id, pass.name, pass.rating, pass.note, pass.photo, null, pass);
          sound.playFanfare();
          sound.vibrate([50, 50]);
          showToast('Pase guardado en el Diario de Pareja');
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
