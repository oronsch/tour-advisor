import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerLoad from "../components/SpinnerLoad";
import { getToursByTag } from "../redux/features/tourSlice";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../css/css-pages/tagTours.css";

const TagTours = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();
  const { tagTours, loading } = useSelector((state) => state.tour);

  // Fetch tours by tag
  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
  }, [tag, dispatch]);

  // Function to truncate string for description
  const excerpt = (str, length) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  // Loading indicator
  if (loading) return <SpinnerLoad />;
  return (
    <div
      className="wrapper"
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "990px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Tagged tours of: {tag}</h3>
      <hr />
      {tagTours.map((item) => (
        <CardGroup className="crd-group" key={item._id}>
          <Card className="crd mt-2">
            <Row className="g-0">
              <Col md={4}>
                <Card.Img
                  className="img-crd"
                  src={item.imageFile}
                  alt={item.title}
                />
              </Col>
              <Col className="crd-content">
                <Card.Title className="text-start">{item.title}</Card.Title>
                <Card.Text className="text-start">
                  {excerpt(item.description, 40)}
                </Card.Text>
                <div style={{ float: "left", marginTop: "10px" }}>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => navigate(`/tour/${item._id}`)}
                  >
                    Read more
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </CardGroup>
      ))}
    </div>
  );
};

export default TagTours;
