let Clientes = document.getElementById("clientes") 
Clientes.addEventListener('click',function(){
    window.location.href = "clientes.html";
})

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


/*function obterclientes(){
    fetch('http://localhost:3400/clientes', {
        method: "GET",
        headers: {
            "authorization": "8ada0eccb3a9dc34c5316bfb97dccfbf"
        }
    })
    .then(response => response.json())
    .then(clientes => {
        console.log(clientes);
    })
}

obterclientes()*/

