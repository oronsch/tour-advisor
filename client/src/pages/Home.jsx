import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import SpinnerLoad from "../components/SpinnerLoad";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Custom hook to parse the query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");

  // Selectors for Redux state
  const tours = useSelector((state) => state.tour.tours);
  const loading = useSelector((state) => state.tour.loading);
  const currentPage = useSelector((state) => state.tour.currentPage);
  const numberOfPages = useSelector((state) => state.tour.numberOfPages);

  // Effect to fetch tours based on the current page
  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage, dispatch]);

  // Display a spinner while loading
  if (loading) {
    return <SpinnerLoad />;
  };

  return (
    <Container className="d-flex flex-column min-vh-100">
      <Row className="mt-5">
        {/* Display message when no tours are found */}
        {tours.length === 0 && location.pathname !== "/" && (
          <h2 className="text-center mb-0" tag="h2">
            No mach Found for "{searchQuery}"
          </h2>
        )}

        {/* Tour Cards */}
        <Col>
          <Container>
            <Row className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((item) => <CardTour key={item._id} {...item} />)}
            </Row>
            {tours.length === 0 && (
              <h1>
                No tours posted yet.. <br />
                Be the first one to post on Social🌍Travel 🎉
              </h1>
            )}
          </Container>
        </Col>
      </Row>

      {/* Pagination Component */}
      {tours.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
    </Container>
  );
};

export default Home;
