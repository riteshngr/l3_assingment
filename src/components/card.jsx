import React from 'react'

const Card = ({ title, desc, img }) => {
  return (
    <div className="card shadow h-100">
      <img src={img || "https://placehold.co/300x200"} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title || "Card Title"}</h5>
        <p className="card-text">{desc || "Some quick example text to build on the card title."}</p>
        <button className="btn btn-outline-primary">Learn More</button>
      </div>
    </div>
  )
}

export default Card;