import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import "../css/css-components/realetedTour.css";

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <Container>
      {/* Only render if there are related tours */}
      {relatedTours && relatedTours.length > 0 && (
        <>
          {/* Display title if there's more than one related tour */}
          {relatedTours.length > 1 && <h4>Related Tours</h4>}
          <CardGroup className="row-cols-1 row-cols-md-3 g-4">
            {/* Filter out the current tour, limit to 3, and map over related tours */}
            {relatedTours
              .filter((item) => item._id !== tourId)
              .splice(0, 3)
              .map((item, index) => (
                <Col className="col-4" key={index}>
                  <Card className="cards-rel">
                    <Link to={`/tour/${item._id}`}>
                      <Card.Img
                        className="img-crd-rel"
                        src={item.imageFile}
                        alt={item.title}
                      />
                    </Link>

                    {/* Display tags */}
                    <span className="tags-crd">
                      {item.tags.map((tag, index) => (
                        <Link
                          className="tags"
                          key={index}
                          to={`/tours/tag/${tag}`}
                        >
                          #{tag}
                        </Link>
                      ))}
                    </span>

                    {/* Card body with title and truncated description */}
                    <Card.Body>
                      <Card.Title>
                        <h6 className="crd-title-rel">{item.title}</h6>
                      </Card.Title>
                      <Card.Text className="crd-txt-rel">
                        {excerpt(item.description, 45)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </CardGroup>
        </>
      )}
    </Container>
  );
};

export default RelatedTours;
