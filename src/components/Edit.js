import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const { id } = useParams(); // useParams returns: an object of key/value pairs of URL parameters. Use it to access match. params of the current <Route> .
    const navigate = useNavigate();
    const [user, setUser] = useState({
        Fname: "",
        Lname: "",
        Email: ""
    });

    // Get Specific User data
    useEffect(() => {
        async function getUsers() {
            try {
                const User = await axios.get(`http://localhost:3333/Users/${id}`)
                // console.log(User.data);
                setUser(User.data);

            } catch (error) {
                console.log("Something Went Wrong");
            }
        }
        getUsers();
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    // Update User
    const onFormUpdate = async e => {
        e.preventDefault();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (user.Fname !== "" && user.Lname !== "" && user.Email !== "" && emailReg.test( user.Email )) {
            try {
                await axios.put(`http://localhost:3333/Users/${id}`, user);
                navigate("/");
            } catch (error) {
                console.log("Something Went Wrong");
            }
        } else {
            alert("Please Fill Correct Fname, Lname And Email.");
        }
    }


    const BackToHome = () => {
        navigate("/");
    }
    return (
        <>
            <div className="container my-5 bg-dark text-white">
                <div className="row">
                    <div className="col-md-6 mx-auto p-4">
                        <h4 className="text-center text-uppercase my-3 bg-danger py-2">EDIT USER</h4>
                        <form>
                            <div className="form-group my-2">
                                <label htmlFor="Fname">ID</label>
                                <input type="text" value={id} onChange={handleChange} className="form-control" readOnly />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="Fname">Fname</label>
                                <input type="text" value={user.Fname} onChange={handleChange} placeholder="Enter Fname" id="Fname" name="Fname" className="form-control" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="Lname">Lname</label>
                                <input type="text" value={user.Lname} onChange={handleChange} placeholder="Enter Lname" id="Lname" name="Lname" className="form-control" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="Email">Email</label>
                                <input type="text" value={user.Email} onChange={handleChange} placeholder="Enter Email" id="Email" name="Email" className="form-control" />
                            </div>
                            <div className="form-group my-2 text-center">
                                <button type="submit" onClick={onFormUpdate} className="btn btn-success">UPDATE USER</button>
                            </div>
                        </form>
                        <div className="text-center">
                            <button className="btn btn-danger my-2" onClick={BackToHome}>BACK USER DETAILS</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit
