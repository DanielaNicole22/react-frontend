import { useSelector } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import Layout from "components/layout/Layout";

/**
 * View Profile component
 */
const ViewProfile = () => {

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Layout>
        <section className="view-model-section">
          <div className="h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-6 col-xl-6">
                <img
                  src="/images/laptop.jpg"
                  className="img-fluid"
                  alt="Laptop"
                />
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="card text-black">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <Row className="mb-4">
                        <Col sm="12" md="12" lg="10">
                          <h3>Profile</h3>
                        </Col>
                      </Row>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th colSpan={2}>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>First Name</td>
                            <td>{user?.firstname}</td>
                          </tr>
                          <tr>
                            <td>Middle Name</td>
                            <td>{user?.middlename}</td>
                          </tr>
                          <tr>
                            <td>Last Name</td>
                            <td>{user?.lastname}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th colSpan={2}>Personal Info I</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Nickname</td>
                            <td>{user?.nickname}</td>
                          </tr>
                          <tr>
                            <td>Civil Status</td>
                            <td>{user?.civilStatus}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th colSpan={2}>Personal Info II</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Birth Place</td>
                            <td>{user?.birthPlace}</td>
                          </tr>
                          <tr>
                            <td>Height (m)</td>
                            <td>{user?.height}</td>
                          </tr>
                          <tr>
                            <td>Weight (kg)</td>
                            <td>{user?.weight}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th colSpan={2}>Family Background</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Father Name</td>
                            <td>{user?.fatherName}</td>
                          </tr>
                          <tr>
                            <td>Mother Name</td>
                            <td>{user?.motherName}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th colSpan={2}>Account</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Official Email Address</td>
                            <td>{user?.email}</td>
                          </tr>
                          <tr>
                            <td>Username</td>
                            <td>{user?.username}</td>
                          </tr>
                        </tbody>
                      </Table>
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

export default ViewProfile;
