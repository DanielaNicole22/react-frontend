import { useState } from "react";
import Header from "components/layout/Header";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const params = useParams();

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
