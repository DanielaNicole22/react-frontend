import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  Row,
  Col,
  FloatingLabel,
  Form,
  Button
} from "react-bootstrap";

const Steps = () => {
  import("../styles/Steps.css");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [nickname, setNickname] = useState(user?.nickname || "");
  const [civilStatus, setCivilStatus] = useState(user?.civilStatus || "single");

  const [birthPlace, setBirthPlace] = useState(user?.birthPlace || "");
  const [height, setHeight] = useState(user?.height || "");
  const [weight, setWeight] = useState(user?.weight || "");

  const [fatherName, setFatherName] = useState(user?.fatherName || "");
  const [motherName, setMotherName] = useState(user?.motherName || "");

  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});

  const [counter, setCounter] = useState(0);

  const onClickNextBtn1 = (e) => {
    validateCategory1(e);
  };
  const onClickNextBtn2 = (e) => {
    validateCategory2(e);
  };
  const onClickNextBtn3 = (e) => {
    validateCategory3(e);
  };

  const moveNext = (e) => {
    const current_fs = e.target.parentElement;
    const next_fs = e.target.parentElement.nextElementSibling;
    const nodes = Array.prototype.slice.call(
      document.getElementsByTagName("fieldset")
    );
    document
      .getElementById("progressbar")
      .children[nodes.indexOf(next_fs)].classList.add("active");
    document
      .getElementById("progressbar")
      .children[nodes.indexOf(current_fs)].classList.remove("active");
    next_fs.style.display = "block";
    current_fs.style.display = "none";
  };
  const onClickPreviousBtn = (e) => {
    const current_fs = e.target.parentElement;
    const previous_fs = e.target.parentElement.previousElementSibling;
    const nodes = Array.prototype.slice.call(
      document.getElementsByTagName("fieldset")
    );
    document
      .getElementById("progressbar")
      .children[nodes.indexOf(previous_fs)].classList.add("active");
    document
      .getElementById("progressbar")
      .children[nodes.indexOf(current_fs)].classList.remove("active");
    previous_fs.style.display = "block";
    current_fs.style.display = "none";
  };

  const onChangeNickname = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
    validate("nickname", nickname);
  };

  const onChangeCivilStatus = (e) => {
    const civilStatus = e.target.value;
    setCivilStatus(civilStatus);
    validate("civilStatus", civilStatus);
  };

  const onChangeBirthPlace = (e) => {
    const birthPlace = e.target.value;
    setBirthPlace(birthPlace);
    validate("birthPlace", birthPlace);
  };

  const onChangeHeight = (e) => {
    const height = e.target.value;
    setHeight(height);
    validate("height", height);
  };

  const onChangeWeight = (e) => {
    const weight = e.target.value;
    setWeight(weight);
    validate("weight", weight);
  };

  const onChangeFatherName = (e) => {
    const fatherName = e.target.value;
    setFatherName(fatherName);
    validate("fatherName", fatherName);
  };

  const onChangeMotherName = (e) => {
    const motherName = e.target.value;
    setMotherName(motherName);
    validate("motherName", motherName);
  };

  const validate = (name, value) => {
    if (!value) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "This field is required!" }));
      return;
    }

    if (value.toString().trim() === "") {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(
        Object.assign(error, { [name]: "This field should not be empty" })
      );
      return;
    }

    if (value.length < 2 || value.length > 50) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(
        Object.assign(error, {
          [name]: "Value must be between 2 and 50 characters.",
        })
      );
      return;
    }

    switch (name) {
      case "nickname":
      case "fatherName":
      case "motherName":
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
      default:
      // code block
    }
    delete error[name];
    setIsValid(Object.assign(isValid, { [name]: true }));
  };

  const validateCategory1 = (e) => {
    validate("nickname", nickname);
    validate("civilStatus", civilStatus);
    handleSubmit(e);
  };

  const validateCategory2 = (e) => {
    validate("birthPlace", birthPlace);
    validate("height", height);
    validate("weight", weight);
    handleSubmit(e);
  };

  const validateCategory3 = (e) => {
    validate("fatherName", fatherName);
    validate("motherName", motherName);
    handleSubmit(e);
  };

  const handleSubmit = (e) => {
    setCounter(counter + 1);

    if (Object.keys(error).length === 0) {
      dispatch(
        updateUser(
          user.user_id,
          nickname,
          civilStatus,
          birthPlace,
          height,
          weight,
          fatherName,
          motherName
        )
      )
        .then(() => {
          moveNext(e);
        })
    }
  };

  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  useEffect(() => {
    const nodes = Array.prototype.slice.call(
      document.getElementsByTagName("fieldset")
    );
    let a = 0;
    if (nickname === "" || civilStatus === "") {
      a = 0;
    } else if (birthPlace === "" || height === "" || weight === "") {
      a = 1;
    } else if (fatherName === "" || motherName === "") {
      a = 2;
    } else {
      navigate("/viewProfile/");
    }
    for (let i = 0; i < 4; i++) {
      if (i === a) {
        document
          .getElementById("progressbar")
          .children[a].classList.add("active");
        nodes[a].style.display = "block";
      } else {
        document
          .getElementById("progressbar")
          .children[i].classList.remove("active");
        nodes[i].style.display = "none";
      }
    }
  }, []);

  return (
    <Layout hideHeader={false} isLoggedIn={false}>
      <div className="container">
        {/* <!-- MultiStep Form --> */}
        <div className="container-fluid" id="grad1">
          <div className="row justify-content-center mt-0">
            <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
              <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                <h2>
                  <strong>Additional Info</strong>
                </h2>
                <p>Fill all form field to go to next step</p>
                <div className="row">
                  <div className="col-md-12 mx-0">
                    <form id="msform">
                      {/* <!-- progressbar --> */}
                      <ul id="progressbar">
                        <li className="active" id="personal1">
                          <strong>Personal</strong>
                        </li>
                        <li id="personal2">
                          <strong>Personal</strong>
                        </li>
                        <li id="familybackground">
                          <strong>Family Background</strong>
                        </li>
                        <li id="confirm">
                          <strong>Finish</strong>
                        </li>
                      </ul>
                      {/* <!-- fieldsets --> */}
                      <fieldset>
                        <div className="form-card">
                          <h2 className="fs-title">Personal Information</h2>
                          <Row>
                            <FloatingLabel label="Nickname" className="mb-3">
                              <Form.Control
                                name="nickname"
                                value={nickname}
                                onChange={onChangeNickname}
                                className={
                                  isValid?.nickname
                                    ? "is-valid"
                                    : isValid.nickname !== undefined
                                    ? "is-invalid"
                                    : ""
                                }
                              />
                              {getFormErrorMessage("nickname")}
                            </FloatingLabel>
                          </Row>
                          <Row>
                            <FloatingLabel
                              label="Civil Status"
                              className="mb-3"
                            >
                              <Form.Select
                                aria-label="Civil Status"
                                name="civilStatus"
                                value={civilStatus}
                                onChange={onChangeCivilStatus}
                              >
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                              </Form.Select>
                              {getFormErrorMessage("civilStatus")}
                            </FloatingLabel>
                          </Row>
                        </div>
                        <input
                          type="button"
                          onClick={onClickNextBtn1}
                          name="next"
                          className="next action-button"
                          value="Next Step"
                        />
                      </fieldset>
                      <fieldset>
                        <div className="form-card">
                          <h2 className="fs-title">Personal Information</h2>
                          <Row>
                            <FloatingLabel
                              label="Place of Birth"
                              className="mb-3"
                            >
                              <Form.Control
                                name="birthPlace"
                                value={birthPlace}
                                onChange={onChangeBirthPlace}
                                className={
                                  isValid?.birthPlace
                                    ? "is-valid"
                                    : isValid.birthPlace !== undefined
                                    ? "is-invalid"
                                    : ""
                                }
                              />
                              {getFormErrorMessage("birthPlace")}
                            </FloatingLabel>
                          </Row>
                          <Row>
                            <Col>
                              <FloatingLabel
                                label="Height (m)"
                                className="mb-3"
                              >
                                <Form.Control
                                  name="height"
                                  value={height}
                                  onChange={onChangeHeight}
                                  className={
                                    isValid?.height
                                      ? "is-valid"
                                      : isValid.height !== undefined
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {getFormErrorMessage("height")}
                              </FloatingLabel>
                            </Col>
                            <Col>
                              <FloatingLabel
                                label="Weight (kg)"
                                className="mb-3"
                              >
                                <Form.Control
                                  name="weight"
                                  value={weight}
                                  onChange={onChangeWeight}
                                  className={
                                    isValid?.weight
                                      ? "is-valid"
                                      : isValid.weight !== undefined
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {getFormErrorMessage("weight")}
                              </FloatingLabel>
                            </Col>
                          </Row>
                        </div>
                        <input
                          type="button"
                          name="previous"
                          onClick={onClickPreviousBtn}
                          className="previous action-button-previous"
                          value="Previous"
                        />
                        <input
                          type="button"
                          name="next"
                          onClick={onClickNextBtn2}
                          className="next action-button"
                          value="Next Step"
                        />
                      </fieldset>
                      <fieldset>
                        <div className="form-card">
                          <h2 className="fs-title">Family Background</h2>
                          <Row>
                            <FloatingLabel label="Father Name" className="mb-3">
                              <Form.Control
                                name="fatherName"
                                value={fatherName}
                                onChange={onChangeFatherName}
                                className={
                                  isValid?.fatherName
                                    ? "is-valid"
                                    : isValid.fatherName !== undefined
                                    ? "is-invalid"
                                    : ""
                                }
                              />
                              {getFormErrorMessage("fatherName")}
                            </FloatingLabel>
                          </Row>
                          <Row>
                            <FloatingLabel label="Mother Name" className="mb-3">
                              <Form.Control
                                name="motherName"
                                value={motherName}
                                onChange={onChangeMotherName}
                                className={
                                  isValid?.motherName
                                    ? "is-valid"
                                    : isValid.motherName !== undefined
                                    ? "is-invalid"
                                    : ""
                                }
                              />
                              {getFormErrorMessage("motherName")}
                            </FloatingLabel>
                          </Row>
                        </div>
                        <input
                          type="button"
                          name="previous"
                          onClick={onClickPreviousBtn}
                          className="previous action-button-previous"
                          value="Previous"
                        />
                        <input
                          type="button"
                          name="next"
                          onClick={onClickNextBtn3}
                          className="next action-button"
                          value="Confirm"
                        />
                      </fieldset>
                      <fieldset>
                        <div className="form-card">
                          <h2 className="fs-title text-center">Success !</h2>
                          <br />
                          <br />
                          <div className="row justify-content-center">
                            <div className="col-3">
                              <img
                                src="https://img.icons8.com/color/96/000000/ok--v2.png"
                                className="fit-image"
                                alt="checkmark"
                              />
                            </div>
                          </div>
                          <br />
                          <br />
                          <div className="row justify-content-center">
                            <div className="col-7 text-center">
                              <h5>You can now proceed to the next page!</h5>
                            </div>
                            <Button
                              type="submit"
                              className="button btn btn-primary btn-lg"
                            >
                              Proceed
                            </Button>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Steps;
