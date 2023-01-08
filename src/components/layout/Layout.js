import Header from "components/layout/Header";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

/**
 * Managing the display of the layout of the components
 */
const Layout = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="layout">
      {!props.hideHeader && <Header isLoggedIn={isLoggedIn} />}
      <div className={props.hideHeader ? "content" : "content with-header"}>
        <Container fluid>
          <Row>
            <Col id="page-content-wrapper">{props.children}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
