import React, { useState, useContext } from 'react';
import '../css/App.css';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../Services/LoginServices';
import { toast } from 'react-toastify';
import { AuthContext } from '../utils/GlobalStates';
import NavBar from '../Components/NavBar'

function Login() {

  const navigate = useNavigate();
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  const [authState,setAuthState] = useContext(AuthContext);
  
  // const GoToSignUp = () =>{
  //   navigate("/register");
  // }



  // const ResetPassword = () =>{
  //   navigate("/reset");
  // }

const sendLoginData = async() => {
  if(email == "" || password == ""){
      toast.warning("Please Enter Email And Password");
    }else{
        const user = {
          email: email,
          password: password
        };
      const response = await loginAPI(user);
      if(response.status == 200){
        setAuthState({
          ...authState,
          user_id:response.data.user_id,
          token:response.data.token,
          role_id:response.data.role_id
        });

        if (response.data != 0) {
          switch (response.data.role_id) {
            case 1:
              navigate("/admin");              
              break;
            case 2:
              navigate("/dispatcher");              
              break;
            case 3:
              navigate("/deliverypersonnel");              
              break;
            case 4:
              navigate("/customer");              
              break;
            default:
              break;
          }
          toast.success(`Welcome ${response.data.first_name}!`);
        }else{
          toast.warning("Please Enter Correct Password");
        }
      }else{
        toast.error("Customer Login Failed. Please Try Again!");
      }
    }
}
  

  return (<>
  <div>
    <NavBar></NavBar>
  </div>
  <div className="Auth-form-container">
      <div className="Auth-form-content mb-5">
        <h3 className="Auth-form-title">Sign In</h3>
        {/* <div className="text-center">
          Not Registered?{" "}
          <span className="link-primary" onClick={GoToSignUp}>
            Sign Up
          </span>
        </div> */}
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            name='LoginEmail'
            className="form-control mt-1"
            placeholder="Enter email"
            required
            onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            name='LoginPassword'
            className="form-control mt-1"
            placeholder="Enter password"
            required
            onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" onClick={sendLoginData}>
            Submit
          </button>
        </div>
        {/* <p className="forgot-password text-center mt-2">
        <a onClick={ResetPassword}> Forgot password?</a>
        </p> */}
      </div>
  </div>
  </>);
}

export default Login;