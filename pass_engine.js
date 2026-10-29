  // ==========================================
  // DUO PASS ENGINE: GENERADOR Y RENDERIZADOR DE PASES UNICOS (REALIA & BESPOKE LUXURY)
  // ==========================================
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

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
      KARTING_PASS: 'karting-pass',
      GOLF_SCORECARD: 'golf-scorecard',
      STADIUM_TICKET: 'stadium-ticket',
      RACKET_CLUB: 'racket-club',
      FITNESS_PASS: 'fitness-pass',
      GAMER_PASS: 'gamer-pass',
      BOARDGAME_CARD: 'boardgame-card',
      THEME_PARK: 'theme-park',
      BEACH_CLUB: 'beach-club',
      KARAOKE_LOUNGE: 'karaoke-lounge',
      BRUNCH_CAFE: 'brunch-cafe',
      BESPOKE_SIGNATURE: 'bespoke-signature',
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
      'karting-pass': 'Superlicencia Gran Prix Karting & Paddock',
      'golf-scorecard': 'Tarjeta Oficial de Juego & Green Fee Royal Duo Golf Club',
      'stadium-ticket': 'Entrada Oficial de Estadio Match Day',
      'racket-club': 'Scorecard Oficial Club de Padel & Tenis',
      'fitness-pass': 'Dorsal Oficial de Carrera & Gym VIP',
      'gamer-pass': 'Cartucho 16-Bit & Gamer Pass Co-Op',
      'boardgame-card': 'Carta Legendaria de Tablero & Quest',
      'theme-park': 'Golden Fast Pass Parque de Atracciones',
      'beach-club': 'Day Pass Exclusivo Beach Club & Sol',
      'karaoke-lounge': 'Pase VIP Cabina Privada de Karaoke',
      'brunch-cafe': 'Comanda & Loyalty Pass Atelier de Cafe',
      'bespoke-signature': 'Pase Bespoke Signature Duo',
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
      const raw = ((name || '') + ' ' + (note || '')).toLowerCase();
      // Normalizar texto eliminando tildes y diacriticos
      const text = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // 1. Padel / Tenis / Raqueta / Torneo de Raqueta
      if (/(padel|tenis|tennis|raqueta|pala\b|peloteo|partidillo|tie break|deuce|match point|wimbledon|roland garros|us open|wpt|premier padel|pista de padel|saque y volea|smash)/i.test(text)) {
        return 'racket-club';
      }

      // 2. Futbol / Estadio / Baloncesto / Rugby / Grada / Match Day
      if (/(futbol|partido|estadio|bernabeu|camp nou|metropolitano|mestalla|champions|la liga|liga\b|soccer|baloncesto|basket|nba|acb|rugby|balonmano|voleibol|derbi|tribuna|grada|fondo norte|palco|marcador|aficion|tifo)/i.test(text)) {
        return 'stadium-ticket';
      }

      // 3. Gym / Fitness / Running / Maraton / Entrenamiento / Pesas
      if (/(gym\b|gimnasio|fitness|pesas|crossfit|calistenia|musculacion|entreno|entrenamiento|running|maraton|10k|5k|media maraton|atletismo|carrera popular|dorsal|spinning|cardio|pesas)/i.test(text)) {
        return 'fitness-pass';
      }

      // 4. Videojuegos / Consolas / Gaming / Co-op
      if (/(videojuego|videojuegos|gaming|gamer|playstation|ps5|ps4|xbox|nintendo|switch|game boy|pc gaming|steam|coop|co-op|partida coop|fifa|zelda|mario|consola|pantalla partida|arcade stick)/i.test(text)) {
        return 'gamer-pass';
      }

      // 5. Juegos de Mesa / Cartas / Rol / Dados
      if (/(juegos? de mesa|boardgames?|catan|monopoly|carcassonne|virus|dixit|poker|cartas|baraja|ajedrez|tablero|rol\b|dados|partida de cartas)/i.test(text)) {
        return 'boardgame-card';
      }

      // 6. Parque de Atracciones / Feria / Montana Rusa
      if (/(parque de atracciones|portaventura|warner|terra mitica|disney|feria|montana rusa|tiovivo|noria|autos de choque|atracciones|adrenalina|looping)/i.test(text)) {
        return 'theme-park';
      }

      // 7. Beach Club / Playa / Cala / Cama Balinesa / Costa
      if (/(playa|cala\b|beach club|chiringuito|cama balinesa|tomar el sol|bano en el mar|hamaca|orilla|costa|brisa marina|mar azul)/i.test(text)) {
        return 'beach-club';
      }

      // 8. Karaoke / Cantar / Microfono / Dueto
      if (/(karaoke|cantar|microfono|micro abierto|dueto|cantar juntos|afinador|estribillo)/i.test(text)) {
        return 'karaoke-lounge';
      }

      // 9. Cafeteria / Brunch / Cafe de Especialidad / Merienda
      if (/(cafeteria|cafe\b|brunch|merienda|tarta|cafe de especialidad|croissant|crepes?|gofres?|churros|tostadas|pancakes|smoothie|bolleria|desayuno)/i.test(text)) {
        return 'brunch-cafe';
      }

      // 10. Golf / Green Fee / Campo de golf / Pitch & Putt / Hoyo 19
      if (/(golf|green fee|pitch & putt|putting|fairway|caddie|hoyo 19|club de campo|birdie|tee de salida|scramble|hoyo|putt)/i.test(text)) {
        return 'golf-scorecard';
      }

      // 11. Karts / Karting / Gran Premio / Circuito de velocidad
      if (/(kart|karts|karting|paddock|gran prix|grand prix|pole position|pit lane|circuito|vuelta rapida|bandera a cuadros|quad|formula 1|f1\b|motor\b|tandas)/i.test(text)) {
        return 'karting-pass';
      }

      // 12. Cine clasico en sala / cartelera / palomitas de cine (taquilla real)
      if (/(cine\b|cinesa|neocine|yelmo|kinepolis|taquilla|sala 3d|imax|butaca|palacio cinematogr|cartelera)/i.test(text)) {
        return 'cinema-ticket';
      }

      // 13. Acuario / Oceanografico / Mundo marino / Zoo / Safari
      if (/(acuario|aquarium|oceanogr|bioparc|faunia|delfinario|zoo|safari|vida marina|tiburones|arrecife|peces|mantas)/i.test(text)) {
        return 'aquarium-pass';
      }

      // 14. Concierto / Festival / Musica en vivo / Teatro musical
      if (/(concierto|festival|musica|directo|acustico|dj|recital|banda|rock|pop|indie|teatro|musical|auditorio|conciertazo|fiesta|discoteca|baile|live tour|stage)/i.test(text)) {
        return 'vip-backstage';
      }

      // 15. Escape Room / Misterio / Espionaje / Laser Tag / Accion
      if (/(escape|misterio|enigma|acertijo|candado|cluedo|laser|laser tag|paintball|tirolina|mision|secreto|agente|detective|investigacion|terror|fantasma|pista secreta)/i.test(text)) {
        return 'secret-dossier';
      }

      // 16. Spa / Wellness / Balneario / Termal
      if (/(spa|termal|termas|masaje|balneario|circuito termal|sauna|jacuzzi|relax|bienestar|desconexion|yoga|meditacion|hidromasaje|talaso|hammam|zen)/i.test(text)) {
        return 'spa-voucher';
      }

      // 17. Bolera / Arcade / Billar / Recreativos retro
      if (/(bolera|bolos|strike|arcade|recreativos|billar|dardos|air hockey|pinball|futbolin|gaming retro|lanes|bolos americanos)/i.test(text)) {
        return 'arcade-scorecard';
      }

      // 18. Vino / Bodega / Cata / Sumiller / Cerveza artesana
      if (/(vino|bodega|cata|sommelier|sumiller|copa|barrica|degustacion|maridaje|quesos|jamon|cerveza artesana|coctel|vermut|ginebra)/i.test(text)) {
        return 'wine-reserve';
      }

      // 19. Pelicula o Serie en sofa / Streaming en casa
      if (mode === 'movies' || /(pelicula|peli|serie|estreno|filmaffinity|netflix|hbo|max|prime video|disney\+|movistar\+|filmin|sofa|maraton de series)/i.test(text)) {
        return 'streaming-ticket';
      }

      // 20. Vuelos / Viajes / Escapadas / Aeropuertos
      if (/(vuelo|viaje|escapada|avion|aeropuerto|hotel|resort|tren|ave|maleta|paris|roma|londres|crucero|billete|embarque)/i.test(text)) {
        return 'boarding-pass';
      }

      // 21. Naturaleza / Senderismo / Aire libre / Mirador
      if (/(senderismo|ruta|montana|picnic|parque|naturaleza|bosque|mirador|bici|kayak|paddle|surf|acampada|trekking|camping)/i.test(text)) {
        return 'nature-permit';
      }

      // 22. Atardecer / Romantico / Helado al paseo
      if (/(atardecer|puesta de sol|puesta del sol|golden hour|estrellas|constelaciones|paseo romantico|helado|velas|romantico)/i.test(text)) {
        return 'sunset-postcard';
      }

      // 23. Arte / Museos / Exposiciones culturales
      if (/(museo|exposicion|galeria|arte|escultura|cuadros|ceramica|alfareria|pintura|taller creativo|historia|exhibicion)/i.test(text)) {
        return 'gallery-pass';
      }

      // 24. Cocinar en casa / Atelier
      if (/(cocinar|receta|sushi en casa|pasta casera|reposteria|tarta casera|chef|masterchef|cocinillas|hornear)/i.test(text)) {
        return 'chef-recipe';
      }

      // 25. Comida / Restaurantes (Modo food con gastronomia explicita)
      if (/(cena|comida|comer|almuerzo|restaurante|pizza|burger|hamburguesa|popeyes|kfc|mcdonald|burger king|unica|goiko|tacos|mexicano|sushi|asiatico|italiano|asador|\bbar\b|\bbars\b|tapas|poke|ramen|kebab|pollo|patatas|marisqueria|buffet|gastronom)/i.test(text)) {
        return 'thermal-receipt';
      }
      if (mode === 'food' && (!name || /(plato|degustacion|menu|picar|tapeo)/i.test(text))) {
        return 'thermal-receipt';
      }

      // 26. Para cualquier plan no catalogado: Motor Bespoke Procedural (NUNCA mas pasaporte generico)
      return 'bespoke-signature';
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
      } else if (archetype === 'golf-scorecard' || lowerId.includes('golf') || lowerName.includes('golf')) {
        archetype = 'golf-scorecard';
        venueAddress = 'Royal Duo Golf & Country Club - Championship Course';
      } else if (archetype === 'karting-pass' || lowerId.includes('kart') || lowerName.includes('kart')) {
        archetype = 'karting-pass';
        venueAddress = 'Speedway Karting Circuit - Paddock Duo';
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
      const hideActions = !!options.hideActions;
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
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#14080c] border border-amber-500/40 text-amber-100 p-5 select-none text-left ticket-scallop-edges">
              <div class="foil-glare absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"></div>
              <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px]"></div>

              <div class="relative border-2 border-amber-500/50 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-[#1c0d12] via-[#12070a] to-[#1a0a0f] shadow-inner">
                <!-- Art Deco Ornamental Corners -->
                <svg class="absolute top-2 left-2 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M2 13V2h11M2 2l10 10M6 2v4H2M2 6h4"/>
                </svg>
                <svg class="absolute top-2 right-2 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 13V2H11M22 2L12 12M18 2v4h4M22 6h-4"/>
                </svg>
                <svg class="absolute bottom-2 left-2 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M2 11v11h11M2 22l10-10M6 22v-4H2M2 18h4"/>
                </svg>
                <svg class="absolute bottom-2 right-2 w-4 h-4 text-amber-400/80 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 11v11H11M22 22L12 12M18 22v-4h4M22 18h-4"/>
                </svg>

                <!-- Marquee Header -->
                <div class="text-center pb-3 border-b border-amber-500/30">
                  <div class="flex items-center justify-center gap-1.5 mb-1 text-amber-400">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <p class="font-cinzel text-[10px] tracking-[0.25em] font-bold uppercase">
                      GRAN PALACIO CINEMATOGRÁFICO DUO
                    </p>
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <h2 class="font-cinzel text-2xl sm:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-0.5">
                    ADMIT TWO
                  </h2>
                  <p class="text-[11px] font-special text-amber-300/85 mt-0.5">
                    Pase de Gala para <strong class="text-amber-200 font-semibold">${escapeHtml(pass.coupleNames)}</strong>
                  </p>
                </div>

                <div class="py-3 space-y-2.5">
                  <div class="flex items-center justify-between text-xs font-mono text-amber-300 px-3 py-1.5 bg-amber-950/60 rounded-lg border border-amber-500/30">
                    <span>SALA: <strong class="text-amber-100 font-sans font-bold">04 DOLBY CINEMA</strong></span>
                    <span>FILA: <strong class="text-amber-100 font-sans font-bold">07 VIP</strong></span>
                    <span>BUTACAS: <strong class="text-amber-100 font-sans font-bold">14 & 15</strong></span>
                  </div>

                  <div>
                    <span class="text-[9px] font-cinzel text-amber-400/80 tracking-widest uppercase block">PELÍCULA / CARTELERA DE ESTRENO:</span>
                    <h3 class="text-base sm:text-lg font-black text-white font-cinzel tracking-tight leading-snug truncate">${escapeHtml(pass.name)}</h3>
                  </div>

                  <!-- Format Badge & Concession Perk (Zero Emojis!) -->
                  <div class="flex items-center justify-center gap-2 py-0.5">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-[9px] font-mono text-amber-300 uppercase tracking-wider">
                      <svg class="w-3 h-3 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                        <line x1="7" y1="2" x2="7" y2="22"/>
                        <line x1="17" y1="2" x2="17" y2="22"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <line x1="2" y1="7" x2="7" y2="7"/>
                        <line x1="2" y1="17" x2="7" y2="17"/>
                        <line x1="17" y1="17" x2="22" y2="17"/>
                        <line x1="17" y1="7" x2="22" y2="7"/>
                      </svg>
                      <span>70MM • DOLBY ATMOS</span>
                    </div>

                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-[9px] font-mono text-amber-300 uppercase tracking-wider">
                      <svg class="w-3 h-3 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l1.5 12h9L18 9H6z"/>
                        <path d="M9 9v12M12 9v12M15 9v12"/>
                        <path d="M6 9a3 3 0 0 1 3-3 3 3 0 0 1 3 2 3 3 0 0 1 3-2 3 3 0 0 1 3 3"/>
                      </svg>
                      <span>BUTACAS RECLINABLES & PALOMITAS</span>
                    </div>
                  </div>

                  <!-- Perforation Line -->
                  <div class="relative my-2.5 flex items-center justify-center">
                    <div class="w-full border-b-2 border-dashed border-amber-500/40"></div>
                    <span class="absolute bg-[#15090d] px-2.5 text-[9px] font-special text-amber-400/90 tracking-widest uppercase">
                      TALÓN DE BUTACA DESPRENDIBLE
                    </span>
                  </div>

                  <!-- Perforated Stub Section -->
                  <div class="pt-1 flex items-end justify-between">
                    <div>
                      <div class="text-[9px] font-special text-amber-400/70 uppercase">№ DE SERIE / REF</div>
                      <div class="text-sm font-cinzel font-bold text-amber-300 tracking-wider">№ ${pass.ticketNum}-CINE</div>
                      <div class="text-[9px] text-amber-400/70 font-mono">FECHA: ${pass.date} • 21:30 H</div>
                    </div>
                    <div class="w-32">
                      ${this.getBarcodeSvg('#f59e0b')}
                    </div>
                  </div>
                </div>

                <div class="text-center pt-2 border-t border-amber-500/20 text-[9px] font-cinzel tracking-widest text-amber-400/60 uppercase">
                  EXCLUSIVO PARA LA APP DUO • ADMISIÓN GARANTIZADA • CINE VINTAGE ARCHIVE
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
                // ----------------------------------------------------
        // STADIUM MATCH TICKET (FUTBOL / BASKET / MATCH DAY)
        // ----------------------------------------------------
