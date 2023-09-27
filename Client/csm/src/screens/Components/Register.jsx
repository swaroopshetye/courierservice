import React, {useState} from "react"
import { useNavigate} from "react-router-dom"
import "../css/App.css"
import { RegisterCustomerAPI } from "../Services/RegisterServices";
import { toast } from "react-toastify";


function Register () {

  const navigate = useNavigate();
  var [user, setUser] = useState({first_name: "", last_name: "", email:"", password:"", address: "", mobile: ""});
 
  const GoToLogin = () =>{
      navigate('/login');
  }

  const onTextChange = (args) =>{
      var copy = {...user};
      copy[args.target.name] = args.target.value;
      setUser(copy);
  }

  const Submit = async() =>{
    const response = await RegisterCustomerAPI(user);
    if(response.status == 200 && response.data != 0){
      GoToLogin();
      toast.success("Customer Registration Done Successfully");
    }else{
      toast.error("Customer Registration Failed");
    }
  }

  return (
    <div className="Auth-form-container">
      {/* <form className="Auth-form" action="http://localhost:54556/api/Login/Registration" method="post"> */}
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={GoToLogin}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              className="form-control mt-1"
              placeholder="e.g James"
              onChange={onTextChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control mt-1"
              placeholder="e.g Doe"
              onChange={onTextChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="form-control mt-1"
              placeholder="e.g Sangli"
              onChange={onTextChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Mobile Number</label>
            <input
              type="number"
              name="mobile"
              className="form-control mt-1"
              placeholder="e.g 9923130244"
              onChange={onTextChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={onTextChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={onTextChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              required
            />
          </div>
          <div color="red" id="ErrorBox">
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={Submit}>
              Submit
            </button>
          </div>
        </div>
      {/* </form> */}
  </div>);
}
export default Register;