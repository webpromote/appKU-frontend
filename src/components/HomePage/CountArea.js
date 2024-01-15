import React from "react";

const CountArea = () => {
  return (
    <>
      <div className="fun-facts-area bg-gray default-padding">
        {/* Shape */}
        <div
          className="shape"
          style={{ backgroundImage: "url(assets/img/shape/43.png)" }}
        />
        {/* Shape */}
        <div className="container">
          <div className="item-inner">
            <div className="row">
              <div className="col-lg-3 col-md-6 item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={18} data-speed={2000}>
                      18
                    </div>
                    <div className="operator">K</div>
                  </div>
                  <span className="medium">App Downloads</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={98} data-speed={2000}>
                      98
                    </div>
                    <div className="operator">%</div>
                  </div>
                  <span className="medium">Positive Rating</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={12} data-speed={2000}>
                      12
                    </div>
                    <div className="operator">M</div>
                  </div>
                  <span className="medium">Trusted Users</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={5} data-speed={2000}>
                      5
                    </div>
                    <div className="operator">B</div>
                  </div>
                  <span className="medium">Active Accounts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountArea;
