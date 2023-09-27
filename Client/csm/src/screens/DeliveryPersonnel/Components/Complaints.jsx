import React, { useContext, useEffect ,useState } from 'react';
import axios from 'axios';
import "../css/complaint.css"
import { toast } from 'react-toastify';
import { getOrderIdAPI } from '../Services/DpService';
import { AuthContext } from "../../utils/GlobalStates";
import { createUrl } from '../../utils/utils';

function Complaints () {
    var [OrderId, setOrderId] = useState([]);
    var [selectedFilter, setSelectedFilter] = useState(""); 
    const [complaint, setComplaint] = useState('');
    var [authState, setAuthState] = useContext(AuthContext);



  useEffect(() => {
    GetOrderId();
  },[]);

  const handleSubmit = async () => {
    debugger;
    var data = { complaint: complaint, id: authState.user_id ,order_id : selectedFilter};
    try {
      const url = createUrl("/api/DeliveryPersonnel/AddComplaint");
      const response = await axios.post(url, data);
      if(response.status == 200 && response.data != null){
        toast.success('Complaint submitted');
      }
    } catch (error) {
      toast.error('Error submitting complaint');
      // Handle the error here
    }
  };

  const renderOption = () => {
    return OrderId.map(order => (
      <option key={order} value={order}>
        {order}
      </option>
    ));
  }

  const GetOrderId = async () => {
    var response = await getOrderIdAPI(authState);
    setOrderId(response.data);
  }

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
  };


  return (
    <div style={{ padding: '100px', margin: '150px' }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {/* You can place any content you want here */}
      </div>
      <div className="form-group mt-1">
           <div>
            <label>Order ID</label>
           </div>
           <div>
            <select onChange={handleFilterChange}>
            {renderOption()}
            </select>
           </div>
          </div>
      <div>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter your complaint"
          rows="4" cols="95"
          required
        />
        <button className='button' onClick={handleSubmit}>Submit Complaint</button>
      </div>
    </div>
  );
};

export default Complaints;
