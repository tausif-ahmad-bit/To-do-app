(function () {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const empty = document.getElementById('empty');

  // Persist todos in localStorage
  let todos = JSON.parse(localStorage.getItem('todos') || '[]');

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function render() {
    list.innerHTML = '';
    if (todos.length === 0) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'todo-item';

      const span = document.createElement('span');
      span.textContent = todo.text;
      span.setAttribute('data-index', index);

      const btn = document.createElement('button');
      btn.className = 'delete-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', `Delete ${todo.text}`);
      btn.textContent = 'Delete';
      btn.addEventListener('click', () => deleteTodo(index));

      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function addTodo(text) {
    todos.push({ text });
    save();
    render();
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    save();
    render();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    addTodo(val);
    input.value = '';
    input.focus();
  });

  // Initial render
  render();
})();
