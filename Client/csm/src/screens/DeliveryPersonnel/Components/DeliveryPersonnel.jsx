import DeliverySideBar from "./DeliverySideBar";
import NavBarProtected from "../../Components/NavBarProtected";
import DpDashboard from "./DpDashboard";
import {useState} from 'react';
import MyOrders from "./MyOrders";
import AdminSupport from "./AdminSupport";
import Complaints from "./Complaints";
import MyProfile from "./MyProfile";
import ResetPassword from "./ResetPassword";



function DeliveryPersonnel() {

  const [activeComponent, setActiveComponent] = useState("Dashboard");

    const toggleComponent = (component) => {
      setActiveComponent(component);
    };
  
    const componentMapping = {
      DpDashboard: <DpDashboard />,
      MyOrders: <MyOrders/>,
      // ScheduledOrders: <ScheduledOrders />,
      // DeliveredOrders: <DeliveredOrders />,
      Complaints:< Complaints/>,
      AdminSupport:<AdminSupport/>,
      MyProfile:<MyProfile toggleComponent={toggleComponent}/>,
      ResetPassword:<ResetPassword/>
    };

return (<>
      <NavBarProtected/>
      <div style={{display:"flex"}}>
      <div style={{flex: 3}}>
      <DeliverySideBar  toggleComponent={toggleComponent}/>
      </div>
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {componentMapping[activeComponent]}
      </div>
  </div>
  </>);
}

export default DeliveryPersonnel;