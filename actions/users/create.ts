'use server';

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL, TOKEN_NAME } from "@/constants";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export default async function createCustomer(formData  :FormData){


   const response =  await fetch(`${API_URL}/customers`, {
        method: "POST",
       body: JSON.stringify(formData),
        headers: {
           ...(await authHeaders())
        }
    });
    
   const data = await response.json();
   
  console.log(data);
    if(response.status === 201){
     //  revalidateTag("dashboard:employees");
        redirect("/admin/users");
        
    }
        
       
    
}


