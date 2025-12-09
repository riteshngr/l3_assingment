import React from "react";

export default function BookingTable({ bookings }) {
  return (
    <div className="table-container">
      <h2>Previous Bookings</h2>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Destination</th>
            <th>Dates</th>
            <th>People</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td>{b.name}</td>
              <td>{b.destination}</td>
              <td>{b.dates}</td>
              <td>{b.people}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
