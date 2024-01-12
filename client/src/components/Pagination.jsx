import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/css-components/cardTour.css";
import "../css/css-components/pagination.css";

const PaginationTest = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  // Function to render the appropriate pagination buttons based on current page and total pages
  const renderPagination = () => {
    // No pagination if there's only one page
    if (currentPage === numberOfPages && currentPage === 1) return null;

    // Pagination for the first page
    if (currentPage === 1) {
      return (
        <PaginationComponent
          hasPrev={false}
          hasNext={true}
          currentPage={currentPage}
          onPrevious={() => dispatch(setCurrentPage(currentPage - 1))}
          onNext={() => dispatch(setCurrentPage(currentPage + 1))}
        />
      );
    }
    // Pagination for middle pages
    else if (currentPage !== numberOfPages) {
      return (
        <PaginationComponent
          hasPrev={true}
          hasNext={true}
          currentPage={currentPage}
          onPrevious={() => dispatch(setCurrentPage(currentPage - 1))}
          onNext={() => dispatch(setCurrentPage(currentPage + 1))}
        />
      );
    }
    // Pagination for the last page
    else {
      return (
        <PaginationComponent
          hasPrev={true}
          hasNext={false}
          currentPage={currentPage}
          onPrevious={() => dispatch(setCurrentPage(currentPage - 1))}
        />
      );
    }
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

// Helper component to render pagination buttons
const PaginationComponent = ({
  hasPrev,
  hasNext,
  currentPage,
  onPrevious,
  onNext,
}) => (
  <Row>
    <Col className="pag-wrap">
      <Pagination className="mb-0">
        {hasPrev && <Pagination.Prev onClick={onPrevious} />}
        <Pagination.Item active>{currentPage}</Pagination.Item>
        {hasNext && <Pagination.Next onClick={onNext} />}
      </Pagination>
    </Col>
  </Row>
);

export default PaginationTest;
