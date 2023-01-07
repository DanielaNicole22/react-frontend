import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "actions/auth";

const Header = (props) => {
  import("../../styles/Header.css");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickLogout = () => {
      dispatch(logout());
  };

  useEffect(() => {
    if (props.isLoggedIn) {
    }
  }, [props.isLoggedIn, dispatch]);

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/images/logo.jpg"
            className="logo"
            alt="Model Store logo"
          />
        </a>
        <div className="logout-div">
          {props.isLoggedIn && (
            <>
              <button
                className="button btn btn-primary"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
