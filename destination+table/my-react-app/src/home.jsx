import React, { useState } from 'react';

// Mock data for packages based on your image
const mockPackages = [
  {
    type: 'Budget Explorer',
    price: 15000,
    features: ['3 Nights Stay', 'Sightseeing', 'Breakfast Included'],
  },
  {
    type: 'Luxury Escape',
    price: 35000,
    features: ['5 Nights Stay', 'Luxury Hotels', 'Guided Tours'],
  },
  {
    type: 'Adventure Pack',
    price: 25000,
    features: ['4 Nights Stay', 'Trekking', 'River Rafting'],
  },
];

// Helper function to simulate alert without using window.alert
const showMessage = (message) => {
    console.log(message); // Log to console as a fallback
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
        alertBox.textContent = message;
        alertBox.classList.add('show');
        setTimeout(() => alertBox.classList.remove('show'), 3000);
    }
};

// --- 1. Reusable Date Input Component (Fulfills 'Calendar' requirement) ---
const DateInput = ({ label, value, onChange }) => {
  return (
    <input
      type="date"
      aria-label={label}
      placeholder={label}
      value={value}
      onChange={onChange}
    />
  );
};

// --- 2. Reusable Package Card Component ---
const PackageCard = ({ packageInfo, onBook }) => {
  return (
    <div className="package-card">
      <h3 className="package-title">
        {packageInfo.type}
      </h3>
      <div className="package-price">₹{packageInfo.price.toLocaleString()}</div>
      <ul className="package-features">
        {packageInfo.features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      <button 
        className="book-now-button"
        onClick={() => onBook(packageInfo.type, packageInfo.price)}
      >
        Book Now
      </button>
    </div>
  );
};

// --- 3. Packages Modal Component (Fulfills 'Pop up' requirement) ---
const PackagesModal = ({ show, onClose, destination, packages, onBook, people }) => {

  // Handler for the "Book Now" button in the modal
  // This logic is separate from the App component's main state update
  const handleBookNow = (packageName, packagePrice) => {
    if (!people || people <= 0) {
        showMessage('Please ensure the number of people is set correctly before booking.');
        return;
    }
    
    const calculatedPrice = packagePrice * people;
    
    // Call the parent function which handles state update
    onBook(packageName, calculatedPrice); 
    
    showMessage(`Booked "${packageName}" for ${people} people! Total: ₹${calculatedPrice.toLocaleString()}.`);
  };


  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="packages-modal">
        <h3>Available Packages for {destination || 'Destination'}</h3>
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <PackageCard 
              key={index} 
              packageInfo={pkg} 
              onBook={handleBookNow}
            />
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// --- 4. Booking Row Component (Fulfills 'Table entries' requirement) ---
const BookingRow = ({ booking }) => {
  return (
    <tr>
      <td data-label="Name">{booking.name}</td>
      <td data-label="Destination">{booking.destination}</td>
      <td data-label="Dates">{booking.dates}</td>
      <td data-label="People">{booking.people}</td>
      <td data-label="Package">{booking.packageName}</td>
      <td data-label="Total Price">
        {booking.totalPrice !== 'N/A' ? `₹${booking.totalPrice.toLocaleString()}` : 'N/A'}
      </td>
    </tr>
  );
};


// Main App Component
const App = () => {
  // State for the search form inputs
  const [destination, setDestination] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [people, setPeople] = useState(1);

  // State to control the visibility of the packages modal
  const [showPackages, setShowPackages] = useState(false);

  // State for the previous bookings table
  const [bookings, setBookings] = useState([
    {
      name: 'Guest',
      destination: 'ladakh',
      dates: '2025-12-10 to 2025-12-17',
      people: 2,
      packageName: 'N/A',
      totalPrice: 'N/A'
    },
  ]);

  // Handler for the "Find Packages" button
  const handleFindPackages = () => {
    if (destination && fromDate && toDate && people > 0) {
      setShowPackages(true);
    } else {
      showMessage('Please fill out the Destination, From Date, To Date, and People fields.');
    }
  };

  // --- 5. Function to update the table (called after successful booking in modal) ---
  const handleTableUpdate = (packageName, calculatedPrice) => {
    
    // 1. Create a new booking object
    const newBooking = {
      name: 'User', 
      destination: destination,
      dates: `${fromDate} to ${toDate}`,
      people: people,
      packageName: packageName,
      totalPrice: calculatedPrice, 
    };

    // 2. Update the bookings state (triggers table update)
    setBookings([newBooking, ...bookings]); // Add new booking to the top

    // 3. Close the modal 
    setShowPackages(false);
  };


  return (
    <div className="app-container">
      {/* Custom Alert Box */}
      <div id="custom-alert"></div>
      
      {/* Inline Styling for Preview Environment */}
      <style jsx="true">{`
        /* --- COLOR PALETTE ---
         * Navyish Blue Background: #1A233A
         * Grayish Orange Accent: #E59560
         * Dark Container/Input: #25324D
         * Light Gray Text: #CFCFCF
         * --- */

        /* General Reset and Body */
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            background-color: #1A233A; /* Navyish Blue Background */
            color: #CFCFCF; /* Light Gray Text */
        }

        .app-container {
            padding: 0 20px 50px 20px;
        }

        /* Custom Alert */
        #custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #E59560; /* Grayish Orange */
            color: #1A233A;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            z-index: 2000;
            font-weight: bold;
        }

        #custom-alert.show {
            opacity: 1;
        }

        /* Navbar */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
            font-size: 1.5em;
            font-weight: 900;
            color: #E59560; /* Grayish Orange logo */
        }

        .nav-links span {
            margin-left: 20px;
            cursor: pointer;
            transition: color 0.2s;
        }
        .nav-links span:hover {
            color: #E59560;
        }

        /* Book Trip Section (Search Form) */
        .book-trip-section {
            background: rgba(37, 50, 77, 0.8); /* Dark Navy Container */
            backdrop-filter: blur(5px);
            padding: 40px;
            margin: 50px auto;
            border-radius: 12px;
            text-align: center;
            position: relative;
            overflow: hidden;
            max-width: 1000px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
            .book-trip-section {
                padding: 20px;
                margin: 20px;
            }
        }

        .section-title {
            margin-bottom: 30px;
            font-size: 2em;
            color: #E59560; /* Grayish Orange */
            font-weight: 600;
        }

        .search-form {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
            margin-bottom: 20px;
            z-index: 10; 
            position: relative;
        }

        @media (max-width: 1024px) {
            .search-form {
                grid-template-columns: repeat(2, 1fr);
            }
            .find-packages-button {
                grid-column: 1 / -1;
            }
        }

        @media (max-width: 500px) {
            .search-form {
                grid-template-columns: 1fr;
            }
        }

        .search-form input {
            padding: 12px;
            border: 1px solid #4B5E7C; /* Slightly lighter navy border */
            border-radius: 6px;
            width: 100%;
            box-sizing: border-box;
            background-color: #25324D; /* Darker Navy/Slate */
            color: #CFCFCF; /* Light Gray Text */
            transition: border-color 0.2s;
        }
        /* Make date inputs look good in dark mode */
        .search-form input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.8); /* Invert for dark mode visibility */
        }


        .search-form input:focus {
            border-color: #E59560; /* Grayish Orange focus */
            outline: none;
        }

        .find-packages-button {
            padding: 12px 20px;
            background-color: #E59560; /* Grayish Orange */
            color: #1A233A; /* Dark Navy Text */
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.2s, transform 0.1s;
        }
        .find-packages-button:hover {
            background-color: #f0a373; /* Slightly brighter orange on hover */
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(229, 149, 96, 0.4);
        }

        .explore-text {
            font-size: 8em;
            font-weight: 900;
            color: rgba(255, 255, 255, 0.05);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 5;
            white-space: nowrap;
        }
        @media (max-width: 768px) {
             .explore-text { font-size: 4em; }
        }

        /* Modal Overlay and Packages - CENTERED POPUP */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.85); /* Darker overlay */
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
            z-index: 1000;
        }

        .packages-modal {
            background-color: #1A233A; /* Navyish Blue Background */
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 950px;
            color: #CFCFCF; /* Light Gray Text */
            text-align: center;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.7);
            /* Add animation for entry */
            transform: scale(0.9);
            animation: modal-enter 0.3s forwards;
        }
        
        @keyframes modal-enter {
            to {
                transform: scale(1);
            }
        }

        .packages-modal h3 {
            color: #E59560; /* Grayish Orange */
            margin-bottom: 25px;
            font-size: 1.5em;
        }

        .packages-grid {
            display: flex;
            justify-content: space-around;
            gap: 20px;
            margin: 20px 0;
        }
        
        @media (max-width: 768px) {
            .packages-grid {
                flex-direction: column;
            }
            .package-card {
                width: 100% !important;
            }
        }

        .package-card {
            background-color: #25324D; /* Dark Navy/Slate Card BG */
            padding: 25px;
            border-radius: 8px;
            width: 30%;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            border: 1px solid #4B5E7C;
        }

        .package-title {
            font-size: 1.2em;
            padding-bottom: 10px;
            border-bottom: 2px solid #4B5E7C;
            color: #CFCFCF; /* Light Gray Text */
            margin-top: 0;
        }

        .package-price {
            font-size: 1.8em;
            font-weight: bold;
            color: #E59560; /* Grayish Orange */
            margin: 15px 0;
        }

        .package-features {
            list-style: none;
            padding: 0;
            text-align: left;
            margin-bottom: 20px;
            color: #CFCFCF; 
        }

        .package-features li {
            padding: 5px 0;
        }

        .book-now-button {
            padding: 10px 20px;
            background-color: #E59560; /* Grayish Orange */
            color: #1A233A; /* Dark Navy Text */
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 10px;
            transition: background-color 0.2s;
        }

        .book-now-button:hover {
            background-color: #f0a373;
        }

        .close-button {
            padding: 10px 20px;
            background-color: #4B5E7C; /* Muted Navy */
            color: #CFCFCF; /* Light Gray Text */
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 25px;
            transition: background-color 0.2s;
        }
        .close-button:hover {
            background-color: #5D7297;
        }

        /* Previous Bookings Table */
        .previous-bookings-section {
            margin-top: 50px;
            padding: 20px;
            background-color: rgba(37, 50, 77, 0.8); /* Dark Navy Container */
            border-radius: 12px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .previous-bookings-section h3 {
            color: #E59560; /* Grayish Orange */
            font-size: 1.4em;
            margin-bottom: 15px;
        }

        .bookings-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .bookings-table th, .bookings-table td {
            padding: 15px;
            border: 1px solid #4B5E7C; /* Muted Navy Border */
            text-align: left;
        }

        .bookings-table th {
            background-color: #25324D; /* Darker Navy/Slate */
            color: #E59560; /* Grayish Orange */
            font-weight: 600;
        }
        
        .bookings-table tr:nth-child(even) {
            background-color: #1A233A; /* Main Background */
        }
        
        .bookings-table tr:hover {
            background-color: #25324D; /* Darker Navy/Slate */
        }
        
        @media (max-width: 600px) {
            /* Make table columns stack on smaller screens (simplified for this context) */
            .bookings-table, .bookings-table thead, .bookings-table tbody, .bookings-table th, .bookings-table td, .bookings-table tr {
                display: block;
            }
            .bookings-table thead {
                display: none;
            }
            .bookings-table tr {
                margin-bottom: 15px;
                border: 1px solid #4B5E7C;
                border-radius: 8px;
            }
            .bookings-table td {
                text-align: right;
                padding-left: 50%;
                position: relative;
                border: none;
            }
            .bookings-table td:before {
                content: attr(data-label);
                position: absolute;
                left: 0;
                width: 50%;
                padding-left: 15px;
                font-weight: bold;
                text-align: left;
                color: #E59560; /* Grayish Orange */
            }
        }

      `}</style>
      
      <header className="navbar">
        <div className="logo">NEXT ROUTE</div>
        <div className="nav-links">
          <span>Must Visit</span>
          <span>Login / Signup</span>
        </div>
      </header>

      <div className="book-trip-section">
        <h2 className="section-title">Book Your Trip</h2>
        <div className="search-form">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          {/* Using the separate DateInput Component */}
          <DateInput
            label="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <DateInput
            label="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="People"
            min="1"
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value, 10))}
          />
          <button className="find-packages-button" onClick={handleFindPackages}>
            Find Packages
          </button>
        </div>
        <div className="explore-text">EXPLORE</div>
      </div>

      {/* --- Packages Modal Component --- */}
      <PackagesModal 
        show={showPackages}
        onClose={() => setShowPackages(false)}
        destination={destination}
        packages={mockPackages}
        people={people}
        onBook={handleTableUpdate} /* Pass the function that updates the table */
      />

      {/* --- Previous Bookings Table --- */}
      <div className="previous-bookings-section">
        <h3>Previous Bookings</h3>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Dates</th>
              <th>People</th>
              <th>Package</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Using the separate BookingRow Component */}
            {bookings.map((booking, index) => (
              <BookingRow 
                key={index} 
                booking={booking} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;