import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import Weather from "./Weather";
const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />}></Route>
      <Route path="/Weather" element={<Weather />}></Route>
      
      
    </Routes>
  );
};

export default Navigation;