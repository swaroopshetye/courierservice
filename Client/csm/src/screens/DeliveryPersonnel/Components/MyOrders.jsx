import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { createUrl } from "../../utils/utils";
import { AuthContext } from "../../utils/GlobalStates";




function MyOrders() {
  var [orders, setOrders] = useState([]);
  var [selectedFilter, setSelectedFilter] = useState("");
  var [cities, setCities] = useState([]);
  var [authState, setAuthState] = useContext(AuthContext);
  


  const headerMapping = {
    'Order ID': 'order_id',
    'Receiver Name': 'receiver_name',
    'Receiver Email': 'receiver_email',
    'Receiver Mobile': 'receiver_mobile',
    'Receiver Address': 'receiver_address',
    'Package Count': 'package_count',
    'Amount': 'amount',
    'Status': 'status',
  };


  useEffect(() => {
    getOrders();
    // getCities();
  },[]);

  useEffect(() => {
    console.log(selectedFilter);
    getOrders();
  },[selectedFilter]);


    
  const getOrders = () =>{
    debugger;
    let url = createUrl(`/api/DeliveryPersonnel/GetMyOrders/${authState.user_id}`);
    axios.get(url)
    .then((response) => {
      debugger;
      var responseData = response.data;
      setOrders(responseData);
    })
    .catch(error => {
      console.log(error);
    })
  }


  function OrderDelivered(props){
    let id = props.target.id;
    let url = createUrl(`/api/DeliveryPersonnel/OrderDelivered/${id}`);
      axios.put(url)
      .then((response) => {
      debugger;
      var responseData = response.data;
      if (responseData!=0) {
        getOrders();
      }
      })
      .catch(error => {
      console.log(error);
      })
    }
  

 function OrderUndelivered(props) {

  let id = props.target.id;
    let url = createUrl(`/api/DeliveryPersonnel/OrderUndelivered/${id}`);
      axios.put(url)
      .then((response) => {
      debugger;
      var responseData = response.data;
      if (responseData!=0) {
        getOrders();
      }
      })
      .catch(error => {
      console.log(error);
      })
 
 }
 



  const renderOption = () => {
    return cities.map(city => (
      <option key={city} value={city}>
        {city}
      </option>
    ));
  }

  const renderDelivery = () =>
      orders.map(order => (
        <tr key={order.user_id}>
          {Object.keys(headerMapping).map(label => (
              <td>{order[headerMapping[label]]}</td>
              ))}
          <td ><button className="btn btn-warning" id={order[headerMapping['Order ID']]} onClick={(props) => OrderDelivered(props)}>Delivered</button></td>
          <td ><button className="btn btn-danger"  id={order[headerMapping['Order ID']]} onClick={(props) => OrderUndelivered(props)}>Undelivered</button></td>
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
          <option value="">All</option>
          {renderOption()}
        </select>
        </div>
      </div>
      <table className="table table-bordered">
        {renderHeader()}
        <tbody>
        {renderDelivery()}
        </tbody>
      </table>
    </div>
</>  );
}

export default MyOrders;