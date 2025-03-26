let btnAdicionar = document.getElementById('btn-adicionar')


fetch("http://localhost:3400/clientes" , {
 method: "GET",
})
 .then((response) => {
    if (!response.ok) {
        throw new Error("Erro na requisição: " +  response.status)
    }
    return response.json();
 })
 .then((dados) => {
    console.log(dados);
 })
 .catch((error) => {
    console.error("erro: ", error);
 }); 

 function obtertoken(){
   const token = localStorage.getItem("token");
   if(token){
     console.log("Token: " + token)
     return token;
   } else {
     console.log("Token não encontrado ou não armazenado.")
     return null;
   }
 }
 


 

 