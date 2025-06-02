import { API_URL } from "@/constants";

export default async function getInformation(email  :string) {
  try {
    const res = await fetch(`${API_URL}/customers/email/${email}`, {
      credentials: 'include',
    });
    const data = await res.json();
    return data; 
  } catch (err) {
    console.log(err);
    return null; 
  }
}
