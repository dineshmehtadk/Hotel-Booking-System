import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../../components/context/authContext';

import "./Login.css"
const Login = () => {
    const {error,loading,dispatch} = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()



   const submitHandler= async e=>{
       e.preventDefault();
       dispatch({type: "LOGIN_START "});
       try{
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        
           const res = await axios.post('http://localhost:4000/api/login',{username,password},config);
           dispatch({type: "LOGIN_SUCCESS", payload: res.data})
           console.log(res)
           navigate('/')
           

       }catch(err){
           dispatch({type: "LOGIN_FAILURE", payload: err.response.data})

       }
   }

   
  return (
    <div className="login">
        {error && <span>{error.error}</span>}
        <form onSubmit={submitHandler}>
        <label>Username</label> 
        <input value={username} type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
        <label>Password</label>
        <input type="text" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <button disabled={loading} type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login