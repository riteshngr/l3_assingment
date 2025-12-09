import React from 'react'

const Alert = ({ message, type }) => {
  return (
    <div className={`alert alert-${type || 'primary'} alert-dismissible fade show`} role="alert">
      {message || "This is an alert!"}
      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
    </div>
  )
}

export default Alert;   