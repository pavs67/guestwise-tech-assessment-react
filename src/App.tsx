import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useGetRestaurantDetails } from "./apis/useGetRestaurantDetails";
import { IRestaurant, useGetRestaurants } from "./apis/useGetRestaurants";
import "./App.scss";
import RestaurantDetails from "./components/RestaurantDetails";
import RestaurantList from "./components/RestaurantList";

function App() {
  const { restaurants, getRestaurants, restaurantsLoading, restaurantsError } = useGetRestaurants();
  const { restaurant, getRestaurantById, restaurantLoading, restaurantError } =
    useGetRestaurantDetails();

  const [displayedRestaurants, setDisplayedRestaurants] = useState<IRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleSelectRestaurant = (id: IRestaurant["id"]) => {
    getRestaurantById(id);
  };

  useEffect(() => {
    const cont = new AbortController();

    getRestaurants(cont);

    return () => {
      cont.abort();
    };
  }, []);

  useEffect(() => {
    setDisplayedRestaurants(restaurants);
  }, [restaurants]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    setDisplayedRestaurants(
      restaurants.filter((i) => i.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
    );
  };

  const handleSort = (sort: string) => {
    setSelectedSort(sort);

    switch (sort) {
      case "name":
        setDisplayedRestaurants(
          restaurants.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
        );
        break;
      case "rating":
        setDisplayedRestaurants(restaurants.sort((a, b) => b.rating - a.rating));
        break;

      default:
        break;
    }
  };

  return (
    <main className="gw-main">
      <Container>
        <Row>
          <Col md={4}>
            <h2>Restaurants</h2>

            <div className="">
              <div className="form-group mb-3">
                <input
                  type="search"
                  value={searchTerm}
                  placeholder="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <div className="mb-3 d-flex">
                <label htmlFor="sortBy" className="me-3">
                  Sort by:
                </label>
                <select
                  name="sort"
                  value={selectedSort}
                  onChange={(e) => handleSort(e.target.value)}
                  id="sortBy"
                >
                  <option value="">Select an option</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            <div className="gw-restaurant-list">
              <RestaurantList
                loading={restaurantsLoading}
                restaurants={displayedRestaurants}
                handleSelectRestaurant={handleSelectRestaurant}
                restaurantsError={restaurantsError}
              />
            </div>
          </Col>

          <Col md={8}>
            <div className="">
              <RestaurantDetails
                restaurantError={restaurantError}
                restaurantLoading={restaurantLoading}
                restaurant={restaurant}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
