export const AuthServices = {
  loginUser,
  signupUser,
  setStorage,
  clearStorage,
  getStorage,
  getToken,
};

function loginUser(user) {
  return fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
}

function signupUser(user) {
  return fetch("http://localhost:4000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
}

function setStorage(userDetails) {
  localStorage.setItem(
    "tucketUser",
    JSON.stringify({ user: userDetails.user, token: userDetails.token })
  );
}

function clearStorage() {
  localStorage.removeItem("tucketUser");
}

function getStorage() {
  const tucketUser = JSON.parse(localStorage.getItem("tucketUser"));
  if (!!tucketUser) {
    return tucketUser;
  }
  return null;
}

function getToken() {
  const user = AuthServices.getStorage();
  if (user && user.token) {
    return user.token;
  }
  return null;
}
