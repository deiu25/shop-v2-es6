import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";
import { Sidebar } from "./Sidebar";

import { toast } from "react-hot-toast";
import { useGetUserQuery, useUpdateUserMutation } from "../../redux/api/adminApi";
import Loader from "../layout/Loader";


export const UpdateUser = () => {
    const { id } = useParams(); // get user ID from URL
    const navigate = useNavigate();
    const { data: userData, isLoading } = useGetUserQuery(id);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [formState, setFormState] = useState({ name: '', email: '', role: '' });
  
    useEffect(() => {
      if (userData) {
        setFormState(userData.user); // assuming the user data is returned in a field called 'user'
      }
    }, [userData]);
  
    const handleInputChange = (e) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await updateUser({ userId: id, userData: formState });
        toast.success('User updated successfully');
        navigate('/admin/users'); // navigate back to the users list
      } catch (error) {
        toast.error('Failed to update user');
      }
    };
  
    if (isLoading) {
        return <Loader />;
      }

  return (
    <>
        <MetaData title="Update User" />
        <div className="row">
            <div className="col-12 col-md-2 sidebar-no-margin">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mt-2 mb-5">Update User</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    value={formState.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={formState.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role_field">Role</label>

                                <select
                                    id="role_field"
                                    className="form-control"
                                    name='role'
                                    value={formState.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn update-btn btn-block mt-4 mb-3"
                                disabled={isUpdating}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    );  
}
