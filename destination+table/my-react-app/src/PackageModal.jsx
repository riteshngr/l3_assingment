import React from "react";

export default function PackageModal({ destination, packages, handleBook, close }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Available Packages for {destination}</h2>

        <div className="package-row">
          {packages.map((pkg, index) => (
            <div key={index} className="package-card">
              <h3>{pkg.name}</h3>
              <h4>₹{pkg.price}</h4>

              <ul>
                {pkg.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <button className="btn" onClick={() => handleBook(pkg)}>
                Book Now
              </button>
            </div>
          ))}
        </div>

        <button className="close-btn" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}
