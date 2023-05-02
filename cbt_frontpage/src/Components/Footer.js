import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <h2 className='footer'>Our Contact</h2>
      <div className='contactLinks'>
        <Link to='https://www.github.com/ec-ebube' className='footerLinks'> Github </Link>
        <Link to='https://www.instagram.com/ec_ebube' className='footerLinks'> instagram </Link>
        <Link to='https://www.twitter.com/ec_ebube' className='footerLinks'> Twitter </Link>
        <Link to='https://www.youtube.com/@_silversoft' className='footerLinks'> Youtube </Link>
      </div>
    </div>
  )
}

export default Footer