import { Story, UserData } from "./types";

const BASE_URL = process.env.BASE_URL
export const fetchUsersList = async (): Promise<UserData[]> => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "GET",
  });
     if (!response.ok) {
       // This will activate the closest `error.js` Error Boundary
       throw new Error('Failed to fetch data')
     }
     
    const jsonResponse = await response.json();
    return jsonResponse?.data;
}

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