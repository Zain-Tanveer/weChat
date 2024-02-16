// variables
const FRONTEND_URL = `http://localhost:5000`;

const socket = io(`${FRONTEND_URL}`);

const welcomeMessageHeader = document.getElementById("welcome-message-header");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.querySelector(".message-container");

const dropdownContent = document.getElementById("myDropdown");
const headerUser = document.getElementById("header-user");
const headerUsername = document.getElementById("header-username");
const userImage = document.getElementById("user-image");

const logout = document.getElementById("logout");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = `error?message=User not found!&code=404`;
}

headerUsername.innerText = user.name;
userImage.src = user.image || "uploads/user-icon.png";
welcomeMessageHeader.innerText = `Welcome, ${user.name}!`;

// functions
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(position);

  const textElement = document.createElement("div");
  textElement.classList.add("text");
  messageElement.appendChild(textElement);

  const contentElement = document.createTextNode(message);
  textElement.appendChild(contentElement);

  messageContainer.appendChild(messageElement);

  messageContainer.scrollTop = messageContainer.scrollHeight;
};

const appendMessage = (message, name, image, position) => {
  const lastMessageDiv = messageContainer.lastElementChild;

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(position);

  if (!lastMessageDiv.classList.contains(position)) {
    const avatarElement = document.createElement("img");
    avatarElement.src = image;
    avatarElement.alt = "Bot Avatar";
    avatarElement.classList.add("avatar");
    messageElement.appendChild(avatarElement);
  }

  const textElement = document.createElement("div");
  textElement.classList.add("text");
  messageElement.appendChild(textElement);

  if (!lastMessageDiv.classList.contains(position)) {
    const senderNameElement = document.createElement("div");
    senderNameElement.classList.add("sender-name");
    senderNameElement.innerText = name;
    textElement.appendChild(senderNameElement);
  }

  const contentElement = document.createTextNode(message);
  textElement.appendChild(contentElement);

  if (lastMessageDiv.classList.contains(position)) {
    if (position === "user-message") {
      textElement.style.marginRight = "55px";
    } else if (position === "bot-message") {
      textElement.style.marginLeft = "45px";
    }
  }

  messageContainer.appendChild(messageElement);

  messageContainer.scrollTop = messageContainer.scrollHeight;
};

// event listners
document.addEventListener("click", (e) => {
  if (!headerUser.contains(e.target)) {
    headerUser.classList.remove("header-user-click");
    dropdownContent.style.display = "none";
  }
});

headerUser.addEventListener("click", () => {
  headerUser.classList.add("header-user-click");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
});

logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = `${FRONTEND_URL}`;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const image = user.image || "uploads/user-icon.png";
  appendMessage(message, user.name, image, "user-message");
  socket.emit("send", message);
  messageInput.value = "";

  messageContainer.scrollTop = messageContainer.scrollHeight;
});

// socket configuration
socket.emit("new-user-joined", user);

socket.on("user-joined", (data) => {
  append(`${data.name} joined the chat!`, "join-left-message");
});

socket.on("user-left", (data) => {
  append(`${data.name} left the chat!`, "join-left-message");
});

socket.on("receive", (data) => {
  const image = data.user.image || "uploads/user-icon.png";
  appendMessage(
    `${data.message}`,
    `${data.user.name}`,
    `${image}`,
    "bot-message"
  );
});
