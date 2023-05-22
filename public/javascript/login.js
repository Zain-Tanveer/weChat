const API_URL = 'https://chat-app-production-8b7b.up.railway.app/api/v1'

const loginButton = document.getElementById('loginButton')
const signupButton = document.getElementById('signupButton')

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
  window.location.href =
    'https://chat-app-production-8b7b.up.railway.app/signup'
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
    console.log(error)
    // console.log(error.response.data)
  }

  console.log(`email: ${email.value}, password: ${password.value}`)
})
