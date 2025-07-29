const estados = ['bloqueado', 'cursando', 'aprobado', 'reprobado'];

// Prerrequisitos (puedes agregar más según tu malla)
const prerequisitos = {
  'KIN285': ['KIN220'],
  'KIN262': ['KIN236'],
  'KIN252': ['KIN242'],
  'KIN247': ['KIN248'],
  'ING9002': ['ING9001'],
  'ING9003': ['ING9002'],
};

// Estado inicial guardado en localStorage o por defecto
let estadosAsignaturas = JSON.parse(localStorage.getItem('estadosAsignaturas')) || {
  'BIO1123': 'aprobado',
  'FIS1142': 'aprobado',
  'BIO128': 'aprobado',
  'BQA149': 'aprobado',
  'KIN140': 'aprobado',
  'ICR010': 'aprobado',

  'BIO131': 'aprobado',
  'FIS214': 'aprobado',
  'BIO129': 'aprobado',
  'KIN150': 'aprobado',
  'ING9001': 'aprobado',
  'FormacionFundamental1': 'aprobado',

  'KIN220': 'aprobado',
  'KIN236': 'aprobado',
  'KIN242': 'aprobado',
  'KIN248': 'aprobado',
  'ING9002': 'cursando',

  'KIN285': 'bloqueado',
  'KIN262': 'bloqueado',
  'KIN252': 'bloqueado',
  'KIN247': 'bloqueado',
  'KIN346': 'bloqueado',
  'ING9003': 'bloqueado',
};

function puedeHabilitar(codigo) {
  const pre = prerequisitos[codigo];
  if (!pre) return true;
  return pre.every(p => estadosAsignaturas[p] === 'aprobado');
}

function actualizarVista() {
  document.querySelectorAll('.subject').forEach(el => {
    const code = el.dataset.code;
    let estado = estadosAsignaturas[code] || 'bloqueado';

    if (!puedeHabilitar(code) && estado !== 'aprobado' && estado !== 'reprobado') {
      estado = 'bloqueado';
      estadosAsignaturas[code] = 'bloqueado';
    }

    el.className = 'subject ' + estado;
    el.style.textDecoration = (estado === 'aprobado') ? 'line-through' : 'none';
    el.style.cursor = (estado === 'bloqueado') ? 'not-allowed' : 'pointer';
  });
}

actualizarVista();

document.querySelectorAll('.subject').forEach(el => {
  el.addEventListener('click', () => {
    const code = el.dataset.code;

    if (estadosAsignaturas[code] === 'bloqueado') return;

    let idx = estados.indexOf(estadosAsignaturas[code]);
    idx = (idx + 1) % estados.length;
    estadosAsignaturas[code] = estados[idx];

    actualizarVista();
    localStorage.setItem('estadosAsignaturas', JSON.stringify(estadosAsignaturas));
  });
});

