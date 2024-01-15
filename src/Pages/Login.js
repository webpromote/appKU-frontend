import React, { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [logo, setLogo] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info));
  }, []);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [loginError, setLoginError] = useState(null);

  const [userMail] = useAuthState(auth);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        navigate("/user-dashboard");
      })
      .catch((error) => {
        setLoginError("Incorrect email or password. Please try again.");
      });
  };

  if (userMail) {
    navigate("/user-dashboard");
    return null;
  }

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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase text-white">
                        Login
                      </h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="usernameInput"
                          placeholder="Enter your Email"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "Email is Required",
                            },
                            pattern: {
                              value: /[A-Za-z]{3}/,
                              message: "Provide a Valid Email",
                            },
                          })}
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="passwordInput"
                          placeholder="Enter your password"
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Password is Required",
                            },
                            minLength: {
                              value: 6,
                              message: "Minimum 6 Characters",
                            },
                          })}
                        />
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <Link to="/reset" className="text-white-50" href="#!">
                          Forgot password?
                        </Link>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5  circle btn-theme-effect"
                        type="submit"
                      >
                        Login
                      </button>

                      <hr class="hr-text mt-4" data-content="AND" />
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <button
                          className="btn btn-outline text-white"
                          onClick={() => signInWithGoogle()}
                        >
                          {" "}
                          <i className="fab fa-google fa-lg" /> Join With Google
                        </button>
                      </div>
                    </div>
                  </form>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-white-50 fw-bold">
                        Sign Up
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

export default Login;
