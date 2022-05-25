formularioCadastro.setAttribute("autocomplete", "off");

const nomeUsuario = document.getElementById("inputUsuario");
const emailusuario = document.getElementById("inputEmail");
const senhaUsuario = document.getElementById("inputSenha");
const confirmaSenha = document.getElementById("inputConfirmaSenha");

const botaoCriar = document.querySelector("#botaoCriar");

botaoCriar.addEventListener("click", criarUsuario);

function criarUsuario(event) {
  event.preventDefault();
  const localStorageUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  let usuarios = localStorageUsuarios !== null ? localStorageUsuarios : [];

  const verificaUsuario = usuarios.find(
    (usuario) => usuario.email == emailusuario.value
  );
  if (verificaUsuario != undefined) {
    alert(
      "E-mail já cadastrado!\nUtilize outro e-mail para completar seu cadastro."
    );
    return;
  }

  if (senhaUsuario.value == confirmaSenha.value) {
    usuarios.push({
      nome: nomeUsuario.value,
      email: emailusuario.value,
      senha: senhaUsuario.value,
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    window.location.href = "./index.html";
    alert("Usuário criado com sucesso!\nEfetue seu login.");
  } else {
    alert("As senhas não coincidem.");
  }
}
