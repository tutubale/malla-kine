const estados = ['bloqueado', 'cursando', 'aprobado', 'reprobado'];

// Prerrequisitos, los más evidentes sacados de la malla (ajustar si quieres)
const prerequisitos = {
  // Ejemplos:
  'BIO131': ['BIO1123'], // Biología Celular requiere Biología General
  'BIO129': ['BIO128'],  // Anatomía Humana 2 requiere Anatomía Humana 1
  'FIS214': ['FIS1142'], // Biofísica requiere Física
  'KIN220': ['KIN140'],  // Traumatología y Ortopedia Adultos requiere Introducción a la Kinesiología
  'KIN236': ['BQA149'],  // Fisiología de Sistemas requiere Bioquímica
  'KIN242': ['BIO128'],  // Biomecánica 1 requiere Anatomía Humana 1
  'KIN248': ['BIO128'],  // Neurofisiología requiere Anatomía Humana 1
  'KIN285': ['KIN220'],  // Traumatología y Ortopedia Infanto-Juvenil requiere Traumatología Adultos
  'KIN262': ['KIN236'],  // Fisiopatología 1 requiere Fisiología de Sistemas
  'KIN252': ['KIN242'],  // Biomecánica 2 requiere Biomecánica 1
  'KIN247': ['KIN248'],  // Neuropsicología requiere Neurofisiología
  'KIN346': ['KIN220'],  // Enfermería y Primeros Auxilios requiere Traumatología y Ortopedia Adultos
  'ING9002': ['ING9001'], // Inglés 2 requiere Inglés 1
  'ING9003': ['ING9002'], // Inglés 3 requiere Inglés 2
  'KIN330': ['KIN248'],  // Kinesiología Respiratoria y Cardiovascular requiere Neurofisiología
  'KIN335': ['KIN242'],  // Electroterapia requiere Biomecánica 1
  'KIN343': ['KIN252'],  // Biomecánica 3 requiere Biomecánica 2
  'KIN340': ['KIN252'],  // Terapia Manual requiere Biomecánica 2
  'ING9004': ['ING9003'], // Inglés 4 requiere Inglés 3
  'KIN355': ['KIN285'],  // Kinesiología del Adulto Mayor requiere Traumatología Infanto-Juvenil
  'KIN364': ['KIN247'],  // Kinesiología Neurológica 1 requiere Neuropsicología
  'KIN362': ['KIN252'],  // Kinesiología Deportiva requiere Biomecánica 2
  'KIN367': ['KIN247'],  // Kinesiología Pediátrica requiere Neuropsicología
  'ING9005': ['ING9004'], // Inglés 5 requiere Inglés 4
  'KIN440': ['KIN355'],  // Terapia Física Integral requiere Kinesiología Adulto Mayor
  'KIN442': ['KIN355'],  // Práctica Profesional I requiere Kinesiología Adulto Mayor
  'KIN446': ['KIN355'],  // Psicología de la Salud requiere Kinesiología Adulto Mayor
  'ING9006': ['ING9005'], // Inglés 6 requiere Inglés 5
  'KIN543': ['KIN364'],  // Kinesiología Neurológica 2 requiere Kinesiología Neurológica 1
  'KIN545': ['KIN442'],  // Práctica Profesional II requiere Práctica Profesional I
  'KIN546': ['KIN442'],  // Gestión en Salud requiere Práctica Profesional I
  'KIN644': ['KIN546'],  // Seminario de Investigación requiere Gestión en Salud
  'KIN645': ['KIN545'],  // Práctica Profesional III requiere Práctica Profesional II
  'KIN646': ['KIN545'],  // Kinesiología en Rehabilitación y Prevención requiere Práctica Profesional II
  'KIN745': ['KIN645'],  // Memoria de Título requiere Práctica Profesional III
};

let estadosAsignaturas = JSON.parse(localStorage.getItem('estadosAsignaturas')) || {};

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
