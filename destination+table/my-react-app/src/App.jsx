import React, { useState } from "react";
import "./App.css";

import SearchForm from "./SearchForm";
import PackageModal from "./PackageModal";
import BookingTable from "./BookingTable";

export default function App() {
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState(1);

  const [showPackages, setShowPackages] = useState(false);
  const [bookings, setBookings] = useState([]);

  const packages = [
    {
      name: "Budget Explorer",
      price: 15000,
      details: ["3 Nights Stay", "Sightseeing", "Breakfast Included"]
    },
    {
      name: "Luxury Escape",
      price: 35000,
      details: ["5 Nights Stay", "Luxury Hotels", "Guided Tours"]
    },
    {
      name: "Adventure Pack",
      price: 25000,
      details: ["4 Nights Stay", "Trekking", "River Rafting"]
    }
  ];

  const handleFindPackages = () => {
    if (!destination || !from || !to) {
      alert("Please fill all fields");
      return;
    }
    setShowPackages(true);
  };

  // const handleBook = (pkg) => {
  //   const newBooking = {
  //     name: "Guest",
  //     destination,
  //     dates: `${from} to ${to}`,
  //     people
  //   };

  //   setBookings([...bookings, newBooking]);
  //   setShowPackages(false);
  // };


  const handleBook = (pkg) => {
  if (!destination || !from || !to || !people) return;

  const newBooking = {
    name: "Guest",
    destination,
    dates: `${from} to ${to}`,
    people
  };

  setBookings([...bookings, newBooking]);
  setShowPackages(false);
};


  return (
    <div className="page">
      <h1 className="title">Book Your Trip</h1>

      <SearchForm
        destination={destination}
        from={from}
        to={to}
        people={people}
        setDestination={setDestination}
        setFrom={setFrom}
        setTo={setTo}
        setPeople={setPeople}
        handleFindPackages={handleFindPackages}
      />

      {showPackages && (
        <PackageModal
          destination={destination}
          packages={packages}
          handleBook={handleBook}
          close={() => setShowPackages(false)}
        />
      )}

      <BookingTable bookings={bookings} />
    </div>
  );
}
