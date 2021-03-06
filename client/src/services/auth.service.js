export const AuthServices = {
  loginUser,
  signupUser,
  setStorage,
  clearStorage,
  getStorage,
  getToken,
  getUserID,
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
  localStorage.setItem("tucketUser", JSON.stringify(userDetails));
}

function clearStorage() {
  localStorage.removeItem("tucketUser");
}

function getStorage() {
  const tucketUser = JSON.parse(localStorage.getItem("tucketUser"));
  console.log("tucket user ", tucketUser);
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

function getUserID() {
  const { user } = AuthServices.getStorage();
  if (user && user._id) {
    return user._id;
  }
  return null;
}
