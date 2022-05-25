const formulario = document.querySelector("#informacoesRecado");
const listaRecados = document.querySelector("#tbody");
const usuarioAtual = JSON.parse(localStorage.getItem("usuariologado") || "[]");
const sair = document.querySelector("#botaoSair");

if (usuarioAtual == "") {
  window.location.href = "./index.html";
}
const deslogarUsuario = () => {
  localStorage.setItem("usuariologado", "");
  window.location.assign("./index.html");
};

const cadastroRecado = (event) => {
  event.preventDefault();

  let titulo = formulario.titulo.value;
  let descricao = formulario.descricao.value;

  const recados = JSON.parse(localStorage.getItem(usuarioAtual.nome) || "[]");

  let identificadores = [];

  for (const recado of recados) {
    identificadores.push(recado.id);
  }

  let maiorID = identificadores.reduce(function (a, b) {
    return Math.max(a, b);
  }, 0);

  recados.push({
    id: maiorID + 1,
    titulo,
    descricao,
  });

  localStorage.setItem(usuarioAtual.nome, JSON.stringify(recados));
  preencherLista();
  formulario.reset();
};

const preencherLista = () => {
  const recados = JSON.parse(localStorage.getItem(usuarioAtual.nome) || "[]");
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
  const recados = JSON.parse(localStorage.getItem(usuarioAtual.nome) || "[]");
  const indiceProduto = recados.findIndex((produto) => produto.id === id);
  if (indiceProduto < 0) {
    return;
  }
  recados.splice(indiceProduto, 1);
  localStorage.setItem(usuarioAtual.nome, JSON.stringify(recados));
  preencherLista();
};

const editarRecado = (id) => {
  const recados = JSON.parse(localStorage.getItem(usuarioAtual.nome) || "[]");
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
  const recados = JSON.parse(localStorage.getItem(usuarioAtual.nome) || "[]");
  const indiceProduto = recados.findIndex((produto) => produto.id === id);
  recados[indiceProduto].titulo = titulo;
  recados[indiceProduto].descricao = descricao;
  localStorage.setItem(usuarioAtual.nome, JSON.stringify(recados));
  preencherLista();
  window.location.reload();
};

formulario.addEventListener("submit", cadastroRecado);
document.addEventListener("DOMContentLoaded", preencherLista);
sair.addEventListener("click", deslogarUsuario);
