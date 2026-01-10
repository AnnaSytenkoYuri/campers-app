import { Camper } from "../types/camper";

import axios from "axios";

const campersApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const getCampers = async () => {
  const res = await campersApi.get("/campers");

  console.log("API DATA:", res.data);
  console.log("IS ARRAY:", Array.isArray(res.data));

  return res.data.items;
};

export async function getCampersById(id: string): Promise<Camper> {
  const res = await campersApi.get<Camper>(`/campers/${id}`);

  if (!res.data || !res.data.id) {
    throw new Error("No camper data found");
  }

  return res.data;
}
