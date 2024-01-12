import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {
  Container,
  OverlayTrigger,
  Tooltip,
  Card,
  Row,
  Col,
  Button,
  CardGroup,
  Modal,
} from "react-bootstrap";
import "../css/css-components/cardTour.css";

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.result?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to limit string length for card description
  const excerptDesc = (str) => {
    return str.length > 77 ? str.substring(0, 77) + " ..." : str;
  };

  // Function to limit string length for card title
  const excerptTitle = (str) => {
    return str.length > 17 ? str.substring(0, 17) + " ..." : str;
  };

  // State and functions for handling modal display
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to render likes tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You and {likes.length - 1} others like this tour
    </Tooltip>
  );

  // Function to render likes component
  const Likes = () => {
    if (likes.length > 0) {
      return likes.includes(userId) ? (
        <OverlayTrigger
          placement="left-end"
          delay={{ show: 200, hide: 400 }}
          overlay={renderTooltip}
        >
          <span className="span-like" variant="link">
            <FaThumbsUp className="regThumb" /> &nbsp;
            {likes.length > 2 ? (
              <>{likes.length} Likes</>
            ) : (
              `${likes.length} Like${likes.length > 1 ? "s" : ""}`
            )}
          </span>
        </OverlayTrigger>
      ) : (
        <>
          <span className="span-like" variant="link">
            <FaRegThumbsUp />
            &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </span>
        </>
      );
    }
    return (
      <>
        <FaRegThumbsUp />
        &nbsp;Like
      </>
    );
  };
  // handle like by tour id
  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  return (
    <Container>
      <CardGroup className="  col-12  crdGroup-wrap  ">
        <Card className="col-s-8 col-12  crd">
          <div className="img-wrap">
            {imageFile ? (
              <>
                <Card.Img
                  className="img-card"
                  variant="top"
                  srcSet={imageFile}
                  alt={title}
                />
                <div className="top-left">{name}</div>
              </>
            ) : (
              <>
                <Card.Img
                  className="img-card"
                  src="/images/no-image-file.jpeg"
                  alt="no image file"
                />

                <div className="top-left">{name}</div>
              </>
            )}
          </div>

          <Card.Body>
            <div className="card-title">
              <Row>
                <Col className="col-7">
                  {tags.map((tag, index) => (
                    <Link key={index} to={`/tours/tag/${tag}`}>
                      <span className="tags-crd">#{tag}</span>
                    </Link>
                  ))}
                  <span className="hidden-tag">...</span>
                </Col>
                <Col className="col-5 colLike">
                  <Card.Link
                    className="span-like "
                    variant="link"
                    onClick={!user?.result ? null : handleLike}
                  >
                    {!user?.result ? (
                      <>
                        <span
                          className="btn-modal-like"
                          variant="link"
                          onClick={handleShow}
                        >
                          <Likes />
                        </span>

                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>You are not Logged in</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Please Login or Register your account in order to
                            like or take other actions...
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="outline-secondary"
                              onClick={handleClose}
                            >
                              Close
                            </Button>
                            <Button
                              variant="outline-primary"
                              onClick={() => navigate("/register")}
                            >
                              Sign in
                            </Button>
                            <Button
                              className="btn-modal-signup"
                              variant="primary"
                              onClick={() => navigate("/login")}
                            >
                              Log in
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    ) : (
                      <>
                        <Likes />
                      </>
                    )}
                  </Card.Link>
                </Col>
              </Row>
            </div>

            <Card.Title>{excerptTitle(title)}</Card.Title>
            <Card.Text>
              {excerptDesc(description)}
              <Link to={`/tour/${_id}`}>Read More</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </Container>
  );
};

export default CardTour;
