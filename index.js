const root = document.getElementById('root');

//Шапка приложения
const appContainer = document.createElement('div');
appContainer.className = 'app-container';

const header = document.createElement('div');
header.className = 'app-header';

const title = document.createElement('h1');
title.textContent = '📝 Todo List';

const subtitle = document.createElement('p');
subtitle.textContent = 'Организуйте свои задачи эффективно';
subtitle.style.color = '#7f8c8d';
subtitle.style.marginBottom = '20px';

header.append(title);
header.append(subtitle);

// Секция добавления задач
const inputSection = document.createElement('div');
inputSection.className = 'input-section';

const buttonDeleteAll = document.createElement('button');
buttonDeleteAll.id = 'deleteAllBtn';
buttonDeleteAll.textContent = 'Delete All';

const buttonDeleteLast = document.createElement('button');
buttonDeleteLast.id = 'deleteLastBtn';
buttonDeleteLast.textContent = 'Delete Last';

const todoInput = document.createElement('input');
todoInput.type = 'text';
todoInput.id = 'todoInput';
todoInput.placeholder = 'Enter todo ...';

const addButton = document.createElement('button');
addButton.id = 'addButton';
addButton.textContent = 'Add';

buttonDeleteAll.addEventListener('click', () => {
    const items = document.querySelectorAll('.todo-item');

    if (items.length === 0) {
        alert('Нет задач для удаления!');
        return;
    }

    if (confirm(`Вы действительно хотите удалить все задачи? (${items.length})`)) {
        items.forEach(item => item.remove());
        updateCounters();
    }
});

buttonDeleteLast.addEventListener('click', () => {
    const lastItems = document.querySelectorAll('.todo-item:first-of-type');

    if (lastItems.length > 0) {
        const lastItem = lastItems[lastItems.length - 1];
        
        const taskTextElement = lastItem.querySelector('.todo-text');
        const taskText = taskTextElement ? taskTextElement.textContent : 'Нет задач!';
        
        if (confirm(`Вы действительно хотите удалить задачу? (${taskText})`)) {
            lastItem.remove();
            updateCounters();
        }
    } else {
        alert('Нет задач для удаления!');
        return;       
    }
});

let toDoText = '';
todoInput.addEventListener('input', () => {
    toDoText = event.target.value;
});

todoInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        addButton.click();
    }
});

addButton.addEventListener('click', () => {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = false;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            todoItem.classList.add('completed');
        } else {
            todoItem.classList.remove('completed');
        }
        updateCounters();
    });

    const todoContent = document.createElement('div');
    todoContent.className = 'todo-content';

    if (!toDoText) {
        alert('Пожалуйста, введите текст задачи!');
        return;
    }

    const todoTextContainer = document.createElement('div');
    todoTextContainer.className = 'todo-text';
    todoTextContainer.textContent = toDoText;

    const todoDate = document.createElement('div');
    todoDate.className = 'todo-date';
    const currentDate = new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    todoDate.textContent = currentDate;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', function() {
        todoItem.remove();
        updateCounters();
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'img/baskets.png';
    deleteIcon.alt = 'Удалить';
    deleteIcon.style.height = '35px';

    deleteBtn.append(deleteIcon);

    todoContent.append(todoTextContainer);
    todoContent.append(todoDate);

    todoInput.value = '';
    toDoText = '';
    todoInput.focus();

    todoItem.append(checkbox);
    todoItem.append(todoContent);
    todoItem.append(deleteBtn);

    todoList.prepend(todoItem);

    updateCounters();
});

inputSection.append(buttonDeleteAll);
inputSection.append(buttonDeleteLast);
inputSection.append(todoInput);
inputSection.append(addButton);

//Информационная секция
const infoSection = document.createElement('div');
infoSection.className = "info-section";

const allToDo = document.createElement('p');
allToDo.textContent = 'All: ';

const allToDoCount = document.createElement('span');
allToDoCount.className = 'all-count';
allToDoCount.textContent = '0';

const completedToDo = document.createElement('p');
completedToDo.textContent = 'Completed: ';

const completedToDoCount = document.createElement('span');
completedToDoCount.className = 'completed-count';
completedToDoCount.textContent = '0';

const buttonShowAll = document.createElement('button');
buttonShowAll.id = 'show-all';
buttonShowAll.textContent = 'Show All';

const buttonCompleted = document.createElement('button');
buttonCompleted.id = 'completed-all';
buttonCompleted.textContent = 'Show Completed';

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.id = 'searchInput';
searchInput.placeholder = 'Search...';
searchInput.autocomplete = 'off';

infoSection.append(allToDo);
infoSection.append(allToDoCount);
infoSection.append(completedToDo);
infoSection.append(completedToDoCount);
infoSection.append(buttonShowAll);
infoSection.append(buttonCompleted);
infoSection.append(searchInput);

const todoListContainer = document.createElement('div'); 
todoListContainer.className = 'todo-list-container';
todoListContainer.id = 'todoListContainer';

const todoList = document.createElement('ul');
todoList.className = 'todo-list';
todoList.id = 'todoList';

function updateCounters() {
    const allItems = document.querySelectorAll('.todo-item');
    const completedItems = document.querySelectorAll('.todo-item.completed');
    
    allToDoCount.textContent = allItems.length;
    completedToDoCount.textContent = completedItems.length;
}

buttonShowAll.addEventListener('click', () => {
    const items = document.querySelectorAll('.todo-item');
    items.forEach(item => {
        item.style.display = 'flex';
    });
});

buttonCompleted.addEventListener('click', () => {
    const items = document.querySelectorAll('.todo-item');
    items.forEach(item => {
        if (item.classList.contains('completed')) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.todo-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if(searchText === '' || text.includes(searchText)){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

todoListContainer.append(todoList);

appContainer.append(header);
appContainer.append(inputSection);
appContainer.append(infoSection);
appContainer.append(todoListContainer);

root.append(appContainer);