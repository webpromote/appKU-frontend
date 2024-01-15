import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const userName = event.target.userName.value;
    const profileStatus = event.target.profileStatus.value;
    const userPoint = event.target.userPoint.value;
    const userEmail = event.target.userEmail.value;
    const fileInput = event.target.profileImg.files[0];

    // Upload the image to imgbb
    try {
      const formData = new FormData();
      formData.append("image", fileInput);
      formData.append("key", "c31014850c05b1ebdcd10234f5ba2e44");

      const imgbbResponse = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );

      const profileImg = imgbbResponse.data.data.url;

      const userUpdate = {
        userName,
        profileImg,
        profileStatus,
        userPoint,
        userEmail,
      };

      const url = `http://localhost:5000/add-profile-info`;
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      })
        .then((res) => res.json())
        .then((result) => {
          navigate("/user-dashboard");
        });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div
      className="vh-100 mt-5"
      data-aos="fade-up"
      data-aos-duration={3000}
    >
        {
            profile.filter(pro => pro.userEmail === user?.email).length === 0 &&
            <form class="form" onSubmit={handleUpdateProfile}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Update</span>
            </h4>
            <div class="col-sm">
              <label className="mt-1">Enter User Name</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter User Name"
                  name="userName"
                />
              </div>
            </div>

            <div class="col-sm">
              <label className="mt-1">Upload Profile Image</label>
              <div class="form-group mb-3">
                <input type="file" class="form-control" name="profileImg" />
              </div>
            </div>

            <div className="col-sm">
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={user?.email}
                  name="userEmail"
                />
                <input
                  type="number"
                  className="form-control"
                  value="100"
                  name="userPoint"
                />
                <input
                  type="text"
                  className="form-control"
                  value="Approved"
                  name="profileStatus"
                />
              </div>
            </div>

            <div class="col-sm mb-5">
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
        }
        {
            profile.filter(pro => pro.userEmail === user?.email).length === 1 &&
            <h3 className="vh-100 d-flex justify-content-center align-items-center"><Link to='/user-dashboard'>You have already an account</Link></h3>
        }
      
    </div>
  );
};

export default UpdateProfile;
