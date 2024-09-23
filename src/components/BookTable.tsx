import React, { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IRestaurant } from "../apis/useGetRestaurants";
import useErrors, { errorCss, ErrorMessage, scrollToError } from "../hooks/useErrors";
import { createBookingAPI } from "../apis/createBookingAPI";
import { validPhone } from "../functions/validation";
import DatePicker from "react-datepicker";
import moment from "moment";
import TimeSelect from "./TimeSelect";
import { isWeekday } from "../functions/dates";

interface BookTableProps {
  restaurant: IRestaurant;
}

const defaultParams = {
  name: "",
  email: "",
  phone: "",
  date: new Date(),
  time: "",
  guests: 2,
};

const BookTable: FC<BookTableProps> = ({ restaurant }) => {
  const { errors, handleUpdateErrors } = useErrors();
  const [params, setParams] = useState(defaultParams);

  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formComplete, setFormComplete] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    return () => {
      setParams(defaultParams);
      setFormComplete(false);
    };
  }, [restaurant]);

  useEffect(() => {
    if (validate) {
      setValidate(false);

      if (errors.length > 0) {
        scrollToError();
      } else if (
        params.name !== "" &&
        params.email !== "" &&
        params.phone !== "" &&
        params.time !== "" &&
        params.time !== null &&
        params.guests >= 1 &&
        params.guests < 13
      ) {
        handleSave();
      }
    }
  }, [validate, errors]);

  const handleUpdateState = (field: string, value: any) => {
    handleUpdateErrors("remove", field);

    setParams((curr: any) => {
      return { ...curr, [field]: value };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    handleUpdateState(name, value);
  };

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();

    if (params.name === "") {
      handleUpdateErrors("add", "name", "Please enter name");
    }

    if (params.email === "") {
      handleUpdateErrors("add", "email", "Please enter your email");
    }

    if (params.phone === "") {
      handleUpdateErrors("add", "phone", "Please enter your mobile number");
    }

    if (params.time === "") {
      handleUpdateErrors("add", "time", "Please select a time");
    }

    if (params.phone !== "" && !validPhone(params.phone)) {
      handleUpdateErrors("add", "phone", "Please enter a valid mobile number");
    }

    if (params.guests > 12) {
      handleUpdateErrors("add", "guests", "");
    }

    setValidate(true);
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validPhone(e.currentTarget.value)) {
      handleUpdateErrors("remove", e.currentTarget.name);
    } else {
      handleUpdateErrors("add", e.currentTarget.name, "Please enter a valid mobile number");
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await createBookingAPI({
        name: params.name,
        email: params.email,
        guests: params.guests,
        time: params.time,
        phone: params.phone,
        date: params.date,
        restaurantId: restaurant.id,
      });

      if (res.status === 201) {
        setLoading(false);
        setFormComplete(true);
      } else {
        setLoading(false);
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
      setLoading(false);
    }
  };

  return (
    <Container>
      <>
        {!formComplete ? (
          <div className="gw-booking-form">
            <h2 className="gw-booking-form__title">Make a booking</h2>

            <form onSubmit={handleValidate}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <div className="">
                  <input
                    type="text"
                    name="name"
                    value={params.name}
                    onChange={handleInputChange}
                    className={`${errorCss("name", errors)}`}
                  />
                  <ErrorMessage field="name" errors={errors} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="">
                  <input
                    type="email"
                    name="email"
                    value={params.email}
                    onChange={handleInputChange}
                    className={`${errorCss("email", errors)}`}
                  />
                  <ErrorMessage field="email" errors={errors} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <div className="">
                  <input
                    type="tel"
                    name="phone"
                    value={params.phone}
                    onChange={handleInputChange}
                    onBlur={handlePhoneBlur}
                    className={`${errorCss("phone", errors)}`}
                  />
                  <ErrorMessage field="phone" errors={errors} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>

                <div className="">
                  <DatePicker
                    minDate={new Date()}
                    selected={params.date}
                    dateFormat="dd/MM/yyyy"
                    onSelect={(date) => handleUpdateState("date", date)}
                    className={`${errorCss("date", errors)}`}
                  />

                  <ErrorMessage field="date" errors={errors} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <div className="">
                  <TimeSelect
                    timeRange={
                      isWeekday(params.date)
                        ? restaurant.details.openingHours.weekday
                        : restaurant.details.openingHours.weekend
                    }
                    selectedDate={params.date}
                    selectedTime={params.time}
                    className={`${errorCss("time", errors)}`}
                    handleChange={(val) => handleUpdateState("time", val)}
                  />

                  <ErrorMessage field="time" errors={errors} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="guests">No. of diners</label>
                <div className="">
                  <select
                    name="guests"
                    id="guests"
                    value={params.guests}
                    onChange={(e) => handleUpdateState("guests", Number(e.target.value))}
                  >
                    {Array.from({ length: 13 }, (v, i) => i + 1).map((people) => (
                      <option key={people} value={people}>
                        {people === 13 ? "12+" : people} {people === 1 ? "person" : "people"}{" "}
                      </option>
                    ))}
                  </select>

                  <ErrorMessage field="guests" errors={errors} />
                </div>

                {params.guests > 12 && (
                  <div>
                    If you have more than 12 guests please{" "}
                    <a href={`mailto:${restaurant.details.contactEmail}`}>
                      contact us to place a booking
                    </a>
                    .
                  </div>
                )}
              </div>

              <button type="submit" className="" disabled={loading}>
                {loading ? "loading" : "Book"}
              </button>

              {submitError && <div>There was an error, please try again.</div>}
            </form>
          </div>
        ) : (
          <div className="gw-booking-complete">
            <h3>You're all set!</h3>
            <p>Your booking details:</p>

            <div>Name: {params.name}</div>
            <div>Email: {params.email}</div>
            <div>
              Time: {moment(params.date).format("DD/MM/YYYY")} {params.time}
            </div>
            <div>No. of diners: {params.guests}</div>
          </div>
        )}
      </>
    </Container>
  );
};

export default BookTable;
