import {useNavigate} from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();


    const GoToHome = () =>{
        navigate('/');
    }

    const GoToLogin = () =>{
        navigate('/login');
    }

    const GoToAboutUs = () =>{
        navigate('/about');
    }

    const GoToContactUs = () =>{
        navigate('/contact');
    }

    const GoToTrackShipment = () =>{
        navigate('/trackshipment');
    }

    return (<>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark navbar-light" style={{height:"65px"}}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" onClick={GoToHome}>
                <img src="/Images/Logo/SwiftTransitLogo 1.png" alt="" width="60" height="54"/>
                </a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" style={{marginBottom:"5px", fontSize:"25px"}} onClick={GoToHome}>SwiftTransit</a>
                <ul className="navbar-nav mr-auto mb-2 mb-lg-0  " style={{fontSize:"21px", marginLeft:"200px"}}>
                    <li className="nav-item" style={{marginLeft:"16px", marginRight:"16px"}}>
                    <a className="nav-link" aria-current="page" onClick={GoToHome}>Home</a>
                    </li>
                    {/* <li className="nav-item dropdown" style={{marginLeft:"16px", marginRight:"16px"}}>
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Services
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor:"#F5F5F5"}}>
                        <a className="dropdown-item" href="#">Home PickUp</a>
                        <a className="dropdown-item" href="#">Extra Care Delivery</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Prime Consignment</a>
                        </div>
                    </li>  */}
                    <li className="nav-item" style={{marginLeft:"16px", marginRight:"16px"}}>
                    <a className="nav-link" onClick={GoToTrackShipment}>Track Your Shipment</a>
                    </li>
                    <li className="nav-item" style={{marginLeft:"16px", marginRight:"16px"}}>
                    <a className="nav-link" onClick={GoToAboutUs}>About Us</a>
                    </li>
                    <li className="nav-item" style={{marginLeft:"16px", marginRight:"16px"}}>
                    <a className="nav-link" onClick={GoToContactUs}>Contact Us</a>
                    </li>
                </ul>
                {/* <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{marginLeft:"32px"}}>
                <button className="btn btn-outline-success me-2" type="button" onClick={GoToLogin}>Login/SignUp</button>
                </div>
                </div>
            </div>
            </nav>
            </>);
}

export default NavBar;