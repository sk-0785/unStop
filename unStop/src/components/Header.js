const Header=()=>{
   return  (
   <>
   <h2>Train Seat Reservation</h2>
    <div>
      <div>
        <div
          style={{
            backgroundColor: "red",
            display: "inline-block",
            width: "30px",
            height: "30px",
            margin: "5px",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            margin: "10px",
            display: "inline-block",
          }}
        >
          Booked Seats
        </div>
      </div>
      <div>
        <div
          style={{
            backgroundColor: "green",
            display: "inline-block",
            width: "30px",
            height: "30px",
            margin: "5px",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            margin: "10px",
            display: "inline-block",
          }}
        >
          Available Seats
        </div>
      </div>
    </div>
    </>)
}

export default Header