import { useContext, useEffect, useState } from "react";
import {getEmployeesAPI} from "../Services/DispatcherService";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/GlobalStates";

function DispatcherEmployeeDirectory() {
   
    var [employees, setEmployees] = useState([]);
    var [authState, setAuthState] = useContext(AuthContext);
    const navigate = useNavigate();
    
  
const headerMapping = {
  'Employee ID': 'user_Info.user_Id',
  'First Name': 'user_Info.first_name',
  'Last Name': 'user_Info.last_name',
  'Email': 'user_Info.email',
  'Address': 'user_Info.address',
  'Mobile': 'user_Info.mobile',
  'Status': 'user_Info.status'
};
  
    useEffect(() => {
      loadEmployees();
    },[]);
  
    const loadEmployees = async(selectedFilter) => {
      debugger;
      let response = await getEmployeesAPI(authState);
      if(response.status == 200){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");
        }
        else{
          setEmployees(response.data);
          console.log(response.data);
        }   
      }else{
        toast.error('Error while calling get api')
      }  
    }  



const renderEmployees = () =>
  employees.map((employee, index) => (
    <tr key={index}>
      <td>{employee.user_Info.user_Id}</td>
      <td>{employee.user_Info.first_name}</td>
      <td>{employee.user_Info.last_name}</td>
      <td>{employee.user_Info.email}</td>
      <td>{employee.user_Info.address}</td>
      <td>{employee.user_Info.mobile}</td>
      <td>{employee.user_Info.status}</td>
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
  
  
    return (<>
      <div style={{ margin: '50px' }}>
        <div style={{display:"flex", flexDirection:"row" , alignItems:"center", justifyContent:"space-between"}}> 
          <div style={{alignContent:"center"}}>
            <h2>Employees</h2>
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

export default DispatcherEmployeeDirectory;