export const isAuthenticated = () => {
   const usuarioLogado = localStorage.getItem("usuarioLogado");
   if(usuarioLogado){
       return true;
   }
    return false;
}