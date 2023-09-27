import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import HubLocation from "./HubLocation";
import Admin from "../Admin/Components/Admin";
import Dispatcher from "../Dispatcher/Components/Dispatcher";
import DeliveryPersonnel from "../DeliveryPersonnel/Components/DeliveryPersonnel";
import Tracking from "./Tracking"
import '../css/App.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "../utils/GlobalStates";


function Controller() {
    return (
        <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/about' element={<AboutUs/>}/>
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/hublocation' element={<HubLocation/>}/>
                <Route path='/admin' element={<Admin/>}/>                
                <Route path='/dispatcher' element={<Dispatcher/>}/>                
                <Route path='/deliverypersonnel' element={<DeliveryPersonnel/>}/>                
                <Route path='/trackshipment' element={<Tracking/>}/>              
            </Routes>
            <div>
                <ToastContainer/>
            </div>
        </AuthProvider>
        </BrowserRouter>
    );
}

export default Controller;