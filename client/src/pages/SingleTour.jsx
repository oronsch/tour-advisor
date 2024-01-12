import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getTour, getRelatedTours } from "../redux/features/tourSlice";
import RelatedTours from "../components/RelatedTour";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaArrowCircleLeft } from "react-icons/fa";
import { VscCalendar } from "react-icons/vsc";
import "../css/css-pages/singleTour.css";

const SingleTour = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tour, relatedTours } = useSelector((state) => state.tour);

  // Fetch tour details by ID
  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id, dispatch]);

  // Fetch related tours based on tags
  useEffect(() => {
    if (tour?.tags) {
      dispatch(getRelatedTours(tour.tags));
    }
  }, [tour?.tags, dispatch]);

  return (
    <>
      <Container>
        <Card className="mb-3 mt-2">
          <Card.Img className="crd-img" src={tour.imageFile} alt={tour.title} />
          <Card.Body>
            <Button color="none" onClick={() => navigate("/")}>
              <FaArrowCircleLeft className="icon-arrow" />
            </Button>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item}`)}
              </span>
            </div>
            <br />
            <Card.Text className="text-start mt-2">
              <VscCalendar />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </Card.Text>
            <Card.Text className="lead mb-0 text-start">
              {tour.description}
            </Card.Text>
          </Card.Body>
          {/* Related Tours Component */}
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </Card>
      </Container>
    </>
  );
};

export default SingleTour;
