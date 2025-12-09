import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Link import kiya Book Now ke liye

// 1. Data banaya (Images aur Details ke saath)
const places = [
  { 
    id: 1, 
    name: "Goa Beach", 
    location: "Goa, India", 
    price: "₹15,000",
    desc: "Party capital of India with sun, sand, and sea.", 
    fullDetails: "Experience the vibrant nightlife, serene beaches, and delicious seafood of Goa. Perfect for friends and couples.",
    img: "https://placehold.co/400x600/orange/white?text=Goa+Trip" 
  },
  { 
    id: 2, 
    name: "Taj Mahal", 
    location: "Agra, India", 
    price: "₹5,000",
    desc: "Symbol of love and one of the 7 wonders.", 
    fullDetails: "Witness the breathtaking beauty of the Taj Mahal at sunrise. A historical journey through the Mughal era.",
    img: "https://placehold.co/400x600/222/fff?text=Taj+Mahal" 
  },
  { 
    id: 3, 
    name: "Manali", 
    location: "Himachal", 
    price: "₹12,000",
    desc: "Snow-capped mountains and adventure sports.", 
    fullDetails: "Paragliding, skiing, and trekking await you in the beautiful valleys of Manali. Best for adventure lovers.",
    img: "https://placehold.co/400x600/blue/white?text=Manali" 
  },
  { 
    id: 4, 
    name: "Kerala", 
    location: "South India", 
    price: "₹20,000",
    desc: "God's own country, famous for backwaters.", 
    fullDetails: "Relax in the houseboats of Alleppey and enjoy the lush green tea gardens of Munnar.",
    img: "https://placehold.co/400x600/green/white?text=Kerala" 
  },
];

const MustVisit = () => {
  
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="py-5 bg-light">
      <div className="container mb-4">
        <h2 className="fw-bold display-5">🌟 Must Visit Destinations</h2>
        <p className="text-muted">Click on a card to view details & book.</p>
      </div>

      {/* --- SCROLLING SECTION --- */}
      <div className="scroll-container">
        <div className="scroll-track">
          {/* */}
          {[...places, ...places].map((place, index) => (
            <div 
              key={index} 
              className="place-card" 
              onClick={() => setSelectedPlace(place)} 
            >
              <img src={place.img} alt={place.name} />
              <div className="card-info">
                <h3>{place.name}</h3>
                <span>📍 {place.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- POPUP / MODAL SECTION --- */}
      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          {}
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            
            {/* Left Image */}
            <div className="modal-image" style={{ backgroundImage: `url(${selectedPlace.img})` }}></div>
            
            {/* Right Details */}
            <div className="modal-details">
              <button className="close-btn" onClick={() => setSelectedPlace(null)}>&times;</button>
              
              <h1 className="fw-bold mb-2">{selectedPlace.name}</h1>
              <h4 className="text-primary mb-4">📍 {selectedPlace.location}</h4>
              
              <p className="lead">{selectedPlace.fullDetails}</p>
              <hr />
              
              <div className="mt-auto pt-4">
                <h3 className="text-success fw-bold mb-3">Price: {selectedPlace.price}</h3>
                
                {}
                <Link to="/contact" className="btn btn-dark btn-lg w-100">
                  Book This Trip Now ✈️
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default MustVisit;