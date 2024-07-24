import { Story } from "./types";

export const fetchUserStories = async (userId: string): Promise<Story[]> => {
  const response = await fetch(`api/stories/${userId}`, {
    method: "GET",
  });
     if (!response.ok) {
       // This will activate the closest `error.js` Error Boundary
       throw new Error('Failed to fetch data')
     }
     
    const jsonResponse = await response.json();
    return jsonResponse?.data;
}