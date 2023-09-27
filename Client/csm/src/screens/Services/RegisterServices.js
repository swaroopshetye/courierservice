import axios from "axios";
import { createUrl } from "../utils/utils";







export async function RegisterCustomerAPI(user){
    try{
        // debugger;
        let url = createUrl("/api/Login/SignUp");
        let response = await axios.post(url,user);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}
