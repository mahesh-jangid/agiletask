import axios from "axios";
import { useState } from "react";
import setupAxiosInterceptors from '../AxiosIntersepter';

setupAxiosInterceptors()
export const AddUser = () => {
    const token = localStorage.getItem("token")
  
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [points, setPoints] = useState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`https://node-product-distribution-backend.agiletechnologies.in/admin/user/create`, {
          userName:username,
          mobileNo:mobile,
          point:Number(points)
        },
        config
        );
        alert("success")
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };
  
    return (
      <div className="adduser">
        <div>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
            </div>
       <div>
       <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
       </div>
        <div>
        <input
            type="number"
            placeholder="Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
          />
        </div>
       
          <button type="submit">Add User</button>
        </form>
        </div>
       
      </div>
    );
  };