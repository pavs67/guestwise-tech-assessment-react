import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { IRestaurant } from "../apis/useGetRestaurants";

type RestaurantListProps = {
  restaurants: IRestaurant[];
  loading: boolean;
  handleSelectRestaurant: (id: number) => void;
  restaurantsError: string;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  handleSelectRestaurant,
  loading,
  restaurantsError,
}) => {
  if (loading) {
    return <>Loading</>;
  }

  if (restaurantsError !== "") {
    return <>{restaurantsError}</>;
  }

  return (
    <Container>
      <ListGroup>
        {restaurants.map((restaurant) => (
          <ListGroup.Item
            key={restaurant.id}
            action
            onClick={() => handleSelectRestaurant(restaurant.id)}
          >
            <h5>{restaurant.name}</h5>
            <p>{restaurant.shortDescription}</p>
            <p>Rating: {restaurant.rating}</p>
          </ListGroup.Item>
        ))}

        {restaurants.length === 0 && (
          <div className="mt-3">
            <h5>No restaurants found</h5>
          </div>
        )}
      </ListGroup>
    </Container>
  );
};

export default RestaurantList;
