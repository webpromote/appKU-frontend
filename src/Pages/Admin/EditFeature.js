import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/feature/${id}`)
      .then((res) => res.json())
      .then((info) => setFeature(info));
  }, [id]);

  const handleFeature = async (event) => {
    event.preventDefault();

    const btnText = event.target.btnText.value;
    const btnUrl = event.target.btnUrl.value;
    const featureDesc = event.target.featureDesc.value;
    const featureTitle = event.target.featureTitle.value;

    const TitleBoxOne = event.target.TitleBoxOne.value;
    const ParaBoxOne = event.target.ParaBoxOne.value;
    const ImageBoxOne = event.target.ImageBoxOne.value;

    const TitleBoxTwo = event.target.TitleBoxTwo.value;
    const ParaBoxTwo = event.target.ParaBoxTwo.value;
    const ImageBoxTwo = event.target.ImageBoxTwo.value;

    const TitleBoxThree = event.target.TitleBoxThree.value;
    const ParaBoxThree = event.target.ParaBoxThree.value;
    const ImageBoxThree = event.target.ImageBoxThree.value;

    const updatedFeature = {
      btnText,
      btnUrl,
      featureDesc,
      featureTitle,
      TitleBoxOne,
      ParaBoxOne,
      ImageBoxOne,
      TitleBoxTwo,
      ParaBoxTwo,
      ImageBoxTwo,
      TitleBoxThree,
      ParaBoxThree,
      ImageBoxThree,
    };

    const url = `http://localhost:5000/feature/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFeature),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form mb-15" onSubmit={handleFeature}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Edit Features</span>
            </h4>

            <div className="col-sm">
              <label className="mt-1">Enter Feature Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Title"
                  name="featureTitle"
                  defaultValue={feature.featureTitle}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Feature Short Description</label>
              <div className="form-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Short Description"
                  name="featureDesc"
                  defaultValue={feature.featureDesc}
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
                  defaultValue={feature.btnText}
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
                  defaultValue={feature.btnUrl}
                />
              </div>
            </div>

            <div className="card-deck mt-5">
              <div className="card">
                <div className="card-body m-5">
                  <h5 className="card-title">Card One</h5>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Title</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        name="TitleBoxOne"
                        defaultValue={feature.TitleBoxOne}
                        className="form-control"
                        placeholder="Enter Banner Title"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Paragraph</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Paragraph"
                        name="ParaBoxOne"
                        defaultValue={feature.ParaBoxOne}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Image</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Image"
                        name="ImageBoxOne"
                        defaultValue={feature.ImageBoxOne}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-deck mt-5">
              <div className="card">
                <div className="card-body m-5">
                  <h5 className="card-title">Card Two</h5>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Title</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        name="TitleBoxTwo"
                        defaultValue={feature.TitleBoxTwo}
                        className="form-control"
                        placeholder="Enter Banner Title"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Paragraph</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Paragraph"
                        name="ParaBoxTwo"
                        defaultValue={feature.ParaBoxTwo}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Image</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Image"
                        name="ImageBoxTwo"
                        defaultValue={feature.ImageBoxTwo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-deck mt-5">
              <div className="card">
                <div className="card-body m-5">
                  <h5 className="card-title">Card Three</h5>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Title</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        name="TitleBoxThree"
                        defaultValue={feature.TitleBoxThree}
                        className="form-control"
                        placeholder="Enter Banner Title"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Paragraph</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Paragraph"
                        name="ParaBoxThree"
                        defaultValue={feature.ParaBoxThree}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Image</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Image"
                        name="ImageBoxThree"
                        defaultValue={feature.ImageBoxThree}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm">
              <button type="submit" className="btn circle btn-theme-effect btn-sm">
                <span>Update Feature</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditFeature;
