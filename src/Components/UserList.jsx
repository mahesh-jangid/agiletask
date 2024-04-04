import axios from "axios";
import { useEffect, useState } from "react";
import { EditUser } from "./EditUser";
import { Link } from "react-router-dom";
import setupAxiosInterceptors from '../AxiosIntersepter';

setupAxiosInterceptors()

export const UserList = () => {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editUserId, setEditUserId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false); 
  
    useEffect(() => {
      fetchUsers();
    }, [currentPage, searchTerm]);
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          `https://node-product-distribution-backend.agiletechnologies.in/d/user/list`,
          {
            page: currentPage,
            search: searchTerm
          },
          config
        );
        setUsers(response.data.data.adminUserList);
        setTotalPages(response.data.data.total_records);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handleEditUser = (userId) => {
      setEditUserId(userId);
      setShowEditModal(true); // Show the modal when Edit button is clicked
    };
  
    const handleCloseModal = () => {
      setShowEditModal(false); // Close the modal
      setEditUserId(null); 
    };
  
    return (
      <div>
        <h2>User List</h2>
        <div>
          <button>
            <Link to={"/addUser"}>Add User</Link>
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Mobile</th>
              <th>Points</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.mobileNo}</td>
                <td>{user.point}</td>
                <td>
                  <button onClick={() => handleEditUser(user._id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        {showEditModal && <EditUser userId={editUserId} onClose={handleCloseModal} />}
      </div>
    );
  };

  const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const numPageButtons = 5; 
    const pages = [];
      let startPage = Math.max(1, currentPage - Math.floor(numPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + numPageButtons - 1);
  
    if (endPage - startPage + 1 < numPageButtons) {
      startPage = Math.max(1, endPage - numPageButtons + 1);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return (
      <div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };
  