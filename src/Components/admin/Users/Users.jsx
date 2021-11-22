import React, { useState, useEffect } from "react";
import { axios2 } from "./../../../axios";
import UserDetailModel from "./UserDetailModel";
function Users() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [page, setPage] = useState(1);
  const [modalUserShow, setModalUserShow] = React.useState(false);
  useEffect(() => {
    let componentMounted = true;
    axios2.get("/admin/api/users").then((data) => {
      if (componentMounted) setUsers(data.data);
    });
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <div id="user_dashboard">
      <UserDetailModel
        show={modalUserShow}
        userId={userId}
        onHide={() => setModalUserShow(false)}
      />
      <h2>USERS</h2>
      <table>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>ACTIONS</th>
        </tr>
        {users.slice((page - 1) * 10, 10 * page)?.map((user) => (
          <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email_address}</td>
            <td>{user.user_role}</td>
            <td>{user.user_status}</td>
            <td>
              <button
                id={user.customer_id}
                className="bg-info py-1 px-3 border-0"
                onClick={(e) => {
                  setModalUserShow(true);
                  setUserId(e.target.id);
                }}
              >
                SHOW
              </button>
            </td>
          </tr>
        ))}
      </table>
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination" style={{ justifyContent: "center" }}>
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li
            className={`page-item ${page == 1 ? "active" : ""}`}
            ariaCurrent={page == 1 ? "page" : ""}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage(1);
              }}
            >
              1
            </a>
          </li>
          <li
            className={`page-item ${page == 2 ? "active" : ""}`}
            ariaCurrent={page == 2 ? "page" : ""}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage(2);
              }}
            >
              2
            </a>
          </li>
          <li
            className={`page-item ${page == 3 ? "active" : ""}`}
            ariaCurrent={page == 3 ? "page" : ""}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage(3);
              }}
            >
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Users;
