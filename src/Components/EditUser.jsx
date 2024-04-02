import axios from "axios";
import { useState } from "react";
import setupAxiosInterceptors from '../AxiosIntersepter';

setupAxiosInterceptors()
export const EditUser = ({ userId, onClose }) => {
    console.log(userId)
      const token = localStorage.getItem("token");
    // const [user, setUser] = useState(null);
  
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [points, setPoints] = useState();
  
    // useEffect(() => {
    //   fetchUser();
    // }, []);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`https://node-product-distribution-backend.agiletechnologies.in/admin/user/update`,
  //       {
  // _id:userId,
  // userName: user.username,
  // mobileNo: user.mobile,
  // point: user.points
  //       },
  //       config);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   };
  
    const handleEdit = async (e) => {
      e.preventDefault()
      try {
       await axios.post(`https://node-product-distribution-backend.agiletechnologies.in/admin/user/update`,
              {
        _id:`${userId}`,
        userName: username,
        mobileNo: mobile,
        point: Number(points)
              },
              config);
        // onClose(); // Close the modal after editing
        // Optionally, you can redirect or show a success message here
        alert("sucees edit")
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
         <div className='modal_head'>
         <h2>Edit User</h2>
          <span className="close" onClick={onClose}>&times;</span>
         </div>
        
        <div>
        <form onSubmit={handleEdit}>
          <div>
          <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername( e.target.value )}
                required
              />
          </div>
             <div>
             <input
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value )}
                required
              />
             </div>
           <div>
           <input
                type="number"
                placeholder="Points"
                value={points}
                onChange={(e) => setPoints(e.target.value )}
                required
              />
           </div>
            
              <button type="submit">Save Changes</button>
            </form>
        </div>
         
          {/* )} */}
        </div>
      </div>
    );
  };