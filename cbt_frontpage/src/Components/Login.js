import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from '@mui/material';

function Login() {
    // This variable determines whether password is shown or not
    const [isShown, setIsSHown] = useState(false);
    //This function dertermines when the checbox is either checked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };
    const formHeader = "Welcome to EverGreen CBT";

    return (
        <Stack className="Login">
            <Stack className='loginform'>
                <Stack className="formText">
                    {formHeader}
                </Stack>
                <form className='signin'>
                    <Stack spacing={1} direction='column'>
                        <span className="aboveform">Email</span>
                        <input type='email' placeholder='Email' autoFocus className='forform' />
                    </Stack>
                    <Stack spacing={1} direction='column'>
                        <span className="aboveform">Password</span>
                        <input
                            type={isShown ? "text" : "password"}
                            placeholder="Password"
                            className='forform'
                            required
                        />
                        <input
                            id="checkbox"
                            type="checkbox"
                            checked={isShown}
                            onChange={togglePassword}
                        />
                    </Stack>
                    <Stack spacing={5} direction='column'>
                        <Button variant='contained' color='success' type='submit'> Login </Button>
                        <Stack>
                            <span>Don't have an account?</span><br></br>
                            <Link to='/CreateAcct'>Create Account</Link>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}

export default Login
