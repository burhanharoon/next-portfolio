import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
