/**
 * Módulo de geolocalización, cálculo de distancias (Haversine)
 * y generación de enlaces de navegación ciega para Apple Maps y Google Maps.
 */

/**
 * Solicita la posición actual del usuario mediante la API nativa del navegador
 * @returns {Promise<{lat: number, lng: number} | null>}
 */
export async function getUserLocation() {
  if (!navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.warn('No se pudo obtener la geolocalización:', error.message);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 60000
      }
    );
  });
}

/**
 * Fórmula de Haversine para calcular la distancia en kilómetros entre dos puntos
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
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

/**
 * Encuentra la sucursal más cercana al usuario para un restaurante dado
 */
export function findClosestBranch(restaurant, userCoords) {
  if (!restaurant.branches || restaurant.branches.length === 0) {
    // Si no tiene sucursal definida, usar coordenadas del centro o coordenadas por defecto
    return {
      name: 'Ubicación principal',
      address: 'Destino sorpresa',
      lat: userCoords ? userCoords.lat : 40.4168,
      lng: userCoords ? userCoords.lng : -3.7038,
      distanceKm: null
    };
  }

  if (!userCoords) {
    // Si el usuario no dio permiso de GPS, devolvemos la primera sucursal
    return {
      ...restaurant.branches[0],
      distanceKm: null
    };
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

  return {
    ...closest,
    distanceKm: minDistance
  };
}

/**
 * Genera la URL de navegación usando ÚNICAMENTE coordenadas numéricas (lat, lng)
 * para NO desvelar el nombre ni el tipo de restaurante al usuario.
 */
export function getMysteryNavigationUrl(branch) {
  const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
  const lat = branch.lat.toFixed(6);
  const lng = branch.lng.toFixed(6);

  if (isApple) {
    // En iOS abre Apple Maps directamente a las coordenadas con modo de ruta en coche/caminando
    return `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
  }

  // Google Maps Universal Direct Navigation
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
