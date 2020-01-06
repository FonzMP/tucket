export const AuthServices = {
  loginUser,
  signupUser,
  clearStorage
};

function loginUser(user) {
  return fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  });
}

function signupUser(user) {
  return fetch("http://localhost:4000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  });
}

function clearStorage() {
  localStorage.removeItem("tucketUser");
}
