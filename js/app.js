// Variables ---
const carrito = document.querySelectorAll("#carrito");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
let cursoCarrito = [];

cargarEventListener();
function cargarEventListener() {
  listaCursos.addEventListener("click", agregarCursos);

  // Eliminar curso
  listaCarrito.addEventListener("click", eliminarCurso);

  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    cursoCarrito = [];
    limpiarHTML();
    sincronizarLocalStorage();
  });

  // localStorage
  document.addEventListener("DOMContentLoaded", () => {
    cursoCarrito = JSON.parse(localStorage.getItem("carrito"));
    carritoHTML();
  });
}

function agregarCursos(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    curosSelecionado = e.target.parentElement.parentElement;
    // leerDatosCurso();
    LeerDatosCurso(curosSelecionado);
  }
}

// Eliminar curso

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    const existe = cursoCarrito.some(
      (curso) => curso.id === cursoId && curso.cantidad > 1
    );

    if (existe) {
      const cursos = cursoCarrito.map((curso) => {
        if (curso.id === cursoId) {
          curso.cantidad--;
        }
        return curso;
      });
      cursoCarrito = [...cursos];
    } else {
      cursoCarrito = cursoCarrito.filter((curso) => curso.id !== cursoId);
    }

    carritoHTML();
  }
}

function LeerDatosCurso(curso) {
  const datosCurso = {
    imagen: curso.querySelector("img").getAttribute("src"),
    nombre: curso.querySelector("h4").textContent,
    precio: curso.querySelector("p span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = cursoCarrito.some((curso) => curso.id === datosCurso.id);

  if (existe) {
    const nuevoCursos = cursoCarrito.map((curso) => {
      if (curso.id === datosCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    cursoCarrito = [...nuevoCursos];
  } else {
    cursoCarrito = [...cursoCarrito, datosCurso];
    console.log(cursoCarrito);
  }
  carritoHTML();
}

function carritoHTML() {
  limpiarHTML();

  cursoCarrito.forEach((curso) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>
    <img src='${curso.imagen}' width='100px'/>
    </td>
    <td>${curso.nombre}</td>
    <td>${curso.precio}</td>
    <td>${curso.cantidad}</td>
    <td>
    <a href="#" class="borrar-curso" data-id='${curso.id}'>X</a>
    </td>
    `;
    listaCarrito.appendChild(fila);
  });

  sincronizarLocalStorage();
}

function sincronizarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(cursoCarrito));
}

function limpiarHTML() {
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
}
