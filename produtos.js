buscarProdutos();
const produtosContainer = document.getElementById("produtos-container");
const formulario = document.getElementById("form-adicionar-produto");
const btnadicionar = document.getElementById("btn-adicionar");
const btnCancelarAdicao = document.getElementById("btnCancelarAdicao");
const formulario1 = document.getElementById("formulario1");
const btnadicionarproduto = document.getElementById('adicionarproduto')
const geral = document.getElementById('geral')

formulario1.style.display = "none";

function adicionarformulario() {
  formulario1.style.display = "block";
}

function removerProdutoDaTela(id) {
  const produtoDiv = document.querySelector(`[data-produto-id="${id}"]`);
  if (produtoDiv && produtosContainer) {
    produtosContainer.removeChild(produtoDiv);
  } else {
    console.warn(`Elemento do produto com ID ${id} não encontrado na tela.`);
    buscarProdutos();
  }
}

function excluirproduto() {
  const btnexcluir = document.getElementById("btn-excluir");
  btnexcluir.addEventListener("click", function () {
    let idExcluir = prompt("qual produto deseja excluir? digite o ID.");

    if (idExcluir && idExcluir.trim() !== "") {
      const token = obterToken();
      const apiUrl = `http://localhost:3400/produtos/${idExcluir.trim()}`;

      fetch(apiUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Produto com ID ${idExcluir} excluído com sucesso.`);
            removerProdutoDaTela(idExcluir.trim());
            alert(`Produto com ID ${idExcluir} excluído.`);
          } else {
            console.error(
              `Erro ao excluir produto com ID ${idExcluir}: ${response.status}`
            );
            alert(`Erro ao excluir o produto (código ${response.status}).`);
          }
        })
        .catch((error) => {
          console.error(`Erro ao excluir produto com ID ${idExcluir}:`, error);
          alert("Ocorreu um erro ao tentar excluir o produto.");
        });
    } else if (idExcluir === null) {
      console.log("Exclusão cancelada pelo usuário.");
    } else {
      alert("Por favor, digite um ID válido para excluir.");
    }
  });
}

function obterToken() {
  return localStorage.getItem("token") || "";
}

function exibirprodutos(produtos) {
  produtosContainer.innerHTML = "";
  if (Array.isArray(produtos)) {
    produtos.forEach((produto) => {
      const produtoDiv = document.createElement("div");
      produtoDiv.style.border = "1px solid black";
      produtoDiv.style.borderRadius = "10px";
      produtoDiv.style.padding = "10px";
      produtoDiv.style.margin = "10px";
      produtoDiv.style.textAlign = "center";
      produtoDiv.dataset.produtoId = produto.id; // Adicionado dataset para facilitar a exclusão

      const idProduto = document.createElement("h3");
      idProduto.textContent = `ID: ${produto.id}`;

      const nomeProduto = document.createElement("h2");
      nomeProduto.textContent = produto.nome;

      const valorProduto = document.createElement("p");
      valorProduto.textContent = `Valor: R$ ${
        produto.valor ? produto.valor.toFixed(2) : "N/A"
      }`;

      const quantidadeEstoqueProduto = document.createElement("p");
      quantidadeEstoqueProduto.textContent = `Estoque: ${produto.quantidadeEstoque}`;

      const observacaoProduto = document.createElement("p");
      observacaoProduto.textContent = `Observação: ${
        produto.observacao || "Nenhuma"
      }`;

      const dataCadastroProduto = document.createElement("p");
      dataCadastroProduto.textContent = `Cadastro: ${formatarData(
        produto.dataCadastro
      )}`;

      produtoDiv.appendChild(idProduto);
      produtoDiv.appendChild(nomeProduto);
      produtoDiv.appendChild(valorProduto);
      produtoDiv.appendChild(quantidadeEstoqueProduto);
      produtoDiv.appendChild(observacaoProduto);
      produtoDiv.appendChild(dataCadastroProduto);

      produtosContainer.appendChild(produtoDiv);
    });
  } else {
    console.error("Erro: Dados da API não são um array de produtos:", produtos);
    produtosContainer.innerHTML =
      '<p style="color: red;">Erro ao exibir produtos.</p>';
  }
}

function formatarData(dataString) {
  if (!dataString) return "N/A";
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function buscarProdutos() {
  fetch("http://localhost:3400/produtos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: obterToken(),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ERROR! STATUS: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dados recebidos da API:", data);
      exibirprodutos(data);
    })
    .catch((error) => {
      console.log("erro ao buscar produtos", error);
    });
}

function adicionarNovoProduto(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const quantidadeEstoque = parseInt(
    document.getElementById("quantidadeEstoque").value
  );
  const observacao = document.getElementById("observacao").value;

  const novoProduto = { nome, valor, quantidadeEstoque, observacao };
  const token = obterToken();
  const apiUrl = "http://localhost:3400/produtos";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(novoProduto),
  })
    .then((response) => response.json())
    .then((novoProdutoAdicionado) => {
      console.log("Produto adicionado:", novoProdutoAdicionado);
      exibirUmProduto(novoProdutoAdicionado); // Usando exibirUmProduto
      formulario.style.display = "none";
      formulario.reset();
    })
    .catch((error) => console.error("Erro ao adicionar produto:", error));
}

function exibirUmProduto(produto) {
  const produtoDiv = document.createElement("div");
  produtoDiv.style.border = "1px solid black";
  produtoDiv.style.borderRadius = "10px";
  produtoDiv.style.padding = "10px";
  produtoDiv.style.margin = "10px";
  produtoDiv.style.textAlign = "center";
  produtoDiv.dataset.produtoId = produto.id; // Adicionado dataset aqui também

  const idProduto = document.createElement("h3");
  idProduto.textContent = `ID: ${produto.id}`;

  const nomeProduto = document.createElement("h2");
  nomeProduto.textContent = produto.nome;

  const valorProduto = document.createElement("p");
  valorProduto.textContent = `Valor: R$ ${
    produto.valor ? produto.valor.toFixed(2) : "N/A"
  }`;

  const quantidadeEstoqueProduto = document.createElement("p");
  quantidadeEstoqueProduto.textContent = `Estoque: ${produto.quantidadeEstoque}`;

  const observacaoProduto = document.createElement("p");
  observacaoProduto.textContent = `Observação: ${
    produto.observacao || "Nenhuma"
  }`;

  const dataCadastroProduto = document.createElement("p");
  dataCadastroProduto.textContent = `Cadastro: ${formatarData(
    produto.dataCadastro
  )}`;

  produtoDiv.appendChild(idProduto);
  produtoDiv.appendChild(nomeProduto);
  produtoDiv.appendChild(valorProduto);
  produtoDiv.appendChild(quantidadeEstoqueProduto);
  produtoDiv.appendChild(observacaoProduto);
  produtoDiv.appendChild(dataCadastroProduto);

  produtosContainer.appendChild(produtoDiv);
}

// Event listener para mostrar o formulário ao clicar em "adicionar"
btnadicionar.addEventListener("click", function () {
  formulario1.style.display = "block";
  geral.style.display = "none"

});
btnadicionarproduto.addEventListener('click', function(){
  formulario1.style.display = 'none';
})
// Event listener para o envio do formulário de adição
formulario.addEventListener("submit", adicionarNovoProduto);

// Event listener para cancelar a adição e ocultar o formulário
btnCancelarAdicao.addEventListener("click", function () {
  formulario1.style.display = "none";
  formulario1.reset();
  geral.style.display = 'block'
});

buscarProdutos();
excluirproduto();
