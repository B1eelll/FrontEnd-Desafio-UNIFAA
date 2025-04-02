const produtosContainer = document.getElementById("produtos-container");

function obterToken() {
  return localStorage.getItem("token") || "";
}

function exibirprodutos(produtos) {
  produtosContainer.innerHTML = "";
  if (Array.isArray(produtos)) {
    produtos.forEach((produto) => {
      const produtoDiv = document.createElement("div");
      produtoDiv.style.border = "1px solid black";
      produtoDiv.style.borderRadius = "10px"
      produtoDiv.style.padding = "10px";
      produtoDiv.style.margin = "10px";
      produtoDiv.style.textAlign = 'center'

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
      )}`; // Assumindo uma função formatarData

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
      obterToken();
    })
    .catch((error) => {
      console.log("erro ao buscar produtos", error);
    });
}
buscarProdutos();
