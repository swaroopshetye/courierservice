import { useState, useContext } from "react";
import NavBar from "./NavBar";
import NavBarProtected from "./NavBarProtected";
import { AuthContext } from "../utils/GlobalStates";

function ContactUs() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    var [authState, setAuthState] = useContext(AuthContext);

  
  const isAuthenticated = authState.id !== "" && authState.token !== ""; 
  


    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission, e.g., send email or save to database
        console.log('Form submitted:', { name, email, message });
        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
    };
      
    return (
<>
{isAuthenticated ? <NavBarProtected/> : <NavBar />}
  <div className="container my-5 py-5 z-depth-1">


  {/* <!--Section: Content--> */}
  <section className="text-center px-md-5 mx-md-5 dark-grey-text">

    {/* <!-- Section heading --> */}
    <h3 className="font-weight-bold mb-3" style={{fontSize:"40px"}}>Contact Us</h3>
    {/* <!-- Section description --> */}
    <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. 
    <br/>Our team will come back to you within a matter of hours to help you.</p>

    {/* <!-- Grid row --> */}
    <div className="row">

      {/* <!-- Grid column --> */}
      <div className="col-md-9 mb-md-0 mb-5">

        <form>

          {/* <!-- Grid row --> */}
          <div className="row">

            {/* <!-- Grid column --> */}
            <div className="col-md-6">
              <div className="md-form mb-0">
                <label for="contact-name" className="">Your name</label>
                <input type="text" id="contact-name" className="form-control"/>
              </div>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div className="col-md-6">
              <div className="md-form mb-3">
                <label for="contact-email" className="">Your email</label>
                <input type="text" id="contact-email" className="form-control"/>
              </div>
            </div>
            {/* <!-- Grid column --> */}

          </div>
          {/* <!-- Grid row --> */}

          {/* <!-- Grid row --> */}
          <div className="row">

            {/* <!-- Grid column --> */}
            <div className="col-md-12">
              <div className="md-form mb-3">
                <label for="contact-Subject" className="" >Subject</label>
                <input type="text" id="contact-Subject" className="form-control"/>
              </div>
            </div>
            {/* <!-- Grid column --> */}

          </div>
          {/* <!-- Grid row --> */}

          {/* <!-- Grid row --> */}
          <div className="row">

            {/* <!-- Grid column --> */}
            <div className="col-md-12">
              <div className="md-form">
                <label for="contact-message">Your message</label>
                <textarea id="contact-message" className="form-control md-textarea" rows="3"></textarea>
              </div>
            </div>
            {/* <!-- Grid column --> */}

          </div>
          {/* <!-- Grid row --> */}

        </form>

        <div className="text-center text-md-left" style={{paddingTop:"5%"}}>
          <a className="btn btn-primary btn-md btn-rounded" >Send</a>
        </div>

      </div>
      {/* <!-- Grid column --> */}

      {/* <!-- Grid column --> */}
      <div className="col-md-3 text-center">
        <ul className="list-unstyled mb-0">
          <li>
            <img src="/Images/Logo/location.png" alt="location" style={{width:"30px"}}/>
            <p>Hinjewadi, Pune 411057, India</p>
          </li>
          <li>
          <img src="/Images/Logo/Call.png" alt="location" style={{width:"70px"}}/>
            <p>+91 7756800471</p>
          </li>
          <li>
          <img src="/Images/Logo/Email.png" alt="location" style={{width:"50px"}}/>
            <p className="mb-0">swifttransit@mail.com</p>
          </li>
        </ul>
      </div>
      {/* <!-- Grid column --> */}

    </div>
    {/* <!-- Grid row --> */}

  </section>
  {/* <!--Section: Content--> */}
</div>
</>
    );
}

export default ContactUs;