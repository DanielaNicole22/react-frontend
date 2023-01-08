import axios from "axios";

/**Development server config */
const API_URL = "http://127.0.0.1:5000/api/users/";

/**
 * User registration service that sends request and receives response data using axios
 */
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
        birthPlace: "",
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
      return response.data;
    });
};

/**
 * User login service that sends request and receives response data using axios
 */
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
      return response.data;
    });
};

/**
 * User logout service that removes user items in the localStorage, sends request and receives response data using axios
 */
const logout = () => {
  localStorage.removeItem("user");
  return axios
    .post(API_URL + "logout", {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response;
    });
};

/**
 * Update user data service that sends request and receives response data using axios
 */
const updateUser = (
  user_id,
  nickname,
  civilStatus,
  birthPlace,
  height,
  weight,
  fatherName,
  motherName
) => {
  return axios
    .put(
      API_URL + "update",
      {
        user_id: parseInt(user_id),
        nickname: nickname,
        civilStatus: civilStatus,
        birthPlace: birthPlace,
        height: height,
        weight: weight,
        fatherName: fatherName,
        motherName: motherName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const authServices = {
  register,
  login,
  logout,
  updateUser,
};

export default authServices;
