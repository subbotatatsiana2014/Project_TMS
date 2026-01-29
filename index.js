const postsIds = [15, 23, 7, 3];
let currentMethod = 'async';
let posts = [];

const postsList = document.getElementById('postsList');
const postsCounter = document.getElementById('postsCounter');
const loading = document.getElementById('loading');
const loadPostsBtn = document.getElementById('loadPostsBtn');
const methodToggleBtn = document.getElementById('methodToggleBtn');
const clearBtn = document.getElementById('clearBtn');
const methodIndicator = document.getElementById('methodIndicator');

async function loadWithAsyncAwait() {
    for (const postId of postsIds) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const post = await response.json();
            printPost(post);
        } catch (error) {
            showError(postId, error.message);
        }
    }
}

function loadWithPromiseChain() {
    let promiseChain = Promise.resolve();
    
    postsIds.forEach(postId => {
        promiseChain = promiseChain
            .then(() => fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`))
            .then(response => {
                return response.json();
            })
            .then(post => printPost(post))
            .catch(error => {
                showError(postId, error.message);
            });
    });
    
    return promiseChain;
}

async function loadPosts() {
    showLoading(true);
    clearPosts();
    
    try {
        if (currentMethod === 'async') {
            await loadWithAsyncAwait();
        } else {
            await loadWithPromiseChain();
        }
    } catch (error) {
        alert(`Ошибка загрузки: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

function printPost(post) {
    posts.push(post);

    const postItem = document.createElement('li');
    postItem.className = 'post-item';
    
    postItem.innerHTML = `
        <div class="post-id">${post.id}</div>
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <div class="post-user-id">User ID: ${post.userId}</div>
            <p class="post-body">${post.body}</p>
            <span class="post-status">Post #${post.id}</span>
        </div>
    `;
    
    postsList.appendChild(postItem);
    updateCounter();
}

function showError(postId, errorMessage) {
    const errorItem = document.createElement('li');
    errorItem.className = 'post-item error';
    
    errorItem.innerHTML = `
        <div class="post-id">${postId}</div>
        <div class="post-content">
            <h3 class="post-title">Ошибка загрузки поста ${postId}</h3>
            <p class="error-message">${errorMessage}</p>
            <span class="post-status" style="background:#fadbd8;color:#c0392b;">Ошибка</span>
        </div>
    `;
    
    postsList.appendChild(errorItem);
    updateCounter(); 
}

function updateCounter() {
    postsCounter.textContent = `${posts.length} из ${postsIds.length}`;
}

function clearPosts() {
    posts = [];
    postsList.innerHTML = '';
    updateCounter();
}

function showLoading(show) {
    loading.style.display = show ? 'flex' : 'none';
    postsList.style.display = show ? 'none' : 'grid';

    if (methodIndicator) {
        methodIndicator.textContent = show 
            ? `Метод: ${currentMethod === 'async' ? 'Async/Await' : 'Promise Chain'}` 
            : '';
    }
}

function toggleMethod() {
    currentMethod = currentMethod === 'async' ? 'promise' : 'async';
    
    if (currentMethod === 'async') {
        loadPostsBtn.innerHTML = 'Загрузить посты (Async/Await)';
        methodToggleBtn.innerHTML = 'Переключить на Promise Chain';
    } else {
        loadPostsBtn.innerHTML = 'Загрузить посты (Promise Chain)';
        methodToggleBtn.innerHTML = 'Переключить на Async/Await';
    }
}

function setupEventListeners() {
    if (loadPostsBtn) {
        loadPostsBtn.addEventListener('click', loadPosts);
    }
    
    if (methodToggleBtn) {
        methodToggleBtn.addEventListener('click', toggleMethod);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearPosts);
    }
}

function initApp() {
    setupEventListeners();
    toggleMethod();
    updateCounter();
}

document.addEventListener('DOMContentLoaded', initApp);