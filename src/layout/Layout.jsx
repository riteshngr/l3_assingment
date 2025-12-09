import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar' 
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout