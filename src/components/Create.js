import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        Fname: "",
        Lname: "",
        Email: ""
    });

    const [status, setStatus] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    // Submit User
    const onFormSubmit = async e => {
        e.preventDefault();
        
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (user.Fname !== "" && user.Lname !== "" && user.Email !== "" && emailReg.test( user.Email )) {
            try {
                await axios.post(`http://localhost:3333/Users`, user);
                setStatus(true);
                navigate("/");
            } catch (error) {
                console.log("Something Went Wrong");
            }
        } else {
            alert("Please Fill Correct Fname, Lname And Email.");
        }
    }


    if (status) {
        return <Create />
    }
    return (
        <>
            <div className="container my-5 bg-dark text-white">
                <div className="row">
                    <div className="col-md-6 mx-auto p-4">
                        <h4 className="text-center text-uppercase my-3 bg-danger py-2">ADD USER</h4>
                        <form>
                            <div className="form-group my-2">
                                <label htmlFor="Fname">Fname</label>
                                <input type="text" onChange={handleChange} placeholder="Enter Fname" id="Fname" name="Fname" className="form-control" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="Lname">Lname</label>
                                <input type="text" onChange={handleChange} placeholder="Enter Lname" id="Lname" name="Lname" className="form-control" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="Email">Email</label>
                                <input type="text" onChange={handleChange} placeholder="Enter Email" id="Email" name="Email" className="form-control" />
                            </div>
                            <div className="form-group my-3 text-center">
                                <button type="submit" onClick={onFormSubmit} className="btn btn-success">ADD USER</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Create
