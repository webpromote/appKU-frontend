import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const AboutList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [abouts, setAbouts] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/about-services`)
      .then((res) => res.json())
      .then((info) => setAbouts(info));
  }, []);

  let rowNumber = 1;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSlider = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const pointOne = event.target.pointOne.value;
    const pointTwo = event.target.pointTwo.value;
    const pointThree = event.target.pointThree.value;
    const pointFour = event.target.pointFour.value;
    const pointFive = event.target.pointFive.value;
    const pointSix = event.target.pointSix.value;
    const btnUrl = event.target.btnUrl.value;
    const btnText = event.target.btnText.value;

    if (!image) {
      alert("Please select an image for the About Section.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    // Upload the image to ImgBB using the ImgBB API key
    const imgbbApiKey = "c31014850c05b1ebdcd10234f5ba2e44";
    const imgbbUploadUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    try {
      const response = await fetch(imgbbUploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const sliderImg = data.data.url;

        const about = {
          title,
          description,
          sliderImg,
          pointOne,
          pointTwo,
          pointThree,
          pointFour,
          pointFive,
          pointSix,
          btnUrl,
          btnText,
        };

        const url = `http://localhost:5000/add-about-service`;
        const sliderResponse = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(about),
        });

        if (sliderResponse.ok) {
          navigate("/admin/setting-homepage/");
        } else {
          alert("About Updated");
        }
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form" onSubmit={handleSlider}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Add</span>
            </h4>
            <div className="col-sm">
              <label className="mt-1">Enter Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  name="title"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Description</label>
              <div className="form-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  name="description"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Upload Image</label>
              <div className="form-group mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
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
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Point Six</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Five"
                  name="pointSix"
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
                />
              </div>
            </div>

            <div className="col-sm">
              <button
                type="submit"
                className="btn circle btn-theme-effect btn-sm"
              >
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="container">
        <table className="rwd-table">
          <h5 className="sub-heading mb-15">
            <span>List</span>
          </h5>
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Title</th>
              <th>Edit</th>
            </tr>
            {abouts.map((item) => (
              <tr key={item._id}>
                <td>{rowNumber++}</td>
                <td>{item.title}</td>
                <td data-th="Edit">
                  <Link to={`/admin/edit-about-service/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutList;
