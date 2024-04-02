export const Protected = () => {
    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove token from localStorage
      window.location.href = '/'; // Redirect to login page
    };
  
    return (
      <div>
        <h2>Protected Page</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };