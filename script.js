const estados = ['bloqueado', 'disponible', 'aprobado', 'reprobado'];

const prerequisitos = {
  BIO131: ['BIO1123'],
  BIO129: ['BIO128'],
  FIS214: ['FIS1142'],
  KIN220: ['KIN140'],
  KIN236: ['BQA149'],
  KIN242: ['BIO128'],
  KIN248: ['BIO128'],
  KIN285: ['KIN220'],
  KIN262: ['KIN236'],
  KIN252: ['KIN242'],
  KIN247: ['KIN248'],
  KIN346: ['KIN220'],
  ING9002: ['ING9001'],
  ING9003: ['ING9002'],
  KIN330: ['KIN248'],
  KIN335: ['KIN242'],
  KIN343: ['KIN252'],
  KIN340: ['KIN252'],
  ING9004: ['ING9003'],
  KIN355: ['KIN285'],
  KIN364: ['KIN247'],
  KIN362: ['KIN252'],
  KIN367: ['KIN247'],
  ING9005: ['ING9004'],
  KIN440: ['KIN355'],
  KIN442: ['KIN355'],
  KIN446: ['KIN355'],
  ING9006: ['ING9005'],
  KIN543: ['KIN364'],
  KIN545: ['KIN442'],
  KIN546: ['KIN442'],
  KIN644: ['KIN546'],
  KIN645: ['KIN545'],
  KIN646: ['KIN545'],
  KIN745: ['KIN645'],
};

// Recuperar estados guardados o iniciar con bloqueado
let estadosAsignaturas = JSON.parse(localStorage.getItem('estadosAsignaturas')) || {};

// Verifica si todos los prerrequisitos están aprobados
function puedeHabilitar(codigo) {
  const pre = prerequisitos[codigo];
  if (!pre) return true;
  return pre.every(p => estadosAsignaturas[p] === 'aprobado');
}

// Actualiza la vista de los cursos
function actualizarVista() {
  document.querySelectorAll('.subject').forEach(el => {
    const code = el.dataset.code;
    let estado = estadosAsignaturas[code] || 'bloqueado';

    // Bloqueo automático si prerrequisitos no aprobados (salvo si está aprobado o reprobado)
    if (!puedeHabilitar(code) && estado !== 'aprobado' && estado !== 'reprobado') {
      estado = 'bloqueado';
      estadosAsignaturas[code] = 'bloqueado';
    }

    el.className = 'subject ' + estado;
    el.style.textDecoration = (estado === 'aprobado') ? 'line-through' : 'none';
  });

  localStorage.setItem('estadosAsignaturas', JSON.stringify(estadosAsignaturas));
}

// Inicializar vista
actualizarVista();

// Cambiar estado al hacer clic (en ciclo)
document.querySelectorAll('.subject').forEach(el => {
  el.addEventListener('click', () => {
    const code = el.dataset.code;
    let estadoActual = estadosAsignaturas[code] || 'bloqueado';
    let idx = estados.indexOf(estadoActual);
    idx = (idx + 1) % estados.length;
    estadosAsignaturas[code] = estados[idx];
    actualizarVista();
  });
});
