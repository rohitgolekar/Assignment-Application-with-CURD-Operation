import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

//start json server
// json-server --watch db.json --port 3333


function List() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // Call UseEffect for User Data
    useEffect(() => {
        async function getAllUsers() {
            try {
                const Users = await axios.get("http://localhost:3333/Users")
                // console.log(Users.data);
                setUsers(Users.data);
            } catch (error) {
                console.log("Something Went Wrong");
            }
        }
        getAllUsers();
    }, [])

    // Delete User
    const deleteUser = async id => {
        await axios.delete(`http://localhost:3333/Users/${id}`);
        const newUser = users.filter((item) => {
            console.log(item);
            return item.id !== id;
        })
        setUsers(newUser);
    }

    const Adduser = () => {
        navigate("/create");
    }

    return (
        <>
            <div className="container my-5 bg-dark text-white">
                <div className="row">
                    <div className="col-md-12 mx-auto p-4">
                        <div className="text-center p-2">
                            <h4 className="text-center">USER DETAILS</h4>
                            <button className="btn btn-success my-2" onClick={Adduser}>ADD USER</button>

                            <input className="form-control my-2 w-50 mx-auto" type="text" placeholder="Search User" onChange={(event) => { setSearch(event.target.value) }} />
                        </div>
                        <hr />
                        <table className="table table-hover">
                            <thead>
                                <tr className="text-dark fw-800 fs-5 bg-danger">
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    // Filter User
                                    users.filter((user) => {
                                        if (search === "") {
                                            return user;
                                        } else if (user.Fname.toLowerCase().includes(search.toLowerCase()) ||
                                            user.Lname.toLowerCase().includes(search.toLowerCase()) ||
                                            user.Email.toLowerCase().includes(search.toLowerCase()))
                                        {
                                            return user;
                                        }

                                        // Display Users Using Map
                                    }).map((user, id) => {
                                        return (

                                            <tr key={id} className="text-white">
                                                <td>{user.Fname}</td>
                                                <td>{user.Lname}</td>
                                                <td>{user.Email}</td>
                                                <td>
                                                    <Link to={`/view/${user.id}`}><i className="mx-2 fas fa-eye"></i></Link>
                                                    <Link to={`/edit/${user.id}`}><i className="mx-2 fas fa-edit text-success"></i></Link>
                                                    <i onClick={() => deleteUser(user.id)} className="mx-2 fas fa-trash-alt text-danger" style={{ cursor: "pointer" }}></i>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List
