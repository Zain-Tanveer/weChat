const authUser = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { token: "" };
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  axios
    .get(`http://localhost:5000/api/v1/user/getUser`, { headers })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      window.location.href = `error?message=${error.response.data.msg}&code=${error.response.status}`;
    });
};

authUser();
