const URL_API = "http://localhost:3400";

function salvarToken(token) {
  localStorage.setItem("token", token);
}

function salvarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

function obterToken() {
  return localStorage.getItem("token");
}

function obterUsuario() {
  return JSON.parse(localStorage.getItem("usuario"));
}

validarUsuarioAutenticado();

 function validarUsuarioAutenticado() {
  let logado = usuarioEstaAutenticado();

  if (window.location.pathname == "/login.html") {
    if (logado) {
      window.location.href = "/home.html";
    }
  } else {
    if (!logado) {
      window.location.href = "/login.html";
    }
  }
}

function usuarioEstaAutenticado() {
  let token = obterToken();

  return token ? true : false; // Condicional ternario
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "/login.html";
}