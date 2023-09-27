import axios from "axios";
import { createUrl } from "../../utils/utils";

export async function getOrderIdAPI(data){
    try{
        // debugger;
        let url = createUrl(`/api/DeliveryPersonnel/GetOrderId/${data.user_id}`);
        const response = await axios.get(url);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}



export async function getMyProfileAPI(authState){
    try{
        debugger;
        const url = createUrl(`/api/DeliveryPersonnel/GetMyProfile`);
        let response = await axios.put(url, authState);          
        return response; 
    }catch(ex){
        console.log(ex);
        return null;
    }
}

export async function saveMyProfileAPI(user, authState){
    try{
        debugger;
        var data = authState;
        let url = createUrl(`/api/DeliveryPersonnel/SaveMyProfile/${authState.user_id}`);
        let response = await axios.put(url, {user, data});
        return response;
    }catch(ex){
        console.log(ex);
        return null;        
    }
}


export async function sendResetPasswordAPI(user, authState){
    try{
        debugger;
        let data = authState;
        let url = createUrl(`/api/DeliveryPersonnel/ResetPassword/${authState.user_id}`);
        const response  = await axios.put(url, {user, data});
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}