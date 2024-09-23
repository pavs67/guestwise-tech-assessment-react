import axios from "axios";
import { useState } from "react";
import { IRestaurant } from "./useGetRestaurants";

export const useGetRestaurantDetails = () => {
  const [restaurantLoading, setRestaurantLoading] = useState(false);
  const [restaurantError, setRestaurantError] = useState("");
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  const getRestaurantById = async (id: number, cont?: AbortController) => {
    setRestaurantLoading(true);

    try {
      const res = await axios({
        url: `http://localhost:3001/restaurants/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        signal: cont?.signal,
      });

      if (res.status === 200) {
        setRestaurant(res.data);
      } else {
        setRestaurant(null);
      }

      setRestaurantLoading(false);
    } catch (error) {
      // setRestaurantsError(error);
      setRestaurant(null);
    }
  };

  return {
    getRestaurantById,
    restaurantLoading,
    restaurant,
    restaurantError,
  };
};
