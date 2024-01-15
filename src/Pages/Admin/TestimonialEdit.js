import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";

const TestimonialEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState([]);
  const [user] = useAuthState(auth);

  const [imageFile, setImageFile] = useState(null); // To store the selected image file
  const [imagePreview, setImagePreview] = useState(""); // To display a preview of the uploaded or existing image

  useEffect(() => {
    fetch(`http://localhost:5000/testimonial/${id}`)
      .then((res) => res.json())
      .then((info) => setTestimonial(info));
  }, [id]);

  useEffect(() => {
    if (testimonial.personImg) {
      setImagePreview(testimonial.personImg);
    }
  }, [testimonial.personImg]);

  let rowNumber = 1;

  const handleImageUpload = async (event) => {
    const imgbbApiKey = "c31014850c05b1ebdcd10234f5ba2e44"; // Replace with your imgbb API key
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    // Upload the image to imgbb
    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + imgbbApiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.data.url;

      // Set the uploaded image URL and clear the file input
      setImagePreview(imageUrl);
      setImageFile(null);

      // Update the state with the new image URL
      setTestimonial((prevTestimonial) => ({
        ...prevTestimonial,
        personImg: imageUrl,
      }));
    } catch (error) {
      console.error("Image upload to imgbb failed:", error);
    }
  };

  const handleTestimonial = (event) => {
    event.preventDefault();
    const personName = event.target.personName.value;
    const personTitle = event.target.personTitle.value;
    const desc = event.target.desc.value;
    const subject = event.target.subject.value;

    const testimonialData = {
      personName,
      personTitle,
      personImg: testimonial.personImg, // Use the updated image URL
      desc,
      subject,
    };

    const url = `http://localhost:5000/testimonial/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(testimonialData),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage");
      });
  };

  return (
    <div
      className="vh-100"
      data-aos="fade-up"
      data-aos-duration={2000}
    >
      <form className="form" onSubmit={handleTestimonial}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <div className="col-sm">
              <label className="mt-1">Enter Person Name</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Person Name"
                  name="personName"
                  defaultValue={testimonial.personName}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Person Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Person Title"
                  name="personTitle"
                  defaultValue={testimonial.personTitle}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Upload Person Image</label>
              <div className="form-group mb-3">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                    handleImageUpload(e);
                  }}
                />
                {imageFile && (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                {imagePreview && !imageFile && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Testimonial Description</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Testimonial Description"
                  name="desc"
                  defaultValue={testimonial.desc}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Testimonial subject</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Testimonial subject"
                  name="subject"
                  defaultValue={testimonial.subject}
                />
              </div>
            </div>

            <div className="col-sm">
              <button
                type="submit"
                className="btn circle btn-theme-effect btn-sm"
              >
                <span>Update Testimonial</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestimonialEdit;
