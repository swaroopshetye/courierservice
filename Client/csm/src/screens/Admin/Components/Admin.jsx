import SideBar from "./SideBar";
import NavBarProtected from "../../Components/NavBarProtected";
import Dashboard from "./Dashboard";
import { useState } from "react";
import Orders from "./Orders";
import EmployeeDirectory from "./EmployeeDirectory";
import Reports from "./Reports";
import Update from "./Update";
import Add from "./Add";
import Customer from "./Customer";
import MyProfile from "./MyProfile";
import ResetPassword from "./ResetPassword";

function Admin() {

    const [activeComponent, setActiveComponent] = useState("Dashboard");
    const [id, setId] = useState("1");
    
    
    const toggleComponent = (component) => {
      debugger;
      setActiveComponent(component);
    };

    const updateData = (component) => {
      debugger;
      setId(component);
    };
  
    const componentMapping = {
      Dashboard: <Dashboard />,
      Orders: <Orders />,
      EmployeeDirectory: <EmployeeDirectory toggleComponent={toggleComponent} updateData={updateData} />,
      Reports: <Reports />,
      Update: <Update id={id} updateData={updateData} toggleComponent={toggleComponent}/>,
      Add:  <Add toggleComponent={toggleComponent}/>,
      Customer: <Customer toggleComponent={toggleComponent}/>,
      MyProfile:<MyProfile toggleComponent={toggleComponent}/>,
      ResetPassword:<ResetPassword/>
    };


    return (<>
        <NavBarProtected/>
        <div style={{display:"flex"}}>
        <div style={{flex: 3}}>
        <SideBar  toggleComponent={toggleComponent}/>
        </div>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {componentMapping[activeComponent]}
        </div>
    </div>
    </>);
}

export default Admin;