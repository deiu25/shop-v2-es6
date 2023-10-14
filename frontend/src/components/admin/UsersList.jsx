import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Sidebar } from "./Sidebar";
import { toast } from "react-hot-toast";
import React from "react";

import Loader from "../layout/Loader";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/adminApi";

export const UsersList = () => {
  const { data: usersData, isLoading } = useAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const users = usersData.users;
  return (
    <>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2 sidebar-no-margin">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Users</h1>

            <table className="table table-striped table-bordered table-hover table-responsive table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>

                      <td>
                        <Link
                          to={`/admin/user/${user._id}`}
                          className="btn btn-primary py-1 px-2"
                        >
                          <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-danger py-1 px-2 ml-2"
                          onClick={() => deleteUserHandler(user._id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>
    </>
  );
};
