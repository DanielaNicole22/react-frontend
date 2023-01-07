import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activate } from "../actions/auth";
import Layout from "./layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
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

const Steps = (props) => {
  import("../styles/Steps.css");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [civilStatus, setCivilStatus] = useState("");

  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");

  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});

  const onClickNextBtn = (e) => {
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

  // $(document).ready(function(){

  //   var current_fs, next_fs, previous_fs; //fieldsets
  //   var opacity;

  //   $(".next").click(function(){

  //       current_fs = $(this).parent();
  //       next_fs = $(this).parent().next();

  //       //Add Class Active
  //       $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //       //show the next fieldset
  //       next_fs.show();
  //       //hide the current fieldset with style
  //       current_fs.animate({opacity: 0}, {
  //           step: function(now) {
  //               // for making fielset appear animation
  //               opacity = 1 - now;

  //               current_fs.css({
  //                   'display': 'none',
  //                   'position': 'relative'
  //               });
  //               next_fs.css({'opacity': opacity});
  //           },
  //           duration: 600
  //       });
  //   });

  //   $(".previous").click(function(){

  //       current_fs = $(this).parent();
  //       previous_fs = $(this).parent().prev();

  //       //Remove class active
  //       $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

  //       //show the previous fieldset
  //       previous_fs.show();

  //       //hide the current fieldset with style
  //       current_fs.animate({opacity: 0}, {
  //           step: function(now) {
  //               // for making fielset appear animation
  //               opacity = 1 - now;

  //               current_fs.css({
  //                   'display': 'none',
  //                   'position': 'relative'
  //               });
  //               previous_fs.css({'opacity': opacity});
  //           },
  //           duration: 600
  //       });
  //   });

  //   $('.radio-group .radio').click(function(){
  //       $(this).parent().find('.radio').removeClass('selected');
  //       $(this).addClass('selected');
  //   });

  //   $(".submit").click(function(){
  //       return false;
  //   })

  //   });

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

  const onChangePlaceOfBirth = (e) => {
    const placeOfBirth = e.target.value;
    setPlaceOfBirth(placeOfBirth);
    validate("placeOfBirth", placeOfBirth);
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

    if (value.toString().trim() == "") {
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

  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  return (
    <Layout hideHeader={false} isLoggedIn={false}>
      <div className="container">
        {/* <!-- MultiStep Form --> */}
        <div className="container-fluid" id="grad1">
          <div className="row justify-content-center mt-0">
            <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
              <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                <h2>
                  <strong>Sign Up Your User Account</strong>
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
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Nickname"
                              className="mb-3"
                            >
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
                          onClick={onClickNextBtn}
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
                              controlId="floatingInput"
                              label="Place of Birth"
                              className="mb-3"
                            >
                              <Form.Control
                                name="placeOfBirth"
                                value={placeOfBirth}
                                type="date"
                                onChange={onChangePlaceOfBirth}
                                className={
                                  isValid?.placeOfBirth
                                    ? "is-valid"
                                    : isValid.placeOfBirth !== undefined
                                    ? "is-invalid"
                                    : ""
                                }
                              />
                              {getFormErrorMessage("placeOfBirth")}
                            </FloatingLabel>
                          </Row>
                          <Row>
                            <Col>
                              <FloatingLabel
                                controlId="floatingInput"
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
                                controlId="floatingInput"
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
                          onClick={onClickNextBtn}
                          className="next action-button"
                          value="Next Step"
                        />
                      </fieldset>
                      <fieldset>
                        <div className="form-card">
                          <h2 className="fs-title">Family Background</h2>
                          <Row>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Father Name"
                              className="mb-3"
                            >
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
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Mother Name"
                              className="mb-3"
                            >
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
                          name="make_payment"
                          onClick={onClickNextBtn}
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
                              />
                            </div>
                          </div>
                          <br />
                          <br />
                          <div className="row justify-content-center">
                            <div className="col-7 text-center">
                              <h5>You Have Successfully Signed Up</h5>
                            </div>
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
