import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function View() {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id);
    const [user, setUser] = useState([]);

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
    }, [id])



    const BackToHome = () => {
        navigate("/");
    }

    return (
        <>
            <div className="container bg-dark my-5">
                <div className="row">
                    <div className="col-md-10 mx-auto p-4">
                        <h4 className="text-center text-white my-4">USER DETAIL</h4>
                        <table className="table">
                            <thead>
                                <tr className="text-dark fw-800 fs-5 bg-danger">
                                    <th scope="col">Fname</th>
                                    <th scope="col">Lname</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-white">
                                    <td>{user.Fname}</td>
                                    <td>{user.Lname}</td>
                                    <td>{user.Email}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-center">
                            <button className="btn btn-danger" onClick={BackToHome}>BACK USER DETAILS</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View
