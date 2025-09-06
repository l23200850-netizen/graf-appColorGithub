// Referencias a sliders
const rojo = document.getElementById('rojo');
const verde = document.getElementById('verde');
const azul = document.getElementById('azul');

// Referencias a inputs numéricos
const rojoInput = document.getElementById('rojoInput');
const verdeInput = document.getElementById('verdeInput');
const azulInput = document.getElementById('azulInput');

// Color picker
const colorPicker = document.getElementById('colorPicker');

// Recuadro y códigos
const preview = document.getElementById('preview');
const hexCode = document.getElementById('hexCode');
const rgbCode = document.getElementById('rgbCode');
const copyBtn = document.getElementById('copyBtn');

// Función para actualizar el color desde sliders/inputs
function actualizarColor() {
  const r = parseInt(rojo.value);
  const g = parseInt(verde.value);
  const b = parseInt(azul.value);

  // Sincronizar inputs numéricos
  rojoInput.value = r;
  verdeInput.value = g;
  azulInput.value = b;

  // Color en formato rgb
  const colorRGB = `rgb(${r}, ${g}, ${b})`;

  // Convertir a hexadecimal
  const colorHex = "#" + 
    r.toString(16).padStart(2, '0') + 
    g.toString(16).padStart(2, '0') + 
    b.toString(16).padStart(2, '0');

  // Aplicar al recuadro
  preview.style.backgroundColor = colorRGB;
  hexCode.textContent = colorHex.toUpperCase();
  rgbCode.textContent = colorRGB;

  // Sincronizar colorPicker
  colorPicker.value = colorHex;
}

// Función para actualizar sliders desde inputs numéricos
function actualizarDesdeInput() {
  let r = Math.min(255, Math.max(0, parseInt(rojoInput.value) || 0));
  let g = Math.min(255, Math.max(0, parseInt(verdeInput.value) || 0));
  let b = Math.min(255, Math.max(0, parseInt(azulInput.value) || 0));

  rojo.value = r;
  verde.value = g;
  azul.value = b;

  actualizarColor();
}

// Función para actualizar desde color picker
function actualizarDesdePicker() {
  const hex = colorPicker.value;

  // Convertir hex a RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Actualizar sliders e inputs
  rojo.value = r;
  verde.value = g;
  azul.value = b;
  rojoInput.value = r;
  verdeInput.value = g;
  azulInput.value = b;

  actualizarColor();
}

// Copiar código HEX al portapapeles
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(hexCode.textContent).then(() => {
    copyBtn.textContent = "✅ Copiado!";
    setTimeout(() => copyBtn.textContent = "Copiar HEX", 2000);
  });
});

// Eventos sliders
[rojo, verde, azul].forEach(input => {
  input.addEventListener('input', actualizarColor);
});

// Eventos inputs numéricos
[rojoInput, verdeInput, azulInput].forEach(input => {
  input.addEventListener('input', actualizarDesdeInput);
});

// Evento color picker
colorPicker.addEventListener('input', actualizarDesdePicker);

// Inicializar
actualizarColor();
