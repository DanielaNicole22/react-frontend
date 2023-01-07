import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../actions/auth";
import Layout from "./layout/Layout";
import { Navigate } from "react-router-dom";
import {
  Spinner,
  Alert,
  Card,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Register = () => {
  import("../styles/Register.css");
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    validate("email", email);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    validate("username", username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    validate("password", password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    validate("confirmPassword", confirmPassword);
  };

  const onChangeFirstName = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
    validate("firstname", firstname);
  };

  const onChangeMiddleName = (e) => {
    const middlename = e.target.value;
    setMiddleName(middlename);
    validate("middlename", middlename);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
    validate("lastname", lastname);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
    validate("address", address);
  };

  const onChangeBirthday = (e) => {
    const birthday = e.target.value;
    setBirthday(birthday);
    validate("birthday", birthday);
  };

  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});

  const validate = (name, value) => {
    if (!value && name != "middlename") {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "This field is required!" }));
      return;
    }

    if (value.toString().trim() == "" && name !== "middlename") {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(
        Object.assign(error, { [name]: "This field should not be empty" })
      );
      return;
    }

    if (
      name !== "password" &&
      name !== "confirmPassword" &&
      name !== "address" &&
      name !== "middlename" &&
      (value.length < 2 || value.length > 50)
    ) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(
        Object.assign(error, {
          [name]: "Value must be between 2 and 50 characters.",
        })
      );
      return;
    }

    switch (name) {
      case "firstname":
      case "lastname":
        setIsValid(Object.assign(isValid, { [name]: false }));
        if (!/^[ña-z .'-]+$/i.test(value)) {
          setError(
            Object.assign(error, {
              [name]: "Numbers and special characters not allowed except .'-",
            })
          );
          return;
        }
        break;
      case "email":
        setIsValid(Object.assign(isValid, { [name]: false }));
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setError(
            Object.assign(error, { [name]: "This is not a valid email." })
          );
          return;
        }
        break;
      case "password":
        setIsValid(Object.assign(isValid, { [name]: false }));
        const validatePassword = new RegExp(
          "^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}"
        ); // Minimum eight characters, at least one letter, one number, and one symbol
        const validatePassword2 = new RegExp("[^A-Za-z 0-9]");
        if (
          validatePassword.test(value) === false ||
          validatePassword2.test(value) === false
        ) {
          setError(
            Object.assign(error, {
              [name]:
                "The Password must be minimum eight characters, at least one letter, one number, and one symbol",
            })
          );
          return;
        }
        break;
      case "confirmPassword":
        setIsValid(Object.assign(isValid, { [name]: false }));
        if (value !== password) {
          setError(
            Object.assign(error, {
              [name]: "The confirm password does not match the password.",
            })
          );
          return;
        }
        break;
      case "address":
        setIsValid(Object.assign(isValid, { [name]: false }));
        if (value.length < 2 || value.length > 200) {
          setError(
            Object.assign(error, {
              [name]: "Value must be between 2 and 200 characters.",
            })
          );
          return;
        }
        break;
      default:
      // code block
    }
    delete error[name];
    setIsValid(Object.assign(isValid, { [name]: true }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    validate("email", email);
    validate("username", username);
    validate("password", password);
    validate("confirmPassword", confirmPassword);
    validate("firstname", firstname);
    validate("middlename", middlename);
    validate("lastname", lastname);
    validate("address", address);
    validate("birthday", birthday);
    validate("address", address);

    setCounter(counter + 1);

    if (Object.keys(error).length === 0) {
      setLoading(true);
      dispatch(
        register(
          email,
          username,
          password,
          firstname,
          middlename,
          lastname,
          address,
          birthday
        )
      )
        .then(() => {
          dispatch(login(username, password));
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        })
        .finally(() => {
          setShow(true);
          setLoading(false);
        });
    }
  };

  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  if (isLoggedIn) {
    return <Navigate to="/steps" />;
  }

  return (
    <>
      <Layout hideHeader={false} isLoggedIn={false}>
        <section className="register-section">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-lg-12 col-xl-12 order-2 order-lg-1">
                        <div className="row">
                          <p className="text-left h2 mb-5 mx-1 mx-md-4 mt-4">
                            Registration Form
                          </p>
                        </div>
                        <>
                          <form
                            className="row mx-1 mx-md-4"
                            onSubmit={handleRegister}
                            ref={form}
                          >
                            <Row>
                              <Col>
                                <FloatingLabel
                                  label="First Name"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="firstname"
                                    value={firstname}
                                    onChange={onChangeFirstName}
                                    className={
                                      isValid?.firstname
                                        ? "is-valid"
                                        : isValid.firstname !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("firstname")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Middle Name"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="middlename"
                                    value={middlename}
                                    onChange={onChangeMiddleName}
                                    className={
                                      isValid?.middlename
                                        ? "is-valid"
                                        : isValid.middlename !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("middlename")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Last Name"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChangeLastName}
                                    className={
                                      isValid?.lastname
                                        ? "is-valid"
                                        : isValid.lastname !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("lastname")}
                                </FloatingLabel>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FloatingLabel
                                  label="Address"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="address"
                                    value={address}
                                    onChange={onChangeAddress}
                                    className={
                                      isValid?.address
                                        ? "is-valid"
                                        : isValid.address !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("address")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Birthday"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="birthday"
                                    type="date"
                                    value={birthday}
                                    onChange={onChangeBirthday}
                                    className={
                                      isValid?.birthday
                                        ? "is-valid"
                                        : isValid.birthday !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("birthday")}
                                </FloatingLabel>
                              </Col>
                            </Row>
                            <Row>
                              <Form.Label>Account</Form.Label>
                              <Col>
                                <FloatingLabel
                                  label="Official Email Address"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    className={
                                      isValid?.email
                                        ? "is-valid"
                                        : isValid.email !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("email")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Username"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    className={
                                      isValid?.username
                                        ? "is-valid"
                                        : isValid.username !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("username")}
                                </FloatingLabel>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FloatingLabel
                                  label="Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    className={
                                      isValid?.password
                                        ? "is-valid"
                                        : isValid.password !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("password")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Confirm Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChangeConfirmPassword}
                                    className={
                                      isValid?.confirmPassword
                                        ? "is-valid"
                                        : isValid.confirmPassword !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("confirmPassword")}
                                </FloatingLabel>
                              </Col>
                            </Row>

                            <Button
                              type="submit"
                              className="button btn btn-primary btn-lg"
                            >
                              Register
                              {loading && (
                                <Spinner
                                  className="spinner"
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                            </Button>
                            <input
                              type="hidden"
                              name="counter"
                              value={counter}
                              style={{ display: "block" }}
                              ref={checkBtn}
                            />
                          </form>
                        </>

                        {message && (
                          <div className="form-group">
                            <Alert
                              className="alert-message"
                              show={show}
                              variant={successful ? "success" : "danger"}
                              onClose={() => setShow(false)}
                              dismissible
                            >
                              <p>{message}</p>
                            </Alert>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Register;
