# Duo — Decisiones compartidas

Aplicación web móvil PWA diseñada con la estética nativa de **Apple HIG & visionOS Liquid Glass** para tomar decisiones en pareja de forma privada, lúdica y sin discusiones.

Inicialmente pensada para resolver el eterno dilema de dónde comer en pareja, y concebida de forma modular para expandirse en el futuro a películas, planes, viajes y más.

---

## Características principales

- **Diseño Apple HIG & visionOS Liquid Glass**: Interfaz oscura OLED pura (`#000000`), superficies esmeriladas translúcidas (`backdrop-blur`), bordes especulares y microinteracciones elásticas con respuesta háptica.
- **Votación a ciegas por turnos**: Cada persona selecciona sus restaurantes favoritos en su turno de forma privada sin ver las elecciones del otro.
- **Algoritmo de coincidencia y desempate**: Calcula la intersección común. En caso de discrepancia, cuenta con ruleta rusa express, juego de la moneda y misiones divertidas.
- **Destino misterioso con navegación GPS**: Mantiene oculto el restaurante ganador si lo deseáis para viajar al destino sin saber cuál es hasta llegar a la puerta.
- **Sitios recomendados con Google Reviews**:
  - Sugerencias geolocalizadas por proximidad real con cálculo Haversine.
  - Filtro interactivo de radio de distancia (`< 2 km`, `< 5 km`, `< 15 km`, `< 30 km`, `Todas`).
  - Buscador de ciudad o zona con chips de acceso rápido (Cartagena, Murcia, Cabo de Palos, etc.).
  - Filtro ajustable de estrellas mínimas en Google (`4.5+ Top` por defecto, `4.3+`, `4.0+`, `Todas`).
  - Filtro por rango de precio (`€`, `€€`, `€€€`, `€€€€` o `Todos`).
  - Carga progresiva en cascada con botón **"Ver más"**.
  - Botón integrado para trasladar las recomendaciones directamente a una votación en Duo.
- **100% PWA Offline**: Instalable en iPhone y Android mediante Service Worker.

---

## Cómo usar en el móvil

1. Abre el enlace de **GitHub Pages**: `https://mgesm.github.io/duo/`
2. **En iPhone (Safari)**: Pulsa el botón de Compartir y selecciona **"Añadir a la pantalla de inicio"**.
3. **En Android (Chrome)**: Pulsa el menú de opciones (tres puntos) y pulsa **"Instalar aplicación"** o **"Añadir a la pantalla de inicio"**.
