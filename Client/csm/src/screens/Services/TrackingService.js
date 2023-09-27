import axios from "axios";
import { createUrl } from "../utils/utils";




export async function getTraackingDetailsAPI(tracking_id) {  
   try{
        debugger;
        let url = createUrl(`/api/Tracking/GetShipmentsDetails/${tracking_id}`);
        const response = await axios.get(url);
        return response;    
    }catch(ex){
        console.log(ex);
        return null;
    }
}



