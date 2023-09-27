function DispatcherSideBar({toggleComponent}) {

    const toggleDispatcherDashboard = () => {
      toggleComponent("Dashboard");
    };
  
    const toggleOrderSummary = () => {
      toggleComponent("OrderSummary");
    };
  
    const toggleNewOrder = () => {
      toggleComponent("NewOrder");
    };
  
    const toggleDispatcherEmployeeDirectory = () => {
      toggleComponent("DispatcherEmployeeDirectory");
    };
  
    const toggleRaisedTickets = () => {
      toggleComponent("RaisedTickets");
    };
  
    const toggleMyProfile = () => {
      toggleComponent("MyProfile");
    };

    return (<>
      <div className="sidebar border border-right col-md-12 p-0 " style={{ height: "100vh", backgroundColor:"#CACFD2" }}>
      <div
        className="offcanvas-lg offcanvas-end bg-body-tertiary"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="d-md-flex flex-column" style={{backgroundColor:"#CACFD2"}}> 
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="btn btn-light" style={{width:"100%", marginTop:"40px", paddingBottom:"10px", backgroundColor:"#CACFD2"}}>
              <a
                className="nav-link d-flex align-items-center active"
                aria-current="page"
                onClick={toggleDispatcherDashboard}
                style={{marginTop:"10px", marginLeft:"50px", color:"#000", fontSize:"20px",fontFamily: 'Josefin Sans, sans-serif', fontWeight:"bold"}}
                >
                Dashboard
              </a>
              </button>
            </li>
            <li className="nav-item">
            <button className="btn btn-light" style={{width:"100%", marginTop:"40px", paddingBottom:"10px", backgroundColor:"#CACFD2"}}>
              <a className="nav-link d-flex align-items-center" 
              onClick={toggleOrderSummary}
              style={{marginTop:"10px", marginLeft:"40px", color:"#000", fontSize:"20px",fontFamily: 'Josefin Sans, sans-serif', fontWeight:"bold"}}>
              Order Summary
              </a>
              </button>
            </li>
            <li className="nav-item">
            <button className="btn btn-light" style={{width:"100%", marginTop:"40px", paddingBottom:"10px", backgroundColor:"#CACFD2"}}>
              <a className="nav-link d-flex align-items-center" 
              onClick={toggleNewOrder}
              style={{marginTop:"10px", marginLeft:"20px", color:"#000", fontSize:"20px",fontFamily: 'Josefin Sans, sans-serif', fontWeight:"bold"}}>
              Create New Order
              </a>
            </button>
            </li>
            <li className="nav-item">
            <button className="btn btn-light" style={{width:"100%", marginTop:"40px", paddingBottom:"10px", backgroundColor:"#CACFD2"}}>
              <a className="nav-link d-flex align-items-center" 
              onClick={toggleDispatcherEmployeeDirectory}
              style={{marginTop:"10px", marginLeft:"20px", color:"#000",fontSize:"20px",fontFamily: 'Josefin Sans, sans-serif', fontWeight:"bold"}}>
              Employee Directory
              </a>
            </button>  
            </li>
            <li className="nav-item">
            <button className="btn btn-light" style={{width:"100%", marginTop:"40px", paddingBottom:"10px", backgroundColor:"#CACFD2"}}>
              <a className="nav-link d-flex align-items-center" 
              onClick={toggleRaisedTickets}
              style={{marginTop:"10px", marginLeft:"40px", color:"#000", fontSize:"20px",fontFamily: 'Josefin Sans, sans-serif', fontWeight:"bold"}}>
              Raised Tickets
              </a>
            </button>
            </li>
          </ul>
          <ul className="nav flex-column">
          <button className="btn btn-light" style={{width:"100%", marginTop:"40px", paddingBottom:"10px", backgroundColor:"#CACFD2"}}>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center "
              style={{marginTop:"10px", marginLeft:"50px", color:"#000", fontSize:"20px",fontFamily: 'Josefin Sans, sans-serif', fontWeight:"bold"}}
              onClick={toggleMyProfile}>
                My Profile
              </a>
            </li>
            </button>
          </ul>
        </div>
      </div>
    </div>
    </>);
  }
  
  export default DispatcherSideBar;



