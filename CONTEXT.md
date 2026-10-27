# 📄 CONTEXTO DEL PROYECTO: "Duo — Decisiones compartidas"

> **Documento vivo del proyecto**: Este archivo describe en profundidad el funcionamiento, reglas de negocio, decisiones de diseño, catálogo y arquitectura de la aplicación. Se mantendrá actualizado con cada cambio sucesivo.

---

## 🎯 1. Propósito y Visión General

La aplicación nace para resolver de forma divertida, justa y sin discusiones las decisiones cotidianas en pareja o con amigos (**"Duo"**): dónde comer, qué película ver, qué plan hacer o adónde viajar.

### Principios Fundamentales:
1. **Decisión individual y sin sesgos**: Ambos usuarios votan por separado y en secreto en el mismo móvil sin ver qué ha votado el otro.
2. **Coincidencias reales**: El sistema solo considera los restaurantes en los que **ambos** han coincidido.
3. **Destino secreto ("Modo Misterio")**: Una vez sorteado el restaurante ganador de entre las coincidencias, el nombre se mantiene **oculto**. La app proporciona un botón de navegación directa que abre Google Maps o Apple Maps utilizando únicamente coordenadas numéricas (`latitude,longitude`), guiando a los usuarios hasta la puerta sin saber qué restaurante es hasta llegar.
4. **Experiencia 100% nativa Apple HIG / visionOS ('Liquid Glass')**:
   - Fondo negro OLED profundo (`#000000`).
   - Superficies translúcidas con `backdrop-blur` profundo, bordes especulares ultrafinos (`1px solid rgba(255, 255, 255, 0.12)`) y sombras de profundidad suaves.
   - Squircles de Apple calibrados (`rounded-[26px]`).
   - Look sobrio, profesional y maduro (eliminación del exceso de emojis infantiles).
   - Soporte nativo de márgenes de pantalla (*safe-area insets* para iPhone), barra indicadora Home Bar y efectos sonoros sintetizados nativos.

---

## 🎮 2. Reglas de Juego y Flujo de Usuario

```
[Inicio: ¿Dónde comemos?]
       ↓
[Turno Jugador 1] (Acento Apple Rose/Coral: #FF2D55) -> Elige opciones en tarjetas 2x2
       ↓
[Pantalla de Traspaso 🙈] -> "Pásale el teléfono a Jugador 2 en secreto (Apple Privacy Shield)"
       ↓
[Turno Jugador 2] (Acento Apple Indigo/Cyan: #5E5CE6) -> Elige opciones en tarjetas 2x2
       ↓
[Ruleta de Coincidencias] (Intersección: Jugador 1 ∩ Jugador 2)
       ↓
       ├─► ¿Hay coincidencias? (≥ 1)
       │         ↓
       │    Sorteo al azar entre las coincidencias
       │         ↓
       │    Búsqueda de la sucursal más cercana por GPS
       │         ↓
       │    [Destino Secreto 🤫] + Botón "¡CÓMO LLEGAR! 🗺️"
       │
       └─► ¿Cero coincidencias? (0)
                 ↓
            ¿Es el primer intento (Ronda 1)?
                 ├─► SÍ: [Pantalla aviso] -> Botón "🔄 Repetir ronda (Intento 2)"
                 │
                 └─► NO (Ronda 2 fallida):
                           ↓
                      [Regla de Desempate Definitivo]
                      Sorteo automático al azar entre los restaurantes
                      elegidos por el SEGUNDO USUARIO (Jugador 2)
```

---

## 🍔 3. Catálogo de Restaurantes y Cobertura Geográfica

La app cuenta con coordenadas reales precargadas para la zona de **Cartagena y Murcia** (Región de Murcia), con **logotipos oficiales vectoriales SVG / PNG transparentes** montados sobre placas squircle de Apple:

| Restaurante | Identidad Visual / Logo | Sucursales Principales |
|---|---|---|
| **McDonald's** | `mcdonalds.png` (PNG oficial transparente de los Arcos Dorados) | Espacio Mediterráneo, Alfonso XIII (Cartagena), Thader, Nueva Condomina, Ronda Sur (Murcia) |
| **Burger King** | `burger_king.png` (PNG oficial transparente clásico de Burger King) | Alfonso XIII, Espacio Mediterráneo, Alameda San Antón (Cartagena), Gran Vía, Atalayas, Juan Carlos I (Murcia) |
| **KFC** | `kfc.png` (PNG oficial transparente del Coronel Sanders) | Espacio Mediterráneo (Cartagena), Thader, Nueva Condomina, Ronda Norte (Murcia) |
| **Popeyes** | `popeyes.png` (PNG oficial transparente Louisiana Kitchen) | Espacio Mediterráneo (Cartagena), Nueva Condomina, Thader (Murcia) |
| **Única Burgers** | `unica.png` (PNG oficial transparente de Única Burgers Cartagena) | Calle Carlos III / Plaza Juan XXIII, Alameda San Antón 38 (Cartagena) |
| **Kebab** | `kebab.png` (Ilustración / PNG transparente de asador döner tradicional) | City Döner Kebab (C. Jiménez de la Espada, 17, Cartagena); Kebab El Buen Rollo (C. Músico Antonio Rodríguez de Hita, 10, Murcia) |
| **Telepizza** | `telepizza.png` (PNG oficial transparente de Telepizza) | Alfonso XIII, Alameda San Antón, Los Dolores (Cartagena), Alfonso X El Sabio, Juan Carlos I (Murcia) |

> **Ampliación personalizada**: Mediante el botón de configuración `Gestionar Restaurantes`, los usuarios pueden añadir cualquier otro restaurante local con su dirección y guardarlo en el `localStorage` del dispositivo (`donde_comemos_custom_restaurants_v5`).

---

## 📍 4. Geolocalización y Navegación Ciega

1. **Obtención de posición**: Mediante `navigator.geolocation.getCurrentPosition()`.
2. **Algoritmo de cercanía**: Implementa la **fórmula de Haversine** para calcular la distancia en kilómetros entre las coordenadas del usuario y cada sucursal del restaurante elegido. Se selecciona la sucursal con menor distancia.
3. **URL de navegación ciega**:
   - **Dispositivos Apple (iOS)**: `https://maps.apple.com/?daddr={lat},{lng}&dirflg=d`
   - **Dispositivos Android / Universal**: `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`
   - *Nota técnica*: Se omiten intencionadamente parámetros de texto o nombres comerciales para que el mapa trace la ruta numérica directamente sin desvelar el destino en el cajón de búsqueda.

---

## 🛠️ 5. Arquitectura Técnica

- **Frontend**: HTML5, Tailwind CSS, JavaScript Vanilla estructurado en arquitectura modular y empaquetado en `bundle.js`.
- **Zero-Backend**: No requiere servidores externos, bases de datos ni servicios de pago.
- **Audio y Háptica**:
  - Efectos de sonido generados en tiempo real mediante **Web Audio API** (OscillatorNodes con rampas exponenciales para *pop*, *whoosh*, *tick* y *fanfarria*).
  - Vibración táctil mediante `navigator.vibrate()`.
- **Compatibilidad Local & PWA**:
  - **Doble clic directo sin servidor**: El archivo `bundle.js` es 100% autocontenido y funciona de forma inmediata al abrir `index.html` bajo el protocolo `file://`, sin bloqueos de seguridad CORS.
  - `manifest.json`: Configurado con tema OLED `#000000`, display standalone y orientación portrait.
  - `sw.js` (v4): Service Worker que cachea todos los ficheros y los logos PNG transparentes para funcionamiento offline absoluto.

---

## 🔮 6. Hoja de Ruta y Futuras Mejoras (Roadmap)

Ideas aprobadas para incorporar progresivamente en futuras iteraciones de Duo:

1. **Modo Viajes / Escapadas (El 4º pilar de decisión)**:
   - Nuevo modo en el selector segmentado principal: *¿Adónde viajamos este finde?*.
   - Categorías: *Pueblos con encanto, Playa/Costa, Escapada Rural/Montaña, Escapada Europea*.
   - Fichas con presupuesto estimado, distancia en coche/avión, pistas misteriosas y enlaces de inspiración.

2. **Álbum de Recuerdos y Diario de Momentos**:
   - Ampliación del actual *Diario* (`Food Diary`) para convertirlo en un diario fotográfico de recuerdos de pareja/amigos.
   - Posibilidad de adjuntar una foto del momento tomada con el móvil (cena, mirador, cine, etc.), una valoración de 1 a 5 estrellas y una nota personal tras visitar el destino ganador.

---

## 📝 7. Historial de Cambios (Changelog)

### [v1.9.31] - 2026-10-27
- **Corrección Ortográfica de Plurales ("veces", no "vezes")**:
  - Implementada la función auxiliar `formatTimes(n)` para garantizar gramática española impecable en todas las pantallas y modales:
    - `1 vez`
    - `2 veces`
    - `3 veces`
  - Eliminada cualquier concatenación errónea como `vezes` o `1 veces` tanto en el Top Podio de Favoritos como en el marcador de la moneda.
