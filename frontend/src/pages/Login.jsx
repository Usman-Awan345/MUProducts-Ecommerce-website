import React, { useContext, useState } from "react";
import { shopContext } from "../context/shopContext";
import login from "../assets/login.png";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from "react";


function Login() {
  const { token, setToken, navigate , backendUrl} = useContext(shopContext);
  const [currState, setCurrState] = useState("Login");

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
         if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
         }else {
          toast.error(response.data.message)
         }
      } else{
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
         }else {
          toast.error(response.data.message)
         }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };
  

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <div className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      {/* Container  */}
      <div className="flex h-full w-full">
        {/* Image Side  */}
        <div className="w-1/2 hidden sm:block">
          <img
            src={login}
            alt="loginImg"
            className="object-cover h-full w-full"
          />
        </div>
        {/* Form Side  */}
        <div className="flex w-full sm:w-1/2 items-center justify-center text-[90%]">
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 00">
            <div className="w-full mb-4">
              <h3 className="bold-36">{currState}</h3>
            </div>
            {currState === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="name" className="medium-15">
                  Name
                </label>
                <input
                  onChange={(e)=>setName(e.target.value)} value={name}
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                  required
                />
              </div>
            )}

            <div className="w-full">
              <label htmlFor="name" className="medium-15">
                Email
              </label>
              <input  onChange={(e)=>setEmail(e.target.value)} value={email}
                type="email"
                placeholder="Email"
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="name" className="medium-15">
                Password
              </label>
              <input  onChange={(e)=>setPassword(e.target.value)} value={password}
                type="password"
                placeholder="Password"
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>

            <button type="submit" className="btn-dark w-full mt-5 !py-[9px] !rounded-lg">
              {currState === "Sign Up" ? "Sign Up" : "Login"}
            </button>

            <div className="w-full flex flex-col gap-y-3">
              <div className="underline medium-15">Forgot your password</div>
              {currState === "Login" ? (
                <div>
                  Don't have an Account?
                  <span className="underline medium-15 cursor-pointer" onClick={()=>setCurrState('Sign Up')}>create Account</span>
                </div>
              ) : (
                <div>
                  Already have an account?
                  <span className="underline medium-15 cursor-pointer" onClick={()=>setCurrState('Login')}>Login</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
