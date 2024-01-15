// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../firebase.init";

// const ReceivedPayment = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   const [profile, setProfile] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/profiles`)
//       .then((res) => res.json())
//       .then((info) => setProfile(info));
//   }, []);

//   const [order, setOrder] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/order/${id}`)
//       .then((res) => res.json())
//       .then((info) => setOrder(info));
//   }, [id]);

//   const handleUpdate = (event) => {
//     event.preventDefault();
//     const paymentStatus = event.target.paymentStatus.value;

//     const update = {
//       paymentStatus,
//     };

//     const url = `http://localhost:5000/payment-received/${order._id}`;
//     fetch(url, {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(update),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         navigate("/user-dashboard");
//       });
//   };

//   return (
//     <form id="receivedPaymentForm" onSubmit={handleUpdate}>
//       <input hidden type="text" name="paymentStatus" value="Received" />
//       {profile.map(
//         (e) =>
//           e.userEmail === user?.email && (
//             <input type="number" name="TotalUserPoint" value={e.userPoint} />
//           )
//       )}
//       <input hidden type="submit" value="Payment Received" />
//     </form>
//   );
// };

// export default ReceivedPayment;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../firebase.init";

// const ReceivedPayment = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   const [profile, setProfile] = useState([]);
//   const [order, setOrder] = useState([]);

//   // Helper function to find the correct profile to update
//   const getProfileToUpdate = () => {
//     return profile.find((e) => e.userEmail === user?.email) || {};
//   };

//   useEffect(() => {
//     // Fetch order details
//     fetch(`http://localhost:5000/order/${id}`)
//       .then((res) => res.json())
//       .then((info) => setOrder(info));

//     // Fetch user profile details
//     fetch(`http://localhost:5000/profiles`)
//       .then((res) => res.json())
//       .then((info) => {
//         const updatedProfiles = info.map((profile) =>
//           profile.userEmail === user?.email ? { ...profile, order: order } : profile
//         );
//         setProfile(updatedProfiles);
//       });
//   }, [id, user, order]);

//   const handleUpdate = (event) => {
//     event.preventDefault();
//     const paymentStatus = event.target.paymentStatus.value;

//     // Calculate total credits from the purchased package
//     const totalCredits = order.totalCredits;

//     // Retrieve user's current userPoint
//     const currentUserPoint = getProfileToUpdate().userPoint || 0;

//     // Add total credits to userPoint
//     const updatedUserPoint = currentUserPoint + totalCredits;

//     // Update userPoint in the user's profile
//     const updatedProfile = profile.map((e) =>
//       e.userEmail === user?.email ? { ...e, userPoint: updatedUserPoint } : e
//     );

//     // Update user profile
//     fetch(`http://localhost:5000/update-credit/${getProfileToUpdate()._id}`, {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//       },
//      body: JSON.stringify({ userPoint: updatedUserPoint.toString() }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         // Update payment status
//         fetch(`http://localhost:5000/payment-received/${order._id}`, {
//           method: "PUT",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({ paymentStatus }),
//         })
//           .then((res) => res.json())
//           .then(() => {
//             navigate("/user-dashboard");
//           });
//       });
//   };

//   return (
//     <form id="receivedPaymentForm" onSubmit={handleUpdate}>
//       <input hidden type="text" name="paymentStatus" value="Received" />
//       {profile.map(
//         (e) =>
//           e.userEmail === user?.email && (
//             <input
//               key={e._id}
//               type="text"
//               name="TotalUserPoint"
//               value={Math.floor(e.userPoint)}
//               readOnly
//             />
//           )
//       )}
//       <input className="mt-5" type="submit" value="Payment Received" />
//     </form>
//   );
// };

// export default ReceivedPayment;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const ReceivedPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [profile, setProfile] = useState([]);
  const [order, setOrder] = useState([]);

  // Helper function to find the correct profile to update
  const getProfileToUpdate = () => {
    return profile.find((e) => e.userEmail === user?.email) || {};
  };

  useEffect(() => {
    // Fetch order details
    fetch(`http://localhost:5000/order/${id}`)
      .then((res) => res.json())
      .then((info) => setOrder(info));

    // Fetch user profile details
    fetch(`http://localhost:5000/profiles`)
      .then((res) => res.json())
      .then((info) => {
        const updatedProfiles = info.map((profile) =>
          profile.userEmail === user?.email
            ? { ...profile, order: order }
            : profile
        );
        setProfile(updatedProfiles);
      });
  }, [id, user, order]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const paymentStatus = event.target.paymentStatus.value;

    // Calculate total credits from the purchased package
    const totalCredits = parseFloat(order.totalCredits) || 0;

    // Retrieve user's current userPoint
    const currentUserPoint = parseFloat(getProfileToUpdate().userPoint) || 0;

    // Add total credits to userPoint
    const updatedUserPoint = currentUserPoint + totalCredits;

    // Update userPoint in the user's profile
    const updatedProfile = profile.map((e) =>
      e.userEmail === user?.email ? { ...e, userPoint: updatedUserPoint } : e
    );

    // Update user profile
    fetch(`http://localhost:5000/update-credit/${getProfileToUpdate()._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userPoint: updatedUserPoint.toString() }),
    })
      .then((res) => res.json())
      .then(() => {
        // Update payment status
        fetch(`http://localhost:5000/payment-received/${order._id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ paymentStatus }),
        })
          .then((res) => res.json())
          .then(() => {
            navigate("/user-dashboard");
          });
      });
  };

  return (
    <>
      <div id="contact" className="contact-area default-padding">
        <div className="container">
          <div className="contact-content">
            <div className="shape">
              <img
                src="assets/img/illustration/contact.png"
                alt="illustration"
              />
            </div>
            <div className="row vh-100 d-flex justify-content-center align-items-center">
              <div className="col-lg-12 contact-form-box">
                <div className="form-box">
                  <form id="receivedPaymentForm" onSubmit={handleUpdate}>
                    <input
                      hidden
                      type="text"
                      name="paymentStatus"
                      value="Received"
                    />
                    {profile.map(
                      (e) =>
                        e.userEmail === user?.email && (
                          <input
                            hidden
                            key={e._id}
                            type="text"
                            name="TotalUserPoint"
                            value={Math.floor(e.userPoint)}
                            readOnly
                          />
                        )
                    )}
                    <div className="d-flex justify-content-center align-items-center">
                      <button type="submit" name="submit" id="submit">
                        Confirmed and add the Credit to the Balance
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceivedPayment;