- **Cálculo Exacto y Matemático de Frecuencias y Visitas ("Top Sitios & Planes Favoritos")**:
  - **Deduplicación técnica en `recordSessionOutcome`**: Cada ronda de votación cuenta ahora con un `sessionId` estable (ej. `room-YQ665G`). Las llamadas repetidas (al tirar la moneda para ver quién paga o snapshots concurrentes de Firebase) actualizan la entrada existente en lugar de insertar partidas duplicadas.
  - **Eliminación de llamadas duplicadas en `listenToRoom`**: Eliminado el bloque redundante que ejecutaba doblemente el guardado del resultado para el Jugador 1.
  - **Conteo limpio entre Historial de Partidas y Diario Foodie**: En `openStatsModal`, las visitas registradas en el Diario para una sesión de votación ya realizada ese mismo día se consolidan como una única salida/comida real (1 vez), evitando que guardar un recuerdo en el diario duplique artificialmente el contador del restaurante.
  - **Auto-deduplicación retroactiva**: Añadida deduplicación automática en `getDuoStatsHistory()` y `syncStatsFromFirebase()` que detecta y fusiona partidas duplicadas por milisegundos en `localStorage` y Firebase Realtime Database.
  - **Limpieza de base de datos en Firebase RTDB**: Eliminados los registros duplicados de prueba concurrentes en `shared_stats`.
- **Actualización de Service Worker & Caché PWA**:
  - Bump a `CACHE_NAME = 'donde-comemos-v52'` en `sw.js`.
  - Versionado de assets a `?v=52` en `index.html` para purga y actualización inmediata en PWAs móviles instaladas.

### [v1.4.0] - 2026-10-14
- **Modo "Ruleta Rusa / A Ciegas Total" en Inicio**:
  - Botón directo *"🎲 Sorpréndenos directamente"* para los días con pereza de votar por turnos: realiza el sorteo instantáneo entre todos los restaurantes activos respetando la regla de no repetir el anterior.
- **Mini-Juego de Adivinanza en Ruta**:
  - En la pantalla de resultado misterioso, cada jugador puede seleccionar secretamente por qué restaurante apuesta mientras viajan. Al desvelar el sitio al llegar, el sistema anuncia quién ha acertado.
- **Sorteo "¿Quién paga hoy?"**:
  - Lanzamiento de moneda interactivo con animación 3D y sonido metálico que decide quién invita: *Jugador 1*, *Jugador 2*, o *A medias (50/50)*.
- **Selector de App de Mapas Favorita**:
  - Píldoras integradas para alternar entre **Auto** (detección de dispositivo), **Apple Maps**, **Google Maps** o **Waze**.
- **Diario de Visitas y Estadísticas ("Food Diary")**:
  - Botón *"Guardar en historial ⭐"* al llegar al destino.
  - Pantalla modal estilo Apple Health con barra de progreso de frecuencias para saber de qué restaurante soléis pecar más este mes.
- **Control de Sonido / Silencio Rápido**:
  - Botón en la cabecera de inicio para silenciar o activar el audio Web Audio API manteniendo la háptica en el iPhone.
