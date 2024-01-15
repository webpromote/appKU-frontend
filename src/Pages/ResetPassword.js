import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [logo, setLogo] = useState([]);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.error("Error sending password reset email", error);
      setResetError("Error sending password reset email. Please try again.");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info));
  }, []);

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <form>
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase text-white">
                        Reset Password
                      </h2>
                      <p className="text-white-50 mb-5">
                        Please enter your Email Address Register with Our
                        Website!
                      </p>

                      {resetError && (
                        <div className="text-center mb-4">
                          <h5>{resetError}</h5>
                        </div>
                      )}

                      {resetSent ? (
                        <div className="text-center mb-4">
                          <h3 className="text-white">Password reset. Check your inbox!</h3>
                        </div>
                      ) : (
                        <>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <div className="text-center">
                            <button
                              onClick={handleResetPassword}
                              type="button"
                              className="btn circle btn-theme-effect btn-sm mt-5 w-full text-center"
                            >
                              <span> Send Reset Email</span>
                            </button>
                          </div>
                        </>
                      )}

                      <hr className="hr-text mt-4" data-content="AND" />
                    </div>
                  </form>

                  <div>
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-white-50 fw-bold">
                        Login Now.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
