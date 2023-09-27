import DispatcherSideBar from "./DispatcherSidebar";
import { useState } from "react";
import DispatcherDashboard from "./DispatcherDashboard";
import OrderSummary from "./OrderSummary";
import NewOrder from "./NewOrder";
import DispatcherEmployeeDirectory from "./DispatcherEmployeeDirectory";
import RaisedTickets from "./RaisedTickets";
import Tracking from "../../Components/Tracking";
import NavBarProtected from "../../Components/NavBarProtected";
import MyProfile from "./MyProfile";
import ResetPassword from "./ResetPassword";

function DispatcherDash() {

  const [activeComponent, setActiveComponent] = useState("DispatcherDashboard");

    const toggleComponent = (component) => {
      setActiveComponent(component);
    };
  
    const componentMapping = {
      Dashboard: <DispatcherDashboard/>,
      OrderSummary: <OrderSummary />,
      NewOrder: <NewOrder toggleComponent={toggleComponent}/>,
      DispatcherEmployeeDirectory: <DispatcherEmployeeDirectory/>,
      RaisedTickets: <RaisedTickets />,
      OrderTracking: < Tracking/>,
      MyProfile: <MyProfile toggleComponent={toggleComponent}/>,
      ResetPassword:<ResetPassword/>
    };

    return (<>
    <NavBarProtected/>
        <div style={{display:"flex"}}>
        <div style={{flex: 3}}>
        <DispatcherSideBar  toggleComponent={toggleComponent}/>
        </div>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {componentMapping[activeComponent]}
        </div>
    </div>
    </>);
}

export default DispatcherDash;