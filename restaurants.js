/**
 * Catálogo de restaurantes predeterminados con foco en Cartagena y Murcia.
 * Logos oficiales en PNG transparente de alta calidad:
 * - McDonald's (mcdonalds.png)
 * - Burger King (burger_king.png)
 * - KFC (kfc.png)
 * - Popeyes (popeyes.png)
 * - Única Burgers (Cartagena) (unica.png)
 * - Kebab (Cartagena: City Döner Kebab / Murcia: Kebab El Buen Rollo) (kebab.png)
 * - Telepizza (telepizza.png)
 */

export const DEFAULT_RESTAURANTS = [
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

/**
 * Obtiene la lista combinada de restaurantes (predeterminados + los guardados por el usuario)
 */
export function getRestaurants() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const custom = JSON.parse(raw);
      const customIds = new Set(custom.map((r) => r.id));
      const filteredDefaults = DEFAULT_RESTAURANTS.filter((r) => !customIds.has(r.id));
      return [...custom, ...filteredDefaults];
    }
  } catch (err) {
    console.error('Error al leer de localStorage:', err);
  }
  return [...DEFAULT_RESTAURANTS];
}

/**
 * Guarda o actualiza un restaurante personalizado en localStorage
 */
export function saveRestaurant(restaurant) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const index = list.findIndex((r) => r.id === restaurant.id);
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

/**
 * Elimina un restaurante personalizado
 */
export function removeRestaurant(id) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      let list = JSON.parse(raw);
      list = list.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    return true;
  } catch (err) {
    console.error('Error al borrar de localStorage:', err);
    return false;
  }
}
