let todos = [];
let currentItem = 0;
let userId = 0;
const getTodosBtn = document.getElementById('getTodosBtn');
const clearBtn = document.getElementById('clearBtn');
const createTodoBtn = document.getElementById('createTodoBtn');
const todosList = document.getElementById('todosList');
const loading = document.getElementById('loading');
const currentItemTitle = document.getElementById('currentItems');

const postBtn = document.getElementById('postBtn');
const putBtn = document.getElementById('putBtn');
const patchBtn = document.getElementById('patchBtn');
const deleteBtn = document.getElementById('deleteBtn');

const apiResult = document.getElementById('api-result');
const resultContent = document.getElementById('result-content');

function getTodos() {
    showLoading(true);

    fetch('https://jsonplaceholder.typicode.com/todos', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => {
        return response.json();            
    })
    .then((data) => {
        todos = data;
        currentItem = 0;
        printTodos(todos.slice(currentItem, currentItem + 10));
        showApiResult(`Получено get-задач: ${data.length}`);
    })
    .catch((err) => {
        console.log('Oops!', err);
        showApiResult(`Ошибка get!`);
        showLoading(false);
    });
}

function createPostTodo() {
    showLoading(true);

    const newPostData = {
        title: 'Новый пост POST',
        body: 'Этот пост был создан через POST запрос.',
        userId: userId,
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPostData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((postData) => {        
        const item = document.createElement('li');
        item.className = 'todo-item post-item';
        
        const itemId = document.createElement('div');
        itemId.className = 'todo-id post-id';
        itemId.textContent = postData.id;

        const contentItem = document.createElement('div');
        contentItem.className = 'todo-content';

        const titleItem = document.createElement('p');
        titleItem.className = 'todo-title';
        titleItem.textContent = postData.title;

        const userIdItem = document.createElement('p');
        userIdItem.className = 'todo-user-id';
        userIdItem.textContent = `User ID: ${postData.userId}`;

        const bodyItem = document.createElement('p');
        bodyItem.className = 'todo-body';
        bodyItem.textContent = postData.body;

        contentItem.append(titleItem);
        contentItem.append(userIdItem);
        contentItem.append(bodyItem);

        item.append(itemId);
        item.append(contentItem);

        todosList.prepend(item);

        const newTodo = {
            id: postData.id,
            title: postData.title,
            completed: false,
            userId: postData.userId,
            body: postData.body
        };
        
        todos.unshift(newTodo);
        
        updateCounter();
        
        showLoading(false);
        showApiResult(`Создан пост с ID: ${postData.id}`);
        
    })
    .catch((err) => {
        console.log('Oops!', err);
        showApiResult(`Ошибка POST!`);
        showLoading(false);
    });
}

function updatePutTodo() {
    if (todos.length === 0) {
        showApiResult('Нет задач!');
        return;
    }
    
    showLoading(true);

    const updatedPost = {
        id: 1,
        title: 'Полностью обновленный пост через PUT',
        body: 'Этот пост полностью обновлен через PUT запрос.',
        userId: 1
    };

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify(updatedPost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const todoItems = document.querySelectorAll('.todo-item');
        
        if (todoItems.length > 0) {
            const firstTodo = todoItems[0];
            
            const todoId = firstTodo.querySelector('.todo-id');
            const todoTitle = firstTodo.querySelector('.todo-title');
            const todoBody = firstTodo.querySelector('.todo-body');
            
            if (todoId) {
                todoId.textContent = data.id;
                todoId.className = 'todo-id put-id';
            }
            
            if (todoTitle) {
                todoTitle.textContent = data.title;
            }
            
            if (todoBody) {
                todoBody.textContent = data.body;
            }
            
            firstTodo.className = 'todo-item put-item';
        }
        
        if (todos.length > 0) {
            todos[0] = {
                id: data.id,
                title: data.title,
                completed: false,
                userId: data.userId,
                body: data.body
            };
        }
        
        showLoading(false);
        showApiResult(`PUT запрос успешен!`);
        
    })
    .catch((err) => {
        console.log('Oops!', err);
        showApiResult(`Ошибка PUT!`);
        showLoading(false);
    });
}

