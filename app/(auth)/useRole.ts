import { API_URL } from "@/constants";

export default async function getRole() {
  try {
    const res = await fetch(`${API_URL}/auth/token`, {
      credentials: 'include',
    });
    const data = await res.json();
    return data; 
  } catch (err) {
    console.log(err);
    return null; 
  }
}
