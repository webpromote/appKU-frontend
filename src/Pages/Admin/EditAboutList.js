import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditAboutList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);
                                                                                                                                                                                                                                                                
  useEffect(() => {
    fetch(`http://localhost:5000/about-service/${id}`)
      .then((res) => res.json())
      .then((info) => setSliders(info));
  }, [id]);

  const handleSlider = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const pointSix = event.target.pointSix.value;
    const pointFive = event.target.pointFive.value;
    const pointFour = event.target.pointFour.value;
    const pointThree = event.target.pointThree.value;
    const pointTwo = event.target.pointTwo.value;
    const pointOne = event.target.pointOne.value;
    const fileInput = event.target.sliderImg.files[0]; // Get the selected file

    // Upload the image to imgbb
    try {
      const formData = new FormData();
      formData.append("image", fileInput);
      formData.append("key", "c31014850c05b1ebdcd10234f5ba2e44"); // Your imgbb API key

      const imgbbResponse = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );

      const sliderImg = imgbbResponse.data.data.url; // Get the image URL from the imgbb response

      const sliderUpdate = {
        title,
        description,
        sliderImg,
        pointSix,
        pointFive,
        pointFour,
        pointThree,
        pointTwo,
        pointOne,
      };

      const url = `http://localhost:5000/edit-about-service/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sliderUpdate),
      })
        .then((res) => res.json())
        .then((result) => {
          navigate("/admin/setting-homepage/");
        });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div
      className="mb-5"
      data-aos="fade-up"
      data-aos-duration={3000}
    >
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handleSlider}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Update</span>
            </h4>
            <div class="col-sm">
              <label className="mt-1">Enter Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title"
                  name="title"
                  defaultValue={sliders.title}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Description</label>
              <div class="form-group mb-3">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Enter Description"
                  name="description"
                  defaultValue={sliders.description}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Upload Image</label>
              <div class="form-group mb-3">
                <input type="file" class="form-control" name="sliderImg" />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Point One</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point One"
                  name="pointOne"
                  defaultValue={sliders.pointOne}
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Point Two</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Two"
                  name="pointTwo"
                  defaultValue={sliders.pointTwo}
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Point Three</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Three"
                  name="pointThree"
                  defaultValue={sliders.pointThree}
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Point Four</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Four"
                  name="pointFour"
                  defaultValue={sliders.pointFour}
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Point Five</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Five"
                  name="pointFive"
                  defaultValue={sliders.pointFive}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Point Six</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Six"
                  name="pointFive"
                  defaultValue={sliders.pointSix}
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Button Text</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Button Text"
                  name="btnText"
                  defaultValue={sliders.btnText}
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Button URL</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Button URL"
                  name="btnUrl"
                  defaultValue={sliders.btnUrl}
                />
              </div>
            </div>

            <div class="col-sm">
              <button
                type="submit"
                class="btn circle btn-theme-effect btn-sm mt-5"
              >
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAboutList;
