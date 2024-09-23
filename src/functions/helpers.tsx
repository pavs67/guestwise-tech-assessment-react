import { IRestaurant } from "../apis/useGetRestaurants";

export function sortByName(list: IRestaurant[]): IRestaurant[] {
  return list.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

export function sortByRating(list: IRestaurant[]): IRestaurant[] {
  return list.sort((a, b) => b.rating - a.rating);
}
