export const AuthServices = {
  loginUser,
  signupUser,
  setStorage,
  clearStorage,
  getStorage
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

function setStorage(userDetails) {
  localStorage.setItem("tucketUser", JSON.stringify(userDetails));
}

function clearStorage() {
  localStorage.removeItem("tucketUser");
}

function getStorage() {
  return JSON.parse(localStorage.getItem("tucketUser"));
}
