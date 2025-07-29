const estados = ["", "cursando", "aprobado", "reprobado"];

document.querySelectorAll(".curso").forEach((curso) => {
  curso.addEventListener("click", () => {
    const prerreq = curso.dataset.prerreq;
    if (prerreq) {
      const prereqCurso = document.querySelector(`[data-id='${prerreq}']`);
      if (!prereqCurso || !prereqCurso.classList.contains("aprobado")) {
        alert("Debes aprobar el prerrequisito antes de cursar este ramo.");
        return;
      }
    }

    // Cambia estado cíclicamente
    for (let estado of estados) curso.classList.remove(estado);
    let actual = curso.dataset.estado || "";
    let index = estados.indexOf(actual);
    let siguiente = estados[(index + 1) % estados.length];
    if (siguiente) curso.classList.add(siguiente);
    curso.dataset.estado = siguiente;
  });
});
