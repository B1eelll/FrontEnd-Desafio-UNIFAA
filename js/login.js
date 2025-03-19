let btnEntrar = document.getElementById('btn-entrar');
let campoEmail = document.getElementById('email');
let campoSenha = document.getElementById('senha');

btnEntrar.addEventListener('click',() => {
    
    let email = campoEmail.value;
    let senha = campoSenha.value; 

    autenticar(email, senha);


    // alert("Login efetuado com sucesso!");
    
    // window.location.href = 'home.html';

})

function autenticar(email, senha){
    // 1° Criar um request para API
    fetch(URL_API + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response = response.json())
    .then(json => {

        if(!!json.mensagem){
            alert(json.mensagem);
            return;
        }
        // mostrar um loading de carregamento

        mostrarLoading();
        // SalvarToken e o suario na localStorage
        salvarToken(json.token);
        salvarUsuario(json.usuario);
        
        // Poderia direcionar para tela de home
        setTimeout(()=> {
            window.location.href = 'home.html';
        }, 2000);
    })
    .catch(err => {
        console.error('Erro ao autenticar', err);
    });
   


    // 2° se der certo, direcionar para home.html
    // 3° se der errado, ignorar
}

function mostrarLoading(){
    let loading = document.getElementById('loading');
    loading.style.display = 'flex';

    let caixaLogin = document.querySelector('.caixa-login');
    caixaLogin.style.display = 'none';
}