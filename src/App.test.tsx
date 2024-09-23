import { render, screen } from "@testing-library/react";
import App from "./App";
import { sortByName, sortByRating } from "./functions/helpers";
import { IRestaurant } from "./apis/useGetRestaurants";

// test("renders restaurant list with dynamic restaurant name and description", () => {
//   render(<App />);

//   const restaurantName = screen.getByRole("heading", {
//     level: 5,
//     name: /Velvet & Vine/i,
//   });
//   const restaurantDescription = screen.getByText(/A fine dining experience with a modern twist./i);

//   expect(restaurantName).toBeInTheDocument();
//   expect(restaurantDescription).toBeInTheDocument();
// });

describe("sortByName", () => {
  it("should sort array of objects by name alphabetically", () => {
    const unsortedArray: IRestaurant[] = [
      {
        id: 1,
        name: "Velvet & Vine",
        shortDescription: "A fine dining experience with a modern twist.",
        cuisine: "French",
        rating: 4.7,
        details: {
          id: 1,
          address: "123 Fine St, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.7,
          contactEmail: "info@gourmetkitchen.com",
        },
      },
      {
        id: 2,
        name: "Sushi Paradise",
        shortDescription: "Traditional sushi and modern fusion rolls.",
        cuisine: "Japanese",
        rating: 4.5,
        details: {
          id: 2,
          address: "456 Sushi Ave, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.5,
          contactEmail: "contact@sushiparadise.com",
        },
      },
      {
        id: 3,
        name: "Restaurant 3",
        shortDescription: "Description for Restaurant 3.",
        cuisine: "Cuisine Type",
        rating: 3,
        details: {
          id: 3,
          address: "3 Address St, City",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 3,
          contactEmail: "contact@restaurant3.com",
        },
      },
    ];

    const sortedArray: IRestaurant[] = [
      {
        id: 3,
        name: "Restaurant 3",
        shortDescription: "Description for Restaurant 3.",
        cuisine: "Cuisine Type",
        rating: 3,
        details: {
          id: 3,
          address: "3 Address St, City",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 3,
          contactEmail: "contact@restaurant3.com",
        },
      },

      {
        id: 2,
        name: "Sushi Paradise",
        shortDescription: "Traditional sushi and modern fusion rolls.",
        cuisine: "Japanese",
        rating: 4.5,
        details: {
          id: 2,
          address: "456 Sushi Ave, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.5,
          contactEmail: "contact@sushiparadise.com",
        },
      },
      {
        id: 1,
        name: "Velvet & Vine",
        shortDescription: "A fine dining experience with a modern twist.",
        cuisine: "French",
        rating: 4.7,
        details: {
          id: 1,
          address: "123 Fine St, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.7,
          contactEmail: "info@gourmetkitchen.com",
        },
      },
    ];

    const result = sortByName(unsortedArray);

    expect(result).toEqual(sortedArray);
  });
});

describe("sortByRating", () => {
  it("should sort array of objects by rating", () => {
    const unsortedArray: IRestaurant[] = [
      {
        id: 1,
        name: "Velvet & Vine",
        shortDescription: "A fine dining experience with a modern twist.",
        cuisine: "French",
        rating: 4.7,
        details: {
          id: 1,
          address: "123 Fine St, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.7,
          contactEmail: "info@gourmetkitchen.com",
        },
      },
      {
        id: 2,
        name: "Sushi Paradise",
        shortDescription: "Traditional sushi and modern fusion rolls.",
        cuisine: "Japanese",
        rating: 4.5,
        details: {
          id: 2,
          address: "456 Sushi Ave, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.5,
          contactEmail: "contact@sushiparadise.com",
        },
      },
      {
        id: 3,
        name: "Restaurant 3",
        shortDescription: "Description for Restaurant 3.",
        cuisine: "Cuisine Type",
        rating: 3,
        details: {
          id: 3,
          address: "3 Address St, City",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 3,
          contactEmail: "contact@restaurant3.com",
        },
      },
    ];

    const sortedArray: IRestaurant[] = [
      {
        id: 1,
        name: "Velvet & Vine",
        shortDescription: "A fine dining experience with a modern twist.",
        cuisine: "French",
        rating: 4.7,
        details: {
          id: 1,
          address: "123 Fine St, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.7,
          contactEmail: "info@gourmetkitchen.com",
        },
      },
      {
        id: 2,
        name: "Sushi Paradise",
        shortDescription: "Traditional sushi and modern fusion rolls.",
        cuisine: "Japanese",
        rating: 4.5,
        details: {
          id: 2,
          address: "456 Sushi Ave, London",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 4.5,
          contactEmail: "contact@sushiparadise.com",
        },
      },
      {
        id: 3,
        name: "Restaurant 3",
        shortDescription: "Description for Restaurant 3.",
        cuisine: "Cuisine Type",
        rating: 3,
        details: {
          id: 3,
          address: "3 Address St, City",
          openingHours: {
            weekday: "12:00 PM - 10:00 PM",
            weekend: "11:00 AM - 11:00 PM",
          },
          reviewScore: 3,
          contactEmail: "contact@restaurant3.com",
        },
      },
    ];

    const result = sortByRating(unsortedArray);

    expect(result).toEqual(sortedArray);
  });
});
