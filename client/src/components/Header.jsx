import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BiWorld } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../css/css-components/header.css";

function Header() {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  // user logout
  const handleLogout = () => {
    dispatch(setLogout());
  };

  // Log out user if the token has expired
  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        dispatch(setLogout());
      }
    }
  }, [token, dispatch]);

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  // Render different navigation items based on user authentication status
  return (
    <>
      {user?.result?._id ? (
        <Navbar className="header-text" expand="lg" variant="light">
          <Container>
            <Navbar.Brand className="nav-brand" href="/">
              <span className="nav-brand">Social</span>
              <BiWorld className="nav-brand" />
              <span className="nav-brand">Travel</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/addTour">AddTour</Nav.Link>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
              <form
                className="d-flex input-group w-auto"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Tour"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                  <GoSearch onClick={handleSubmit} />
                </div>
              </form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar className="header-text" expand="lg" variant="light">
          <Container>
            <Navbar.Brand href="/">
              <span className="nav-brand">Social</span>
              <BiWorld className="nav-brand" />
              <span className="nav-brand">Travel</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
              <form
                className="d-flex input-group w-auto"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Tour"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                  <GoSearch onClick={handleSubmit} />
                </div>
              </form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Header;
