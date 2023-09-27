import { useEffect, useState, useContext } from "react";
import { AddEmployee, getRolesAPI } from "../Services/AdminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/GlobalStates";

function Add({toggleComponent}) {

    var [user, setUser] = useState({first_name: "", last_name: "", email:"", password:"", address: "", mobile: ""});
    var [selectedFilter, setSelectedFilter] = useState("ADMIN");  
    var [roles, setRoles] = useState([]);
    const[authState, setAuthState] = useContext(AuthContext);

  
    const navigate = useNavigate();

    useEffect(() => {
      getRoles();
    },[]);

                                                                             
    const onTextChange = (args) =>{
        var copy = {...user};
        copy[args.target.name] = args.target.value;
        setUser(copy);
    }



    const handleFilterChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedFilter(selectedValue);
    };


    const renderOption = () => {
      return roles.map(role => (
        <option key={role} value={role}>
          {role}
        </option>
      ));
    }
  

    const getRoles = async () => {
      var response = await getRolesAPI(authState);
      if(response.status == 200){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");
        }
        else{
          setRoles(response.data);
        }    
      }else{
        toast.error("Failed To Load Roles");
      }
    }


  const Submit = async () =>{
    debugger;
    var role_name = selectedFilter;
    var data = authState;
    var sentData = {data, user, role_name}
    const response = await AddEmployee(sentData);
    if(response.status == 200 && response.data != 0){
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        toast.warning("Session Time Expired");
      }
      else{
        toggleComponent("EmployeeDirectory");
        toast.success("Employee Added Successfully");
      }  
    }else{
      toast.error("Failed To Add Employee");
    }
  }
    
    return(<div className="container row">
    <div className="col"></div>
    <div className="Auth-form-content col">
        <h3 className="Auth-form-title">Add User</h3>
    <div className="form-group mt-1">
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
          <div className="form-group mt-1">
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
          <div className="form-group mt-1">
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
          <div className="form-group mt-1">
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
          <div className="form-group mt-1">
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
          <div className="form-group mt-1">
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
          <div className="form-group mt-1">
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
          <div className="form-group mt-1">
           <div>
            <label>Role</label>
           </div>
           <div>
            <select onChange={handleFilterChange}>
            {renderOption()}
            </select>
           </div>
          </div>
          <div className="row mt-3">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary btn-block" onClick={Submit}>
              Submit
            </button>
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-danger btn-block" onClick={() => toggleComponent("EmployeeDirectory")}>
              Cancel
            </button>
          </div>
        </div>
        </div>
      <div className="col">
      </div>
      </div>);
}

export default Add;