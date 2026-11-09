function openDiaryModal(prefillName, prefillId, prefillSessionId) {

    let currentRating = 5;

    let currentPhotoBase64 = null;

    let isFormOpen = !!prefillName;

    let currentPreviewPass = null;



    function renderModalContent() {

      const currentVisits = getFoodDiary();

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

                <!-- Formulario A&ntilde;adir Recuerdo (Apple visionOS Card) -->

                <div class="ios-glass p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 space-y-3">

                  <div class="flex items-center justify-between pb-1 border-b border-white/10">

                    <span class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">

                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>

                      <span>Registrar Recuerdo & Generar Pase</span>

                    </span>

                    <button id="btn-cancel-add-memory" class="text-[11px] text-neutral-400 hover:text-neutral-200">Cancelar</button>

                  </div>



                  <div>

                    <label class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">T&iacute;tulo del Sitio o Plan</label>

                    <input 

                      id="diary-input-name" 

                      type="text" 

                      value="${escapeHtml(prefillName || '')}" 

                      placeholder="Ej: Karts, Goiko Grill, Acuario, Cine..." 

                      class="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/60"

                    />

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



                  <!-- Foto del Momento -->

                  <div>

                    <label class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Foto del recuerdo</label>

                    <input type="file" id="diary-photo-input" accept="image/*" class="hidden" />

                    ${currentPhotoBase64 ? `

                      <div class="relative w-full h-36 rounded-xl overflow-hidden border border-white/20">

                        <img src="${currentPhotoBase64}" class="w-full h-full object-cover" />

                        <button id="btn-remove-diary-photo" class="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-rose-300 hover:text-rose-100 border border-white/20">

                          Quitar foto

                        </button>

                      </div>

                    ` : `

                      <button 

                        type="button" 

                        id="btn-trigger-photo-upload" 

                        class="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-dashed border-white/20 text-xs font-medium text-neutral-300 flex items-center justify-center gap-2 active:scale-98 transition"

                      >

                        <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>

                        <span>Hacer o subir foto del momento</span>

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

                        <span id="live-archetype-badge" class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">

                          ${currentPreviewPass ? currentPreviewPass.archetypeLabel : 'Pase &Uacute;nico'}

                        </span>

                      </div>

                      <div id="diary-live-pass-preview"></div>

                    </div>

                  </div>



                  <button 

                    id="btn-save-memory" 

                    class="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-500 to-rose-500 shadow-lg shadow-rose-500/20 active:scale-98 transition flex items-center justify-center gap-2"

                  >

                    <span>Guardar Recuerdo en Duo</span>

                  </button>

                </div>

              `}



              <!-- Timeline de Recuerdos -->

              <div>

                <div class="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5 pl-1 flex items-center justify-between">

                  <span>Recuerdos Guardados (${currentVisits.length})</span>

                  <span class="text-[10px] text-indigo-400 font-semibold">Sincronizado en la nube</span>

                </div>



                ${currentVisits.length === 0 ? `

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

                ` : `

                  <div class="space-y-4">

                    ${currentVisits.map(function (v, idx) {

                      const pass = v.passData || DuoPassEngine.generatePassData(v);

                      return `

                        <div class="ios-glass p-3.5 rounded-2xl border border-white/10 space-y-2">

                          <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-white/[0.08]">

                            <div class="min-w-0">

                              <h4 class="font-extrabold text-white text-sm sm:text-base truncate">${escapeHtml(v.restaurantName || v.name || 'Plan de Pareja')}</h4>

                              <div class="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                                <span>${v.date || 'Reciente'}</span>
                                <span>&bull;</span>
                                <span class="text-amber-400 font-semibold inline-flex items-center gap-1">${v.rating || 5}/5 <svg class="w-3.5 h-3.5 fill-amber-400 inline" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                              </div>

                            </div>

                            <div class="flex items-center gap-2 shrink-0">

                              <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">

                                ${pass.archetypeLabel}

                              </span>

                              <button data-id="${v.id}" class="btn-delete-visit p-1 rounded-lg text-neutral-500 hover:text-rose-400 transition" title="Eliminar">

                                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>

                              </button>

                            </div>

                          </div>

                          <!-- Pase 3D Coleccionable debajo del t&iacute;tulo -->

                          ${DuoPassEngine.renderPassCard(pass, { compact: true, id: v.id, idx: idx })}

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

          sound.playPop();

          isFormOpen = false;

          currentPhotoBase64 = null;

          currentPreviewPass = null;

          renderModalContent();

        });

      }



      document.querySelectorAll('.btn-star-pick').forEach(function (btn) {

        btn.addEventListener('click', function () {

          currentRating = parseInt(btn.dataset.star, 10) || 5;

          sound.playPop();

          sound.vibrate([20]);

          document.querySelectorAll('.btn-star-pick').forEach(function (b) {

            const s = parseInt(b.dataset.star, 10);

            if (s <= currentRating) {

              b.className = 'btn-star-pick p-1 text-sm font-bold transition transform hover:scale-125 active:scale-95 text-amber-400';

            } else {

              b.className = 'btn-star-pick p-1 text-sm font-bold transition transform hover:scale-125 active:scale-95 text-neutral-600';

            }

          });

          const lbl = document.getElementById('star-rating-label');

          if (lbl) lbl.textContent = currentRating + '/5';

        });

      });



      const btnTriggerPhoto = document.getElementById('btn-trigger-photo-upload');

      const photoInput = document.getElementById('diary-photo-input');

      if (btnTriggerPhoto && photoInput) {

        btnTriggerPhoto.addEventListener('click', function () {

          photoInput.click();

        });

        photoInput.addEventListener('change', function (e) {

          const file = e.target.files && e.target.files[0];

          if (file) {

            compressImageFile(file, 640, 640, 0.65, function (dataUrl) {

              if (dataUrl) {

                currentPhotoBase64 = dataUrl;

                sound.playPop();

                renderModalContent();

              }

            });

          }

        });

      }



      const btnRemovePhoto = document.getElementById('btn-remove-diary-photo');

      if (btnRemovePhoto) {

        btnRemovePhoto.addEventListener('click', function () {

          currentPhotoBase64 = null;

          sound.playPop();

          renderModalContent();

        });

      }



      // Boton Generar y Previsualizar Pase Unico Bajo Demanda

      const btnGenPass = document.getElementById('btn-generate-diary-pass');

      if (btnGenPass) {

        btnGenPass.addEventListener('click', function () {

          const inputName = document.getElementById('diary-input-name');

          const inputNote = document.getElementById('diary-input-note');

          const previewContainer = document.getElementById('diary-live-pass-preview');

          const previewWrap = document.getElementById('diary-preview-container');

          const badge = document.getElementById('live-archetype-badge');

          const nameVal = inputName ? inputName.value.trim() : '';

          const noteVal = inputNote ? inputNote.value.trim() : '';



          if (!nameVal) {

            sound.vibrate([50, 50]);

            showToast('Escribe primero el t&iacute;tulo o plan para analizarlo');

            if (inputName) inputName.focus();

            return;

          }



          sound.playPop();

          sound.vibrate([30]);



          currentPreviewPass = DuoPassEngine.generatePassData({

            id: prefillId || ('item-' + Date.now()),

            name: nameVal,

            note: noteVal,

            rating: currentRating,

            photo: currentPhotoBase64,

            mode: state.activeMode,

            p1Name: state.player1Name,

            p2Name: state.player2Name,

            date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

          });



          if (previewWrap) previewWrap.classList.remove('hidden');

          if (badge) badge.innerText = currentPreviewPass.archetypeLabel || 'Pase Único';

          if (previewContainer) {

            previewContainer.innerHTML = DuoPassEngine.renderPassCard(currentPreviewPass, { compact: true, hideActions: true, id: 'diary-preview-pass' });

            DuoPassEngine.bindCardInteractions(previewContainer);

          }

          showToast('Pase ' + currentPreviewPass.archetypeLabel + ' generado');

        });

      }



      // Si ya existia un pase previsualizado, renderizarlo

      if (currentPreviewPass) {

        const previewWrap = document.getElementById('diary-preview-container');

        const previewContainer = document.getElementById('diary-live-pass-preview');

        if (previewWrap) previewWrap.classList.remove('hidden');

        if (previewContainer) {

          previewContainer.innerHTML = DuoPassEngine.renderPassCard(currentPreviewPass, { compact: true, hideActions: true, id: 'diary-preview-pass' });

          DuoPassEngine.bindCardInteractions(previewContainer);

        }

      }



      const btnSaveMemory = document.getElementById('btn-save-memory');

      if (btnSaveMemory) {

        btnSaveMemory.addEventListener('click', function () {

          const inputName = document.getElementById('diary-input-name');

          const inputNote = document.getElementById('diary-input-note');

          const nameVal = inputName ? inputName.value.trim() : '';

          const noteVal = inputNote ? inputNote.value.trim() : '';



          if (!nameVal) {

            sound.vibrate([50, 50]);

            showToast('Escribe el nombre del sitio o plan');

            return;

          }



          const generated = currentPreviewPass || DuoPassEngine.generatePassData({

            id: prefillId || ('item-' + Date.now()),

            name: nameVal,

            note: noteVal,

            rating: currentRating,

            photo: currentPhotoBase64,

            mode: state.activeMode,

            p1Name: state.player1Name,

            p2Name: state.player2Name,

            date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

          });



          addFoodVisit(prefillId || ('item-' + Date.now()), nameVal, currentRating, noteVal, currentPhotoBase64, prefillSessionId, generated);

          sound.playFanfare();

          sound.vibrate([40, 40]);

          showToast('&iexcl;Recuerdo guardado en el Diario!');

          isFormOpen = false;

          currentPhotoBase64 = null;

          currentPreviewPass = null;

          renderModalContent();

        });

      }



      // Vincular interacciones 3D en el timeline y resto de tarjetas

      DuoPassEngine.bindCardInteractions(modalContainer);



      document.querySelectorAll('.btn-delete-visit').forEach(function (btn) {

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



  // ==========================================

  // 13. MODAL DE WISHLIST COMPARTIDA (BUCKET LIST)

  // ==========================================
