import axios from "axios";
import { createUrl } from "../../utils/utils";

export async function getRolesAPI(data){
    try{
        // debugger;
        let url = createUrl("/api/Admin/GetRoles");
        const response = await axios.post(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}

    
export async function getEmployeesAPI(selectedFilter, data){
    try{
        debugger;
        let url = createUrl(`/api/Admin/GetEmployees/${selectedFilter}`);
        const response = await axios.put(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
  }



export async function deleteEmployeeAPI(id, data){
    try{
        debugger;
        let url = createUrl(`/api/Admin/DeleteEmployee/${id}`);
        const response = await axios.put(url,data)
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}


export async function getCitiesAPI(data){
    try{
        debugger;
        let url = createUrl("/api/Admin/GetCities");
        const response = await axios.post(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}



export async function getOrdersAPI(selectedFilter, data){
    try{
        debugger;
        const filterParam = selectedFilter != "ALL" ? `/${selectedFilter}` : ``;
        let url = createUrl(`/api/Admin/GetOrders${filterParam}`);
        const response =  await axios.put(url, data)
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}

export async function GetEmployeeDetailsAPI(id, data){
    try{
        debugger;
        let url = createUrl(`/api/Admin/GetEmployeeDetails/${id}`);
        const response = await axios.put(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}



export async function UpdateEmployeeDetailsAPI(user, authState){
    try{
        debugger;
        let data = authState;
        let url = createUrl(`/api/Admin/UpdateEmployeeDetails/${user.user_id}`);
        const response  = await axios.put(url, {user, data});
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}


export async function AddEmployee(data){
    try{
        debugger;
        let url = createUrl("/api/Admin/AddEmployeeDetails");
        const response = await axios.post(url, data);
        return response;  
    }catch(ex){
        console.log(ex);
        return null;
    }

}


export async function getCustomerCitiesAPI(data){
    try{
        let url = createUrl("/api/Admin/GetCustomerCities");
        const response = await axios.post(url, data);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}

export async function getCustomersAPI(selectedFilter, authState){
    try{
        debugger;
        const url = selectedFilter != "ALL" ? createUrl(`/api/Admin/GetCustomers/${selectedFilter}`) : createUrl("/api/Admin/GetAllCustomers");
        const response = selectedFilter != "ALL" ? await axios.put(url, authState) : await axios.post(url, authState);
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}

export async function getMyProfileAPI(authState){
    try{
        debugger;
        const url = createUrl(`/api/Admin/GetMyProfile`);
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
        let url = createUrl(`/api/Admin/SaveMyProfile/${authState.user_id}`);
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
        let url = createUrl(`/api/Admin/ResetPassword/${authState.user_id}`);
        const response  = await axios.put(url, {user, data});
        return response;
    }catch(ex){
        console.log(ex);
        return null;
    }
}