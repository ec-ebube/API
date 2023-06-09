import React from 'react'
import { Button } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Outlet } from 'react-router-dom';

function NoUserHeader() {


    return (
        <div className="container">
            <div className="header">
                <nav className='Header'>
                    <h1 className='heading'> <a href="/"> EverGreen CBT App </a></h1>
                    <div className="links">
                        <div>
                            <Button href="/login" className="Link" variant="text" color="error" startIcon={<LoginRoundedIcon />}> Login </Button>
                            <Button href="/CreateAcct" className="Link" variant="outlined" color="warning" startIcon={<ExitToAppRoundedIcon />}> SignUp </Button>
                        </div>
                    </div>
                </nav>
            </div>
            <Outlet />
        </div>
    )
}

export default NoUserHeader
