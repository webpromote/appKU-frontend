import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Register = () => {
  const [gUser, gLoading] = useSignInWithGoogle(auth);
  const [signInWithGoogle, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [logo, setLogo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info));
  }, []);
  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);

  if (loading || gLoading) {
    return <loading></loading>;
  }

  if (user || gUser) {
    console.log(user || gUser);
  }

  const onSubmit = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(data.email, data.password);
    navigate("/update-profile");
  };

  return (
    <>
      <div className="main-content" data-aos="fade-up" data-aos-duration={2000}>
        <div className="page-content mt-5">
          <section className="bg-auth">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div
                    className="card auth-box mb-15"
                    style={{ background: "#0c0f2d" }}
                  >
                    <div className="row g-0">
                      <div className="col-lg-6 text-center">
                        <div className="card-body p-4">
                          {logo.map((e) => (
                            <Link to="/">
                              <img src={e.logo} alt="logo" />
                            </Link>
                          ))}
                          <div className="mt-5">
                            <img
                              src="https://themesdesign.in/jobcy/layout/assets/images/auth/sign-up.png"
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-6">
                        <div className="auth-content card-body p-5 h-100 text-white">
                          <div className="w-100">
                            <div className="text-center mb-4">
                              <h4 className="text-white">Welcome!</h4>
                              <p className="text-white">Register to continue</p>
                            </div>
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="auth-form"
                            >
                              <div className="mb-3">
                                <label
                                  htmlFor="usernameInput"
                                  className="form-label"
                                >
                                  Email
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
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
                                <label class="label">
                                  {errors.email?.type === "required" &&
                                    "Email is Required"}
                                </label>
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="passwordInput"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
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
                                <label class="label">
                                  {errors.password?.type === "required" &&
                                    "Password is Required"}
                                </label>
                              </div>

                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="btn circle btn-theme-effect btn-sm mt-5 w-full text-center"
                                >
                                  <span> Register</span>
                                </button>
                              </div>
                            </form>
                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                Have an account ?{" "}
                                <Link
                                  to="/login"
                                  className="fw-medium text-white text-decoration-underline"
                                >
                                  {" "}
                                  Login Now{" "}
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                  {/*end auth-box*/}
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </div>
            {/*end container*/}
          </section>
          {/* END SIGN-IN */}
        </div>
        {/* End Page-content */}
      </div>

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
                        Register
                      </h2>
                      <p className="text-white-50 mb-5">
                        Please enter Email and new Password!
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
                        Sign Up
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

export default Register;
