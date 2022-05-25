const nomeUsuario = document.getElementById("inputUsuario");
const emailUsuario = document.getElementById("inputEmail");
const senhaUsuario = document.getElementById("inputSenha");

const localStorageUsuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarios = localStorageUsuarios !== null ? localStorageUsuarios : [];

function logar(event) {
  event.preventDefault();
  const verificaUsuario = usuarios.find(
    (usuario) =>
      usuario.email == emailUsuario.value && usuario.senha == senhaUsuario.value
  );
  localStorage.setItem("usuariologado", JSON.stringify(verificaUsuario));
  if (verificaUsuario != undefined) {
    console.log(usuarios.nome);
    window.location.href = "./home.html";
  } else {
    alert("Usuário ou senha inválidos");
  }
}

const botaoLogin = document.querySelector("#botaoLogin");
document.addEventListener("submit", logar);
