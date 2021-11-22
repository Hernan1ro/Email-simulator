// Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
console.log(btnReset);

// Variables par campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
  // Cuando la aplicacion arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);
  // Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
  // Resetea los campos del formulario
  btnReset.addEventListener("click", resetearFormulario);
  // Enviar correo electronico
  btnEnviar.addEventListener("click", enviarEmail);
}

// Funciones

function iniciarApp() {
  console.log("Iniciando aplicacion... ");
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Validar Validar formulario

function validarFormulario(evento) {
  // console.log(evento.target.type);

  if (evento.target.value.length > 0) {
    // Remueve el error del DOM
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    evento.target.classList.remove("border", "border-red-500");
    evento.target.classList.add("border", "border-green-500");
  } else {
    // evento.target.style.borderColor = "red";
    evento.target.classList.remove("border", "border-green-500");
    evento.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos deben estar llenos");
  }

  if (evento.target.type === "email") {
    if (er.test(evento.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      evento.target.classList.remove("border", "border-red-500");
      evento.target.classList.add("border", "border-green-500");
    } else {
      evento.target.classList.remove("border", "border-green-500");
      evento.target.classList.add("border", "border-red-500");
      mostrarError("Emai no válido");
    }
  }
  if (
    er.test(email.value) !== "" &&
    asunto.value !== "" &&
    mensaje.value !== ""
  ) {
    console.log("pasaste la validación");
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    console.log("Hay campos por validar");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-color-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

// Enviar email
function enviarEmail(e) {
  e.preventDefault();
  // Mostrar el spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  // Despues de 3 segundos ocultar el spinner
  setTimeout(() => {
    // Despues de 3 segundos desaparece el spinner
    spinner.style.display = "none";

    // Aparece el parrafo que confirma el envio exitoso
    const parrafo = document.createElement("p");
    parrafo.textContent = "Mensaje enviado";
    parrafo.classList.add(
      "text-center",
      "p-2",
      "text-white",
      "bg-green-500",
      "my-2",
      "font-bold",
      "uppercase"
    );
    formulario.insertBefore(parrafo, spinner);
    // Desaparece el mensaje y resetea los campos

    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 2000);
  }, 2000);
}

// Función que resetea el formulario del

function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
