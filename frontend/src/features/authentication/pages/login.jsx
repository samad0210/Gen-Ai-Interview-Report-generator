// import React from 'react'
// import { useState } from 'react';
// import '../auth.form.scss'
// import { Link } from 'react-router';
// import { useAuth } from '../hooks/useauth';
// import {useNavigate} from 'react-router'

// const Login = () => {
//     const { loading,handleLogin } = useAuth();
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//        await handleLogin({email,password})
//         navigate("/")
//     }
//     if(loading){
//         return <p>Loading...</p>
//     }

//   return (
//    <main>
//     <div className="form-container">
//     <h1>Login</h1>
//     <form onSubmit={handleSubmit}>
//         <div className="input-group">
//             <label>Email</label>
//             <input 
//             type="email" 
//             id="email" 
//             name="email" 
//             onChange={(e)=>{setEmail(e.target.value)}}
//             placeholder='Enter Your Email' />

//         </div>
//         <div className="input-group">
//             <label>Password</label>
//             <input 
//             type="password" 
//             id="password" 
//             name="password" 
//             onChange={(e)=>{setPassword(e.target.value)}}
//             placeholder='Enter Your Password' />
//         </div>
//         <button className='button primary-button' type="submit">Login</button>
//     </form>
//     <p>Dont have an account? <Link to="/register">Register</Link></p>
//    </div>
//    </main>
//   )
// }

// export default Login


import React, { useState } from 'react'
import '../auth.form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useauth'

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 🔥 errors object
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        // ✅ Frontend validation
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";

        // email format
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // clear old errors
            setErrors({});

            await handleLogin({ email, password });

            navigate("/");
        } catch (err) {
            // 🔥 backend error show
            setErrors({
                general: err?.message || "Invalid email or password"
            });
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                        />
                        {/* 🔥 email error */}
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Your Password'
                        />
                        {/* 🔥 password error */}
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button className='button primary-button' type="submit">
                        Login
                    </button>

                    {/* 🔥 general backend error */}
                    {errors.general && <p className="error">{errors.general}</p>}

                </form>

                <p>Dont have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login;