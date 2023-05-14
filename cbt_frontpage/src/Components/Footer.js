import React from 'react'
// import { Link } from 'react-router-dom'
import { GitHub, Instagram, Twitter, YouTube } from '@mui/icons-material'
import { Button } from '@mui/material'

function Footer() {
  return (
    <div className='footer'>
      <h2 className='footer'>Our Contact</h2>
      <div className='contactLinks'>
        <Button href='https://www.github.com/ec-ebube' className='footerLinks' startIcon={<GitHub />} color='error' > Github </Button>
        <Button href='https://www.instagram.com/ec_ebube' className='footerLinks' startIcon={<Instagram />} color='error' > instagram </Button>
        <Button href='https://www.twitter.com/ec_ebube' className='footerLinks' startIcon={<Twitter />} color='error' > Twitter </Button>
        <Button href='https://www.youtube.com/@_silversoft' className='footerLinks' startIcon={<YouTube />} color='error' > Youtube </Button>
      </div>
    </div >
  )
}

export default Footer