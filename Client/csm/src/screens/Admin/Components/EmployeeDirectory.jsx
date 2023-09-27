import { useEffect, useState, useContext } from "react";
import { deleteEmployeeAPI, getEmployeesAPI, getRolesAPI } from "../Services/AdminService";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../../utils/GlobalStates";

function EmployeeDirectory({toggleComponent, updateData}) {
  
  var [employees, setEmployees] = useState([]);
  var [selectedFilter, setSelectedFilter] = useState("ADMIN");
  var [deleteEmployeeId, setDeleteEmployeeId] = useState("");
  var [roles, setRoles] = useState([]);
  var [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();




  const headerMapping = {
    'Employee ID': 'user_Id',
    'First Name': 'first_name',
    'Last Name': 'last_name',
    'Email': 'email',
    'Address': 'address',
    'Mobile': 'mobile',
    'Status': 'status'
  };  

  useEffect(() => {
    // debugger;
    loadRoles();
    loadEmployees(selectedFilter);
  },[]);  

  useEffect(() => {
    // debugger;
    loadEmployees(selectedFilter);
  },[selectedFilter]);  

  useEffect(() => {
    // debugger;    
    loadEmployees(selectedFilter);
  },[deleteEmployeeId]);  

    
  
  
    
    const deleteEmployeeBtn = async(props) => {
      // debugger;
      let id = props.target.id;
      let response = await deleteEmployeeAPI(id, authState);
      if(response.status == 200){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");
        }
        else{
          toast.success('Employee Deleted Successfully');
          setDeleteEmployeeId(id);
        }    
      }else{
        toast.error('Error while calling get api')
      }
    }


    const loadEmployees = async(selectedFilter) => {
      // debugger;
      let response = await getEmployeesAPI(selectedFilter, authState);
      if(response.status == 200){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");
        }
        else{
          setEmployees(response.data);
        }   
      }else{
        toast.error('Error while calling get api')
      }  
    }  
    


    const loadRoles = async() => {
      // debugger;
      let response = await getRolesAPI(authState);
      if(response.status == 200){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");
        }
        else{
          setRoles(response.data);
        }
      }else{
        toast.error('Error while calling roles api')
      }
    }





    const AddEmployee = () =>{
      toggleComponent("Add");
    } 


    function updateEmployee(props){
      // debugger;
      var id = props.target.id;
      toggleComponent("Update");
      updateData(id);
    } 
  
  
  
    const renderOption = () => {
      return roles.map(role => (
        <option key={role} value={role}>
          {role}
        </option>
      ));
    }
  
  
  
  const renderEmployees = () =>
    employees.map(employee => (
      <tr key={employee.user_id}>
        {Object.keys(headerMapping).map(label => (
            <td>{employee[headerMapping[label]]}</td>
            ))}
        <td ><button className="btn btn-warning" id={employee[headerMapping['Employee ID']]} onClick={(props) => updateEmployee(props)}>Update</button></td>
        <td ><button className="btn btn-danger"  id={employee[headerMapping['Employee ID']]} onClick={(props) => deleteEmployeeBtn(props)}>Delete</button></td>
      </tr>
    ));

      
    const renderHeader = () => {
      return (
        <thead>
        <tr>
            {Object.keys(headerMapping).map(label => (
                <th key={label}>{label}</th>
            ))}
        </tr>
        </thead>
      );
    }
  
  
    const handleFilterChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedFilter(selectedValue);
    };
  
  
  
    return (<>
      <div style={{ margin: '50px' }}>
      <div style={{alignContent:"center"}}>
            <h2>Employees</h2>
          </div>
        <div style={{display:"flex", flexDirection:"row" , alignItems:"center", justifyContent:"end"}}> 
          <div style={{margin:"20px"}}>
            <button className="btn btn-primary" 
            style={{paddingLeft:"20px", paddingRight:"20px"}} 
            onClick={AddEmployee}>
            Add</button>
          </div>
          <div>
          <select onChange={handleFilterChange}>
            {renderOption()}
          </select>
          </div>
        </div>
        <table className="table table-bordered">
          {renderHeader()}
          <tbody>
          {renderEmployees()}
          </tbody>
        </table>
      </div>
  </>  );
  }

export default EmployeeDirectory;