- **Confetti Personalizado**:
  - Explosión de confeti con la paleta de colores de los jugadores (Rose #FF2D55 y Indigo #5E5CE6).
- **Service Worker v8**:
  - Incremento de versión de caché para actualización inmediata.

### [v1.9.20] - 2026-10-26
- **Integración con Firebase Realtime Database (Sincronización en vivo sin reenviar enlaces)**:
  - **Duo Live Sync**: Conectado el proyecto de Firebase `duop-4e925` con Realtime Database europea (`europe-west1`).
  - **Salas en tiempo real (`#duo_room=...`)**: Cuando Jugador 1 comparte el enlace a Jugador 2, se crea una sala en la nube (`rooms/<roomId>`) con un identificador único de 6 caracteres.
  - **Actualización automática e instantánea**: Jugador 1 queda escuchando en vivo los cambios de la sala en su pantalla de espera. En el momento en que Jugador 2 pulsa para ver el resultado o la ruleta de desempate, el resultado se sube a la sala y **el móvil 1 salta instantáneamente a la pantalla de resultados con confeti, sonido y datos ganadores** sin que Jugador 2 tenga que enviarle ningún enlace de vuelta.
  - **Fallback resiliente**: Si por cualquier razón la red fallara, el enlace mantiene codificado el estado para funcionar de forma híbrida y sin interrupciones.
  - **Incremento de versión en Service Worker a `donde-comemos-v39`**.

### [v1.9.19] - 2026-10-26
- **Resolución integral de votación multidispositivo (dos móviles)**:
  - **Soporte unificado de items ganadores (`getAnyItemById`)**: Resuelto el error donde restaurantes recomendados por reseñas (`rec-...`), películas o planes provocaban un `TypeError` no capturado al acceder a `.id` en `renderMatchingScreen` o `renderResultScreen`. La búsqueda del ganador ahora abarca simultáneamente restaurantes base, recomendados, películas y planes con fallback seguro.
  - **Desbloqueo de pantalla de resultados**: Agregadas defensas null-safe en sucursales, pistas, navegación y apuestas en `renderResultScreen()`, eliminando los bloqueos ("pantalla congelada donde no se puede pulsar nada").
  - **Pantalla de espera para Jugador 1 (`waiting_remote`)**: Cuando Jugador 1 comparte el enlace de votación a Jugador 2, pasa a una pantalla de espera con indicador de estado ("Esperando a Jugador 2..."), botón para reenviar el enlace o pegar/abrir el enlace de vuelta con el resultado.
  - **Botón directo de retorno de resultado para Jugador 2**: Si Jugador 2 vota mediante enlace a distancia, al terminar se muestra un banner superior destacado con botón "Enviar" para desbloquear inmediatamente la app en el móvil de Jugador 1.
  - **Escucha en tiempo real de enlaces (`hashchange`)**: Añadido listener de `hashchange` a nivel de ventana para que abrir o cambiar de enlace dentro del navegador desbloquee la pantalla sin requerir recargar la web.
  - **Incremento de caché en Service Worker a `donde-comemos-v38`**.

### [v1.3.0] - 2026-10-14
- **Sistema de Veto ("Ni de coña")**:
  - Cada jugador dispone de **1 veto exclusivo** por votación (botón circular con icono ✕).
  - Al vetar un restaurante, queda bloqueado para ese jugador y se excluye irrevocablemente de las coincidencias y del sorteo final, incluso si el otro jugador lo seleccionó.
  - Efecto visual de cristal esmerilado con resplandor rojo (`card-vetoed`) y sonido descendente característico (`playVeto`).
- **Superlike / Voto Doble**:
  - Cada jugador dispone de **1 Superlike con estrella dorada** (botón circular ★).
  - Si un restaurante con Superlike entra en las coincidencias comunes, **duplica sus papeletas en el sorteo** (o el triple si ambos jugadores le dieron Superlike).
  - Resplandor ámbar cálido (`card-superliked`) y timbre sonoro de doble tono (`playSuperlike`).
- **Pistas Progresivas en Ruta (Bajo Demanda)**:
  - Las pistas **no aparecen por defecto**. La pantalla de resultados muestra una invitación discreta ("¿Queréis alguna pista? Podéis adivinar el sitio por el camino") con un botón de acción **"Pedir pista"**.
  - Al pulsarlo, se revela la primera pista con opción de pedir más poco a poco ("Otra pista 🔍") o cerrar/ocultar el panel (✕) cuando no se deseen más spoilers.
- **Botón "¿Nos rendimos? Desvelar sitio confirmado"**:
  - Acordeón táctil integrado para ver el logotipo oficial, nombre completo y dirección de la sucursal en caso de querer confirmarlo antes de llegar.
- **Historial de Últimas Comidas y Toggle "No repetir"**:
  - La aplicación almacena de forma persistente el último restaurante ganador en `localStorage`.
  - En la pantalla de inicio aparece una insignia del historial con un interruptor nativo estilo iOS (*Toggle Switch*) para **evitar repetir** ese sitio en la sesión actual.
- **Banner de Instalación Nativo iOS (PWA)**:
  - Cápsula flotante inferior con diseño Liquid Glass que guía al usuario sobre cómo añadir la app a la Pantalla de Inicio en Safari iOS (`Compartir ⎋ -> Añadir a pantalla de inicio ⊞`).
- **Service Worker v7**:
  - Actualización de caché para propagación instantánea de todos los componentes.

### [v1.2.4] - 2026-10-14
- **Actualización Emblema Burger King**:
  - Reemplazado el logo por la versión oficial con silueta squircle beige/crema y panecillos (`burger_king.png`), aportada directamente por el usuario.
  - Incrementada la clave de almacenamiento local a `v7` y caché de Service Worker a `v6`.

### [v1.9.20] - 2026-10-26
- **Integración con Firebase Realtime Database (Sincronización en vivo sin reenviar enlaces)**:
  - **Duo Live Sync**: Conectado el proyecto de Firebase `duop-4e925` con Realtime Database europea (`europe-west1`).
  - **Salas en tiempo real (`#duo_room=...`)**: Cuando Jugador 1 comparte el enlace a Jugador 2, se crea una sala en la nube (`rooms/<roomId>`) con un identificador único de 6 caracteres.
  - **Actualización automática e instantánea**: Jugador 1 queda escuchando en vivo los cambios de la sala en su pantalla de espera. En el momento en que Jugador 2 pulsa para ver el resultado o la ruleta de desempate, el resultado se sube a la sala y **el móvil 1 salta instantáneamente a la pantalla de resultados con confeti, sonido y datos ganadores** sin que Jugador 2 tenga que enviarle ningún enlace de vuelta.
  - **Fallback resiliente**: Si por cualquier razón la red fallara, el enlace mantiene codificado el estado para funcionar de forma híbrida y sin interrupciones.
  - **Incremento de versión en Service Worker a `donde-comemos-v39`**.

### [v1.9.19] - 2026-10-26
- **Resolución integral de votación multidispositivo (dos móviles)**:
  - **Soporte unificado de items ganadores (`getAnyItemById`)**: Resuelto el error donde restaurantes recomendados por reseñas (`rec-...`), películas o planes provocaban un `TypeError` no capturado al acceder a `.id` en `renderMatchingScreen` o `renderResultScreen`. La búsqueda del ganador ahora abarca simultáneamente restaurantes base, recomendados, películas y planes con fallback seguro.
  - **Desbloqueo de pantalla de resultados**: Agregadas defensas null-safe en sucursales, pistas, navegación y apuestas en `renderResultScreen()`, eliminando los bloqueos ("pantalla congelada donde no se puede pulsar nada").
  - **Pantalla de espera para Jugador 1 (`waiting_remote`)**: Cuando Jugador 1 comparte el enlace de votación a Jugador 2, pasa a una pantalla de espera con indicador de estado ("Esperando a Jugador 2..."), botón para reenviar el enlace o pegar/abrir el enlace de vuelta con el resultado.
  - **Botón directo de retorno de resultado para Jugador 2**: Si Jugador 2 vota mediante enlace a distancia, al terminar se muestra un banner superior destacado con botón "Enviar" para desbloquear inmediatamente la app en el móvil de Jugador 1.
  - **Escucha en tiempo real de enlaces (`hashchange`)**: Añadido listener de `hashchange` a nivel de ventana para que abrir o cambiar de enlace dentro del navegador desbloquee la pantalla sin requerir recargar la web.
  - **Incremento de caché en Service Worker a `donde-comemos-v38`**.

### [v1.3.0] - 2026-10-14
- **Auditoría & Refactorización de Arquitectura UX (Decluttering y Progressive Disclosure)**:
  - **Home Screen Despejada (Single Dominant CTA)**:
    * Se eliminó el amontonamiento de botones en la zona inferior de la pantalla de inicio.
    * Un único botón de llamada a la acción primario dominante: **"Comenzar votación"** con gradiente vibrante y jerarquía clara.
    * Las acciones secundarias (*"Sorpréndenos directamente / Ruleta express"*, *"Historial de visitas"* y *"Gestionar restaurantes"*) se han agrupado en un botón discreto y elegante (*"Más opciones y modos rápidos"*) que despliega una **Action Sheet estilo iOS** modal translúcida con `backdrop-blur` nativo.
  - **Pantalla de Resultados con Divulgación Progresiva (Progressive Disclosure)**:
    * Se erradicó la sobrecarga vertical provocada por la competencia visual de 5 cajas apiladas (pistas, adivinanza, quién paga, mapas y desvelar).
    * Introducido un **Segmented Control estilo Apple HIG** con 3 pestañas limpias:
      1. **🤫 Destino**: Vista pura enfocada en el misterio, la distancia calculada y el botón primario de navegación, con divulgación voluntaria para desvelar el restaurante y registrar la visita en el historial.
      2. **🎲 Juegos**: Acordeón/pestaña dedicada para dinámicas secundarias en ruta (*Pistas progresivas bajo demanda*, *Adivinanza en directo* y ruleta de moneda *¿Quién paga hoy?* con indicador de actividad).
      3. **🗺️ Mapa**: Selector discreto de aplicación de mapas preferida (Automático, Apple Maps, Google Maps, Waze) sin ensuciar la pantalla principal.
    * El botón primario **"¡CÓMO LLEGAR! 🗺️"** se mantiene siempre accesible, fijo y dominante sin importar la pestaña seleccionada.
  - **Animaciones y Microinteracciones Apple**:
    * Agregada la animación `.animate-ios-fade` en `style.css` para transiciones suaves al alternar entre pestañas.

### [v1.2.3] - 2026-10-14
- **Corrección Burger King**:
  - Limpiado y eliminado el falso fondo de tablero de ajedrez (checkerboard) del archivo PNG aportado por el usuario, dejando el logotipo moderno 2021 (panecillo naranja y letras rojas) 100% visible, nítido y con transparencia real sobre el fondo oscuro.
- **Identidad Única Burgers en Rojo Corporativo**:
  - Transformado el logotipo tipográfico de Única Burgers de negro a su color rojo identificativo corporativo (`#E62323`), haciéndolo resaltar con máxima legibilidad y estética sobre las tarjetas de cristal oscuro.
- **Kebab Durum / Rollo Identificativo**:
  - Reemplazada la foto de plato por la imagen apetecible y representativa de **rollos / durum de kebab** con carne, verduras y salsa sobre fondo transparente.
- **Refresco de Caché (v6 / SW v5)**:
  - Incrementada la clave de almacenamiento local a `v6` y el Service Worker a `v5` para forzar la actualización inmediata de todas las imágenes en el navegador.

### [v1.2.2] - 2026-10-14
- **Logotipos Reales Exactos Aportados por el Usuario**:
  - Integradas las imágenes oficiales suministradas directamente por el usuario para los 5 restaurantes solicitados:
    * **Burger King**: Emblema oficial moderno rebrand 2021 (`burger_king.png`).
    * **KFC**: Emblema circular en fondo rojo del Coronel Sanders (`kfc.png`).
    * **Popeyes**: Wordmark horizontal oficial en naranja característico (`popeyes.png`).
    * **Única Burgers**: Logotipo oficial tipográfico curvo de Única Cartagena (`unica.png`).
    * **Telepizza**: Logotipo oficial sobre fondo rojo distintivo de Telepizza (`telepizza.png`).
    * **McDonald's**: Mantenido el logotipo oficial de los Arcos Dorados (`mcdonalds.png`).
    * **Kebab**: Incorporada imagen/ilustración llamativa y apetecible de un durum / rollo de kebab completo (`kebab.png`), identificado simplemente como **Kebab**.
- **Sucursales Específicas Kebab**:
  - Cartagena: **City Döner Kebab** (C. Jiménez de la Espada, 17, bajo).
  - Murcia: **Kebab El Buen Rollo** (C. Músico Antonio Rodríguez de Hita, 10).
- **Animación Ruleta de Decisión**:
  - Actualizado el ciclo de animación previa al resultado para rotar a través de los nuevos iconos PNG oficiales en alta resolución.
- **Service Worker v4**:
  - Actualizada la caché con los nuevos ficheros PNG para acceso 100% offline.

### [v1.9.5] - 2026-10-15
- **Eliminación de la Pantalla de Carga (Splash Screen)**:
  - Retirada la pantalla de carga intermedia con animación de trazado para permitir un acceso inmediato e instantáneo a la pantalla principal al abrir la aplicación.
  - Limpieza de marcado en `index.html`, estilos CSS en `style.css` y lógica de arranque en `bundle.js`.
  - Mantenido el nuevo logotipo oficial (Opción A: pureza minimalista con unión púrpura/magenta translúcida y sin chispa).
- **Service Worker v23**:
  - Actualización de versión de caché para propagación inmediata a dispositivos móviles.

### [v1.9.4] - 2026-10-15
- **Icono Oficial "Duo" Opción A (Pureza Minimalista & Lente Púrpura)**:
  - Recuperada la silueta esbelta y limpia de los dos aros originales (Rojo/Rose y Azul/Cyan) en alta resolución.
  - Retirada completamente la chispa/estrella amarilla artificial del centro.
  - Implementada el área de unión como una lente translúcida biconvexa con el color combinado de ambos espectros (púrpura/magenta radiante `#D946EF` a `#7C3AED` con `mix-blend-mode: screen`).
- **Pantalla de Inicio / Splash Screen OLED con Animación de Trazado**:
  - Al abrir o recargar la app (cold start), se despliega una pantalla de presentación a pantalla completa sobre negro OLED puro (`#000000`).
  - Muestra exclusivamente el logotipo de Duo en gran tamaño (hasta 224px en responsive) con animación de trazado vectorial nativa en los dos aros (`stroke-dasharray` / `stroke-dashoffset`).
  - Al unirse los dos trazos en el centro, la lente púrpura eclosiona con un suave resplandor caústico.
  - Transición fluida con desvanecimiento (`opacity: 0`, `scale(1.05)`) hacia la pantalla principal tras ~1.85 segundos o inmediatamente al tocar la pantalla.
- **Service Worker v22**:
  - Actualización de caché para propagación instantánea a dispositivos móviles y GitHub Pages.

### [v1.9.3] - 2026-10-15
- **Rediseño del Icono Oficial "Duo" — Liquid Glass & Fusión Cromática**:
  - Eliminada la chispa/estrella de 4 puntas de la intersección.
  - La unión de los dos aros ahora se resuelve mediante una lente caústica óptica natural, donde la mezcla aditiva del color Rose (Jugador 1) y Cyan/Indigo (Jugador 2) produce un tono violeta/magenta translúcido radiante.
  - Estética **Liquid Glass** mejorada: aros volumétricos de cristal de 30px con refracción especular curva en los bordes superiores, sombras de oclusión 3D y resplandor atmosférico OLED.
  - Actualizado `duo_icon.svg`.
- **Service Worker v21**:
  - Actualizada la versión de caché para propagación instantánea a dispositivos móviles.

### [v1.9.2] - 2026-10-15
- **Eliminación del Indicador Estático Home Bar**:
  - Eliminado el elemento simulado de la barra de inicio inferior (`.ios-home-indicator`) en todas las pantallas (`home`, `voting`, `handover`, `result`, `no-match`, `recommended`).
  - En dispositivos iOS reales, la barra inferior es un elemento nativo del sistema operativo; la barra artificial era redundante y ocupaba espacio visual vertical.
  - La interfaz respeta los márgenes inferiores seguros nativos (`safe-area-inset-bottom`) sin elementos inertes superpuestos.
- **Service Worker v20**:
  - Actualizada la caché a `donde-comemos-v20` para propagación instantánea a dispositivos móviles y GitHub Pages.

### [v1.9.1] - 2026-10-15
- **Corrección de Cuadrícula y Renderizado de Tarjetas de Votación**:
  - Restaurada la estructura de cuadrícula de 2 columnas (`grid-cols-2`) en los modos de Cine/Series y Planes, asegurando una visualización consistente y adaptativa sin desbordamientos.

### [v1.9.0] - 2026-10-15
- **Selector de Modo Tripartito (Comer / Películas y Series / Planes y Citas)**:
  - Nuevo control segmentado visionOS Liquid Glass en la pantalla de inicio con 3 modos:
    * **Comer**: Restaurantes de Cartagena y Murcia.
    * **Películas y Series**: Catálogo curado de 12 películas y series aclamadas de Netflix, Disney+, Prime Video, Max y Apple TV+ con duración, temporadas, pistas misteriosas y enlace para ver online.
    * **Planes y Citas**: 12 planes románticos, activos y acogedores (cine, paseo y helado artesano, bolera retro, spa termal, picnic, escape room, cata de vinos, senderismo, concierto, juegos de mesa, museo, cocinar juntos).
  - Cada modo incluye logotipos vectoriales SVG autocontenidos en squircle Apple, pistas para el modo misterio y textos contextualizados (*Comensales*, *Espectadores*, *Participantes*).
- **Modo a Distancia / Multidispositivo (Compartir Enlace Peer-to-Peer)**:
  - En la pantalla de traspaso (Handover), nuevo bloque *"¿Estáis a distancia? Vota cada uno en su propio móvil"*.
  - Genera un enlace ultraligero codificado en el hash de la URL (`#duo_p2=...`) que el Jugador 1 puede compartir por WhatsApp, Telegram, iMessage o copiar al portapapeles.
  - El Jugador 2 abre el enlace en su propio móvil, vota en secreto sin ver las elecciones del Jugador 1, y la app calcula la coincidencia.
  - Al resolverse, el Jugador 2 puede pulsar *"Compartir resultado"* (`#duo_result=...`) para que el Jugador 1 también vea el confeti, pistas y destino en su teléfono.
  - 100% serverless, sin backend ni cuentas de usuario, compatible con GitHub Pages y respetuoso con la privacidad.
- **Ruleta de Desempate Táctil e Interactiva (Canvas con Física y Fricción)**:
  - En caso de 0 coincidencias (Ronda 2 o acceso express en Ronda 1), se despliega una ruleta interactiva basada en HTML5 Canvas con aceleración por hardware.
  - Soporte de pulsación del botón central visionOS "GIRAR" o arrastre / deslizamiento táctil con el dedo (*flick physics*).
  - Desaceleración por fricción realista, sonido de *tick* y respuesta háptica al pasar cada segmento, aguja superior dorada con sombra y fanfarria triunfal al seleccionar el ganador.
- **Horarios en Tiempo Real ("¿Está abierto ahora?")**:
  - En las tarjetas de restaurantes recomendados, cálculo en tiempo real del estado de apertura según la franja horaria local (almuerzo 13:30–16:30, cena 20:30–23:45).
  - Insignias visuales dinámicas:
    * `Abierto ahora` (verde esmeralda con punto pulsante).
    * `Abre a las 20:30` / `Abre a las 13:30` (ámbar con icono de reloj).
    * `Cerrado ahora` (neutral translúcido con próximo turno).
- **Service Worker v18**:
  - Actualización de versión de caché para sincronización inmediata y persistencia offline.

### [v1.8.2] - 2026-10-14
- **Carga en Cascada Progresiva ("Ver más")**:
  - Sustituida la rotación paginada de 5 por un botón interactivo de revelación en cascada (*"Ver más"*), que va desplegando fluidamente opciones adicionales hacia abajo acumulándolas en la lista sin perder las anteriores.
- **Filtro de Estrellas Google Ajustable (4.5 por defecto)**:
  - Añadido selector segmentado de puntuación mínima en Google Reviews con 4 umbrales: `4.5+ (Top)` [predeterminado], `4.3+`, `4.0+` y `Todas`.
- **Filtro de Rango de Precio**:
  - Incorporado selector segmentado por nivel de precio: `Todos` [predeterminado], `€` (Económico), `€€` (Medio), `€€€` (Especial) y `€€€€` (Lujo).
- **Catálogo Gastronómico Ampliado y Calibrado (32 Restaurantes)**:
  - Añadidas 12 opciones populares de alta demanda en Cartagena y Murcia cubriendo el espectro de `€` y `€€` y calificaciones de 4.2 a 4.5 (ej. La Uva Jumillana, El Soldadito de Plomo, La Mejillonera, Da Rino, Bar Los Zagales, La Pequeña Taberna, Pizzería Imperial, La Tapa, etc.).
- **Service Worker v17**:
  - Bump de versión de caché para actualización y persistencia offline.

### [v1.8.1] - 2026-10-14
- **Eliminación del Modo Caos**:
  - Retirada la opción "Modo Caos" al quedar redundante frente a "Sorpréndenos directamente" (ruleta rusa express).
- **Limpieza de la Pantalla Principal (Home)**:
  - Eliminado el botón directo de recomendaciones en el bloque central de Home, manteniéndolo exclusivamente dentro de *"Más opciones y modos rápidos"* (Action Sheet nativo).
- **Recomendaciones Basadas en Ubicación Actual (GPS) con Radio de Distancia**:
  - Sustituido el filtrado estático previo por un sistema de proximidad geográfica en tiempo real mediante coordenadas Haversine.
  - **Selector Segmentado de Radio de Distancia**: Permite cambiar interactivamente el rango de proximidad (`< 2 km`, `< 5 km`, `< 15 km`, `< 30 km`, `Todas`).
  - **Buscador de Ciudad o Zona**: Campo de búsqueda de texto predictivo y chips de acceso rápido (`Cartagena`, `Murcia`, `Cabo de Palos`, `Espinardo`, `El Palmar`, etc.) que re-centran automáticamente el cálculo de distancias al municipio o barrio seleccionado.
  - **Botón GPS Dinámico**: Permite alternar en cualquier momento entre la búsqueda de una ciudad y la ubicación actual del usuario (`navigator.geolocation`).
  - **Insignias de Distancia**: Cada tarjeta muestra la distancia estimada calculada (ej. `~1.4 km` o `~850 m`).
  - **Catálogo Ampliado**: 20 restaurantes de excelencia gastronómica con calificaciones contrastadas superiores a 4.5 estrellas en Google.
- **Service Worker v15**:
  - Actualización de versión de caché para propagación instantánea a dispositivos móviles.

### [v1.8.0] - 2026-10-14
- **Nueva Opción: Sitios Recomendados (>4.5 estrellas en Google)**:
  - Añadido acceso directo tanto en la pantalla de inicio (Home) como en la *Action Sheet* de opciones rápidas.
  - Presenta una selección curada de **cinco restaurantes de alta gastronomía y tapeo** con más de 4.5 estrellas reales y cientos de opiniones contrastadas en Google Maps (zona Cartagena y Murcia).
  - Incluye:
    * Insignia destacada de puntuación Google (`4.6 - 4.8`) con número real de reseñas.
    * Galardones y menciones oficiales (Estrellas Michelin, Soles Repsol, referencias locales).
    * Reseña destacada sintetizada y rango de precio (`€€` a `€€€€`).
    * Enlace directo para abrir la ficha del restaurante en Google Maps y botón de navegación GPS directa.
    * Filtro segmentado estilo Apple HIG para alternar entre *Todas*, *Cartagena* y *Murcia*.
    * Botón de rotación (*"Ver otras 5 opciones recomendadas"*).
    * Botón integrado de gamificación (*"Votar entre estas 5 con Duo"*): traslada los 5 restaurantes recomendados a una sesión de votación secreta de dos turnos en Duo.
- **Limpieza de Iconografía**:
  - Sustituido el emoji residual en el modal de historial por un icono vectorial SVG nativo.
- **Service Worker v14**:
  - Actualización de versión de caché para propagación inmediata a dispositivos móviles.

### [v1.7.1] - 2026-10-14
- **Corrección de Parpadeo en Selección de Tarjetas**:
  - Eliminado el bug en el que las tarjetas desaparecían durante un instante al pulsarlas:
    * Se sustituyó el re-renderizado completo de pantalla (`renderPlayerScreen`) por manipulaciones quirúrgicas en el DOM (`classList.toggle`, actualización directa de insignia `.check-badge` y contador numérico en tiempo real).
    * Eliminadas las animaciones CSS escalonadas con retrasos (`cardStagger` y `.animate-card-appear`) que reiniciaban la opacidad en cada pulsación.
  - La respuesta al toque es ahora instantánea (0 ms de latencia) y fluida con feedback háptico suave.
- **Depuración de Cabecera Superior y Silencio por Defecto**:
  - Eliminados los textos superiores de "Cartagena & Murcia" y el botón flotante de audio para una interfaz limpia y minimalista.
  - Audio silenciado por defecto (`soundMuted = true`).
- **Identidad de Marca**:
  - Nombre estandarizado como **Duo** (estrictamente sin tilde).
- **Service Worker v13**:
  - Actualización de versión de caché para propagación inmediata a dispositivos móviles.

### [v1.7.0] - 2026-10-14
- **Depuración de Cabecera Superior en Home**:
  - Eliminados los textos superiores de "Cartagena & Murcia" y el botón de selector de audio.
  - El sonido queda completamente silenciado por defecto para una experiencia silenciosa, limpia y profesional.
- **Sistema Global de Transiciones y Animaciones (Spring & Fluid Motion)**:
  - Nueva clase `.animate-view-enter` con física de muelles de Apple (`cubic-bezier(0.16, 1, 0.3, 1)`) en todas las pantallas principales.
  - Efecto *stagger* o escalonado (`.animate-card-appear`) para la cuadrícula de restaurantes en los turnos de votación.
  - Transición deslizante fluida (`.animate-tab-slide`) entre pestañas del *Segmented Control*.
  - Efecto de revelación con pulso óptico (`.animate-reveal`) al desvelar el restaurante secreto.
  - Microinteracción de pulsación táctil elástica (*Spring Press* con `scale(0.965)`) en todos los botones y tarjetas interactivas.
- **Service Worker v12**:
  - Bump de versión para actualización instantánea en móviles.

### [v1.6.0] - 2026-10-14
- **Rebranding a "Duo — Decisiones compartidas"**:
  - Nuevo nombre minimalista, memorable y modular para expandir a futuro la aplicación a cine, series, viajes y otros planes.
  - **Nuevo Icono Oficial de Marca (`duo_icon.svg`)**:
    * Squircle de Apple con fondo negro OLED.
    * Dos anillos luminosos visionOS entrelazados (Rose para Jugador 1 e Indigo/Cyan para Jugador 2).
    * Destello dorado de coincidencia (*Match Spark*) en la intersección común.
  - Actualizados `index.html`, `manifest.json`, `bundle.js`, `sw.js` (v11) y el banner de instalación móvil.

### [v1.5.1] - 2026-10-14
- **Navegación Hacia Atrás (Back Button)**:
  - Añadido botón de retroceso nativo estilo iOS en la cabecera superior durante la votación (`renderPlayerScreen`):
    * En el **Turno 1**: permite regresar a la pantalla de inicio (Home) si se inició por error o se desean cambiar nombres/ajustes.
    * En el **Turno 2**: permite volver a la pantalla de traspaso si se pulsó antes de tiempo.
  - En la **Pantalla de Traspaso (Handover)**: añadido botón secundario sutil *"Volver a la selección de Jugador 1"* para rectificar votos antes de pasar el móvil.
- **Service Worker v10**:
  - Actualización de caché para propagar los cambios inmediatamente.

### [v1.9.11] - 2026-10-16
- **Auditoría y Corrección Integral de Carteles de Películas y Series (TMDb)**:
  - Realizada comprobación automatizada de las URLs de los 59 carteles del catálogo contra el CDN oficial de TMDb (`image.tmdb.org/t/p/w500/`).
  - Detectados y corregidos 21 carteles que devolvían error 404 (entre ellos *Coherence*, *Ex Machina*, *Klaus*, *Captain Fantastic*, *Diamantes en bruto*, *Barbarian*, *Una cuestión de tiempo*, *Antes de amanecer*, *(500) días juntos*, *Dune: Parte Dos*, *El Resplandor*, *Cadena Perpetua*, *The Last of Us*, *The Bear*, *Ted Lasso*, etc.), sustituyéndolos por sus hashes oficiales reales verificados al 100% (código 200 OK).
  - Eliminado el bucle de error en el atributo `onerror` de la etiqueta `<img>` para garantizar un renderizado robusto y elegante en caso de cortes de red.
- **Service Worker v30**:
  - Bump de versión de caché a `donde-comemos-v30` en `sw.js` para forzar la recarga de los nuevos carteles en dispositivos móviles.

### [v1.9.10] - 2026-10-16
- **Reorganización Lógica de Categorías de Películas y Series**:
  - Reestructurado el orden de la barra de navegación para seguir una jerarquía clara:
    1. **Vistas generales y colecciones**: *Todas* (catálogo completo y pestaña por defecto al entrar), *Recomendadas* (lo mejor de la crítica), *Joyas Ocultas* (cine de culto/nicho y streaming originals) y *Series* (formato televisivo).
    2. **Géneros temáticos de cine**: *Acción*, *Comedia*, *Drama*, *Románticas* (reubicada junto a los demás géneros de cine), *Ciencia Ficción*, *Terror* y *Animación*.
  - El filtro por defecto al iniciar se establece en *Todas*, resaltando la primera píldora de forma natural.
- **Service Worker v29**:
  - Bump de caché a `donde-comemos-v29` en `sw.js` para propagación inmediata.

### [v1.9.9] - 2026-10-16
- **Unificación Tipográfica de Píldoras de Categorías (Sin Iconos)**:
  - Eliminados los iconos de todas las categorías de películas y series para lograr una estética 100% homogénea, sobria y limpia estilo Apple visionOS.
  - Todas las categorías (*Recomendadas*, *Joyas Ocultas*, *Románticas*, *Series*, *Todas*, *Acción*, *Ciencia Ficción*, *Drama*, *Comedia*, *Terror*, *Animación*) comparten ahora un formato tipográfico idéntico.
- **Service Worker v28**:
  - Bump de caché a `donde-comemos-v28` en `sw.js` para propagación inmediata.

### [v1.9.8] - 2026-10-16
- **Categoría "Joyas Ocultas" (Nicho & Originales de Streaming)**:
  - Nueva categoría especializada para descubrir cine menos convencional, películas de culto y títulos originales de plataformas con gran personalidad que no son los típicos blockbusters comerciales de siempre (*La sociedad de la nieve*, *As Bestas*, *Coherence*, *Ex Machina*, *Klaus*, *Captain Fantastic*, *Drive*, *El hoyo*, *Glass Onion*, *Diamantes en bruto*, *Barbarian*).
- **Categoría "Románticas"**:
  - Nueva categoría para películas románticas icónicas y recientes para disfrutar en pareja (*A tres metros sobre el cielo*, *Romper el círculo*, *El diario de Noa*, *Una cuestión de tiempo*, *La La Land*, *Antes de amanecer*, *Orgullo y prejuicio*, *(500) días juntos*, *Palm Springs*, *Cualquiera menos tú*).
- **Botón "Ver más" (Paginación Progresiva por Categoría)**:
  - Implementado control dinámico *"Ver más películas (+X más)"* estilo visionOS con `backdrop-blur` en cada categoría, mostrando inicialmente 6 tarjetas (3 filas de 2) y desplegando las siguientes de forma incremental con feedback háptico y sonoro.
- **Catálogo Ampliado y Puntuaciones FilmAffinity**:
  - Catálogo de entretenimiento ampliado a un total de 59 títulos (50 películas y 9 series), todos con sus notas oficiales de FilmAffinity, enlaces a plataformas de streaming (Netflix, Prime Video, Max, Apple TV+, Movistar+, Disney+) y carteles de alta definición de TMDB.
- **Service Worker v26**:
  - Bump de versión de caché a `donde-comemos-v26` para actualización instantánea.

### [v1.9.7] - 2026-10-16
- **Corrección de Codificación UTF-8 (Tildes y Caracteres Especiales)**:
  - Eliminado el problema de doble codificación UTF-8 / mojibake (`Ã³`, `Ã­`, `Ã±`, `â€¢`).
  - Restauradas todas las tildes y caracteres del español en títulos, sinopsis, categorías y curiosidades de las películas y series (*misión*, *librería*, *años*, *ciencia ficción*, *película*, *sofá*, etc.).
- **Notas de FilmAffinity**:
  - Reemplazadas todas las valoraciones por las notas oficiales medias de **FilmAffinity** (ej. *El Padrino* 9.0, *Breaking Bad* 8.8, *Pulp Fiction* 8.7, *Juego de Tronos* 8.6, *Cadena Perpetua* 8.6, *El Resplandor* 8.2, *El Club de la Lucha* 8.2, *El Caballero Oscuro* 8.1, *Succession* 8.1, *El Viaje de Chihiro* 8.1, *Origen* 8.0, *Parásitos* 8.0, *Interstellar* 7.9, *Whiplash* 7.9, *Coco* 7.9, *The Bear* 7.8, *Ted Lasso* 7.8, *Spider-Man Multiverso* 7.8, *Dune: Parte Dos* 7.6, *The Last of Us* 7.6, *Oppenheimer* 7.6, *Shōgun* 7.5, *Stranger Things* 7.5, etc.).
  - Etiqueta explícita de `FilmAffinity` añadida en el modal de detalles y en la pantalla de resultado.
- **Service Worker v25**:
  - Actualización de caché para reflejar los textos limpios en todos los dispositivos.

### [v1.9.6] - 2026-10-16
- **Overhaul Integral de Películas y Series**:
  - **Servicios de Streaming**: Badges oficiales integrados en cada tarjeta y en la pantalla de resultado para Netflix, Max (HBO), Apple TV+, Disney+, Movistar+ y Prime Video, con enlaces directos para reproducir en un clic.
  - **Categorías y Filtros por Género**: Barra horizontal deslizable estilo visionOS (`Recomendadas`, `Todas`, `Series`, `Acción`, `Ciencia Ficción`, `Drama`, `Comedia`, `Terror`, `Animación`).
  - **Categoría "Recomendadas"**: Colección de joyas cinematográficas aclamadas por la crítica de todos los géneros (IMDb 8.5+, Oscars).
  - **Categoría dedicada "Series"**: Segregación estricta de series para no mezclarlas con películas.
  - **Pósters Oficiales TMDB**: Carteles oficiales en proporción 2:3 vertical de alta resolución en cada tarjeta y en grande en la pantalla de resultado.
  - **Sinopsis de 2 Líneas y Modal Completo**: Previsualización de argumento en cada tarjeta con limitación elegante a 2 líneas más botón `(i)` que abre un Apple Sheet modal con sinopsis extendida, plataformas disponibles, curiosidades y tráiler en YouTube.
- **Eliminación de la Misión Secreta**:
  - Suprimido el bloque y eventos de la "Misión Secreta" de la pestaña de Juegos tras la selección a petición del usuario.
- **Service Worker v24**:
  - Actualización de caché para propagación instantánea offline.

### [v1.9.13] - 2026-10-16
- **Integración de Recomendados y 'Al Azar' dentro de la Votación de Comida**:
  - Trasladados los accesos directos de "Sitios recomendados" y "Sorpréndenos" del menú de opciones rápidas a la propia pantalla de votación del modo Comida.
  - **Barra de Categorías de Comida**: Chips horizontales deslizables (`Todos`, `Recomendados`, `Hamburguesas`, `Pollo`, `Pizza`, `Kebab`) idénticos a los del modo Películas.
  - **Pestaña Recomendados en Comida**: Muestra los restaurantes gastronómicos top con insignia de Google Rating (+4.5), reseñas y precio, con botón dinámico "Ver más restaurantes" para cargar el catálogo completo en cascada.
  - **Botón "Al Azar" en Cabecera**: Acceso directo estilo Apple visionOS en la cabecera de la votación de comida para sortear y resolver de inmediato un restaurante sin esperar a terminar los turnos.
- **Service Worker v32**:
  - Bump de versión de caché para actualización instantánea.

### [v1.9.12] - 2026-10-16
- **Corrección de Recorte de Texto en Tarjetas de Planes y Comida**:
  - Eliminado el truncamiento agresivo con centrado flexbox que cortaba los extremos de los títulos (p. ej. *"Paseo al Atardecer y Helado"* o *"Escape Room en Pareja"*).
  - Estructurado en contenedor de altura fija normalizada (`min-h-[2.4rem]`) con ajuste fluido de hasta 2 líneas (`line-clamp-2 break-words text-center text-[13px] leading-tight`).
  - Alineación horizontal uniforme del subtítulo (duraciones, categorías o sucursales) en todas las tarjetas de la cuadrícula.
  - Incrementada la altura mínima de las tarjetas (`min-h-[205px]`) para un equilibrio visual idóneo según Apple HIG.
- **Contextualización de Pantalla de Resultados en Modo Planes**:
  - Adaptados los textos del flujo de decisión para Planes: *"Plan Secreto"*, *"¡Plan en común!"*, pestaña *"Plan"* y etiqueta *"Plan confirmado"*.
- **Service Worker v31**:
  - Bump de caché en `sw.js` para propagar instantáneamente las mejoras sin problemas de assets cacheados.

### [v1.9.18] - 2026-10-16
- **Filtros Avanzados en Modo Películas / Series y Categorías en Modo Planes**:
  - **Películas y Series**:
    - **Filtro de Plataformas de Streaming**: Selector visionOS para filtrar al instante por suscripción activa (`Todas`, `Netflix`, `Prime`, `Max`, `Disney+`, `Apple TV+`).
    - **Filtro de Duración**: Selector para alternar entre `Cualquiera`, `Corta (< 1h 45m)` y `Larga (> 2h)`.
  - **Planes y Citas**:
    - **Barra de Pestañas y Categorías**: Chips de filtro superior idénticos al resto de la app (`Todos los Planes`, `Al Aire Libre`, `En Casa & Relax`, `Aventura & Ocio`, `Noche & Gourmet`).
    - **Filtro de Duración del Plan**: Selector para filtrar entre planes `Exprés (≤ 1h 30m)` o `Tarde entera (> 2h)` con contador en vivo de opciones disponibles.
  - **Service Worker v37**:
    - Incremento de versión de caché para sincronización offline inmediata.

### [v1.9.17] - 2026-10-16
- **Ampliación Completa de Filtros en Pestaña 'Recomendados'**:
  - Restablecido el selector de **Rango de Precio** (`Todos`, `€`, `€€`, `€€€`, `€€€€`) con feedback activo y badge dinámico en color esmeralda.
  - Ampliado el selector de **Estrellas Google mínimas** con todas las opciones originales (`4.5+ (Top)`, `4.3+`, `4.0+`, `Todas`).
  - Reincorporado el selector completo de **Distancia máxima** (`<2km`, `<5km`, `<15km`, `<30km`, `Todas`) junto con el botón de geolocalización GPS inmediata.
  - Actualizados todos los event listeners correspondientes en la pantalla de votación.
  - Service Worker actualizado a `donde-comemos-v36`.

### [v1.9.16] - 2026-10-16
- **Tarjetas Detalladas a 1 por Fila en Pestaña 'Recomendados' de Comida**:
  - En la pestaña "Recomendados", las opciones ahora se muestran a **una tarjeta grande por fila** (`flex flex-col gap-3.5`) en lugar de cuadrícula 2x2.
  - Cada tarjeta incluye toda la información rica que existía en el explorador original de recomendaciones:
    - Insignias de ciudad, distancia aproximada calculada, categoría y rango de precio (`€`, `€€`, `€€€`).
    - Estado de apertura en vivo (abierto/cierra pronto/cerrado).
    - Nombre del restaurante con nota media de Google, estrellas e indicador del número de reseñas entre paréntesis.
    - Reconocimientos gastronómicos (Soles Repsol, Recomendados Michelin, etc.).
    - Cuadro explicativo con la descripción del local y su propuesta culinaria.
    - Zona/dirección de la sucursal y botón de enlace directo a Google Maps.
    - Controles interactivos completos de votación (Superlike, Veto y selección con checkmark iOS).
  - En la pestaña "Mis Restaurantes", se conserva intacta la cuadrícula limpia 2x2.
  - Service Worker actualizado a `donde-comemos-v35`.

### [v1.9.15] - 2026-10-16
- **Pestaña integrada de Recomendados en Comida (estilo Películas) sin saturar el menú superior**:
  - Eliminado el botón de ventana externa de la cabecera, despejando la barra superior que ahora solo conserva el turno, el botón "Al azar" y el contador de elegidos.
  - Implementada una barra de pestañas en Comida exactamente igual que en Películas:
    - **[Mis Restaurantes]**: muestra el catálogo habitual de comida sin categorías arbitrarias.
    - **[Recomendados]**: activa la vista de recomendaciones con el panel de filtros de Google integrado directamente (búsqueda de ciudad/zona, GPS, notas +4.5/+4.3/Todas, y distancias <5km, <15km, <30km, Todas) y botón "Ver más".
  - Las tarjetas de recomendados se seleccionan directamente con las mecánicas del juego (voto, veto, superlike) sin cambiar de pantalla.
  - Service Worker actualizado a `donde-comemos-v34`.

### [v1.9.30] - 2026-10-27
- **Fase 1 y Mejoras Prioritarias de Auditoría Multidisciplinar (v2.0)**:
  - **Sorteo Determinista en Votación Simultánea**: El dispositivo anfitrión resuelve el resultado y Player 2 adopta de forma inmediata y prioritaria el nodo firmado en Firebase, eliminando por completo la posibilidad de ganadores discordantes entre ambos móviles.
  - **Ruleta de Desempate Justa y Respeto Absoluto de Vetos**: La ruleta final une siempre las selecciones de ambos jugadores (`p1Selections ∪ p2Selections`) en lugar de tomar solo las de P2, y descarta terminantemente cualquier opción vetada por cualquiera de los dos.
  - **Filtro 'No Repetir Último Ganador' Conectado**: Al calcular coincidencias, si hay múltiples opciones válidas y el switch está activo, se excluye automáticamente el último ganador de la ronda anterior.
  - **Ampliación de Áreas Táctiles (44x44px)**: Añadidos pseudoelementos `::after` a los botones de Veto, Superlike e Info (`min-width: 44px; min-height: 44px;`) evitando selecciones accidentales sobre la tarjeta (*fat finger*).
  - **Votación Quirúrgica en Vivo (Sin Re-renders Destructivos)**: Al aplicar o retirar un Veto o Superlike, la interfaz actualiza directamente los nodos de la tarjeta en el DOM sin recargar la pantalla completa, eliminando parpadeos y preservando el scroll.
  - **Optimización de GPU (120Hz ProMotion)**: Reemplazado el `backdrop-filter` en cascada en las 20+ tarjetas de catálogo por un material de cristal oscuro puro (`#151722` con degradado), liberando la GPU en iPhone.
  - **Soporte de Navegación por Gestos / Atrás**: Integración con `history.pushState` y escucha de `popstate` para navegar atrás ordenadamente sin salirse de la aplicación.
  - **Corrección de Filtros en Modo Planes**: Planes de 2 horas integrados en el filtro de tarde y opciones secundarias vinculadas.
  - **Ruleta de Suspense Dinámica**: La ruleta ahora cicla carteles de cine en modo Películas o iconos de planes en modo Planes en lugar de hamburguesas.
  - **Seguridad Anti-XSS**: Función universal `escapeHtml` en notas secretas, diario de citas y wishlist.
  - **Cromática Apple HIG**: Degradados limpios de P1 (Rose a Coral) y P2 (Indigo a Cyan) sin tonos semáforo.
  - **Bump a `donde-comemos-v51`** en Service Worker e `index.html`.

### [v1.9.29] - 2026-10-27
- **Eliminación Total y Blindaje contra Difuminado Superior en iOS PWA Standalone**:
  - **Bloqueador físico de Safe Area**: añadido `<div class="ios-status-bar-fill"></div>` fijo en `top: 0` con altura `env(safe-area-inset-top, 0px)` y `background-color: #000000 !important; z-index: 99999` para sellar la barra de estado e impedir que WebKit en iOS intente proyectar un filtro de difuminado sobre elementos que hagan scroll.
  - **Anulación de backdrop-filter en standalone**: añadido `@media (display-mode: standalone) { .sticky { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; } }`.
  - **Separación de Cabecera**: en la pantalla de votación (`renderPlayerScreen`), la barra superior ahora tiene fondo `bg-black` y padding superior `pt-[calc(env(safe-area-inset-top,0px)+12px)]`, situando las píldoras de navegación por debajo del área del notch/isla dinámica sin solapamientos.
  - **Dynamic Island Banner translúcido**: aumentada la opacidad a `0.94` y posicionamiento en `top-[calc(env(safe-area-inset-top,0px)+12px)]` para evitar que quede tapado por la barra de estado superior.
  - **Cache Busting absoluto**: agregadas query strings de versión en `index.html` (`./style.css?v=50` y `./bundle.js?v=50`) y Service Worker actualizado a `donde-comemos-v50` para obligar a iOS a desechar de inmediato cualquier archivo de estilo o script en caché persistente.

### [v1.9.28] - 2026-10-27
- **Solución Definitiva de Caché en PWA (Estrategia Network-First & Auto-Reload)**:
  - Causa raíz identificada: al abrir la aplicación desde la web (Safari/Chrome móvil), el navegador descargaba los últimos cambios en vivo (sin difuminado); sin embargo, la PWA instalada en la pantalla de inicio de iOS utiliza un Service Worker que estaba configurado como **Cache-First**, sirviendo permanentemente la versión antigua guardada en el almacenamiento local del iPhone sin pasar por la red.
  - Se ha reescrito la estrategia del Service Worker a **Network-First** para los ficheros esenciales (`index.html`, `bundle.js`, `style.css`): la PWA consulta primero la red para obtener siempre los estilos y lógica más recientes y solo recurre a caché si el dispositivo está sin conexión (offline).
  - En `index.html`: implementado auto-check de actualización con `reg.update()`, listener de `onupdatefound` y recarga automática inmediata (`window.location.reload()`) en cuanto el nuevo Service Worker toma el control (`controllerchange`).
  - Bump a `donde-comemos-v48`.

### [v1.9.27] - 2026-10-27
- **Cierre Automático de Salas por Inactividad (2 minutos)**:
  - Implementado timestamp de actividad `lastActivityAt` en Firebase tanto para `active_session` como para `rooms/<roomId>`.
  - Cada interacción relevante (apertura de sala, unión de Jugador 2, selección/voto, confirmación, envío de notas o giro de moneda) actualiza `lastActivityAt`.
  - En `syncActiveSessionFromFirebase()`, si transcurren más de 2 minutos (120.000 ms) sin ninguna interacción, la sala se cierra y se elimina automáticamente de Firebase (`active_session.remove()`), evitando que queden sesiones zombi o abiertas indefinidamente.
  - Al pulsar el botón de volver a inicio durante el turno de Jugador 1 (`btn-player-back`), la sesión activa se limpia de inmediato.
- **Service Worker v47**:
  - Bump a `donde-comemos-v47` para despliegue instantáneo.

### [v1.9.26] - 2026-10-27
- **Eliminación Definitiva del Difuminado en Barra de Estado de iOS (iOS Status Bar Blur)**:
  - Se identificó la causa exacta visible en la captura de pantalla del usuario:
    - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` forzaba a iOS/WebKit a superponer un filtro de desenfoque nativo translúcido (frosted glass) sobre la parte superior de la pantalla detrás de la hora ("11:19") y la batería ("73%").
    - Se cambió a `content="black"`, eliminando el efecto borroso superpuesto del sistema operativo.
    - Se eliminaron por completo del DOM los dos orbes de fondo `blur-[120px]` y `blur-[140px]`.
    - Se aisló el padding superior de la cabecera sticky de votación (`pt-[max(12px,var(--sat))]`) directamente dentro del bloque sólido `bg-neutral-950` en lugar del contenedor general, evitando que el contenido deslizable se cuele bajo el área superior.
- **Service Worker v46**:
  - Bump a `donde-comemos-v46` para forzar la actualización instantánea en el móvil del usuario.

### [v1.9.25] - 2026-10-27
- **Eliminación Total del Difuminado en Cabeceras y Fondo de App**:
  - En `index.html`: el contenedor `#app` principal ahora tiene fondo sólido `bg-black` en lugar de `bg-black/85`, evitando que los orbes de luz de fondo del body se filtren como un halo borroso en la parte superior.
  - En `bundle.js`: todas las barras superiores y subbarras sticky (`renderPlayerScreen`) ahora usan fondo totalmente sólido opaco `bg-neutral-950` sin ningún filtro de desenfoque (`backdrop-blur` eliminado), garantizando 100% de nitidez cristalina en textos, contadores e iconos al hacer scroll.
- **Rediseño de Notas Dinámicas estilo Liquid Glass**:
  - Píldora de mensaje flotante (`.ios-dynamic-island` / Dynamic Island banner) adaptada a estética **Liquid Glass**:
    - Fondo translúcido ahumado `rgba(18, 20, 29, 0.78)` con `backdrop-filter: blur(28px) saturate(200%)`.
    - Borde especular `border: 1px solid rgba(255, 255, 255, 0.18)` y reflejo interior `inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)`.
    - Sombra de profundidad `0 16px 40px -8px rgba(0, 0, 0, 0.85)`.
    - Icono con gradiente brillante y botón de cerrar integrado con microborde.
- **Service Worker v45**:
  - Bump a `donde-comemos-v45` para asegurar refresco inmediato en dispositivos móviles y PWAs instaladas.

### [v1.9.24] - 2026-10-27
- **Ajustes de Visibilidad en Móvil (Dynamic Island & Cabeceras)**:
  - Corregido el solapamiento y difuminado en cabeceras superiores: se ajusta el contenedor de la Dynamic Island a `top-14` y `z-[100]` con fondo opaco `bg-neutral-950/98` y sombra sólida `shadow-[0_12px_40px_rgba(0,0,0,0.95)]`.
  - Rebajado el exceso de `backdrop-blur-2xl` en las cabeceras sticky por `bg-neutral-950/95 backdrop-blur-sm`, eliminando el efecto borroso sobre el texto y garantizando 100% de nitidez y contraste en pantallas móviles y notches.
  - Al enviar una nota rápida desde el modal, el remitente recibe feedback visual local inmediato además de sincronizar con el otro dispositivo.
- **Corrección de Resultados en Votación Simultánea (Jugador 2)**:
  - En `renderMatchingScreen()`, antes de ejecutar el cruce de votos, se realiza una lectura fresca de la sala de Firebase (`rooms/<roomId>`).
  - Si el otro jugador ya resolvió el ganador (`status === 'completed'`), el cliente adopta directamente el resultado sin recálculo ni divergencias.
  - Se sincronizan íntegramente las selecciones, vetos y superlikes tanto de Jugador 1 como de Jugador 2 en ambos sentidos.
- **Service Worker v44**:
  - Bump a `donde-comemos-v44` para invalidar cachés antiguas e instalar la versión corregida al instante en navegadores y PWAs móviles.
- **Cero Emojis**: Conservada estrictamente la directriz de iconos monocromáticos SVG Apple HIG.

### [v1.9.23] - 2026-10-27
- **Votación Simultánea Automática Multidispositivo (Cero Enlaces Manuales)**:
  - Cuando uno de los dos pulsa **"Comenzar votación"** en su móvil, se abre automáticamente la sesión en directo en la nube (`active_session`).
  - En el móvil de la otra persona, en cuanto abre la app o está en la pantalla de inicio, aparece automáticamente un banner translúcido con pulsación esmeralda:
    > **"Votación en directo iniciada por [Nombre] • Unirse a la votación ahora"**.
  - Al pulsar "Unirse", entra al instante en su propio turno y ambos votan **en paralelo** sin tener que esperar a que el otro termine ni compartir URLs por WhatsApp/AirDrop.
  - Sincronización en directo: se ven las opciones elegidas del otro en vivo y las notas flotantes de Dynamic Island.
  - Cruce y Resultado Simultáneo: en cuanto ambos confirman sus votos, las pantallas de los dos móviles avanzan al unísono a la ruleta y al mismo resultado misterioso con confeti.
- **Service Worker v43**:
  - Bump de versión a `donde-comemos-v43` para actualización instantánea en móviles.
- **Cero emojis**: 100% iconos vectoriales monocromáticos SVG según la directriz Apple HIG.

### [v1.9.22] - 2026-10-26
- **Billetes / Boarding Pass de Citas & Duo Pass (Feature 1)**:
  - Rediseño completo de los recuerdos en el Diario de Citas: cada momento guardado se presenta como una tarjeta de embarque / entrada coleccionable de alta gama estilo Apple Wallet.
  - Estética visual con muescas semicirculares laterales (*notches*), cabecera perforada, tipografía monoespaciada para número de pase (`DUO PASS • Nº ...`), foto recortada estilo fotomatón y talón inferior con código de barras vectorial.
  - Botón de emisión directa *"Emitir Duo Pass"* en la pantalla de resultados de cualquier cita o comida.
- **Radar Inteligente de Distancia Real & Horarios (Feature 4)**:
  - Selector de radio en tiempo real para restaurantes (`Todos`, `< 2km`, `< 5km`, `< 15km`) con cálculo geodésico Haversine.
  - Interruptor dinámico *"Abierto ahora"* que evalúa la hora local del dispositivo para filtrar locales que están en servicio (comidas y cenas).
- **Post-its / Notas Rápidas Secretas entre Móviles (Feature 5)**:
  - Sistema de comunicación en vivo durante sesiones sincronizadas con Firebase Realtime Database.
  - Notificación flotante estilo **Dynamic Island** que desciende en la pantalla de la pareja con animación suave, haptic feedback y sonido `pop`.
  - Selector de mensajes rápidos (*"Hoy tengo antojo de algo dulce"*, *"Invito yo"*, *"Algo ligero"*) o notas personalizadas.
- **Retos de Pareja & Medallas en Duo Wrapped (Feature 6)**:
  - Sistema de 5 logros desbloqueables en la pantalla de estadísticas:
    1. *Telepatía Máxima* (>80% afinidad en 3+ partidas).
    2. *Exploradores Urbanos* (5 o más sitios/planes distintos).
    3. *El Pagador Oficial* (lanzar la moneda 3+ veces).
    4. *Cinéfilos de Sofá* (3+ sesiones de cine con palomitas).
    5. *Cita de 5 Estrellas* (guardar un recuerdo de 5★ con foto en el Diario).
- **Service Worker v42**:
  - Bump de versión a `donde-comemos-v42` para actualización instantánea en móviles.
- **Cero emojis**: 100% iconos vectoriales monocromáticos SVG según la directriz Apple HIG.

### [v1.9.21] - 2026-10-26
- **Firebase Suite Completa: Diario de Citas, Wishlist, Duo Wrapped & Sincronización Simultánea en Vivo**:
  - **1. Diario de Citas & Recuerdos ("Duo Moments")**:
    - Guardado en la nube en Firebase Realtime Database (`shared_diary/`) y respaldo en `localStorage`.
    - Selector interactivo de valoración por estrellas de 1 a 5★.
    - Notas y anécdotas de la experiencia compartida.
    - Subida y captura de fotos con compresión automática nativa en cliente (HTML5 Canvas JPEG 640px, < 35KB) sin costes ni almacenamiento externo.
    - Acceso directo para registrar recuerdos inmediatamente desde la pantalla de resultados (`btn-log-visit`).
  - **2. Modo Votación en Vivo Simultáneo**:
    - Indicador de estado en tiempo real en la cabecera de la pantalla de votación: cuenta cuántas opciones va seleccionando la otra persona en directo.
    - En la pantalla de espera remota se visualiza en tiempo real el progreso de selección del compañero.
    - Ruleta de desempate sincronizada en ambos móviles: si uno la hace girar, ambos móviles ven el resultado y reproducen la fanfarria de sonido a la vez.
    - Lanzamiento de moneda sincronizado en tiempo real: al pulsar "Lanzar moneda" en resultados, gira y suena en ambos dispositivos simultáneamente vía Web Audio API.
  - **3. Estadísticas de Pareja & "Duo Wrapped"**:
    - Porcentaje de afinidad de pareja calculado dinámicamente según las coincidencias en primera ronda y sesiones totales, con veredictos lúdicos ("Telepatía Total", "Súper Compenetrados", "Polos Opuestos").
    - Marcador de la moneda ("¿Quién paga más?") con barra visual comparativa estilo Apple Activity y cálculo de porcentaje de cada miembro de la pareja.
    - Podio de favoritos con medallas 🥇, 🥈 y 🥉 de los sitios o planes más repetidos.
    - Desglose estadístico por categorías: Comidas, Películas y Planes.
  - **5. Wishlist Compartida (Bucket List / Pendientes)**:
    - Baúl común sincronizado en la nube (`shared_wishlist`) para apuntar sitios o películas recomendadas.
    - Botón de acción rápida: *"Votar entre los sitios de la Wishlist"*, permitiendo iniciar una ronda de votación directa usando únicamente los planes guardados.
  - **UI / UX Home Screen**:
    - Botones de acceso rápido triple en la pantalla principal: Wishlist, Diario y Wrapped.
    - Menú Action Sheet enriquecido con todas las herramientas de pareja.
  - **Service Worker v40**:
    - Actualización de caché para propagación instantánea a dispositivos móviles.

### [v1.5.0] - 2026-10-14
- **Modo Caos (Regla Sagrada)**:
  - Nueva opción directa en el menú rápido (*Action Sheet* de Home): sorteo express inmediato con advertencia lúdica para resolver bloqueos (*"Quien proteste o ponga mala cara por el sitio elegido tiene que pagar la bebida del otro"*).
  - Encabezado especial con halo dinámico (*"Veredicto del Caos"*) en la pantalla de resultados.
- **Misiones Secretas Post-Elección**:
  - Nuevo bloque de gamificación interactiva dentro de la pestaña **Juegos**: retos divertidos para la comida (ej. invitar a los postres, pedir un producto desconocido de la carta, recoger bandeja el perdedor de la moneda, brindar antes del primer bocado, etc.).
- **Depuración Completa de Emojis Restantes**:
  - Eliminados todos los emojis residuales en textos de acierto de apuestas, tostadas de guardado y resultados de la moneda, garantizando una estética 100% Apple HIG limpia y profesional.
- **Service Worker v9**:
  - Bump de caché para sincronización offline inmediata.

### [v1.2.1] - 2026-10-14
- **Logotipos PNG Oficiales Transparentes**:
  - Sustituidos los SVGs generados por logotipos PNG oficiales descargados directamente con fondo transparente (McDonald's, Burger King, KFC, Popeyes, Telepizza, Única y Kebab).
- **Simplificación de Tarjetas**:
  - Eliminado el subtítulo/etiqueta de categoría de comida dentro de las tarjetas, dejando un diseño mucho más limpio, enfocado en el logo y el nombre.
- **Desplazamiento Elástico y Scroll Fluido**:
  - Activado scroll vertical elástico natural (`overflow-y: auto`, `-webkit-overflow-scrolling: touch`) con padding inferior generoso (`pb-28`) para navegar cómodamente cuando hay muchas tarjetas sin que la barra flotante las tape.
- **Ajuste Kebab Murcia**:
  - Establecido el nombre estándar como **Kebab** (con foto/icono representativo de kebab).
  - Cobertura de sucursales: Cartagena (**City Döner Kebab** en C. Jiménez de la Espada, 17) y Murcia (**Kebab El Buen Rollo** en C. Músico Antonio Rodríguez de Hita, 10).

### [v1.2.0] - 2026-10-14
- **Look & Feel Nativo Apple HIG (iOS 17/18 & visionOS)**:
  - Rediseño completo con estética **'Liquid Glass' / Frosted Glass**: superficies translúcidas con `backdrop-blur-2xl`, bordes especulares ultrafinos (`1px solid rgba(255, 255, 255, 0.12)`), sombras de profundidad suaves e iluminación ambiental mediante orbes flotantes.
  - Fondo negro OLED profundo (`#000000`).
  - Look refinado, profesional y maduro: eliminado el exceso de emojis infantiles, implementada tipografía nativa San Francisco / Plus Jakarta Sans con espaciados y microinteracciones de Apple.
- **Disposición de Tarjetas 2x2 (Dos por fila)**:
  - Cambiada la cuadrícula a exactamente dos columnas (`grid grid-cols-2`), con tarjetas amplias de esquinas squircle (`rounded-[26px]`), logo generoso de 72x72px y checkmark estilo iOS circular animado.
- **Logotipos Oficiales Vectoriales**:
  - Sustituidas todas las fotos genéricas de comida por logotipos vectoriales limpios e independientes (`mcdonalds.svg`, `burger_king.svg`, `kfc.svg`, `popeyes.svg`, `unica.svg`, `kebab.svg`, `telepizza.svg`).
  - Integración del logotipo oficial descargado de `unicaburger.com` para Única Burgers Cartagena.
  - Creación de emblema vectorial exclusivo para City Döner Kebab (C. Jiménez de la Espada, 17, Cartagena).
- **Service Worker v3 y Bundle Autocontenido**:
  - Incorporados todos los assets SVG en la caché offline de `sw.js`.
  - Actualizado `bundle.js` garantizando doble clic sin fallos de CORS.

### [v1.1.2] - 2026-10-14
- **Corrección de compatibilidad local (Doble clic directo)**:
  - Unificada la lógica en `bundle.js` para evitar el bloqueo de seguridad CORS que imponen los navegadores modernos sobre módulos ES al abrir archivos locales mediante el protocolo `file://`.

### [v1.1.1] - 2026-10-14
- **Ajuste específico Kebab Cartagena**:
  - Reemplazadas todas las opciones genéricas de kebab en Cartagena por la ubicación única y exacta de **City Döner Kebab** en `C. Jiménez de la Espada, 17, bajo, 30204 Cartagena, Murcia`.

### [v1.1.0] - 2026-10-14
- **Nuevo Catálogo Cartagena & Murcia**:
  - Incorporados como restaurantes principales: McDonald's, Burger King, KFC, Popeyes, Única (Cartagena), Kebab y Telepizza.
- **Lógica de Desempate en Segunda Ronda**:
  - Sorteo automático entre las elecciones del segundo usuario en caso de 0 coincidencias en la 2ª ronda.

### [v1.0.0] - 2026-10-14
- Creación inicial del proyecto PWA.
