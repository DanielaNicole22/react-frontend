import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import { login } from "../actions/auth";

/**
 * Login Component
 */
const Login = () => {
  import("../styles/Login.css");
  const form = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * --------------------
   * * Component state
   *  -------------------
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  /**
   * Gets value of the username input field
   */
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    validate("username", username);
  };

  /**
   * Gets value of the password input field
   */
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    validate("password", password);
  };

  /**
   *  Validates name and value of the input field
   */
  const validate = (name, value) => {
    if (!value) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "This field is required!" }));
      return;
    }
    delete error[name];
    setIsValid(Object.assign(isValid, { [name]: true }));
  };

  /**
   * Handles login data and submitting the form
   */
  const handleLogin = (e) => {
    e.preventDefault();

    validate("username", username);
    validate("password", password);

    if (Object.keys(error).length === 0) {
      dispatch(login(username, password))
        .then(() => {
          setShow(false);
        })
        .catch(() => {
          setShow(true);
        });
    }
  };

  /**
   *  Navigate to the steps page if the user already logged in
   */
  if (isLoggedIn) {
    return <Navigate to="/steps" />;
  }

  /**
   *  Navigate to the registration page
   */
  const onClickRegister = () => {
    navigate("/register/");
  };

  /**
   * Gets the corresponding error message
   */
  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  return (
    <Layout hideHeader={false} isLoggedIn={isLoggedIn}>
      <section>
        <div className="login-div container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="/images/login.jpg"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleLogin} ref={form}>
                <p className="text-left h2 mb-5 mx-1 mx-md-4 mt-4">
                  Login Form
                </p>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      isValid?.username
                        ? "is-valid"
                        : isValid.username !== undefined
                        ? "is-invalid"
                        : ""
                    }`}
                    name="username"
                    id="username"
                    value={username}
                    onChange={onChangeUsername}
                  />
                  {getFormErrorMessage("username")}
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control password ${
                      isValid?.password
                        ? "is-valid"
                        : isValid.password !== undefined
                        ? "is-invalid"
                        : ""
                    }`}
                    name="password"
                    id="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                  {getFormErrorMessage("password")}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    id="submit-btn"
                    className="button btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a
                      href=""
                      onClick={onClickRegister}
                      className="link-danger"
                    >
                      Register
                    </a>
                  </p>
                </div>
                <Alert
                  className="alert-message"
                  show={show}
                  variant="danger"
                  onClose={() => setShow(false)}
                  dismissible
                >
                  <p>{message}</p>
                </Alert>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
