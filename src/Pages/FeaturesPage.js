import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FeaturesPage = () => {
  const { id } = useParams();
  const [feature, setFeature] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/features`)
      .then((res) => res.json())
      .then((info) => setFeature(info[0]));
  }, [id]);

  return (
    <>
      {/* <div className="card-box__features_card">
        <section
          className="about vh-100 card-box__features features__center"
          data-aos="fade-up"
          data-aos-duration={2000}
        >
          <div className="shape" />

          <div className="container">
            {feature.map((e, i) => (
              <>
                <div className="row  justify-content-center" key={i}>
                  <div className="col-lg-5 col-md-12">
                    <div className="about__right">
                      <div className="images">
                        <img className="img1" src={e.featureImg} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12">
                    <div className="block-text">
                      <h3 className="heading wow" data-splitting="">
                        {e.featureTitle}
                      </h3>
                      <p className="mb-17 feature__text-left">
                        {e.featureDesc
                          .split(". ")
                          .map((sentence, sentenceIndex, sentencesArray) => (
                            <React.Fragment key={sentenceIndex}>
                              {sentenceIndex > 0 && sentenceIndex % 2 === 0 && (
                                <br />
                              )}{" "}
                              <p>{sentence}</p>
                            </React.Fragment>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </section>
      </div> */}

      <div className="software-feature-area default-padding">
        <div className="container">
          <div className="feature-items">
            <div className="row align-center">
              <div className="col-lg-6 left-info">
                <h2>{feature.featureTitle}</h2>
                <p>{feature.featureDesc}</p>

                <Link
                  className="btn circle btn-theme-effect btn-sm"
                  to={feature.btnUrl}
                >
                  {feature.btnText}
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="features-list">
                  {/* Single Itme */}
                  <div className="item">
                    <div className="icon">
                      <i className="fas fa-angle-right" />
                      <img src={feature.ImageBoxOne} alt="Icon" />
                    </div>
                    <div className="content">
                      <h4>{feature.TitleBoxOne}</h4>
                      <p>{feature.ParaBoxOne}</p>
                    </div>
                  </div>
                  {/* End Single Itme */}
                  {/* Single Itme */}
                  <div className="item">
                    <div className="icon">
                      <i className="fas fa-angle-right" />

                      <img src={feature.ImageBoxTwo} alt="Icon" />
                    </div>
                    <div className="content">
                      <h4>{feature.TitleBoxTwo}</h4>
                      <p>{feature.ParaBoxTwo}</p>
                    </div>
                  </div>
                  {/* End Single Itme */}
                  {/* Single Itme */}
                  <div className="item">
                    <div className="icon">
                      <i className="fas fa-angle-right" />
                      <img src={feature.ImageBoxThree} alt="Icon" />
                    </div>
                    <div className="content">
                      <h4>{feature.TitleBoxThree}</h4>
                      <p>{feature.ParaBoxThree}</p>
                    </div>
                  </div>
                  {/* End Single Itme */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;