// ----------------------------------------------------
        // STADIUM MATCH TICKET (FUTBOL / BASKET / MATCH DAY)
        // ----------------------------------------------------
                // ----------------------------------------------------
        // 1. STADIUM MATCH TICKET (FUTBOL / BASKET / MATCH DAY)
        // Silueta fisica alargada de torniquete con talon lateral perforado
        // ----------------------------------------------------
        case 'stadium-ticket':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] stadium-ticket-silhouette stadium-grass text-white select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] flex flex-row overflow-hidden border border-emerald-500/40">
              <!-- Zona Principal del Boleto (72% ancho) -->
              <div class="flex-[3] p-5 flex flex-col justify-between relative bg-gradient-to-br from-emerald-950/90 via-[#063826]/95 to-[#022016]/98 pr-7">
                <!-- Cabecera de Competicion Oficial -->
                <div>
                  <div class="flex items-center justify-between pb-2.5 border-b border-emerald-400/30 text-[9px] font-mono tracking-widest uppercase">
                    <div class="flex items-center gap-2 font-bold text-emerald-300">
                      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>MATCH DAY OFFICIAL // PASS NO. ${escapeHtml(pass.ticketNum)}</span>
                    </div>
                    <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">TORNIQUETE OK</span>
                  </div>

                  <!-- Titulo del Partido con Fuente Deportiva Gruesa Montserrat -->
                  <div class="mt-3">
                    <span class="text-[8px] font-mono uppercase text-emerald-400/80 tracking-widest block">GRAN FINAL DUO LEAGUE</span>
                    <h3 class="text-xl font-black uppercase tracking-tight text-white font-montserrat leading-tight drop-shadow-md">
                      ${escapeHtml(pass.name)}
                    </h3>
                    <p class="text-[10px] text-emerald-200/80 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
                  </div>
                </div>

                <!-- Vector Art: Estadio & Balon con Focos de Iluminacion -->
                <div class="my-1 py-1 relative">
                  <svg viewBox="0 0 280 88" class="w-full h-20 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="stdLightL" x1="0%" y1="0%" x2="60%" y2="100%">
                        <stop offset="0%" stop-color="#34d399" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
                      </linearGradient>
                      <linearGradient id="stdLightR" x1="100%" y1="0%" x2="40%" y2="100%">
                        <stop offset="0%" stop-color="#34d399" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
                      </linearGradient>
                      <radialGradient id="stdBall" cx="35%" cy="30%" r="65%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="55%" stop-color="#cbd5e1"/>
                        <stop offset="100%" stop-color="#475569"/>
                      </radialGradient>
                    </defs>
                    <!-- Focos y luces cruzadas -->
                    <polygon points="10,0 80,75 25,75" fill="url(#stdLightL)"/>
                    <polygon points="270,0 200,75 255,75" fill="url(#stdLightR)"/>
                    <circle cx="10" cy="2" r="3" fill="#a7f3d0"/>
                    <circle cx="270" cy="2" r="3" fill="#a7f3d0"/>

                    <!-- Grada y Cesped -->
                    <path d="M20 75 Q140 50 260 75 L280 85 L0 85 Z" fill="#044e33" stroke="#059669" stroke-width="1"/>
                    <ellipse cx="140" cy="68" rx="80" ry="12" fill="#065f46" stroke="#34d399" stroke-width="1.2"/>
                    <line x1="140" y1="56" x2="140" y2="80" stroke="#a7f3d0" stroke-width="1" stroke-dasharray="2 2"/>

                    <!-- Porteria Vectorial -->
                    <path d="M115 64 L115 54 L165 54 L165 64" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M115 54 L123 49 L157 49 L165 54" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>

                    <!-- Balon Oficial 3D en Vuelo hacia la Red -->
                    <circle cx="195" cy="42" r="14" fill="url(#stdBall)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))"/>
                    <!-- Cascos de balon de futbol -->
                    <polygon points="195,36 199,39 197,44 193,44 191,39" fill="#0f172a"/>
                    <polygon points="199,39 204,39 206,43 202,46 197,44" fill="#334155"/>
                    <polygon points="191,39 186,39 184,43 188,46 193,44" fill="#334155"/>
                    <line x1="195" y1="36" x2="195" y2="30" stroke="#0f172a" stroke-width="0.8"/>
                    <line x1="197" y1="44" x2="196" y2="52" stroke="#0f172a" stroke-width="0.8"/>
                    <line x1="193" y1="44" x2="194" y2="52" stroke="#0f172a" stroke-width="0.8"/>
                  </svg>
                </div>

                <!-- Numeros Gigantes de Grada / Fila / Asiento (Space Grotesk & Montserrat) -->
                <div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/60 border border-emerald-400/30 backdrop-blur-sm">
                  <div class="text-center">
                    <span class="block text-[7.5px] font-mono uppercase text-emerald-400/80 tracking-wider">GRADA</span>
                    <span class="text-xl font-black font-space text-white tracking-tighter">04-NORTE</span>
                  </div>
                  <div class="text-center border-x border-emerald-500/30">
                    <span class="block text-[7.5px] font-mono uppercase text-emerald-400/80 tracking-wider">FILA</span>
                    <span class="text-xl font-black font-space text-emerald-300 tracking-tighter">F-12</span>
                  </div>
                  <div class="text-center">
                    <span class="block text-[7.5px] font-mono uppercase text-emerald-400/80 tracking-wider">BUTACA</span>
                    <span class="text-xl font-black font-space text-amber-300 tracking-tighter">VIP-07</span>
                  </div>
                </div>

                <!-- Footer Izquierdo: Pareja & Fecha -->
                <div class="flex items-center justify-between text-[10px] font-mono text-emerald-200/90 pt-2 border-t border-emerald-500/20">
                  <span>TITULARES: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></span>
                  <span class="font-bold text-amber-300">${escapeHtml(pass.date)}</span>
                </div>
              </div>

              <!-- Linea Divisoria Perforada Vertical con Muescas -->
              <div class="w-0 relative flex flex-col justify-between items-center z-20">
                <div class="absolute -top-3 w-6 h-6 rounded-full bg-[#050507] border border-emerald-500/40 -translate-x-1/2"></div>
                <div class="h-full border-r-2 border-dashed border-emerald-400/50"></div>
                <div class="absolute -bottom-3 w-6 h-6 rounded-full bg-[#050507] border border-emerald-500/40 -translate-x-1/2"></div>
              </div>

              <!-- Talon Lateral Desprendible (Stub Derecho - 28% ancho) -->
              <div class="w-28 bg-[#032014] p-3 flex flex-col justify-between items-center text-center relative border-l border-emerald-500/30">
                <div class="w-full">
                  <span class="text-[7px] font-mono text-emerald-400/80 block uppercase tracking-widest">TALÓN</span>
                  <span class="text-[10px] font-black font-space text-emerald-300 block">CONTROL</span>
                  <div class="my-2 p-1 bg-black/40 rounded border border-emerald-500/30">
                    <span class="text-[7px] font-mono text-neutral-400 block">SECTOR</span>
                    <span class="text-sm font-black font-space text-white">N-04</span>
                  </div>
                </div>

                <!-- Codigo de Barras Vertical en el Talon -->
                <div class="py-2 transform -rotate-90 origin-center my-6">
                  <div class="w-28 opacity-90">
                    ${this.getBarcodeSvg('#10b981')}
                  </div>
                </div>

                <div class="w-full text-center">
                  <span class="text-[6.5px] font-mono text-emerald-400/70 uppercase block">DESPRENDER EN</span>
                  <span class="text-[8px] font-mono font-bold text-amber-300 uppercase block tracking-wider">PUERTA 12</span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 2. RACKET CLUB (PADEL & TENIS COURT SCORECARD)
        // Tablilla oficial de club rigida con ranura troquelada superior y cuadricula tecnica
        // ----------------------------------------------------
        case 'racket-club':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] racket-tab-silhouette court-blue text-white select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] flex flex-col justify-between p-5 border border-sky-400/40">
              <!-- Ranura Ovalada Troquelada Superior para Lanyard -->
              <div class="w-full flex justify-center -mt-1 mb-2">
                <div class="w-20 h-3 rounded-full bg-[#050507] border-2 border-sky-300/50 shadow-inner"></div>
              </div>

              <!-- Cabecera Oficial en Relieve Tecnico (JetBrains Mono) -->
              <div class="border-b-2 border-sky-400/40 pb-2 flex justify-between items-center font-mono">
                <div>
                  <div class="flex items-center gap-1.5 text-sky-300 text-[10px] font-black tracking-widest uppercase">
                    <span class="w-2 h-2 bg-amber-400 rounded-sm transform rotate-45"></span>
                    <span>FEDERACIÓN DUO PÁDEL &amp; TENIS</span>
                  </div>
                  <span class="text-[7.5px] text-sky-200/70 tracking-wider">REGISTRO OFICIAL DE PISTA // LICENCIA ${escapeHtml(pass.ticketNum)}</span>
                </div>
                <div class="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-400/40 text-amber-300 font-mono text-[9px] font-bold">
                  PISTA 01 CENTRAL
                </div>
              </div>

              <!-- Titulo del Torneo & Ubicacion -->
              <div class="my-1.5">
                <h3 class="text-lg font-black text-white font-space tracking-tight uppercase leading-tight">
                  ${escapeHtml(pass.name)}
                </h3>
                <p class="text-[9.5px] text-sky-200/80 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
              </div>

              <!-- Ilustracion Vectorial: Palas de Padel Perforadas y Pelota Optic Yellow -->
              <div class="relative my-1">
                <svg viewBox="0 0 300 95" class="w-full h-20 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="racketBallGlow" cx="35%" cy="30%" r="65%">
                      <stop offset="0%" stop-color="#fef08a"/>
                      <stop offset="55%" stop-color="#bef264"/>
                      <stop offset="100%" stop-color="#65a30d"/>
                    </radialGradient>
                    <linearGradient id="palaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#1e293b"/>
                      <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                  </defs>
                  <!-- Pista de Tenis / Padel en perspectiva con red -->
                  <polygon points="20,85 280,85 240,45 60,45" fill="#0284c7" opacity="0.3" stroke="#38bdf8" stroke-width="1"/>
                  <line x1="150" y1="45" x2="150" y2="85" stroke="#ffffff" stroke-width="1.2"/>
                  <!-- Red central -->
                  <line x1="40" y1="65" x2="260" y2="65" stroke="#ffffff" stroke-width="2"/>
                  <line x1="40" y1="68" x2="260" y2="68" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2"/>

                  <!-- Pala Izquierda P1 (Azul/Carbono con taladros) -->
                  <g transform="translate(75, 42) rotate(-25)">
                    <rect x="0" y="25" width="6" height="22" rx="2" fill="#38bdf8"/>
                    <rect x="-1" y="40" width="8" height="3" rx="1" fill="#facc15"/>
                    <ellipse cx="3" cy="12" rx="15" ry="18" fill="url(#palaGrad1)" stroke="#38bdf8" stroke-width="1.5"/>
                    <circle cx="-3" cy="6" r="1.5" fill="#38bdf8"/>
                    <circle cx="3" cy="6" r="1.5" fill="#38bdf8"/>
                    <circle cx="9" cy="6" r="1.5" fill="#38bdf8"/>
                    <circle cx="-3" cy="12" r="1.5" fill="#38bdf8"/>
                    <circle cx="3" cy="12" r="1.5" fill="#facc15"/>
                    <circle cx="9" cy="12" r="1.5" fill="#38bdf8"/>
                    <circle cx="-3" cy="18" r="1.5" fill="#38bdf8"/>
                    <circle cx="3" cy="18" r="1.5" fill="#38bdf8"/>
                    <circle cx="9" cy="18" r="1.5" fill="#38bdf8"/>
                  </g>

                  <!-- Pala Derecha P2 (Coral/Carbono con taladros) -->
                  <g transform="translate(225, 42) rotate(25)">
                    <rect x="-6" y="25" width="6" height="22" rx="2" fill="#fb7185"/>
                    <rect x="-7" y="40" width="8" height="3" rx="1" fill="#facc15"/>
                    <ellipse cx="-3" cy="12" rx="15" ry="18" fill="url(#palaGrad1)" stroke="#fb7185" stroke-width="1.5"/>
                    <circle cx="-9" cy="6" r="1.5" fill="#fb7185"/>
                    <circle cx="-3" cy="6" r="1.5" fill="#fb7185"/>
                    <circle cx="3" cy="6" r="1.5" fill="#fb7185"/>
                    <circle cx="-9" cy="12" r="1.5" fill="#fb7185"/>
                    <circle cx="-3" cy="12" r="1.5" fill="#facc15"/>
                    <circle cx="3" cy="12" r="1.5" fill="#fb7185"/>
                    <circle cx="-9" cy="18" r="1.5" fill="#fb7185"/>
                    <circle cx="-3" cy="18" r="1.5" fill="#fb7185"/>
                    <circle cx="3" cy="18" r="1.5" fill="#fb7185"/>
                  </g>

                  <!-- Pelota Optic Yellow Oficial Brillante al Centro -->
                  <circle cx="150" cy="40" r="10" fill="url(#racketBallGlow)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"/>
                  <path d="M143 35 Q150 40 143 45" stroke="#ffffff" stroke-width="1.2" fill="none"/>
                  <path d="M157 35 Q150 40 157 45" stroke="#ffffff" stroke-width="1.2" fill="none"/>
                </svg>
              </div>

              <!-- Cuadricula Tecnica de Sets y Juegos (Estilo Tablilla Arbitro en JetBrains Mono) -->
              <div class="p-2.5 rounded-xl bg-black/75 border border-sky-400/40 font-mono shadow-inner">
                <div class="flex justify-between items-center pb-1 mb-1 border-b border-sky-500/30 text-[8px] text-sky-300">
                  <span class="font-bold">TARJETA OFICIAL DE PUNTUACIÓN</span>
                  <span class="text-amber-300 font-bold">MATCH WON // TIE BREAK</span>
                </div>
                <table class="w-full text-center text-[10px]">
                  <thead>
                    <tr class="text-neutral-400 text-[8px] uppercase">
                      <th class="text-left font-normal py-0.5">DUPLA / JUGADORES</th>
                      <th class="px-2 font-normal">SET 1</th>
                      <th class="px-2 font-normal">SET 2</th>
                      <th class="px-2 font-normal">SET 3</th>
                      <th class="px-2 font-bold text-amber-300">RES</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-sky-900/40">
                    <tr>
                      <td class="text-left font-bold text-sky-200 py-1 truncate max-w-[130px]">${escapeHtml(pass.coupleNames)}</td>
                      <td class="font-bold text-white">6</td>
                      <td class="font-bold text-white">4</td>
                      <td class="font-bold text-emerald-300">7<sup class="text-[7px]">5</sup></td>
                      <td class="font-black text-amber-400">WIN</td>
                    </tr>
                    <tr class="opacity-70">
                      <td class="text-left text-neutral-400 py-1">RIVALES DUO TOUR</td>
                      <td>4</td>
                      <td>6</td>
                      <td>6<sup class="text-[7px]">3</sup></td>
                      <td class="text-neutral-500">2ND</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Footer de Arbitraje y Codigo de Barras de Tablilla -->
              <div class="pt-2 border-t border-sky-400/30 flex items-center justify-between font-mono text-[9px]">
                <div class="w-28 opacity-85">
                  ${this.getBarcodeSvg('#38bdf8')}
                </div>
                <div class="text-right">
                  <span class="text-[7.5px] text-sky-300 block uppercase">ARBITRO PRINCIPAL</span>
                  <span class="text-amber-300 font-bold">ACTA CERTIFICADA &bull; DUO WPT</span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 3. FITNESS PASS (DORSAL OFICIAL MARATHON & GYM VIP)
        // Silueta rectangular Tyvek con 4 perforaciones circulares e imperdibles 3D
        // ----------------------------------------------------
        case 'fitness-pass':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] rounded-none bib-fiber text-slate-900 select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] flex flex-col justify-between p-6 border-2 border-slate-300">
              <!-- 4 Agujeros en las esquinas con 4 Imperdibles 3D Metálicos Reales -->
              <!-- Superior Izquierda -->
              <div class="absolute top-2 left-2 z-30 pointer-events-none">
                <div class="w-4 h-4 rounded-full bg-[#050507] border-2 border-slate-400 shadow-inner"></div>
                <svg class="absolute -top-1 -left-1 w-8 h-8 text-slate-400 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l14-7v4l-14 7v-4z"/><circle cx="19" cy="7" r="2" fill="#94a3b8"/></svg>
              </div>
              <!-- Superior Derecha -->
              <div class="absolute top-2 right-2 z-30 pointer-events-none">
                <div class="w-4 h-4 rounded-full bg-[#050507] border-2 border-slate-400 shadow-inner"></div>
                <svg class="absolute -top-1 -right-1 w-8 h-8 text-slate-400 drop-shadow-md transform -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l14-7v4l-14 7v-4z"/><circle cx="19" cy="7" r="2" fill="#94a3b8"/></svg>
              </div>
              <!-- Inferior Izquierda -->
              <div class="absolute bottom-2 left-2 z-30 pointer-events-none">
                <div class="w-4 h-4 rounded-full bg-[#050507] border-2 border-slate-400 shadow-inner"></div>
                <svg class="absolute -bottom-1 -left-1 w-8 h-8 text-slate-400 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l14-7v4l-14 7v-4z"/><circle cx="19" cy="7" r="2" fill="#94a3b8"/></svg>
              </div>
              <!-- Inferior Derecha -->
              <div class="absolute bottom-2 right-2 z-30 pointer-events-none">
                <div class="w-4 h-4 rounded-full bg-[#050507] border-2 border-slate-400 shadow-inner"></div>
                <svg class="absolute -bottom-1 -right-1 w-8 h-8 text-slate-400 drop-shadow-md transform -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l14-7v4l-14 7v-4z"/><circle cx="19" cy="7" r="2" fill="#94a3b8"/></svg>
              </div>

              <!-- Banda Superior de Competicion Oficial -->
              <div class="bg-rose-600 -mx-6 -mt-6 px-6 py-2 flex justify-between items-center text-white">
                <div class="flex items-center gap-2 font-montserrat font-black text-xs tracking-wider uppercase">
                  <span class="w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping"></span>
                  <span>DUO MARATHON &amp; FITNESS TOUR</span>
                </div>
                <span class="font-mono text-[9px] font-bold bg-black/40 px-2 py-0.5 rounded tracking-widest">CATEGORÍA PAREJAS</span>
              </div>

              <!-- Titulo del Desafio / Evento -->
              <div class="mt-3 text-center">
                <h3 class="text-base font-black text-slate-900 font-montserrat uppercase tracking-tight">
                  ${escapeHtml(pass.name)}
                </h3>
                <p class="text-[10px] text-slate-600 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
              </div>

              <!-- NUMERO DE DORSAL COLOSAL CON FUENTE STENCIL / IMPACTO (#DUO-01) -->
              <div class="my-2 py-1 text-center bg-white/90 border-y-4 border-slate-900 shadow-sm relative">
                <div class="text-[9px] font-mono font-bold tracking-widest text-rose-600 uppercase">BIB NUMBER // OFICIAL</div>
                <div class="text-6xl font-black font-montserrat tracking-tighter text-slate-950 leading-none py-1">
                  #DUO-01
                </div>
                <div class="text-xs font-mono font-bold text-slate-700 tracking-wider">
                  ${escapeHtml(pass.coupleNames)}
                </div>
              </div>

              <!-- Perfil Altimetrico y Electrocardiograma SVG -->
              <div class="p-2 bg-slate-100/90 rounded border border-slate-300">
                <div class="flex justify-between items-center text-[7.5px] font-mono text-slate-500 mb-0.5">
                  <span>PERFIL ALTIMÉTRICO + RITMO CARDÍACO</span>
                  <span class="text-rose-600 font-bold">10.0 KM COMPLETED</span>
                </div>
                <svg viewBox="0 0 280 40" class="w-full h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Perfil de montanya / desnivel -->
                  <path d="M0 35 L40 28 L90 32 L140 15 L190 22 L240 8 L280 30 L280 40 L0 40 Z" fill="#e2e8f0"/>
                  <path d="M0 35 L40 28 L90 32 L140 15 L190 22 L240 8 L280 30" stroke="#64748b" stroke-width="1.5"/>
                  <!-- ECG Ritmo Cardiaco superpuesto -->
                  <path d="M0 20 L50 20 L60 8 L70 32 L80 14 L90 24 L100 20 L160 20 L170 5 L180 35 L190 12 L200 20 L280 20" stroke="#e11d48" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </div>

              <!-- Chips RFID Laterales & Codigo de Cronometraje Tyvek -->
              <div class="pt-2 border-t-2 border-dashed border-slate-300 flex items-center justify-between text-[8px] font-mono">
                <div class="flex items-center gap-1.5">
                  <div class="w-6 h-6 border border-slate-400 rounded bg-slate-200 flex items-center justify-center font-bold text-[7px] text-slate-700">
                    RFID
                  </div>
                  <div>
                    <span class="text-slate-500 block">CHIP CRONO:</span>
                    <strong class="text-slate-900">${escapeHtml(pass.ticketNum)}</strong>
                  </div>
                </div>
                <div class="w-24 opacity-80">
                  ${this.getBarcodeSvg('#0f172a')}
                </div>
                <div class="text-right">
                  <span class="text-slate-500 block">TIEMPO FINAL:</span>
                  <strong class="text-rose-600 text-[10px] font-black">00:48:12 PB</strong>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 4. GAMER PASS (CARTUCHO RETRO 16-BIT & CO-OP)
        // Silueta plastica de cartucho con bisel superior y contactos dorados inferiores
        // Tipografia 100% pixelada Press Start 2P & VT323
        // ----------------------------------------------------
        case 'gamer-pass':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] gamer-cartridge-silhouette cartridge-body text-amber-200 select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)] flex flex-col justify-between p-5 border-2 border-amber-500/50">
              <!-- Ranura de agarre superior troquelada de cartucho clasico -->
              <div class="w-full flex justify-center -mt-2 mb-2">
                <div class="w-32 h-2.5 rounded bg-[#0a0a0c] border border-amber-600/40 shadow-inner flex items-center justify-around px-2">
                  <span class="w-3 h-0.5 bg-neutral-700"></span>
                  <span class="w-3 h-0.5 bg-neutral-700"></span>
                  <span class="w-3 h-0.5 bg-neutral-700"></span>
                  <span class="w-3 h-0.5 bg-neutral-700"></span>
                </div>
              </div>

              <!-- Pegatina Holografica Central del Cartucho -->
              <div class="p-3.5 rounded-lg bg-gradient-to-b from-[#1e1b4b] via-[#0f172a] to-[#020617] border-2 border-amber-400/60 shadow-2xl relative overflow-hidden">
                <!-- Banner de Consola 16-BIT Duo System en Press Start 2P -->
                <div class="flex justify-between items-center border-b border-amber-400/30 pb-1.5 mb-2">
                  <span class="font-arcade text-[8px] text-amber-300 tracking-wider">DUO-CARTRIDGE 16-BIT</span>
                  <span class="font-vt text-sm text-cyan-400">STEREO SOUND</span>
                </div>

                <!-- Titulo del Juego en Fuente Arcade -->
                <h3 class="font-arcade text-xs text-yellow-300 uppercase leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  ${escapeHtml(pass.name)}
                </h3>
                <div class="font-vt text-xs text-neutral-300 mt-1">${escapeHtml(pass.venueAddress)}</div>

                <!-- Sprite Art & Mandos Retro Co-Op SVG -->
                <div class="my-2 py-1 text-center bg-black/60 rounded border border-amber-500/20">
                  <svg viewBox="0 0 260 70" class="w-full h-16 mx-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Boss Dragon Pixelado y Dos Corazones -->
                    <rect x="30" y="20" width="6" height="6" fill="#ef4444"/>
                    <rect x="36" y="14" width="12" height="6" fill="#ef4444"/>
                    <rect x="36" y="26" width="12" height="6" fill="#ef4444"/>
                    <rect x="48" y="20" width="6" height="6" fill="#ef4444"/>

                    <rect x="70" y="20" width="6" height="6" fill="#ef4444"/>
                    <rect x="76" y="14" width="12" height="6" fill="#ef4444"/>
                    <rect x="76" y="26" width="12" height="6" fill="#ef4444"/>
                    <rect x="88" y="20" width="6" height="6" fill="#ef4444"/>

                    <!-- Mando 1P Azul Cian -->
                    <rect x="130" y="22" width="45" height="24" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2"/>
                    <polygon points="138,34 142,30 142,38" fill="#ffffff"/>
                    <polygon points="146,34 142,30 142,38" fill="#ffffff"/>
                    <circle cx="162" cy="30" r="3" fill="#f43f5e"/>
                    <circle cx="168" cy="36" r="3" fill="#eab308"/>

                    <!-- Mando 2P Rosa Fucsia -->
                    <rect x="190" y="22" width="45" height="24" rx="4" fill="#db2777" stroke="#f472b6" stroke-width="1.2"/>
                    <polygon points="198,34 202,30 202,38" fill="#ffffff"/>
                    <polygon points="206,34 202,30 202,38" fill="#ffffff"/>
                    <circle cx="222" cy="30" r="3" fill="#06b6d4"/>
                    <circle cx="228" cy="36" r="3" fill="#eab308"/>

                    <!-- Texto VS BOSS / CO-OP READY en VT323 -->
                    <text x="130" y="60" fill="#facc15" font-size="10" font-family="'Press Start 2P', monospace">P1+P2 CO-OP</text>
                  </svg>
                </div>

                <!-- Caja de Dialogo RPG con Stats en VT323 -->
                <div class="p-2 rounded bg-black/90 border border-amber-400/50 font-vt text-sm text-neutral-200">
                  <div class="flex justify-between text-cyan-300">
                    <span>PARTY: ${escapeHtml(pass.coupleNames)}</span>
                    <span class="text-yellow-400">LVL: 99</span>
                  </div>
                  <div class="flex justify-between text-xs text-neutral-400 mt-0.5">
                    <span>HP: 9999/9999</span>
                    <span>MP: 777/777</span>
                    <span class="text-emerald-400">STATUS: IN LOVE</span>
                  </div>
                </div>
              </div>

              <!-- Contactos Dorados Inferiores de Cartucho (Edge Connector) -->
              <div class="w-full -mb-4 pt-2">
                <div class="w-full h-5 bg-[#0a0a0c] border-t-2 border-amber-700/60 flex items-center justify-around px-3">
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                  <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 5. BOARDGAME CARD (CARTA MÍTICA TCG & QUEST DE TABLERO)
        // Formato vertical alargado de carta de baraja mágica / Tarot de fantasía
        // Marco gótico ornamentado biselado, tipografía medieval Cinzel y gemas en esquinas
        // ----------------------------------------------------
        case 'boardgame-card':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] tcg-card-silhouette boardgame-parchment text-amber-100 select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)] flex flex-col justify-between p-4 border-2 border-amber-600/70">
              <!-- Gemas de Mana / Atributo en las 4 esquinas del marco gotico -->
              <div class="absolute top-2 left-2 w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-rose-900 border border-amber-300 shadow-[0_0_8px_#f43f5e] z-20 flex items-center justify-center font-cinzel text-[7px] font-black text-white">I</div>
              <div class="absolute top-2 right-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-900 border border-amber-300 shadow-[0_0_8px_#3b82f6] z-20 flex items-center justify-center font-cinzel text-[7px] font-black text-white">V</div>
              <div class="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-green-900 border border-amber-300 shadow-[0_0_8px_#10b981] z-20 flex items-center justify-center font-cinzel text-[7px] font-black text-white">X</div>
              <div class="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-yellow-700 border border-amber-200 shadow-[0_0_8px_#f59e0b] z-20 flex items-center justify-center font-cinzel text-[7px] font-black text-black">XX</div>

              <!-- Marco Gotico Biselado Interior -->
              <div class="h-full border border-amber-500/50 p-3 rounded flex flex-col justify-between bg-gradient-to-b from-[#24130a]/80 via-[#140b06]/90 to-[#24130a]/80">
                <!-- Cabecera de Carta Mitica en Cinzel -->
                <div class="border-b-2 border-amber-600/60 pb-1.5 flex justify-between items-center font-cinzel">
                  <div>
                    <span class="text-[7.5px] tracking-widest text-amber-400 uppercase block font-bold">CARTA DE GREMIO // LENGENDARIA</span>
                    <h3 class="text-sm font-black text-amber-200 uppercase tracking-wider">
                      ${escapeHtml(pass.name)}
                    </h3>
                  </div>
                  <div class="px-2 py-0.5 rounded bg-amber-950/90 border border-amber-400/60 text-amber-300 text-[10px] font-black">
                    MANÁ: 5
                  </div>
                </div>

                <!-- Ilustracion Heraldica Central: Meeple Tallado y Dado D20 Runico -->
                <div class="my-2 p-2 rounded border border-amber-700/50 bg-[#120803] relative overflow-hidden text-center">
                  <svg viewBox="0 0 240 100" class="w-full h-24 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="d20Glow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fbbf24"/>
                        <stop offset="50%" stop-color="#b45309"/>
                        <stop offset="100%" stop-color="#451a03"/>
                      </linearGradient>
                      <linearGradient id="meepleWood" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#d97706"/>
                        <stop offset="100%" stop-color="#78350f"/>
                      </linearGradient>
                    </defs>

                    <!-- Circulo Alquimico Runico de Fondo -->
                    <circle cx="120" cy="50" r="42" stroke="#d97706" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.6"/>
                    <circle cx="120" cy="50" r="36" stroke="#92400e" stroke-width="1"/>

                    <!-- Meeple Tallado en Madera (Izquierda) -->
                    <path d="M75 32 C75 26, 85 26, 85 32 C85 35, 93 37, 98 42 L94 54 L87 49 L87 68 L73 68 L73 49 L66 54 L62 42 C67 37, 75 35, 75 32 Z" fill="url(#meepleWood)" stroke="#fef3c7" stroke-width="1.2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.7))"/>

                    <!-- Dado D20 Icosaedro Sagrado con Numero 20 (Derecha) -->
                    <g transform="translate(145, 24)">
                      <!-- Caras del D20 -->
                      <polygon points="25,0 48,15 48,40 25,52 2,40 2,15" fill="url(#d20Glow)" stroke="#fef3c7" stroke-width="1.2"/>
                      <polygon points="25,0 25,52 2,15" fill="#d97706" opacity="0.4"/>
                      <polygon points="25,0 48,15 25,52" fill="#f59e0b" opacity="0.3"/>
                      <polygon points="25,12 40,38 10,38" fill="#451a03" stroke="#fef3c7" stroke-width="1"/>
                      <text x="25" y="32" fill="#fef3c7" font-size="14" font-weight="bold" font-family="'Cinzel', serif" text-anchor="middle">20</text>
                    </g>

                    <!-- Espadas Cruzadas en la Base -->
                    <line x1="85" y1="88" x2="155" y2="88" stroke="#d97706" stroke-width="1.5"/>
                    <circle cx="120" cy="88" r="3" fill="#fbbf24"/>
                  </svg>
                </div>

                <!-- Descripcion y Flavor Text de Fantasia en Cinzel & Serif -->
                <div class="p-2 rounded bg-black/60 border border-amber-600/30 text-center font-cinzel">
                  <div class="text-[9.5px] font-bold text-amber-300 tracking-wider mb-1">COMPAÑEROS DE GREMIO: ${escapeHtml(pass.coupleNames)}</div>
                  <p class="text-[8.5px] italic text-neutral-300 font-serif leading-relaxed">
                    &ldquo;Cuando la tirada marca victoria crítica, ningún dragón ni obstáculo prevalece contra dos corazones aliados.&rdquo;
                  </p>
                </div>

                <!-- Atributos de Ataque / Defensa en Gemas Inferiores -->
                <div class="pt-2 border-t border-amber-600/40 flex justify-between items-center font-cinzel text-xs">
                  <div class="flex items-center gap-1.5 text-amber-300 font-bold">
                    <span class="w-3 h-3 rounded bg-red-600 text-[8px] flex items-center justify-center text-white">ATK</span>
                    <span>99</span>
                  </div>
                  <span class="text-[8px] text-amber-500/80 uppercase tracking-widest">${escapeHtml(pass.ticketNum)}</span>
                  <div class="flex items-center gap-1.5 text-sky-300 font-bold">
                    <span>99</span>
                    <span class="w-3 h-3 rounded bg-blue-600 text-[8px] flex items-center justify-center text-white">DEF</span>
                  </div>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 6. THEME PARK (GOLDEN VIP LANYARD PASS)
        // Formato credencial de cuello plastificada con solapa troquelada superior y muescas laterales
        // Tipografia electrizante Syne & degradado iridiscente
        // ----------------------------------------------------
        case 'theme-park':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] lanyard-badge-silhouette theme-park-glow text-white select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] flex flex-col justify-between p-6 border-2 border-pink-500/50">
              <!-- Ranura de Cinta Lanyard Troquelada Superior -->
              <div class="w-full flex justify-center -mt-2 mb-2">
                <div class="w-16 h-3 rounded-full bg-[#050507] border-2 border-pink-400/60 shadow-inner"></div>
              </div>

              <!-- Header Electrizante VIP en Fuente Syne -->
              <div class="border-b border-pink-400/40 pb-2 flex justify-between items-center">
                <div class="flex items-center gap-1.5 font-syne font-black text-xs text-pink-300 tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
                  <span>ADRENALINE VIP ACCESS</span>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-[9px] font-mono font-bold tracking-widest uppercase">FAST PASS UNLIMITED</span>
              </div>

              <!-- Titulo del Parque / Atraccion en Syne Colosal -->
              <div class="my-2 text-center">
                <span class="text-[8px] font-mono tracking-widest uppercase text-cyan-300 block">PARQUE TEMÁTICO OFICIAL</span>
                <h3 class="text-2xl font-black font-syne text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-100 to-cyan-200 uppercase leading-tight drop-shadow-lg">
                  ${escapeHtml(pass.name)}
                </h3>
                <p class="text-[10px] text-purple-200/80 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
              </div>

              <!-- Ilustracion Vectorial de Montana Rusa con Celosia e Inversion Looping -->
              <div class="my-1 py-1">
                <svg viewBox="0 0 280 90" class="w-full h-20 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="rollerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#ec4899"/>
                      <stop offset="50%" stop-color="#a855f7"/>
                      <stop offset="100%" stop-color="#06b6d4"/>
                    </linearGradient>
                  </defs>
                  <!-- Estructura de celosia de soporte -->
                  <line x1="30" y1="90" x2="30" y2="30" stroke="#6b21a8" stroke-width="1.5"/>
                  <line x1="70" y1="90" x2="70" y2="10" stroke="#6b21a8" stroke-width="1.5"/>
                  <line x1="140" y1="90" x2="140" y2="45" stroke="#6b21a8" stroke-width="1.5"/>
                  <line x1="220" y1="90" x2="220" y2="25" stroke="#6b21a8" stroke-width="1.5"/>
                  <line x1="30" y1="60" x2="70" y2="30" stroke="#6b21a8" stroke-width="1"/>
                  <line x1="30" y1="30" x2="70" y2="60" stroke="#6b21a8" stroke-width="1"/>
                  <line x1="140" y1="70" x2="220" y2="40" stroke="#6b21a8" stroke-width="1"/>

                  <!-- Rail Principal de Montana Rusa en Curva y Looping -->
                  <path d="M10 50 Q40 5 70 15 T130 75 Q150 90 160 50 Q170 10 190 35 T270 20" stroke="url(#rollerGrad)" stroke-width="3" stroke-linecap="round"/>
                  <path d="M10 54 Q40 9 70 19 T130 79 Q150 94 160 54 Q170 14 190 39 T270 24" stroke="#ffffff" stroke-width="1" stroke-dasharray="2 3" opacity="0.7"/>

                  <!-- Vagon Cohete con los Dos Pasajeros -->
                  <g transform="translate(62, 10) rotate(15)">
                    <rect x="0" y="0" width="18" height="9" rx="3" fill="#f43f5e" stroke="#ffffff" stroke-width="1"/>
                    <circle cx="5" cy="0" r="2.5" fill="#fde047"/>
                    <circle cx="13" cy="0" r="2.5" fill="#fde047"/>
                  </g>
                </svg>
              </div>

              <!-- Insignia Central Iridiscente de Acceso Ilimitado -->
              <div class="p-2.5 rounded-xl bg-purple-950/70 border border-pink-400/40 text-center backdrop-blur-md">
                <span class="text-[7.5px] font-mono uppercase tracking-widest text-pink-300 block">CREDENCIAL DUO EXCLUSIVA</span>
                <span class="text-sm font-black font-syne text-amber-300 uppercase tracking-tight block">
                  ALL ACCESS &bull; SIN COLAS
                </span>
                <span class="text-[9.5px] font-mono text-neutral-300">${escapeHtml(pass.coupleNames)}</span>
              </div>

              <!-- Footer Holografico con Codigo QR/Barras -->
              <div class="pt-2 border-t border-pink-400/30 flex items-center justify-between font-mono text-[9px]">
                <div class="w-28 opacity-85">
                  ${this.getBarcodeSvg('#f43f5e')}
                </div>
                <div class="text-right">
                  <span class="text-[7.5px] text-pink-300 block uppercase">NIVEL ACCESO</span>
                  <span class="text-amber-300 font-bold font-syne">GOLDEN LANYARD</span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 7. BEACH CLUB (DAY PASS BEACH CLUB & CALA MEDITERRÁNEA)
        // Formato tarjeta de lino con franja lateral ancha que simula pulsera festivalera sujeta con broche dorado
        // Tipografia veraniega elegante Playfair Display
        // ----------------------------------------------------
        case 'beach-club':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] rounded-2xl beach-club-azure text-white select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] flex flex-row overflow-hidden border border-cyan-400/40">
              <!-- Franja Lateral Izquierda: Pulsera Festivalera de Tela con Broche Dorado -->
              <div class="w-14 bg-gradient-to-b from-amber-500 via-rose-500 to-cyan-500 p-2 flex flex-col justify-between items-center relative border-r-2 border-amber-300/60 shadow-lg">
                <!-- Broche Metalico Dorado Redondo en la parte superior -->
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 border border-white shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center">
                  <div class="w-2.5 h-2.5 rounded-full bg-amber-900 border border-yellow-200"></div>
                </div>

                <!-- Texto Vertical Tejido en la Pulsera -->
                <div class="transform -rotate-90 origin-center whitespace-nowrap font-mono text-[9px] font-black text-black tracking-widest uppercase my-auto">
                  BEACH &bull; PASS &bull; VIP
                </div>

                <!-- Sello Metalico Inferior -->
                <div class="w-5 h-5 rounded-full bg-amber-400/80 border border-white flex items-center justify-center text-[7px] font-bold text-black font-mono">
                  OK
                </div>
              </div>

              <!-- Cuerpo Principal de Tarjeta de Lino (Playfair Display) -->
              <div class="flex-1 p-5 flex flex-col justify-between bg-gradient-to-br from-[#0c4a6e]/95 via-[#075985]/90 to-[#082f49]/95 text-left">
                <!-- Cabecera de Resort & Sol -->
                <div class="border-b border-cyan-300/30 pb-2 flex justify-between items-center">
                  <div class="font-serif italic text-cyan-200 text-xs">
                    Mediterranean Summer Club
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 text-[8px] font-mono uppercase font-bold">DAY PASS</span>
                </div>

                <!-- Titulo Veraniego en Playfair Display -->
                <div class="my-2">
                  <span class="text-[7.5px] font-mono tracking-widest text-amber-300 uppercase block">RESERVA PRIVADA DE HAMACA</span>
                  <h3 class="text-xl font-bold font-serif text-white leading-tight">
                    ${escapeHtml(pass.name)}
                  </h3>
                  <p class="text-[9.5px] text-cyan-200/80 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
                </div>

                <!-- Ilustracion Vectorial: Sol Dorado, Olas Turquesas & Palmeras -->
                <div class="my-1 py-1">
                  <svg viewBox="0 0 240 85" class="w-full h-20 mx-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#fef08a"/>
                        <stop offset="100%" stop-color="#f59e0b"/>
                      </linearGradient>
                    </defs>
                    <!-- Sol Poniente en el Horizonte -->
                    <circle cx="120" cy="40" r="24" fill="url(#sunGrad)"/>
                    <!-- Rayos tenues -->
                    <line x1="120" y1="10" x2="120" y2="5" stroke="#fde047" stroke-width="1.5"/>
                    <line x1="95" y1="20" x2="90" y2="16" stroke="#fde047" stroke-width="1.5"/>
                    <line x1="145" y1="20" x2="150" y2="16" stroke="#fde047" stroke-width="1.5"/>

                    <!-- Olas Turquesas del Mar -->
                    <path d="M0 55 Q60 45 120 55 T240 55 L240 85 L0 85 Z" fill="#0891b2" opacity="0.6"/>
                    <path d="M0 65 Q60 55 120 65 T240 65 L240 85 L0 85 Z" fill="#0e7490"/>
                    <path d="M0 65 Q60 55 120 65 T240 65" stroke="#ffffff" stroke-width="1.2" opacity="0.8"/>

                    <!-- Hamaca de Playa Duo Minimalista -->
                    <path d="M165 72 L185 58 L200 68" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                    <line x1="172" y1="72" x2="178" y2="63" stroke="#f59e0b" stroke-width="1.5"/>
                    <line x1="192" y1="63" x2="198" y2="72" stroke="#f59e0b" stroke-width="1.5"/>
                  </svg>
                </div>

                <!-- Detalle de la Reserva en Playfair Display -->
                <div class="p-2.5 rounded-xl bg-black/40 border border-cyan-400/30">
                  <div class="flex justify-between items-center text-[9px] font-mono text-cyan-200">
                    <span>PAREJA: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></span>
                    <span class="text-amber-300 font-bold">${escapeHtml(pass.date)}</span>
                  </div>
                  <div class="mt-1 text-[8px] font-serif italic text-neutral-300">
                    Incluye cama balinesa, fruta fresca y cócteles al atardecer frente al mar.
                  </div>
                </div>

                <!-- Footer Codigo de Barras Beach Club -->
                <div class="pt-2 border-t border-cyan-400/20 flex items-center justify-between font-mono text-[9px]">
                  <div class="w-24 opacity-80">
                    ${this.getBarcodeSvg('#22d3ee')}
                  </div>
                  <div class="text-right">
                    <span class="text-[7.5px] text-cyan-300 uppercase block">CAMA BALINESA</span>
                    <span class="text-amber-300 font-bold font-serif">ZONA CALA VIP</span>
                  </div>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 8. KARAOKE LOUNGE (INSIGNIA NEON SYNTHWAVE CABINA VIP)
        // Tarjeta acrilica negra con disco de vinilo sobresaliendo en esquina superior
        // Tipografia neon synthwave, vumetro y microfono vintage Shure 55
        // ----------------------------------------------------
        case 'karaoke-lounge':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] rounded-3xl karaoke-neon text-white select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)] flex flex-col justify-between p-6 border-2 border-pink-500/50 overflow-hidden">
              <!-- Disco de Vinilo Recortado que Sobresale en la Esquina Superior Derecha -->
              <div class="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#0a0a0c] border-4 border-neutral-800 shadow-2xl flex items-center justify-center z-10 pointer-events-none transform rotate-12">
                <!-- Surcos de vinilo -->
                <div class="w-28 h-28 rounded-full border border-neutral-700/60 flex items-center justify-center">
                  <div class="w-20 h-20 rounded-full border border-neutral-700/80 flex items-center justify-center">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center border-2 border-white/50">
                      <div class="w-3 h-3 rounded-full bg-[#050507]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Header Neon Synthwave -->
              <div class="border-b border-pink-500/40 pb-2 flex justify-between items-center relative z-20 pr-20">
                <div class="flex items-center gap-1.5 font-mono text-[9px] text-pink-400 font-bold tracking-widest uppercase">
                  <span class="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]"></span>
                  <span>MIDNIGHT KARAOKE SUITE</span>
                </div>
              </div>

              <!-- Titulo de la Noche de Canto en Fuente Neon -->
              <div class="my-2 relative z-20">
                <span class="text-[8px] font-mono tracking-widest uppercase text-cyan-400 block">PRIVATE BOX 04 // ON AIR</span>
                <h3 class="text-xl font-black font-space text-white uppercase leading-tight drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">
                  ${escapeHtml(pass.name)}
                </h3>
                <p class="text-[9.5px] text-pink-200/80 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
              </div>

              <!-- Ilustracion Vectorial: Microfono Vintage Shure 55 & Vumetro de Sonido -->
              <div class="my-1 py-1 text-center relative z-20">
                <svg viewBox="0 0 240 85" class="w-full h-20 mx-auto drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Microfono Shure 55 Metalico Estilo Elvis -->
                  <g transform="translate(105, 10)">
                    <rect x="5" y="0" width="20" height="32" rx="10" fill="#334155" stroke="#ec4899" stroke-width="1.5"/>
                    <line x1="5" y1="8" x2="25" y2="8" stroke="#ffffff" stroke-width="1"/>
                    <line x1="5" y1="16" x2="25" y2="16" stroke="#ffffff" stroke-width="1"/>
                    <line x1="5" y1="24" x2="25" y2="24" stroke="#ffffff" stroke-width="1"/>
                    <line x1="15" y1="0" x2="15" y2="32" stroke="#ffffff" stroke-width="1.5"/>
                    <!-- Soporte del microfono -->
                    <path d="M0 16 C0 35, 30 35, 30 16" stroke="#94a3b8" stroke-width="2" fill="none"/>
                    <rect x="13" y="35" width="4" height="15" fill="#64748b"/>
                    <rect x="5" y="50" width="20" height="4" rx="2" fill="#475569"/>
                  </g>

                  <!-- Vumetro de Luces Neon Izquierda y Derecha -->
                  <!-- Izquierda -->
                  <rect x="25" y="45" width="6" height="10" rx="1" fill="#10b981"/>
                  <rect x="35" y="40" width="6" height="15" rx="1" fill="#10b981"/>
                  <rect x="45" y="32" width="6" height="23" rx="1" fill="#facc15"/>
                  <rect x="55" y="24" width="6" height="31" rx="1" fill="#facc15"/>
                  <rect x="65" y="15" width="6" height="40" rx="1" fill="#ef4444"/>
                  <!-- Derecha -->
                  <rect x="170" y="15" width="6" height="40" rx="1" fill="#ef4444"/>
                  <rect x="180" y="24" width="6" height="31" rx="1" fill="#facc15"/>
                  <rect x="190" y="32" width="6" height="23" rx="1" fill="#facc15"/>
                  <rect x="200" y="40" width="6" height="15" rx="1" fill="#10b981"/>
                  <rect x="210" y="45" width="6" height="10" rx="1" fill="#10b981"/>
                </svg>
              </div>

              <!-- Puntuacion de Dueto 100/100 Perfect Pitch -->
              <div class="p-2.5 rounded-xl bg-black/70 border border-pink-500/40 relative z-20 flex justify-between items-center">
                <div>
                  <span class="text-[7.5px] font-mono uppercase text-pink-400 block">DUETO DE ORO:</span>
                  <strong class="text-xs text-white font-mono">${escapeHtml(pass.coupleNames)}</strong>
                </div>
                <div class="text-right">
                  <span class="text-[7.5px] font-mono text-cyan-300 block">SCORE FINAL</span>
                  <span class="text-base font-black font-space text-amber-300">100 PTS &bull; PERFECT</span>
                </div>
              </div>

              <!-- Footer Codigo de Barras Neon -->
              <div class="pt-2 border-t border-pink-500/30 flex items-center justify-between font-mono text-[9px] relative z-20">
                <div class="w-24 opacity-90">
                  ${this.getBarcodeSvg('#ec4899')}
                </div>
                <div class="text-right">
                  <span class="text-[7.5px] text-pink-400 uppercase block">SESIÓN PRIVADA</span>
                  <span class="text-cyan-300 font-bold font-mono">CABINA VIP STEREO</span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 9. BRUNCH CAFE (ETIQUETA ARTESANAL HANGTAG & SPECIALTY COFFEE)
        // Formato etiqueta colgante artesanal (hangtag) con esquinas cortadas en bisel diagonal
        // Ojal circular de laton con cuerda de yute saliendo por arriba, textura kraft y Cormorant Garamond
        // ----------------------------------------------------
        case 'brunch-cafe':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] hangtag-silhouette kraft-paper text-amber-100 select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] flex flex-col justify-between p-6 border border-amber-600/50">
              <!-- Ojal Metalico de Laton Superior con Cuerda de Yute -->
              <div class="w-full flex flex-col items-center -mt-3 mb-2">
                <div class="w-1.5 h-6 bg-amber-700/80 rounded-t -mt-2"></div>
                <div class="w-6 h-6 rounded-full bg-[#180d07] border-4 border-amber-500 shadow-md flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-[#050507]"></div>
                </div>
              </div>

              <!-- Cabecera de Tueste Artesanal en Courier Prime -->
              <div class="border-b border-amber-600/40 pb-2 flex justify-between items-center font-mono text-[9px]">
                <div class="text-amber-300 font-bold uppercase tracking-widest">
                  SPECIALTY ROASTER NO. 44
                </div>
                <span class="text-amber-400 font-bold">${escapeHtml(pass.ticketNum)}</span>
              </div>

              <!-- Titulo del Brunch en Tipografia Editorial Cormorant Garamond -->
              <div class="my-2 text-center">
                <span class="text-[8px] font-mono uppercase tracking-widest text-amber-400/80 block">SLOW MORNING RECIPE</span>
                <h3 class="text-2xl font-bold font-cormorant text-amber-100 uppercase tracking-tight leading-tight">
                  ${escapeHtml(pass.name)}
                </h3>
                <p class="text-[10px] text-amber-300/80 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
              </div>

              <!-- Ilustracion Vectorial: Taza de Latte Art en Corazon & Cafetera Chemex -->
              <div class="my-1 py-1">
                <svg viewBox="0 0 240 85" class="w-full h-20 mx-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Cafetera Chemex Filtrado (Izquierda) -->
                  <g transform="translate(60, 8)">
                    <path d="M10 0 L25 25 L5 60 L30 60 L10 25 L25 0 Z" fill="#29160c" stroke="#d97706" stroke-width="1.2"/>
                    <rect x="12" y="22" width="11" height="8" rx="1" fill="#92400e"/>
                    <line x1="17" y1="22" x2="17" y2="30" stroke="#fde047" stroke-width="1"/>
                  </g>

                  <!-- Taza de Porcelana con Plato y Latte Art Corazon (Derecha) -->
                  <g transform="translate(130, 20)">
                    <ellipse cx="30" cy="45" rx="35" ry="8" fill="#1c0f08" stroke="#d97706" stroke-width="1"/>
                    <path d="M10 20 C10 42, 50 42, 50 20 Z" fill="#381e11" stroke="#f59e0b" stroke-width="1.5"/>
                    <path d="M50 24 C58 24, 58 34, 50 34" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
                    <!-- Espuma de Cafe con Corazon de Leche -->
                    <ellipse cx="30" cy="20" rx="18" ry="6" fill="#78350f"/>
                    <path d="M30 18 C26 15, 23 18, 30 23 C37 18, 34 15, 30 18 Z" fill="#fef3c7"/>
                    <!-- Volutas de vapor aromático -->
                    <path d="M25 12 Q23 6 27 2" stroke="#d97706" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
                    <path d="M35 12 Q37 6 33 2" stroke="#d97706" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
                  </g>
                </svg>
              </div>

              <!-- Ficha de Cata y Pareja en Cormorant & Courier -->
              <div class="p-2.5 rounded-lg bg-black/40 border border-amber-600/30 text-center font-mono">
                <div class="text-[9px] text-amber-300 font-bold">INVITADOS: ${escapeHtml(pass.coupleNames)}</div>
                <div class="mt-1 text-[8px] text-amber-200/70 font-cormorant italic text-sm">
                  Notas de cata: Jazmín silvestre, pan brioche tostado y calma infinita.
                </div>
              </div>

              <!-- Sello Artesanal de Barista y Codigo de Barras -->
              <div class="pt-2 border-t border-amber-600/30 flex items-center justify-between font-mono text-[9px]">
                <div class="w-24 opacity-80">
                  ${this.getBarcodeSvg('#d97706')}
                </div>
                <div class="px-2 py-1 rounded border border-amber-500/40 bg-amber-950/60 text-amber-300 text-[8px] font-bold text-center">
                  100% ORGANIC &bull; ROASTED WITH LOVE
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // 10. BESPOKE SIGNATURE (BLACK OBSIDIAN CARD & ROSETÓN GUILLOCHÉ)
        // Tarjeta metalica Obsidian Black Card de lujo con bordes pulidos dorados,
        // tipografia ultra-minimalista Cinzel, roseton matematico Guilloche y chip EMV 3D
        // ----------------------------------------------------
        case 'bespoke-signature':
          frontHtml = `
            <div class="card-face relative w-full h-[520px] rounded-2xl obsidian-card text-amber-100 select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)] flex flex-col justify-between p-6 border border-amber-400/60 overflow-hidden">
              <!-- Hilo de Oro Metalico en el Borde Interior -->
              <div class="absolute inset-1.5 rounded-xl border border-amber-400/30 pointer-events-none"></div>

              <!-- Cabecera de Ultra-Lujo en Tipografia Cinzel -->
              <div class="border-b border-amber-400/30 pb-2.5 flex justify-between items-center font-cinzel relative z-20">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
                  <span class="text-xs font-black tracking-widest text-amber-200 uppercase">DUO PRIVATE VAULT</span>
                </div>
                <span class="text-[9px] tracking-widest text-amber-400 font-bold uppercase">OBSIDIAN NO. ${escapeHtml(pass.ticketNum)}</span>
              </div>

              <!-- Chip EMV Metalico 3D y Contactless de Pago Exclusivo -->
              <div class="flex items-center justify-between my-2 relative z-20">
                <div class="w-12 h-9 rounded bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 border border-amber-200 shadow-md p-1 flex flex-col justify-between">
                  <div class="flex justify-between">
                    <span class="w-3 h-2 border-r border-b border-amber-900/60"></span>
                    <span class="w-3 h-2 border-l border-b border-amber-900/60"></span>
                  </div>
                  <div class="flex justify-between">
                    <span class="w-3 h-2 border-r border-t border-amber-900/60"></span>
                    <span class="w-3 h-2 border-l border-t border-amber-900/60"></span>
                  </div>
                </div>

                <!-- Simbolo Contactless Vectorial -->
                <svg class="w-6 h-6 text-amber-400/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8.5 16.5a5 5 0 0 1 0-9"/>
                  <path d="M12 19a8.5 8.5 0 0 0 0-14"/>
                  <path d="M15.5 21.5a12 12 0 0 0 0-19"/>
                </svg>
              </div>

              <!-- Titulo del Pase Grabado en Orfebreria -->
              <div class="my-1 relative z-20">
                <span class="text-[7.5px] font-mono tracking-widest text-amber-400/80 uppercase block">EXPERIENCIA BESPOKE</span>
                <h3 class="text-xl font-bold font-cinzel text-amber-100 uppercase tracking-wider leading-snug drop-shadow-md">
                  ${escapeHtml(pass.name)}
                </h3>
                <p class="text-[9.5px] text-neutral-400 font-mono mt-0.5">${escapeHtml(pass.venueAddress)}</p>
              </div>

              <!-- Roseton Guilloche Matematico de Alta Seguridad SVG -->
              <div class="my-1 py-1 text-center relative z-20">
                <svg viewBox="0 0 240 85" class="w-full h-20 mx-auto drop-shadow-[0_0_15px_rgba(245,158,11,0.25)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Espirales Guilloche matematicas -->
                  <circle cx="120" cy="42" r="38" stroke="#d4af37" stroke-width="0.8" opacity="0.4"/>
                  <circle cx="120" cy="42" r="30" stroke="#d4af37" stroke-width="0.6" stroke-dasharray="2 3" opacity="0.6"/>
                  <circle cx="120" cy="42" r="22" stroke="#d4af37" stroke-width="0.8" opacity="0.8"/>
                  <!-- Petalos entrelazados de orfebreria -->
                  <path d="M120 12 C135 30, 135 54, 120 72 C105 54, 105 30, 120 12 Z" stroke="#f59e0b" stroke-width="1"/>
                  <path d="M90 42 C108 27, 132 27, 150 42 C132 57, 108 57, 90 42 Z" stroke="#f59e0b" stroke-width="1"/>
                  <circle cx="120" cy="42" r="5" fill="#f59e0b"/>
                </svg>
              </div>

              <!-- Titulares de la Tarjeta Obsidian en Cinzel Minimalista -->
              <div class="p-2.5 rounded-xl bg-black/60 border border-amber-400/30 flex justify-between items-center relative z-20">
                <div>
                  <span class="text-[7px] font-mono uppercase tracking-widest text-amber-400 block">CARDMEMBER SINCE</span>
                  <span class="text-xs font-bold font-cinzel text-white">${escapeHtml(pass.coupleNames)}</span>
                </div>
                <div class="text-right">
                  <span class="text-[7px] font-mono uppercase tracking-widest text-amber-400 block">STATUS</span>
                  <span class="text-xs font-bold font-cinzel text-amber-300">INFINITE LOVE</span>
                </div>
              </div>

              <!-- Footer de Banda Magnetica y Sello de Acuñación -->
              <div class="pt-2 border-t border-amber-400/30 flex items-center justify-between font-mono text-[9px] relative z-20">
                <div class="w-24 opacity-80">
                  ${this.getBarcodeSvg('#d4af37')}
                </div>
                <div class="text-right">
                  <span class="text-[7.5px] text-amber-400/80 uppercase block">AUTHENTIC REALIA</span>
                  <span class="text-amber-200 font-bold font-cinzel">100% BESPOKE VAULT</span>
                </div>
              </div>
            </div>
          `;
          break;

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
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#011424] via-[#022538] to-[#010e1a] border-2 border-cyan-400/50 p-5 aquarium-notched-edges text-cyan-100 text-left select-none">
              <div class="foil-glare absolute inset-0 pointer-events-none opacity-30 mix-blend-color-dodge bg-gradient-to-tr from-cyan-500/10 via-transparent to-teal-400/20"></div>
              <div class="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:18px_18px]"></div>

              <!-- Header Bar -->
              <div class="flex items-center justify-between pb-2 border-b border-cyan-400/30 font-mono text-[10px]">
                <div class="flex items-center gap-2 font-bold text-cyan-300">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping"></span>
                  <span class="tracking-wider">EXPEDICIÓN SUBMARINA • OCEANIC DUO PASS</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-bold tracking-wider">ALL ACCESS 360°</span>
              </div>

              <!-- Hero Majestic Oceanic Manta Ray Vector SVG -->
              <div class="my-2 py-1 text-center relative">
                <svg class="w-28 h-16 mx-auto text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]" viewBox="0 0 160 90" fill="none" stroke="currentColor">
                  <!-- Manta Ray Body & Wings -->
                  <path d="M80 14 C76 8 72 6 68 8 C66 10 67 14 70 16 C55 20 25 32 6 48 C2 51 4 56 9 55 C28 51 60 48 74 61 C76 68 78 78 80 88 C82 78 84 68 86 61 C100 48 132 51 151 55 C156 56 158 51 154 48 C135 32 105 20 90 16 C93 14 94 10 92 8 C88 6 84 8 80 14 Z" 
                        fill="url(#mantaGlowGrad)" stroke="#22d3ee" stroke-width="1.5" stroke-linejoin="round"/>
                  <!-- Cephalic & Wing accents -->
                  <path d="M68 30 C64 40 62 50 70 55" stroke="#67e8f9" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
                  <path d="M92 30 C96 40 98 50 90 55" stroke="#67e8f9" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
                  <!-- Dorsal Ridge -->
                  <path d="M80 20 L80 58" stroke="#a5f3fc" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
                  <defs>
                    <linearGradient id="mantaGlowGrad" x1="80" y1="8" x2="80" y2="88" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#0891b2" stop-opacity="0.85"/>
                      <stop offset="50%" stop-color="#0e7490" stop-opacity="0.5"/>
                      <stop offset="100%" stop-color="#064e3b" stop-opacity="0.2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div class="mb-3 text-center">
                <p class="font-mono text-[9px] text-cyan-400 uppercase tracking-[0.25em]">TÚNEL SUBMARINO DE CRISTAL 360°</p>
                <h3 class="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-teal-200 to-sky-300 uppercase tracking-tight mt-0.5">${escapeHtml(pass.name)}</h3>
                <p class="text-xs text-cyan-200 mt-1 font-sans">Expedición Marina para <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Bathymetric Coordinates & Habitat Grid -->
              <div class="p-2.5 bg-black/45 rounded-xl border border-cyan-500/30 font-mono text-[10px] grid grid-cols-3 gap-1 text-center">
                <div class="border-r border-cyan-500/20">
                  <span class="text-cyan-400/70 text-[8px] block">PROFUNDIDAD</span>
                  <strong class="text-cyan-300">-12.5 M ABISAL</strong>
                </div>
                <div class="border-r border-cyan-500/20">
                  <span class="text-cyan-400/70 text-[8px] block">COORDENADAS</span>
                  <strong class="text-white text-[9px]">39°27'N 0°21'W</strong>
                </div>
                <div>
                  <span class="text-cyan-400/70 text-[8px] block">HÁBITAT</span>
                  <strong class="text-amber-300">ARRECIFE VIVO</strong>
                </div>
              </div>

              <!-- Shark Feeding Encounter Perk (Zero Emojis!) -->
              <div class="my-2.5 p-2 rounded-lg bg-cyan-950/60 border border-cyan-400/30 flex items-center gap-2">
                <svg class="w-4 h-4 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M3 19c6-1 12-7 15-15-7 2-11 8-15 15z" fill="currentColor" fill-opacity="0.25"/>
                  <path d="M2 20c8-1 14-1 20 0"/>
                </svg>
                <div class="text-[9px] font-mono leading-tight">
                  <span class="font-bold text-cyan-200 block uppercase">PASE DE ALIMENTACIÓN DE TIBURONES</span>
                  <span class="text-cyan-400/80">Acceso VIP a pasarela técnica de biólogos</span>
                </div>
              </div>

              <!-- Perforation Bottom Bar with Hydrographic Seal & Barcode -->
              <div class="pt-2 border-t border-dashed border-cyan-400/30 flex items-center justify-between">
                <div class="w-32">
                  ${this.getBarcodeSvg('#22d3ee')}
                </div>
                <div class="flex items-center gap-2">
                  <div class="text-right font-mono text-[8px] text-cyan-300">
                    <div>№ ${pass.ticketNum}-AQUA</div>
                    <div class="text-cyan-400">${pass.date}</div>
                  </div>
                  <div class="stamp-circle-seal w-12 h-12 text-cyan-300 text-[8px] font-bold tracking-tighter flex flex-col items-center justify-center text-center border-cyan-400/50">
                    <span>AQUARIUM</span>
                    <span class="text-[7px] text-cyan-400">VALIDADO</span>
                  </div>
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
        // GOLF SCORECARD & GREEN FEE (ROYAL DUO GOLF & COUNTRY CLUB)
        // ----------------------------------------------------
        case 'golf-scorecard':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl golf-linen-paper text-[#f3f4f6] p-5 golf-gold-frame text-left select-none">
              <!-- Encabezado Club de Campo Britanico -->
              <div class="text-center pb-2.5 border-b border-[#d4af37]/40">
                <div class="flex items-center justify-between text-[8px] font-cinzel text-amber-300 tracking-[0.2em] uppercase mb-1">
                  <span>EST. 1894</span>
                  <span>CHAMPIONSHIP COURSE</span>
                  <span>18 HOLES</span>
                </div>

                <!-- Logotipo Heraldico SVG de Palos Cruzados y Bandera -->
                <div class="my-1">
                  <svg viewBox="0 0 120 100" class="w-16 h-14 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 68 C16 52 22 34 36 24 C37 29 36 34 32 38 C40 30 47 30 50 36 C44 40 41 45 42 52 C36 46 28 50 26 58 Z" fill="#d4af37" opacity="0.75"/>
                    <path d="M98 68 C104 52 98 34 84 24 C83 29 84 34 88 38 C80 30 73 30 70 36 C76 40 79 45 78 52 C84 46 92 50 94 58 Z" fill="#d4af37" opacity="0.75"/>
                    <g stroke="#fef08a" stroke-width="2.2" stroke-linecap="round">
                      <line x1="26" y1="84" x2="88" y2="24"/>
                      <line x1="94" y1="84" x2="32" y2="24"/>
                    </g>
                    <path d="M85 22 L96 25 L93 33 L83 28 Z" fill="#d4af37" stroke="#fef08a" stroke-width="0.8"/>
                    <path d="M35 22 L24 25 L27 33 L37 28 Z" fill="#d4af37" stroke="#fef08a" stroke-width="0.8"/>
                    <line x1="60" y1="16" x2="60" y2="88" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>
                    <path d="M60 20 C76 16 76 32 60 36 Z" fill="#b91c1c" stroke="#d4af37" stroke-width="1"/>
                    <text x="64" y="30" fill="#ffffff" font-size="8" font-weight="900" font-family="'Cinzel', serif">18</text>
                    <circle cx="60" cy="85" r="5.5" fill="#f8fafc" stroke="#d4af37" stroke-width="1"/>
                    <circle cx="58" cy="83.5" r="0.7" fill="#cbd5e1"/>
                    <circle cx="62" cy="83.5" r="0.7" fill="#cbd5e1"/>
                    <circle cx="60" cy="86" r="0.7" fill="#cbd5e1"/>
                    <path d="M48 14 L52 19 L60 12 L68 19 L72 14 L70 21 L50 21 Z" fill="#d4af37" stroke="#fef08a" stroke-width="0.6"/>
                  </svg>
                </div>

                <h2 class="font-cinzel text-base sm:text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#fef08a] to-amber-300">
                  ROYAL DUO GOLF CLUB
                </h2>
                <p class="font-playfair italic text-[11px] text-[#e2c263] mt-0.5">
                  Official Green Fee & Championship Match Scorecard
                </p>
              </div>

              <!-- Metadatos de la Partida -->
              <div class="my-3 py-1.5 px-2 rounded-lg bg-black/40 border border-[#d4af37]/30 font-mono text-[9px] grid grid-cols-3 gap-1 text-center">
                <div>
                  <span class="text-amber-400/80 text-[7.5px] block uppercase">TEE SALIDA</span>
                  <strong class="text-white">AMARILLAS</strong>
                </div>
                <div class="border-x border-[#d4af37]/20">
                  <span class="text-amber-400/80 text-[7.5px] block uppercase">PAR / SLOPE</span>
                  <strong class="text-yellow-300">PAR 72 / 128</strong>
                </div>
                <div>
                  <span class="text-amber-400/80 text-[7.5px] block uppercase">TARJETA N.º</span>
                  <strong class="text-emerald-300">RDGC-${pass.ticketNum}</strong>
                </div>
              </div>

              <!-- Tabla Realista de Hoyos (Front 9 Preview) -->
              <div class="border border-[#d4af37]/40 rounded-lg overflow-hidden bg-black/50 text-[9px] font-mono">
                <div class="grid grid-cols-7 bg-[#061f13] border-b border-[#d4af37]/30 text-amber-300 py-1 font-bold text-center">
                  <div>HOYO</div>
                  <div>METROS</div>
                  <div>PAR</div>
                  <div>HCP</div>
                  <div class="text-rose-300">P1</div>
                  <div class="text-indigo-300">P2</div>
                  <div class="text-amber-200">NET</div>
                </div>
                
                <div class="grid grid-cols-7 border-b border-[#d4af37]/15 py-0.5 text-center items-center">
                  <div class="font-bold text-amber-200">1</div>
                  <div class="text-neutral-300">342m</div>
                  <div class="text-neutral-400">4</div>
                  <div class="text-neutral-400">7</div>
                  <div class="text-rose-200 font-bold">4</div>
                  <div class="text-indigo-200 font-bold">5</div>
                  <div class="text-emerald-400 font-bold">Par</div>
                </div>
                <div class="grid grid-cols-7 border-b border-[#d4af37]/15 py-0.5 text-center items-center bg-emerald-950/20">
                  <div class="font-bold text-amber-200">2</div>
                  <div class="text-neutral-300">165m</div>
                  <div class="text-neutral-400">3</div>
                  <div class="text-neutral-400">15</div>
                  <div class="text-rose-200 font-bold"><span class="inline-block px-1 rounded-full border border-yellow-400 text-yellow-300">2</span></div>
                  <div class="text-indigo-200 font-bold">3</div>
                  <div class="text-yellow-300 font-black">-1 Birdie</div>
                </div>
                <div class="grid grid-cols-7 border-b border-[#d4af37]/15 py-0.5 text-center items-center">
                  <div class="font-bold text-amber-200">3</div>
                  <div class="text-neutral-300">488m</div>
                  <div class="text-neutral-400">5</div>
                  <div class="text-neutral-400">3</div>
                  <div class="text-rose-200 font-bold">5</div>
                  <div class="text-indigo-200 font-bold">5</div>
                  <div class="text-emerald-400 font-bold">Par</div>
                </div>
                <div class="grid grid-cols-7 border-b border-[#d4af37]/15 py-0.5 text-center items-center">
                  <div class="font-bold text-amber-200">4</div>
                  <div class="text-neutral-300">385m</div>
                  <div class="text-neutral-400">4</div>
                  <div class="text-neutral-400">1</div>
                  <div class="text-rose-200 font-bold">5</div>
                  <div class="text-indigo-200 font-bold">4</div>
                  <div class="text-emerald-400 font-bold">Par</div>
                </div>
                <div class="grid grid-cols-7 bg-[#0b331f] text-amber-300 py-1 text-center font-bold border-t border-[#d4af37]/40">
                  <div>TOTAL</div>
                  <div>1.380m</div>
                  <div>16</div>
                  <div>-</div>
                  <div class="text-rose-200">16</div>
                  <div class="text-indigo-200">17</div>
                  <div class="text-yellow-300">-1 NET</div>
                </div>
              </div>

              <!-- Pareja de Jugadores -->
              <div class="flex justify-between items-center mt-2.5 px-1 font-mono text-[10px]">
                <span class="text-neutral-300">PAREJA: <strong class="text-amber-200">${escapeHtml(pass.coupleNames)}</strong></span>
                <span class="text-emerald-300 font-bold">SCRAMBLE DUO</span>
              </div>

              <!-- Footer: Codigo de barras y Sello de Green Fee Pagado -->
              <div class="mt-3 pt-2 border-t border-dashed border-[#d4af37]/40 flex items-center justify-between">
                <div class="w-28 opacity-80">
                  ${this.getBarcodeSvg('#d4af37')}
                </div>

                <div class="stamp-greenfee-gold px-2 py-1 rounded text-[7.5px] leading-tight text-center font-bold">
                  GREEN FEE PAID<br>ROYAL DUO
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // KARTING GRAND PRIX & PADDOCK SUPERLICENCIA
        // ----------------------------------------------------
        case 'karting-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden shadow-2xl carbon-fiber-tech border-2 border-amber-500/60 p-5 text-white text-left select-none">
              <!-- Troquel / Slot Perforado para Cordon de Paddock -->
              <div class="w-14 h-2.5 rounded-full bg-black/90 border border-zinc-500/60 mx-auto shadow-inner mb-3"></div>

              <!-- Tira Superior y Header -->
              <div class="flex items-center justify-between pb-2 border-b border-amber-500/40 font-mono text-[10px]">
                <div class="flex items-center gap-1.5 font-black text-amber-400 tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>DUO GRAND PRIX // RACING PADDOCK</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/50 font-black text-[9px]">FIA SUPERLICENCIA</span>
              </div>

              <!-- Chip RFID Dorado y Logo del Kart SVG -->
              <div class="flex items-center justify-between my-2.5 px-1">
                <svg viewBox="0 0 50 38" class="w-10 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="48" height="36" rx="4" fill="#ca8a04" stroke="#fef08a" stroke-width="1"/>
                  <rect x="6" y="6" width="15" height="11" rx="1.5" fill="#eab308" stroke="#a16207" stroke-width="0.8"/>
                  <rect x="29" y="6" width="15" height="11" rx="1.5" fill="#eab308" stroke="#a16207" stroke-width="0.8"/>
                  <rect x="6" y="21" width="15" height="11" rx="1.5" fill="#eab308" stroke="#a16207" stroke-width="0.8"/>
                  <rect x="29" y="21" width="15" height="11" rx="1.5" fill="#eab308" stroke="#a16207" stroke-width="0.8"/>
                  <rect x="18" y="12" width="14" height="14" rx="2" fill="#facc15" stroke="#854d0e" stroke-width="0.8"/>
                  <line x1="21" y1="6" x2="21" y2="12" stroke="#854d0e" stroke-width="0.8"/>
                  <line x1="29" y1="6" x2="29" y2="12" stroke="#854d0e" stroke-width="0.8"/>
                  <line x1="21" y1="26" x2="21" y2="32" stroke="#854d0e" stroke-width="0.8"/>
                  <line x1="29" y1="26" x2="29" y2="32" stroke="#854d0e" stroke-width="0.8"/>
                </svg>

                <svg viewBox="0 0 80 45" class="w-14 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 26 L4 26 C2 26 1 24 2 22 L6 18 C7 17 9 17 11 18 L24 22 Z" fill="#f59e0b"/>
                  <path d="M20 22 L36 16 L62 16 C66 16 69 19 69 23 L68 32 C68 34 66 36 64 36 L24 36 C21 36 18 34 17 31 Z" fill="#18181b" stroke="#f59e0b" stroke-width="1.5"/>
                  <path d="M36 19 L58 19 L56 28 L34 28 Z" fill="#f59e0b" opacity="0.85"/>
                  <line x1="38" y1="20" x2="44" y2="10" stroke="#e4e4e7" stroke-width="2"/>
                  <circle cx="50" cy="10" r="5" fill="#facc15" stroke="#18181b" stroke-width="1"/>
                  <rect x="8" y="28" width="12" height="14" rx="3" fill="#09090b" stroke="#71717a" stroke-width="1.2"/>
                  <rect x="58" y="26" width="14" height="16" rx="3" fill="#09090b" stroke="#71717a" stroke-width="1.2"/>
                  <circle cx="14" cy="35" r="2.5" fill="#f59e0b"/>
                  <circle cx="65" cy="34" r="3" fill="#f59e0b"/>
                </svg>
              </div>

              <div class="my-2 text-center">
                <p class="font-mono text-[8px] text-amber-400 uppercase tracking-[0.25em]">DUO MOTOR RACING CIRCUIT</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 uppercase tracking-tight mt-0.5">${escapeHtml(pass.name)}</h3>
                <p class="text-[11px] text-neutral-300 mt-1 font-mono">Pilotos Oficiales: <strong class="text-amber-300">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Grid de Telemetria Realista -->
              <div class="p-2.5 bg-black/70 rounded-xl border border-amber-500/30 font-mono text-[9px] grid grid-cols-3 gap-1 text-center">
                <div class="border-r border-amber-500/20">
                  <span class="text-amber-400/80 text-[7.5px] block uppercase">PARRILLA</span>
                  <strong class="text-white text-xs">POLE POS.</strong>
                </div>
                <div class="border-r border-amber-500/20">
                  <span class="text-amber-400/80 text-[7.5px] block uppercase">MEJOR VUELTA</span>
                  <strong class="text-emerald-400 text-xs">41.872s</strong>
                </div>
                <div>
                  <span class="text-amber-400/80 text-[7.5px] block uppercase">VEL. PUNTA</span>
                  <strong class="text-yellow-300 text-xs">96.4 KM/H</strong>
                </div>
              </div>

              <!-- Micro-sectores de Cronometraje -->
              <div class="mt-2 flex items-center justify-between text-[8px] font-mono px-1">
                <span class="text-neutral-400">SECTORES:</span>
                <span class="text-purple-400 font-bold">S1 12.4s (RECORD)</span>
                <span class="text-emerald-400 font-bold">S2 14.1s</span>
                <span class="text-purple-400 font-bold">S3 15.3s</span>
              </div>

              <!-- Footer con Barcode y Sello -->
              <div class="mt-3 pt-2 border-t border-dashed border-amber-500/30 flex items-center justify-between">
                <div class="w-28 opacity-80">
                  ${this.getBarcodeSvg('#f59e0b')}
                </div>
                <div class="px-2 py-1 rounded border border-amber-500/60 bg-amber-500/10 text-amber-300 text-[7.5px] font-mono font-bold leading-tight text-center">
                  PADDOCK OK<br>SCRUTINEERING
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
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl thermal-receipt-paper text-[#18191C] p-5 flex flex-col justify-between border border-neutral-300/80 font-mono text-left select-none">
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
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#14080c] border border-amber-500/40 text-amber-100 p-5 flex flex-col justify-between text-left select-none ticket-scallop-edges">
            <div class="relative border-2 border-amber-500/40 rounded-xl p-4 sm:p-5 h-full flex flex-col justify-between bg-gradient-to-b from-[#1c0d12] via-[#12070a] to-[#0e0508] shadow-inner overflow-y-auto no-scrollbar">
              <div>
                <div class="flex items-center justify-between border-b border-amber-500/30 pb-2">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span class="font-cinzel text-xs font-bold text-amber-300">PLANO DE SALA & BUTACAS DUO</span>
                  </div>
                  <span class="text-[10px] font-special px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">LOVE SEAT CENTRAL</span>
                </div>

                <!-- Curved Cinema Screen with Ambient Light Glow -->
                <div class="my-3 text-center">
                  <div class="w-4/5 mx-auto h-2 bg-gradient-to-b from-amber-300 via-amber-400/50 to-transparent rounded-t-[100%] mb-1 shadow-[0_0_12px_rgba(251,191,36,0.5)]"></div>
                  <div class="text-[8px] font-mono tracking-widest text-amber-400/70 mb-2 uppercase">PANTALLA PANORÁMICA CURVA</div>
                  
                  <!-- Seat Map Grid -->
                  <div class="grid grid-cols-6 gap-1 max-w-[190px] mx-auto text-[9px] mb-2">
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">1</div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">2</div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">3</div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">4</div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">5</div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">6</div>
                    <!-- Row VIP -->
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">12</div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">13</div>
                    <!-- Central Love Seat Duo (Merged) -->
                    <div class="col-span-2 h-4 rounded-md bg-gradient-to-r from-amber-500/30 via-rose-500/40 to-amber-500/30 border border-amber-400 text-amber-200 font-bold flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      <span class="text-[8px] font-mono">14</span>
                      <svg class="w-2.5 h-2.5 text-rose-400 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      <span class="text-[8px] font-mono">15</span>
                    </div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">16</div>
                    <div class="h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[7px] text-zinc-600 font-mono">17</div>
                  </div>
                  <p class="text-[10px] text-amber-300/85 font-special">Butacas 14 & 15 seleccionadas para <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
                </div>

                <!-- Concession Perks & Technical Film Specs (Zero Emojis!) -->
                <div class="bg-black/50 rounded-lg p-2.5 border border-amber-500/25 space-y-1.5 text-xs">
                  <div class="flex items-center justify-between text-amber-200">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M6 9l1.5 12h9L18 9H6z"/>
                        <path d="M9 9v12M12 9v12M15 9v12"/>
                        <path d="M6 9a3 3 0 0 1 3-3 3 3 0 0 1 3 2 3 3 0 0 1 3-2 3 3 0 0 1 3 3"/>
                      </svg>
                      <span class="text-[11px]">Palomitas Dobles Mixtas:</span>
                    </div>
                    <strong class="font-bold text-amber-300 font-mono text-[11px]">Incluido</strong>
                  </div>
                  <div class="flex items-center justify-between text-amber-200">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M7 6l1.2 14.5a1.5 1.5 0 0 0 1.5 1.4h4.6a1.5 1.5 0 0 0 1.5-1.4L17 6H7z"/>
                        <path d="M6 6h12M14 2l-2 4"/>
                      </svg>
                      <span class="text-[11px]">2 Bebidas Grandes Zero:</span>
                    </div>
                    <strong class="font-bold text-amber-300 font-mono text-[11px]">Incluido</strong>
                  </div>
                  <div class="flex items-center justify-between text-amber-200">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M12 2L3 9l9 13 9-13-9-7z"/>
                        <path d="M3 9h18M7.5 9L12 22M16.5 9L12 22"/>
                      </svg>
                      <span class="text-[11px]">Gominolas & Bombones:</span>
                    </div>
                    <strong class="font-bold text-amber-300 font-mono text-[11px]">Cortesía VIP</strong>
                  </div>
                </div>

                ${pass.photo ? `
                  <div class="my-2.5 w-full h-24 rounded-lg overflow-hidden border border-amber-500/40 shadow-md">
                    <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo de la Velada">
                  </div>
                ` : ''}

                <div class="my-2 p-2 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 font-special italic leading-relaxed">
                  "${escapeHtml(pass.note || 'Cita de cine inolvidable: luces tenues, manos entrelazadas y la magia de la gran pantalla.')}"
                </div>
              </div>

              <div class="text-center pt-2 border-t border-amber-500/20 text-[10px] font-mono text-amber-400/60 uppercase">
                Pase Oficial de Sala • ${pass.date} • DUO CINEMA ARCHIVE
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'aquarium-pass') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#011424] via-[#021f30] to-[#010e1a] border-2 border-cyan-400/50 p-5 flex flex-col justify-between text-left select-none aquarium-notched-edges">
            <div class="relative border border-cyan-500/40 rounded-xl p-4 sm:p-5 h-full flex flex-col justify-between bg-[#021727]/90 shadow-inner overflow-y-auto no-scrollbar">
              <div>
                <div class="flex items-center justify-between border-b border-cyan-400/30 pb-2">
                  <div class="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-300">
                    <svg class="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="9"/>
                      <polygon points="12,3 14,10 21,12 14,14 12,21 10,14 3,12 10,10" fill="currentColor" fill-opacity="0.3"/>
                    </svg>
                    <span>CUADERNO DE BITÁCORA MARINA</span>
                  </div>
                  <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">LOGBOOK #AQUA</span>
                </div>

                <!-- Especies Avistadas en la Inmersión (Zero Emojis!) -->
                <div class="my-2.5">
                  <span class="text-[9px] font-mono text-cyan-400/80 uppercase tracking-wider block mb-1.5">ESPECIES AVISTADAS EN EL TÚNEL:</span>
                  <div class="space-y-1.5 font-mono text-[10px]">
                    <div class="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-cyan-500/20 text-cyan-200">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                          <path d="M3 19c6-1 12-7 15-15-7 2-11 8-15 15z" fill="currentColor" fill-opacity="0.25"/>
                          <path d="M2 20c8-1 14-1 20 0"/>
                        </svg>
                        <span>Tiburón Toro <em class="text-cyan-400/70 not-italic text-[9px]">(C. taurus)</em></span>
                      </div>
                      <span class="text-emerald-400 font-bold text-[9px]">-9.0m [✓]</span>
                    </div>

                    <div class="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-cyan-500/20 text-cyan-200">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                          <path d="M12 4 C8 12 2 16 12 20 C22 16 16 12 12 4 Z"/>
                        </svg>
                        <span>Manta Raya Gigante <em class="text-cyan-400/70 not-italic text-[9px]">(M. birostris)</em></span>
                      </div>
                      <span class="text-emerald-400 font-bold text-[9px]">-12.5m [✓]</span>
                    </div>

                    <div class="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-cyan-500/20 text-cyan-200">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                          <ellipse cx="12" cy="13" rx="5" ry="6"/>
                          <circle cx="12" cy="5" r="2"/>
                          <path d="M8 9l-4-3M16 9l4-3M8 17l-3 4M16 17l3 4"/>
                        </svg>
                        <span>Tortuga Marina Boba <em class="text-cyan-400/70 not-italic text-[9px]">(C. caretta)</em></span>
                      </div>
                      <span class="text-emerald-400 font-bold text-[9px]">-4.2m [✓]</span>
                    </div>

                    <div class="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-cyan-500/20 text-cyan-200">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                          <path d="M6 12a6 6 0 0 1 12 0c0 1-1 2-3 2s-3-1-3-1-1 1-3 1-3-1-3-2z"/>
                          <path d="M8 14v4M12 14v5M16 14v4"/>
                        </svg>
                        <span>Medusa Luna Bioluminiscente</span>
                      </div>
                      <span class="text-emerald-400 font-bold text-[9px]">-15.0m [✓]</span>
                    </div>
                  </div>
                </div>

                ${pass.photo ? `
                  <div class="my-2.5 w-full h-24 rounded-lg overflow-hidden border border-cyan-400/40 shadow-md">
                    <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo Submarino">
                  </div>
                ` : ''}

                <div class="my-2 p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/20 text-xs text-cyan-100 font-sans italic leading-relaxed">
                  "${escapeHtml(pass.note || 'Caminar bajo el agua mientras los tiburones y mantas surcan el techo de cristal tomados de la mano. Un viaje al fondo del mar inolvidable.')}"
                </div>
              </div>

              <div class="text-center pt-2 border-t border-cyan-500/30 text-[9px] font-mono text-cyan-300/70 flex items-center justify-between">
                <span>ESTACIÓN OCEANOGRÁFICA DUO</span>
                <span>INMERSIÓN • ${pass.date}</span>
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'vip-backstage') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#130a24] to-[#080511] border-2 border-purple-400/40 p-5 text-white flex flex-col justify-between text-left select-none">
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
      } else if (arc === 'golf-scorecard') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden golf-linen-paper text-[#f3f4f6] p-5 golf-gold-frame flex flex-col justify-between text-left select-none">
            <div>
              <!-- Header Reverso -->
              <div class="border-b border-[#d4af37]/40 pb-2 flex justify-between items-center">
                <div class="flex items-center gap-1.5 font-cinzel text-xs font-bold text-amber-300">
                  <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                  <span>ANALISIS TECNICO DEL GREEN</span>
                </div>
                <span class="font-mono text-[9px] text-[#e2c263]">HOYO 19 // CLUB HOUSE</span>
              </div>

              <!-- Estadisticas de Juego en el Green -->
              <div class="my-3 grid grid-cols-2 gap-2 font-mono text-[10px]">
                <div class="p-2 rounded-lg bg-black/50 border border-[#d4af37]/30">
                  <div class="text-[8px] text-amber-400/80 uppercase">CALLES ALCANZADAS (FIR)</div>
                  <div class="text-sm font-bold text-white mt-0.5">71% <span class="text-[9px] text-emerald-400">(10/14)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/50 border border-[#d4af37]/30">
                  <div class="text-[8px] text-amber-400/80 uppercase">GREENS EN REGULACION (GIR)</div>
                  <div class="text-sm font-bold text-white mt-0.5">67% <span class="text-[9px] text-emerald-400">(12/18)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/50 border border-[#d4af37]/30">
                  <div class="text-[8px] text-amber-400/80 uppercase">PROMEDIO DE PUTTS</div>
                  <div class="text-sm font-bold text-yellow-300 mt-0.5">1.6 Putts <span class="text-[9px] text-neutral-400">(Mejor: 1)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/50 border border-[#d4af37]/30">
                  <div class="text-[8px] text-amber-400/80 uppercase">SAND SAVES / BUNKERS</div>
                  <div class="text-sm font-bold text-emerald-400 mt-0.5">100% <span class="text-[9px] text-neutral-300">(2/2 salvados)</span></div>
                </div>
              </div>

              <!-- Cronica o Anecdota de la Partida -->
              <div class="p-2.5 rounded-xl bg-black/60 border border-[#d4af37]/25 font-playfair text-xs leading-relaxed italic text-amber-100">
                "${escapeHtml(pass.note || 'Extraordinario golpe de aproximacion con el hierro 7 en el hoyo 2. La bola rodo con suavidad hasta quedar a 30 centimetros del hoyo, firmando un birdie inolvidable entre risas en el green.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-20 rounded-lg overflow-hidden border border-[#d4af37]/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo en el Green">
                </div>
              ` : ''}
            </div>

            <!-- Firma Oficial del Caddie Master -->
            <div class="pt-2 border-t border-[#d4af37]/30 flex items-end justify-between">
              <div>
                <span class="text-[8px] font-mono text-amber-400/80 block uppercase">CERTIFICADO OFICIAL:</span>
                <span class="font-cinzel text-[10px] text-neutral-200">Lord Alistair C. // Master Caddie</span>
              </div>
              <div class="w-32">
                <svg viewBox="0 0 160 40" class="w-full h-8" fill="none" stroke="#d4af37" stroke-linecap="round">
                  <path d="M10 28 C25 8, 35 12, 45 25 C55 35, 48 40, 42 36 C36 32, 40 18, 55 22 C68 26, 78 12, 92 24 C102 32, 114 18, 128 26 C138 32, 148 18, 155 22" stroke-width="1.8"/>
                  <path d="M30 38 C70 35, 110 38, 155 36" stroke-width="1.2" stroke-dasharray="2 3"/>
                </svg>
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'karting-pass') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden carbon-fiber-tech border-2 border-amber-500/60 p-5 text-white flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-amber-500/40 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-black text-amber-400">DUELO TELEMETRIA DUO</span>
                <span class="text-[9px] text-neutral-400">PADDOCK CONTROL</span>
              </div>

              <div class="my-3 space-y-2 font-mono text-xs">
                <div class="p-2.5 rounded-xl bg-black/70 border border-neutral-800">
                  <div class="flex justify-between items-center text-[10px] pb-1 border-b border-neutral-800">
                    <span class="text-rose-400 font-bold">PILOTO 1 (${escapeHtml(pass.p1Name || 'P1')})</span>
                    <strong class="text-white">41.872s</strong>
                  </div>
                  <div class="flex justify-between items-center text-[10px] pt-1">
                    <span class="text-indigo-400 font-bold">PILOTO 2 (${escapeHtml(pass.p2Name || 'P2')})</span>
                    <strong class="text-white">42.014s</strong>
                  </div>
                  <div class="mt-1.5 text-center text-[9px] text-amber-300 bg-amber-500/10 py-0.5 rounded border border-amber-500/20 font-bold">
                    DELTA DE TIEMPO: +0.142s // FINAL DE INFARTO
                  </div>
                </div>

                <div class="p-2 rounded-xl bg-black/60 border border-neutral-800 text-[10px] leading-relaxed text-neutral-300">
                  <strong class="text-amber-400 block mb-0.5">REGLAMENTO DEL DUELO:</strong>
                  "${escapeHtml(pass.note || 'Tanda de karts a maxima velocidad. El piloto mas veloz elige musica; el segundo invita a boxes.')}"
                </div>

                ${pass.photo ? `
                  <div class="w-full h-20 rounded-lg overflow-hidden border border-amber-500/30 shadow-sm">
                    <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo Paddock">
                  </div>
                ` : ''}
              </div>
            </div>

            <div class="pt-2 border-t border-amber-500/30 flex items-center justify-between">
              <div>
                <span class="text-[8px] font-mono text-amber-400/80 block uppercase">COMISARIO DE PISTA:</span>
                <span class="font-mono text-[9px] text-neutral-300">Chief Scrutineer FIA Karting</span>
              </div>
              <div class="w-28">
                <svg viewBox="0 0 140 35" class="w-full h-7" fill="none" stroke="#f59e0b" stroke-linecap="round">
                  <path d="M8 24 C18 8, 28 8, 36 20 C44 32, 38 36, 50 16 C60 5, 68 28, 82 18 C94 10, 104 26, 118 15 C128 8, 134 22, 138 18" stroke-width="1.8"/>
                </svg>
              </div>
            </div>
          </div>
        `;
                  } else if (arc === 'stadium-ticket') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full stadium-ticket-silhouette stadium-grass text-white p-5 border border-emerald-500/40 flex flex-row overflow-hidden text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)]">
            <!-- Pizarra Tactica y Acta Principal (72% ancho) -->
            <div class="flex-[3] flex flex-col justify-between pr-5 bg-gradient-to-br from-emerald-950/90 via-[#063826]/95 to-[#022016]/98">
              <div>
                <div class="border-b border-emerald-400/30 pb-2 flex justify-between items-center font-mono">
                  <span class="text-xs font-black font-space text-emerald-300 uppercase">PIZARRA TÁCTICA &bull; MIN 90'+3'</span>
                  <span class="text-[9px] text-emerald-400">ACTA OFICIAL DERBI</span>
                </div>

                <!-- Pizarra SVG con Gol y Jugada Combinada -->
                <div class="my-2 p-2 rounded-xl bg-black/80 border border-emerald-500/40 shadow-inner">
                  <div class="text-[7.5px] font-mono text-emerald-400/90 mb-1 flex justify-between">
                    <span>JUGADA ENSAYADA DUO // GOLAZO POR LA ESCUADRA</span>
                    <span class="text-amber-300 font-bold">100% EFECTIVIDAD</span>
                  </div>
                  <svg viewBox="0 0 240 60" class="w-full h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="240" height="60" rx="4" fill="#062817" stroke="#047857" stroke-width="1"/>
                    <line x1="120" y1="0" x2="120" y2="60" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
                    <circle cx="120" cy="30" r="14" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
                    <circle cx="45" cy="30" r="6" fill="#10b981" stroke="#ffffff" stroke-width="1"/>
                    <text x="45" y="33" fill="#ffffff" font-size="6" font-family="monospace" text-anchor="middle">P1</text>
                    <circle cx="110" cy="18" r="6" fill="#10b981" stroke="#ffffff" stroke-width="1"/>
                    <text x="110" y="21" fill="#ffffff" font-size="6" font-family="monospace" text-anchor="middle">P2</text>
                    <circle cx="190" cy="30" r="7" fill="#facc15" stroke="#ffffff" stroke-width="1.2"/>
                    <text x="190" y="33" fill="#000000" font-size="7" font-weight="bold" font-family="monospace" text-anchor="middle">GOL</text>
                    <path d="M52 30 C75 20, 95 20, 104 19" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="3 2"/>
                    <path d="M117 18 C145 18, 170 24, 183 29" stroke="#facc15" stroke-width="1.5"/>
                    <path d="M198 30 L235 15" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                </div>

                ${pass.note ? `
                  <div class="p-2.5 rounded-xl bg-black/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-100">
                    <span class="text-[7.5px] uppercase tracking-wider text-emerald-400/80 block">CRÓNICA DEL PARTIDO:</span>
                    &ldquo;${escapeHtml(pass.note)}&rdquo;
                  </div>
                ` : ''}
              </div>

              <div class="pt-2 border-t border-emerald-500/30 flex justify-between items-center text-[9px] font-mono">
                <span class="text-neutral-400">CONTROL DE SEGURIDAD:</span>
                <span class="text-emerald-300 font-bold">ACCESO VERIFICADO &bull; DUO ARENA</span>
              </div>
            </div>

            <!-- Talon Lateral Trasero (28% ancho) -->
            <div class="w-24 bg-[#032014] p-3 flex flex-col justify-between items-center text-center border-l border-emerald-500/30">
              <span class="text-[7px] font-mono text-emerald-400/80 block uppercase">TALÓN TRASERO</span>
              <div class="transform -rotate-90 origin-center my-auto whitespace-nowrap text-[8px] font-mono text-emerald-300">
                SERIE-A &bull; ${escapeHtml(pass.ticketNum)}
              </div>
              <span class="text-[7px] font-mono text-neutral-400">CONSERVAR</span>
            </div>
          </div>
        `;
      } else if (arc === 'racket-club') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full racket-tab-silhouette court-blue text-white p-5 border border-sky-400/40 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)]">
            <!-- Ranura Troquelada Superior -->
            <div class="w-full flex justify-center -mt-1 mb-2">
              <div class="w-20 h-3 rounded-full bg-[#050507] border-2 border-sky-300/50 shadow-inner"></div>
            </div>

            <div>
              <div class="border-b-2 border-sky-400/40 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-bold text-sky-300 uppercase">TELEMETRÍA DE PISTA // RADAR</span>
                <span class="text-[9px] text-amber-300 font-bold">100% WIN RATE</span>
              </div>

              <!-- Estadisticas Tecnicas de la Partida de Padel -->
              <div class="grid grid-cols-2 gap-2 my-2.5">
                <div class="p-2 rounded-lg bg-black/75 border border-sky-500/30 font-mono text-center">
                  <span class="text-[7.5px] text-sky-300 block uppercase">SMASH VELOCITY</span>
                  <span class="text-lg font-black text-amber-300 font-space">142 KM/H</span>
                </div>
                <div class="p-2 rounded-lg bg-black/75 border border-sky-500/30 font-mono text-center">
                  <span class="text-[7.5px] text-sky-300 block uppercase">PUNTOS DE ORO</span>
                  <span class="text-lg font-black text-emerald-300 font-space">4 / 4 GANADOS</span>
                </div>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded-xl bg-black/60 border border-sky-500/30 text-[10px] font-mono text-sky-100">
                  <span class="text-[7.5px] uppercase tracking-wider text-sky-400 block">NOTAS DEL CAPITÁN:</span>
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-sky-400/30 flex justify-between items-center text-[9px] font-mono">
              <span class="text-neutral-400">SELLO DE ARBITRAJE:</span>
              <span class="text-amber-300 font-bold">HOMOLOGADO FEDERACIÓN DUO</span>
            </div>
          </div>
        `;
      } else if (arc === 'fitness-pass') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-none bib-fiber text-slate-900 p-6 border-2 border-slate-300 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)]">
            <!-- Banda Superior de Dorsal Trasero -->
            <div class="bg-slate-900 -mx-6 -mt-6 px-6 py-2 flex justify-between items-center text-white">
              <span class="font-montserrat font-black text-xs uppercase tracking-wider">FICHA TÉCNICA MÉDICA Y SPLITS</span>
              <span class="font-mono text-[9px] text-yellow-400 font-bold">CRONO OFICIAL</span>
            </div>

            <div>
              <div class="text-center my-2">
                <span class="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">SPLITS KILÓMETRO A KILÓMETRO</span>
                <div class="text-3xl font-black font-montserrat text-slate-900">4'48" / KM</div>
              </div>

              <!-- Tabla de Tiempos Parciales -->
              <div class="grid grid-cols-4 gap-1 p-2 bg-slate-100 rounded border border-slate-300 font-mono text-center text-[9px] my-2">
                <div><span class="text-[7px] text-slate-500 block">KM 2.5</span><strong>12:05</strong></div>
                <div><span class="text-[7px] text-slate-500 block">KM 5.0</span><strong>24:10</strong></div>
                <div><span class="text-[7px] text-slate-500 block">KM 7.5</span><strong>36:15</strong></div>
                <div><span class="text-[7px] text-slate-500 block">META 10K</span><strong class="text-rose-600">48:12</strong></div>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded bg-white border border-slate-300 text-[10px] font-mono text-slate-800">
                  <span class="text-[7.5px] uppercase tracking-wider text-rose-600 block">DIARIO DEL ATLETA:</span>
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-slate-300 flex justify-between items-center text-[9px] font-mono text-slate-600">
              <span>HOMOLOGADO IAAF / RFEA</span>
              <strong class="text-slate-900">MEDALLA FINISHER CERTIFICADA</strong>
            </div>
          </div>
        `;
      } else if (arc === 'gamer-pass') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full gamer-cartridge-silhouette cartridge-body text-amber-200 p-5 border-2 border-amber-500/50 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)]">
            <!-- Ranura de agarre superior troquelada de cartucho clasico -->
            <div class="w-full flex justify-center -mt-2 mb-2">
              <div class="w-32 h-2.5 rounded bg-[#0a0a0c] border border-amber-600/40 shadow-inner flex items-center justify-around px-2">
                <span class="w-3 h-0.5 bg-neutral-700"></span>
                <span class="w-3 h-0.5 bg-neutral-700"></span>
                <span class="w-3 h-0.5 bg-neutral-700"></span>
                <span class="w-3 h-0.5 bg-neutral-700"></span>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-black/80 border border-amber-400/40 font-vt">
              <div class="border-b border-amber-400/30 pb-1 flex justify-between items-center text-sm">
                <span class="text-yellow-400 font-arcade text-[8px]">MEMORY CARD &bull; SAVE SLOT 01</span>
                <span class="text-cyan-400">GAME CLEARED!</span>
              </div>

              <!-- Log de Logros Desbloqueados en VT323 -->
              <div class="space-y-1.5 my-2 text-sm text-neutral-200">
                <div class="flex justify-between items-center">
                  <span>[ACHIEVEMENT] S-RANK CO-OP BOND</span>
                  <span class="text-yellow-400">UNLOCKED</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>[ACHIEVEMENT] ZERO CASUALTY RUN</span>
                  <span class="text-yellow-400">UNLOCKED</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>[SECRET] TRUE ENDING: HAPPY FOREVER</span>
                  <span class="text-pink-400">100%</span>
                </div>
              </div>

              ${pass.note ? `
                <div class="p-2 rounded bg-neutral-900/90 border border-amber-500/30 text-xs text-neutral-300 font-vt">
                  <span class="text-amber-400 block text-[9px] font-arcade">PLAYER NOTES:</span>
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <!-- Contactos Dorados Inferiores de Cartucho (Edge Connector) -->
            <div class="w-full -mb-4 pt-2">
              <div class="w-full h-5 bg-[#0a0a0c] border-t-2 border-amber-700/60 flex items-center justify-around px-3">
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
                <span class="w-2 h-4 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm"></span>
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'boardgame-card') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full tcg-card-silhouette boardgame-parchment text-amber-100 p-4 border-2 border-amber-600/70 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)]">
            <!-- Marco Gotico Biselado Interior -->
            <div class="h-full border border-amber-500/50 p-3 rounded flex flex-col justify-between bg-gradient-to-b from-[#24130a]/80 via-[#140b06]/90 to-[#24130a]/80">
              <div class="border-b border-amber-600/50 pb-1.5 flex justify-between items-center font-cinzel">
                <span class="text-xs font-black text-amber-300 uppercase">REVERSO MÍSTICO // ANILLO ARCANO</span>
                <span class="text-[8px] text-amber-400">TAROT DUO</span>
              </div>

              <!-- Ilustracion Simbolica Gotica Central -->
              <div class="my-3 text-center">
                <svg viewBox="0 0 160 80" class="w-full h-16 mx-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="80" cy="40" r="32" stroke="#d97706" stroke-width="1.2" stroke-dasharray="4 2"/>
                  <polygon points="80,12 105,55 55,55" stroke="#f59e0b" stroke-width="1.2"/>
                  <polygon points="80,68 55,25 105,25" stroke="#f59e0b" stroke-width="1.2"/>
                  <circle cx="80" cy="40" r="6" fill="#fbbf24"/>
                </svg>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded bg-black/70 border border-amber-600/40 text-[9.5px] font-serif italic text-amber-200/90 leading-relaxed text-center">
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}

              <div class="pt-2 border-t border-amber-600/40 flex justify-between items-center font-cinzel text-[9px]">
                <span class="text-neutral-400">SELLADO POR: EL MAESTRE</span>
                <span class="text-amber-300 font-bold">EDICIÓN COLECCIONISTA</span>
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'theme-park') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full lanyard-badge-silhouette theme-park-glow text-white p-6 border-2 border-pink-500/50 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)]">
            <!-- Ranura de Lanyard -->
            <div class="w-full flex justify-center -mt-2 mb-2">
              <div class="w-16 h-3 rounded-full bg-[#050507] border-2 border-pink-400/60 shadow-inner"></div>
            </div>

            <div>
              <div class="border-b border-pink-400/40 pb-2 flex justify-between items-center font-syne">
                <span class="text-xs font-black text-pink-300 uppercase">LOG DE ADRENALINA &bull; ATRACCIONES</span>
                <span class="text-[9px] font-mono text-cyan-300 font-bold">10/10 RIDES</span>
              </div>

              <!-- Registro de Vueltas en Montaña Rusa -->
              <div class="space-y-1.5 my-2.5 font-mono text-[9.5px]">
                <div class="p-1.5 rounded bg-black/60 border border-purple-500/30 flex justify-between items-center">
                  <span>HYPER COASTER 360</span>
                  <span class="text-pink-400 font-bold">VUELTAS: 3 (FILA 1)</span>
                </div>
                <div class="p-1.5 rounded bg-black/60 border border-purple-500/30 flex justify-between items-center">
                  <span>CAÍDA LIBRE 100M</span>
                  <span class="text-yellow-400 font-bold">GRITOS AL MÁXIMO</span>
                </div>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded-xl bg-purple-950/70 border border-pink-400/30 text-[10px] font-mono text-purple-100">
                  <span class="text-[7.5px] uppercase tracking-wider text-pink-300 block">DIARIO DEL DÍA:</span>
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-pink-400/30 flex justify-between items-center text-[9px] font-mono">
              <span class="text-neutral-400">PASAPORTE VIP RESORT:</span>
              <span class="text-pink-300 font-bold font-syne">MEMORIA IMBORRABLE</span>
            </div>
          </div>
        `;
      } else if (arc === 'beach-club') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl beach-club-azure text-white p-5 border border-cyan-400/40 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)]">
            <div>
              <div class="border-b border-cyan-300/30 pb-2 flex justify-between items-center font-serif">
                <span class="text-xs font-bold italic text-cyan-200">Bitácora de Cala &amp; Olas</span>
                <span class="text-[9px] font-mono text-amber-300 font-bold">SOL Y MAR</span>
              </div>

              <div class="my-3 p-3 rounded-xl bg-black/40 border border-cyan-400/30 text-center font-serif">
                <div class="text-xs italic text-cyan-100 mb-1">Temperatura del Agua: 24°C &bull; Brisa de Levante</div>
                <div class="text-[9px] font-mono text-amber-300">PUESTA DE SOL PREVISTA: 20:45H</div>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded-xl bg-black/60 border border-cyan-400/30 text-[10px] font-mono text-cyan-100">
                  <span class="text-[7.5px] uppercase tracking-wider text-cyan-400 block font-serif italic">MEMORIAS DE LA BRISA:</span>
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-cyan-400/20 flex justify-between items-center text-[9px] font-mono">
              <span class="text-neutral-400 font-serif italic">Cala Serena Club</span>
              <span class="text-amber-300 font-bold font-serif">SUMMER FOREVER</span>
            </div>
          </div>
        `;
      } else if (arc === 'karaoke-lounge') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-3xl karaoke-neon text-white p-6 border-2 border-pink-500/50 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)]">
            <div>
              <div class="border-b border-pink-500/40 pb-2 flex justify-between items-center font-space">
                <span class="text-xs font-black text-pink-400 uppercase">SETLIST &amp; DUET TRACKS</span>
                <span class="text-[9px] font-mono text-cyan-400">ALL HITS</span>
              </div>

              <!-- Canciones Cantadas a Pleno Pulmon -->
              <div class="space-y-1.5 my-2.5 font-mono text-[9px]">
                <div class="p-1.5 rounded bg-black/70 border border-pink-500/30 flex justify-between">
                  <span>1. BOHEMIAN RHAPSODY</span>
                  <span class="text-amber-300">100% ENERGY</span>
                </div>
                <div class="p-1.5 rounded bg-black/70 border border-pink-500/30 flex justify-between">
                  <span>2. SHALLOW (DUETO)</span>
                  <span class="text-cyan-300">OVACIÓN TOTAL</span>
                </div>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded-xl bg-black/70 border border-pink-500/40 text-[10px] font-mono text-pink-100">
                  <span class="text-[7.5px] uppercase tracking-wider text-pink-400 block">BITÁCORA DE CABINA:</span>
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-pink-500/30 flex justify-between items-center text-[9px] font-mono">
              <span class="text-neutral-400">MICROPHONE SYSTEM:</span>
              <span class="text-pink-400 font-bold font-space">GOLDEN DUET MASTER</span>
            </div>
          </div>
        `;
      } else if (arc === 'brunch-cafe') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full hangtag-silhouette kraft-paper text-amber-100 p-6 border border-amber-600/50 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)]">
            <!-- Ojal de Laton Superior -->
            <div class="w-full flex justify-center -mt-3 mb-2">
              <div class="w-6 h-6 rounded-full bg-[#180d07] border-4 border-amber-500 shadow-md flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-[#050507]"></div>
              </div>
            </div>

            <div>
              <div class="border-b border-amber-600/40 pb-2 flex justify-between items-center font-mono text-[9px]">
                <span class="text-amber-300 font-bold uppercase">ORIGEN &amp; RECETA DEL TUESTE</span>
                <span class="text-amber-400">LOTE #04</span>
              </div>

              <div class="my-2.5 p-2.5 rounded bg-black/40 border border-amber-600/30 font-mono text-[9px] text-amber-200/90 leading-relaxed">
                <div>VARIEDAD: Geisha &bull; Lavado Natural</div>
                <div>ALTITUD: 1.850 msnm &bull; Tueste Medio Ligero</div>
                <div>MARIDAJE: Tostada con aguacate y huevos poché</div>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded bg-black/50 border border-amber-600/30 text-[10px] font-cormorant italic text-amber-100 text-sm">
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-amber-600/30 flex justify-between items-center text-[9px] font-mono">
              <span class="text-amber-400/80">SELLO ROASTERY:</span>
              <span class="text-amber-300 font-bold">CERTIFIED SPECIALTY</span>
            </div>
          </div>
        `;
      } else if (arc === 'bespoke-signature') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl obsidian-card text-amber-100 p-6 border border-amber-400/60 flex flex-col justify-between text-left select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.98)]">
            <!-- Hilo de Oro Metalico en el Borde Interior -->
            <div class="absolute inset-1.5 rounded-xl border border-amber-400/30 pointer-events-none"></div>

            <div>
              <div class="border-b border-amber-400/30 pb-2 flex justify-between items-center font-cinzel">
                <span class="text-xs font-bold text-amber-300 uppercase">TELEMETRÍA CRIPTOGRÁFICA // DUO VAULT</span>
                <span class="text-[9px] text-amber-400">LEDGER BESPOKE</span>
              </div>

              <!-- Banda Magnetica Superior Negra -->
              <div class="my-3 -mx-6 h-8 bg-black border-y border-amber-500/20 shadow-inner flex items-center justify-end px-6">
                <span class="font-mono text-[7px] text-neutral-500 tracking-widest">MAGNETIC STRIPE // 2048-BIT ENCRYPTED</span>
              </div>

              ${pass.note ? `
                <div class="p-2.5 rounded-xl bg-black/60 border border-amber-400/30 text-[10px] font-mono text-neutral-200">
                  <span class="text-[7.5px] uppercase tracking-wider text-amber-400/80 block font-cinzel">MENSAJE CIFRADO:</span>
                  &ldquo;${escapeHtml(pass.note)}&rdquo;
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-amber-400/30 flex justify-between items-center text-[9px] font-mono">
              <span class="text-neutral-400 font-cinzel">OBSIDIAN SIGNATURE</span>
              <span class="text-amber-300 font-bold font-cinzel">PERMANENT RECORD</span>
            </div>
          </div>
        `;
} else if (arc === 'arcade-scorecard') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#0c0d1e] border-2 border-cyan-400/50 p-5 text-white arcade-scanlines flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-pink-500/40 pb-2 flex justify-between items-center">
                <span class="font-arcade text-[9.5px] text-pink-400">HALL OF FAME '84</span>
                <span class="font-vt text-sm text-yellow-300">HIGH SCORES</span>
              </div>

              <div class="my-2.5 p-2 rounded-xl bg-black/80 border border-cyan-500/30 font-arcade text-[8px] space-y-1">
                <div class="flex justify-between text-yellow-300 font-bold">
                  <span>1ST 999,900</span><span>${escapeHtml(pass.p1Name ? pass.p1Name.substring(0,3).toUpperCase() : 'MIG')}</span>
                </div>
                <div class="flex justify-between text-pink-400 font-bold">
                  <span>2ND 884,200</span><span>${escapeHtml(pass.p2Name ? pass.p2Name.substring(0,3).toUpperCase() : 'MRT')}</span>
                </div>
                <div class="flex justify-between text-cyan-300">
                  <span>3RD 720,000</span><span>DUO</span>
                </div>
                <div class="flex justify-between text-zinc-500">
                  <span>4TH 540,100</span><span>PAC</span>
                </div>
              </div>

              <div class="space-y-1.5 font-mono text-xs">
                <div class="p-2 rounded-lg bg-black/60 border border-zinc-800">
                  <div class="text-cyan-400 font-bold text-[10px]">REGLA DE ORO:</div>
                  <div class="text-zinc-300 text-[10.5px]">El que consiga el primer pleno (Strike) elige la cancion en el coche de vuelta.</div>
                </div>
                <div class="p-2 rounded-lg bg-black/60 border border-zinc-800">
                  <div class="text-pink-400 font-bold text-[10px]">PREMIO FINAL:</div>
                  <div class="text-zinc-300 text-[10.5px]">El que pierda paga los helados o batidos gigantes de la cafeteria.</div>
                </div>
              </div>
            </div>

            <div class="p-2 bg-pink-950/30 rounded-lg border border-pink-500/30 flex items-center justify-between font-arcade text-[8px]">
              <span class="text-pink-300">TICKETS: 1,500</span>
              <span class="text-yellow-400">CANJEAR POR PREMIO</span>
            </div>
          </div>
        `;
      } else if (arc === 'wine-reserve') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#FAF3E8] border-2 border-[#b89f80] p-6 text-[#2f1f14] flex flex-col justify-between text-left select-none">
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
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/20 p-5 text-white text-left flex flex-col justify-between select-none">
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
            <div id="${cardId}" class="perspective-scene relative w-full">
              <div id="${cardId}-flipper" class="flipper-container relative w-full cursor-pointer">
                ${frontHtml}
                ${backHtml}
              </div>
            </div>
          </div>
        `;
      }

      if (hideActions) {
        return `
          <div class="duo-pass-wrapper relative w-full max-w-sm mx-auto my-1" data-pass-json="${escapeHtml(JSON.stringify(pass))}">
            <div id="${cardId}" class="perspective-scene relative w-full">
              <div id="${cardId}-flipper" class="flipper-container relative w-full cursor-pointer">
                ${frontHtml}
                ${backHtml}
              </div>
            </div>
          </div>
        `;
      }

      // Version interactiva con volteo 3D y acciones inferiores
      return `
        <div class="duo-pass-wrapper relative w-full max-w-sm mx-auto my-2" data-pass-json="${escapeHtml(JSON.stringify(pass))}">
          <div id="${cardId}" class="perspective-scene relative w-full">
            <div id="${cardId}-flipper" class="flipper-container relative w-full cursor-pointer">
              ${frontHtml}
              ${backHtml}
            </div>
          </div>
          
          <div class="mt-1.5 flex items-center justify-between px-1 text-[11px] text-neutral-400">
            <span class="text-[10px] font-mono text-neutral-500">${pass.archetypeLabel || this.LABELS[arc] || arc}</span>
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
              ${this.renderPassCard(pass, { id: cardId, compact: false, hideActions: true })}
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
            if (typeof sound !== 'undefined' && sound.playFlip) sound.playFlip();
            if (typeof sound !== 'undefined' && sound.vibrate) sound.vibrate([20]);
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
            if (typeof sound !== 'undefined' && sound.playFlip) sound.playFlip();
            if (typeof sound !== 'undefined' && sound.vibrate) sound.vibrate([20]);
            flipper.classList.toggle('flipped');
          }
        });
      });
    }
  };

  if (typeof window !== 'undefined') {
    window.DuoPassEngine = DuoPassEngine;
  }
