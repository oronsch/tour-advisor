import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";
import "../css/css-pages/addEditTour.css";

// Form initial state
const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, userTours } = useSelector((state) => state.tour);
  const user = useSelector((state) => state.auth.user);

  // Load tour data for editing
  useEffect(() => {
    if (id && userTours.length) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [id, userTours]);

  // Display error messages using toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (tourData.title && tourData.description ) {
      const updatedTourData = { ...tourData, name: user?.result?.name };
      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
    setValidated(true);
    console.log(form);
  };

  // Input change handler
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  // Tag management
  const handleAddTag = (tag) =>
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });

  const handleDeleteTag = (deleteTag) =>
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });

  // Clear form
  const handleClear = () => {
    setTourData(initialState);
  };

  return (
    <div className="addEdit-container d-flex flex-column min-vh-100">
      <Card>
        <Card.Body>
          <h5>{id ? "Update Tour" : "Add Tour"}</h5>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="row g-3"
          >
            {/* Title input */}
            <div className="col-md-12">
              <Form.Control
                required
                placeholder="Enter Title"
                type="text"
                name="title"
                value={tourData.title}
                onChange={onInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your tour title!
              </Form.Control.Feedback>
            </div>

            {/* Description input */}
            <div className="col-md-12">
              <Form.Control
                required
                as="textarea"
                placeholder="Enter Description"
                name="description"
                value={tourData.description}
                onChange={onInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your tour description!
              </Form.Control.Feedback>
            </div>

            {/* Tags input */}
            <div className="col-md-12">
              <ChipInput
                name="tags"
                placeholder="Enter Tag"
                fullWidth
                value={tourData.tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
              />
            </div>

            {/* Image upload */}
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>

            {/* Form submission buttons */}
            <div className="col-12">
              <Button variant="success" onClick={handleSubmit}>
                {id ? "Update" : "Submit"}
              </Button>
              <Button variant="danger" className="mt-2" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddEditTour;
