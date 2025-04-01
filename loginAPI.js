// parte da API
const login = document.getElementById("login");
const btnentrar = document.getElementById("btnentrar");

btnentrar.addEventListener("click", function() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fazerlogin(email, senha);
});

function fazerlogin(email, senha) {
  // função começa aqui
  fetch("http://localhost:3400/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("credenciais inválidas.");
      }
    })
    .then((dados) => {
      const token = dados.token;
      salvarToken(token)
      obterToken()
      loading.style.display = "flex";
      login.style.display = "none";
      setTimeout(function () {
        window.location.href = "inicio.html";
      }, 2000);;
    })

    .catch((erro) => {
      window.alert("Erro ao fazer login");
    });
} // função termina aqui
const Logout = document.getElementById('logout').addEventListener('click', function(){
  localStorage.removeItem('token');
})
function salvarToken(token) {
  localStorage.setItem("token", token); // Salva o token no local storage
}

function salvarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario)); // Salva o usuário no local storage
}

function obterToken() {
  return localStorage.getItem("token"); // Pega o token salvo no local storage
}

function obterUsuario() {
  return JSON.parse(localStorage.getItem("usuario")); // Pega o usuário salvo no local storage
}
salvarToken()
obterToken()
//parte da interação com a página
function entrar() {
  btnentrar.style.backgroundColor = "blue";
}

function sair() {
  btnentrar.style.backgroundColor = "";
}

if (btnentrar) {
  btnentrar.addEventListener("mouseenter", entrar);
  btnentrar.addEventListener("mouseleave", sair);
}
