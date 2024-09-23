import axios from "axios";
import { IRestaurant } from "./useGetRestaurants";

export const createBookingAPI = async (data: {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  restaurantId: IRestaurant["id"];
}) =>
  await axios({
    method: "POST",
    url: `http://localhost:3001/bookings`,
    data: data,
  });
