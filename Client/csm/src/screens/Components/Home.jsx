import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import NavBar from "./NavBar";
import "../css/Home.css";
import NavBarProtected from "./NavBarProtected";
import { useContext } from "react";
import { AuthContext } from "../utils/GlobalStates";



function Home() {

    const navigate = useNavigate();

    const GoToTracking = () =>{
        navigate('/trackshipment');
    }

    const GoToHubLocation = () =>{
        navigate('/hublocation');
    }

    const GoToAdmin = () =>{
        navigate('/');
    }

    var [authState, setAuthState] = useContext(AuthContext);  
    const isAuthenticated = authState.id != "" && authState.token != ""; 
  



    return (<>
      {isAuthenticated ? <NavBarProtected/> : <NavBar />}
            <div className="row">
                <div className="column">
                    <Carousel/>
                </div>
                <div style={{position:"absolute", display:"flex", marginLeft:"54.9%", marginTop:"13.5%"}}>
                    <div style={{border:"solid green", padding: "32px 64px 32px 16px"}}>
                        <a style={{fontFamily:"sans-serif", fontSize:"28px", color:"black", textDecoration:"none"}} onClick={GoToTracking}>
                        <img src="/Images/Package_Icon.jpg" style={{width:"80px", height:"80px", paddingRight:"15px"}}/>
                            Where is My Package?
                        <img src="/Images/circle-right.svg" alt="arrow" style={{paddingLeft:"148px"}}/>
                        </a>
                    </div>
                </div>
                {/* <div style={{position:"absolute", display:"flex", marginLeft:"57.9%", marginTop:"20.1%"}}>
                    <div style={{border:"solid green", padding: "32px 64px 32px 16px"}}>
                        <a style={{fontFamily:"sans-serif", fontSize:"27.2px", color:"black", textDecoration:"none"}} onClick={GoToAdmin}>
                        <img src="/Images/Package Home Pick Up.png" style={{width:"80px", height:"80px", paddingRight:"15px"}} />
                            Home Pick Up Service
                        <img src="/Images/circle-right.svg" alt="arrow" style={{paddingLeft:"163.5px"}}/>
                        </a>
                    </div>
                </div> */}
                <div style={{position:"absolute", display:"flex", marginLeft:"54.9%", marginTop:"26.75%"}}>
                    <div style={{border:"solid green", padding: "32px 64px 32px 16px"}}>
                        <a style={{fontFamily:"sans-serif", fontSize:"25.45px", color:"black", textDecoration:"none"}} onClick={GoToHubLocation}>
                        <img src="/Images/Package_Icon.jpg" style={{width:"80px", height:"80px", paddingRight:"15px"}}/>
                            Where is SwiftTransit Service Point?
                        <img src="/Images/circle-right.svg" alt="arrow" style={{paddingLeft:"25px"}}/>
                        </a>
                    </div>
                </div>

            </div>
            </>);
}

export default Home;