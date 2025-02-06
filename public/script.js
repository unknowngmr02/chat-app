// Connect to WebSocket server
const socket = io('https://temp-chatting-server.onrender.com'); // Make sure this matches your backend

let username = '';

// Function to set username
function setUsername() {
  username = document.getElementById('usernameInput').value.trim();
  
  if (!username) {
    alert('Please enter a username.');
    return;
  }

  // Send username to server
  socket.emit('set username', username);
  document.getElementById('usernameInput').disabled = true;
}

// Function to send messages
function sendMessage() {

    
    if (!username) {
        setUsername(); // Calls `setUsername` if not already set
        return; // Prevents sending message before username is set
      }


  //above setting username after every send message 

  // --------------------------------------------------------------------------------------------------
  const message = document.getElementById('messageInput').value.trim();

  if (!message) {
    alert('Message cannot be empty!');
    return;
  }

  // Send message along with the stored username
  socket.emit('chat message', { username, text: message });

  // Clear input field
  document.getElementById('messageInput').value = '';
}

// Listen for incoming messages
socket.on('chat message', (msg) => {
  console.log('Message received:', msg); // Debugging log

  // Create a new list item
  const item = document.createElement('li');
  item.textContent = `[${msg.username}]: ${msg.text}`;
  document.getElementById('messages').appendChild(item);
});
