import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux action import
import { setUser } from "./redux/features/authSlice";

// Pages and components import
import AddEditTour from "./pages/AddEditTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Styles import
import "./App.css";

function App() {
  const dispatch = useDispatch();

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("profile"));

  // Dispatch setUser action on component mount
  useEffect(() => {
    if (user) dispatch(setUser(user))
  }, [dispatch, user]);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="user-greet">
          {user?.result?._id && <h5>Hello: {user?.result?.name}</h5>}
        </div>

        <ToastContainer />
        <Routes>
          {/* Route definitions */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tours/search" element={<Home />} />
          <Route path="/tours/tag/:tag" element={<TagTours />} />

          {/* Private routes */}
          <Route
            path="/addTour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/editTour/:id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route path="/tour/:id" element={<SingleTour />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
