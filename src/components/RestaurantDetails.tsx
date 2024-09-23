import React from "react";
import { Card, Container } from "react-bootstrap";
import { IRestaurant } from "../apis/useGetRestaurants";
import BookTable from "./BookTable";

type RestaurantDetailsProps = {
  restaurant: IRestaurant | null;
  restaurantLoading: boolean;
  restaurantError: string;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
  restaurantLoading,
  restaurantError,
}) => {
  if (restaurantLoading) {
    return <>Loading</>;
  }

  if (restaurantError !== "") {
    return <>{restaurantError}</>;
  }

  if (restaurant) {
    return (
      <Container>
        <div className="gw-restaurant-details">
          <Card>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>Address: {restaurant.details.address}</Card.Text>
              <Card.Text>Review Score: {restaurant.details.reviewScore}</Card.Text>
              <Card.Text>
                Opening Times: <br />
                Mon-Fri: {restaurant.details.openingHours.weekday} <br />
                Sat-Sun: {restaurant.details.openingHours.weekend}
              </Card.Text>
              <Card.Text>
                Contact:{" "}
                <a href={`mailto:${restaurant.details.contactEmail}`}>
                  {restaurant.details.contactEmail}
                </a>
              </Card.Text>
            </Card.Body>
          </Card>

          <BookTable restaurant={restaurant} />
        </div>
      </Container>
    );
  }

  return null;
};

export default RestaurantDetails;
