import { useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";

/**
 * 404 Page Not Found component
 */
const PageNotFound = () => {
  import("../styles/PageNotFound.css");
  const navigate = useNavigate();

  /**
   * Navigates to home page
   */
  const onClickHome = () => {
    navigate("/");
  };

  return (
    <Layout hideHeader={false} isLoggedIn={false}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">
                Sorry, an error has occured, Requested page not found!
              </div>
              <div className="error-actions">
                <button
                  type="button"
                  className="button btn btn-primary btn-lg"
                  onClick={onClickHome}
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
