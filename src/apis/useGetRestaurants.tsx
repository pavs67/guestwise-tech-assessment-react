import axios from "axios";
import { useState } from "react";

export type IRestaurant = {
  id: number;
  name: string;
  shortDescription: string;
  cuisine: string;
  rating: number;
  details: {
    id: number;
    address: string;
    openingHours: {
      weekday: string;
      weekend: string;
    };
    reviewScore: number;
    contactEmail: string;
  };
};

export const useGetRestaurants = () => {
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [restaurantsError, setRestaurantsError] = useState("");
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  const getRestaurants = async (cont?: AbortController) => {
    setRestaurantsLoading(true);

    try {
      const res = await axios({
        url: `http://localhost:3001/restaurants`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        signal: cont?.signal,
      });

      if (res.status === 200) {
        setRestaurants(res.data);
      } else {
        setRestaurants([]);
      }

      setRestaurantsLoading(false);
    } catch (error) {
      // setRestaurantsError(error);
      setRestaurants([]);
    }
  };

  return {
    getRestaurants,
    restaurantsLoading,
    restaurants,
    restaurantsError,
  };
};
