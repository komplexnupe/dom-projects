const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBTN = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// Load all event listeners;
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask);
  // Delete Task
  taskList.addEventListener('click', deleteTask);
  // Clear All Tasks
  clearBTN.addEventListener('click', clearTasks);
  // Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
   // Create li Element
  const li = document.createElement('li');
  // Add a class
  li.className = 'collection-item';
  // Create text node and append
  li.appendChild(document.createTextNode(task));
  // Create new link element (delete x)
  const link = document.createElement('a');
  // Add class to link
  link.className = 'delete-item secondary-content';
  // Add icon
  link.innerHTML = '<i class="far fa-trash-alt"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Add a task');
  }
  // Create li Element
  const li = document.createElement('li');
  // Add a class
  li.className = 'collection-item';
  // Create text node and append
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element (delete x)
  const link = document.createElement('a');
  // Add class to link
  link.className = 'delete-item secondary-content';
  // Add icon
  link.innerHTML = '<i class="far fa-trash-alt"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskToLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

}

// Store Task to Local Storage
function storeTaskToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete Task
function deleteTask(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target);
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      deleteTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function deleteTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) =>{
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){
  // Using innerHTML to remove
  // taskList.innerHTML = '';
 
  // Faster with while loop
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks from local storage
  clearTasksFromLS();

}

function clearTasksFromLS(){
  localStorage.clear();
}

function filterTasks(e){
  e.preventDefault();
  const text = e.target.value.toLowerCase();;

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) !== -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}