const form = document.querySelector("#formularioLogin");

function buscaUsuarios() {
  const localStorageUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  let usuarios = localStorageUsuarios ?? [];

  return usuarios;
}

function logar(event) {
  event.preventDefault();

  const usuarios = buscaUsuarios;

  const email = form.email.value;
  const senha = form.senha.value;

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email == email && usuario.senha == senha
  );

  if (!usuarioEncontrado) {
    alert("Usuário ou senha inválidos");
    return;
  }

  localStorage.setItem("usuariologado", JSON.stringify(usuarioEncontrado));

  window.location.href = "./home.html";
}

form.addEventListener("submit", logar);
