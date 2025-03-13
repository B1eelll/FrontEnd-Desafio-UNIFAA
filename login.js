let btnentrar = document.getElementById("btnentrar");

function entrar(){
    btnentrar.style.backgroundColor = 'blue'
}

function sair(){
    btnentrar.style.backgroundColor = ''
}

if(btnentrar){
    btnentrar.addEventListener("mouseenter", entrar);
    btnentrar.addEventListener("mouseleave", sair)
}