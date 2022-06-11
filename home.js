const formulario = document.querySelector("#informacoesRecado");
const listaRecados = document.querySelector("#tbody");
const sair = document.querySelector("#botaoSair");

const usuarioAtual = JSON.parse(localStorage.getItem("usuariologado") || "[]");

if (!usuarioAtual) {
  window.location.href = "./index.html";
}

const deslogarUsuario = () => {
  localStorage.removeItem("usuariologado");
  window.location.assign("./index.html");
};

function definirId() {
  let identificadores = [];

  for (const recado of recados) {
    identificadores.push(recado.id);
  }

  let maiorID = identificadores.reduce(function (a, b) {
    return Math.max(a, b);
  }, 0);
}

const cadastroRecado = (event) => {
  event.preventDefault();

  let titulo = formulario.titulo.value;
  let descricao = formulario.descricao.value;

  const recados = JSON.parse(localStorage.getItem(usuarioAtual.email) || "[]");

  definirId();

  recados.push({
    id: maiorID + 1,
    titulo,
    descricao,
  });

  localStorage.setItem(usuarioAtual.email, JSON.stringify(recados));
  preencherLista();
  formulario.reset();
};

const preencherLista = () => {
  const recados = JSON.parse(localStorage.getItem(usuarioAtual.email) || "[]");
  listaRecados.innerHTML = "";
  for (const recado of recados) {
    listaRecados.innerHTML += `  
      <br><tr>
      <td class="celulaId">${recado.id}</td>
      <td class="celulaTitulo">${recado.titulo}</td>
      <td class="celulaDescricao">${recado.descricao}</td>  
      <td class="celulaBotao"><button class="botaoApagar" name="botaoApagar" onclick="apagarRecado(${recado.id})">Apagar</buttononclick>
      <button class="botaoEditar" onclick="editarRecado(${recado.id})">Editar</button>
      </td>
    </tr>`;
  }
};

const apagarRecado = (id) => {
  const recados = JSON.parse(localStorage.getItem(usuarioAtual.email) || "[]");
  const indiceProduto = recados.findIndex((produto) => produto.id === id);
  if (indiceProduto < 0) {
    return;
  }
  recados.splice(indiceProduto, 1);
  localStorage.setItem(usuarioAtual.nome, JSON.stringify(recados));
  preencherLista();
};

const editarRecado = (id) => {
  const recados = JSON.parse(localStorage.getItem(usuarioAtual.email) || "[]");

  const indiceProduto = recados.findIndex((produto) => produto.id === id);

  formulario.titulo.value = recados[indiceProduto].titulo;
  formulario.descricao.value = recados[indiceProduto].descricao;

  let botao = formulario.botaoCadastrar;

  botao.setAttribute("type", "button");
  botao.setAttribute("onclick", `gravarRecadoEditado(${id})`);

  document.querySelectorAll(".botaoApagar").forEach((elem) => {
    elem.disabled = true;
    elem.setAttribute("style", "background-color: grey");
  });
};

const gravarRecadoEditado = (id) => {
  let titulo = formulario.titulo.value;
  let descricao = formulario.descricao.value;

  const recados = JSON.parse(localStorage.getItem(usuarioAtual.email) || "[]");

  const indiceProduto = recados.findIndex((produto) => produto.id === id);

  recados[indiceProduto].titulo = titulo;
  recados[indiceProduto].descricao = descricao;

  localStorage.setItem(usuarioAtual.nome, JSON.stringify(recados));

  window.location.reload();
};

formulario.addEventListener("submit", cadastroRecado);
document.addEventListener("DOMContentLoaded", preencherLista);
sair.addEventListener("click", deslogarUsuario);
