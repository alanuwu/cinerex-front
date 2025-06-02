'use server';

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL, TOKEN_NAME } from "@/constants";

import { redirect } from "next/navigation";







 

  export default async function updateMovie(movieId: number, formData: FormData) {


   ///Hay que obtener los valores del formData
  const movieTitle = formData.get("movieTitle")?.toString() ?? "";
  const movieDescription = formData.get("movieDescription")?.toString() ?? "";
  const movieDurationMinutes = Number(formData.get("movieDurationMinutes")) || 0;
  const movieGenre = formData.get("movieGenre")?.toString() ?? "";
  const movieImageUrl = formData.get("movieImageUrl")?.toString() ?? "";
  const movieTrailer = formData.get("movieTrailer")?.toString() ?? null;

  const body = {
    movieTitle,
    movieDescription,
    movieDurationMinutes,
    movieGenre,
    movieImageUrl,
    movieTrailer,
  };

  const response = await fetch(`${API_URL}/movie/${movieId}`, {
    method: "PATCH",
    headers: {
      ...(await authHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  console.log("Respuesta del backend:", data);


  
  if (response.status == 200) {
   //alert("Pelicula actualizada correctamente");
   //revalidateTag(`admin:movies:${movieId}`);
    redirect(`/admin/movies/${movieId}`);
    //revalidateTag(`admin:movies:${movieId}`);
  } else {
    console.error("Error al actualizar:", data);
  }
}

       
    



