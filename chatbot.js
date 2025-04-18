// chatbot.js
let enthusiasmLevel = null;
let chatLog = document.getElementById('chat-log');

function appendMessage(sender, message) {
  let div = document.createElement('div');
  div.classList.add(sender);
  div.innerText = message;
  chatLog.appendChild(div);
}

function handleInput(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  let inputField = document.getElementById('user-input');
  let userMessage = inputField.value.trim();

  if (userMessage === "") return;

  appendMessage('user', userMessage);
  inputField.value = "";

  processMessage(userMessage);
}

function processMessage(message) {
  if (enthusiasmLevel === null) {
    filterEnthusiasm(message);
  } else {
    respondToQuery(message);
  }
}

function filterEnthusiasm(message) {
  // Filter enthusiasm level based on keywords or message tone
  if (message.includes('invest') || message.includes('excited') || message.includes('ready')) {
    enthusiasmLevel = 'high';
    appendMessage('bot', "Great! You're looking for specific investment opportunities. Let's narrow down your choices.");
  } else if (message.includes('explore') || message.includes('interested')) {
    enthusiasmLevel = 'mild';
    appendMessage('bot', "You're still exploring! Let's dive deeper into your options.");
  } else {
    enthusiasmLevel = 'low';
    appendMessage('bot', "It seems like you're just beginning to explore. Feel free to ask questions!");
  }
  showWhatsAppOption();
}

function respondToQuery(message) {
  // Provide predefined answers to common queries
  if (message.toLowerCase().includes("returns")) {
    appendMessage('bot', "Dubai real estate returns vary but can range from 6% to 10% annually.");
  } else if (message.toLowerCase().includes("areas")) {
    appendMessage('bot', "Some top areas for investment in Dubai include Downtown Dubai, Dubai Marina, and Palm Jumeirah.");
  } else {
    appendMessage('bot', "I'm here to assist with any questions. Feel free to ask more!");
  }
  showWhatsAppOption();
}

function showWhatsAppOption() {
  let buttonHTML = '';
  if (enthusiasmLevel === 'high') {
    buttonHTML = `<button onclick="window.location.href='https://wa.me/yourwhatsappnumber'">Connect on WhatsApp</button>`;
  } else {
    buttonHTML = `<button onclick="window.location.href='https://wa.me/yourwhatsappnumber'">Reach us on WhatsApp</button>`;
  }
  appendMessage('bot', buttonHTML);
}
