import axios from "axios";
import { useState, useEffect } from "react";

const SeatsDisplay = ({ bookedSeats }) => {
  const [seats, setSeats] = useState([]);
  useEffect(() => {
    fetchSeats();
  }, [bookedSeats]);

  const fetchSeats = async () => {
    try {
      const response = axios
        .get(
          "https://unstopbackend.onrender.com/service/panel/orderService/v1.0/orders/getTickets"
        )
        .then((response) => {
          const { seats } = response.data;
          setSeats(seats);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const renderSeats = () => {
    const totalSeats = 80;
    const seatsPerRow = 7;
    const lastRowSeats = 3;
    const rows = Math.ceil(totalSeats / seatsPerRow);
    let seatNumber = 1;

    const seatRows = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      const maxSeatsInRow = row === rows ? lastRowSeats : seatsPerRow;
      for (let seat = 1; seat <= maxSeatsInRow; seat++) {
        const isBooked = seats.includes(seatNumber);
        const seatColor = isBooked ? "green" : "red";
        rowSeats.push(
          <div
            key={seatNumber}
            style={{
              backgroundColor: seatColor,
              display: "inline-block",
              width: "30px",
              height: "30px",
              margin: "5px",
            }}
          >
            {seatNumber}
          </div>
        );
        seatNumber++;
      }
      seatRows.push(
        <div key={row} style={{ marginBottom: "10px" }}>
          {rowSeats}
        </div>
      );
    }

    return seatRows;
  };
  return <div>{renderSeats()}</div>;
};

export default SeatsDisplay;
