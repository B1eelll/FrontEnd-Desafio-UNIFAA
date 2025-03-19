let clientes = document.getElementById('clientes')

clientes.addEventListener('click', function(){
    window.location.href = 'controle-clientes.html'
})






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

