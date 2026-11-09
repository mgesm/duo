  function openDiaryModal(prefillName, prefillId, prefillSessionId) {

    let currentRating = 5;

    let currentPhotosBase64 = [];

    let isFormOpen = !!prefillName;

    let currentPreviewPass = null;

    // Selector de fecha nativo (ISO YYYY-MM-DD por defecto hoy)
    const todayIso = new Date().toISOString().split('T')[0];
    let selectedDateIso = todayIso;

    // Estados reactivos de filtrado y búsqueda
    let diarySearchQuery = '';
    let diaryFilterYear = 'ALL';
    let diaryOnlyWithPhotos = false;

    function formatIsoDateToEs(isoStr) {
      if (!isoStr) return new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
      try {
        const parts = isoStr.split('-');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
        }
      } catch (e) {}
      return isoStr;
    }

    function renderModalContent() {

      const allVisits = getFoodDiary();

      // Extraer años únicos presentes en los recuerdos
      const availableYears = [];
      allVisits.forEach(function (v) {
        if (v.date) {
          const m = v.date.match(/\b(20\d\d)\b/);
          if (m && !availableYears.includes(m[1])) {
            availableYears.push(m[1]);
          }
        }
      });
      availableYears.sort().reverse();

      // Filtrado interactivo
      const filteredVisits = allVisits.filter(function (v) {
        if (diaryOnlyWithPhotos) {
          const hasPh = (Array.isArray(v.photos) && v.photos.length > 0) || !!v.photo;
          if (!hasPh) return false;
        }
        if (diaryFilterYear !== 'ALL') {
          if (!v.date || !v.date.includes(diaryFilterYear)) return false;
        }
        if (diarySearchQuery && diarySearchQuery.trim().length > 0) {
          const q = diarySearchQuery.toLowerCase().trim();
          const str = ((v.restaurantName || '') + ' ' + (v.note || '') + ' ' + (v.date || '') + ' ' + (v.passData && v.passData.archetypeLabel || '')).toLowerCase();
          if (!str.includes(q)) return false;
        }
        return true;
      });

      modalContainer.innerHTML = `

        <div id="diary-modal-backdrop" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4">

          <div class="bg-neutral-950 border-t sm:border border-white/[0.12] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">

            <div class="w-10 h-1 bg-white/25 rounded-full mx-auto my-3 sm:hidden"></div>



            <!-- Modal Header -->

            <div class="px-5 py-3 flex items-center justify-between border-b border-white/[0.08]">

              <div class="flex items-center gap-2.5">

                <div class="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">

                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>

                  </svg>

                </div>

                <div>

                  <h3 class="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">

                    <span>Diario de Citas & Recuerdos</span>

                  </h3>

                  <div class="text-[10px] text-neutral-400">Vuestros momentos, fotos y pases coleccionables</div>

                </div>

              </div>

              <button id="btn-close-diary" class="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 hover:text-white flex items-center justify-center font-bold text-xs transition">

                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

              </button>

            </div>



            <!-- Scrollable Body -->

            <div class="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">

              <!-- Boton desplegar formulario de nuevo recuerdo -->

              ${!isFormOpen ? `

                <button 

                  id="btn-toggle-add-memory" 

                  class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-rose-500/20 to-amber-500/20 border border-indigo-500/30 hover:border-indigo-500/50 text-xs font-bold text-white flex items-center justify-center gap-2 active:scale-98 transition shadow-sm"

                >

                  <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>

                  <span>A&ntilde;adir nuevo recuerdo de cita</span>

                </button>

              ` : `

                <!-- Formulario Añadir Recuerdo (Apple visionOS Card) -->

                <div class="ios-glass p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 space-y-3">

                  <div class="flex items-center justify-between pb-1 border-b border-white/10">

                    <span class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">

                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>

                      <span>Registrar Recuerdo &amp; Generar Pase</span>

                    </span>

                    <button id="btn-cancel-add-memory" class="text-[11px] text-neutral-400 hover:text-neutral-200">Cancelar</button>

                  </div>



                  <div>

                    <label class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">T&iacute;tulo del Sitio o Plan</label>

                    <input 

                      id="diary-input-name" 

                      type="text" 

                      value="${escapeHtml(prefillName || '')}" 

                      placeholder="Ej: Karts, Padel, Concierto, Goiko Grill, Cine..." 

                      class="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/60"

                    />

                  </div>

                  <!-- Selector de Fecha Nativo (Editable) -->
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <label class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Fecha del Recuerdo</label>
                      <span class="text-[10px] text-indigo-400 font-semibold" id="diary-date-preview-badge">${formatIsoDateToEs(selectedDateIso)}</span>
                    </div>
                    <div class="relative">
                      <input 
                        id="diary-input-date" 
                        type="date" 
                        value="${selectedDateIso}" 
                        class="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500/60 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <!-- Selector de Estrellas 1-5 -->

                  <div>

                    <label class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Valoraci&oacute;n en pareja</label>

                    <div class="flex items-center gap-2" id="diary-star-picker">

                      ${[1, 2, 3, 4, 5].map(function (s) {

                        const isFilled = s <= currentRating;

                        return `

                          <button type="button" data-star="${s}" class="btn-star-pick p-1 transition transform hover:scale-125 active:scale-95 ${isFilled ? 'text-amber-400' : 'text-neutral-600'}">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                          </button>

                        `;

                      }).join('')}

                      <span class="text-xs font-bold text-amber-400 ml-2" id="star-rating-label">${currentRating}/5</span>

                    </div>

                  </div>



                  <!-- Nota / Experiencia -->

                  <div>

                    <label class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Descripci&oacute;n o an&eacute;cdota del plan</label>

                    <textarea 

                      id="diary-input-note" 

                      rows="2" 

                      placeholder="Ej: Nos picamos en las curvas y casi hacemos trompo..." 

                      class="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/60 resize-none"

                    ></textarea>

                  </div>



                  <!-- Fotos del Momento (Multi-foto hasta 5 imagenes) -->

                  <div>

                    <div class="flex items-center justify-between mb-1">
                      <label class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Fotos del recuerdo (${currentPhotosBase64.length}/5)</label>
                      ${currentPhotosBase64.length > 0 ? `<span class="text-[10px] text-neutral-500">Toca &times; para quitar</span>` : ''}
                    </div>

                    <input type="file" id="diary-photo-input" accept="image/*" multiple class="hidden" />

                    <!-- Miniaturas de fotos cargadas -->
                    ${currentPhotosBase64.length > 0 ? `
                      <div class="grid grid-cols-3 gap-2 mb-2">
                        ${currentPhotosBase64.map(function(photoUrl, pIdx) {
                          return `
                            <div class="relative h-24 rounded-xl overflow-hidden border border-white/20 group">
                              <img src="${photoUrl}" class="w-full h-full object-cover" />
                              <button type="button" data-photo-idx="${pIdx}" class="btn-remove-single-photo absolute top-1 right-1 w-6 h-6 rounded-full bg-black/80 text-rose-300 hover:text-white flex items-center justify-center text-xs font-bold border border-white/20 active:scale-90 transition">
                                &times;
                              </button>
                              <span class="absolute bottom-1 left-1 px-1 rounded bg-black/60 text-[8px] font-mono text-white">#${pIdx + 1}</span>
                            </div>
                          `;
                        }).join('')}
                        ${currentPhotosBase64.length < 5 ? `
                          <button 
                            type="button" 
                            id="btn-trigger-photo-upload-more" 
                            class="h-24 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-dashed border-white/20 text-xs font-medium text-neutral-300 flex flex-col items-center justify-center gap-1 active:scale-95 transition"
                          >
                            <svg class="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16m8-8H4"/></svg>
                            <span class="text-[10px]">A&ntilde;adir foto</span>
                          </button>
                        ` : ''}
                      </div>
                    ` : `

                      <button 

                        type="button" 

                        id="btn-trigger-photo-upload" 

                        class="w-full py-3 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-dashed border-white/20 text-xs font-medium text-neutral-300 flex items-center justify-center gap-2 active:scale-98 transition"

                      >

                        <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>

                        <span>Hacer o subir fotos del momento (hasta 5)</span>

                      </button>

                    `}

                  </div>



                  <!-- Boton de Generacion Bajo Demanda de Pase Unico -->

                  <div class="pt-2 border-t border-white/10 space-y-2">

                    <button 

                      type="button" 

                      id="btn-generate-diary-pass" 

                      class="w-full py-2.5 px-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-xs font-bold text-indigo-200 flex items-center justify-center gap-2 active:scale-98 transition"

                    >

                      <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>

                      <span>Generar y Previsualizar Pase &Uacute;nico</span>

                    </button>



                    <div id="diary-preview-container" class="${currentPreviewPass ? '' : 'hidden'} transition-all duration-300">

                      <div class="flex items-center justify-between mb-1.5 px-0.5">

                        <span class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">

                          <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>

                          <span>Pase Generado</span>

                        </span>

                        <span class="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full" id="diary-preview-badge">

                          ${currentPreviewPass ? (currentPreviewPass.archetypeLabel || 'Bespoke') : ''}

                        </span>

                      </div>

                      <div id="diary-preview-render-slot">

                        ${currentPreviewPass ? DuoPassEngine.renderPassCard(currentPreviewPass, { isPreview: true, compact: true }) : ''}

                      </div>

                    </div>

                  </div>



                  <!-- Boton de Guardar Recuerdo -->

                  <button 

                    id="btn-save-diary-entry" 

                    class="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition"

                  >

                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>

                    <span>Guardar Recuerdo en Duo</span>

                  </button>

                </div>

              `}



              <!-- Historial de Recuerdos / Timeline -->

              <div>

                <div class="px-1 mb-2 flex items-center justify-between text-[11px] font-bold text-neutral-400 uppercase tracking-wider">

                  <span>Recuerdos Guardados (${filteredVisits.length}${allVisits.length !== filteredVisits.length ? ` de ${allVisits.length}` : ''})</span>

                  <span class="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <svg class="w-3 h-3 text-emerald-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    <span>Storage Seguro</span>
                  </span>

                </div>

                ${allVisits.length > 0 ? `
                  <!-- Barra de Búsqueda y Filtros por Año / Fotos -->
                  <div class="space-y-2 mb-3 bg-white/[0.03] p-2.5 rounded-2xl border border-white/[0.08]">
                    <!-- Buscador en tiempo real -->
                    <div class="relative">
                      <input 
                        id="diary-search-input" 
                        type="text" 
                        value="${escapeHtml(diarySearchQuery)}" 
                        placeholder="Buscar por lugar, plan, notas o fecha..." 
                        class="w-full bg-white/[0.06] border border-white/10 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 transition"
                      />
                      <svg class="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                      ${diarySearchQuery ? `
                        <button id="btn-clear-diary-search" class="absolute right-2 top-1.5 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center text-xs font-bold transition">&times;</button>
                      ` : ''}
                    </div>

                    <!-- Píldoras de Filtro Rápido (Años + Con Fotos) -->
                    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[10px]">
                      <button type="button" data-year="ALL" class="btn-filter-year shrink-0 px-2.5 py-1 rounded-lg font-medium transition ${diaryFilterYear === 'ALL' && !diaryOnlyWithPhotos ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40' : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]'}">
                        Todos (${allVisits.length})
                      </button>
                      ${availableYears.map(function(yr) {
                        const isSel = diaryFilterYear === yr;
                        const countYr = allVisits.filter(function(v) { return v.date && v.date.includes(yr); }).length;
                        return `
                          <button type="button" data-year="${yr}" class="btn-filter-year shrink-0 px-2.5 py-1 rounded-lg font-medium transition ${isSel ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40' : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]'}">
                            ${yr} (${countYr})
                          </button>
                        `;
                      }).join('')}
                      <button type="button" id="btn-toggle-filter-photos" class="shrink-0 px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${diaryOnlyWithPhotos ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40' : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.08]'}">
                        <svg class="w-3 h-3 text-amber-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span>Con fotos (${allVisits.filter(function(v) { return (Array.isArray(v.photos) && v.photos.length > 0) || !!v.photo; }).length})</span>
                      </button>
                    </div>
                  </div>
                ` : ''}

                ${allVisits.length === 0 ? `

                  <div class="p-8 text-center text-xs text-neutral-500 border border-white/[0.06] rounded-2xl ios-glass">

                    <div class="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-neutral-400 mx-auto mb-2.5 flex items-center justify-center">

                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">

                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>

                        <circle cx="12" cy="13" r="4"></circle>

                      </svg>

                    </div>

                    <div class="text-neutral-300 font-semibold mb-1">A&uacute;n no ten&eacute;is recuerdos guardados</div>

                    <div>A&ntilde;adid vuestro primer momento arriba o guardadlo autom&aacute;ticamente al finalizar una votaci&oacute;n.</div>

                  </div>

                ` : filteredVisits.length === 0 ? `

                  <div class="p-8 text-center text-xs text-neutral-400 border border-white/[0.06] rounded-2xl ios-glass space-y-2">
                    <div class="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-neutral-400 mx-auto flex items-center justify-center">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <div class="text-neutral-200 font-semibold">No se encontraron recuerdos con estos filtros</div>
                    <div class="text-neutral-500 text-[11px]">Prueba con otra b&uacute;squeda o restablece los filtros activos.</div>
                    <button id="btn-reset-diary-filters" class="mt-2 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition active:scale-95">
                      Restablecer filtros
                    </button>
                  </div>

                ` : `

                  <div class="space-y-4">

                    ${filteredVisits.map(function (v, idx) {

                      const pass = v.passData || DuoPassEngine.generatePassData(v);
                      const photosList = Array.isArray(v.photos) && v.photos.length > 0 
                        ? v.photos 
                        : (v.photo ? [v.photo] : []);
                      const cardId = `diary-card-${v.id || idx}`;

                      return `

                        <div class="ios-glass p-3.5 rounded-2xl border border-white/10 space-y-2" id="diary-visit-card-${v.id}">

                          <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-white/[0.08]">

                            <div class="min-w-0">

                              <h4 class="font-extrabold text-white text-sm sm:text-base truncate">${escapeHtml(v.restaurantName || v.name || 'Plan de Pareja')}</h4>

                              <div class="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                                <span>${v.date || 'Reciente'}</span>
                                <span>&bull;</span>
                                <span class="text-amber-400 font-semibold inline-flex items-center gap-1">${v.rating || 5}/5 <svg class="w-3.5 h-3.5 fill-amber-400 inline" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                                ${photosList.length > 0 ? `<span>&bull;</span> <span class="text-indigo-300 flex items-center gap-0.5"><svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> ${photosList.length}</span>` : ''}
                              </div>

                            </div>

                            <div class="flex items-center gap-1.5 shrink-0">

                              <button data-card-id="${cardId}" data-pass-title="${escapeHtml(v.restaurantName || v.name || 'Pase Duo')}" class="btn-card-download-png p-1.5 rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-white/[0.08] transition" title="Descargar Pase en PNG">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                              </button>

                              <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">

                                ${pass.archetypeLabel}

                              </span>

                              <button data-id="${v.id}" class="btn-delete-visit p-1 rounded-lg text-neutral-500 hover:text-rose-400 transition" title="Eliminar">

                                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>

                              </button>

                            </div>

                          </div>

                          <!-- Galería Carrusel Horizontal de Fotos en la Tarjeta -->
                          ${photosList.length > 0 ? `
                            <div class="flex gap-2 overflow-x-auto no-scrollbar py-1 snap-x snap-mandatory">
                              ${photosList.map(function(photoUrl, pIdx) {
                                return `
                                  <div 
                                    class="shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-white/15 snap-start cursor-pointer hover:border-indigo-400 transition relative group"
                                    onclick="if(window.DuoLightbox) window.DuoLightbox.open('${photoUrl}')"
                                  >
                                    <img src="${photoUrl}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
                                    </div>
                                  </div>
                                `;
                              }).join('')}
                            </div>
                          ` : ''}

                          <!-- Pase 3D Coleccionable debajo del título -->

                          ${DuoPassEngine.renderPassCard(pass, { compact: true, id: cardId, idx: idx })}

                        </div>

                      `;

                    }).join('')}

                  </div>

                `}

              </div>

            </div>

          </div>

        </div>

      `;



      // Event listeners del modal

      document.getElementById('btn-close-diary').addEventListener('click', function () {

        modalContainer.innerHTML = '';

      });



      const btnToggleAdd = document.getElementById('btn-toggle-add-memory');

      if (btnToggleAdd) {

        btnToggleAdd.addEventListener('click', function () {

          sound.playPop();

          isFormOpen = true;

          renderModalContent();

        });

      }



      const btnCancelAdd = document.getElementById('btn-cancel-add-memory');

      if (btnCancelAdd) {

        btnCancelAdd.addEventListener('click', function () {

          isFormOpen = false;

          currentPhotosBase64 = [];

          currentPreviewPass = null;

          renderModalContent();

        });

      }



      // Listeners de Fecha editable
      const dateInput = document.getElementById('diary-input-date');
      if (dateInput) {
        dateInput.addEventListener('change', function(e) {
          selectedDateIso = e.target.value;
          const badge = document.getElementById('diary-date-preview-badge');
          if (badge) badge.innerText = formatIsoDateToEs(selectedDateIso);
        });
      }

      // Listeners de estrellas

      modalContainer.querySelectorAll('.btn-star-pick').forEach(function (btn) {

        btn.addEventListener('click', function () {

          const star = parseInt(btn.dataset.star, 10);

          currentRating = star;

          sound.playPop();

          modalContainer.querySelectorAll('.btn-star-pick').forEach(function (b) {

            const s = parseInt(b.dataset.star, 10);

            if (s <= currentRating) {

              b.classList.remove('text-neutral-600');

              b.classList.add('text-amber-400');

            } else {

              b.classList.remove('text-amber-400');

              b.classList.add('text-neutral-600');

            }

          });

          const lbl = document.getElementById('star-rating-label');

          if (lbl) lbl.textContent = currentRating + '/5';

        });

      });



      // Listeners de Fotos (Múltiples fotos con FileList y compresión)

      const photoInput = document.getElementById('diary-photo-input');

      const triggerUploadBtn = document.getElementById('btn-trigger-photo-upload');

      const triggerUploadMoreBtn = document.getElementById('btn-trigger-photo-upload-more');

      if (triggerUploadBtn && photoInput) {

        triggerUploadBtn.addEventListener('click', function () {

          photoInput.click();

        });

      }

      if (triggerUploadMoreBtn && photoInput) {

        triggerUploadMoreBtn.addEventListener('click', function () {

          photoInput.click();

        });

      }



      if (photoInput) {

        photoInput.addEventListener('change', function (e) {

          const files = e.target.files;

          if (!files || files.length === 0) return;

          showToast('Procesando foto(s)...');

          const remainingSlots = 5 - currentPhotosBase64.length;
          const filesToProcess = Array.from(files).slice(0, remainingSlots);

          let processed = 0;
          filesToProcess.forEach(function(file) {
            compressImageFile(file, function (base64) {
              if (base64 && currentPhotosBase64.length < 5) {
                currentPhotosBase64.push(base64);
              }
              processed++;
              if (processed === filesToProcess.length) {
                renderModalContent();
              }
            });
          });

        });

      }

      // Eliminar foto individual
      modalContainer.querySelectorAll('.btn-remove-single-photo').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const idxToRemove = parseInt(btn.getAttribute('data-photo-idx'), 10);
          if (!isNaN(idxToRemove)) {
            currentPhotosBase64.splice(idxToRemove, 1);
            renderModalContent();
          }
        });
      });



      // Boton Generar y Previsualizar Pase Unico

      const btnGenPass = document.getElementById('btn-generate-diary-pass');

      if (btnGenPass) {

        btnGenPass.addEventListener('click', function () {

          const nameVal = (document.getElementById('diary-input-name').value || '').trim();

          if (!nameVal) {

            showToast('Escribe primero el t&iacute;tulo del plan para generar el pase');

            return;

          }

          const noteVal = (document.getElementById('diary-input-note').value || '').trim();

          const chosenDateFormatted = formatIsoDateToEs(selectedDateIso);

          currentPreviewPass = DuoPassEngine.generatePassData({

            id: 'preview-' + Date.now(),

            name: nameVal,

            rating: currentRating,

            note: noteVal,

            photo: currentPhotosBase64.length > 0 ? currentPhotosBase64[0] : null,

            photos: currentPhotosBase64,

            mode: state.activeMode,

            p1Name: state.player1Name,

            p2Name: state.player2Name,

            date: chosenDateFormatted

          });



          sound.playPop();

          const previewContainer = document.getElementById('diary-preview-container');

          const previewSlot = document.getElementById('diary-preview-render-slot');

          const previewBadge = document.getElementById('diary-preview-badge');

          if (previewContainer && previewSlot) {

            previewSlot.innerHTML = DuoPassEngine.renderPassCard(currentPreviewPass, { isPreview: true, compact: true });

            if (previewBadge) previewBadge.textContent = currentPreviewPass.archetypeLabel || 'Bespoke';

            previewContainer.classList.remove('hidden');

            DuoPassEngine.bindCardInteractions(previewSlot);

          }

        });

      }



      // Boton Guardar Recuerdo

      const btnSaveEntry = document.getElementById('btn-save-diary-entry');

      if (btnSaveEntry) {

        btnSaveEntry.addEventListener('click', function () {

          const nameVal = (document.getElementById('diary-input-name').value || '').trim();

          if (!nameVal) {

            showToast('&iexcl;Escribe el t&iacute;tulo del plan o restaurante!');

            return;

          }

          const noteVal = (document.getElementById('diary-input-note').value || '').trim();

          const chosenDateFormatted = formatIsoDateToEs(selectedDateIso);

          const generated = currentPreviewPass || DuoPassEngine.generatePassData({

            id: prefillId || ('item-' + Date.now()),

            name: nameVal,

            rating: currentRating,

            note: noteVal,

            photo: currentPhotosBase64.length > 0 ? currentPhotosBase64[0] : null,

            photos: currentPhotosBase64,

            mode: state.activeMode,

            p1Name: state.player1Name,

            p2Name: state.player2Name,

            date: chosenDateFormatted

          });



          addFoodVisit(prefillId || ('item-' + Date.now()), nameVal, currentRating, noteVal, currentPhotosBase64, prefillSessionId, generated, chosenDateFormatted);

          sound.playFanfare();

          sound.vibrate([40, 40]);

          showToast('&iexcl;Recuerdo guardado en el Diario!');

          isFormOpen = false;

          currentPhotosBase64 = [];

          currentPreviewPass = null;

          renderModalContent();

        });

      }



      // Vincular interacciones 3D en el timeline y resto de tarjetas

      DuoPassEngine.bindCardInteractions(modalContainer);



      // Listeners de descarga de pases en PNG desde la tarjeta del timeline
      modalContainer.querySelectorAll('.btn-card-download-png').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          const targetCardId = btn.getAttribute('data-card-id');
          const title = btn.getAttribute('data-pass-title') || 'Pase Duo';
          if (window.downloadPassAsImage) {
            window.downloadPassAsImage(targetCardId, title);
          }
        });
      });

      // Listeners del Buscador y Filtros
      const searchInput = document.getElementById('diary-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', function (e) {
          diarySearchQuery = e.target.value;
          renderModalContent();
          const updatedInput = document.getElementById('diary-search-input');
          if (updatedInput) {
            updatedInput.focus();
            const len = updatedInput.value.length;
            updatedInput.setSelectionRange(len, len);
          }
        });
      }

      const btnClearSearch = document.getElementById('btn-clear-diary-search');
      if (btnClearSearch) {
        btnClearSearch.addEventListener('click', function () {
          diarySearchQuery = '';
          renderModalContent();
        });
      }

      modalContainer.querySelectorAll('.btn-filter-year').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const yr = btn.getAttribute('data-year');
          diaryFilterYear = yr;
          sound.playPop();
          renderModalContent();
        });
      });

      const btnTogglePhotos = document.getElementById('btn-toggle-filter-photos');
      if (btnTogglePhotos) {
        btnTogglePhotos.addEventListener('click', function () {
          diaryOnlyWithPhotos = !diaryOnlyWithPhotos;
          sound.playPop();
          renderModalContent();
        });
      }

      const btnResetFilters = document.getElementById('btn-reset-diary-filters');
      if (btnResetFilters) {
        btnResetFilters.addEventListener('click', function () {
          diarySearchQuery = '';
          diaryFilterYear = 'ALL';
          diaryOnlyWithPhotos = false;
          sound.playPop();
          renderModalContent();
        });
      }

      modalContainer.querySelectorAll('.btn-delete-visit').forEach(function (btn) {

        btn.addEventListener('click', function () {

          const id = btn.dataset.id;

          removeFoodVisit(id);

          sound.playPop();

          sound.vibrate([30]);

          showToast('Recuerdo eliminado');

          renderModalContent();

        });

      });

    }



    renderModalContent();

  }