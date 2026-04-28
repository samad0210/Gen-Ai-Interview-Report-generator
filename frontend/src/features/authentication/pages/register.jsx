// import React from 'react'
// import { useState } from 'react';
// import { Link } from 'react-router';
// import { useAuth } from '../hooks/useauth';
// import {useNavigate} from 'react-router'

// const Register = () => {
//     const navigate = useNavigate();
//     const { loading,handleRegister } = useAuth();
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//       await handleRegister({username,email,password})
//         navigate("/")

//     }

//     if(loading){
//         return <p>Loading...</p>
//     }
//   return (
//     <main>
//     <div className="form-container">
//     <h1>Register</h1>
//     <form onSubmit={handleSubmit}>

//         <div className="input-group">
//             <label>username</label>
//             <input type="text" 
//             onChange={(e)=>{setUsername(e.target.value)}}
//             id="username" name="username" placeholder='Enter Your Username' />

//         </div>

//         <div className="input-group">
//             <label>Email</label>
//             <input type="email" 
//             onChange={(e)=>{setEmail(e.target.value)}}
//             id="email" name="email" placeholder='Enter Your Email' />

//         </div>
//         <div className="input-group">
//             <label>Password</label>
//             <input type="password" 
//             onChange={(e)=>{setPassword(e.target.value)}}
//             id="password" name="password" placeholder='Enter Your Password' />
//         </div>
//         <button className='button primary-button' type="submit">Register</button>
//     </form>
//     <p> Already have an account ? <Link to="/login">Login</Link></p>
//    </div>
//    </main>
//   )
// }

// export default Register


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useauth'

const Register = () => {
    const navigate = useNavigate();
    const { loading, handleRegister } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        // ✅ validation
        if (!username) newErrors.username = "Username is required";
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (password && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setErrors({});
            await handleRegister({ username, email, password });
            navigate("/");
        } catch (err) {
            setErrors({
                general: err || "Registration failed"
            });
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit} noValidate>

                    {/* Username */}
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter Your Username'
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>

                    {/* Email */}
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Your Password'
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button className='button primary-button' type="submit">
                        Register
                    </button>

                    {/* Backend error */}
                    {errors.general && <p className="error">{errors.general}</p>}

                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register