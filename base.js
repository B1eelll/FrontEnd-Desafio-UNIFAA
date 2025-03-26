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
  