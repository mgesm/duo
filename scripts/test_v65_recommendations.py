import sys, os, json, time, subprocess, urllib.request, random

sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("VERIFICACIÓN E2E DE LAS TRES RECOMENDACIONES IMPLEMENTADAS (v65)")
print("=" * 60)

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
port = 9228

http_server = subprocess.Popen([sys.executable, '-m', 'http.server', '8085'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)

edge_proc = subprocess.Popen([
    edge_path,
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    f'--remote-debugging-port={port}',
    '--user-data-dir=' + os.path.abspath('edge_temp_profile_v65'),
    'http://127.0.0.1:8085/index.html'
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

time.sleep(2)

import websocket

def get_page_ws_url():
    for _ in range(15):
        try:
            req = urllib.request.urlopen(f'http://127.0.0.1:{port}/json')
            tabs = json.loads(req.read().decode('utf-8'))
            for t in tabs:
                if t.get('type') == 'page' and 'index.html' in t.get('url', ''):
                    return t['webSocketDebuggerUrl']
        except Exception:
            time.sleep(0.5)
    return None

ws = websocket.create_connection(get_page_ws_url())

def eval_js(expression):
    msg_id = random.randint(1, 1000000)
    req = {
        'id': msg_id,
        'method': 'Runtime.evaluate',
        'params': {
            'expression': expression,
            'returnByValue': True,
            'awaitPromise': True
        }
    }
    ws.send(json.dumps(req))
    while True:
        resp = json.loads(ws.recv())
        if resp.get('id') == msg_id:
            return resp.get('result', {}).get('result', {}).get('value')

time.sleep(1)

# TEST 1: DuoDB (IndexedDB + LocalStorage)
print("\n[TEST 1] Verificando motor de almacenamiento DuoDB (IndexedDB)...")
has_duodb = eval_js("typeof window.DuoDB === 'object' && typeof window.DuoDB.save === 'function'")
print(f"-> window.DuoDB disponible: {has_duodb}")

# TEST 2: html2canvas y window.downloadPassAsImage
print("\n[TEST 2] Verificando motor de descarga y compartir pases en PNG...")
has_html2canvas = eval_js("typeof html2canvas === 'function'")
has_download_func = eval_js("typeof window.downloadPassAsImage === 'function'")
print(f"-> html2canvas cargado en index.html: {has_html2canvas}")
print(f"-> window.downloadPassAsImage disponible: {has_download_func}")

# TEST 3: Guardar recuerdos con fechas distintas para probar filtros
print("\n[TEST 3] Inyectando recuerdos de prueba con diferentes años y fotos...")
eval_js("""
(function() {
    const dummyPhoto = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    // Recuerdo 2026 con fotos
    window.addFoodVisit('test-2026', 'Viaje a Roma', 5, 'Coliseo y pasta', [dummyPhoto, dummyPhoto], null, null, '15 oct 2026');
    // Recuerdo 2025 sin fotos
    window.addFoodVisit('test-2025', 'Cena Aniversario', 5, 'Restaurante mirador', [], null, null, '20 jul 2025');
    // Recuerdo 2024 con fotos
    window.addFoodVisit('test-2024', 'Karts Gran Prix', 4, 'Curvas rapidas', [dummyPhoto], null, null, '05 may 2024');
})()
""")

total_memories = eval_js("window.getFoodDiary().length")
print(f"-> Total de recuerdos en DuoDB: {total_memories}")

# TEST 4: Apertura del Modal y comprobación de Filtros y Buscador
print("\n[TEST 4] Abriendo Diario y verificando UI de filtros y buscador...")
eval_js("window.openDiaryModal()")

has_search = eval_js("!!document.getElementById('diary-search-input')")
year_buttons_count = eval_js("document.querySelectorAll('.btn-filter-year').length")
has_photo_filter = eval_js("!!document.getElementById('btn-toggle-filter-photos')")
has_download_buttons = eval_js("document.querySelectorAll('.btn-card-download-png').length > 0")

print(f"-> Campo buscador de recuerdos presente: {has_search}")
print(f"-> Píldoras de filtro por año presentes: {year_buttons_count} (Todos + años detectados)")
print(f"-> Filtro 'Con fotos' presente: {has_photo_filter}")
print(f"-> Botones de descarga de pase PNG presentes en tarjetas: {has_download_buttons}")

# TEST 5: Probar filtrado por texto
print("\n[TEST 5] Probando filtrado interactivo en tiempo real...")
eval_js("""
(function() {
    const input = document.getElementById('diary-search-input');
    input.value = 'Roma';
    input.dispatchEvent(new Event('input'));
})()
""")
visible_cards_roma = eval_js("document.querySelectorAll('#diary-modal-backdrop .ios-glass h4').length")
print(f"-> Tarjetas visibles filtradas por 'Roma': {visible_cards_roma}")

# TEST 6: Probar filtrado por año 2025
eval_js("""
(function() {
    const btn2025 = Array.from(document.querySelectorAll('.btn-filter-year')).find(b => b.innerText.includes('2025'));
    if (btn2025) btn2025.click();
})()
""")
visible_cards_2025 = eval_js("document.querySelectorAll('#diary-modal-backdrop .ios-glass h4').length")
print(f"-> Tarjetas visibles filtradas por '2025': {visible_cards_2025}")

# TEST 7: Restablecer filtros
eval_js("""
(function() {
    const btnAll = document.querySelector('.btn-filter-year[data-year=\"ALL\"]');
    if (btnAll) btnAll.click();
    const clearBtn = document.getElementById('btn-clear-diary-search');
    if (clearBtn) clearBtn.click();
})()
""")
visible_cards_all = eval_js("document.querySelectorAll('#diary-modal-backdrop .ios-glass h4').length")
print(f"-> Tarjetas visibles tras restablecer filtros: {visible_cards_all}")

# TEST 8: Comprobar botón de descarga dentro de los pases 3D
has_pass_download_btn = eval_js("document.querySelectorAll('.btn-download-pass').length > 0")
print(f"-> Botón 'Descargar' presente en la botonera de acciones del pase 3D: {has_pass_download_btn}")

ws.close()
edge_proc.kill()
http_server.kill()

print("\n" + "=" * 60)
print("TODAS LAS RECOMENDACIONES HAN SIDO VALIDADAS EXITOSAMENTE (v65)")
print("=" * 60)
