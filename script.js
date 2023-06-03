
function getTodos() {
    var todos = [];
    var todosString = localStorage.getItem('todos');
    if (todosString) {
      todos = JSON.parse(todosString);
    }
    return todos;
  }
  
  function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  function renderTodos() {
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
  
    var todos = getTodos();
  
    todos.forEach((todo, index) => {
      var li = document.createElement('li');
      li.innerHTML = `
        <span>${todo}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      todoList.appendChild(li);
    });
  
    var deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', deleteTodo);
    });
  }
  
  function addTodo() {
    var todoInput = document.getElementById('todo-input');
    var todo = todoInput.value.trim();
  
    if (todo !== '') {
      var todos = getTodos();
      todos.push(todo);
      saveTodos(todos);
      renderTodos();
      todoInput.value = '';
    }
  }
  
  function deleteTodo() {
    var index = parseInt(this.dataset.index);
    var todos = getTodos();
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
  
