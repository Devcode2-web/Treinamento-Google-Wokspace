const openChat = document.getElementById("openChat");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");

openChat.addEventListener("click", () => {
  console.log("Botão de abrir chat clicado");
  chatBox.style.display = "flex";
});

closeChat.addEventListener("click", () => {
  console.log("Botão de fechar chat clicado");
  chatBox.style.display = "none";
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  console.log("Frontend: Enviando pergunta:", text);
  addMessage(text, "user");
  userInput.value = "";
  setChatLoading(true);

  try {
    const response = await fetch("http://localhost:8080/chat", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text }),
    });

    const data = await response.json();
    addMessage(data.answer, "bot");

  } catch (error) {
    console.error("Frontend: Erro ao comunicar com backend:", error);
    addMessage("Erro ao conectar com o servidor. Tente novamente.", "bot");
  } finally {
    setChatLoading(false);
  }
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.textContent = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function setChatLoading(isLoading) {
  userInput.disabled = isLoading;
  sendBtn.disabled = isLoading;

  let loadingMsg = document.querySelector(".msg.loading");

  if (isLoading) {
    if (!loadingMsg) {
      loadingMsg = document.createElement("div");
      loadingMsg.classList.add("msg", "loading");
      loadingMsg.textContent = "Digitando...";
      messagesDiv.appendChild(loadingMsg);
    }
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } else {
    if (loadingMsg) {
      messagesDiv.removeChild(loadingMsg);
    }
  }
}
