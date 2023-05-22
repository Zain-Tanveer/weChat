const socket = io('https://chat-app-production-8b7b.up.railway.app/')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.querySelector('.message-container')
const headerDropdown = document.getElementById('header-dropdown')
const headerUser = document.getElementById('header-user')
const headerUsername = document.getElementById('header-username')
const userImage = document.getElementById('user-image')

const user = JSON.parse(localStorage.getItem('user'))
if (!user) {
  window.location.href = `error?message=User not found!&code=404`
}

const username = user.name
headerUsername.innerText = username
userImage.src = user.image || 'uploads/user-icon.png'

const append = (message, position) => {
  const messageElement = document.createElement('div')
  messageElement.classList.add('message')
  messageElement.classList.add(position)

  const textElement = document.createElement('div')
  textElement.classList.add('text')
  messageElement.appendChild(textElement)

  const contentElement = document.createTextNode(message)
  textElement.appendChild(contentElement)

  messageContainer.appendChild(messageElement)

  messageContainer.scrollTop = messageContainer.scrollHeight
}

const appendMessage = (message, name, position) => {
  const messageElement = document.createElement('div')
  messageElement.classList.add('message')
  messageElement.classList.add(position)

  const avatarElement = document.createElement('img')
  avatarElement.src = 'uploads/chat-app-icon.png'
  avatarElement.alt = 'Bot Avatar'
  avatarElement.classList.add('avatar')
  messageElement.appendChild(avatarElement)

  const textElement = document.createElement('div')
  textElement.classList.add('text')
  messageElement.appendChild(textElement)

  const senderNameElement = document.createElement('div')
  senderNameElement.classList.add('sender-name')
  senderNameElement.innerText = name
  textElement.appendChild(senderNameElement)

  const contentElement = document.createTextNode(message)
  textElement.appendChild(contentElement)

  messageContainer.appendChild(messageElement)

  messageContainer.scrollTop = messageContainer.scrollHeight
}

socket.emit('new-user-joined', username)

document.addEventListener('click', (e) => {
  if (!headerDropdown.contains(e.target)) {
    headerUser.classList.remove('header-user-click')
  }
})

headerUser.addEventListener('click', () => {
  headerUser.classList.add('header-user-click')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(message, username, 'user-message')
  socket.emit('send', message)
  messageInput.value = ''

  messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-joined', (name) => {
  append(`${name} joined the chat!`, 'join-left-message')
})

socket.on('user-left', (name) => {
  append(`${name} left the chat!`, 'join-left-message')
})

socket.on('receive', (data) => {
  appendMessage(`${data.message}`, `${data.name}`, 'bot-message')
})
