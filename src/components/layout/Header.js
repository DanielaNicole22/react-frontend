import { useDispatch } from "react-redux";
import { logout } from "actions/auth";

/**
 * Header elements displaying the logo and the logout button
 */
const Header = (props) => {
  import("../../styles/Header.css");

  const dispatch = useDispatch();
  const onClickLogout = () => {
      dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/images/logo.jpg"
            className="logo"
            alt="Logo"
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
