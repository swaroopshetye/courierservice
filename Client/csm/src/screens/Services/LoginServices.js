import axios from "axios";
import { createUrl } from "../utils/utils";




export async function loginAPI(user) {  
    debugger;
    let url = createUrl("/api/Login/Login");
    const response = await axios.post(url, user);
    return response;    
}
  
