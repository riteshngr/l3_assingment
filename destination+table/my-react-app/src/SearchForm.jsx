import React from "react";

export default function SearchForm({
  destination,
  from,
  to,
  people,
  setDestination,
  setFrom,
  setTo,
  setPeople,
  handleFindPackages
}) {
  return (
    <div className="form-container">
      <label>Destination</label>
      <input
        type="text"
        className="input-field"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <div className="row">
        <div className="col">
          <label>From</label>
          <input
            type="date"
            className="input-field"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="col">
          <label>To</label>
          <input
            type="date"
            className="input-field"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <label>People</label>
      <input
        type="number"
        className="input-field"
        min="1"
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))}
      />

      <button className="btn" onClick={handleFindPackages}>
        Find Packages
      </button>
    </div>
  );
}
