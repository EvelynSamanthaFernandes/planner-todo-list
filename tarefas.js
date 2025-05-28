const mostrarFormularioPastaBtn = document.getElementById(
  "mostrarFormularioPasta"
);
const formularioPasta = document.getElementById("formularioPasta");
const nomePastaInput = document.getElementById("nomePasta");
const listaPastas = document.getElementById("listaPastas");

mostrarFormularioPastaBtn.addEventListener("click", () => {
  formularioPasta.classList.toggle("oculto");
  nomePastaInput.focus();
});

// Criar pasta ao clicar no botão ou ao apertar Enter no input da pasta
function criarPasta() {
  const nomePasta = nomePastaInput.value.trim();
  if (!nomePasta) return;

  // Criar container da pasta
  const pasta = document.createElement("div");
  pasta.classList.add("pasta");

  // Título da pasta com nome e botão excluir do lado
  const tituloContainer = document.createElement("div");
  tituloContainer.classList.add("titulo-pasta");

  const titulo = document.createElement("h3");
  titulo.textContent = nomePasta;

  const botaoExcluirPasta = document.createElement("button");
  botaoExcluirPasta.textContent = "🗑️";
  botaoExcluirPasta.classList.add("botao-icone");
  botaoExcluirPasta.title = "Excluir pasta";
  botaoExcluirPasta.addEventListener("click", () => {
    if (confirm("Deseja excluir esta pasta?")) {
      pasta.remove();
      verificarConclusao();
    }
  });

  tituloContainer.appendChild(titulo);
  tituloContainer.appendChild(botaoExcluirPasta);
  pasta.appendChild(tituloContainer);

  // Input de nova tarefa
  const inputTarefa = document.createElement("input");
  inputTarefa.type = "text";
  inputTarefa.placeholder = "Nova tarefa";
  inputTarefa.classList.add("input-tarefa");

  // Container dos botões de tarefa ao lado do input
  const botoesTarefa = document.createElement("div");
  botoesTarefa.classList.add("botoes-tarefa");

  const botaoAddTarefa = document.createElement("button");
  botaoAddTarefa.textContent = "+";
  botaoAddTarefa.classList.add("botao-icone");
  botaoAddTarefa.title = "Adicionar tarefa";

  const botaoExcluirTarefa = document.createElement("button");
  botaoExcluirTarefa.textContent = "🗑️";
  botaoExcluirTarefa.classList.add("botao-icone");
  botaoExcluirTarefa.title = "Excluir última tarefa";

  botoesTarefa.appendChild(botaoAddTarefa);
  botoesTarefa.appendChild(botaoExcluirTarefa);

  // Container das tarefas
  const containerTarefas = document.createElement("div");
  containerTarefas.classList.add("container-tarefas");

  pasta.appendChild(inputTarefa);
  pasta.appendChild(botoesTarefa);
  pasta.appendChild(containerTarefas);

  listaPastas.appendChild(pasta);

  nomePastaInput.value = "";
  formularioPasta.classList.add("oculto");
  inputTarefa.focus();

  // Função para adicionar tarefa
  function adicionarTarefa() {
    const texto = inputTarefa.value.trim();
    if (!texto) return;

    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", verificarConclusao);

    const span = document.createElement("span");
    span.textContent = texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "🗑️";
    botaoExcluir.classList.add("botao-icone");
    botaoExcluir.title = "Excluir tarefa";
    botaoExcluir.addEventListener("click", () => {
      tarefa.remove();
      verificarConclusao();
    });

    tarefa.appendChild(checkbox);
    tarefa.appendChild(span);
    tarefa.appendChild(botaoExcluir);

    containerTarefas.appendChild(tarefa);
    inputTarefa.value = "";
    inputTarefa.focus();

    verificarConclusao();
  }

  // Adicionar tarefa pelo botão "+"
  botaoAddTarefa.addEventListener("click", adicionarTarefa);

  // Excluir última tarefa pelo botão "🗑️" ao lado do input
  botaoExcluirTarefa.addEventListener("click", () => {
    const tarefas = containerTarefas.querySelectorAll(".tarefa");
    if (tarefas.length > 0) {
      tarefas[tarefas.length - 1].remove();
      verificarConclusao();
    }
  });

  // Criar tarefa ao pressionar Enter no input da tarefa
  inputTarefa.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      adicionarTarefa();
    }
  });
}

// Criar pasta ao clicar no botão "Criar" na UI (caso tenha botão, não obrigatório)
document.getElementById("criarPasta")?.addEventListener("click", criarPasta);

// Criar pasta ao pressionar Enter no input de nome da pasta
nomePastaInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    criarPasta();
  }
});

// Função para verificar se todas as tarefas estão concluídas
function verificarConclusao() {
  const todasTarefas = document.querySelectorAll(
    ".tarefa input[type='checkbox']"
  );
  const concluidas = Array.from(todasTarefas).filter((cb) => cb.checked);
  if (todasTarefas.length > 0 && concluidas.length === todasTarefas.length) {
    setTimeout(() => {
      window.location.href = "concluido.html";
    }, 500);
  }
}
