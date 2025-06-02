'use server';

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL, TOKEN_NAME } from "@/constants";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export default async function updateCustomer(customerId : string ,formData  :FormData){


   
   const response =  await fetch(`${API_URL}/customers/${customerId}`, {
        method: "PATCH",
       body: formData,
        headers: {
            
           ... (await authHeaders() )
        }
    });
    
   const data = await response.json();
   console.log("Data:",data);
  
    if(response.status === 200){
        //revalidateTag("dashboard:employees");
       /* revalidateTag(`dashboard:employees:${employeeId}`);
        redirect("/dashboard/employees");*/
        
    }
        
       
    
}


