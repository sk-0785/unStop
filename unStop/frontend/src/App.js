import React, { useState } from "react";
import axios from "axios";
import SeatsDisplay from "./components/SeatsDisplay";
import SeatsForm from "./components/SeatsForm";
import Header from "./components/Header";
const App = () => {
  const [bookedSeats, setBookedSeats] = useState([]);
  let response = {};
  const handleSeatBooking = async (numSeats) => {
    axios
      .post(
        "https://unstopbackend.onrender.com/service/panel/orderService/v1.0/orders/bookTicket",
        { no_of_seats: numSeats }
      )
      .then((response) => {
        const { seatsBooked } = response.data;
        setBookedSeats(seatsBooked);
      })
      .catch(({ response }) => {
        if (response.data.seatsUnavailable)
          window.alert("all seats have been booked");
        if (response.data.limitExceed)
          window.alert("so sorry we dont have enough seats avaialble fornow ");
      });
  };

  return (
    <div>
      <Header />
      <SeatsForm bookTicket={handleSeatBooking} />
      <SeatsDisplay bookedSeats={bookedSeats} />
    </div>
  );
};

export default App;
