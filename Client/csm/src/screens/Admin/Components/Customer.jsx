import { useEffect, useState, useContext } from "react";
import { getCustomerCitiesAPI, getCustomersAPI} from "../Services/AdminService";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/GlobalStates";


function Customer() {
   
  var [Customers, setCustomers] = useState([]);
  var [selectedFilter, setSelectedFilter] = useState("ALL");
  var [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const[authState, setAuthState] = useContext(AuthContext);

  const headerMapping = {
    'Customer ID': 'user_Id',
    'First Name': 'first_name',
    'Last Name': 'last_name',
    'Email': 'email',
    'Address': 'address',
    'Mobile': 'mobile',
    'Status': 'status'
  };


  useEffect(() => {
    debugger;
    getCustomers(selectedFilter);
    getCustomerCities();
  },[]);

  useEffect(() => {
    getCustomers(selectedFilter);
  },[selectedFilter]);


  const getCustomers = async(selectedFilter) => {
    debugger;
    const response = await getCustomersAPI(selectedFilter, authState);
    if(response.status == 200){
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        toast.warning("Session Time Expired");
      }
      else{
        setCustomers(response.data);
      }  
    }else{
      toast.error('Error while calling getorders api')
    }
  }


  
  const getCustomerCities = async() => {
    const response = await getCustomerCitiesAPI(authState);
    if(response.status == 200){
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        toast.warning("Session Time Expired");
      }
      else{
        setCities(response.data);
      }  

    }else{
      toast.error('Error while calling getcities api')
    }
  }



  const renderOption = () => {
    return cities.map(city => (
      <option key={city} value={city}>
        {city}
      </option>
    ));
  }



  const renderCustomers = () =>
    Customers.map(Customer => (
      <tr key={Customer.user_id}>
        {Object.keys(headerMapping).map(label => (
            <td key={label}>{Customer[headerMapping[label]]}</td>
        ))}
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
      <div style={{display:"flex", flexDirection:"row" , alignItems:"center", justifyContent:"space-between"}}> 
        <div style={{marginBottom:"20px"}}>
          <h2>Customers</h2>
        </div>
        <div>
        <select onChange={handleFilterChange}>
          <option value="ALL">All</option>
          {renderOption()}
        </select>
        </div>
      </div>
      <table className="table table-bordered">
        {renderHeader()}
        <tbody>
        {renderCustomers()}
        </tbody>
      </table>
    </div>
</>  );

}
export default Customer;