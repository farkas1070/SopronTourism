import React, { useState, useEffect } from "react";
import MovieSeat from "./MovieSeat";
import Weather from "./Weather";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Map from "./Map";
function HomeScreen() {
  const [seatsData, setSeatsData] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [showResults, setShowResults] = useState([]);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("Sopron");
  const [weatherData, setWeatherData] = useState(null);
  const [cinemas, setCinemas] = useState([]);

  const parameterMapping = {
    date: "Date",
    city: "City",
    temperature_2m_max: "Max. Temperature (2m)",
    temperature_2m_min: "Min. Temperature (2m)",
    temperature_2m_mean: "Mean Temperature (2m)",
    sunrise: "Sunrise",
    sunset: "Sunset",
    precipitation_sum: "Precipitation sum",
    rain_sum: "Rain",
    snowfall_sum: "Snowfall",
    precipitation_hours: "Precipitation Hours",
    windspeed_10m_max: "Max. Windspeed (10m)",
    winddirection_10m_dominant: "Dominant Wind Direction (10m)",
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://20.218.154.3:8080/api/forecast/city=${city}&date=${date}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleNumberOfPeopleChange = (e) => {
    setNumberOfPeople(e.target.value);
  };
  const fetchData2 = async () => {
    const response = await fetch(
      "http://localhost:3123/api/longitude_and_latitude"
    );
    const responseData = await response.json();
    console.log(responseData);

    // Assuming responseData is an array of objects with 'id', 'longitude', and 'latitude'
    return responseData;
  };

  const fetchCinemas = async () => {
    const response = await fetch("http://localhost:3002/getCinemas");
    const responseData = await response.json();
    const filteredCinemas = responseData.filter((item) => item.city === city);
    console.log(filteredCinemas);

    const longitudeAndLatitudeData = await fetchData2();
    const combinedCinemas = filteredCinemas.map((cinema) => {
      const matchingData = longitudeAndLatitudeData.find(
        (data) => data.id.replace(/\s/g, "") === cinema.id
      );
      console.log("Matching Data:", matchingData);

      // If matching data is found, merge it into the cinema object
      if (matchingData) {
        return {
          ...cinema,
          longitude: matchingData.longitude,
          latitude: matchingData.latitude,
        };
      }

      // If no matching data found, return the original cinema object
      return cinema;
    });

    setCinemas(combinedCinemas);
    console.log(combinedCinemas);
  };
  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3002/getData"); // Update with your server URL
      const responseData = await response.json();
      const filteredSeats = responseData.filter((item) => item.date === date);
      setSeatsData(filteredSeats);
      const uniqueMovieNames = [];
      const movieDetailsPromises = filteredSeats.map(async (seat) => {
        try {
          const docRef = doc(db, "Movies", seat.movieId); // Replace 'your-collection-name' with the actual collection name
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const movieData = docSnapshot.data();
            const movieName = movieData.name;

            // Check if the movieName is not already in the array
            if (!uniqueMovieNames.includes(movieName)) {
              // Add the movieName to the array
              uniqueMovieNames.push(movieName);
              // Do something with movieData
              console.log(movieData);
            }
            // Do something with movieData
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      });

      // Wait for all movieDetailsPromises to resolve
      await Promise.all(movieDetailsPromises);
      console.log(filteredSeats);
      setShowResults(uniqueMovieNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(numberOfPeople =="" || date =="") {
      alert('Warning, you didnt give every credential');
    }
    else {
    fetchMovies();
    fetchCinemas();
    fetchData();
    fetchData2();
    }
    
  };

  return (
    <div>
      <Nav></Nav>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="numberOfPeople">Number of People:</label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
            />
          </div>
          <div>
            <label htmlFor="selectedDate">Select Date:</label>
            <input
              type="date"
              id="selectedDate"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <br />
          <label>
            City (Budapest, Vienna, Sopron):
            <input type="text" value={city} onChange={handleCityChange} />
          </label>
          <button type="submit">Search Movies</button>
        </form>
        <Map cinemas={cinemas} movies={showResults}></Map>
        {weatherData && (
          <div>
            <h2>
              Weather for {city} on {date}:
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Mapped Value</th>
                  <th>Actual Data</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(parameterMapping).map((key) => (
                  <tr key={key}>
                    <td>{parameterMapping[key]}</td>
                    <td>{weatherData[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            movies you can watch:
            {showResults.map((movie) => {
              return <p>{movie}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