function updatePatchTodo() {
    if (todos.length === 0) {
        showApiResult('Нет задач!');
        return;
    }
    
    showLoading(true);

    const patchData = {
        title: 'Частично обновленный пост через PATCH'
    };

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        body: JSON.stringify(patchData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('PATCH ответ:', data);
        
        const todoItems = document.querySelectorAll('.todo-item');
        
        if (todoItems.length > 0) {
            const firstTodo = todoItems[0];
            
            const todoId = firstTodo.querySelector('.todo-id');
            const todoTitle = firstTodo.querySelector('.todo-title');
            
            if (todoId) {
                todoId.className = 'todo-id patch-id';
            }
            
            if (todoTitle) {
                todoTitle.textContent = data.title;
            }
            
            if (firstTodo.classList.contains('post-item')) {
                firstTodo.classList.add('patch-item');
            } else if (firstTodo.classList.contains('put-item')) {
                firstTodo.classList.add('patch-item');
            }
        }
        
        if (todos.length > 0) {
            todos[0] = {
                ...todos[0],
                title: data.title
            };
        }
        
        showLoading(false);
        showApiResult(`PATCH запрос успешен!`);
        
    })
    .catch((err) => {
        console.log('Oops!', err);
        showApiResult(`Ошибка PATCH!`);
        showLoading(false);
    });
}

function deleteTodo() {
    if (todos.length === 0) {
        showApiResult('Нет данных для удаления!');
        return;
    }
    
    showLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(() => {
        const todoItems = document.querySelectorAll('.todo-item');
        
        if (todoItems.length > 0) {
            const firstTodo = todoItems[0];
            firstTodo.style.animation = 'fadeOut 0.5s ease';
            
            setTimeout(() => {
                todosList.removeChild(firstTodo);
                
                todos.shift();
                
                updateCounter();
                
                if (todos.length === 0) {
                    currentItemTitle.textContent = '0 of 0';
                }
                
                showLoading(false);
                showApiResult(`DELETE запрос успешен!`);
            }, 500);
        }
    })
    .catch((err) => {
        console.log('Oops!', err);
        showApiResult(`Ошибка DELETE!`);
        showLoading(false);
    });
}

function printTodos(todosArray) {    
    showLoading(false);
    todosList.innerHTML = '';

    todosArray.forEach(todo => {
        const item = document.createElement('li');
        item.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        const itemId = document.createElement('div');
        itemId.className = 'todo-id';
        itemId.textContent = todo.id;

        const contentItem = document.createElement('div');
        contentItem.className = 'todo-content';

        const titleItem = document.createElement('p');
        titleItem.className = 'todo-title';
        titleItem.textContent = todo.title;

        const statusItem = document.createElement('span');
        statusItem.className = `todo-status ${todo.completed ? 'completed' : 'pending'}`;
        statusItem.textContent = todo.completed ? '✅ Completed' : '⏳ Pending';

        contentItem.append(titleItem);
        contentItem.append(statusItem);

        item.append(itemId);
        item.append(contentItem);

        todosList.append(item);        
    });
  
    updateCounter();
}

function updateCounter() {
    const start = currentItem + 1;
    const end = Math.min(currentItem + 10, todos.length);
    currentItemTitle.textContent = `${start}–${end} of ${todos.length}`;
}

function showLoading(isLoading) {
    loading.style.display = isLoading ? 'block' : 'none';
    todosList.style.display = isLoading ? 'none' : 'grid';
}

function showApiResult(message) {
    apiResult.style.display = 'block';
    resultContent.textContent = message;
    
    setTimeout(() => {
        apiResult.style.display = 'none';
    }, 10000);
}

function initEventListeners() {
    if (getTodosBtn) {
        getTodosBtn.addEventListener('click', getTodos);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearTodos);
    }
    
    if (createTodoBtn) {
        createTodoBtn.addEventListener('click', loadMoreTodos);
    }

    if (postBtn) {
        postBtn.addEventListener('click', createPostTodo);
    }
    
    if (putBtn) {
        putBtn.addEventListener('click', updatePutTodo);
    }
    
    if (patchBtn) {
        patchBtn.addEventListener('click', updatePatchTodo);
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteTodo);
    }
}

function clearTodos() {
    todos = [];
    currentItem = 0;
    todosList.innerHTML = '';
    currentItemTitle.textContent = '0 of 0';
    showApiResult('Список очищен');
}

function loadMoreTodos() {
    if (todos.length === 0) {
        showApiResult('Сначала загрузите задачи!');
        return;
    }

    if (currentItem + 10 >= todos.length) {
        showApiResult('Все задачи уже загружены!');
        return;
    }

    currentItem += 10;
    printTodos(todos.slice(currentItem, currentItem + 10));
}

document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    getTodos();
});
