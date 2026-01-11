import axios from "axios";

const campersApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export interface CampersQuery {
  location?: string;
    form?: string;
    transmission?: string;
    AC?: boolean;
    kitchen?: boolean;
    TV?: boolean;
    bathroom?: boolean;
    page: number;
    limit: number;
}

export const getCampers = async (params?: CampersQuery) => {
  const res = await campersApi.get("/campers", { params });
  return res.data; 
};

export const getCamperById = async (id: string) => {
  const res = await campersApi.get(`/campers/${id}`);
  return res.data;
}