import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OurSpeciality = () => {
  const { id } = useParams();

  const [speciality, SetSpeciality] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/speciality`)
      .then((res) => res.json())
      .then((info) => SetSpeciality(info[0]));
  }, []);

  return (
    <>
      <div
        id="features"
        className="advanced-features-area bg-cover default-padding bottom-less"
        style={{ backgroundImage: "url(assets/img/shape/34.png)" }}
      >
        <div
          className="bottom-shape"
          style={{ backgroundImage: "url(assets/img/shape/24.png)" }}
        />

        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-light text-center">
                <h2>{speciality.headingTitle}</h2>
                <div className="devider" />
                <p>{speciality.subText}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fill">
          <div className="af-items">
            <div className="row">
              <div className="single-item col-lg-3 col-md-6">
                <div className="item">
                  <div className="icon">
                    <img src={speciality.ImageBoxOne} alt="" height={75} />
                  </div>
                  <div className="info">
                    <h4>{speciality.TitleBoxOne}</h4>
                    <p>{speciality.ParaBoxOne}</p>
                  </div>
                </div>
              </div>
              <div className="single-item col-lg-3 col-md-6">
                <div className="item">
                  <div className="icon">
                    <img src={speciality.ImageBoxTwo} alt="" height={75} />
                  </div>
                  <div className="info">
                    <h4>{speciality.TitleBoxTwo}</h4>
                    <p>{speciality.ParaBoxTwo}</p>
                  </div>
                </div>
              </div>
              <div className="single-item col-lg-3 col-md-6">
                <div className="item">
                  <div className="icon">
                    <img src={speciality.ImageBoxThree} alt="" height={75} />
                  </div>
                  <div className="info">
                    <h4>{speciality.TitleBoxThree}</h4>
                    <p>{speciality.ParaBoxThree}</p>
                  </div>
                </div>
              </div>
              <div className="single-item col-lg-3 col-md-6">
                <div className="item">
                  <div className="icon">
                    <img src={speciality.ImageBoxFour} alt="" height={75} />
                  </div>
                  <div className="info">
                    <h4>{speciality.TitleBoxFour}</h4>
                    <p>{speciality.ParaBoxFour}</p>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurSpeciality;
