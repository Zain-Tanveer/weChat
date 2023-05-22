const authUser = async () => {
  const API_URL = 'https://chat-app-production-8b7b.up.railway.app/api/v1'
  const user = JSON.parse(localStorage.getItem('user')) || { token: '' }
  const headers = {
    Authorization: `Bearer ${user.token}`,
  }

  axios
    .get(`${API_URL}/user/getUser`, { headers })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      window.location.href = `error?message=${error.response.data.msg}&code=${error.response.status}`
    })
}

authUser()
