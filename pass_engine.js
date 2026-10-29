  // ==========================================
  // DUO PASS ENGINE: GENERADOR Y RENDERIZADOR DE PASES UNICOS (REALIA & BESPOKE LUXURY)
  // ==========================================
  const DuoPassEngine = {
    ARCHETYPES: {
      THERMAL_RECEIPT: 'thermal-receipt',
      CINEMA_TICKET: 'cinema-ticket',
      STREAMING_TICKET: 'streaming-ticket',
      AQUARIUM_PASS: 'aquarium-pass',
      VIP_BACKSTAGE: 'vip-backstage',
      SECRET_DOSSIER: 'secret-dossier',
      SPA_VOUCHER: 'spa-voucher',
      BOARDING_PASS: 'boarding-pass',
      ARCADE_SCORECARD: 'arcade-scorecard',
      WINE_RESERVE: 'wine-reserve',
      NATURE_PERMIT: 'nature-permit',
      SUNSET_POSTCARD: 'sunset-postcard',
      GALLERY_PASS: 'gallery-pass',
      CHEF_RECIPE: 'chef-recipe',
      CUSTOM_VISA: 'custom-visa'
    },

    LABELS: {
      'thermal-receipt': 'Ticket Termico de Restaurante',
      'cinema-ticket': 'Entrada Golden Marquee de Cine VIP',
      'streaming-ticket': 'Pase Sesion de Cine en Sofa',
      'aquarium-pass': 'Expedicion Tunel Marino & Acuario',
      'vip-backstage': 'Credencial VIP Access All Areas',
      'secret-dossier': 'Expediente Clasificado Top Secret',
      'spa-voucher': 'Ritual Termal Zen & Hidromasaje',
      'boarding-pass': 'Tarjeta de Embarque First Class',
      'arcade-scorecard': 'Scorecard Neon Arcade & Bowling 1984',
      'wine-reserve': 'Certificado Cata & Lacre Real',
      'nature-permit': 'Permiso Expedicion Botanica',
      'sunset-postcard': 'Postal Golden Hour al Atardecer',
      'gallery-pass': 'Pase Exclusivo Galeria de Arte',
      'chef-recipe': 'Comanda Atelier de Cocina',
      'custom-visa': 'Pasaporte Oficial Prestige Duo'
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

      // 1. Cine clasico en sala / cartelera / palomitas de cine (taquilla real)
      if (/(cine\b|cinesa|neocine|yelmo|kinepolis|taquilla|sala 3d|imax|butaca|palacio cinematogr|cartelera)/i.test(text)) {
        return 'cinema-ticket';
      }

      // 2. Acuario / Oceanografico / Mundo marino / Zoo / Safari
      if (/(acuario|aquarium|oceanogr|bioparc|faunia|delfinario|zoo|safari|vida marina|tiburones|arrecife|peces|mantas)/i.test(text)) {
        return 'aquarium-pass';
      }

      // 3. Concierto / Festival / Musica en vivo / Teatro musical
      if (/(concierto|festival|m[uú]sica|directo|ac[uú]stico|dj|recital|banda|rock|pop|indie|teatro|musical|auditorio|conciertazo|fiesta|discoteca|baile|live tour|stage)/i.test(text)) {
        return 'vip-backstage';
      }

      // 4. Escape Room / Misterio / Espionaje / Laser Tag / Accion
      if (/(escape|misterio|enigma|acertijo|candado|cluedo|l[aá]ser|laser tag|paintball|kart|karts|tirolina|misi[oó]n|secreto|agente|detective|investigaci[oó]n|terror|fantasma|pista secreta)/i.test(text)) {
        return 'secret-dossier';
      }

      // 5. Spa / Wellness / Balneario / Termal
      if (/(spa|termal|termas|masaje|balneario|circuito termal|sauna|jacuzzi|relax|bienestar|desconexi[oó]n|yoga|meditaci[oó]n|hidromasaje|talaso|hammam|zen)/i.test(text)) {
        return 'spa-voucher';
      }

      // 6. Bolera / Arcade / Billar / Minigolf / Recreativos retro
      if (/(bolera|bolos|strike|arcade|recreativos|billar|dardos|minigolf|air hockey|pinball|futbol[ií]n|gaming|recreativo|lanes)/i.test(text)) {
        return 'arcade-scorecard';
      }

      // 7. Vino / Bodega / Cata / Sumiller / Cerveza artesana
      if (/(vino|bodega|cata|sommelier|sumiller|copa|barrica|degustaci[oó]n|maridaje|quesos|jam[oó]n ib[eé]rico|cerveza artesana|coctel|c[oó]ctel|vermut|ginebra)/i.test(text)) {
        return 'wine-reserve';
      }

      // 8. Pelicula o Serie en sofa / Streaming en casa (modo movies o referencias a ver en casa)
      if (mode === 'movies' || /(pel[ií]cula|peli|serie|estreno|filmaffinity|netflix|hbo|max|prime video|disney\+|movistar\+|filmin|sofa|maraton de series)/i.test(text)) {
        return 'streaming-ticket';
      }

      // 9. Vuelos / Viajes / Escapadas / Aeropuertos
      if (/(vuelo|viaje|escapada|avi[oó]n|aeropuerto|hotel|resort|tren|ave|maleta|par[ií]s|roma|londres|crucero|billete|embarque)/i.test(text)) {
        return 'boarding-pass';
      }

      // 10. Naturaleza / Senderismo / Aire libre / Mirador
      if (/(senderismo|ruta|monta[nñ]a|playa|cala|picnic|parque|naturaleza|bosque|mirador|bici|kayak|paddle|surf|acampada|trekking|camping)/i.test(text)) {
        return 'nature-permit';
      }

      // 11. Atardecer / Romantico / Helado al paseo
      if (/(atardecer|puesta de sol|puesta del sol|golden hour|estrellas|constelaciones|paseo rom[aá]ntico|helado|velas|rom[aá]ntico)/i.test(text)) {
        return 'sunset-postcard';
      }

      // 12. Arte / Museos / Exposiciones culturales
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

      // 15. Por defecto: Pasaporte oficial de la pareja
      return 'custom-visa';
    },

    synthesizeDishes: function (name, note) {
      const text = ((name || '') + ' ' + (note || '')).toLowerCase();
      if (/mexican|taco|burrito|guacamole|nacho/i.test(text)) {
        return [
          { qty: '2x', name: 'Tacos al Pastor con Pina Asada y Cilantro', desc: 'Marinado tradicional 8h en achiote y especias', price: '13.50 EUR' },
          { qty: '1x', name: 'Totopos Caseros con Guacamole de Molcajete', desc: 'Aguacate hass fresco, lima y queso cotija', price: '7.80 EUR' },
          { qty: '2x', name: 'Margaritas Frozen de Lima y Sal Negra', desc: 'Tequila 100% agave y triple seco', price: '12.00 EUR' }
        ];
      }
      if (/italian|pizza|pasta|lasa|trattoria/i.test(text)) {
        return [
          { qty: '1x', name: 'Pizza Margherita Verace al Horno de Lena', desc: 'Tomate San Marzano D.O.P. y Fior di Latte', price: '14.90 EUR' },
          { qty: '1x', name: 'Tagliatelle Frescos al Tartufo Nero & Parmigiano', desc: 'Mantequilla de trufa de montana y 24 meses', price: '16.50 EUR' },
          { qty: '1x', name: 'Tiramisu Tradizionale con Savoiardi & Cacao', desc: 'Receta veneciana con mascarpone fresco', price: '6.50 EUR' },
          { qty: '2x', name: 'Calice di Vino Chianti Classico Riserva', desc: 'Cosecha toscana seleccionada', price: '8.00 EUR' }
        ];
      }
      if (/sushi|japon|asia|ramen|gyoza|poke/i.test(text)) {
        return [
          { qty: '1x', name: 'Variado Especial Nigiris Flambeados & Uramakis', desc: 'Salmon noruego, atun rojo Balfego y trufa (16 pz)', price: '21.50 EUR' },
          { qty: '1x', name: 'Gyozas Crujientes de Langostino y Shiitake', desc: 'Al vapor y plancha con salsa ponzu citrica', price: '7.20 EUR' },
          { qty: '2x', name: 'Mochis Artesanales de Te Matcha & Fresa Silvestre', desc: 'Masa fina de arroz con helado premium', price: '5.80 EUR' }
        ];
      }
      if (/burger|hamburgues|smash/i.test(text)) {
        return [
          { qty: '2x', name: 'Smash Burger Doble Black Angus & Bacon Crujiente', desc: 'Queso cheddar ahumado derretido y brioche tostado', price: '18.90 EUR' },
          { qty: '1x', name: 'Patatas Rusticas con Salsa Trufada & Parmesano', desc: 'Corte grueso casero con piel dorada', price: '4.90 EUR' },
          { qty: '2x', name: 'Bebidas Artesanales Grandes Refill', desc: 'Refrescos helados ilimitados', price: '5.60 EUR' }
        ];
      }
      if (/tapas|bar|taberna|ca[nñ]as/i.test(text)) {
        return [
          { qty: '1x', name: 'Tabla de Jamon Iberico de Bellota 100%', desc: 'Cortado a cuchillo con pan de cristal y tomate', price: '18.00 EUR' },
          { qty: '1x', name: 'Patatas Bravas Crujientes con Doble Salsa', desc: 'Alioli de ajo asado y brava de la abuela', price: '5.50 EUR' },
          { qty: '2x', name: 'Canas Dobles de Cerveza Bien Tiradas', desc: 'Espuma cremosa y bien frias', price: '5.20 EUR' }
        ];
      }
      // General comida gourmet
      return [
        { qty: '2x', name: 'Menu Degustacion Especial para Dos', desc: 'Seleccion de platos estrella del chef', price: '26.00 EUR' },
        { qty: '1x', name: 'Guarnicion Especial Compartida de la Casa', desc: 'Preparada al momento con ingredientes frescos', price: '5.50 EUR' },
        { qty: '2x', name: 'Bebidas de Pareja Refrescantes', desc: 'Servidas en copa fria con hielo y limon', price: '5.00 EUR' }
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

      // Coincidencias de catalogo oficial con datos hiper-realistas
      if (lowerId.includes('popeyes') || lowerName.includes('popeyes')) {
        archetype = 'thermal-receipt';
        brandLogo = './popeyes.png';
        venueAddress = 'CC ESPACIO MEDITERRANEO - LOCAL B-14, CARTAGENA';
        navQuery = 'Popeyes CC Espacio Mediterraneo Cartagena';
        dishes = [
          { qty: '1x', name: 'THE CHICKEN SANDWICH CAJUN', desc: 'Marinado 12h especias cajun, pickles & brioche', price: '6.90 EUR' },
          { qty: '1x', name: 'PATATAS CAJUN GRANDES', desc: 'Sazon Cajun especial crujiente', price: '3.60 EUR' },
          { qty: '4x', name: 'CHICKEN TENDERS SOLOMILLO', desc: 'Salsas: Garlic Mayo & Sweet Chili', price: '5.90 EUR' },
          { qty: '2x', name: 'REFRESCO GRANDE ZERO (REFILL)', desc: 'Bebida ilimitada en fuente', price: '5.40 EUR' }
        ];
      } else if (lowerId.includes('unica') || lowerName.includes('unica')) {
        archetype = 'thermal-receipt';
        brandLogo = './unica.png';
        venueAddress = 'CASCO HISTORICO - CALLE MAYOR, CARTAGENA';
        navQuery = 'Unica Smash Burgers Cartagena';
        dishes = [
          { qty: '2x', name: 'SMASH BURGER DOBLE BACON TRUFADA', desc: 'Doble carne madurada, cheddar y mahonesa trufa', price: '17.90 EUR' },
          { qty: '1x', name: 'SWEET BACON FRIES CON QUESO AHUMADO', desc: 'Patatas fritas caseras banadas en queso fundido', price: '4.80 EUR' },
          { qty: '2x', name: 'BEBIDAS ARTESANALES DUO', desc: 'Cerveza craft y limonada natural', price: '6.00 EUR' }
        ];
      } else if (lowerId.includes('kfc') || lowerName.includes('kfc')) {
        archetype = 'thermal-receipt';
        brandLogo = './kfc.png';
        venueAddress = 'CC MANDARACHE - RONDA CIUDAD DE LA UNION, CARTAGENA';
        navQuery = 'KFC Mandarache Cartagena';
        dishes = [
          { qty: '1x', name: 'CUBO RECETA ORIGINAL 8 PIEZAS', desc: '11 hierbas y especias secretas Kentucky', price: '15.99 EUR' },
          { qty: '2x', name: 'PATATAS CLASICAS GRANDES', desc: 'Patatas doradas crujientes', price: '5.50 EUR' },
          { qty: '2x', name: 'REFRESCO GRANDE ZERO', desc: 'Bebida fria con hielo', price: '5.20 EUR' }
        ];
      } else if (lowerId.includes('mcdonald') || lowerName.includes('mcdonald')) {
        archetype = 'thermal-receipt';
        brandLogo = './mcdonalds.png';
        venueAddress = 'ESPACIO MEDITERRANEO / PUERTO DE CARTAGENA';
        navQuery = 'McDonalds Cartagena';
        dishes = [
          { qty: '2x', name: 'MENU BIG MAC CON PATATAS DELUXE', desc: 'Hamburguesa clasica doble salsa especial', price: '18.40 EUR' },
          { qty: '9x', name: 'MCNUGGETS CON SALSA BARBACOA', desc: 'Pollo rebozado crujiente', price: '5.90 EUR' },
          { qty: '2x', name: 'MCFLURRY LOTUS BISCOFF', desc: 'Helado cremoso con sirope y galleta', price: '6.20 EUR' }
        ];
      } else if (lowerId.includes('burger_king') || lowerName.includes('burger king')) {
        archetype = 'thermal-receipt';
        brandLogo = './burger_king.png';
        venueAddress = 'AVDA. TITO DIDIO / CC MANDARACHE, CARTAGENA';
        navQuery = 'Burger King Cartagena';
        dishes = [
          { qty: '2x', name: 'MENU WHOPPER DOBLE A LA PARRILLA', desc: 'Carne 100% a la parrilla con cebolla y tomate', price: '19.20 EUR' },
          { qty: '1x', name: 'AROS DE CEBOLLA CRUJIENTES', desc: 'Rebozado crujiente con salsa BBQ', price: '4.20 EUR' },
          { qty: '2x', name: 'KING FUSION OREO', desc: 'Helado con trozos de galleta', price: '6.00 EUR' }
        ];
      } else if (lowerId.includes('telepizza') || lowerName.includes('telepizza')) {
        archetype = 'thermal-receipt';
        brandLogo = './telepizza.png';
        venueAddress = 'CALLE ALFONSO X EL SABIO, CARTAGENA';
        navQuery = 'Telepizza Cartagena';
        dishes = [
          { qty: '1x', name: 'PIZZA MEDIANA BARBACOA GOURMET', desc: 'Masa clasica, ternera, bacon y salsa BBQ', price: '15.95 EUR' },
          { qty: '1x', name: 'PIZZA MEDIANA CARBONARA MASA FINA', desc: 'Champinones, cebolla, bacon y queso', price: '14.95 EUR' },
          { qty: '1x', name: 'PIZZOLINOS AJO Y QUESO', desc: 'Bocaditos horneados con mozzarella', price: '4.50 EUR' }
        ];
      } else if (lowerId.includes('kebab') || lowerName.includes('kebab')) {
        archetype = 'thermal-receipt';
        brandLogo = './kebab.png';
        venueAddress = 'CALLE DEL CARMEN / PUERTO, CARTAGENA';
        dishes = [
          { qty: '2x', name: 'DURUM MIXTO COMPLETO CON SALSA BLANCA', desc: 'Carne asada, lechuga fresca y toque picante', price: '14.00 EUR' },
          { qty: '1x', name: 'PATATAS ESPECIADAS ORIENTALES', desc: 'Fritas doradas con mezcla de pimenton y comino', price: '3.50 EUR' },
          { qty: '2x', name: 'BEBIDAS FRIAS REFRESCANTES', desc: 'Lata fria servida al instante', price: '4.00 EUR' }
        ];
      } else if (lowerId === 'plan-cine' || /cinesa|neocine|cine\b/i.test(name)) {
        archetype = 'cinema-ticket';
        venueAddress = 'Neocine Mandarache - Sala 04 IMAX 3D';
      } else if (archetype === 'aquarium-pass' || lowerId.includes('acuario') || lowerName.includes('acuario')) {
        archetype = 'aquarium-pass';
        venueAddress = 'Oceanic Marine Expedition - Tunel de Cristal';
      } else if (lowerId === 'plan-escape-room') {
        archetype = 'secret-dossier';
        venueAddress = 'Mystery Lab Centro - Sala Enigma 404';
      } else if (lowerId === 'plan-spa') {
        archetype = 'spa-voucher';
        venueAddress = 'Talaso Spa Marino & Aguas Termales';
      } else if (lowerId === 'plan-concierto') {
        archetype = 'vip-backstage';
        venueAddress = 'Auditorio Live Tour - Zona Backstage Foso A';
      } else if (lowerId === 'plan-bolera') {
        archetype = 'arcade-scorecard';
        venueAddress = 'Duo Lanes & Retro Arcade 1984';
      } else if (lowerId === 'plan-cata-vinos') {
        archetype = 'wine-reserve';
        venueAddress = 'Bodegas & Cavas Historicas Duo';
      } else if (lowerId === 'plan-picnic' || lowerId === 'plan-senderismo') {
        archetype = 'nature-permit';
        venueAddress = 'Parque Natural / Mirador Panoramico';
      } else if (lowerId === 'plan-paseo-helado') {
        archetype = 'sunset-postcard';
        venueAddress = 'Puerto & Paseo Maritimo al Atardecer';
      } else if (lowerId === 'plan-museo') {
        archetype = 'gallery-pass';
        venueAddress = 'Museo de Arte Moderno & Coleccion Privada';
      } else if (lowerId === 'plan-cocinar-juntos') {
        archetype = 'chef-recipe';
        venueAddress = 'Cocina Atelier en Casa';
      } else if (archetype === 'thermal-receipt' && !dishes) {
        dishes = this.synthesizeDishes(name, note);
      }

      const archetypeLabel = this.LABELS[archetype] || 'Pase Prestige Oficial Duo';

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

    // Codigo de barras realista
    getBarcodeSvg: function (color) {
      const c = color || 'currentColor';
      return `
        <svg viewBox="0 0 160 40" class="w-full h-8 fill-current" style="color: ${c};">
          <rect x="0" y="0" width="3" height="40" />
          <rect x="5" y="0" width="1" height="40" />
          <rect x="8" y="0" width="4" height="40" />
          <rect x="14" y="0" width="2" height="40" />
          <rect x="18" y="0" width="1" height="40" />
          <rect x="22" y="0" width="5" height="40" />
          <rect x="30" y="0" width="2" height="40" />
          <rect x="34" y="0" width="3" height="40" />
          <rect x="39" y="0" width="1" height="40" />
          <rect x="43" y="0" width="4" height="40" />
          <rect x="49" y="0" width="2" height="40" />
          <rect x="54" y="0" width="1" height="40" />
          <rect x="58" y="0" width="6" height="40" />
          <rect x="67" y="0" width="2" height="40" />
          <rect x="71" y="0" width="3" height="40" />
          <rect x="76" y="0" width="1" height="40" />
          <rect x="80" y="0" width="4" height="40" />
          <rect x="87" y="0" width="2" height="40" />
          <rect x="91" y="0" width="5" height="40" />
          <rect x="99" y="0" width="1" height="40" />
          <rect x="103" y="0" width="3" height="40" />
          <rect x="109" y="0" width="4" height="40" />
          <rect x="116" y="0" width="2" height="40" />
          <rect x="120" y="0" width="1" height="40" />
          <rect x="124" y="0" width="4" height="40" />
          <rect x="131" y="0" width="2" height="40" />
          <rect x="135" y="0" width="5" height="40" />
          <rect x="143" y="0" width="2" height="40" />
          <rect x="147" y="0" width="4" height="40" />
          <rect x="154" y="0" width="1" height="40" />
          <rect x="157" y="0" width="3" height="40" />
        </svg>
      `;
    },

    // Borde dentado de ticket termico (Sawtooth Top & Bottom)
    getSawtoothSvg: function () {
      return `
        <svg viewBox="0 0 200 8" preserveAspectRatio="none" class="w-full h-full fill-white/95">
          <polygon points="0,0 5,8 10,0 15,8 20,0 25,8 30,0 35,8 40,0 45,8 50,0 55,8 60,0 65,8 70,0 75,8 80,0 85,8 90,0 95,8 100,0 105,8 110,0 115,8 120,0 125,8 130,0 135,8 140,0 145,8 150,0 155,8 160,0 165,8 170,0 175,8 180,0 185,8 190,0 195,8 200,0" />
        </svg>
      `;
    },

    // Escudo oficial de Duo
    getShieldSvg: function (color) {
      const c = color || '#f59e0b';
      return `
        <svg viewBox="0 0 24 24" class="w-5 h-5 inline-block fill-none stroke-current" style="color: ${c};" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4" stroke-width="2.5"/>
        </svg>
      `;
    },

    // ==========================================
    // RENDERIZADOR MAESTRO DE TARJETAS 3D
    // ==========================================
    renderPassCard: function (pass, options) {
      if (!pass) return '';
      if (!options) options = {};
      const cardId = options.id || ('pass-' + Math.random().toString(36).substring(2, 9));
      const isCompact = !!options.compact;
      const isPreview = !!options.isPreview;
      const arc = pass.archetype || 'custom-visa';

      let frontHtml = '';

      switch (arc) {
        // ----------------------------------------------------
        // 1. TICKET TERMICO DE RESTAURANTE (POPEYES / BURGER / GASTRO)
        // ----------------------------------------------------
        case 'thermal-receipt':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl thermal-receipt-paper text-[#18191C] p-5 pt-7 pb-8 border border-neutral-300/80 font-mono text-left select-none">
              <!-- Sawtooth Top -->
              <div class="absolute top-0 left-0 right-0 h-2 overflow-hidden pointer-events-none opacity-90">
                ${this.getSawtoothSvg()}
              </div>

              <!-- Cabecera del Restaurante -->
              <div class="text-center pb-3 border-b-2 border-dashed border-neutral-400/60 font-mono">
                <div class="flex items-center justify-center gap-2 mb-1">
                  ${pass.brandLogo ? `<img src="${pass.brandLogo}" class="w-8 h-8 object-contain filter grayscale contrast-125" alt="Logo">` : '<div class="w-7 h-7 rounded-lg bg-neutral-900 text-white font-bold text-xs flex items-center justify-center font-mono">DUO</div>'}
                  <h3 class="font-extrabold text-base tracking-tight text-neutral-900 uppercase font-mono">${escapeHtml(pass.name)}</h3>
                </div>
                <p class="text-[9px] text-neutral-600 leading-tight uppercase font-medium">
                  ${escapeHtml(pass.venueAddress)}<br>
                  NIF: B-88291048 - TEL: 968 00 24 12
                </p>
              </div>

              <!-- Metadatos de Comanda -->
              <div class="py-2.5 border-b border-dashed border-neutral-400/60 font-mono text-[11px] space-y-0.5">
                <div class="flex justify-between">
                  <span class="text-neutral-500">FECHA: ${pass.date}</span>
                  <span class="text-neutral-500">HORA: 21:15 H</span>
                </div>
                <div class="flex justify-between font-bold text-neutral-800">
                  <span>TICKET: ${pass.ticketNum}</span>
                  <span>TPV: #03 CAJA 1</span>
                </div>
                <div class="flex justify-between">
                  <span>MESA: <strong class="text-neutral-900 font-bold">#07 (TERRAZA DUO)</strong></span>
                  <span>CAMARERO: <strong class="text-neutral-900 font-bold">MATCH 100%</strong></span>
                </div>
                <div class="flex justify-between pt-1 text-[11px]">
                  <span class="text-neutral-600">PAREJA:</span>
                  <strong class="font-extrabold text-neutral-900 uppercase">${escapeHtml(pass.coupleNames)}</strong>
                </div>
              </div>

              <!-- Desglose de Platos -->
              <div class="py-3 font-mono text-xs">
                <div class="flex justify-between font-bold text-[10px] text-neutral-500 uppercase pb-1 border-b border-neutral-300">
                  <span>CANT - DESCRIPCION</span>
                  <span>IMPORTE</span>
                </div>

                <div class="space-y-2 pt-2 text-[11px] leading-tight">
                  ${(pass.dishes || [
                    { qty: '2x', name: 'Plato Especial para Dos', desc: 'Receta de la casa compartida', price: '18.50 EUR' },
                    { qty: '1x', name: 'Guarnicion Especial Crujiente', desc: 'Racion dorada para acompanar', price: '4.50 EUR' },
                    { qty: '2x', name: 'Bebidas de Pareja Refill', desc: 'Servidas bien frias', price: '5.00 EUR' }
                  ]).map(function (d) {
                    return `
                      <div>
                        <div class="flex justify-between font-bold text-neutral-900">
                          <span>${d.qty} ${escapeHtml(d.name)}</span>
                          <span>${d.price}</span>
                        </div>
                        ${d.desc ? `<p class="text-[10px] text-neutral-500 pl-3 font-sans">* ${escapeHtml(d.desc)}</p>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>

                <!-- Totales & Descuento 100% Duo Love -->
                <div class="mt-3 pt-2 border-t-2 border-neutral-900 space-y-1 text-xs">
                  <div class="flex justify-between text-neutral-600">
                    <span>SUBTOTAL:</span>
                    <span>28.00 EUR</span>
                  </div>
                  <div class="flex justify-between font-bold text-emerald-800 bg-emerald-100/60 px-1 py-0.5 rounded">
                    <span>DESCUENTO DUO LOVE (100%):</span>
                    <span class="text-rose-600 font-bold">-100%</span>
                  </div>
                  <div class="flex justify-between font-extrabold text-sm pt-1 border-t border-dashed border-neutral-400 text-neutral-950">
                    <span>TOTAL A PAGAR:</span>
                    <span>0.00 EUR</span>
                  </div>
                  <div class="text-right text-[10px] font-bold text-emerald-700 tracking-wider">
                    *** PAGADO CON AMOR ***
                  </div>
                </div>
              </div>

              <!-- Sello de Caucho Rojo Pagado -->
              <div class="relative my-2 flex items-center justify-center">
                <div class="stamp-paid-red px-4 py-1.5 rounded text-center shadow-sm">
                  <span class="text-xs font-black tracking-widest text-red-600 block leading-tight">PAGADO EN DUO</span>
                  <span class="text-[9px] font-mono text-red-700 font-bold block">${pass.date} - VALIDADO</span>
                </div>
              </div>

              <!-- Perforacion de Corte de Ticket -->
              <div class="relative my-3 flex items-center justify-center font-mono">
                <div class="w-full border-b-2 border-dashed border-neutral-400"></div>
                <span class="absolute bg-[#FAF8F2] px-2 text-[9px] text-neutral-500 uppercase tracking-widest">
                  CORTE DE TICKET
                </span>
              </div>

              <!-- Codigo de Barras Termico Realista -->
              <div class="pt-1 flex flex-col items-center justify-center font-mono">
                <div class="w-full flex items-center justify-center py-1">
                  ${this.getBarcodeSvg('#18191C')}
                </div>
                <span class="text-[9px] text-neutral-600 tracking-[0.25em] font-bold">${pass.ticketNum}</span>
                <p class="text-[9px] text-neutral-500 mt-1 uppercase text-center font-bold">
                  *** GRACIAS POR VUESTRA VISITA! ***<br>
                  CONSERVA ESTE TICKET DE CITA
                </p>
              </div>

              <!-- Sawtooth Bottom -->
              <div class="absolute bottom-0 left-0 right-0 h-2 overflow-hidden pointer-events-none opacity-90 rotate-180">
                ${this.getSawtoothSvg()}
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 2. ENTRADA GOLDEN MARQUEE CINE VIP (ART DECO & BUTACAS)
        // ----------------------------------------------------
        case 'cinema-ticket':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#140e10] border border-amber-600/40 text-amber-100 p-5 select-none text-left ticket-scallop-edges">
              <div class="foil-glare absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"></div>

              <div class="relative border-2 border-amber-500/50 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-[#1a1114] via-[#120a0d] to-[#1c1216] shadow-inner">
                <!-- Art Deco Corners -->
                <div class="absolute top-2 left-2 text-amber-400/80 text-xs font-serif">+</div>
                <div class="absolute top-2 right-2 text-amber-400/80 text-xs font-serif">+</div>
                <div class="absolute bottom-2 left-2 text-amber-400/80 text-xs font-serif">+</div>
                <div class="absolute bottom-2 right-2 text-amber-400/80 text-xs font-serif">+</div>

                <!-- Marquee Header -->
                <div class="text-center pb-3 border-b border-amber-500/30">
                  <p class="font-cinzel text-[10px] tracking-[0.25em] text-amber-400/90 uppercase font-bold">
                    PALACIO CINEMATOGRAFICO DUO
                  </p>
                  <h2 class="font-cinzel text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-sm mt-0.5">
                    ADMIT TWO
                  </h2>
                  <p class="text-[11px] font-playfair italic text-amber-300/80 mt-0.5">
                    Pase de Gala para <strong class="font-bold text-amber-200">${escapeHtml(pass.coupleNames)}</strong>
                  </p>
                </div>

                <div class="py-3 space-y-2.5">
                  <div class="flex items-center justify-between text-xs font-mono text-amber-400/80 px-2.5 py-1 bg-amber-950/40 rounded border border-amber-500/20">
                    <span>SALA: <strong class="text-amber-200 font-sans">04 IMAX 3D</strong></span>
                    <span>FILA: <strong class="text-amber-200 font-sans">07 VIP</strong></span>
                    <span>BUTACAS: <strong class="text-amber-200 font-sans">14 & 15</strong></span>
                  </div>

                  <div>
                    <span class="text-[9px] font-cinzel text-amber-400/80 uppercase block">PELICULA O ESTRENO:</span>
                    <h3 class="text-base sm:text-lg font-black text-white font-cinzel tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                  </div>

                  <div class="text-center py-1">
                    <div class="inline-block px-3 py-1 rounded-full border border-amber-400/40 bg-amber-500/10 text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                      PALOMITAS GRANDES & BUTACAS RECLINABLES
                    </div>
                  </div>

                  <!-- Perforation Line -->
                  <div class="relative my-2 flex items-center justify-center">
                    <div class="w-full border-b-2 border-dashed border-amber-500/40"></div>
                    <span class="absolute bg-[#170e12] px-2 text-[9px] font-mono text-amber-500/70 tracking-widest uppercase">
                      TALON DESPRENDIBLE
                    </span>
                  </div>

                  <div class="pt-1 flex items-end justify-between">
                    <div>
                      <div class="text-[9px] font-mono text-amber-400/60 uppercase">N DE SERIE / REF</div>
                      <div class="text-sm font-cinzel font-bold text-amber-300 tracking-wider">${pass.ticketNum}</div>
                      <div class="text-[9px] text-amber-400/60 font-mono">FECHA: ${pass.date}</div>
                    </div>
                    <div class="w-32">
                      ${this.getBarcodeSvg('#f59e0b')}
                    </div>
                  </div>
                </div>

                <div class="text-center pt-2 border-t border-amber-500/20 text-[9px] font-cinzel tracking-widest text-amber-400/60">
                  EXCLUSIVO PARA LA APP DUO - SESION PRIVADA
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 3. CREDENCIAL VIP BACKSTAGE CONCIERTO & FESTIVAL
        // ----------------------------------------------------
        case 'vip-backstage':
          frontHtml = `
            <div class="card-face relative w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 bg-gradient-to-b from-[#180d2e] via-[#0f0920] to-[#080511] border-2 border-purple-400/40 p-6 text-white text-left select-none">
              <div class="hologram-shimmer absolute inset-0 opacity-70"></div>
              <div class="foil-glare absolute inset-0 pointer-events-none opacity-50 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>

              <!-- Lanyard Hole -->
              <div class="mx-auto w-12 h-2.5 rounded-full bg-black/80 border border-white/30 shadow-inner mb-4"></div>

              <div class="flex items-center justify-between border-b border-white/20 pb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></span>
                  <span class="font-syne text-[11px] font-black tracking-widest text-green-300 uppercase">ACCESS ALL AREAS</span>
                </div>
                <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/30 font-bold">
                  EDICION 2026
                </span>
              </div>

              <div class="my-5 text-center relative z-10">
                <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-pink-400 font-bold mb-1">
                  DUO LIVE FESTIVAL TOUR
                </p>
                <h2 class="font-syne text-3xl sm:text-4xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 drop-shadow-[0_2px_10px_rgba(236,72,153,0.5)]">
                  VIP PASS
                </h2>
                <h3 class="text-sm font-extrabold text-white mt-1.5 uppercase tracking-wide truncate max-w-[280px] mx-auto">${escapeHtml(pass.name)}</h3>
                <div class="mt-2 inline-block px-4 py-1 rounded-full bg-white/10 border border-white/25 backdrop-blur-md">
                  <p class="text-[11px] font-bold text-white tracking-wider uppercase">
                    INVITADOS DE HONOR // ARTIST GUEST
                  </p>
                </div>
              </div>

              <!-- Holographic Security Patch -->
              <div class="my-4 p-3 rounded-2xl bg-gradient-to-r from-purple-900/60 via-pink-900/40 to-blue-900/60 border border-white/20 flex items-center justify-between">
                <div>
                  <p class="text-[9px] font-mono text-zinc-400 uppercase">TITULARES DE CREDENCIAL</p>
                  <p class="font-syne text-base font-extrabold text-pink-200">${escapeHtml(pass.coupleNames)}</p>
                  <p class="text-[9px] font-mono text-cyan-300">ZONA: FOSO VIP & BACKSTAGE STAGE A</p>
                </div>
                <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-pink-500 to-cyan-400 p-[1px] shadow-lg animate-pulse shrink-0">
                  <div class="w-full h-full bg-black/60 rounded-xl flex items-center justify-center font-black text-xs text-white">
                    DUO
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <div class="flex flex-col">
                  <span class="font-mono text-[8px] text-zinc-400">RFID SYNC ACTIVE</span>
                  <span class="font-mono text-[10px] text-zinc-300 font-bold tracking-wider">${pass.ticketNum}</span>
                </div>
                <div class="flex items-center gap-1 font-mono text-[10px] font-bold text-cyan-300">
                  <span>BARRA LIBRE VIP</span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 4. EXPEDIENTE TOP SECRET ESCAPE ROOM & ENIGMA
        // ----------------------------------------------------
        case 'secret-dossier':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 bg-[#141518] border-2 border-red-700/60 p-6 text-zinc-200 text-left select-none">
              <div class="absolute inset-0 bg-paper-fiber opacity-30 pointer-events-none"></div>
              <!-- Paperclip -->
              <div class="absolute -top-1 right-8 w-5 h-12 border-2 border-amber-400/80 rounded-full shadow-md z-20 pointer-events-none"></div>

              <div class="flex items-center justify-between border-b-2 border-zinc-700 pb-3">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 bg-red-600 rounded-sm animate-pulse"></span>
                  <span class="font-mono text-xs font-black tracking-widest text-red-500 uppercase">
                    DUO INTELLIGENCE AGENCY
                  </span>
                </div>
                <span class="font-mono text-[10px] bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-800 font-bold">
                  NIVEL 5
                </span>
              </div>

              <div class="my-4 flex items-center justify-between">
                <div>
                  <p class="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">EXPEDIENTE OPERATIVO</p>
                  <h3 class="font-mono text-lg font-black text-white tracking-wider truncate max-w-[200px]">${escapeHtml(pass.name)}</h3>
                  <p class="font-mono text-xs text-red-400 font-bold mt-0.5">MISION: 60 MINUTOS O COLAPSO</p>
                </div>
                <div class="stamp-classified px-2.5 py-1 text-xs">
                  TOP SECRET
                </div>
              </div>

              <div class="space-y-2 my-3 bg-black/50 p-3.5 rounded-xl border border-zinc-800 text-xs font-mono">
                <div class="flex justify-between">
                  <span class="text-zinc-500">AGENTES ASIGNADOS:</span>
                  <span class="font-bold text-red-400 uppercase">${escapeHtml(pass.coupleNames)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-500">UBICACION:</span>
                  <span class="text-zinc-300 truncate max-w-[140px]">${escapeHtml(pass.venueAddress)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-500">CLAVE CIFRADA:</span>
                  <span class="text-zinc-400 tracking-widest">[DUO-99-ALPHA]</span>
                </div>
              </div>

              <div class="pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <div>
                  <div>REF: ${pass.ticketNum}</div>
                  <div>FECHA: ${pass.date}</div>
                </div>
                <div class="text-right">
                  <div class="text-zinc-400">TIEMPO LIMITE</div>
                  <div class="text-sm font-bold text-red-500">60:00 MIN</div>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 5. RITUAL ZEN SPA TERMAL & BIENESTAR
        // ----------------------------------------------------
        case 'spa-voucher':
          frontHtml = `
            <div class="card-face relative w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 bg-[#FAF7F2] border border-[#e4ded5] p-6 text-[#2e2b27] text-left select-none">
              <div class="absolute inset-0 bg-paper-fiber opacity-40 pointer-events-none"></div>
              <div class="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-stone-300/60 pointer-events-none zen-ripple"></div>
              <div class="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-stone-300/40 pointer-events-none zen-ripple"></div>

              <div class="flex items-center justify-between border-b border-stone-300/80 pb-3">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-serif text-emerald-800/70 tracking-widest uppercase font-semibold">
                    DUO WELLNESS RETREAT
                  </span>
                </div>
                <div class="w-8 h-8 rounded-md border-2 border-red-700 text-red-700 flex items-center justify-center font-serif text-xs font-bold shadow-sm">
                  ZEN
                </div>
              </div>

              <div class="my-5 text-center">
                <p class="font-cormorant italic text-xs text-stone-500 tracking-[0.2em] uppercase">
                  Pase de Acceso Exclusivo - Circuito Privado
                </p>
                <h2 class="font-cormorant text-2xl sm:text-3xl font-semibold tracking-wide text-stone-800 mt-1">
                  ${escapeHtml(pass.name)}
                </h2>
                <div class="w-12 h-[1px] bg-amber-600/50 mx-auto my-2"></div>
                <p class="font-cormorant text-sm italic text-stone-600">
                  Dedicado a <strong class="font-bold text-stone-800">${escapeHtml(pass.coupleNames)}</strong>
                </p>
              </div>

              <div class="my-4 p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200/90 shadow-inner space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="text-stone-500">TRATAMIENTO:</span>
                  <span class="font-semibold text-stone-800">Aguas Termales & Masaje 60'</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-stone-500">AROMATERAPIA:</span>
                  <span class="font-semibold text-emerald-800">Lavanda Francesa & Eucalipto</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-stone-500">AMBIENTE:</span>
                  <span class="font-semibold text-stone-800">Luz de Velas & Silencio Absoluto</span>
                </div>
              </div>

              <div class="pt-3 border-t border-stone-300/80 flex items-center justify-between text-xs font-cormorant text-stone-600">
                <span>90 MINUTOS DE RELAX TOTAL</span>
                <span class="italic text-emerald-800 font-semibold">${pass.date}</span>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 6. SCORECARD BOLERA & RETRO ARCADE 1984
        // ----------------------------------------------------
        case 'arcade-scorecard':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 bg-[#0c0d1e] border-2 border-cyan-400/50 p-5 text-white arcade-scanlines text-left select-none">
              <div class="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_#ff007f]"></span>
                  <span class="font-arcade text-[10px] text-cyan-300">DUO LANES '84</span>
                </div>
                <span class="font-vt text-lg text-pink-400 tracking-widest glow-neon-pink">
                  10-PIN STRIKE
                </span>
              </div>

              <div class="my-3">
                <div class="flex justify-between items-center mb-1 text-[9px] font-arcade text-zinc-400">
                  <span>SCORECARD OFICIAL</span>
                  <span class="text-yellow-400">CREDIT: 99</span>
                </div>

                <div class="border-2 border-cyan-500/50 rounded-lg overflow-hidden bg-black/70 text-center font-vt">
                  <div class="grid grid-cols-10 bg-cyan-950/60 border-b border-cyan-500/40 text-[11px] text-cyan-300 py-0.5">
                    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
                    <div>6</div><div>7</div><div>8</div><div>9</div><div class="text-pink-400">10</div>
                  </div>
                  <div class="grid grid-cols-10 border-b border-zinc-800 text-sm text-yellow-300 py-1 font-bold">
                    <div class="border-r border-zinc-800">9 /</div>
                    <div class="border-r border-zinc-800 text-pink-400">X</div>
                    <div class="border-r border-zinc-800">8 1</div>
                    <div class="border-r border-zinc-800 text-pink-400">X</div>
                    <div class="border-r border-zinc-800">7 /</div>
                    <div class="border-r border-zinc-800">9 -</div>
                    <div class="border-r border-zinc-800 text-pink-400">X</div>
                    <div class="border-r border-zinc-800">8 /</div>
                    <div class="border-r border-zinc-800 text-pink-400">X</div>
                    <div class="text-green-400">X X 9</div>
                  </div>
                </div>

                <div class="flex justify-between items-center mt-2 px-1">
                  <span class="font-vt text-sm text-cyan-300">JUGADORES: <strong class="font-bold text-white">${escapeHtml(pass.coupleNames)}</strong></span>
                  <span class="font-arcade text-[9px] text-pink-400">TOTAL: 184</span>
                </div>
              </div>

              <!-- 3D Arcade Token Mounted on Card -->
              <div class="p-2.5 bg-gradient-to-r from-purple-950/60 to-cyan-950/60 rounded-xl border border-pink-500/30 flex items-center justify-between">
                <div>
                  <p class="font-arcade text-[8px] text-zinc-400">BONUS RECREATIVAS</p>
                  <p class="font-vt text-base text-yellow-300 glow-neon-cyan">FICHA DORADA INCLUIDA</p>
                  <p class="text-[9px] font-mono text-zinc-300">Partidas ilimitadas en Street Fighter & Pacman</p>
                </div>
                <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center shrink-0">
                  <div class="w-full h-full rounded-full border border-amber-800 flex items-center justify-center font-arcade text-[7px] text-amber-950 font-black text-center leading-none">
                    DUO<br>COIN
                  </div>
                </div>
              </div>

              <div class="pt-2.5 border-t border-cyan-500/30 flex justify-between items-center font-vt text-xs text-zinc-400">
                <span>[PISTA PRIVADA]</span>
                <span>[ZAPATOS RETRO]</span>
                <span>[${pass.date}]</span>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 7. FICHA DE CATA Y BODEGA CON SELLO DE LACRE REAL
        // ----------------------------------------------------
        case 'wine-reserve':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 bg-[#FAF3E8] border-2 border-[#b89f80] p-6 text-[#2f1f14] text-left select-none">
              <div class="absolute inset-0 bg-paper-fiber opacity-50 pointer-events-none"></div>
              <div class="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border-4 border-rose-950/20 pointer-events-none filter blur-[0.5px]"></div>

              <div class="text-center border-b border-[#c4ab8c] pb-3">
                <p class="font-serif text-[10px] uppercase tracking-[0.25em] text-[#8a5d3b]">
                  BODEGAS & CAVAS HISTORICAS DUO
                </p>
                <h2 class="font-playfair text-2xl font-bold tracking-tight text-[#421b18] mt-0.5">
                  Ficha de Cata Privada
                </h2>
                <p class="font-script text-xl text-[#7a2228] mt-0.5">
                  Reserva Barrica Dos Copas
                </p>
              </div>

              <div class="my-4 space-y-2 font-serif text-xs">
                <div class="flex justify-between border-b border-[#e2d2bf] pb-1">
                  <span class="text-[#7d6551] uppercase tracking-wider text-[10px]">CITA ENOLOGICA:</span>
                  <strong class="font-bold text-[#421b18]">${escapeHtml(pass.coupleNames)}</strong>
                </div>
                <div class="flex justify-between border-b border-[#e2d2bf] pb-1">
                  <span class="text-[#7d6551] uppercase tracking-wider text-[10px]">PLAN / BODEGA:</span>
                  <span class="text-[#2f1f14] font-semibold truncate max-w-[170px]">${escapeHtml(pass.name)}</span>
                </div>
                <div class="flex justify-between border-b border-[#e2d2bf] pb-1">
                  <span class="text-[#7d6551] uppercase tracking-wider text-[10px]">SELECCION:</span>
                  <span class="text-[#2f1f14]">4 Copas (Ribera, Rioja, Albarino, Cava)</span>
                </div>
                <div class="flex justify-between border-b border-[#e2d2bf] pb-1">
                  <span class="text-[#7d6551] uppercase tracking-wider text-[10px]">NOTAS DE CATA:</span>
                  <span class="text-[#7a2228] italic">Frutos rojos, roble frances y risas</span>
                </div>
              </div>

              <!-- 3D Crimson Wax Seal -->
              <div class="pt-2 flex items-center justify-between">
                <div class="font-serif text-[10px] text-[#7d6551]">
                  <div>CERTIFICADO POR:</div>
                  <div class="font-bold text-[#421b18] font-script text-lg">Maestro Sumiller</div>
                </div>

                <div class="wax-seal w-14 h-14 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <div class="w-10 h-10 rounded-full border-2 border-red-950/60 flex items-center justify-center shadow-inner">
                    <span class="font-playfair text-lg font-black text-red-200/90 drop-shadow">D</span>
                  </div>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 8. TARJETA DE EMBARQUE FIRST CLASS (BOARDING PASS)
        // ----------------------------------------------------
        case 'boarding-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0b1d33] via-[#081524] to-[#040a12] border border-sky-500/35 p-5 text-sky-100 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-sky-500/30 font-mono text-[10px]">
                <div class="flex items-center gap-1.5 font-bold text-white">
                  <span>DUO AIRLINES - FIRST CLASS</span>
                </div>
                <span class="text-sky-300 font-bold">${pass.ticketNum}</span>
              </div>

              <div class="my-3 flex items-center justify-between">
                <div>
                  <span class="text-[9px] font-mono text-sky-400 uppercase">ORIGEN</span>
                  <div class="text-xl font-black text-white font-mono">RTN</div>
                  <span class="text-[9px] text-sky-300">Rutina</span>
                </div>
                <div class="flex flex-col items-center px-2">
                  <span class="text-xs text-sky-400 font-bold">VUELO</span>
                  <div class="w-16 h-px bg-sky-400/60 relative my-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-sky-400 absolute left-1/2 -top-[2px] -translate-x-1/2"></div>
                  </div>
                  <span class="text-[8px] font-mono text-sky-400">DIRECTO</span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] font-mono text-sky-400 uppercase">DESTINO</span>
                  <div class="text-xl font-black text-white font-mono">DUO</div>
                  <span class="text-[9px] text-sky-300 truncate max-w-[100px] block">${escapeHtml(pass.name)}</span>
                </div>
              </div>

              <div class="p-2.5 bg-sky-950/40 rounded-xl border border-sky-500/20 font-mono text-[10px] grid grid-cols-4 gap-1 text-center">
                <div>
                  <span class="text-sky-400 text-[8px] block">PUERTA</span>
                  <strong class="text-white">G-07</strong>
                </div>
                <div>
                  <span class="text-sky-400 text-[8px] block">ASIENTOS</span>
                  <strong class="text-amber-300">1A & 1B</strong>
                </div>
                <div>
                  <span class="text-sky-400 text-[8px] block">CLASE</span>
                  <strong class="text-white">LOVE VIP</strong>
                </div>
                <div>
                  <span class="text-sky-400 text-[8px] block">HORA</span>
                  <strong class="text-white">21:15 H</strong>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-dashed border-sky-500/30 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#38bdf8')}
                </div>
                <div class="text-right font-mono text-[9px] text-sky-300">
                  <div>${escapeHtml(pass.coupleNames)}</div>
                  <div class="text-sky-400">${pass.date}</div>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 9. EXPEDICION TUNEL MARINO & ACUARIO (SUPER NOVEDAD)
        // ----------------------------------------------------
        case 'aquarium-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#021826] via-[#04334a] to-[#01101b] border-2 border-cyan-400/50 p-5 aquarium-notched-edges text-cyan-100 text-left select-none">
              <div class="foil-glare absolute inset-0 pointer-events-none opacity-30"></div>

              <div class="flex items-center justify-between pb-2 border-b border-cyan-400/30 font-mono text-[10px]">
                <div class="flex items-center gap-1.5 font-bold text-cyan-300">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>OCEANIC WORLD - AQUARIUM PASS</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-bold">ALL ACCESS</span>
              </div>

              <div class="my-4 text-center">
                <p class="font-mono text-[9px] text-cyan-400 uppercase tracking-[0.25em]">TUNEL SUBMARINO DE CRISTAL 360</p>
                <h3 class="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-300 to-sky-400 uppercase tracking-tight mt-0.5">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-cyan-200 mt-1 font-sans">Expedicion Marina para <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <div class="p-2.5 bg-black/40 rounded-xl border border-cyan-500/25 font-mono text-[10px] grid grid-cols-3 gap-1 text-center">
                <div class="border-r border-cyan-500/20">
                  <span class="text-cyan-400/70 text-[8px] block">HABITAT</span>
                  <strong class="text-white">TIBURONES</strong>
                </div>
                <div class="border-r border-cyan-500/20">
                  <span class="text-cyan-400/70 text-[8px] block">PASES</span>
                  <strong class="text-amber-300">2x DUO VIP</strong>
                </div>
                <div>
                  <span class="text-cyan-400/70 text-[8px] block">EXPERIENCIA</span>
                  <strong class="text-cyan-300">ARRECIFE VIVO</strong>
                </div>
              </div>

              <div class="mt-3.5 pt-2 border-t border-dashed border-cyan-400/30 flex items-center justify-between">
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

        // ----------------------------------------------------
        // 10. SESION STREAMING EN CASA (SOFA & PALOMITAS)
        // ----------------------------------------------------
        case 'streaming-ticket':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0c0f1d] via-[#141026] to-[#0a0715] border border-indigo-500/40 text-indigo-100 p-5 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-indigo-500/25">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span class="font-mono text-[10px] font-extrabold tracking-wider text-indigo-300 uppercase">SESION STREAMING EN CASA</span>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">SOFA & PALOMITAS</span>
              </div>

              <div class="my-4 space-y-1">
                <span class="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">PELICULA O SERIE</span>
                <h3 class="text-lg sm:text-xl font-black text-white tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
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

              <div class="mt-3.5 pt-2 border-t border-dashed border-indigo-500/30 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#818cf8')}
                </div>
                <div class="text-right font-mono text-[9px] text-indigo-300">
                  <span>${pass.date}</span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 11. PERMISO EXPEDICION BOTANICA & SENDERISMO
        // ----------------------------------------------------
        case 'nature-permit':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#131b14] border-2 border-emerald-700/60 p-5 text-emerald-100 text-left select-none">
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

        // ----------------------------------------------------
        // 12. POSTAL GOLDEN HOUR AL ATARDECER
        // ----------------------------------------------------
        case 'sunset-postcard':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#2a1320] via-[#1e0f18] to-[#120a14] border border-pink-500/40 p-5 text-pink-100 text-left select-none">
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

        // ----------------------------------------------------
        // 13. PASE DE GALERIA & MUSEO CULTURAL
        // ----------------------------------------------------
        case 'gallery-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0f1118] border border-white/20 p-5 text-neutral-200 text-left select-none">
              <div class="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[9px]">
                <span class="text-white font-bold tracking-widest uppercase">EXPOSICION CULTURAL</span>
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

        // ----------------------------------------------------
        // 14. COMANDA ATELIER DE COCINA EN CASA
        // ----------------------------------------------------
        case 'chef-recipe':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#1b1915] border border-amber-600/30 p-5 text-amber-100 text-left select-none">
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

        // ----------------------------------------------------
        // 15. PASAPORTE OFICIAL PRESTIGE DUO (DEFAULT LIFESTYLE)
        // ----------------------------------------------------
        case 'custom-visa':
        default:
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#121422] via-[#0d0e18] to-[#07080f] border-2 border-amber-500/40 p-5 text-amber-100 text-left select-none">
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

      // ==========================================
      // REVERSO 3D ESPECIFICO Y TEMATICO
      // ==========================================
      let backHtml = '';

      if (arc === 'thermal-receipt') {
        backHtml = `
          <div class="card-face card-back relative w-full rounded-2xl overflow-hidden shadow-2xl thermal-receipt-paper text-[#18191C] p-5 flex flex-col justify-between border border-neutral-300/80 font-mono text-left select-none">
            <div class="border border-neutral-300 rounded-xl p-3.5 h-full flex flex-col justify-between bg-white/70">
              <div>
                <div class="text-center pb-2 border-b border-dashed border-neutral-400">
                  <span class="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">REVERSO DEL TICKET</span>
                  <h4 class="font-extrabold text-sm text-neutral-900 font-mono">ENCUESTA & RECUERDO DUO</h4>
                </div>

                <div class="my-2.5 p-2.5 bg-amber-50 rounded-lg border border-amber-200/80">
                  <span class="text-[10px] text-amber-800 font-bold uppercase block mb-1">NOTA DE CITA:</span>
                  <p class="font-serif italic text-xs text-amber-950 leading-relaxed">
                    "${escapeHtml(pass.note || 'Cena memorable compartida juntos. Risas y buen apetito garantizados.')}"
                  </p>
                </div>

                ${pass.photo ? `
                  <div class="my-2 w-full h-24 rounded-lg overflow-hidden border border-neutral-300 shadow-sm">
                    <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo">
                  </div>
                ` : ''}

                <div class="p-2.5 bg-neutral-100 rounded-lg border border-neutral-200 text-xs space-y-1">
                  <div class="flex items-center space-x-1 text-neutral-800 font-bold">
                    <span>DIRECCION:</span>
                  </div>
                  <p class="text-[10px] text-neutral-600 leading-tight">
                    ${escapeHtml(pass.venueAddress)}
                  </p>
                  <div class="text-[9px] text-neutral-500">
                    VALORACION: ${pass.rating || 5} / 5 ESTRELLAS
                  </div>
                </div>
              </div>

              <div class="text-center pt-2 border-t border-dashed border-neutral-300 text-[10px] text-neutral-500">
                Pase de Pareja Duo - ${pass.date}
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'cinema-ticket') {
        backHtml = `
          <div class="card-face card-back relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#140e10] border border-amber-600/40 text-amber-100 p-5 flex flex-col justify-between text-left select-none">
            <div class="border border-amber-500/40 rounded-xl p-4 h-full flex flex-col justify-between bg-gradient-to-b from-[#1c1216] to-[#0e080a]">
              <div>
                <div class="flex items-center justify-between border-b border-amber-500/30 pb-2">
                  <span class="font-cinzel text-xs font-bold text-amber-300">PLANO DE BUTACAS DUO</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">LOVE SEAT</span>
                </div>

                <!-- Mini Cinema Screen Layout Illustration -->
                <div class="my-3 text-center">
                  <div class="w-3/4 mx-auto h-2 bg-gradient-to-b from-amber-400/50 to-transparent rounded-t-full mb-2 shadow-[0_0_10px_rgba(251,191,36,0.3)]"></div>
                  <div class="text-[9px] font-mono text-amber-400/60 mb-2">PANTALLA GIGANTE</div>
                  
                  <div class="grid grid-cols-6 gap-1.5 max-w-[180px] mx-auto text-[10px]">
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-pink-500 text-white font-bold animate-pulse">14</div>
                    <div class="p-0.5 rounded bg-indigo-500 text-white font-bold animate-pulse">15</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                    <div class="p-0.5 rounded bg-white/5 text-zinc-500">-</div>
                  </div>
                  <p class="text-[10px] text-amber-300/80 font-mono mt-1.5">Butacas 14 & 15 reservadas para <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
                </div>

                <!-- Menu inclusions -->
                <div class="bg-black/40 rounded-lg p-2.5 border border-amber-500/20 space-y-1 text-xs">
                  <div class="flex justify-between text-amber-200">
                    <span>Palomitas Dobles Mixtas:</span>
                    <strong class="font-bold">Incluido</strong>
                  </div>
                  <div class="flex justify-between text-amber-200">
                    <span>2 Bebidas Grandes Zero:</span>
                    <strong class="font-bold">Incluido</strong>
                  </div>
                  <div class="flex justify-between text-amber-200">
                    <span>Gominolas / Chocolates:</span>
                    <strong class="font-bold">Extra Amor</strong>
                  </div>
                </div>
              </div>

              <div class="text-center pt-2 border-t border-amber-500/20 text-[10px] font-mono text-amber-400/60">
                Pase Oficial de Sala - ${pass.date}
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'vip-backstage') {
        backHtml = `
          <div class="card-face card-back relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#130a24] to-[#080511] border-2 border-purple-400/40 p-5 text-white flex flex-col justify-between text-left select-none">
            <div>
              <div class="mx-auto w-12 h-2.5 rounded-full bg-black/80 border border-white/30 shadow-inner mb-3"></div>
              <h3 class="font-syne text-xs font-bold text-pink-400 uppercase tracking-widest text-center mb-3">
                REGLAS DEL RECINTO & PERKS VIP
              </h3>

              <div class="space-y-2 text-xs font-mono">
                <div class="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div class="font-bold text-white">Acceso a Lounge Exclusivo</div>
                  <div class="text-[10px] text-zinc-400">Cocteles de bienvenida y descanso</div>
                </div>
                <div class="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div class="font-bold text-white">Fotografo Oficial Duo</div>
                  <div class="text-[10px] text-zinc-400">Foto polaroid de recuerdo para los dos</div>
                </div>
                <div class="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div class="font-bold text-white">Prohibido mirar el reloj</div>
                  <div class="text-[10px] text-zinc-400">Noche para cantar y saltar sin limites</div>
                </div>
              </div>
            </div>

            <div class="text-center p-2.5 bg-purple-950/40 rounded-xl border border-purple-500/30">
              <p class="text-[10px] font-mono text-purple-300">VALIDO HASTA EL CIERRE DEL FESTIVAL</p>
              <p class="text-xs font-bold text-pink-300 mt-0.5">A DISFRUTAR DEL SHOW JUNTOS!</p>
            </div>
          </div>
        `;
      } else if (arc === 'arcade-scorecard') {
        backHtml = `
          <div class="card-face card-back relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0c0d1e] border-2 border-cyan-400/50 p-5 text-white arcade-scanlines flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-pink-500/40 pb-2 flex justify-between items-center">
                <span class="font-arcade text-[10px] text-pink-400">APUESTA DE PAREJA '84</span>
                <span class="font-vt text-sm text-yellow-300">HIGH STAKES</span>
              </div>

              <div class="my-3 space-y-2.5 font-mono text-xs">
                <div class="p-2.5 rounded-xl bg-black/60 border border-zinc-800">
                  <div class="text-cyan-400 font-bold mb-1">REGLA DE ORO:</div>
                  <div class="text-zinc-300 text-[11px]">El que consiga el primer pleno (Strike) elige la cancion en el coche de vuelta.</div>
                </div>
                <div class="p-2.5 rounded-xl bg-black/60 border border-zinc-800">
                  <div class="text-pink-400 font-bold mb-1">PREMIO FINAL:</div>
                  <div class="text-zinc-300 text-[11px]">El que pierda paga los helados o batidos gigantes de la cafeteria.</div>
                </div>
              </div>
            </div>

            <div class="text-center font-arcade text-[9px] text-green-400 p-2 bg-green-950/30 rounded border border-green-800">
              PRESS START TO PLAY WITH LOVE
            </div>
          </div>
        `;
      } else if (arc === 'wine-reserve') {
        backHtml = `
          <div class="card-face card-back relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#FAF3E8] border-2 border-[#b89f80] p-6 text-[#2f1f14] flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-[#c4ab8c] pb-2 flex justify-between items-center">
                <span class="font-playfair text-sm font-bold text-[#421b18]">RUEDA DE AROMAS & PUNTUACION</span>
                <span class="text-[10px] font-serif text-[#7a2228]">ANADA 2026</span>
              </div>

              <div class="my-3 space-y-2 font-serif text-xs">
                <div class="p-2 rounded-lg bg-[#f0e4d3] border border-[#d9c5ae]">
                  <div class="font-bold text-[#421b18]">Vino 1: Blanco Albarino Atlantico</div>
                  <div class="text-[10px] text-[#7d6551]">Aromas a manzana verde y brisa marina fresca.</div>
                </div>
                <div class="p-2 rounded-lg bg-[#f0e4d3] border border-[#d9c5ae]">
                  <div class="font-bold text-[#421b18]">Vino 2: Tinto Roble Crianza</div>
                  <div class="text-[10px] text-[#7d6551]">Cuerpo sedoso, vainilla y frutos del bosque.</div>
                </div>
              </div>
            </div>

            <div class="text-center font-script text-xl text-[#7a2228] border-t border-[#c4ab8c] pt-2">
              "Un brindis por muchos mas planes juntos"
            </div>
          </div>
        `;
      } else {
        // Reverso general de pasaporte/recuerdo
        backHtml = `
          <div class="card-face card-back relative w-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/20 p-5 text-white text-left flex flex-col justify-between select-none">
            <div>
              <div class="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span class="font-bold text-amber-400 uppercase tracking-wider text-[10px]">DIARIO DE PAREJA</span>
                <span class="text-neutral-400 font-mono text-[10px]">${pass.date}</span>
              </div>

              <div class="my-3">
                <div class="text-[10px] text-neutral-400 uppercase">VALORACION:</div>
                <div class="text-sm font-bold text-amber-400 mt-0.5">${(pass.rating || 5)} / 5 Estrellas</div>
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
      }

      if (isPreview) {
        return `
          <div class="duo-pass-wrapper relative w-full max-w-sm mx-auto" data-pass-json="${escapeHtml(JSON.stringify(pass))}">
            ${frontHtml}
            ${backHtml}
          </div>
        `;
      }

      // Version interactiva con volteo 3D
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
                X
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
