import React from 'react'

const Contact = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <form>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-control" placeholder="John Doe" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <button type="button" className="btn btn-dark w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;