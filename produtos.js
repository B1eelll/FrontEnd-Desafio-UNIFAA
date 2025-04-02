





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
  salvarToken(token)
  obterToken()
