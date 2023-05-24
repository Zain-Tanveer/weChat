// variables
const socket = io('http://localhost:5000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.querySelector('.message-container')

const headerDropdown = document.getElementById('header-dropdown')
const headerUser = document.getElementById('header-user')
const headerUsername = document.getElementById('header-username')
const userImage = document.getElementById('user-image')

const logout = document.getElementById('logout')

const user = JSON.parse(localStorage.getItem('user'))
if (!user) {
  window.location.href = `error?message=User not found!&code=404`
}

headerUsername.innerText = user.name
userImage.src = user.image || 'uploads/user-icon.png'

// functions
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

const appendMessage = (message, position) => {
  const lastMessageDiv = messageContainer.lastElementChild

  const messageElement = document.createElement('div')
  messageElement.classList.add('message')
  messageElement.classList.add(position)

  const textElement = document.createElement('div')
  textElement.classList.add('text')
  messageElement.appendChild(textElement)

  const contentElement = document.createTextNode(message)
  textElement.appendChild(contentElement)

  if (position === 'user-message') {
    textElement.style.marginRight = '55px'
  } else if (position === 'bot-message') {
    textElement.style.marginLeft = '45px'
  }

  if (lastMessageDiv && !lastMessageDiv.classList.contains(position)) {
    if (position === 'user-message') {
      textElement.classList.add('first-message-right')
    } else if (position === 'bot-message') {
      textElement.classList.add('first-message-left')
    }
  }

  messageContainer.appendChild(messageElement)

  messageContainer.scrollTop = messageContainer.scrollHeight
}

// pre loading data
// if (user.inbox_users && user.inbox_users.length > 0) {
//   user.inbox_users.forEach((ibx_user) => {
//     appendMessage('test message', 'bot-message')
//   })
// }

// event listners
document.addEventListener('click', (e) => {
  if (!headerDropdown.contains(e.target)) {
    headerUser.classList.remove('header-user-click')
  }
})

headerUser.addEventListener('click', () => {
  headerUser.classList.add('header-user-click')
})

logout.addEventListener('click', () => {
  localStorage.removeItem('user')
  window.location.href = 'http://localhost:5000/'
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(message, 'user-message')
  socket.emit('send', message)
  messageInput.value = ''

  messageContainer.scrollTop = messageContainer.scrollHeight
})

// socket configuration
socket.emit('new-user-joined', user)

socket.on('user-joined', (data) => {
  append(`${data.name} joined the chat!`, 'join-left-message')
})

socket.on('user-left', (data) => {
  append(`${data.name} left the chat!`, 'join-left-message')
})

socket.on('receive', (data) => {
  appendMessage(`${data.message}`, 'bot-message')
})
