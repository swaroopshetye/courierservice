import { useEffect, useState, useContext } from "react";
import { getCitiesAPI, getOrdersAPI } from "../Services/AdminService";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../utils/GlobalStates";


function Orders() {
   
  var [orders, setOrders] = useState([]);
  var [selectedFilter, setSelectedFilter] = useState("");
  var [cities, setCities] = useState([]);
  var [authState, setAuthState] = useContext(AuthContext);

  const navigate = useNavigate();

  const headerMapping = {
    'Order ID': 'order_id',
    'Receiver Name': 'receiver_name',
    'Receiver Email': 'receiver_email',
    'Receiver Mobile': 'receiver_mobile',
    'Receiver Address': 'receiver_address',
    'Package Count': 'package_count',
    'Package Type':'package_type',
    'Amount': 'amount',
    'Status': 'status',
    'Customer ID': 'customer_id',
    'Personnel ID': 'personnel_id'
  };




  useEffect(() => {
    debugger;
    getOrders(selectedFilter);
    getCities();
  },[]);

  useEffect(() => {
    getOrders(selectedFilter);
  },[selectedFilter]);


  const getOrders = async(selectedFilter) => {
    debugger;
    const response = await getOrdersAPI(selectedFilter, authState);
    if(response.status == 200){
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        // toast.warning("Session Time Expired");
      }
      else{
        setOrders(response.data);
      }
    }else{
      toast.error('Error while calling get orders api')
    }
  }


  
  const getCities = async() => {
    const response = await getCitiesAPI(authState);
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



  const renderOrders = () =>
    orders.map(order => (
      <tr key={order.order_id}>
        {Object.keys(headerMapping).map(label => (
            <td key={label}>{order[headerMapping[label]]}</td>
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
        <div>
          <h2>Orders Table</h2>
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
        {renderOrders()}
        </tbody>
      </table>
    </div>
</>  );

}
export default Orders;