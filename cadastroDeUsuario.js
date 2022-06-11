const form = document.querySelector("formularioCadastro");

form.setAttribute("autocomplete", "off");
form.addEventListener("submit", criarUsuario);

function buscaUsuarios() {
  const localStorageUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  let usuarios = localStorageUsuarios ?? [];

  return usuarios;
}

function criarUsuario(event) {
  event.preventDefault();

  const usuarios = buscaUsuarios();

  const nome = form.usuario.value;
  const email = form.email.value;
  const senha = form.senha.value;
  const confirmaSenha = form.confirmaSenha.value;

  const usuarioExiste = usuarios.some((usuario) => usuario.email == email);
  if (usuarioExiste) {
    alert(
      "E-mail já cadastrado!\nUtilize outro e-mail para completar seu cadastro."
    );
    return;
  }

  if (senha != confirmaSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  usuarios.push({
    nome,
    email,
    senha,
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  window.location.href = "./index.html";
  alert("Usuário criado com sucesso!\nEfetue seu login.");
}
