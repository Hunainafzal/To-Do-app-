
function getTodos() {
    let todos = [];
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      todos = JSON.parse(todosString);
    }
    return todos;
  }
  
  function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
  
    const todos = getTodos();
  
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${todo}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      todoList.appendChild(li);
    });
  
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', deleteTodo);
    });
  }
  
  function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todo = todoInput.value.trim();
  
    if (todo !== '') {
      const todos = getTodos();
      todos.push(todo);
      saveTodos(todos);
      renderTodos();
      todoInput.value = '';
    }
  }
  
  function deleteTodo() {
    const index = parseInt(this.dataset.index);
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
  }
  
  function deleteAllTodos() {
    localStorage.removeItem('todos');
    renderTodos();
  }
  
  document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
  });
  
  document.getElementById('delete-all').addEventListener('click', deleteAllTodos);
  
  renderTodos();
  
