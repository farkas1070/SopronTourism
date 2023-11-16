import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import "./MovieSeatView.css";




export default function App({passedSeats}) {
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [seats, setSeats] = useState([]);

  
 

  return (
    <div className="App mt-20">
      <ShowCase />
      <Cinema
        
        seats={passedSeats}
        
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={(selectedSeats) =>
          setSelectedSeats(selectedSeats)
        
        }
      />
      
    </div>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat selected" /> <p className="text">Selected</p>
      </li>
      <li>
        <span className="seat occupied" /> <p className="text">Occupied</p>
      </li>
    </ul>
  );
}

function Cinema({  selectedSeats, onSelectedSeatsChange, seats }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }
  

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = seat.occupied;
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                "seat",
                isSelected && "selected",
                isOccupied && "occupied"
              )}
              onClick={isOccupied ? null : () => {handleSelectedState(seat)}}
              onKeyPress={
                isOccupied
                  ? null
                  : (e) => {
                      if (e.key === "Enter") {
                        handleSelectedState(seat);
                        
                      }
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}