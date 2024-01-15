import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import './CreateList.css';
import { useNavigate } from 'react-router-dom';

const CreateList = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleAddList = (event) => {
        event.preventDefault();
        const listName = event.target.listName.value;
        const listCreatedBy = event.target.listCreatedBy.value;

    
        const list = {
            listName,
            listCreatedBy,
        };
    
        const url = `http://localhost:5000/add-list`;
        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(list),
        })
          .then((res) => res.json())
          .then((result) => {
            navigate("/my-leads");
            alert('List Created');
          });
      };


    return (
        <div>
            <div className="vh-100 d-flex justify-content-center align-items-center p-5">
                <div className="text-center dashboard-card">
        <form onSubmit={handleAddList} className='col-lg-8'>
            <input className='list-input' type='text' name='listName' placeholder='List Name'></input> <br></br>
            <input hidden type='email' name='listCreatedBy' value={user?.email} ></input>
            <div className='d-flex justify content-center list-input'><input className='btn btn-primary mt-5 w-100 p-3' type='submit' value='Add New List'></input></div>
        </form>
      </div></div>
        </div>
    );
};

export default CreateList;