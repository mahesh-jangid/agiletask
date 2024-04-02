import { Link } from "react-router-dom";

export const Protected = () => {
    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove token from localStorage
      window.location.href = '/'; // Redirect to login page
    };
  
    return (
      <>
      <div>
        <h2>Protected Page</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
       <div>
       <button>
           <Link to={"/userList"}>UserList</Link>
       </button>
    </div>
    <div>
       <button>
           <Link to={"/addUser"}>AddUser</Link>
       </button>
    </div>
    </>
    );
  };