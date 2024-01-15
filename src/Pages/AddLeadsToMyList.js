import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./CreateList.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../firebase.init";

const AddLeadsToMyList = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [lead, setLead] = useState([]);
  const [lists, setLists] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/my-lead/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((info) => setLead(info))
      .catch((error) => {
        console.error("Error fetching lead data:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/lists`)
      .then((res) => res.json())
      .then((info) => setLists(info));
  }, []);

  const handleAddList = (event) => {
    event.preventDefault();
    const leadAddedToList = event.target.leadAddedToList.value;

    const lead = {
      leadAddedToList,
    };

    const url = `http://localhost:5000/my-update-lead/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(lead),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/my-leads");
        alert("Lead Added to Your List");
      });
  };

  return (
    <div>
      <div className="vh-100 d-flex justify-content-center align-items-center p-5">
        <div className="text-center dashboard-card">
          {lists.filter((list) => list.listCreatedBy === user?.email).length ===
            0 && (
            <Link className="btn btn-primary mt-5 w-100 p-3" to="/create-list">
              You dont have any list. Create New List
            </Link>
          )}
          {lists.filter((list) => list.listCreatedBy === user?.email).length >
            0 && (
            <form onSubmit={handleAddList} className="col-lg-8">
              <h5>You are adding {lead.personEmail}</h5>
              <select name="leadAddedToList">
                {lists.map(
                  (list) =>
                    list.listCreatedBy === user?.email && (
                      <option value={list.listName}>{list.listName}</option>
                    )
                )}
              </select>

              <div className="d-flex justify content-center list-input">
                <input
                  className="btn btn-primary mt-5 w-100 p-3"
                  type="submit"
                
                  value="Add Lead To My Selected List"
                ></input>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLeadsToMyList;
