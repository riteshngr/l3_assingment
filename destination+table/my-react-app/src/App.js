import { useState } from "react";
import "./App.css";

function App() {
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
      details: ["3 Nights Stay", "Sightseeing", "Breakfast Included"],
    },
    {
      name: "Luxury Escape",
      price: 35000,
      details: ["5 Nights Stay", "Luxury Hotels", "Guided Tours"],
    },
    {
      name: "Adventure Pack",
      price: 25000,
      details: ["4 Nights Stay", "Trekking", "River Rafting"],
    },
  ];

  const handleFind = (e) => {
    e.preventDefault();

    if (!destination || !from || !to) return;

    setShowPackages(true);
  };

  const handleBook = (pkg) => {
    const newBooking = {
      name: "Guest",
      destination,
      from,
      to,
      people,
      package: pkg.name,
      price: pkg.price,
    };

    setBookings([...bookings, newBooking]);
    setShowPackages(false);
  };

  return (
    <div className="wrapper">
      <h1>Book Your Trip</h1>

      {/* Form */}
      <form className="form" onSubmit={handleFind}>
        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <div className="date-row">
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} required />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} required />
        </div>

        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />

        <button className="find-btn" type="submit">Find Packages</button>
      </form>

      {/* Modal */}
      {showPackages && (
        <div className="modal-bg">
          <div className="modal">
            <h2>Available Packages for {destination}</h2>

            <div className="package-grid">
              {packages.map((p) => (
                <div key={p.name} className="card">
                  <h3>{p.name}</h3>
                  <p className="price">₹{p.price}</p>

                  <ul>
                    {p.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>

                  <button className="book-btn" onClick={() => handleBook(p)}>
                    Book Now
                  </button>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={() => setShowPackages(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <h2>Previous Bookings</h2>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Destination</th>
            <th>Dates</th>
            <th>People</th>
            <th>Package</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td>{b.name}</td>
              <td>{b.destination}</td>
              <td>{b.from} to {b.to}</td>
              <td>{b.people}</td>
              <td>{b.package}</td>
              <td>₹{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
