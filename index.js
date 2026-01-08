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

// ==================== ПЕРВАЯ ЗАДАЧА ====================
const todoItem1 = document.createElement('li');
todoItem1.className = 'todo-item';

const checkbox1 = document.createElement('input');
checkbox1.type = 'checkbox';
checkbox1.className = 'checkbox';
checkbox1.checked = false;

const todoContent1 = document.createElement('div');
todoContent1.className = 'todo-content';

const todoText1 = document.createElement('div');
todoText1.className = 'todo-text';
todoText1.textContent = 'Купить продукты';

const todoDate1 = document.createElement('div');
todoDate1.className = 'todo-date';
const currentDate1 = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});
todoDate1.textContent = currentDate1;

const deleteBtn1 = document.createElement('button');
deleteBtn1.className = 'delete-btn';

const deleteIcon1 = document.createElement('img');
deleteIcon1.src = 'img/baskets.png';
deleteIcon1.alt = 'Удалить';
deleteIcon1.style.height = '35px';

deleteBtn1.append(deleteIcon1);

todoContent1.append(todoText1);
todoContent1.append(todoDate1);

todoItem1.append(checkbox1);
todoItem1.append(todoContent1);
todoItem1.append(deleteBtn1);

// ==================== ВТОРАЯ ЗАДАЧА ====================
const todoItem2 = document.createElement('li');
todoItem2.className = 'todo-item';

const checkbox2 = document.createElement('input');
checkbox2.type = 'checkbox';
checkbox2.className = 'checkbox';
checkbox2.checked = true;

const todoContent2 = document.createElement('div');
todoContent2.className = 'todo-content';

const todoText2 = document.createElement('div');
todoText2.className = 'todo-text';
todoText2.textContent = 'Постирать одежду';
todoItem2.classList.add('completed');

const todoDate2 = document.createElement('div');
todoDate2.className = 'todo-date';
const currentDate2 = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});
todoDate2.textContent = currentDate2;

const deleteBtn2 = document.createElement('button');
deleteBtn2.className = 'delete-btn';

const deleteIcon2 = document.createElement('img');
deleteIcon2.src = 'img/baskets.png';
deleteIcon2.alt = 'Удалить';
deleteIcon2.style.height = '35px';

deleteBtn2.append(deleteIcon2);

todoContent2.append(todoText2);
todoContent2.append(todoDate2);

todoItem2.append(checkbox2);
todoItem2.append(todoContent2);
todoItem2.append(deleteBtn2);

todoList.append(todoItem1);
todoList.append(todoItem2);

todoListContainer.append(todoList);

appContainer.append(header);
appContainer.append(inputSection);
appContainer.append(infoSection);
appContainer.append(todoListContainer);

root.append(appContainer);