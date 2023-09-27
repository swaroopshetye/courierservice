import { useContext, useState } from "react";
import { AuthContext } from "../../utils/GlobalStates";
import { sendResetPasswordAPI } from "../Services/DispatcherService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword(){

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [authState, setAuthState] = useContext(AuthContext);
const navigate = useNavigate();

const sendResetPassword = async() => {
  debugger;
  let user = {email: email, password: password};
  const response = await sendResetPasswordAPI(user, authState);
  if(response.status == 200){
    if(response.data == "EXPIRED" || response.data == "INVALID"){
      navigate("/login");
      toast.warning("Session Time Expired");
    }else if(response.data == 0){
      toast.warning("You Entered Old Password. Please Enter New Password");
    }else{
      navigate("/login");
      toast.success("Password Changed");
    }    
  }else{
    toast.error("Failed To Reset Password");
  }      
}

return(  
  <div className="container" style={{marginLeft:"350px", marginTop:"200px"}}>
    <div className="Auth-form-content mb-5">
      <h3 className="Auth-form-title">Password Reset</h3>
    <div className="form-group mt-3">
        <label>Email address</label>
        <input
        type="email"
        name='LoginEmail'
        className="form-control mt-1"
        placeholder="Enter email"
        required
        onChange={e => setEmail(e.target.value)}
        />
    </div>   
    <div className="form-group mt-3"> 
    <label>New Password</label>
    <input
      type="email"
      name='LoginEmail'
      className="form-control mt-1"
      s  placeholder="Enter New Password"
      required
     onChange={e => setPassword(e.target.value)}
     />
  </div>
  <div className="form-group mt-3">
    <label>Confirm Password</label>
    <input
      type="password"
      name='LoginPassword'
      className="form-control mt-1"
      placeholder="Enter Confirm Password"
      required
      // onChange={e => setPassword(e.target.value)}
      />
  </div>
  <div className="d-grid gap-2 mt-3">
    <button type="submit" className="btn btn-primary" onClick={sendResetPassword}>
      Submit
    </button>
  </div>
  </div>
  </div>
);
}

export default ResetPassword;