'use server';

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL, TOKEN_NAME } from "@/constants";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteMovie(movieId : number ,formData  :FormData){
   const response =  await fetch(`${API_URL}/movie/${movieId}`, {
        method: "DELETE",
        headers: {

           ...( await authHeaders() ),
            "Content-Type": "application/json",
        }
    });



    //const data = await response.json();
   // console.log(data);
    /*if(response.status == 200){
    redirect("admin/movies");
    }*/


    if (!response.ok) throw new Error('Error al eliminar la película');
if(response.status === 200){
   await revalidateTag("/admin/movies")
   redirect('/admin/movies');
}
  //redirect('admin/movies');
    
      
        
    
}


