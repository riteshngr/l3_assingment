// src/components/Hero.jsx
import React from 'react'

const Hero = () => {
  return (
    <div id="heroCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://placehold.co/1200x400/222/fff?text=Welcome+to+Our+Site" className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="https://placehold.co/1200x400/333/fff?text=Best+Services" className="d-block w-100" alt="Slide 2" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  )
}

// 👇 YE LINE MISSING HAI, ISKO ADD KARO
export default Hero;