const API_URL = 'https://chat-app-production-8b7b.up.railway.app/api/v1'

const loginButton = document.getElementById('loginButton')
const signupButton = document.getElementById('signupButton')
const registerButton = document.getElementById('register')

const email = document.getElementById('email')
const password = document.getElementById('password')
const forgotPassword = document.getElementById('forgotPassword')

const form = document.getElementById('loginForm')

loginButton.addEventListener('click', () => {
  console.log('login event listner')
  window.location.href = 'https://chat-app-production-8b7b.up.railway.app/'
})

signupButton.addEventListener('click', () => {
  console.log('login event listner')
  window.location.href = 'http://localhost:5000/signup'
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email.value,
      password: password.value,
      loginWith: 'signin',
    })
    localStorage.setItem('user', JSON.stringify(response.data))
    window.location.href =
      'https://chat-app-production-8b7b.up.railway.app/weChat'
  } catch (error) {
    const alertContainer = document.getElementById('alertContainer')
    var alertDiv = document.createElement('div')
    alertDiv.className =
      'alert alert-danger alert-dismissible fade show alertContainerDiv'
    alertDiv.innerHTML = `${error.response.data.msg}`

    var closeButton = document.createElement('button')
    closeButton.type = 'button'
    closeButton.className = 'btn-close alertClose'
    closeButton.setAttribute('data-bs-dismiss', 'alert')

    alertDiv.appendChild(closeButton)
    alertContainer.appendChild(alertDiv)

    closeButton.addEventListener('click', () => {
      alertDiv.remove()
    })

    setTimeout(() => {
      alertDiv.remove()
    }, 5000)
  }
})
