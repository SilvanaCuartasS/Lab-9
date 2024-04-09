const render = () => {
    const user1SelectorBtn = document.querySelector("#user1-selector");
    const user2SelectorBtn = document.querySelector("#user2-selector");
    const chatHeader = document.querySelector(".chat-header");
    const chatMessages = document.querySelector(".chat-messages");
    const chatInputForm = document.querySelector(".chat-input-form");
    const chatInput = document.querySelector(".chat-input");
    const clearChatBtn = document.querySelector(".clear-chat-button");
  
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const createChatMessageElement = (message) => `
    <div class="message ${
        message.sender === "Usuario 1" ? "blue-bg" : "gray-bg"
      }"> 
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
      </div>
      `;
      messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
      });
  
    let messageSender = "Usuario 1";
  
    const updateMessageSender = (name) => {
      messageSender = name;
      chatHeader.innerText = `${messageSender} esta escribiendo...`;
      chatInput.placeholder = `Escriba aquí, ${messageSender}`;
  
      if (name === "Usuario 1") {
        user1SelectorBtn.classList.add("active-person");
        user2SelectorBtn.classList.remove("active-person");
      }
      if (name === "Usuario 2") {
        user1SelectorBtn.classList.remove("active-person");
        user2SelectorBtn.classList.add("active-person");
      }
  
      chatInput.focus();
    };
  
    user1SelectorBtn.onclick = () => updateMessageSender("Usuario 1");
    user2SelectorBtn.onclick = () => updateMessageSender("Usuario 2");
  
    const sendMessage = (e) => {
      e.preventDefault();
  
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
      };
  
      messages.push(message);
      localStorage.setItem("messages", JSON.stringify(messages));
      chatMessages.innerHTML += createChatMessageElement(message);
  
      chatInputForm.reset();
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };
  
    chatInputForm.addEventListener("submit", sendMessage);
  
    clearChatBtn.addEventListener("click", () => {
      localStorage.clear();
      chatMessages.innerHTML = "";
    });
  };
  
  document.addEventListener("DOMContentLoaded", render);