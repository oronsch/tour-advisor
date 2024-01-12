import React, { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import SpinnerLoad from "../components/SpinnerLoad";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import { toast } from "react-toastify";
import "../css/css-pages/dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userTours, loading } = useSelector((state) => state.tour);
  const userId = user?.result?._id;

  // Fetch tours by user ID
  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId, dispatch]);

  // Function to truncate string for description
  const excerpt = (str) => {
    return str.length > 40 ? str.substring(0, 40) + "..." : str;
  };

  // Spinner for loading state
  if (loading) {
    return <SpinnerLoad className="spinner-register" />;
  }

  // Function to handle tour deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  return (
    <>
      <div>
        {userTours.length === 0 && <h3> You didn't create any tours yet</h3>}
        {userTours.length > 0 && (
          <h4 className="text-center">{user?.result?.name}: Dashboard </h4>
        )}
      </div>
      <Container className="d-flex flex-column min-vh-100">
        <CardGroup className="card-dash">
          {userTours &&
            userTours.map((item) => (
              <Col key={item._id} className="col-6">
                <Card className="mt-12 card-dash">
                  <Card.Img
                    className="img-crd-dash"
                    src={item.imageFile}
                    alt={item.title}
                  />
                  <Card.Body>
                    <Card.Title>
                      <h6 className="crd-title-rel"> {item.title}</h6>
                    </Card.Title>
                    <Card.Text className="crd-txt-rel">
                      {excerpt(item.description)}
                    </Card.Text>

                    <Row>
                      <Col className="col-6">
                        <Button variant="danger">
                          <BiTrash onClick={() => handleDelete(item._id)} />
                        </Button>
                      </Col>
                      <Col className="col-4">
                        <Button variant="success">
                          <Link to={`/editTour/${item._id}`}>
                            <FiEdit className="icon-edit" />
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </CardGroup>
      </Container>
    </>
  );
};

export default Dashboard;
