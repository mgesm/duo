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
        case 'stadium-ticket':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden stadium-grass text-white p-5 border border-emerald-400/40 text-left select-none shadow-2xl">
              <!-- Muescas circulares de entrada troquelada en ambos laterales -->
              <div class="absolute -left-3 bottom-[92px] w-6 h-6 rounded-full bg-[#050507] border border-emerald-500/40 z-20"></div>
              <div class="absolute -right-3 bottom-[92px] w-6 h-6 rounded-full bg-[#050507] border border-emerald-500/40 z-20"></div>
              <div class="absolute left-3 right-3 bottom-[104px] border-b-2 border-dashed border-emerald-400/40 z-10 pointer-events-none"></div>

              <!-- Cabecera de Seguridad y Torniquete -->
              <div class="flex items-center justify-between pb-2 border-b border-emerald-500/40 text-[9px] font-mono">
                <div class="flex items-center gap-1.5 font-bold text-emerald-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>LIGA DUO MATCH DAY // ENTRADA OFICIAL</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold uppercase tracking-wider">ACCESO TORNICUETE</span>
              </div>

              <!-- Ilustracion Vectorial Rica: Estadio Isometrico 3D & Balon con Sombras -->
              <div class="my-2.5 text-center relative">
                <svg viewBox="0 0 320 130" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="stadiumLightL" x1="0%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stop-color="#34d399" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
                    </linearGradient>
                    <linearGradient id="stadiumLightR" x1="100%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stop-color="#34d399" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
                    </linearGradient>
                    <radialGradient id="ballShine" cx="35%" cy="30%" r="65%">
                      <stop offset="0%" stop-color="#ffffff"/>
                      <stop offset="55%" stop-color="#e2e8f0"/>
                      <stop offset="100%" stop-color="#64748b"/>
                    </radialGradient>
                    <radialGradient id="ballShadow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
                      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                  </defs>

                  <!-- Focos Reflectores y Haces de Luz -->
                  <polygon points="15,5 95,95 35,95" fill="url(#stadiumLightL)"/>
                  <polygon points="305,5 225,95 285,95" fill="url(#stadiumLightR)"/>
                  <circle cx="15" cy="5" r="4" fill="#6ee7b7"/>
                  <circle cx="305" cy="5" r="4" fill="#6ee7b7"/>

                  <!-- Grada del Estadio en Perspectiva -->
                  <path d="M40 85 L280 85 L310 115 L10 115 Z" fill="#064e3b" stroke="#047857" stroke-width="1.2"/>
                  <!-- Lineas de Asientos de Grada -->
                  <line x1="32" y1="92" x2="288" y2="92" stroke="#059669" stroke-width="1" stroke-dasharray="3 2"/>
                  <line x1="24" y1="100" x2="296" y2="100" stroke="#059669" stroke-width="1" stroke-dasharray="4 2"/>
                  <line x1="15" y1="108" x2="305" y2="108" stroke="#059669" stroke-width="1" stroke-dasharray="4 2"/>

                  <!-- Campo de Futbol Central en Perspectiva Isometrica -->
                  <polygon points="70,55 250,55 275,92 45,92" fill="#047857" stroke="#10b981" stroke-width="1.5"/>
                  <!-- Franjas de Cesped Segado -->
                  <polygon points="100,55 130,55 138,92 108,92" fill="#065f46"/>
                  <polygon points="160,55 190,55 198,92 168,92" fill="#065f46"/>
                  <polygon points="220,55 250,55 258,92 228,92" fill="#065f46"/>
                  <!-- Lineas del Campo: Centro y Areas -->
                  <line x1="160" y1="55" x2="160" y2="92" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.8"/>
                  <ellipse cx="160" cy="73" rx="22" ry="9" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.8" fill="none"/>
                  <circle cx="160" cy="73" r="1.5" fill="#ffffff"/>
                  <!-- Area Porteria Izq y Der -->
                  <polygon points="70,64 90,64 94,83 74,83" stroke="#ffffff" stroke-width="1" stroke-opacity="0.7" fill="none"/>
                  <polygon points="250,64 230,64 226,83 246,83" stroke="#ffffff" stroke-width="1" stroke-opacity="0.7" fill="none"/>

                  <!-- Sombra Proyectada del Balon 3D -->
                  <ellipse cx="160" cy="50" rx="22" ry="5" fill="url(#ballShadow)"/>

                  <!-- Balon de Futbol 3D Hiperdetallado con Textura y Paneles Cosidos -->
                  <g transform="translate(160, 32)">
                    <!-- Esfera Base con Luz Especular -->
                    <circle cx="0" cy="0" r="18" fill="url(#ballShine)" stroke="#064e3b" stroke-width="1.2"/>
                    <!-- Pentagono Central Negro con Brillo -->
                    <polygon points="0,-4 5,0 3,6 -3,6 -5,0" fill="#0f172a" stroke="#334155" stroke-width="0.8"/>
                    <!-- Costuras y Pentagonos Circundantes -->
                    <line x1="0" y1="-4" x2="0" y2="-12" stroke="#1e293b" stroke-width="0.9"/>
                    <line x1="5" y1="0" x2="13" y2="-2" stroke="#1e293b" stroke-width="0.9"/>
                    <line x1="3" y1="6" x2="9" y2="13" stroke="#1e293b" stroke-width="0.9"/>
                    <line x1="-3" y1="6" x2="-9" y2="13" stroke="#1e293b" stroke-width="0.9"/>
                    <line x1="-5" y1="0" x2="-13" y2="-2" stroke="#1e293b" stroke-width="0.9"/>
                    <!-- Pentagonos de Borde Curvos -->
                    <polygon points="0,-12 6,-15 11,-10 8,-5 0,-10" fill="#1e293b" opacity="0.9"/>
                    <polygon points="13,-2 17,2 15,8 10,7 10,1" fill="#1e293b" opacity="0.9"/>
                    <polygon points="-13,-2 -17,2 -15,8 -10,7 -10,1" fill="#1e293b" opacity="0.9"/>
                    <polygon points="-9,13 -5,17 0,16 1,12 -5,10" fill="#1e293b" opacity="0.9"/>
                    <polygon points="9,13 5,17 0,16 -1,12 5,10" fill="#1e293b" opacity="0.9"/>
                    <!-- Brillo Especular Superior Blanco -->
                    <ellipse cx="-5" cy="-7" rx="5" ry="2.5" fill="#ffffff" opacity="0.75" transform="rotate(-25 -5 -7)"/>
                  </g>

                  <!-- Banderines de Corner -->
                  <line x1="45" y1="92" x2="45" y2="82" stroke="#facc15" stroke-width="1"/>
                  <polygon points="45,82 51,85 45,88" fill="#ef4444"/>
                  <line x1="275" y1="92" x2="275" y2="82" stroke="#facc15" stroke-width="1"/>
                  <polygon points="275,82 281,85 275,88" fill="#ef4444"/>
                </svg>

                <p class="font-mono text-[8px] text-emerald-300 tracking-[0.3em] uppercase mt-0.5">DERBI OFICIAL DE PAREJA // COPA DUO</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-green-200 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>

                <!-- Marcador Digital LED Estilo Estadio -->
                <div class="inline-flex items-center gap-2.5 mt-1.5 px-3.5 py-1 rounded-full bg-black/80 border border-emerald-500/50 text-xs shadow-inner">
                  <div class="flex items-center gap-1 font-black text-emerald-300">
                    <svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                    <span>DUO FC</span>
                  </div>
                  <span class="font-mono text-[11px] font-black text-amber-300 bg-emerald-950/90 px-2.5 py-0.5 rounded border border-emerald-500/40 tracking-widest">3 - 0</span>
                  <div class="flex items-center gap-1 font-black text-emerald-300">
                    <span>LOVE UTD</span>
                    <svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                  </div>
                </div>
              </div>

              <!-- Grid de Grada / Fila / Asiento -->
              <div class="p-2.5 bg-black/75 rounded-xl border border-emerald-500/35 font-mono text-[9px] grid grid-cols-3 gap-1 text-center my-2.5 shadow-inner">
                <div class="border-r border-emerald-500/25">
                  <span class="text-emerald-400/80 text-[7px] block uppercase tracking-wider">SECTOR</span>
                  <strong class="text-white text-xs">TRIBUNA OESTE</strong>
                </div>
                <div class="border-r border-emerald-500/25">
                  <span class="text-emerald-400/80 text-[7px] block uppercase tracking-wider">FILA</span>
                  <strong class="text-emerald-300 text-xs">FILA 04</strong>
                </div>
                <div>
                  <span class="text-emerald-400/80 text-[7px] block uppercase tracking-wider">ASIENTOS</span>
                  <strong class="text-amber-300 text-xs">18 &amp; 19 VIP LOVE</strong>
                </div>
              </div>

              <div class="flex justify-between items-center px-1 font-mono text-[9.5px] text-neutral-300 mb-2">
                <span class="truncate max-w-[210px]">AFICIONADOS: <strong class="text-emerald-200">${escapeHtml(pass.coupleNames)}</strong></span>
                <span class="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">ABONO GOLD</span>
              </div>

              <!-- Footer Codigo de Barras de Torniquete y Sello de Entrada -->
              <div class="pt-2 border-t border-dashed border-emerald-500/40 flex items-center justify-between">
                <div class="w-28 opacity-90">
                  ${this.getBarcodeSvg('#10b981')}
                </div>
                <div class="px-2.5 py-1 rounded border border-emerald-500/50 bg-emerald-500/15 text-emerald-300 text-[8px] font-mono font-bold leading-tight text-center">
                  VALID ENTRY // GATE 07<br>TORNICUETE OK
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // RACKET CLUB (PADEL & TENIS COURT SCORECARD)
        // ----------------------------------------------------
        case 'racket-club':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden court-blue text-white p-5 border border-sky-400/50 text-left select-none shadow-2xl">
              <!-- Remaches metalicos de torneo en las 4 esquinas -->
              <div class="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-slate-300 border border-slate-500 shadow-sm"></div>
              <div class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-slate-300 border border-slate-500 shadow-sm"></div>
              <div class="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-slate-300 border border-slate-500 shadow-sm"></div>
              <div class="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-slate-300 border border-slate-500 shadow-sm"></div>

              <!-- Ranura superior troquelada para cordon de torneo -->
              <div class="w-16 h-1.5 mx-auto -mt-2 mb-2 rounded-full bg-black/60 border border-sky-400/40"></div>

              <div class="flex items-center justify-between pb-2 border-b border-sky-400/35 text-[9px] font-mono">
                <span class="font-bold text-sky-200 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  WORLD DUO TOUR // PREMIER PADEL &amp; TENNIS
                </span>
                <span class="px-2 py-0.5 rounded bg-sky-500/25 text-sky-200 border border-sky-400/40 font-bold uppercase tracking-wider">PISTA CENTRAL</span>
              </div>

              <!-- Ilustracion Vectorial Rica: Palas de Carbono Cruzadas, Pelota de Tenis 3D con Fieltro y Pista Azul -->
              <div class="my-2 text-center relative">
                <svg viewBox="0 0 320 135" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="feltBall" cx="35%" cy="30%" r="65%">
                      <stop offset="0%" stop-color="#facc15"/>
                      <stop offset="35%" stop-color="#ccff00"/>
                      <stop offset="85%" stop-color="#84cc16"/>
                      <stop offset="100%" stop-color="#4d7c0f"/>
                    </radialGradient>
                    <linearGradient id="padelCarbon" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#334155"/>
                      <stop offset="50%" stop-color="#0f172a"/>
                      <stop offset="100%" stop-color="#1e293b"/>
                    </linearGradient>
                    <linearGradient id="tennisGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#fbbf24"/>
                      <stop offset="50%" stop-color="#d97706"/>
                      <stop offset="100%" stop-color="#78350f"/>
                    </linearGradient>
                  </defs>

                  <!-- Fondo de Pista Azul Cristal en Perspectiva -->
                  <polygon points="55,100 265,100 295,130 25,130" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2"/>
                  <!-- Lineas Blancas de Pista -->
                  <line x1="160" y1="100" x2="160" y2="130" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.85"/>
                  <line x1="45" y1="115" x2="275" y2="115" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.85"/>
                  <line x1="75" y1="100" x2="50" y2="130" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.85"/>
                  <line x1="245" y1="100" x2="270" y2="130" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.85"/>
                  <!-- Red Central con Malla Cuadriculada -->
                  <line x1="55" y1="100" x2="265" y2="100" stroke="#f8fafc" stroke-width="2"/>
                  <path d="M55 100 L265 100 M60 96 L260 96" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="2 2"/>

                  <!-- PALA DE PADEL DE CARBONO (IZQUIERDA) -->
                  <g transform="translate(115, 52) rotate(-22)">
                    <!-- Empuñadura con Overgrip Blanco Texturizado -->
                    <rect x="-4" y="24" width="8" height="34" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.8"/>
                    <line x1="-4" y1="30" x2="4" y2="33" stroke="#cbd5e1" stroke-width="0.8"/>
                    <line x1="-4" y1="38" x2="4" y2="41" stroke="#cbd5e1" stroke-width="0.8"/>
                    <line x1="-4" y1="46" x2="4" y2="49" stroke="#cbd5e1" stroke-width="0.8"/>
                    <!-- Tapon y Cordon de Seguridad -->
                    <rect x="-5" y="56" width="10" height="4" rx="1" fill="#0284c7"/>
                    <path d="M0 60 C-3 66, 3 70, 0 74" stroke="#38bdf8" stroke-width="1.2" fill="none"/>
                    <!-- Corazon / Puente Aerodinamico -->
                    <path d="M-6 24 C-10 16, -18 8, -20 -4 C-20 -28, 20 -28, 20 -4 C18 8, 10 16, 6 24 Z" fill="url(#padelCarbon)" stroke="#38bdf8" stroke-width="1.5"/>
                    <polygon points="-6,10 6,10 0,20" fill="#0369a1" stroke="#38bdf8" stroke-width="0.8"/>
                    <!-- Matriz de Agujeros de Perforacion con Relieve 3D -->
                    <g fill="#0284c7" stroke="#0c4a6e" stroke-width="0.6">
                      <circle cx="-10" cy="-14" r="1.8"/> <circle cx="-4" cy="-14" r="1.8"/> <circle cx="4" cy="-14" r="1.8"/> <circle cx="10" cy="-14" r="1.8"/>
                      <circle cx="-13" cy="-7" r="1.8"/> <circle cx="-7" cy="-7" r="1.8"/> <circle cx="0" cy="-7" r="1.8"/> <circle cx="7" cy="-7" r="1.8"/> <circle cx="13" cy="-7" r="1.8"/>
                      <circle cx="-13" cy="0" r="1.8"/> <circle cx="-7" cy="0" r="1.8"/> <circle cx="0" cy="0" r="1.8"/> <circle cx="7" cy="0" r="1.8"/> <circle cx="13" cy="0" r="1.8"/>
                      <circle cx="-10" cy="7" r="1.8"/> <circle cx="-4" cy="7" r="1.8"/> <circle cx="4" cy="7" r="1.8"/> <circle cx="10" cy="7" r="1.8"/>
                    </g>
                    <!-- Logotipo Central Duo en la Pala -->
                    <circle cx="0" cy="-4" r="5" fill="#38bdf8" opacity="0.3"/>
                  </g>

                  <!-- RAQUETA DE TENIS CON CORDAJE DETALLADO (DERECHA) -->
                  <g transform="translate(205, 52) rotate(22)">
                    <!-- Mango de Cuero -->
                    <rect x="-4" y="24" width="8" height="34" rx="2" fill="#78350f" stroke="#451a03" stroke-width="0.8"/>
                    <line x1="-4" y1="30" x2="4" y2="33" stroke="#b45309" stroke-width="0.8"/>
                    <line x1="-4" y1="38" x2="4" y2="41" stroke="#b45309" stroke-width="0.8"/>
                    <line x1="-4" y1="46" x2="4" y2="49" stroke="#b45309" stroke-width="0.8"/>
                    <!-- Marco Dorado y Garganta Abierta -->
                    <path d="M-5 24 C-8 14, -14 6, -18 -4 C-18 -28, 18 -28, 18 -4 C14 6, 8 14, 5 24 Z" fill="none" stroke="url(#tennisGold)" stroke-width="2.5"/>
                    <!-- Cordaje Cruzado en Malla Fina -->
                    <g stroke="#fef08a" stroke-width="0.6" stroke-opacity="0.85">
                      <line x1="-12" y1="-22" x2="-12" y2="10"/>
                      <line x1="-6" y1="-26" x2="-6" y2="16"/>
                      <line x1="0" y1="-27" x2="0" y2="18"/>
                      <line x1="6" y1="-26" x2="6" y2="16"/>
                      <line x1="12" y1="-22" x2="12" y2="10"/>
                      <line x1="-15" y1="-18" x2="15" y2="-18"/>
                      <line x1="-17" y1="-11" x2="17" y2="-11"/>
                      <line x1="-18" y1="-4" x2="18" y2="-4"/>
                      <line x1="-17" y1="3" x2="17" y2="3"/>
                      <line x1="-14" y1="10" x2="14" y2="10"/>
                    </g>
                  </g>

                  <!-- PELOTA DE TENIS 3D CON FIELTRO Y COSTURA CURVA EN RELIEVE -->
                  <g transform="translate(160, 48)">
                    <!-- Sombra de la Pelota -->
                    <ellipse cx="2" cy="18" rx="14" ry="4" fill="#000000" opacity="0.45"/>
                    <!-- Cuerpo con Fieltro Amarillo Optico -->
                    <circle cx="0" cy="0" r="14" fill="url(#feltBall)" stroke="#4d7c0f" stroke-width="1"/>
                    <!-- Costura Blanca de Caucho Curva Caracteristica -->
                    <path d="M-10 -7 C-4 -4, -4 4, -10 7" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" fill="none"/>
                    <path d="M10 -7 C4 -4, 4 4, 10 7" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" fill="none"/>
                    <!-- Brillo Especular Suave -->
                    <circle cx="-4" cy="-5" r="3" fill="#ffffff" opacity="0.6"/>
                    <!-- Estela de Impacto Dinamica -->
                    <path d="M-16 0 C-24 -4, -28 -10, -32 -14" stroke="#facc15" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.8"/>
                  </g>
                </svg>

                <p class="font-mono text-[8px] text-sky-200 tracking-[0.28em] uppercase mt-0.5">MASTER FINAL // CLUB OFICIAL DE RAQUETA</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-white to-cyan-200 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[9.5px] text-sky-200 mt-0.5">Pareja Titular: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Marcador de Sets en Directo -->
              <div class="my-2.5 p-2 bg-black/75 rounded-xl border border-sky-400/35 font-mono text-[9px] grid grid-cols-3 gap-1 text-center shadow-inner">
                <div class="border-r border-sky-400/25">
                  <span class="text-sky-300/80 text-[7px] block uppercase tracking-wider">SET 1</span>
                  <strong class="text-white text-xs">6 - 4</strong>
                </div>
                <div class="border-r border-sky-400/25">
                  <span class="text-sky-300/80 text-[7px] block uppercase tracking-wider">SET 2</span>
                  <strong class="text-amber-300 text-xs">7 - 5 (TB)</strong>
                </div>
                <div>
                  <span class="text-sky-300/80 text-[7px] block uppercase tracking-wider">RESULTADO</span>
                  <strong class="text-emerald-400 text-xs">MATCH POINT OK</strong>
                </div>
              </div>

              <!-- Footer Codigo de Barras de Pista -->
              <div class="pt-2 border-t border-dashed border-sky-400/35 flex items-center justify-between">
                <div class="w-28 opacity-90">
                  ${this.getBarcodeSvg('#38bdf8')}
                </div>
                <div class="px-2.5 py-1 rounded border border-sky-400/50 bg-sky-500/15 text-sky-200 text-[8px] font-mono font-bold leading-tight text-center">
                  PISTA AZUL CRISTAL<br>MASTER DUO COURT
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // FITNESS PASS (DORSAL OFICIAL DE MARATON & GYM VIP)
        // ----------------------------------------------------
        case 'fitness-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden bib-fiber text-slate-900 p-5 border-2 border-slate-300/90 text-left select-none shadow-2xl">
              <!-- 4 IMPERDIBLES METALICOS 3D SVG EN LAS ESQUINAS CON SOMBRA -->
              <div class="absolute top-2 left-2 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                  <ellipse cx="6" cy="10" rx="3" ry="3" fill="#64748b"/>
                  <path d="M6 10 C14 3, 26 3, 30 7 C32 9, 32 11, 30 13 C26 17, 14 17, 6 10 Z" stroke="#94a3b8" stroke-width="1.8" fill="none"/>
                  <rect x="24" y="6" width="8" height="8" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
                  <circle cx="6" cy="10" r="2" fill="#cbd5e1"/>
                </svg>
              </div>
              <div class="absolute top-2 right-2 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <svg width="34" height="20" viewBox="0 0 34 20" fill="none" class="transform -scale-x-100">
                  <ellipse cx="6" cy="10" rx="3" ry="3" fill="#64748b"/>
                  <path d="M6 10 C14 3, 26 3, 30 7 C32 9, 32 11, 30 13 C26 17, 14 17, 6 10 Z" stroke="#94a3b8" stroke-width="1.8" fill="none"/>
                  <rect x="24" y="6" width="8" height="8" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
                  <circle cx="6" cy="10" r="2" fill="#cbd5e1"/>
                </svg>
              </div>
              <div class="absolute bottom-2 left-2 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                  <ellipse cx="6" cy="10" rx="3" ry="3" fill="#64748b"/>
                  <path d="M6 10 C14 3, 26 3, 30 7 C32 9, 32 11, 30 13 C26 17, 14 17, 6 10 Z" stroke="#94a3b8" stroke-width="1.8" fill="none"/>
                  <rect x="24" y="6" width="8" height="8" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
                  <circle cx="6" cy="10" r="2" fill="#cbd5e1"/>
                </svg>
              </div>
              <div class="absolute bottom-2 right-2 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                <svg width="34" height="20" viewBox="0 0 34 20" fill="none" class="transform -scale-x-100">
                  <ellipse cx="6" cy="10" rx="3" ry="3" fill="#64748b"/>
                  <path d="M6 10 C14 3, 26 3, 30 7 C32 9, 32 11, 30 13 C26 17, 14 17, 6 10 Z" stroke="#94a3b8" stroke-width="1.8" fill="none"/>
                  <rect x="24" y="6" width="8" height="8" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
                  <circle cx="6" cy="10" r="2" fill="#cbd5e1"/>
                </svg>
              </div>

              <!-- Franja Superior de Maratón Oficial en Rojo & Azul Marino -->
              <div class="flex items-center justify-between pb-1.5 border-b-2 border-red-600 text-[9px] font-mono text-slate-800">
                <div class="flex items-center gap-1.5 font-black text-red-600">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  <span>DUO PERFORMANCE // MARATHON &amp; FITNESS VIP</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-red-600 text-white font-black uppercase tracking-wider text-[8px]">DORSAL OFICIAL</span>
              </div>

              <!-- Numero Gigante de Dorsal con Tipografia Atletica de Competicion -->
              <div class="my-2 text-center">
                <p class="font-mono text-[8px] text-slate-500 uppercase tracking-[0.25em]">CATEGORIA OFICIAL: PAREJA MIXTA</p>
                <div class="font-black text-4xl sm:text-5xl tracking-tighter text-slate-900 my-0 font-mono drop-shadow-sm flex items-center justify-center gap-2">
                  <span class="text-red-600 text-2xl">#</span>DUO-01
                </div>
                <h3 class="text-sm font-black text-slate-900 uppercase tracking-wide truncate max-w-[280px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[10px] text-slate-600">Corredores: <strong class="text-slate-900">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Grafica de Altimetria / Desnivel del Recorrido & Curva ECG de Pulsaciones SVG -->
              <div class="my-2 p-2 bg-white rounded-xl border border-slate-200/90 shadow-inner">
                <div class="flex justify-between items-center text-[7.5px] font-mono text-slate-500 mb-1 px-1">
                  <span>PERFIL DE ALTIMETRIA // +420M DESNIVEL</span>
                  <span class="text-red-600 font-bold">168 PPM MEDIA</span>
                </div>
                <svg viewBox="0 0 300 48" class="w-full h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="elevationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.4"/>
                      <stop offset="100%" stop-color="#ef4444" stop-opacity="0.02"/>
                    </linearGradient>
                  </defs>
                  <!-- Perfil Montañoso de Carrera con Relleno en Degradado -->
                  <path d="M0 40 L35 38 L70 24 L105 28 L140 10 L175 16 L210 6 L245 22 L275 14 L300 40 Z" fill="url(#elevationGrad)"/>
                  <path d="M0 40 L35 38 L70 24 L105 28 L140 10 L175 16 L210 6 L245 22 L275 14 L300 40" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
                  <!-- Puntos Kilometricos y Meta -->
                  <circle cx="70" cy="24" r="2.5" fill="#ef4444"/>
                  <text x="70" y="20" fill="#64748b" font-size="6" font-family="monospace" text-anchor="middle">KM 3</text>
                  <circle cx="140" cy="10" r="2.5" fill="#ef4444"/>
                  <text x="140" y="7" fill="#64748b" font-size="6" font-family="monospace" text-anchor="middle">KM 7</text>
                  <circle cx="210" cy="6" r="3" fill="#b91c1c"/>
                  <text x="210" y="4" fill="#b91c1c" font-size="6" font-weight="bold" font-family="monospace" text-anchor="middle">CIMA</text>
                  <!-- Bandera de Meta -->
                  <line x1="275" y1="14" x2="275" y2="4" stroke="#0f172a" stroke-width="1"/>
                  <polygon points="275,4 283,7 275,10" fill="#0f172a"/>
                  <!-- Curva ECG de Latidos en la Base -->
                  <path d="M0 45 L50 45 L55 39 L60 48 L65 41 L70 45 L150 45 L155 38 L160 49 L165 40 L170 45 L240 45 L245 36 L250 50 L255 39 L260 45 L300 45" stroke="#3b82f6" stroke-width="1.2" stroke-opacity="0.85"/>
                </svg>
              </div>

              <!-- Metricas de Carrera -->
              <div class="p-2 bg-slate-100/90 rounded-xl border border-slate-200 font-mono text-[9px] grid grid-cols-3 gap-1 text-center my-2 shadow-inner">
                <div class="border-r border-slate-300">
                  <span class="text-slate-500 text-[7px] block uppercase">TIEMPO META</span>
                  <strong class="text-slate-900 text-xs">42:18</strong>
                </div>
                <div class="border-r border-slate-300">
                  <span class="text-slate-500 text-[7px] block uppercase">RITMO MEDIO</span>
                  <strong class="text-red-600 text-xs">4:14/km</strong>
                </div>
                <div>
                  <span class="text-slate-500 text-[7px] block uppercase">CALORIAS</span>
                  <strong class="text-amber-700 text-xs">850 kcal</strong>
                </div>
              </div>

              <!-- Footer con Chip RFID y Codigo de Barras -->
              <div class="pt-2 border-t-2 border-dashed border-slate-300 flex items-center justify-between">
                <div class="w-28 opacity-85">
                  ${this.getBarcodeSvg('#0f172a')}
                </div>
                <div class="px-2 py-1 rounded bg-red-100 border border-red-300 text-red-800 text-[7.5px] font-mono font-bold leading-tight text-center">
                  RFID CHIP TIMING<br>FINISHER DUO MEDAL
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // GAMER PASS (CARTUCHO RETRO 16-BIT & CO-OP)
        // ----------------------------------------------------
        case 'gamer-pass':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden cartridge-body text-white p-5 border-2 border-amber-500/50 text-left select-none shadow-2xl">
              <!-- Ranuras Plasticas Moldeadas de Agarre en el Tope del Cartucho -->
              <div class="flex items-center justify-center gap-1.5 -mt-2 mb-3">
                <span class="w-7 h-1.5 rounded-full bg-black/80 border-t border-white/10 shadow-inner"></span>
                <span class="w-7 h-1.5 rounded-full bg-black/80 border-t border-white/10 shadow-inner"></span>
                <span class="w-7 h-1.5 rounded-full bg-black/80 border-t border-white/10 shadow-inner"></span>
                <span class="w-7 h-1.5 rounded-full bg-black/80 border-t border-white/10 shadow-inner"></span>
                <span class="w-7 h-1.5 rounded-full bg-black/80 border-t border-white/10 shadow-inner"></span>
                <span class="w-7 h-1.5 rounded-full bg-black/80 border-t border-white/10 shadow-inner"></span>
              </div>

              <!-- Header de Consola 16-Bit -->
              <div class="flex items-center justify-between pb-2 border-b border-amber-400/30 text-[9px] font-mono">
                <span class="font-bold text-amber-300 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  16-BIT RETRO SYSTEM // CO-OP CARTRIDGE
                </span>
                <span class="px-2 py-0.5 rounded bg-amber-500/25 text-amber-200 border border-amber-400/40 font-bold uppercase tracking-wider">2 PLAYERS CO-OP</span>
              </div>

              <!-- Pegatina Metalizada Glossy con Arte Vectorial de Mandos & Barras RPG -->
              <div class="my-2.5 p-3 rounded-xl bg-gradient-to-b from-[#2a1708] via-[#1a0f05] to-[#0d0702] border-2 border-amber-400/40 shadow-inner relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

                <!-- HUD Estilo RPG: Barras de Vida P1 & P2 con Gemas de Corazon 3D -->
                <div class="grid grid-cols-2 gap-2 mb-2 font-mono text-[8.5px]">
                  <div class="p-1.5 rounded bg-black/70 border border-rose-500/40">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-rose-400 font-bold flex items-center gap-1">
                        <svg class="w-2.5 h-2.5 fill-rose-500" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        P1 HP
                      </span>
                      <span class="text-emerald-400 font-bold">100%</span>
                    </div>
                    <div class="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div class="w-full h-full bg-gradient-to-r from-rose-500 to-emerald-400"></div>
                    </div>
                  </div>

                  <div class="p-1.5 rounded bg-black/70 border border-cyan-500/40">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-cyan-400 font-bold flex items-center gap-1">
                        <svg class="w-2.5 h-2.5 fill-cyan-400" viewBox="0 0 24 24"><polygon points="12,2 22,12 12,22 2,12"/></svg>
                        P2 MP
                      </span>
                      <span class="text-cyan-300 font-bold">MAX</span>
                    </div>
                    <div class="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div class="w-full h-full bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
                    </div>
                  </div>
                </div>

                <!-- Mando Retro Vectorial SVG con Botones y D-Pad 3D -->
                <svg viewBox="0 0 200 55" class="w-36 h-10 mx-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Carcasa del mando SNES gris/dorado -->
                  <rect x="20" y="8" width="160" height="40" rx="20" fill="#292524" stroke="#f59e0b" stroke-width="1.5"/>
                  <!-- D-Pad Cruceta Izquierda -->
                  <g fill="#0f172a" stroke="#475569" stroke-width="0.8">
                    <rect x="42" y="23" width="10" height="10" rx="1"/>
                    <rect x="42" y="15" width="10" height="8" rx="1"/>
                    <rect x="42" y="33" width="10" height="8" rx="1"/>
                    <rect x="34" y="23" width="8" height="10" rx="1"/>
                    <rect x="52" y="23" width="8" height="10" rx="1"/>
                  </g>
                  <!-- Botones Select y Start -->
                  <rect x="88" y="28" width="10" height="3" rx="1.5" fill="#64748b" transform="rotate(-25 88 28)"/>
                  <rect x="104" y="28" width="10" height="3" rx="1.5" fill="#64748b" transform="rotate(-25 104 28)"/>
                  <!-- Botones de Accion ABXY Coloridos -->
                  <circle cx="140" cy="22" r="3.5" fill="#3b82f6"/>
                  <circle cx="150" cy="16" r="3.5" fill="#ef4444"/>
                  <circle cx="160" cy="22" r="3.5" fill="#eab308"/>
                  <circle cx="150" cy="28" r="3.5" fill="#22c55e"/>
                </svg>

                <div class="text-center mt-1">
                  <p class="font-mono text-[7.5px] text-amber-400 tracking-[0.25em] uppercase">LEVEL 99 // CO-OP GUILD</p>
                  <h3 class="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-400 uppercase tracking-tight truncate max-w-[260px] mx-auto">${escapeHtml(pass.name)}</h3>
                  <p class="font-mono text-[9px] text-amber-200/90">Jugadores: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
                </div>
              </div>

              <!-- PINES DORADOS DE CONTACTO PCB EN LA BASE DEL CARTUCHO -->
              <div class="mt-2.5 pt-2 border-t border-amber-400/40 flex items-center justify-between">
                <div class="w-28 opacity-85">
                  ${this.getBarcodeSvg('#f59e0b')}
                </div>
                <!-- 10 Pines Dorados de Cobre con Relieve -->
                <div class="flex items-center gap-1 p-1 bg-black/90 rounded border border-amber-500/40">
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                  <span class="w-1.5 h-4 rounded-xs bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 shadow-sm"></span>
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // BOARDGAME CARD (CARTA MITICA TCG & QUEST DE TABLERO)
        // ----------------------------------------------------
        case 'boardgame-card':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden boardgame-parchment text-amber-100 p-5 border-2 border-amber-500/70 text-left select-none shadow-2xl">
              <!-- 4 GEMAS ENGARZADAS EN LAS ESQUINAS SVG CON DESTELLOS -->
              <div class="absolute top-2 left-2 z-20 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon points="9,1 17,9 9,17 1,9" fill="#dc2626" stroke="#fbbf24" stroke-width="1.2"/>
                  <polygon points="9,4 14,9 9,14 4,9" fill="#ef4444"/>
                  <circle cx="7" cy="7" r="1.5" fill="#ffffff" opacity="0.8"/>
                </svg>
              </div>
              <div class="absolute top-2 right-2 z-20 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon points="9,1 17,9 9,17 1,9" fill="#dc2626" stroke="#fbbf24" stroke-width="1.2"/>
                  <polygon points="9,4 14,9 9,14 4,9" fill="#ef4444"/>
                  <circle cx="7" cy="7" r="1.5" fill="#ffffff" opacity="0.8"/>
                </svg>
              </div>
              <div class="absolute bottom-2 left-2 z-20 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon points="9,1 17,9 9,17 1,9" fill="#dc2626" stroke="#fbbf24" stroke-width="1.2"/>
                  <polygon points="9,4 14,9 9,14 4,9" fill="#ef4444"/>
                  <circle cx="7" cy="7" r="1.5" fill="#ffffff" opacity="0.8"/>
                </svg>
              </div>
              <div class="absolute bottom-2 right-2 z-20 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon points="9,1 17,9 9,17 1,9" fill="#dc2626" stroke="#fbbf24" stroke-width="1.2"/>
                  <polygon points="9,4 14,9 9,14 4,9" fill="#ef4444"/>
                  <circle cx="7" cy="7" r="1.5" fill="#ffffff" opacity="0.8"/>
                </svg>
              </div>

              <!-- Marco Labrado Dorado Superior y Coste de Puntos de Victoria -->
              <div class="flex items-center justify-between pb-1.5 border-b border-amber-500/40 text-[9px] font-mono">
                <span class="font-bold text-amber-300 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  CARTA LEGENDARIA TCG // DUO QUEST
                </span>
                <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/90 border border-amber-400 text-amber-200 font-bold text-[9px]">
                  <svg class="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>
                  <span>10 VP</span>
                </div>
              </div>

              <!-- Ilustracion Vectorial: Dado D20 Poliedrico Sombreado con Runas y Meeple de Madera -->
              <div class="my-2.5 text-center relative">
                <svg viewBox="0 0 320 130" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Tablero Modular de Losetas Hexagonales de Fondo -->
                  <polygon points="80,75 110,60 140,75 140,105 110,120 80,105" fill="#14532d" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
                  <polygon points="140,75 170,60 200,75 200,105 170,120 140,105" fill="#78350f" stroke="#f59e0b" stroke-width="1" opacity="0.6"/>
                  <polygon points="200,75 230,60 260,75 260,105 230,120 200,105" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>

                  <!-- MEEPLE DE MADERA TALLADA CON RELIEVE Y SOMBRA (IZQUIERDA) -->
                  <g transform="translate(100, 50)">
                    <!-- Sombra del Meeple -->
                    <ellipse cx="2" cy="48" rx="14" ry="4" fill="#000000" opacity="0.5"/>
                    <!-- Cuerpo del Meeple (Forma Clasica de Carcassonne) -->
                    <path d="M0 6 C-4 6, -7 3, -7 -1 C-7 -5, -4 -8, 0 -8 C4 -8, 7 -5, 7 -1 C7 3, 4 6, 0 6 Z
                             M0 6 C-4 8, -12 12, -18 16 C-20 17, -20 21, -17 21 C-13 21, -8 18, -6 18 L-8 44 C-8 46, -4 46, -2 46 L-1 26 L1 26 L2 46 C4 46, 8 46, 8 44 L6 18 C8 18, 13 21, 17 21 C20 21, 20 17, 18 16 C12 12, 4 8, 0 6 Z"
                          fill="#d97706" stroke="#fbbf24" stroke-width="1.2"/>
                    <!-- Vetas de Madera Lineales -->
                    <path d="M-4 12 C-4 22, -2 34, -2 42" stroke="#92400e" stroke-width="0.8" fill="none"/>
                    <path d="M2 12 C2 24, 0 32, 0 42" stroke="#92400e" stroke-width="0.8" fill="none"/>
                  </g>

                  <!-- DADO D20 POLIEDRICO 3D SOMBREADO EN PERSPECTIVA CON RUNAS (CENTRO) -->
                  <g transform="translate(195, 52)">
                    <!-- Resplandor Magico Celestial de Critico -->
                    <circle cx="0" cy="0" r="32" fill="#f59e0b" opacity="0.2"/>
                    <circle cx="0" cy="0" r="24" fill="#fbbf24" opacity="0.25"/>

                    <!-- Facetas del D20 Icosaedro con Luces y Sombras -->
                    <!-- Faceta Central Superior con el "20" Critico -->
                    <polygon points="0,-22 19,-8 -19,-8" fill="#b45309" stroke="#fef08a" stroke-width="1.2"/>
                    <!-- Faceta Central Invertida Frontal -->
                    <polygon points="-19,-8 19,-8 0,16" fill="#78350f" stroke="#fef08a" stroke-width="1.2"/>
                    <text x="0" y="7" fill="#ffffff" font-size="14" font-weight="900" font-family="monospace" text-anchor="middle" drop-shadow="0 1px 2px #000">20</text>
                    <!-- Facetas Laterales Superiores -->
                    <polygon points="0,-22 19,-8 28,-18" fill="#d97706" stroke="#fef08a" stroke-width="1"/>
                    <polygon points="0,-22 -19,-8 -28,-18" fill="#92400e" stroke="#fef08a" stroke-width="1"/>
                    <!-- Facetas Laterales Medias -->
                    <polygon points="19,-8 28,-18 28,6 19,16" fill="#b45309" stroke="#fef08a" stroke-width="1"/>
                    <polygon points="-19,-8 -28,-18 -28,6 -19,16" fill="#451a03" stroke="#fef08a" stroke-width="1"/>
                    <polygon points="19,-8 0,16 19,16" fill="#92400e" stroke="#fef08a" stroke-width="1"/>
                    <polygon points="-19,-8 0,16 -19,16" fill="#451a03" stroke="#fef08a" stroke-width="1"/>
                    <!-- Faceta Inferior Apuntada -->
                    <polygon points="0,16 -19,16 0,26" fill="#451a03" stroke="#fef08a" stroke-width="1"/>
                    <polygon points="0,16 19,16 0,26" fill="#78350f" stroke="#fef08a" stroke-width="1"/>

                    <!-- Destellos de Exito Critico Natural 20 -->
                    <path d="M-28 -24 L-24 -28 M28 -24 L24 -28" stroke="#fde047" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="0" cy="-22" r="2" fill="#ffffff"/>
                  </g>
                </svg>

                <p class="font-mono text-[8px] text-amber-300 tracking-[0.28em] uppercase mt-0.5">ARTEFACTO LEGENDARIO // ALIANZA ETERNA</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[9.5px] text-amber-200/90 mt-0.5">Aventureros: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Habilidad Especial Pasiva en Pergamino Desplegado -->
              <div class="p-2.5 bg-black/75 rounded-xl border border-amber-500/40 text-[9.5px] leading-relaxed italic text-amber-200 my-2 shadow-inner">
                "Habilidad Pasiva: Sincronia Estrategica. Cualquier decision tomada en equipo suma +10 a diversion y asegura la victoria definitiva en la partida."
              </div>

              <!-- Footer Runico con Sello Mitico -->
              <div class="pt-2 border-t border-dashed border-amber-500/40 flex items-center justify-between">
                <div class="w-28 opacity-85">
                  ${this.getBarcodeSvg('#f59e0b')}
                </div>
                <div class="px-2.5 py-1 rounded border border-amber-400/60 bg-amber-500/15 text-amber-300 text-[8px] font-mono font-bold leading-tight text-center">
                  NATURAL 20 // CRITICAL WIN<br>MYTHIC QUEST OK
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // THEME PARK (GOLDEN FAST PASS PARQUE DE ATRACCIONES)
        // ----------------------------------------------------
        case 'theme-park':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden theme-park-glow text-white p-5 border-2 border-pink-500/50 text-left select-none shadow-2xl">
              <!-- Orificio Ovalado Troquelado para Cordon/Lanyard de Cuello -->
              <div class="w-14 h-2.5 mx-auto -mt-2 mb-2 rounded-full bg-black/80 border-2 border-pink-400/50 shadow-inner flex items-center justify-center">
                <div class="w-10 h-0.5 bg-pink-500/30 rounded-full"></div>
              </div>

              <!-- Muescas troqueladas de entrada en los bordes -->
              <div class="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#050507] border border-pink-500/40 z-20"></div>
              <div class="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#050507] border border-pink-500/40 z-20"></div>

              <div class="flex items-center justify-between pb-2 border-b border-pink-500/35 text-[9px] font-mono">
                <span class="font-bold text-pink-200 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                  GOLDEN FAST PASS // ALL RIDES ACCESS
                </span>
                <span class="px-2 py-0.5 rounded bg-pink-500/25 text-pink-200 border border-pink-400/40 font-bold uppercase tracking-wider">EXPRESS VIP</span>
              </div>

              <!-- Ilustracion Vectorial: Skyline Panoramico, Noria, Celosias de Montana Rusa y Fuegos Artificiales -->
              <div class="my-2 text-center relative">
                <svg viewBox="0 0 320 135" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Fuegos Artificiales Multicolores con Destellos -->
                  <g opacity="0.85">
                    <!-- Fuego Artificial Izquierdo (Cian/Dorado) -->
                    <circle cx="55" cy="25" r="1.5" fill="#facc15"/>
                    <path d="M55 25 L45 15 M55 25 L65 15 M55 25 L40 25 M55 25 L70 25 M55 25 L47 35 M55 25 L63 35 M55 25 L55 10 M55 25 L55 40" stroke="#38bdf8" stroke-width="0.9" stroke-linecap="round" stroke-dasharray="2 2"/>
                    <!-- Fuego Artificial Derecho (Rosa/Oro) -->
                    <circle cx="265" cy="22" r="1.5" fill="#f43f5e"/>
                    <path d="M265 22 L255 12 M265 22 L275 12 M265 22 L250 22 M265 22 L280 22 M265 22 L257 32 M265 22 L273 32 M265 22 L265 8 M265 22 L265 36" stroke="#f472b6" stroke-width="0.9" stroke-linecap="round" stroke-dasharray="2 2"/>
                    <!-- Estrellas Centelleantes en el Cielo -->
                    <circle cx="110" cy="12" r="1" fill="#ffffff"/>
                    <circle cx="160" cy="8" r="1.5" fill="#fef08a"/>
                    <circle cx="210" cy="16" r="1" fill="#ffffff"/>
                  </g>

                  <!-- Castillo Magico con Agujas Silueteado al Fondo -->
                  <path d="M140 100 L140 70 L148 55 L156 70 L156 100 Z" fill="#3b0764" stroke="#7e22ce" stroke-width="0.8"/>
                  <path d="M164 100 L164 70 L172 55 L180 70 L180 100 Z" fill="#3b0764" stroke="#7e22ce" stroke-width="0.8"/>
                  <path d="M152 100 L152 60 L160 45 L168 60 L168 100 Z" fill="#581c87" stroke="#a855f7" stroke-width="1"/>
                  <circle cx="160" cy="45" r="1.5" fill="#facc15"/>

                  <!-- GRAN NORIA PANORAMICA ILUMINADA (DERECHA) -->
                  <g transform="translate(250, 78)">
                    <!-- Estructura Soporte en A -->
                    <line x1="0" y1="0" x2="-18" y2="35" stroke="#ec4899" stroke-width="1.8"/>
                    <line x1="0" y1="0" x2="18" y2="35" stroke="#ec4899" stroke-width="1.8"/>
                    <!-- Circunferencia de la Rueda -->
                    <circle cx="0" cy="0" r="28" stroke="#f472b6" stroke-width="1.5" fill="none"/>
                    <circle cx="0" cy="0" r="20" stroke="#f472b6" stroke-width="0.8" stroke-dasharray="2 2" fill="none"/>
                    <!-- Radios y Eje Central -->
                    <circle cx="0" cy="0" r="3" fill="#facc15"/>
                    <line x1="-28" y1="0" x2="28" y2="0" stroke="#f472b6" stroke-width="0.8"/>
                    <line x1="0" y1="-28" x2="0" y2="28" stroke="#f472b6" stroke-width="0.8"/>
                    <line x1="-20" y1="-20" x2="20" y2="20" stroke="#f472b6" stroke-width="0.8"/>
                    <line x1="-20" y1="20" x2="20" y2="-20" stroke="#f472b6" stroke-width="0.8"/>
                    <!-- Cabinas de Pasajeros Iluminadas -->
                    <circle cx="0" cy="-28" r="2.5" fill="#fbbf24"/>
                    <circle cx="28" cy="0" r="2.5" fill="#fbbf24"/>
                    <circle cx="0" cy="28" r="2.5" fill="#fbbf24"/>
                    <circle cx="-28" cy="0" r="2.5" fill="#fbbf24"/>
                    <circle cx="20" cy="20" r="2.5" fill="#fbbf24"/>
                    <circle cx="-20" cy="-20" r="2.5" fill="#fbbf24"/>
                  </g>

                  <!-- MONTANA RUSA CON CELOSIA TUBULAR Y VAGON EN LA CIMA (IZQUIERDA / CENTRO) -->
                  <g>
                    <!-- Columnas de Celosia Estructural / Pilares -->
                    <line x1="30" y1="115" x2="30" y2="70" stroke="#f43f5e" stroke-width="1.2"/>
                    <line x1="60" y1="115" x2="60" y2="40" stroke="#f43f5e" stroke-width="1.2"/>
                    <line x1="90" y1="115" x2="90" y2="60" stroke="#f43f5e" stroke-width="1.2"/>
                    <line x1="120" y1="115" x2="120" y2="85" stroke="#f43f5e" stroke-width="1.2"/>
                    <!-- Travesaños en Cruz de la Celosia -->
                    <line x1="30" y1="70" x2="60" y2="90" stroke="#be123c" stroke-width="0.7"/>
                    <line x1="30" y1="90" x2="60" y2="70" stroke="#be123c" stroke-width="0.7"/>
                    <line x1="60" y1="40" x2="90" y2="65" stroke="#be123c" stroke-width="0.7"/>
                    <line x1="60" y1="65" x2="90" y2="40" stroke="#be123c" stroke-width="0.7"/>

                    <!-- Doble Rail Tubular de Acero en Curva y Looping -->
                    <path d="M10 95 C30 85, 45 35, 65 35 C85 35, 95 85, 120 85 C145 85, 160 50, 185 50 C210 50, 225 105, 250 105"
                          stroke="#ec4899" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                    <path d="M10 98 C30 88, 45 38, 65 38 C85 38, 95 88, 120 88 C145 88, 160 53, 185 53 C210 53, 225 108, 250 108"
                          stroke="#fb7185" stroke-width="1.2" stroke-linecap="round" fill="none"/>

                    <!-- Vagon Aerodinamico Plongeando en la Caida -->
                    <g transform="translate(65, 30) rotate(15)">
                      <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#facc15" stroke="#d97706" stroke-width="1"/>
                      <circle cx="-5" cy="5" r="2" fill="#f8fafc"/>
                      <circle cx="5" cy="5" r="2" fill="#f8fafc"/>
                      <!-- Silueta de la Pareja con Brazos en Alto -->
                      <circle cx="-3" cy="-7" r="1.8" fill="#f43f5e"/>
                      <circle cx="3" cy="-7" r="1.8" fill="#38bdf8"/>
                    </g>
                  </g>
                </svg>

                <p class="font-mono text-[8px] text-pink-300 tracking-[0.28em] uppercase mt-0.5">ADRENALINA &amp; EMOCIONES SIN COLAS</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-100 to-amber-200 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[9.5px] text-pink-200 mt-0.5">Pasajeros VIP: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Privilegio Express Sin Esperas -->
              <div class="p-2.5 bg-black/75 rounded-xl border border-pink-500/35 text-center font-mono text-[9.5px] my-2 shadow-inner">
                <span class="text-amber-300 font-bold block mb-0.5 tracking-wider">PULSERA FAST TRACK UNLIMITED</span>
                <span class="text-neutral-300">Acceso prioritario directo a primera fila en todas las atracciones y montana rusa</span>
              </div>

              <!-- Footer Codigo de Barras de Acceso Expres -->
              <div class="pt-2 border-t border-dashed border-pink-500/35 flex items-center justify-between">
                <div class="w-28 opacity-90">
                  ${this.getBarcodeSvg('#ec4899')}
                </div>
                <div class="px-2.5 py-1 rounded border border-pink-400/50 bg-pink-500/15 text-pink-200 text-[8px] font-mono font-bold leading-tight text-center">
                  FAST TRACK OK<br>EXPRESS ALL GATES
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // BEACH CLUB (DAY PASS EXCLUSIVO PLAYA, SOL & CALA)
        // ----------------------------------------------------
        case 'beach-club':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden beach-club-azure text-white p-5 border-2 border-cyan-400/50 text-left select-none shadow-2xl">
              <!-- Franja de Pulsera Textil de Resort en el lateral con cierre metalico -->
              <div class="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-b from-cyan-400 via-amber-300 to-cyan-500 opacity-80 border-l border-white/20"></div>

              <div class="flex items-center justify-between pb-2 border-b border-cyan-400/35 text-[9px] font-mono pr-2">
                <span class="font-bold text-cyan-200 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></span>
                  MEDITERRANEAN DAY PASS // BEACH CLUB &amp; CALA
                </span>
                <span class="px-2 py-0.5 rounded bg-cyan-500/25 text-cyan-100 border border-cyan-400/40 font-bold uppercase tracking-wider">RESERVA VIP</span>
              </div>

              <!-- Ilustracion Vectorial: Sol Naciente Art Deco, Olas Estilizadas, Sombrilla & Coctel -->
              <div class="my-2.5 text-center relative pr-2">
                <svg viewBox="0 0 320 135" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sunGold" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#fef08a"/>
                      <stop offset="60%" stop-color="#facc15"/>
                      <stop offset="100%" stop-color="#f97316"/>
                    </linearGradient>
                    <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8"/>
                      <stop offset="100%" stop-color="#0e7490" stop-opacity="0.95"/>
                    </linearGradient>
                  </defs>

                  <!-- SOL NACIENTE ART DECO CON RAYOS GEOMETRICOS RADIALES -->
                  <g transform="translate(160, 48)">
                    <!-- Rayos Solares Geometricos Alternos -->
                    <line x1="0" y1="-44" x2="0" y2="-28" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="-31" y1="-31" x2="-20" y2="-20" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="31" y1="-31" x2="20" y2="20" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="-44" y1="0" x2="-28" y2="0" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="44" y1="0" x2="28" y2="0" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
                    <!-- Rayos Finos Intermedios -->
                    <line x1="-18" y1="-38" x2="-12" y2="-24" stroke="#fde047" stroke-width="1.2"/>
                    <line x1="18" y1="-38" x2="12" y2="-24" stroke="#fde047" stroke-width="1.2"/>
                    <line x1="-38" y1="-18" x2="-24" y2="-12" stroke="#fde047" stroke-width="1.2"/>
                    <line x1="38" y1="-18" x2="24" y2="-12" stroke="#fde047" stroke-width="1.2"/>
                    <!-- Disco Solar Radiante con Aro Dorado -->
                    <circle cx="0" cy="0" r="22" fill="url(#sunGold)" stroke="#fef08a" stroke-width="2"/>
                    <circle cx="0" cy="0" r="16" fill="#fef08a" opacity="0.4"/>
                  </g>

                  <!-- OLAS ESTILIZADAS FLUIDAS EN CAPAS VECTORIALES CON ESPUMA BLANCA -->
                  <path d="M0 68 C40 60, 80 75, 120 68 C160 60, 200 75, 240 68 C280 60, 300 72, 320 68 L320 135 L0 135 Z" fill="url(#seaGrad)"/>
                  <path d="M0 68 C40 60, 80 75, 120 68 C160 60, 200 75, 240 68 C280 60, 300 72, 320 68" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>

                  <path d="M0 88 C45 80, 85 94, 135 88 C185 82, 225 94, 275 88 C295 85, 310 90, 320 88 L320 135 L0 135 Z" fill="#0891b2" opacity="0.9"/>
                  <path d="M0 88 C45 80, 85 94, 135 88 C185 82, 225 94, 275 88 C295 85, 310 90, 320 88" stroke="#a5f3fc" stroke-width="1.5" stroke-linecap="round"/>

                  <path d="M0 108 C50 102, 95 114, 150 108 C205 102, 250 114, 300 108 L320 110 L320 135 L0 135 Z" fill="#0e7490"/>

                  <!-- PALMERA MEDITERRANEA Y CAMA BALINESA EN LA ORILLA (IZQUIERDA) -->
                  <g transform="translate(45, 60)">
                    <!-- Tronco Esbelto Curvo -->
                    <path d="M15 55 C12 35, 6 20, 0 10" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
                    <!-- Hojas de Palmera Exuberantes -->
                    <path d="M0 10 C-15 4, -22 -6, -24 -14" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
                    <path d="M0 10 C-8 -4, -4 -16, 2 -22" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
                    <path d="M0 10 C12 -2, 20 -10, 24 -18" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
                    <path d="M0 10 C18 10, 26 6, 30 0" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
                  </g>

                  <!-- DOS COPAS DE COCTEL DE CRISTAL TALLADO CON RODAJAS DE CITRICO (DERECHA) -->
                  <g transform="translate(265, 88)">
                    <!-- Copa 1 -->
                    <path d="M-12 -12 L0 0 L12 -12 Z" fill="#fef08a" stroke="#ffffff" stroke-width="1" opacity="0.85"/>
                    <line x1="0" y1="0" x2="0" y2="16" stroke="#ffffff" stroke-width="1.2"/>
                    <ellipse cx="0" cy="16" rx="7" ry="2" fill="#ffffff" opacity="0.8"/>
                    <!-- Rodaja de Lima/Naranja -->
                    <circle cx="10" cy="-14" r="4" fill="#facc15" stroke="#ffffff" stroke-width="0.8"/>
                    <line x1="6" y1="-14" x2="14" y2="-14" stroke="#ffffff" stroke-width="0.6"/>
                    <line x1="10" y1="-18" x2="10" y2="-10" stroke="#ffffff" stroke-width="0.6"/>
                  </g>
                </svg>

                <p class="font-mono text-[8px] text-cyan-200 tracking-[0.28em] uppercase mt-0.5">BRISA MARINA &amp; DESCONEXION TOTAL</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-amber-200 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[9.5px] text-cyan-200 mt-0.5">Huespedes VIP: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Reserva Balinesa y Amenidades Exclusivas -->
              <div class="p-2.5 bg-black/75 rounded-xl border border-cyan-400/35 font-mono text-[9px] grid grid-cols-2 gap-2 text-center my-2 shadow-inner pr-2">
                <div class="border-r border-cyan-400/25">
                  <span class="text-cyan-300/80 text-[7px] block uppercase tracking-wider">UBICACION</span>
                  <strong class="text-white text-xs">CAMA BALINESA 07</strong>
                </div>
                <div>
                  <span class="text-cyan-300/80 text-[7px] block uppercase tracking-wider">SERVICIO</span>
                  <strong class="text-amber-300 text-xs">TOALLAS &amp; CHAMPAGNE</strong>
                </div>
              </div>

              <!-- Footer Codigo de Barras de Acceso Marino -->
              <div class="pt-2 border-t border-dashed border-cyan-400/35 flex items-center justify-between pr-2">
                <div class="w-28 opacity-90">
                  ${this.getBarcodeSvg('#22d3ee')}
                </div>
                <div class="px-2.5 py-1 rounded border border-cyan-400/50 bg-cyan-500/15 text-cyan-100 text-[8px] font-mono font-bold leading-tight text-center">
                  BEACH DAY VALID<br>FIRST ROW SEA ACCESS
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // KARAOKE LOUNGE (INSIGNIA NEON SYNTHWAVE & CABINA VIP)
        // ----------------------------------------------------
        case 'karaoke-lounge':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden karaoke-neon text-white p-5 border-2 border-pink-500/60 text-left select-none shadow-2xl">
              <!-- Surcos Concentricos de Disco de Vinilo en la Esquina Superior Derecha -->
              <div class="absolute -top-10 -right-10 w-28 h-28 rounded-full border border-pink-500/20 pointer-events-none"></div>
              <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full border border-pink-500/30 pointer-events-none"></div>
              <div class="absolute -top-2 -right-2 w-12 h-12 rounded-full border border-pink-500/40 pointer-events-none"></div>

              <div class="flex items-center justify-between pb-2 border-b border-pink-500/40 text-[9px] font-mono">
                <span class="font-bold text-pink-300 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                  NEON STAR KARAOKE // PRIVATE SUITE LOUNGE
                </span>
                <span class="px-2 py-0.5 rounded bg-pink-500/25 text-pink-200 border border-pink-400/40 font-bold uppercase tracking-wider">CABINA VIP 04</span>
              </div>

              <!-- Ilustracion Vectorial: Microfono Shure 55 Vintage Cromado 3D, Vumetro Audio & Ondas Neon -->
              <div class="my-2 text-center relative">
                <svg viewBox="0 0 320 135" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="shureChrome" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#94a3b8"/>
                      <stop offset="30%" stop-color="#f8fafc"/>
                      <stop offset="60%" stop-color="#cbd5e1"/>
                      <stop offset="100%" stop-color="#475569"/>
                    </linearGradient>
                    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#ec4899"/>
                      <stop offset="50%" stop-color="#a855f7"/>
                      <stop offset="100%" stop-color="#06b6d4"/>
                    </linearGradient>
                  </defs>

                  <!-- Rejilla de Perspectiva Synthwave Ochentera en el Suelo -->
                  <line x1="20" y1="125" x2="300" y2="125" stroke="#ec4899" stroke-width="1.2" stroke-opacity="0.7"/>
                  <line x1="40" y1="110" x2="280" y2="110" stroke="#ec4899" stroke-width="0.8" stroke-opacity="0.5"/>
                  <line x1="60" y1="100" x2="260" y2="100" stroke="#ec4899" stroke-width="0.6" stroke-opacity="0.3"/>
                  <line x1="160" y1="95" x2="20" y2="125" stroke="#a855f7" stroke-width="0.8" stroke-opacity="0.5"/>
                  <line x1="160" y1="95" x2="80" y2="125" stroke="#a855f7" stroke-width="0.8" stroke-opacity="0.5"/>
                  <line x1="160" y1="95" x2="240" y2="125" stroke="#a855f7" stroke-width="0.8" stroke-opacity="0.5"/>
                  <line x1="160" y1="95" x2="300" y2="125" stroke="#a855f7" stroke-width="0.8" stroke-opacity="0.5"/>

                  <!-- VUMETRO ESTEREO DE BARRAS LED DE AUDIO (IZQUIERDA Y DERECHA) -->
                  <!-- Canal Izquierdo -->
                  <g transform="translate(45, 45)">
                    <rect x="0" y="40" width="8" height="6" rx="1" fill="#22c55e"/>
                    <rect x="0" y="32" width="8" height="6" rx="1" fill="#22c55e"/>
                    <rect x="0" y="24" width="8" height="6" rx="1" fill="#22c55e"/>
                    <rect x="0" y="16" width="8" height="6" rx="1" fill="#eab308"/>
                    <rect x="0" y="8" width="8" height="6" rx="1" fill="#eab308"/>
                    <rect x="0" y="0" width="8" height="6" rx="1" fill="#ef4444"/>
                    <text x="4" y="54" fill="#94a3b8" font-size="6" font-family="monospace" text-anchor="middle">L</text>
                  </g>
                  <g transform="translate(56, 45)">
                    <rect x="0" y="40" width="8" height="6" rx="1" fill="#22c55e"/>
                    <rect x="0" y="32" width="8" height="6" rx="1" fill="#22c55e"/>
                    <rect x="0" y="24" width="8" height="6" rx="1" fill="#22c55e"/>
                    <rect x="0" y="16" width="8" height="6" rx="1" fill="#eab308"/>
                    <rect x="0" y="8" width="8" height="6" rx="1" fill="#ef4444"/>
                    <text x="4" y="54" fill="#94a3b8" font-size="6" font-family="monospace" text-anchor="middle">R</text>
                  </g>

                  <!-- MICROFONO SHURE 55 VINTAGE EN 3D VECTORIAL CROMADO (CENTRO) -->
                  <g transform="translate(160, 48)">
                    <!-- Resplandor Neon Posterior -->
                    <circle cx="0" cy="0" r="30" fill="#ec4899" opacity="0.25"/>

                    <!-- Brazo Soporte Mecanico y Rótula con Rosca Cromada -->
                    <path d="M-18 16 C-18 30, 18 30, 18 16" stroke="url(#shureChrome)" stroke-width="3" fill="none"/>
                    <rect x="-4" y="28" width="8" height="24" rx="2" fill="url(#shureChrome)"/>
                    <circle cx="-18" cy="16" r="3.5" fill="#f8fafc" stroke="#475569" stroke-width="1"/>
                    <circle cx="18" cy="16" r="3.5" fill="#f8fafc" stroke="#475569" stroke-width="1"/>
                    <line x1="-12" y1="46" x2="12" y2="46" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>

                    <!-- Cabeza Ovalada Cromada con Nervaduras y Filtro Azul Acustico Interior -->
                    <rect x="-15" y="-22" width="30" height="38" rx="12" fill="#1e1b4b" stroke="url(#shureChrome)" stroke-width="2.5"/>
                    <!-- Nervaduras Horizontales de la Rejilla -->
                    <line x1="-13" y1="-14" x2="13" y2="-14" stroke="url(#shureChrome)" stroke-width="1.2"/>
                    <line x1="-14" y1="-8" x2="14" y2="-8" stroke="url(#shureChrome)" stroke-width="1.2"/>
                    <line x1="-15" y1="-2" x2="15" y2="-2" stroke="url(#shureChrome)" stroke-width="1.4"/>
                    <line x1="-15" y1="4" x2="15" y2="4" stroke="url(#shureChrome)" stroke-width="1.2"/>
                    <line x1="-14" y1="10" x2="14" y2="10" stroke="url(#shureChrome)" stroke-width="1.2"/>
                    <!-- Nervadura Vertical Central de Refuerzo -->
                    <line x1="0" y1="-22" x2="0" y2="16" stroke="#ffffff" stroke-width="2.2"/>
                    <!-- Destello de Luz Especular Cromado -->
                    <ellipse cx="-7" cy="-12" rx="3" ry="6" fill="#ffffff" opacity="0.6"/>
                  </g>

                  <!-- NOTAS MUSICALES VECTORIALES FLOTANTES CON RESPLANDOR (DERECHA) -->
                  <g transform="translate(245, 45)" stroke="#06b6d4" stroke-width="1.5" fill="#06b6d4">
                    <!-- Nota Doble Corchea -->
                    <circle cx="0" cy="16" r="3"/>
                    <circle cx="16" cy="12" r="3"/>
                    <line x1="3" y1="16" x2="3" y2="2"/>
                    <line x1="19" y1="12" x2="19" y2="-2"/>
                    <line x1="3" y1="2" x2="19" y2="-2" stroke-width="2.5"/>
                    <!-- Ondas Sonoras Radiales -->
                    <path d="M26 4 C30 8, 30 16, 26 20" stroke="#f472b6" stroke-width="1.2" fill="none"/>
                    <path d="M31 0 C38 6, 38 24, 31 30" stroke="#f472b6" stroke-width="1.2" fill="none"/>
                  </g>
                </svg>

                <p class="font-mono text-[8px] text-pink-300 tracking-[0.28em] uppercase mt-0.5">DUETOS ESTELARES &amp; TEMAZOS DE EPOCA</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-purple-200 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[9.5px] text-pink-200 mt-0.5">Duo Cantante: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Puntuacion Maxima del Afinador -->
              <div class="p-2.5 bg-black/75 rounded-xl border border-pink-500/35 text-center font-mono text-[9.5px] my-2 shadow-inner">
                <span class="text-amber-300 font-bold block mb-0.5 tracking-wider">100 PUNTOS // PERFECT PITCH RECORD</span>
                <span class="text-neutral-300">Microfonos sincronizados, ecualizacion master y ovacion en la cabina</span>
              </div>

              <!-- Footer Codigo de Barras Neon -->
              <div class="pt-2 border-t border-dashed border-pink-500/40 flex items-center justify-between">
                <div class="w-28 opacity-90">
                  ${this.getBarcodeSvg('#f43f5e')}
                </div>
                <div class="px-2.5 py-1 rounded border border-pink-400/50 bg-pink-500/15 text-pink-200 text-[8px] font-mono font-bold leading-tight text-center">
                  VOICE MASTER PASS<br>VIP HIT DUET RECORDED
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // BRUNCH & CAFE (ETIQUETA KRAFT ARTESANAL & ATELIER)
        // ----------------------------------------------------
        case 'brunch-cafe':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden kraft-paper text-amber-100 p-5 border-2 border-amber-600/50 text-left select-none shadow-2xl">
              <!-- Esquinas Superiores Biseladas Estilo Etiqueta Colgante (Chamfered Hangtag) -->
              <div class="absolute -top-4 -left-4 w-8 h-8 bg-[#050507] rotate-45 border-b-2 border-amber-600/50 z-20"></div>
              <div class="absolute -top-4 -right-4 w-8 h-8 bg-[#050507] rotate-45 border-b-2 border-amber-600/50 z-20"></div>

              <!-- Ojal Metalico de Laton en la Cabecera con Cordon de Yute -->
              <div class="flex flex-col items-center -mt-2 mb-2 z-10 relative">
                <!-- Cordon de Yute Anudado que asoma -->
                <path d="M0 0" />
                <div class="w-1 h-3 bg-amber-700/80 -mb-1"></div>
                <!-- Arandela / Ojal de Laton 3D -->
                <div class="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-1 shadow-md flex items-center justify-center">
                  <div class="w-2.5 h-2.5 rounded-full bg-[#050507] shadow-inner"></div>
                </div>
              </div>

              <div class="flex items-center justify-between pb-2 border-b border-amber-600/35 text-[9px] font-mono">
                <span class="font-bold text-amber-300 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                  SPECIALTY COFFEE ROASTERY // ATELIER DUO
                </span>
                <span class="px-2 py-0.5 rounded bg-amber-600/25 text-amber-200 border border-amber-500/40 font-bold uppercase tracking-wider">MESA RESERVADA</span>
              </div>

              <!-- Ilustracion Vectorial: Rama Botanica de Cafeto, Cafetera Chemex/V60 y Taza con Latte Art Rosetta -->
              <div class="my-2 text-center relative">
                <svg viewBox="0 0 320 135" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- RAMA BOTANICA DE CAFETO CON HOJAS, FLORES Y CEREZAS (IZQUIERDA) -->
                  <g transform="translate(65, 65)">
                    <!-- Rama de Madera -->
                    <path d="M-40 40 C-20 20, -5 0, 10 -25" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>
                    <!-- Hojas Lanceoladas con Nervaduras Finas -->
                    <path d="M-20 20 C-35 15, -45 5, -45 -10 C-30 -10, -20 0, -20 20 Z" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
                    <line x1="-20" y1="20" x2="-45" y2="-10" stroke="#16a34a" stroke-width="0.7"/>
                    <path d="M-5 0 C10 -5, 25 -15, 25 -30 C10 -30, 0 -15, -5 0 Z" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
                    <!-- Racimo de Cerezas de Cafe Maduras (Cerezas Rojas) -->
                    <circle cx="-18" cy="14" r="4.5" fill="#dc2626" stroke="#991b1b" stroke-width="0.8"/>
                    <circle cx="-12" cy="18" r="4" fill="#b91c1c" stroke="#991b1b" stroke-width="0.8"/>
                    <circle cx="-7" cy="8" r="4" fill="#ef4444" stroke="#991b1b" stroke-width="0.8"/>
                    <circle cx="2" cy="-6" r="4.5" fill="#dc2626" stroke="#991b1b" stroke-width="0.8"/>
                  </g>

                  <!-- CAFETERA ARTESANAL CHEMEX CON FILTRO Y CINTA DE MADERA (CENTRO-DERECHA) -->
                  <g transform="translate(160, 68)">
                    <!-- Jarra de Cristal Reluciente con Forma de Reloj de Arena -->
                    <path d="M-18 -32 L18 -32 L6 -8 C4 -4, 4 4, 6 8 L22 36 C24 42, -24 42, -22 36 L-6 8 C-4 4, -4 -4, -6 -8 Z"
                          fill="#451a03" stroke="#f59e0b" stroke-width="1.4" opacity="0.85"/>
                    <!-- Cafe Filtrado Caliente en el Fondo -->
                    <path d="M-18 28 C-10 26, 10 26, 18 28 L22 36 C24 42, -24 42, -22 36 Z" fill="#78350f"/>
                    <!-- Cuello de Madera Pulida y Cordon de Cuero -->
                    <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1"/>
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="#451a03" stroke-width="1.5"/>
                    <circle cx="0" cy="5" r="2" fill="#92400e"/>
                    <!-- Vapor Caliente Ascendente -->
                    <path d="M-4 -36 C-8 -42, -4 -46, -6 -50" stroke="#fef3c7" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
                    <path d="M4 -36 C0 -42, 4 -46, 2 -50" stroke="#fef3c7" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
                  </g>

                  <!-- TAZA DE CERAMICA ARTESANAL CON LATTE ART ROSETTA (DERECHA) -->
                  <g transform="translate(245, 78)">
                    <!-- Sombra del Plato -->
                    <ellipse cx="0" cy="24" rx="28" ry="5" fill="#000000" opacity="0.4"/>
                    <!-- Plato de Ceramica -->
                    <ellipse cx="0" cy="20" rx="26" ry="6" fill="#2e1a0f" stroke="#d97706" stroke-width="1.2"/>
                    <!-- Cuerpo de la Taza -->
                    <path d="M-18 0 C-18 18, 18 18, 18 0 Z" fill="#451a03" stroke="#d97706" stroke-width="1.4"/>
                    <path d="M18 2 C25 2, 25 12, 18 12" stroke="#d97706" stroke-width="1.5" fill="none"/>
                    <!-- Superficie de Cafe con Crema Sedosa -->
                    <ellipse cx="0" cy="0" rx="18" ry="6" fill="#78350f" stroke="#d97706" stroke-width="1"/>
                    <!-- Latte Art Rosetta de 5 Hojas -->
                    <path d="M0 -3 C-3 -4, -6 -2, 0 3 C6 -2, 3 -4, 0 -3 Z" fill="#fef3c7"/>
                    <path d="M0 -1 C-5 -2, -8 1, 0 5 C8 1, 5 -2, 0 -1 Z" fill="#fef3c7" opacity="0.9"/>
                    <line x1="0" y1="-4" x2="0" y2="4" stroke="#78350f" stroke-width="0.8"/>
                  </g>
                </svg>

                <p class="font-mono text-[8px] text-amber-400 tracking-[0.28em] uppercase mt-0.5">BRUNCH &amp; CAFES DE ESPECIALIDAD</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-300 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[9.5px] text-amber-200/90 mt-0.5">Degustadores: <strong class="text-white">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Comanda Artesanal de Cafe y Tostadas -->
              <div class="p-2.5 bg-black/75 rounded-xl border border-amber-600/35 font-mono text-[9px] space-y-1 my-2 shadow-inner">
                <div class="flex justify-between text-neutral-300">
                  <span>2x Flat White Etiopia Yirgacheffe</span>
                  <span class="text-amber-300 font-bold">6.40 EUR</span>
                </div>
                <div class="flex justify-between text-neutral-300">
                  <span>1x Tostada Aguacate &amp; Huevo Poche Bio</span>
                  <span class="text-amber-300 font-bold">7.50 EUR</span>
                </div>
                <div class="flex justify-between text-neutral-300">
                  <span>1x Tarta Casera Pistacho &amp; Frambuesas</span>
                  <span class="text-amber-300 font-bold">5.80 EUR</span>
                </div>
              </div>

              <!-- Footer Codigo de Barras de Comanda -->
              <div class="pt-2 border-t border-dashed border-amber-600/35 flex items-center justify-between">
                <div class="w-28 opacity-85">
                  ${this.getBarcodeSvg('#d97706')}
                </div>
                <div class="px-2.5 py-1 rounded border border-amber-500/40 bg-amber-600/15 text-amber-300 text-[8px] font-mono font-bold leading-tight text-center">
                  BARISTA GUILD APPROVED<br>100% ARABICA SPECIALTY
                </div>
              </div>
            </div>
          `;
          break;

        // ----------------------------------------------------
        // BESPOKE SIGNATURE (BLACK OBSIDIAN CARD & GUILLOCHE)
        // ----------------------------------------------------
        case 'bespoke-signature':
          frontHtml = `
            <div class="card-face relative w-full rounded-2xl overflow-hidden obsidian-card text-white p-5 border border-amber-400/50 text-left select-none shadow-2xl">
              <!-- Microtexto Perimetral de Seguridad Bancaria y Alta Orfebreria -->
              <div class="flex items-center justify-between pb-2 border-b border-amber-400/35 text-[8.5px] font-mono">
                <div class="flex items-center gap-1.5 font-bold text-amber-300 tracking-wider">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>DUO PRESTIGE MEMORY VAULT // BESPOKE SIGNATURE</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold uppercase tracking-widest text-[7.5px]">BLACK OBSIDIAN</span>
              </div>

              <!-- Chip EMV 3D Metalico Tallado en Oro en la Esquina Superior Izquierda -->
              <div class="my-1 flex items-center justify-between">
                <div class="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-0.5 shadow-md border border-amber-300/80">
                  <div class="w-full h-full rounded-sm bg-gradient-to-tr from-amber-300 to-yellow-500 grid grid-cols-3 gap-0.5 p-0.5">
                    <div class="border-r border-b border-amber-800/40"></div>
                    <div class="border-b border-amber-800/40"></div>
                    <div class="border-l border-b border-amber-800/40"></div>
                    <div class="border-r border-amber-800/40"></div>
                    <div class="rounded-full bg-amber-600/30"></div>
                    <div class="border-l border-amber-800/40"></div>
                  </div>
                </div>

                <div class="text-right font-mono text-[8px] text-amber-400/80 tracking-widest">
                  EDICION LIMITADA // PIEZA UNICA
                </div>
              </div>

              <!-- Ilustracion Vectorial: Roseta Guilloche Matematica de Seguridad, Blason Heraldico & Corona Ducal -->
              <div class="my-1.5 text-center relative">
                <svg viewBox="0 0 320 135" class="w-full h-28 mx-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- ROSETA GUILLOCHE MATEMATICA DE SEGURIDAD EN FILIGRANA DE ORO (0.6px) -->
                  <g transform="translate(160, 58)">
                    <!-- Circulos Entrelazados Concentricos Spirograficos -->
                    <circle cx="0" cy="0" r="48" stroke="#d4af37" stroke-width="0.5" stroke-opacity="0.4" stroke-dasharray="1 1"/>
                    <circle cx="0" cy="0" r="40" stroke="#fef08a" stroke-width="0.5" stroke-opacity="0.5"/>
                    <circle cx="0" cy="0" r="32" stroke="#d4af37" stroke-width="0.6" stroke-opacity="0.6"/>

                    <!-- Curvas Hipocicloides Interconectadas Guilloché -->
                    <path d="M0 -42 C15 -42, 30 -30, 42 0 C30 30, 15 42, 0 42 C-15 42, -30 30, -42 0 C-30 -30, -15 -42, 0 -42 Z"
                          stroke="#fbbf24" stroke-width="0.6" stroke-opacity="0.7" fill="none"/>
                    <path d="M-30 -30 C-30 -15, -42 0, -42 15 C-30 30, 0 42, 30 30 C42 15, 42 -15, 30 -30 C15 -42, -15 -42, -30 -30 Z"
                          stroke="#fbbf24" stroke-width="0.6" stroke-opacity="0.7" fill="none"/>

                    <!-- Rosetón de 12 Pétalos Geométricos Finos -->
                    <g stroke="#fef08a" stroke-width="0.5" stroke-opacity="0.6" fill="none">
                      <ellipse cx="0" cy="0" rx="38" ry="12"/>
                      <ellipse cx="0" cy="0" rx="38" ry="12" transform="rotate(30)"/>
                      <ellipse cx="0" cy="0" rx="38" ry="12" transform="rotate(60)"/>
                      <ellipse cx="0" cy="0" rx="38" ry="12" transform="rotate(90)"/>
                      <ellipse cx="0" cy="0" rx="38" ry="12" transform="rotate(120)"/>
                      <ellipse cx="0" cy="0" rx="38" ry="12" transform="rotate(150)"/>
                    </g>

                    <!-- BLASON HERALDICO CENTRAL CON CORONA DUCAL & INFINITO DUO -->
                    <!-- Corona Ducal Imperial -->
                    <path d="M-14 -16 L-10 -10 L0 -20 L10 -10 L14 -16 L12 -6 L-12 -6 Z" fill="#facc15" stroke="#fef08a" stroke-width="0.8"/>
                    <circle cx="0" cy="-20" r="1.5" fill="#ef4444"/>
                    <circle cx="-14" cy="-16" r="1" fill="#3b82f6"/>
                    <circle cx="14" cy="-16" r="1" fill="#3b82f6"/>

                    <!-- Escudo de Fondo en Azul Obsidiana -->
                    <path d="M-18 -4 C-18 16, 0 24, 0 28 C0 24, 18 16, 18 -4 Z" fill="#181124" stroke="#d4af37" stroke-width="1.5"/>

                    <!-- Simbolo Infinito Tallado en Oro Vinculando a la Pareja -->
                    <path d="M-8 8 C-12 4, -12 12, -8 16 C-4 16, 0 8, 4 8 C8 8, 12 12, 8 16 C4 16, 0 8, -4 8"
                          stroke="#fde047" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                  </g>
                </svg>

                <p class="font-mono text-[8px] text-amber-300 tracking-[0.3em] uppercase mt-0.5">TITULARES HONORIFICOS // PRESTIGE CARD</p>
                <h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-300 uppercase tracking-tight truncate max-w-[290px] mx-auto">${escapeHtml(pass.name)}</h3>
                <p class="font-mono text-[9.5px] text-neutral-300 mt-0.5">Miembros: <strong class="text-amber-200">${escapeHtml(pass.coupleNames)}</strong></p>
              </div>

              <!-- Metadatos de Autenticidad de la Tarjeta de Lujo -->
              <div class="p-2.5 bg-black/80 rounded-xl border border-amber-400/35 font-mono text-[9px] grid grid-cols-2 gap-2 text-center my-2 shadow-inner">
                <div class="border-r border-amber-400/25">
                  <span class="text-amber-400/80 text-[7px] block uppercase tracking-wider">NUMERO DE MEMORIA</span>
                  <strong class="text-white text-xs">${pass.ticketNum}</strong>
                </div>
                <div>
                  <span class="text-amber-400/80 text-[7px] block uppercase tracking-wider">VALORACION</span>
                  <strong class="text-yellow-300 text-xs">${pass.rating || 5}/5 ESTRELLAS</strong>
                </div>
              </div>

              <!-- Footer Codigo de Barras de Lujo y Sello Holografico -->
              <div class="pt-2 border-t border-dashed border-amber-400/35 flex items-center justify-between">
                <div class="w-28 opacity-90">
                  ${this.getBarcodeSvg('#f59e0b')}
                </div>
                <div class="px-2.5 py-1 rounded border border-amber-400/50 bg-amber-500/15 text-amber-300 text-[8px] font-mono font-bold leading-tight text-center">
                  BLACK OBSIDIAN // BESPOKE<br>CERTIFIED FOREVER DUO
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
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden stadium-grass text-white p-5 border border-emerald-400/40 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-emerald-500/40 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-black text-emerald-300">PIZARRA TACTICA &amp; ACTA OFICIAL</span>
                <span class="text-[9px] text-emerald-400/80">MATCH DAY DERBI</span>
              </div>

              <!-- Pizarra Tactica de Entrenador SVG con Jugada Ensayada y Flechas de Tiza -->
              <div class="my-2 p-2 rounded-xl bg-black/80 border border-emerald-500/40 shadow-inner">
                <div class="text-[7.5px] font-mono text-emerald-400/90 mb-1 flex justify-between">
                  <span>JUGADA COMBINADA DUO // GOLAZO POR LA ESCUADRA</span>
                  <span class="text-amber-300 font-bold">MINUTO 90'+3'</span>
                </div>
                <svg viewBox="0 0 280 65" class="w-full h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Pizarra Verde Oscura con Lineas Blancas de Campo -->
                  <rect x="0" y="0" width="280" height="65" rx="6" fill="#062817" stroke="#047857" stroke-width="1"/>
                  <line x1="140" y1="0" x2="140" y2="65" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
                  <circle cx="140" cy="32" r="16" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
                  <!-- Area de Ataque -->
                  <polygon points="230,12 280,12 280,52 230,52" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>

                  <!-- Nodos de Jugadores P1 y P2 con Numeros -->
                  <circle cx="50" cy="32" r="7" fill="#10b981" stroke="#ffffff" stroke-width="1.2"/>
                  <text x="50" y="35" fill="#ffffff" font-size="7" font-weight="bold" font-family="monospace" text-anchor="middle">P1</text>
                  <circle cx="120" cy="18" r="7" fill="#10b981" stroke="#ffffff" stroke-width="1.2"/>
                  <text x="120" y="21" fill="#ffffff" font-size="7" font-weight="bold" font-family="monospace" text-anchor="middle">P2</text>
                  <circle cx="210" cy="30" r="8" fill="#facc15" stroke="#ffffff" stroke-width="1.5"/>
                  <text x="210" y="33" fill="#000000" font-size="8" font-weight="bold" font-family="monospace" text-anchor="middle">GOL</text>

                  <!-- Flechas Tacticas de Tiza Curvas -->
                  <path d="M57 32 C80 20, 100 20, 113 19" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3 2"/>
                  <path d="M127 18 C155 18, 185 24, 202 29" stroke="#facc15" stroke-width="1.8"/>
                  <polygon points="202,26 208,30 202,33" fill="#facc15"/>
                  <path d="M218 30 L275 18" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
                  <polygon points="275,15 280,17 276,21" fill="#ef4444"/>
                </svg>
              </div>

              <!-- Estadisticas Oficiales del Partido -->
              <div class="my-2 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-emerald-500/30">
                  <div class="text-[7.5px] text-emerald-400/80 uppercase">POSESION TOTAL</div>
                  <div class="text-sm font-bold text-white mt-0.5">68% <span class="text-[8px] text-emerald-400">(Control Absoluto)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-emerald-500/30">
                  <div class="text-[7.5px] text-emerald-400/80 uppercase">DISPAROS A PUERTA</div>
                  <div class="text-sm font-bold text-white mt-0.5">14 <span class="text-[8px] text-amber-300">(3 Golazos)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-emerald-500/30">
                  <div class="text-[7.5px] text-emerald-400/80 uppercase">PRECISION PASES</div>
                  <div class="text-sm font-bold text-emerald-300 mt-0.5">94% Conectados</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-emerald-500/30">
                  <div class="text-[7.5px] text-emerald-400/80 uppercase">AMBIENTE EN GRADA</div>
                  <div class="text-sm font-bold text-emerald-400 mt-0.5">100% Inolvidable</div>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-emerald-500/25 font-mono text-[9.5px] leading-relaxed italic text-emerald-100">
                "${escapeHtml(pass.note || '90 minutos cantando en la grada. Pase milimetrico y abrazo eterno al celebrar la victoria en el descuento.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-20 rounded-lg overflow-hidden border border-emerald-500/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo de Partido">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-emerald-500/30 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-emerald-400/80 block uppercase">ARBITRO PRINCIPAL:</span>
                <span class="font-mono text-[8.5px] text-neutral-300">Colegiado Oficial Liga Duo</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[8px] font-bold border border-emerald-500/40">
                ACTA CERRADA // 3 PUNTOS DUO
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'racket-club') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden court-blue text-white p-5 border border-sky-400/50 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-sky-400/30 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-bold text-sky-200">PLANILLA OFICIAL DE ARBITRAJE</span>
                <span class="text-[9px] text-neutral-300">WORLD DUO TOUR</span>
              </div>

              <!-- Mapa de Calor Cenital de la Pista de Padel SVG -->
              <div class="my-2 p-2 rounded-xl bg-black/80 border border-sky-400/35 shadow-inner">
                <div class="text-[7.5px] font-mono text-sky-300/90 mb-1 flex justify-between">
                  <span>HEATMAP DE PUNTOS GANADORES // REMATE X3</span>
                  <span class="text-emerald-400 font-bold">MATCH POINT WIN</span>
                </div>
                <svg viewBox="0 0 280 65" class="w-full h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Pista 20x10 Cenital -->
                  <rect x="20" y="5" width="240" height="55" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2"/>
                  <line x1="140" y1="5" x2="140" y2="60" stroke="#f8fafc" stroke-width="2"/>
                  <!-- Lineas de Servicio -->
                  <line x1="70" y1="5" x2="70" y2="60" stroke="#ffffff" stroke-width="1" stroke-opacity="0.8"/>
                  <line x1="210" y1="5" x2="210" y2="60" stroke="#ffffff" stroke-width="1" stroke-opacity="0.8"/>
                  <line x1="70" y1="32" x2="210" y2="32" stroke="#ffffff" stroke-width="1" stroke-opacity="0.8"/>

                  <!-- Manchas de Calor de Voleas Ganadoras -->
                  <circle cx="125" cy="20" r="10" fill="#22c55e" opacity="0.45"/>
                  <circle cx="125" cy="20" r="5" fill="#facc15" opacity="0.6"/>
                  <circle cx="130" cy="45" r="9" fill="#22c55e" opacity="0.45"/>
                  <circle cx="130" cy="45" r="4" fill="#facc15" opacity="0.6"/>

                  <!-- Trajectory Arrow del Remate x3 que sale de la Pista -->
                  <path d="M125 32 C170 30, 220 10, 255 -5" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
                  <polygon points="255,-5 250,-1 258,2" fill="#facc15"/>
                  <text x="220" y="24" fill="#fef08a" font-size="7" font-weight="bold" font-family="monospace">X3 SALIDA</text>
                </svg>
              </div>

              <!-- Estadisticas de Pista -->
              <div class="my-2 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-sky-400/30">
                  <div class="text-[7.5px] text-sky-300/80 uppercase">ACES DIRECTOS</div>
                  <div class="text-sm font-bold text-white mt-0.5">7 Aces <span class="text-[8px] text-emerald-400">(Inapelables)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-sky-400/30">
                  <div class="text-[7.5px] text-sky-300/80 uppercase">REMATES GANADORES</div>
                  <div class="text-sm font-bold text-amber-300 mt-0.5">18 Winners</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-sky-400/30">
                  <div class="text-[7.5px] text-sky-300/80 uppercase">PUNTOS DE ORO</div>
                  <div class="text-sm font-bold text-emerald-400 mt-0.5">5/5 Ganados</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-sky-400/30">
                  <div class="text-[7.5px] text-sky-300/80 uppercase">COMPLICIDAD EN RED</div>
                  <div class="text-sm font-bold text-white mt-0.5">100% Invicto</div>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-sky-400/25 font-mono text-[9.5px] leading-relaxed italic text-sky-100">
                "${escapeHtml(pass.note || 'Defensa titanica desde los cristales y volea cruzada ganadora en la red. Partidazo inolvidable.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-20 rounded-lg overflow-hidden border border-sky-400/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo de Pista">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-sky-400/30 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-sky-300/80 block uppercase">JUEZ ARBITRO:</span>
                <span class="font-mono text-[8.5px] text-neutral-300">Master Referee Racket Tour</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 font-mono text-[8px] font-bold border border-sky-400/40">
                CHAMPIONS DUO // WPT
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'fitness-pass') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden bib-fiber text-slate-900 p-5 border-2 border-slate-300/90 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b-2 border-slate-300 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-black text-red-600">TELEMETRIA OFICIAL // CHIP TIMING</span>
                <span class="text-[9px] text-slate-600 font-bold">GARMIN &amp; STRAVA SYNC</span>
              </div>

              <!-- Tabla de Splits por Kilometro -->
              <div class="my-2 p-2 bg-white rounded-xl border border-slate-200/90 shadow-inner font-mono text-[8.5px]">
                <div class="flex justify-between pb-1 border-b border-slate-200 text-slate-500 font-bold">
                  <span>SEGMENTO</span>
                  <span>TIEMPO</span>
                  <span>RITMO</span>
                  <span>CARDIO</span>
                </div>
                <div class="flex justify-between py-0.5 text-slate-800">
                  <span>KM 1 - 3</span>
                  <span class="font-bold">12:36</span>
                  <span class="text-red-600">4:12/km</span>
                  <span>152 ppm</span>
                </div>
                <div class="flex justify-between py-0.5 text-slate-800">
                  <span>KM 4 - 7</span>
                  <span class="font-bold">17:12</span>
                  <span class="text-red-600">4:18/km</span>
                  <span>164 ppm</span>
                </div>
                <div class="flex justify-between py-0.5 text-slate-800">
                  <span>KM 8 - 10</span>
                  <span class="font-bold">12:30</span>
                  <span class="text-red-600">4:10/km</span>
                  <span class="font-bold text-red-600">174 ppm</span>
                </div>
              </div>

              <!-- Distribucion de Frecuencia Cardiaca -->
              <div class="my-2 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-slate-100 border border-slate-200">
                  <div class="text-[7.5px] text-slate-500 uppercase">ZONA UMBRAL (Z4)</div>
                  <div class="text-xs font-bold text-slate-900 mt-0.5">68% del Tiempo</div>
                </div>
                <div class="p-2 rounded-lg bg-slate-100 border border-slate-200">
                  <div class="text-[7.5px] text-slate-500 uppercase">CADENCIA MEDIA</div>
                  <div class="text-xs font-bold text-slate-900 mt-0.5">178 spm (Optima)</div>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-slate-100 border border-slate-200 font-mono text-[9.5px] leading-relaxed italic text-slate-700">
                "${escapeHtml(pass.note || 'Superando limites juntos en cada serie y kilometro. Abrazo triunfal al cruzar la pancarta de meta.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-18 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo de Meta">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t-2 border-slate-300 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-slate-500 block uppercase">CONTROL DE CRONOMETRAJE:</span>
                <span class="font-mono text-[8.5px] text-slate-800 font-bold">Duo Timing Committee</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[8px] font-bold">
                OFFICIAL FINISHER RECORD
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'gamer-pass') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden cartridge-body text-white p-5 border-2 border-amber-500/50 flex flex-col justify-between text-left select-none">
            <div>
              <!-- Tornillos de Carcasa Plastica en las Esquinas -->
              <div class="flex justify-between items-center pb-2 border-b border-amber-400/30 font-mono">
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-full bg-slate-400 border border-slate-600 flex items-center justify-center text-[7px] text-slate-800 font-bold">+</span>
                  <span class="text-xs font-bold text-amber-300">MEMORIA ROM &amp; SAVE SLOT</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9px] text-neutral-400">100% COMPLETE</span>
                  <span class="w-3 h-3 rounded-full bg-slate-400 border border-slate-600 flex items-center justify-center text-[7px] text-slate-800 font-bold">+</span>
                </div>
              </div>

              <!-- Bloque de Ranura de Guardado Slot 1 -->
              <div class="my-2 p-2.5 rounded-xl bg-black/80 border border-amber-400/30 font-mono text-[9px] space-y-1 shadow-inner">
                <div class="flex justify-between text-amber-300 font-bold">
                  <span>[SLOT 1] DUO ADVENTURE (SAVED)</span>
                  <span class="text-emerald-400">999:59 HRS</span>
                </div>
                <div class="text-[8px] text-neutral-400">
                  COLECCIONABLES: 100/100 &bull; SECRET BOSS DEFEATED &bull; PLATINO
                </div>
              </div>

              <!-- Lista de Logros Desbloqueados Co-Op -->
              <div class="my-2 space-y-1.5 font-mono text-[9px]">
                <div class="p-1.5 rounded-lg bg-black/60 border border-amber-400/25 flex items-center justify-between">
                  <span class="text-neutral-200">[OK] JEFE FINAL A LA PRIMERA</span>
                  <span class="text-amber-400 font-bold">+500 XP</span>
                </div>
                <div class="p-1.5 rounded-lg bg-black/60 border border-amber-400/25 flex items-center justify-between">
                  <span class="text-neutral-200">[OK] COMBO CO-OP SINCRONIZADO</span>
                  <span class="text-amber-400 font-bold">+750 XP</span>
                </div>
                <div class="p-1.5 rounded-lg bg-black/60 border border-amber-400/25 flex items-center justify-between">
                  <span class="text-neutral-200">[OK] SIN PELEARSE POR EL MANDO</span>
                  <span class="text-amber-300 font-bold">TROFEO ORO</span>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-amber-400/25 font-mono text-[9.5px] leading-relaxed italic text-amber-100">
                "${escapeHtml(pass.note || 'Partidaza cooperativa legendaria. Sincronizacion absoluta con los mandos y victoria epica contra el boss final.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-18 rounded-lg overflow-hidden border border-amber-400/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo Gamer">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-amber-400/30 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-amber-400/80 block uppercase">CERTIFICADO GAMER:</span>
                <span class="font-mono text-[8.5px] text-neutral-300">P1 &amp; P2 Legendary Master</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[8px] font-bold border border-amber-400/40">
                GAME OVER // WINNERS
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'boardgame-card') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden boardgame-parchment text-amber-100 p-5 border-2 border-amber-500/70 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-amber-500/40 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-bold text-amber-300">DORSO MITICO TCG // ACTA DE PARTIDA</span>
                <span class="text-[9px] text-amber-400/70">QUEST ARCHIVE</span>
              </div>

              <!-- Puntuacion Detallada de Victoria -->
              <div class="my-2.5 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-amber-500/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">PUNTOS DE TERRITORIO</div>
                  <div class="text-sm font-bold text-white mt-0.5">48 VP <span class="text-[8px] text-emerald-400">(Dominio)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-amber-500/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">MISIONES CO-OP</div>
                  <div class="text-sm font-bold text-amber-300 mt-0.5">60 VP (Cumplidas)</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-amber-500/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">TIRADAS CRITICAS</div>
                  <div class="text-sm font-bold text-yellow-300 mt-0.5">34 VP (20 Natural)</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-amber-500/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">VICTORIA TOTAL</div>
                  <div class="text-sm font-bold text-emerald-400 mt-0.5">142 VP (Record)</div>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-amber-500/30 font-mono text-[9.5px] leading-relaxed italic text-amber-100">
                "${escapeHtml(pass.note || 'Tarde epica de tablero entre risas, alianzas secretas y un desenlace de partida que se recordara por anos.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-20 rounded-lg overflow-hidden border border-amber-500/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo de Tablero">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-amber-500/40 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-amber-400/80 block uppercase">MASTER DEL JUEGO:</span>
                <span class="font-mono text-[8.5px] text-amber-200">Gran Canciller de los Dados</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[8px] font-bold border border-amber-500/40">
                QUEST COMPLETED // 10 VP
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'theme-park') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden theme-park-glow text-white p-5 border-2 border-pink-500/50 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-pink-500/35 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-bold text-pink-300">BITACORA DE ADRENALINA // LOG</span>
                <span class="text-[9px] text-neutral-300">FAST TRACK OK</span>
              </div>

              <!-- Registro de Atracciones Express -->
              <div class="my-2.5 space-y-1.5 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-pink-500/35 flex items-center justify-between">
                  <span>[OK] MONTANA RUSA DE ACELERACION</span>
                  <span class="text-amber-300 font-bold">115 km/h (Looping)</span>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-pink-500/35 flex items-center justify-between">
                  <span>[OK] TORRE DE CAIDA LIBRE AL VACIO</span>
                  <span class="text-pink-400 font-bold">100m (Gritos Epicos)</span>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-pink-500/35 flex items-center justify-between">
                  <span>[OK] RAPIDOS DE AGUA &amp; SPLASH</span>
                  <span class="text-cyan-300 font-bold">Empapados de Risa</span>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-pink-500/25 font-mono text-[9.5px] leading-relaxed italic text-pink-100">
                "${escapeHtml(pass.note || 'Dia de pura emocion sin hacer ni una cola. Gritos de adrenalina en las bajadas y risas en cada curva.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-20 rounded-lg overflow-hidden border border-pink-400/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo Parque">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-pink-500/35 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-pink-300/80 block uppercase">CONTROL DE PARQUE:</span>
                <span class="font-mono text-[8.5px] text-neutral-200">Director de Operaciones VIP</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-pink-500/20 text-pink-200 font-mono text-[8px] font-bold border border-pink-400/40">
                ALL ACCESS VERIFIED
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'beach-club') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden beach-club-azure text-white p-5 border-2 border-cyan-400/50 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-cyan-400/35 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-bold text-cyan-200">CARTA DE AMENIDADES &amp; BITACORA</span>
                <span class="text-[9px] text-neutral-300">CALA SERENA DUO</span>
              </div>

              <!-- Cocteleria de Autor y Condiciones Marinas -->
              <div class="my-2.5 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-cyan-400/35">
                  <div class="text-[7.5px] text-cyan-300/80 uppercase">AGUA CRISTALINA</div>
                  <div class="text-xs font-bold text-white mt-0.5">24&deg;C <span class="text-[8px] text-cyan-300">(Calma Total)</span></div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-cyan-400/35">
                  <div class="text-[7.5px] text-cyan-300/80 uppercase">COCTEL DE BIENVENIDA</div>
                  <div class="text-xs font-bold text-amber-300 mt-0.5">Spritz &amp; Mojito</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-cyan-400/35">
                  <div class="text-[7.5px] text-cyan-300/80 uppercase">COORDENADAS CALA</div>
                  <div class="text-xs font-bold text-cyan-200 mt-0.5">37&deg;35'N 0&deg;58'W</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-cyan-400/35">
                  <div class="text-[7.5px] text-cyan-300/80 uppercase">ATARDECER EN PAREJA</div>
                  <div class="text-xs font-bold text-emerald-400 mt-0.5">21:15 Golden Hour</div>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-cyan-400/25 font-mono text-[9.5px] leading-relaxed italic text-cyan-100">
                "${escapeHtml(pass.note || 'Tarde de desconexion total bajo el sol. El rumor de las olas, un chapuzon en agua turquesa y el mejor descanso juntos.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-20 rounded-lg overflow-hidden border border-cyan-400/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo de Playa">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-cyan-400/35 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-cyan-300/80 block uppercase">CAPITANIA DEL CLUB:</span>
                <span class="font-mono text-[8.5px] text-neutral-200">Cala Serena Harbor Master</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 font-mono text-[8px] font-bold border border-cyan-400/40">
                PERFECT SUMMER // OK
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'karaoke-lounge') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden karaoke-neon text-white p-5 border-2 border-pink-500/60 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-pink-500/40 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-bold text-pink-300">CONSOLA DE MEZCLAS &amp; SETLIST</span>
                <span class="text-[9px] text-neutral-300">CABINA VIP</span>
              </div>

              <!-- Lista de Temazos Grabados en Sesion -->
              <div class="my-2.5 space-y-1.5 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-pink-500/35 flex items-center justify-between">
                  <span>1. BALADA ROMANTICA A DOS VOCES</span>
                  <span class="text-amber-300 font-bold">100 PUNTOS (Ovacion)</span>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-pink-500/35 flex items-center justify-between">
                  <span>2. CLASICO POP OCHENTERO PARA BAILAR</span>
                  <span class="text-pink-400 font-bold">99 PUNTOS (De Pie)</span>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-pink-500/35 flex items-center justify-between">
                  <span>3. HIMNO ROCKERO CANTADO CON EL ALMA</span>
                  <span class="text-emerald-400 font-bold">100 PUNTOS (Hit)</span>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-pink-500/25 font-mono text-[9.5px] leading-relaxed italic text-pink-100">
                "${escapeHtml(pass.note || 'Cantando a pleno pulmon sin que nos importe desafinar ni un segundo. Noche de risas y complicidad maxima.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-18 rounded-lg overflow-hidden border border-pink-400/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo Karaoke">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-pink-500/40 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-pink-300/80 block uppercase">SOUND ENGINEER:</span>
                <span class="font-mono text-[8.5px] text-neutral-200">Neon Star Audio Lab</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-pink-500/20 text-pink-200 font-mono text-[8px] font-bold border border-pink-400/40">
                MASTER RECORDING // GOLD
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'brunch-cafe') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden kraft-paper text-amber-100 p-5 border-2 border-amber-600/50 flex flex-col justify-between text-left select-none">
            <div>
              <div class="border-b border-amber-600/35 pb-2 flex justify-between items-center font-mono">
                <span class="text-xs font-bold text-amber-300">FICHA DE CATA SENSORIAL // CUPPING</span>
                <span class="text-[9px] text-amber-400/70">SPECIALTY COFFEE</span>
              </div>

              <!-- Rueda y Perfil Sensorial SCA -->
              <div class="my-2.5 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-amber-600/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">PERFIL SENSORIAL</div>
                  <div class="text-xs font-bold text-white mt-0.5">Jazmin, Miel &amp; Frutas</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-amber-600/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">TUESTE &amp; EXTRACCION</div>
                  <div class="text-xs font-bold text-amber-300 mt-0.5">Medio // Filtro V60</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-amber-600/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">DULZOR &amp; CUERPO</div>
                  <div class="text-xs font-bold text-amber-200 mt-0.5">Sedoso 10/10</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-amber-600/35">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">ORIGEN DE ALTURA</div>
                  <div class="text-xs font-bold text-emerald-400 mt-0.5">Etiopia 2.100m</div>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-amber-600/30 font-mono text-[9.5px] leading-relaxed italic text-amber-100">
                "${escapeHtml(pass.note || 'Desayuno pausado y cafe delicioso. Hablando de todo un poco y disfrutando de cada bocado sin prisas.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-20 rounded-lg overflow-hidden border border-amber-500/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo de Cafe">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-amber-600/35 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-amber-400/80 block uppercase">HEAD BARISTA:</span>
                <span class="font-mono text-[8.5px] text-amber-200">Duo Specialty Roastery</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-amber-600/20 text-amber-300 font-mono text-[8px] font-bold border border-amber-500/40">
                100% ARABICA APPROVED
              </div>
            </div>
          </div>
        `;
      } else if (arc === 'bespoke-signature') {
        backHtml = `
          <div class="card-face card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden obsidian-card text-white p-5 border border-amber-400/50 flex flex-col justify-between text-left select-none">
            <div>
              <!-- Banda Magnetica HiCo Superior y Microtexto -->
              <div class="w-full h-7 -mx-5 -mt-5 mb-3 bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border-b border-amber-400/30 flex items-center px-5">
                <span class="font-mono text-[7px] text-neutral-500 tracking-widest uppercase">HICO MAGNETIC STRIPE // ENCRYPTED DUO MEMORY DATA</span>
              </div>

              <!-- Panel de Firma de Seguridad Blanco con Microtexto -->
              <div class="p-2 bg-neutral-100 rounded-lg border border-neutral-300 flex justify-between items-center my-2">
                <div>
                  <span class="text-[6.5px] font-mono text-neutral-500 block uppercase">PANEL DE FIRMA AUTORIZADA</span>
                  <span class="font-serif italic text-sm text-neutral-900 font-bold">${escapeHtml(pass.coupleNames)}</span>
                </div>
                <div class="px-2 py-0.5 bg-amber-100 rounded border border-amber-300 text-[9px] font-mono font-black text-amber-900">
                  DUO-777
                </div>
              </div>

              <!-- Certificado Oficial de Vivencia y Metadatos -->
              <div class="my-2 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div class="p-2 rounded-lg bg-black/70 border border-amber-400/25">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">FECHA DE REGISTRO</div>
                  <div class="text-xs font-bold text-white mt-0.5">${pass.date}</div>
                </div>
                <div class="p-2 rounded-lg bg-black/70 border border-amber-400/25">
                  <div class="text-[7.5px] text-amber-400/80 uppercase">IDENTIFICADOR BESPOKE</div>
                  <div class="text-xs font-bold text-amber-300 mt-0.5">${pass.ticketNum}</div>
                </div>
              </div>

              <div class="p-2 rounded-xl bg-black/75 border border-amber-400/30 font-mono text-[9.5px] leading-relaxed italic text-amber-100">
                "${escapeHtml(pass.note || 'Un momento unico grabado para siempre en nuestro diario. Porque cualquier plan juntos se convierte en una aventura inolvidable.')}"
              </div>

              ${pass.photo ? `
                <div class="mt-2 w-full h-18 rounded-lg overflow-hidden border border-amber-400/40 shadow-sm">
                  <img src="${pass.photo}" class="w-full h-full object-cover" alt="Recuerdo Personalizado">
                </div>
              ` : ''}
            </div>

            <div class="pt-2 border-t border-amber-400/35 flex items-center justify-between">
              <div>
                <span class="text-[7.5px] font-mono text-amber-400/80 block uppercase">SELLO DE AUTENTICIDAD:</span>
                <span class="font-mono text-[8.5px] text-neutral-300">Duo Official Memory Vault</span>
              </div>
              <div class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[8px] font-bold border border-amber-400/40">
                RECORDED &bull; 100% DUO BESPOKE
              </div>
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
