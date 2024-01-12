import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../css/css-components/footer.css";
const Footer = () => {
  // Constants for the current year
  const year = new Date().getFullYear();
  return (
    <Container fluid className="footer-container">
      <Row className="footer-row">
        <p>
          {/* Displaying the year dynamically */}
          All Rights Reserved &copy; {year}
        </p>
      </Row>
    </Container>
  );
};

export default Footer;
