import { useEffect, useState, useContext } from "react";
import {getOrdersAPI, getHubLocationsAPI} from "../Services/DispatcherService";
import {toast} from 'react-toastify';
import { AuthContext } from "../../utils/GlobalStates";
import { useNavigate } from "react-router-dom";


function OrderSummary() {
   
  var [orders, setOrders] = useState([]);
  var [selectedFilter, setSelectedFilter] = useState("");
  var [hubLocations, setHubLocations] = useState([]);
  const[authState, setAuthState] = useContext(AuthContext);
  const navigate = useNavigate();
  const headerMapping = {
    'Order ID': 'order_id',
    'Customer ID': 'customer_id',
    'Personnel ID': 'personnel_id',
    'Tracking ID': 'tracking_id',
    'Receiver Name': 'receiver_name',
    'Receiver Email': 'receiver_email',
    'Receiver Mobile': 'receiver_mobile',
    'Receiver Address': 'receiver_address',
    'Package Count': 'package_count',
    'Amount': 'amount',
    'Status': 'status',
    'Departed From': 'departed_from',
    'Reached At': 'reached_at',
    'Destination': 'destination',
    'Updated At': 'updated_at'
  };


  useEffect(() => {
    loadOrders();
  },[]);

  // useEffect(() => {
  //   loadOrders();
  // },[selectedFilter]);

  const loadOrders = async() => {
    debugger;
    let response = await getOrdersAPI(authState);
    if(response.status == 200){
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        toast.warning("Session Time Expired");
      }
      else{
        setOrders(response.data);
      }   
    }else{
      toast.error('Error while calling get api')
    }  
  }
  
  // const getHubLocations = async() => {
  //   const response = await getHubLocationsAPI();
  //   if(response.status == 200){
  //     setHubLocations(response.data);
  //   }else{
  //     toast.error('Error while calling getcities api')
  //   }
  // }


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
      </div>
      <div className="mb-4" style={{display:"flex", flexDirection:"row" , alignItems:"center", justifyContent:"end"}}>
        <select onChange={handleFilterChange}>
          <option value="ALL">All</option>
          {/* <option value="Departed From">Departed From</option>
          <option value="Reached At">Reached At</option>
          <option value="Destination">Destination</option> */}
        </select>
      </div>
      <div style={{ overflowX: 'auto' }}>
      <table className="table table-bordered">
        {renderHeader()}
        <tbody>
        {renderOrders()}
        </tbody>
      </table>
    </div>
    </div>
</>  );

}
export default OrderSummary;