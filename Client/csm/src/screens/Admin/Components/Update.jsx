import { useEffect, useState, useContext } from "react";
import { GetEmployeeDetailsAPI, UpdateEmployeeDetailsAPI } from "../Services/AdminService";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../utils/GlobalStates";

function Update({id, updateData, toggleComponent}) {

  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", address: "", mobile: "", status: "" });
  var [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();
    

    useEffect (() =>{
      GetEmployeeDetails();
    },[id])

    const onTextChange = (args) =>{
        var copy = {...user};
        copy[args.target.name] = args.target.value;
        setUser(copy);
    }

    const GetEmployeeDetails = async() =>{
      debugger;
      let response = await GetEmployeeDetailsAPI(id,authState);
      if(response.status == 200){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");
        }
        else{
          setUser(response.data);
        }
      }else{
        toast.error('Error while getting employee details')
      }
    }


    const UpdateEmployeeDetails = async() =>{
        debugger;
        var user1 = {
            "user_id": id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "address": user.address,
            "mobile": user.mobile,
            "status": user.status
        }
        let response = await UpdateEmployeeDetailsAPI(user1, authState)
        if(response.status == 200){
          if(response.data == "EXPIRED" || response.data == "INVALID"){
            navigate("/login");
            toast.warning("Session Time Expired");
          }
          else{
            toggleComponent("EmployeeDirectory");
            toast.success("Employee Details Updated Succeessfully");
          }            
        }else{
          toast.error("Error Occured During Updating");
        }
    }

    return ( <>
    <div className="container row">
    <div className="col"></div>
      <div className="Auth-form-content col">
      <h3 className="Auth-form-title">Update User</h3>
      <div className="form-group mt-3">
      <label>First Name</label>
          <input
              type="text"
              name="first_name"
              className="form-control mt-1"
              value={user.first_name}
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
          value={user.last_name}
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
          value={user.address}
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
          value={user.mobile}
          onChange={onTextChange}
          required
          />
      </div>
      <div className="form-group mt-3">
          <label>Email address</label>
          <input
          type="email"
          name='LoginEmail'
          className="form-control mt-1"
          value={user.email}
          onChange={onTextChange}
          required>
          </input>
      </div>
      <div className="form-group mt-3">
          <label>Status</label>
          <input
          type="text"
          name='status'
          className="form-control mt-1"
          value={user.status}
          onChange={onTextChange}
          required>
          </input>
      </div>
      <div className="row mt-3">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary btn-block" onClick={UpdateEmployeeDetails}>
              Update
            </button>
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-danger btn-block" onClick={() => toggleComponent("EmployeeDirectory")}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
    </> );
}

export default Update;