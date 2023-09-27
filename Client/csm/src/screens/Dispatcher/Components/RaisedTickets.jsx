import { useEffect, useState, useContext} from "react";
import {getComplaintsAPI, getRolesAPI} from "../Services/DispatcherService";
import {toast} from 'react-toastify';
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/GlobalStates";

function RaisedTickets() {
   
    var [complaints, setComplaints] = useState([]);
    var [selectedFilter, setSelectedFilter] = useState("3");
    var [roles, setRoles] = useState([]);
    var [authState, setAuthState] = useContext(AuthContext);
    const navigate = useNavigate();
    
  
    const headerMapping = {
      'Complaint ID': 'complaint_id',
      'Complaint': 'complaint1',
      'Status': 'status',
      'Placed Date': 'placed_date',
      'Resolved Date': 'resolved_date',
      'Order_id': 'order_id',
      'Customer_id':'customer_id'
    };
  
  
    useEffect(() => {
      loadComplaints(selectedFilter);
    },[]);
  
    useEffect(() => {
      loadComplaints(selectedFilter);
    },[selectedFilter]);

    const loadComplaints = async(selectedFilter) => {
        // debugger;
        // let id = props.target.id;
        let response = await getComplaintsAPI(selectedFilter, authState);
        if(response.status == 200){
          debugger;
          if(response.data == "EXPIRED" || response.data == "INVALID"){
            navigate("/login");
            toast.warning("Session Time Expired");
          }
          else{
            setComplaints(response.data);
          }       
        }else{
          toast.error("Error Fetching Package Types");
        }
      } 


      const renderOption = () => {
        return roles.map(role => (
          <option key={role} value={role}>
            {role}
          </option>
        ));
      }
  
    const renderComplaints = () =>
    complaints.map(complaint => (
        <tr key={complaint.complaint_id}>
          {Object.keys(headerMapping).map(label => (
              <td>{complaint[headerMapping[label]]}</td>
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
          <div style={{alignContent:"center"}}>
            <h2>Complaints</h2>
          </div>
          <div>
        <select onChange={handleFilterChange}>
          <option value="3">Delivery Personnel</option>
          <option value="4">Customer</option>
          {renderOption()}
        </select>
        </div>
        </div>
        <table className="table table-bordered">
          {renderHeader()}
          <tbody>
          {renderComplaints()}
          </tbody>
        </table>
      </div>
  </>  );
  }

export default RaisedTickets;