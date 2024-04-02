import axios from "axios";
import { useState } from "react";
import setupAxiosInterceptors from '../AxiosIntersepter';
import { Link } from "react-router-dom";

setupAxiosInterceptors()

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        try {
            // Send sign-in request
            const response = await axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/login', { email, password });
            const token = response.data.data.authToken; 
            localStorage.setItem('token', token); 
            // Redirect to protected page
            window.location.href = '/protected';
        } catch (error) {
            console.error('Sign in failed', error);
            setError('Sign in failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="signin">
            <div>
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
            <h2>Welcome To Admin</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                </div>
                <div>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                </div>
                <button  type="submit">Sign In</button>
            </form>
            </div>
           
        </div>
    );
};
