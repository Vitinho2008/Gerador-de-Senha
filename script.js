function gerarSenha() {
  const usarMaiusculas = document.getElementById('uppercase').checked;
  const usarMinusculas = document.getElementById('lowercase').checked;
  const usarNumeros = document.getElementById('numbers').checked;
  const usarSimbolos = document.getElementById('symbols').checked;
  const tamanho = parseInt(document.getElementById('length').value);

  const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const simbolos = '!@#$%^&*()_+[]{}<>?/';

  let caracteres = '';
  if (usarMaiusculas) caracteres += letrasMaiusculas;
  if (usarMinusculas) caracteres += letrasMinusculas;
  if (usarNumeros) caracteres += numeros;
  if (usarSimbolos) caracteres += simbolos;

  if (caracteres.length === 0) {
    alert('Selecione pelo menos uma opção!');
    return;
  }

  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[randomIndex];
  }

  document.getElementById('senhaGerada').value = senha;

  salvarNoHistorico(senha);
}

function copiarSenha() {
  const campoSenha = document.getElementById('senhaGerada');
  campoSenha.select();
  document.execCommand('copy');
  alert('Senha copiada!');
}

// ---------- Histórico ----------

function salvarNoHistorico(senha) {
  let historico = JSON.parse(localStorage.getItem('senhas')) || [];

  if (historico[0] !== senha) {
    historico.unshift(senha);
    historico = historico.slice(0, 20);
    localStorage.setItem('senhas', JSON.stringify(historico));
  }

  atualizarHistorico();
}

function atualizarHistorico() {
  const lista = document.getElementById('listaHistorico');
  const historico = JSON.parse(localStorage.getItem('senhas')) || [];

  lista.innerHTML = '';

  if (historico.length === 0) {
    const vazio = document.createElement('li');
    vazio.textContent = 'Nenhuma senha gerada ainda.';
    vazio.style.color = '#777';
    lista.appendChild(vazio);
    return;
  }

  historico.forEach(senha => {
    const li = document.createElement('li');
    li.textContent = senha;
    lista.appendChild(li);
  });
}

function alternarHistorico() {
  const historicoDiv = document.getElementById('historicoSenhas');
  const botao = event.target;
  const visivel = historicoDiv.style.display === 'block';

  if (visivel) {
    historicoDiv.style.display = 'none';
    botao.textContent = 'Mostrar Histórico';
  } else {
    atualizarHistorico();
    historicoDiv.style.display = 'block';
    botao.textContent = 'Esconder Histórico';
  }
}

function limparHistorico() {
  if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
    localStorage.removeItem('senhas');
    atualizarHistorico();
  }
}

// Carrega o histórico ao abrir a página
window.onload = () => {
  atualizarHistorico();
};
