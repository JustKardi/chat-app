// script.js
const socket = io();

const sendContainer = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

sendContainer.addEventListener('submit', function(e) {
    e.preventDefault();
    if (messageInput.value) {
        socket.emit('chat-message', messageInput.value);
        messageInput.value = '';
    }
});

socket.on('chat-message', function(msg) {
    const item = document.createElement('div');
    item.textContent = msg;
    messageContainer.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
