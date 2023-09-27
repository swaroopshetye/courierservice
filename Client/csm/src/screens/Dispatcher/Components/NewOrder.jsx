import { useEffect, useState, useContext } from "react";
import { AddOrderAPI, calculateAmountAPI, getPackageTypeAPI, getReceiverAddressAPI } from "../Services/DispatcherService";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/GlobalStates";

function NewOrder({toggleComponent}) {

  var [order, setOrder] = useState({receiver_name: "", receiver_email: "", receiver_mobile:"", receiver_address:"", package_count:1, package_type:"", amount: "",customer_id:""});
  var [selectedFilter, setSelectedFilter] = useState("Large Delicate");
  var [selectedAddressFilter, setSelectedAddressFilter] = useState("Kolhapur");
  var [selectedAmount, setSelectedAmount] = useState("");  
  var [types, setTypes] = useState([]);
  var [addresses, setAddresses] = useState([]);
  var [authState, setAuthState] = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    getPackageType();
    calculateAmount();
    getReceiverAddress();
  },[]);

  useEffect(() => {
    calculateAmount();
  }, [selectedFilter, order.package_count]);

  
  
  const onTextChange = (args) =>{
      var copy = {...order};
      copy[args.target.name] = args.target.value;
      setOrder(copy);
  }


  const renderOption = () => {
    return types.map((type) => (
      <option key={type.package_type} value={type.package_type}>
        {type.package_type}
      </option>
    ));
  };

  const renderOptionReceiverAddress = () => {
    return addresses.map((address) => (
      <option key={address} value={address}>
        {address}
      </option>
    ));
  };

  const handleFilterChangeReciverAddress = (event) => {
    const selectedValue = event.target.value;
    setSelectedAddressFilter(selectedValue);
    var copy = {...order};
    copy["receiver_address"] = selectedValue;
    setOrder(copy);
  };


  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
    var copy = {...order};
    copy["package_type"] = selectedValue;
    setOrder(copy);
  };



  const validateField = (fieldName, value) => {
    return value.trim() !== "";
  };

  const handleValidation = () => {
    const fieldsToValidate = ["receiver_name", "receiver_email", /* Add other fields here */];
    let isValid = true;
    fieldsToValidate.forEach((fieldName) => {
      const fieldValue = order[fieldName];
      const isFieldValid = validateField(fieldName, fieldValue);
      if (!isFieldValid) {
        isValid = false;
      }
    });
    return isValid;
  };




  const getReceiverAddress = async () => {
    debugger;
    var response = await getReceiverAddressAPI(authState);
    if(response.status == 200){
      debugger;
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        // toast.warning("Session Time Expired");
      }
      else{
        setAddresses(response.data);
        var copy = {...order};
        copy["receiver_address"] = response.data;
        setOrder(copy);    

      }       
    }else{
      toast.error("Error Fetching Package Types");
    }
  }


  const calculateAmount = async() => {
    debugger;
    var response = await calculateAmountAPI(selectedFilter, authState);
    if(response.status == 200){
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        // toast.warning("Session Time Expired");
      }
      else{
        let amount = `${response.data * order.package_count}`;
        setSelectedAmount(amount);
        var copy = {...order};
        copy["package_type"] = selectedFilter;      
        copy["amount"] = amount;
        copy["receiver_address"] = selectedAddressFilter;
        setOrder(copy);    

      }       
    }else{
      toast.error("Error in amount fetching");
    }    
  };
  

  const getPackageType = async () => {
    debugger;
    var response = await getPackageTypeAPI(authState);
    if(response.status == 200){
      debugger;
      if(response.data == "EXPIRED" || response.data == "INVALID"){
        navigate("/login");
        toast.warning("Session Time Expired");
      }
      else{
        setTypes(response.data);
      }       
    }else{
      toast.error("Error Fetching Package Types");
    }
  }


  const Submit = async() =>{
    debugger;
    if (!handleValidation()) {
      toast.warning("Please Fill All Blanks")
    }else{
      const response = await AddOrderAPI(order, authState);
      if(response.status == 200 && response.data != 0){
        if(response.data == "EXPIRED" || response.data == "INVALID"){
          navigate("/login");
          toast.warning("Session Time Expired");}
        else{
          toggleComponent("OrderSummary");
          toast.success("Order Created Successfully");
        }        
      }else{
        toast.error("Failed To Create Order");
      }
    }
  }


    
  return(<div className="container row">
  <div className="col"></div>
  <div className="Auth-form-content col">
      <h3 className="Auth-form-title">Create Order</h3>
  <div className="form-group mt-1">
          <label>Receiver Name</label>
          <input
            type="text"
            name="receiver_name"
            className="form-control mt-1"
            placeholder="e.g James"
            onChange={onTextChange}
            required
            />
        </div>
        <div className="form-group mt-1">
          <label>Receiver Email</label>
          <input
            type="text"
            name="receiver_email"
            className="form-control mt-1"
            placeholder="e.g dsd@gmail.com"
            onChange={onTextChange}
            required
            />
        </div>
        <div className="form-group mt-1">
          <label>Receiver Mobile</label>
          <input
            type="number"
            name="receiver_mobile"
            className="form-control mt-1"
            placeholder="e.g 9978077092"
            onChange={onTextChange}
            required
            />
        </div>
        <div className="form-group mt-1">
          <label>Receiver Address</label>
          <div className="mt-2 mb-2">
          <select onChange={handleFilterChangeReciverAddress}>
          {renderOptionReceiverAddress()}
          </select>
          </div>
        </div>
        <div className="form-group mt-1">
          <label>Package Count</label>
          <input
            type="number"
            name="package_count"
            className="form-control mt-1"
            placeholder="Package Count"
            onChange={onTextChange}
            required
            />
        </div>
        <div className="form-group mt-1">
          <label>Package Type</label>
          <div className="mt-2 mb-2">
          <select onChange={handleFilterChange}>
          {renderOption()}
          </select>
          </div>
          </div>
        <div className="form-group mt-1">
        <div className="form-group mt-1">
          <div color="red" id="ErrorBox">
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              className="form-control mt-1"
              value={selectedAmount} 
              onChange={(e) => setSelectedAmount(e.target.value)} 
              required
              disabled
            />
          </div>
        </div>
      </div>
        <div className="row mt-3">
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary btn-block" onClick={Submit}>
            Submit
          </button>
        </div>
        <div className="col-md-6">
          <button type="submit" className="btn btn-danger btn-block" onClick={() => toggleComponent("OrderSummary")}>
            Cancel
          </button>
        </div>
      </div>
      </div>
    <div className="col">
    </div>
    </div>);
}

export default NewOrder;