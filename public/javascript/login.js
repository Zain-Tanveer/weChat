const API_URL = 'http://localhost:5000/api/v1'

const loginButton = document.getElementById('loginButton')
const signupButton = document.getElementById('signupButton')

const email = document.getElementById('email')
const password = document.getElementById('password')
const forgotPassword = document.getElementById('forgotPassword')

const form = document.getElementById('loginForm')

loginButton.addEventListener('click', () => {
  console.log('login event listner')
  window.location.href = 'http://localhost:5000/'
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
    window.location.href = 'http://localhost:5000/weChat'
  } catch (error) {
    console.log(error)
    // console.log(error.response.data)
  }

  console.log(`email: ${email.value}, password: ${password.value}`)
})
