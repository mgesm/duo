---
name: duo-architecture
description: Especificación técnica maestra, principios de diseño, funcionamiento del motor DuoPassEngine y estándares arquitectónicos de la PWA Duo. Úsala siempre que se modifique, depure o extienda la app Duo.
---

# Duo Architecture & Product Playbook

Esta skill documenta la arquitectura técnica, los principios de diseño y los protocolos operativos esenciales de la aplicación **Duo**. Consulta y aplica estas reglas en cualquier cambio sobre la app.

---

## 1. Visión y Propósito del Producto

**Duo** es una Progressive Web App (PWA) de alta fidelidad diseñada específicamente para parejas. Su objetivo es resolver la indecisión al elegir planes o restaurantes mediante una dinámica de juego ágil, libre de fricciones y con un alto componente sensorial y emocional.

### Pilares Fundamentales
- **Votación Secreta a Dos Turnos:** Cada miembro de la pareja vota o descarta opciones de forma privada. La app compara afinidades en tiempo real y revela el resultado ganador.
- **Duo Pass (Coleccionismo de Recuerdos):** Cada plan o restaurante visitado genera una entrada o acreditación física virtual 3D (*ephemera* / memorabilia) hiperrealista que se guarda en el Diario de Citas.
- **Experiencia Háptica y Sonora:** Microinteracciones con `Web Audio API` (efectos de sonido sintetizados sin dependencias externas) y `navigator.vibrate` en dispositivos móviles.
- **Estética Apple Liquid Glass:** Interfaz oscura (dark mode OLED), capas translúcidas tipo `visionOS` (`backdrop-blur-xl`, bordes `border-white/[0.1]`), tipografía cuidada y animaciones a 60 fps.

---

## 2. DuoPassEngine: Reglas de Oro y Arquitectura

El motor de pases vive en [`pass_engine.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/pass_engine.js) y se encuentra empaquetado en [`bundle.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/bundle.js).

### Reglas Críticas e Inquebrantables de Diseño
1. **ESTRICTAMENTE 0 EMOJIS:**
   - Queda totalmente prohibido el uso de caracteres emoji (ej. 🎟️, 🍿, ⚽, 🏆, ✨, etc.) en los pases.
   - Todo detalle visual debe implementarse mediante **vectores SVG artesanales** (`<svg ...>`), iconos puros de trazo o tipografía temática.
2. **SILUETAS FÍSICAS Y TROQUELADOS REALES:**
   - Los pases no deben ser tarjetas rectangulares genéricas con bordes redondeados estándar.
   - Cada pase debe lucir como un objeto físico tangible (*realia*):
     - Muescas circulares de desprendimiento en laterales (`clip-path` o círculos en mascarilla).
     - Esquinas biseladas en diagonal (*chamfered hangtags*).
     - Dorsales con imperdibles metálicos 3D SVG en las esquinas.
     - Cartuchos retro con estrías plásticas y pines dorados de contacto (PCB).
     - Ranuras superiores para cordón de acreditación (*lanyard*).
     - Pulseras de festival de tela cosidas en el lateral con cierre metálico.
3. **GIRO 3D SIN HUECOS NEGROS:**
   - La tarjeta utiliza `preserve-3d` con una cara frontal (`card-face`) y una trasera (`card-back`).
   - El reverso debe contener exactamente: `class="card-face card-back absolute inset-0 w-full h-full overflow-hidden ..."`.
   - Ambas caras deben compartir idéntica silueta, dimensiones y cortes físicos para que el volteo no deje márgenes oscuros ni asimetrías.
4. **TIPOGRAFÍAS TEMÁTICAS VINCULADAS:**
   - Cada pase utiliza su propia combinación de fuentes cargadas en Google Fonts:
     - `Cinzel`: Alta orfebrería, cartas de rol/TCG y pasaportes oficiales.
     - `Press Start 2P` y `VT323`: Videojuegos retro y cartuchos 16-bit.
     - `Space Grotesk` y `Montserrat`: Competición deportiva, dorsales y entradas de estadio.
     - `Cormorant Garamond` y `Courier Prime`: Cafeterías de especialidad, brunch y comandas.
     - `Playfair Display`: Tarjetas de resort, beach club y puestas de sol.
     - `JetBrains Mono`: Planillas técnicas, marcadores de pádel/tenis y tickets térmicos.

### Flujo de Asignación de Arquetipos (`detectArchetype`)
1. Limpia y normaliza el texto (minúsculas, sin tildes ni caracteres diacríticos).
2. Evalúa en cascada las palabras clave del título y la anécdota del plan.
3. **Orden de prioridad:** Comprueba actividades específicas con posibles colisiones primero (ej. `racket-club` para pádel/tenis antes de `stadium-ticket` para evitar que "partido de pádel" caiga en fútbol).
4. **Fallback:** Cualquier plan manual personalizado que no encaje en los arquetipos estándar se asigna al arquetipo procedural de lujo **`bespoke-signature`** (Black Obsidian Card con Guilloché de seguridad), nunca a un diseño genérico básico.

---

## 3. Estructura de Ficheros y Despliegue

| Fichero | Propósito |
| :--- | :--- |
| [`index.html`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/index.html) | Shell principal, importación de fuentes de Google Fonts y vinculación de `bundle.js?v=XX` y `style.css?v=XX`. |
| [`bundle.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/bundle.js) | Código unificado ejecutable sin herramientas de build. Contiene toda la lógica de la app, estado, sonidos, modal del diario y `DuoPassEngine`. |
| [`pass_engine.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/pass_engine.js) | Archivo fuente modular del generador y renderizador de pases. |
| [`style.css`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/style.css) | Clases de textura física, animaciones 3D, degradados y utilidades de troquelado. |
| [`sw.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/sw.js) | Service Worker para funcionamiento offline y cacheo de assets. |
| [`redesigned_passes_showcase.html`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/redesigned_passes_showcase.html) | Entorno visual de prueba aislado para auditar anverso y reverso de los pases en un clic. |

### Protocolo Obligatorio de Actualización y Cache-Busting
Siempre que se altere `bundle.js` o `style.css`:
1. Incrementar la versión de caché en [`index.html`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/index.html) tanto para `style.css?v=N` como para `bundle.js?v=N`.
2. Actualizar la constante `CACHE_NAME = 'donde-comemos-vN'` en [`sw.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/donde-comemos/sw.js).
3. **Cuidado con la codificación de caracteres:** Asegurar siempre que cualquier lectura y escritura de ficheros se realice en codificación **UTF-8 estricta** para evitar *mojibake* (ej. `Ã³`, `â€¢`).
