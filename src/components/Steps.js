import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activate } from "../actions/auth";
import Layout from "./layout/Layout";

const Steps = (props) => {
  import("../styles/Steps.css");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHome = () => {
    navigate("/");
  };

  const onClickNextBtn = (e) => {
    const current_fs = e.target.parentElement
    const next_fs = e.target.parentElement.nextElementSibling
    const nodes = Array.prototype.slice.call(document.getElementsByTagName('fieldset'));
    document.getElementById("progressbar").children[nodes.indexOf(next_fs)].classList.add("active")
    document.getElementById("progressbar").children[nodes.indexOf(current_fs)].classList.remove("active")
    next_fs.style.display = "block";
    current_fs.style.display = "none";
  };

  const onClickPreviousBtn = (e) => {
    const current_fs = e.target.parentElement
    const previous_fs = e.target.parentElement.previousElementSibling
    const nodes = Array.prototype.slice.call(document.getElementsByTagName('fieldset'));
    document.getElementById("progressbar").children[nodes.indexOf(previous_fs)].classList.add("active")
    document.getElementById("progressbar").children[nodes.indexOf(current_fs)].classList.remove("active")
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
                        <li className="active" id="account">
                          <strong>Account</strong>
                        </li>
                        <li id="personal">
                          <strong>Personal</strong>
                        </li>
                        <li id="payment">
                          <strong>Payment</strong>
                        </li>
                        <li id="confirm">
                          <strong>Finish</strong>
                        </li>
                      </ul>
                      {/* <!-- fieldsets --> */}
                      <fieldset>
                        <div className="form-card">
                          <h2 className="fs-title">Account Information</h2>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Id"
                          />
                          <input
                            type="text"
                            name="uname"
                            placeholder="UserName"
                          />
                          <input
                            type="password"
                            name="pwd"
                            placeholder="Password"
                          />
                          <input
                            type="password"
                            name="cpwd"
                            placeholder="Confirm Password"
                          />
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
                          <input
                            type="text"
                            name="fname"
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            name="lname"
                            placeholder="Last Name"
                          />
                          <input
                            type="text"
                            name="phno"
                            placeholder="Contact No."
                          />
                          <input
                            type="text"
                            name="phno_2"
                            placeholder="Alternate Contact No."
                          />
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
                          <h2 className="fs-title">Payment Information</h2>
                          <div className="radio-group">
                            <div className="radio" data-value="credit">
                              <img
                                src="https://i.imgur.com/XzOzVHZ.jpg"
                                width="200px"
                                height="100px"
                              />
                            </div>
                            <div className="radio" data-value="paypal">
                              <img
                                src="https://i.imgur.com/jXjwZlj.jpg"
                                width="200px"
                                height="100px"
                              />
                            </div>
                            <br />
                          </div>
                          <label className="pay">Card Holder Name*</label>
                          <input type="text" name="holdername" placeholder="" />
                          <div className="row">
                            <div className="col-9">
                              <label className="pay">Card Number*</label>
                              <input type="text" name="cardno" placeholder="" />
                            </div>
                            <div className="col-3">
                              <label className="pay">CVC*</label>
                              <input
                                type="password"
                                name="cvcpwd"
                                placeholder="***"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3">
                              <label className="pay">Expiry Date*</label>
                            </div>
                            <div className="col-9">
                              
                            </div>
                          </div>
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
