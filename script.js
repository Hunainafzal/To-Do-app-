// Retrieve todo list from local storage
function getTodos() {
    let todos = [];
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      todos = JSON.parse(todosString);
    }
    return todos;
  }
  
  // Save todo list to local storage
  function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Render todos on the page
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
  
    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', deleteTodo);
    });
  }
  
  // Add a new todo
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
  
  // Delete a todo
  function deleteTodo() {
    const index = parseInt(this.dataset.index);
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
  }
  
  // Delete all todos
  function deleteAllTodos() {
    localStorage.removeItem('todos');
    renderTodos();
  }
  
  // Attach event listeners to form and delete all button
  document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
  });
  
  document.getElementById('delete-all').addEventListener('click', deleteAllTodos);
  
  // Initial rendering
  renderTodos();
  