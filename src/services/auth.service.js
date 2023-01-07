import axios from "axios";

/**Development server config */
const API_URL = "http://127.0.0.1:5000/api/users/";

const register = (
  email,
  username,
  password,
  firstname,
  middlename,
  lastname,
  address,
  birthday
) => {
  return axios
    .post(
      API_URL + "register",
      {
        email: email,
        username: username,
        password: password,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        address: address,
        birthday: birthday,
        nickname: "",
        civilStatus: "",
        height: "",
        weight: "",
        motherName: "",
        fatherName: "",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response;
    });
};

const login = (username, password) => {
  return axios
    .post(
      API_URL + "login",
      {
        username,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response;
    });
};

const logout = () => {
  return axios
    .post(API_URL + "logout", {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      localStorage.removeItem("user");
      return response;
    });
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
