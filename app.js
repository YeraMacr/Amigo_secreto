(function () {
  const input = document.getElementById('nombre');
  const addBtn = document.getElementById('btn-add');
  const drawBtn = document.getElementById('btn-draw');
  const resetBtn = document.getElementById('btn-reset');
  const listEl = document.getElementById('lista');
  const emptyEl = document.getElementById('empty');
  const alertEl = document.getElementById('alert');
  const resultEl = document.getElementById('result');
  const winnerEl = document.getElementById('winner');

  const names = [];

  function normalize(str) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
  }

  function showAlert(show) {
    alertEl.classList.toggle('show', !!show);
  }

  function renderList() {
    listEl.innerHTML = '';
    names.forEach((name, idx) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = name;

      const del = document.createElement('button');
      del.textContent = 'Eliminar';
      del.addEventListener('click', () => {
        names.splice(idx, 1);
        renderList();
        updateEmptyState();
      });

      li.appendChild(span);
      li.appendChild(del);
      listEl.appendChild(li);
    });
  }

  function updateEmptyState() {
    emptyEl.style.display = names.length ? 'none' : 'block';
    if (!names.length) {
      resultEl.classList.remove('show');
      winnerEl.textContent = '—';
    }
  }

  function addName() {
    const raw = input.value;
    const value = raw.trim();
    if (!value) {
      showAlert(true);
      return;
    }

    const exists = names.some((n) => normalize(n) === normalize(value));
    if (exists) {
      alertEl.textContent = 'Ese nombre ya está en la lista.';
      showAlert(true);
      return;
    }

    names.push(value);
    input.value = '';
    renderList();
    updateEmptyState();
  }

  function drawRandom() {
    if (!names.length) {
      showAlert(true);
      return;
    }
    const idx = Math.floor(Math.random() * names.length);
    const winner = names[idx];
    winnerEl.textContent = winner;
    resultEl.classList.add('show');
  }

  function resetAll() {
    names.length = 0;
    renderList();
    updateEmptyState();
  }

  addBtn.addEventListener('click', addName);
  drawBtn.addEventListener('click', drawRandom);
  resetBtn.addEventListener('click', resetAll);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addName();
  });

  updateEmptyState();
})();
