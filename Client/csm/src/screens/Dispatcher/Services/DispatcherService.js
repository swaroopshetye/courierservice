import axios from "axios";
import { createUrl } from "../../utils/utils";

export async function getEmployeesAPI(data){
    try{
        debugger;
        let url = createUrl(`/api/Dispatcher/GetEmployees`);
        const response = await axios.put(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
  }

  export async function getOrdersAPI(authState){
    try{
        debugger;
        let url = createUrl(`/api/Dispatcher/GetOrders`);
        const response = await axios.post(url, authState);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
  }

  export async function getComplaintsAPI(id, data){
    try{
        debugger;
        let url = createUrl(`/api/Dispatcher/GetComplaints/${id}`);
        const response = await axios.put(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
  }

  export async function getRolesAPI(){
    try{
        // debugger;
        let url = createUrl("/api/Dispatcher/GetRoles");
        const response = await axios.get(url);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}

export async function getHubLocationsAPI(){
    try{
        let url = createUrl("/api/Dispatcher/GetHubLocations");
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
        let url = createUrl(`/api/Dispatcher/GetMyProfile/`);
        let response = await axios.post(url, authState);          
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
        let url = createUrl(`/api/Dispatcher/SaveMyProfile/${authState.user_id}`);
        let response = await axios.put(url, {user, data});
        return response;
    }catch(ex){
        console.log(ex);
        return null;        
    }
}



export async function getPackageTypeAPI(data){
    try{
        debugger;
        let url = createUrl("/api/Dispatcher/GetPackageType");
        const response = await axios.post(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}

export async function calculateAmountAPI(selectedFilter, data){
    try{
        debugger;
        let url = createUrl(`/api/Dispatcher/GetAmount/${selectedFilter}`);
        const response = await axios.put(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}


export async function getReceiverAddressAPI(data){
    try{
        debugger;
        let url = createUrl("/api/Dispatcher/GetReceiverAddress");
        const response = await axios.post(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}

export async function AddOrderAPI(order, authState){
    try{
        debugger;
        let data = {data: authState, order: order}
        let url = createUrl("/api/Dispatcher/AddOrder");
        const response = await axios.post(url, data);
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
        let url = createUrl(`/api/Dispatcher/ResetPassword/${authState.user_id}`);
        const response  = await axios.put(url, {user, data});
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}