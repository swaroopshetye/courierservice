import { useContext } from "react";
import NavBar from "./NavBar";
import NavBarProtected from "./NavBarProtected";
import { AuthContext } from "../utils/GlobalStates";


function AboutUs() {
  
  
  var [authState, setAuthState] = useContext(AuthContext);
  const isAuthenticated = authState.id !== "" && authState.token !== ""; 
  
  
  return (<>
      {isAuthenticated ? <NavBarProtected /> : <NavBar />}
    <div>
      <section style={{ backgroundColor: '#f1f1f1', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>About Us</h1>
        <p style={{ textAlign: 'center' }}>Delivering Excellence in Courier Services</p>
      </section>

      <section style={{ padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <center><h2>Who Are We</h2></center>
          <p style={{textAlign:'justify'}}>At SwiftTransit, we are a dedicated team of professionals providing reliable and efficient courier services. With years of experience in the industry, we have built a reputation for 
            delivering excellence. Our commitment is to ensure timely and secure deliveries, handling your packages with utmost care. 
            We understand the importance of speed and precision in today's fast-paced world, and we strive to provide swift and accurate deliveries, every time.</p>
            <p style={{textAlign:'justify'}}>Customer satisfaction is our top priority,
            and we take pride in offering exceptional customer service, transparent communication, and a seamless courier experience. With advanced tracking systems and a vast network, we provide extensive coverage for local, national, and international shipments. 
            Trust us for your same-day delivery, express shipping, and specialized handling needs. Choose SwiftTransit for reliable, efficient, and personalized courier services</p> 
        </div>
      </section>

      <section style={{ backgroundColor: '#f1f1f1', padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <center><h2>Meet Our Team</h2></center>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{ textAlign: 'center', margin:"2%" }}>
              <img src="/Images/About/Shreejay Mane.jpg" alt="Shreejay Mane" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
              <div style={{margin:"8%"}}>
              <h5>Shreejay Mane</h5>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/shreejay-mane-b12974221/"><img src="/Images/Logo/linkedin.png" alt="LinkedIn" style={{width: '25px', height: '25px'}}/></a>
              </div>
            </div>
            <div style={{ textAlign: 'center', margin:"2%"}}>
              <img src="/Images/About/Pruthviraj Desai.jpg" alt="Pruthviraj Desai" style={{ width: '150px', height: '150px', borderRadius: '50%', marginRight:'5%' }} />
              <div style={{margin:"8%"}}>
              <h5>Pruthviraj Desai</h5>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/pruthviraj-desai-56959520b"><img src="/Images/Logo/linkedin.png" alt="LinkedIn" style={{width: '25px', height: '25px'}}/></a>
              </div>
            </div>
            <div style={{ textAlign: 'center', margin:"2%"}}>
              <img src="/Images/About/Omkar Kalekar.jpg" alt="Omkar Kalekar" style={{ width: '150px', height: '150px', borderRadius: '50%', marginRight:'5%' }} />
              <div style={{margin:"8%"}}>
              <h5>Omkar Kalekar</h5>
              </div>
              <div>
               <a href="https://www.linkedin.com/in/omkar-kalekar-04b517172"><img src="/Images/Logo/linkedin.png" alt="LinkedIn" style={{width: '25px', height: '25px'}}/></a>
              </div>
            </div>
            <div style={{ textAlign: 'center', margin:"2%" }}>
              <img src="/Images/About/Shivanjali Bhosale.jpeg" alt="Shivanjali Bhosale" style={{ width: '150px', height: '150px', borderRadius: '50%', marginRight:'5%' }} />
              <div style={{margin:"8%"}}>
              <h5>Shivanjali Bhosale</h5>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/shivanjali-bhosale-2b92481b9"><img src="/Images/Logo/linkedin.png" alt="LinkedIn" style={{width: '25px', height: '25px'}}/></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p>&copy; 2023 Courier Services. All rights reserved.</p>
      </footer>
    </div>
    </>);
}

export default AboutUs;