import { useState } from "react";
import axios from 'axios';

const SeatsForm = ({bookTicket}) => {
  const min = 1;
  const [value, setValue] = useState(1);
  const [maxSeatsAllowed, setMaxSeatsAllowed] = useState(false);
  const [minSeatsAllowed, setMinSeatsAllowed] = useState(false);
  const [buttonCliked,setButtonClik]=useState(false)
  const handleChange = (event) => {
    const value = Number(event.target.value);
    if ( value > 7) 
    setMaxSeatsAllowed(true);
    else if (value<1)
    setMinSeatsAllowed(true);
    else
    {
        setMaxSeatsAllowed(false);
        setMinSeatsAllowed(false)

    }
    setValue(value);
  };

  const buttonClick=async ()=>{
    setButtonClik(true);
    await bookTicket(value)
    setButtonClik(false)
  }
  
  return (
    <div>
      <input
        type="number"
        placeholder="No of tickets"
        value={value}
        onChange={handleChange}
      />
      <button disabled={maxSeatsAllowed || minSeatsAllowed ||buttonCliked} onClick={buttonClick}>
        Book
      </button>
    {maxSeatsAllowed && <div>You can book at max 7 seats at a time or you have </div>}
    {minSeatsAllowed &&  <div>You  have to book at leats 1 seat </div> }
    </div>
  );
};

export default SeatsForm;
